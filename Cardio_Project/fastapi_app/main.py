from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib
import os
import requests

app = FastAPI(title="Cardiovascular Disease Prediction API")

# CORS middleware to allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model files configuration
MODEL_DIR = "models"
BASE_URL = "https://huggingface.co/mr-baraiya/cardio-disease-model/resolve/main"

MODEL_FILES = {
    "random_forest_model.pkl": f"{BASE_URL}/random_forest_model.pkl",
    "scaler_int.pkl": f"{BASE_URL}/scaler_int.pkl",
    "scaler_num.pkl": f"{BASE_URL}/scaler_num.pkl",
    "logistic_weights.npy": f"{BASE_URL}/logistic_weights.npy",
    "logistic_bias.npy": f"{BASE_URL}/logistic_bias.npy",
}

# Global variables for models
rf_model = None
scaler_num = None
scaler_int = None
lr_weights = None
lr_bias = None

def download_model_file(filename: str, url: str):
    """Download a model file if it doesn't exist"""
    filepath = os.path.join(MODEL_DIR, filename)

    if os.path.exists(filepath):
        print(f"[OK] {filename} already exists")
        return True

    print(f"[DOWNLOAD] Downloading {filename}...")

    try:
        os.makedirs(MODEL_DIR, exist_ok=True)

        with requests.get(
            url,
            stream=True,
            allow_redirects=True,
            timeout=600,
            headers={
                "User-Agent": "Mozilla/5.0",
                "Accept": "application/octet-stream"
            }
        ) as r:
            r.raise_for_status()
            with open(filepath, "wb") as f:
                for chunk in r.iter_content(chunk_size=1024 * 1024):  # 1 MB
                    if chunk:
                        f.write(chunk)

        print(f"[OK] {filename} downloaded successfully")
        return True

    except Exception as e:
        print(f"[ERROR] Failed to download {filename}: {e}")
        return False

@app.on_event("startup")
async def load_models():
    """Download and load models on startup"""
    global rf_model, scaler_num, scaler_int, lr_weights, lr_bias
    
    try:
        # Try to download models if needed (optional - uses local if available)
        print("\n[CHECKING] Checking model files...")
        for filename, url in MODEL_FILES.items():
            download_model_file(filename, url)
        
        # Load all models from local directory
        print("\n[LOADING] Loading models...")
        rf_model = joblib.load(os.path.join(MODEL_DIR, "random_forest_model.pkl"))
        scaler_num = joblib.load(os.path.join(MODEL_DIR, "scaler_num.pkl"))
        scaler_int = joblib.load(os.path.join(MODEL_DIR, "scaler_int.pkl"))
        lr_weights = np.load(os.path.join(MODEL_DIR, "logistic_weights.npy"))
        lr_bias = np.load(os.path.join(MODEL_DIR, "logistic_bias.npy"))
        
        print("[SUCCESS] All models loaded successfully!\n")
        
    except Exception as e:
        print(f"[ERROR] Error loading models: {e}")
        raise

class PatientData(BaseModel):
    age: float
    gender: int
    height: float
    weight: float
    ap_hi: float
    ap_lo: float
    cholesterol: int
    gluc: int
    smoke: int
    alco: int
    active: int

class PredictionResponse(BaseModel):
    model_type: str
    prediction: int
    probability: float
    risk_level: str
    message: str

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def preprocess_input(data: PatientData):
    # Convert age from years to proper format
    age_years = data.age
    
    # Calculate BMI
    bmi = data.weight / ((data.height / 100) ** 2)
    
    # Create interaction features
    smoke_age = data.smoke * age_years
    smoke_bmi = data.smoke * bmi
    alco_age = data.alco * age_years
    alco_bmi = data.alco * bmi
    
    # Prepare features for scaling
    num_features = np.array([[age_years, data.ap_hi, data.ap_lo, bmi]])
    int_features = np.array([[smoke_age, smoke_bmi, alco_age, alco_bmi]])
    
    # Scale features
    num_scaled = scaler_num.transform(num_features)
    int_scaled = scaler_int.transform(int_features)
    
    # Combine all features in correct order
    features = np.concatenate([
        num_scaled.flatten(),
        [data.cholesterol, data.gluc, data.smoke, data.alco, data.active],
        int_scaled.flatten()
    ])
    
    return features.reshape(1, -1)

def get_risk_level(probability: float) -> str:
    if probability < 0.3:
        return "Low Risk"
    elif probability < 0.6:
        return "Moderate Risk"
    else:
        return "High Risk"

@app.get("/")
def root():
    return {
        "message": "Cardiovascular Disease Prediction API",
        "endpoints": {
            "/predict/logistic": "Logistic Regression prediction",
            "/predict/randomforest": "Random Forest prediction",
            "/health": "API health check"
        }
    }

@app.get("/health")
def health_check():
    models_loaded = all([
        rf_model is not None,
        scaler_num is not None,
        scaler_int is not None,
        lr_weights is not None,
        lr_bias is not None
    ])
    
    return {
        "status": "healthy" if models_loaded else "unhealthy",
        "models_loaded": models_loaded,
        "model_directory": MODEL_DIR
    }

@app.post("/predict/logistic", response_model=PredictionResponse)
def predict_logistic(data: PatientData):
    try:
        # Preprocess input
        features = preprocess_input(data)
        
        # Make prediction using logistic regression
        z = np.dot(features, lr_weights) + lr_bias
        probability = float(sigmoid(z)[0])
        prediction = 1 if probability >= 0.5 else 0
        
        risk_level = get_risk_level(probability)
        
        message = (
            "Patient is at risk of cardiovascular disease." 
            if prediction == 1 
            else "Patient is not at significant risk."
        )
        
        return PredictionResponse(
            model_type="Logistic Regression",
            prediction=prediction,
            probability=round(probability, 4),
            risk_level=risk_level,
            message=message
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/randomforest", response_model=PredictionResponse)
def predict_random_forest(data: PatientData):
    try:
        # Preprocess input
        features = preprocess_input(data)
        
        # Make prediction using random forest
        prediction = int(rf_model.predict(features)[0])
        probability = float(rf_model.predict_proba(features)[0][1])
        
        risk_level = get_risk_level(probability)
        
        message = (
            "Patient is at risk of cardiovascular disease." 
            if prediction == 1 
            else "Patient is not at significant risk."
        )
        
        return PredictionResponse(
            model_type="Random Forest",
            prediction=prediction,
            probability=round(probability, 4),
            risk_level=risk_level,
            message=message
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/compare")
def compare_models(data: PatientData):
    try:
        # Get predictions from both models
        lr_result = predict_logistic(data)
        rf_result = predict_random_forest(data)
        
        return {
            "logistic_regression": lr_result.dict(),
            "random_forest": rf_result.dict(),
            "recommendation": (
                "Both models agree on the prediction." 
                if lr_result.prediction == rf_result.prediction 
                else "Models disagree - consult a medical professional."
            )
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
