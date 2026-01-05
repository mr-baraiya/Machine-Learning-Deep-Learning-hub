from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pickle
import joblib
from typing import Literal

app = FastAPI(title="Cardiovascular Disease Prediction API")

# CORS middleware to allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models and scalers
try:
    # Load Logistic Regression weights and bias
    lr_weights = np.load("../models/logistic_weights.npy")
    lr_bias = np.load("../models/logistic_bias.npy")
    
    # Load Random Forest model
    with open("../models/random_forest_model.pkl", "rb") as f:
        rf_model = pickle.load(f)
    
    # Load scalers
    scaler_num = joblib.load("../models/scaler_num.pkl")
    scaler_int = joblib.load("../models/scaler_int.pkl")
    
    print("✓ All models loaded successfully!")
except Exception as e:
    print(f"Error loading models: {e}")

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
    return {"status": "healthy", "models_loaded": True}

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
