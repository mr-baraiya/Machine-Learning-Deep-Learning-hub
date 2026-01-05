import os
import requests
import joblib
import numpy as np
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from datetime import datetime
from io import BytesIO
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.enums import TA_CENTER, TA_LEFT

# Load environment variables
load_dotenv()

# --------------------------------------------------
# CONFIG
# --------------------------------------------------

MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)

BASE_URL = "https://huggingface.co/mr-baraiya/cardio-disease-model/resolve/main"

MODEL_FILES = {
    "random_forest_model.pkl": f"{BASE_URL}/random_forest_model.pkl",
    "scaler_int.pkl": f"{BASE_URL}/scaler_int.pkl",
    "scaler_num.pkl": f"{BASE_URL}/scaler_num.pkl",
    "logistic_weights.npy": f"{BASE_URL}/logistic_weights.npy",
    "logistic_bias.npy": f"{BASE_URL}/logistic_bias.npy",
}

# Global model variables
rf_model = None
scaler_int = None
scaler_num = None
lr_weights = None
lr_bias = None

# --------------------------------------------------
# APP
# --------------------------------------------------

app = FastAPI(
    title="Cardio Disease Prediction API",
    description="Random Forest & Logistic Regression based Cardio Disease Prediction",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# UTILS
# --------------------------------------------------

def download_model_file(filename: str, url: str) -> bool:
    filepath = os.path.join(MODEL_DIR, filename)

    if os.path.exists(filepath):
        print(f"[OK] {filename} already exists")
        return True

    print(f"[DOWNLOAD] Downloading {filename}...")
    try:
        r = requests.get(url, stream=True, timeout=600)
        r.raise_for_status()

        with open(filepath, "wb") as f:
            for chunk in r.iter_content(chunk_size=1024 * 1024):
                if chunk:
                    f.write(chunk)

        print(f"[OK] {filename} downloaded")
        return True
    except Exception as e:
        print(f"[ERROR] Failed to download {filename}: {e}")
        return False


def sigmoid(z):
    z = np.clip(z, -500, 500)
    return 1 / (1 + np.exp(-z))


# --------------------------------------------------
# INPUT SCHEMA (VALIDATION)
# --------------------------------------------------

class PatientData(BaseModel):
    age: float = Field(..., gt=0, lt=120, description="Age in years")
    gender: int = Field(..., ge=1, le=2, description="1=Female, 2=Male")
    height: float = Field(..., gt=50, description="Height in cm")
    weight: float = Field(..., gt=20, description="Weight in kg")
    ap_hi: float = Field(..., gt=50, description="Systolic blood pressure")
    ap_lo: float = Field(..., gt=30, description="Diastolic blood pressure")
    cholesterol: int = Field(..., ge=1, le=3, description="1=Normal, 2=Above normal, 3=Well above")
    gluc: int = Field(..., ge=1, le=3, description="1=Normal, 2=Above normal, 3=Well above")
    smoke: int = Field(..., ge=0, le=1, description="0=No, 1=Yes")
    alco: int = Field(..., ge=0, le=1, description="0=No, 1=Yes")
    active: int = Field(..., ge=0, le=1, description="0=No, 1=Yes")


class EmailReportRequest(BaseModel):
    """Request schema for sending email reports"""
    to_email: EmailStr = Field(..., description="Recipient email address")
    patient_name: str = Field(..., min_length=1, description="Patient full name")
    patient_data: PatientData = Field(..., description="Patient health data")
    model_type: str = Field(..., description="Model type: randomforest, logistic, or compare")
    prediction_result: dict = Field(..., description="Prediction result from model")

# --------------------------------------------------
# LOAD MODELS ON STARTUP
# --------------------------------------------------

@app.on_event("startup")
def load_models():
    print("[CHECKING] Checking model files...")

    for filename, url in MODEL_FILES.items():
        ok = download_model_file(filename, url)
        if not ok:
            raise RuntimeError(f"Startup failed: could not download {filename}")

    print("[LOADING] Loading models...")

    global rf_model, scaler_int, scaler_num, lr_weights, lr_bias

    rf_model = joblib.load(os.path.join(MODEL_DIR, "random_forest_model.pkl"))
    scaler_int = joblib.load(os.path.join(MODEL_DIR, "scaler_int.pkl"))
    scaler_num = joblib.load(os.path.join(MODEL_DIR, "scaler_num.pkl"))
    lr_weights = np.load(os.path.join(MODEL_DIR, "logistic_weights.npy"))
    lr_bias = np.load(os.path.join(MODEL_DIR, "logistic_bias.npy"))

    print("[SUCCESS] All models loaded successfully!")

# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "models_loaded": True,
        "model_directory": MODEL_DIR
    }

