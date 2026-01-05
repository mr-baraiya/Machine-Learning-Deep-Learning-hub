import os
import requests
import joblib
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

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
# RUN SERVER
# --------------------------------------------------

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