# --------------------------------------------------
# FEATURE PREPROCESSING
# --------------------------------------------------

def preprocess(data: PatientData):
    age_years = data.age
    bmi = data.weight / ((data.height / 100) ** 2)
    
    # Interaction features
    smoke_age = data.smoke * age_years
    smoke_bmi = data.smoke * bmi
    alco_age = data.alco * age_years
    alco_bmi = data.alco * bmi
    
    # Numerical features
    num_features = np.array([[age_years, data.ap_hi, data.ap_lo, bmi]])
    num_scaled = scaler_num.transform(num_features)
    
    # Interaction features
    int_features = np.array([[smoke_age, smoke_bmi, alco_age, alco_bmi]])
    int_scaled = scaler_int.transform(int_features)
    
    # Combine all features
    features = np.concatenate([
        num_scaled.flatten(),
        [data.cholesterol, data.gluc, data.smoke, data.alco, data.active],
        int_scaled.flatten()
    ])
    
    return features.reshape(1, -1)

# --------------------------------------------------
# PREDICTION ENDPOINTS
# --------------------------------------------------

@app.post("/predict/randomforest")
def predict_random_forest(data: PatientData):
    try:
        features = preprocess(data)
        prob = rf_model.predict_proba(features)[0][1]
        prediction = int(prob >= 0.5)

        return {
            "model": "Random Forest",
            "prediction": prediction,
            "probability": round(float(prob), 4),
            "risk": "High Risk" if prediction else "Low Risk"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict/logistic")
def predict_logistic(data: PatientData):
    try:
        features = preprocess(data)
        z = np.dot(features, lr_weights) + lr_bias
        prob = sigmoid(z)[0]
        prediction = int(prob >= 0.5)

        return {
            "model": "Logistic Regression",
            "prediction": prediction,
            "probability": round(float(prob), 4),
            "risk": "High Risk" if prediction else "Low Risk"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/predict/compare")
def compare_models(data: PatientData):
    try:
        rf = predict_random_forest(data)
        lr = predict_logistic(data)

        return {
            "random_forest": rf,
            "logistic_regression": lr,
            "recommendation": (
                "Both models agree on the prediction."
                if rf["prediction"] == lr["prediction"]
                else "Models disagree - consult a medical professional."
            )
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# --------------------------------------------------
# PDF GENERATION UTILITY
# --------------------------------------------------

def generate_pdf_report(patient_name: str, patient_data: PatientData, 
                       model_type: str, prediction_result: dict) -> BytesIO:
    """
    Generate a professional PDF report for cardiovascular disease prediction
    
    Args:
        patient_name: Patient's full name
        patient_data: Patient health metrics
        model_type: Type of model used (randomforest, logistic, compare)
        prediction_result: Prediction results from the model
    
    Returns:
        BytesIO: PDF file in memory
    """
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, 
                           rightMargin=72, leftMargin=72,
                           topMargin=72, bottomMargin=18)
    
    # Container for PDF elements
    elements = []
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#4A148C'),
        spaceAfter=30,
        alignment=TA_CENTER
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#6A1B9A'),
        spaceAfter=12,
        spaceBefore=12
    )
    
    # Title
    title = Paragraph("CardioSense Health Report", title_style)
    elements.append(title)
    elements.append(Spacer(1, 0.2*inch))
    
    # Report metadata
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    meta_data = [
        ["Report Date:", timestamp],
        ["Patient Name:", patient_name],
        ["Model Type:", model_type.replace("_", " ").title()],
    ]
    
    meta_table = Table(meta_data, colWidths=[2*inch, 4*inch])
    meta_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    elements.append(meta_table)
    elements.append(Spacer(1, 0.3*inch))
    
    # Patient Information Section
    elements.append(Paragraph("Patient Health Metrics", heading_style))
    
    bmi = patient_data.weight / ((patient_data.height / 100) ** 2)
    
    patient_info = [
        ["Metric", "Value"],
        ["Age", f"{patient_data.age} years"],
        ["Gender", "Male" if patient_data.gender == 2 else "Female"],
        ["Height", f"{patient_data.height} cm"],
        ["Weight", f"{patient_data.weight} kg"],
        ["BMI", f"{bmi:.2f}"],
        ["Systolic BP", f"{patient_data.ap_hi} mmHg"],
        ["Diastolic BP", f"{patient_data.ap_lo} mmHg"],
        ["Cholesterol", ["Normal", "Above Normal", "Well Above Normal"][patient_data.cholesterol-1]],
        ["Glucose", ["Normal", "Above Normal", "Well Above Normal"][patient_data.gluc-1]],
        ["Smoking", "Yes" if patient_data.smoke else "No"],
        ["Alcohol", "Yes" if patient_data.alco else "No"],
        ["Physical Activity", "Yes" if patient_data.active else "No"],
    ]
    
    patient_table = Table(patient_info, colWidths=[2.5*inch, 3.5*inch])
    patient_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#6A1B9A')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 1, colors.grey),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F3E5F5')]),
    ]))
    elements.append(patient_table)
    elements.append(Spacer(1, 0.3*inch))
    
    # Prediction Results Section
    elements.append(Paragraph("Prediction Results", heading_style))
    
    if model_type == "compare":
        # Compare mode - show both models
        rf_result = prediction_result.get("random_forest", {})
        lr_result = prediction_result.get("logistic_regression", {})
        
        results_data = [
            ["Model", "Prediction", "Probability", "Risk Level"],
            ["Random Forest", 
             "CVD Risk" if rf_result.get("prediction") == 1 else "No CVD Risk",
             f"{rf_result.get('probability', 0)*100:.2f}%",
             rf_result.get("risk", "N/A")],
            ["Logistic Regression",
             "CVD Risk" if lr_result.get("prediction") == 1 else "No CVD Risk",
             f"{lr_result.get('probability', 0)*100:.2f}%",
             lr_result.get("risk", "N/A")],
        ]
    else:
        # Single model mode
        results_data = [
            ["Metric", "Value"],
            ["Model", prediction_result.get("model", "N/A")],
            ["Prediction", "CVD Risk Detected" if prediction_result.get("prediction") == 1 else "No CVD Risk"],
            ["Probability", f"{prediction_result.get('probability', 0)*100:.2f}%"],
            ["Risk Level", prediction_result.get("risk", "N/A")],
        ]
    
    results_table = Table(results_data, colWidths=[2*inch, 1.5*inch, 1.5*inch, 1.5*inch] if model_type == "compare" else [2.5*inch, 3.5*inch])
    
    table_style = [
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#D32F2F') if prediction_result.get("prediction") == 1 else colors.HexColor('#388E3C')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 1, colors.grey),
    ]
    
    results_table.setStyle(TableStyle(table_style))
    elements.append(results_table)
    elements.append(Spacer(1, 0.3*inch))
    
    # Recommendations Section
    elements.append(Paragraph("Medical Recommendations", heading_style))
    
    if prediction_result.get("prediction") == 1:
        recommendations = [
            "• Consult a cardiologist for comprehensive evaluation",
            "• Monitor blood pressure and cholesterol regularly",
            "• Adopt a heart-healthy diet low in sodium and saturated fats",
            "• Engage in regular physical activity (150 minutes/week)",
            "• Consider stress management techniques",
            "• Follow prescribed medication regimen if applicable",
        ]
    else:
        recommendations = [
            "• Maintain current healthy lifestyle habits",
            "• Schedule regular annual cardiovascular check-ups",
            "• Continue balanced diet and physical activity",
            "• Monitor blood pressure periodically",
            "• Stay informed about cardiovascular health",
        ]
    
    for rec in recommendations:
        elements.append(Paragraph(rec, styles['Normal']))
        elements.append(Spacer(1, 0.1*inch))
    
    elements.append(Spacer(1, 0.2*inch))
    
    # Disclaimer
    disclaimer_style = ParagraphStyle(
        'Disclaimer',
        parent=styles['Normal'],
        fontSize=9,
        textColor=colors.HexColor('#D32F2F'),
        leftIndent=20,
        rightIndent=20,
        spaceAfter=10,
    )
    
    disclaimer_text = "<b>Medical Disclaimer:</b> This report is generated by an AI-based educational tool and should NOT be used for medical diagnosis. Always consult qualified healthcare professionals for medical advice, diagnosis, or treatment."
    elements.append(Paragraph(disclaimer_text, disclaimer_style))
    
    # Footer
    footer_style = ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=8,
        textColor=colors.grey,
        alignment=TA_CENTER,
    )
    elements.append(Spacer(1, 0.2*inch))
    elements.append(Paragraph("Generated by CardioSense | Machine Learning Prediction System", footer_style))
    
    # Build PDF
    doc.build(elements)
    buffer.seek(0)
    return buffer


# --------------------------------------------------
# SMTP EMAIL UTILITY
# --------------------------------------------------

def send_email_with_attachment(to_email: str, patient_name: str, 
                               pdf_buffer: BytesIO, risk_level: str) -> bool:
    """
    Send email with PDF report attachment using SMTP
    
    Args:
        to_email: Recipient email address
        patient_name: Patient name
        pdf_buffer: PDF file buffer
        risk_level: Risk assessment result
    
    Returns:
        bool: True if email sent successfully, False otherwise
    """
    # Get SMTP credentials from environment variables
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")
    smtp_from = os.getenv("SMTP_FROM", smtp_user)
    
    # Validate SMTP configuration
    if not smtp_user or not smtp_password:
        raise ValueError("SMTP credentials not configured in environment variables")
    
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = f"CardioSense Support <{smtp_from}>"
        msg['To'] = to_email
        msg['Subject'] = f"CardioSense Health Report - {patient_name}"
        
        # Email body
        body = f"""
Dear {patient_name},

Thank you for using CardioSense cardiovascular disease prediction system.

Your health assessment report is attached to this email. Please review the results and recommendations carefully.

Assessment Summary:
- Risk Level: {risk_level}
- Report Date: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

IMPORTANT: This is an AI-generated educational report and should NOT be used for medical diagnosis. 
Please consult with qualified healthcare professionals for proper medical evaluation and treatment.

Best regards,
CardioSense Team

---
This is an automated message. Please do not reply to this email.
"""
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Attach PDF
        pdf_attachment = MIMEApplication(pdf_buffer.read(), _subtype="pdf")
        pdf_attachment.add_header('Content-Disposition', 'attachment', 
                                 filename=f"CardioSense_Report_{patient_name.replace(' ', '_')}.pdf")
        msg.attach(pdf_attachment)
        
        # Send email
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        print(f"[EMAIL] Successfully sent report to {to_email}")
        return True
        
    except Exception as e:
        print(f"[EMAIL ERROR] Failed to send email: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")


# --------------------------------------------------
# EMAIL REPORT ENDPOINT
# --------------------------------------------------

@app.post("/send-report")
def send_report(request: EmailReportRequest):
    """
    Generate PDF report and send via email
    
    This endpoint:
    1. Generates a professional PDF report with patient data and predictions
    2. Sends the report via SMTP email with secure credentials
    3. Returns confirmation of delivery
    """
    try:
        # Extract risk level from prediction result
        if request.model_type == "compare":
            risk_level = request.prediction_result.get("random_forest", {}).get("risk", "Unknown")
        else:
            risk_level = request.prediction_result.get("risk", "Unknown")
        
        # Generate PDF report
        pdf_buffer = generate_pdf_report(
            patient_name=request.patient_name,
            patient_data=request.patient_data,
            model_type=request.model_type,
            prediction_result=request.prediction_result
        )
        
        # Send email with PDF attachment
        send_email_with_attachment(
            to_email=request.to_email,
            patient_name=request.patient_name,
            pdf_buffer=pdf_buffer,
            risk_level=risk_level
        )
        
        return {
            "status": "success",
            "message": f"Report successfully sent to {request.to_email}",
            "timestamp": datetime.now().isoformat(),
            "recipient": request.to_email,
            "patient_name": request.patient_name,
            "risk_level": risk_level
        }
        
    except ValueError as ve:
        raise HTTPException(status_code=500, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send report: {str(e)}")


# --------------------------------------------------
# RUN SERVER
# --------------------------------------------------

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
