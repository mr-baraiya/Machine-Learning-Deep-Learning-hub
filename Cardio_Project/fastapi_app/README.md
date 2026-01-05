# FastAPI Backend - Cardiovascular Disease Prediction API

## Overview
This FastAPI backend provides REST API endpoints for cardiovascular disease prediction using two machine learning models:
- Logistic Regression (trained from scratch)
- Random Forest Classifier

## 🔗 Important Links

- **Live API:** [https://cardio-fastapi-8ijy.onrender.com](https://cardio-fastapi-8ijy.onrender.com)
- **API Documentation:** [https://cardio-fastapi-8ijy.onrender.com/docs](https://cardio-fastapi-8ijy.onrender.com/docs)
- **Model Files (Hugging Face):** [https://huggingface.co/mr-baraiya/cardio-disease-model](https://huggingface.co/mr-baraiya/cardio-disease-model/tree/main)
- **Model Files (GitHub):** [https://github.com/mr-baraiya/Machine-Learning-Deep-Learning-hub/releases/tag/v1.0-model](https://github.com/mr-baraiya/Machine-Learning-Deep-Learning-hub/releases/tag/v1.0-model)

## Directory Structure
```
fastapi_app/
├── main.py              # FastAPI application
└── requirements.txt     # Python dependencies
```

## Requirements
- Python 3.8+
- FastAPI
- Uvicorn
- NumPy
- Scikit-learn
- Joblib

## Installation

1. **Navigate to the backend directory:**
```powershell
cd Cardio_Project\fastapi_app
```

2. **Create a virtual environment:**
```powershell
python -m venv venv
```

3. **Activate the virtual environment:**
```powershell
.\venv\Scripts\Activate
```

4. **Install dependencies:**
```powershell
pip install -r requirements.txt
```

## Running the Server

### Local Development

**Start the FastAPI server:**
```powershell
python main.py
```

The server will start at: `http://localhost:8000`

### Production (Live API)

**Live Backend URL:** `https://cardio-fastapi-8ijy.onrender.com`

**API Documentation:** `https://cardio-fastapi-8ijy.onrender.com/docs`

**Health Check:** `https://cardio-fastapi-8ijy.onrender.com/health`

## API Endpoints

### 1. Root Endpoint
- **URL:** `GET /`
- **Description:** API information and available endpoints
- **Response:**
```json
{
  "message": "Cardiovascular Disease Prediction API",
  "endpoints": {
    "/predict/logistic": "Logistic Regression prediction",
    "/predict/randomforest": "Random Forest prediction",
    "/health": "API health check"
  }
}
```

### 2. Health Check
- **URL:** `GET /health`
- **Description:** Check if API and models are loaded
- **Response:**
```json
{
  "status": "healthy",
  "models_loaded": true
}
```

### 3. Logistic Regression Prediction
- **URL:** `POST /predict/logistic`
- **Description:** Get prediction using Logistic Regression model
- **Request Body:**
```json
{
  "age": 45,
  "gender": 1,
  "height": 170,
  "weight": 75,
  "ap_hi": 120,
  "ap_lo": 80,
  "cholesterol": 1,
  "gluc": 1,
  "smoke": 0,
  "alco": 0,
  "active": 1
}
```
- **Response:**
```json
{
  "model_type": "Logistic Regression",
  "prediction": 0,
  "probability": 0.3245,
  "risk_level": "Low Risk",
  "message": "Patient is not at significant risk."
}
```

### 4. Random Forest Prediction
- **URL:** `POST /predict/randomforest`
- **Description:** Get prediction using Random Forest model
- **Request Body:** Same as Logistic Regression
- **Response:** Same structure as Logistic Regression

### 5. Compare Both Models
- **URL:** `POST /predict/compare`
- **Description:** Get predictions from both models and compare
- **Request Body:** Same as above
- **Response:**
```json
{
  "logistic_regression": {
    "model_type": "Logistic Regression",
    "prediction": 0,
    "probability": 0.3245,
    "risk_level": "Low Risk",
    "message": "Patient is not at significant risk."
  },
  "random_forest": {
    "model_type": "Random Forest",
    "prediction": 0,
    "probability": 0.2987,
    "risk_level": "Low Risk",
    "message": "Patient is not at significant risk."
  },
  "recommendation": "Both models agree on the prediction."
}
```

## Input Parameters

| Parameter | Type | Description | Valid Range |
|-----------|------|-------------|-------------|
| age | float | Age in years | 1-120 |
| gender | int | 1 = Female, 2 = Male | 1 or 2 |
| height | float | Height in cm | 100-250 |
| weight | float | Weight in kg | 30-200 |
| ap_hi | float | Systolic blood pressure | 60-240 |
| ap_lo | float | Diastolic blood pressure | 40-180 |
| cholesterol | int | 1=Normal, 2=Above normal, 3=Well above | 1, 2, or 3 |
| gluc | int | 1=Normal, 2=Above normal, 3=Well above | 1, 2, or 3 |
| smoke | int | 0=No, 1=Yes | 0 or 1 |
| alco | int | 0=No, 1=Yes | 0 or 1 |
| active | int | 0=No, 1=Yes | 0 or 1 |

## Features

- **Dual Model Support** - Logistic Regression & Random Forest  
- **Automatic Preprocessing** - BMI calculation and feature scaling  
- **Risk Classification** - Low/Moderate/High risk levels  
- **CORS Enabled** - Ready for frontend integration  
- **Input Validation** - Pydantic models for data validation  
- **Interactive Documentation** - Swagger UI at `/docs`  

## Testing the API

### Using Swagger UI (Recommended)

**Local:**
1. Open browser: `http://localhost:8000/docs`
2. Expand any endpoint
3. Click "Try it out"
4. Enter test data
5. Click "Execute"

**Production:**
Open: `https://cardio-fastapi-8ijy.onrender.com/docs`

### Using cURL

**Local:**
```bash
curl -X POST "http://localhost:8000/predict/compare" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 45,
    "gender": 1,
    "height": 170,
    "weight": 75,
    "ap_hi": 120,
    "ap_lo": 80,
    "cholesterol": 1,
    "gluc": 1,
    "smoke": 0,
    "alco": 0,
    "active": 1
  }'
```

**Production:**
```bash
curl -X POST "https://cardio-fastapi-8ijy.onrender.com/predict/compare" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 45,
    "gender": 1,
    "height": 170,
    "weight": 75,
    "ap_hi": 120,
    "ap_lo": 80,
    "cholesterol": 1,
    "gluc": 1,
    "smoke": 0,
    "alco": 0,
    "active": 1
  }'
```

### Using Python Requests
```python
import requests

# Use local or production URL
API_URL = "http://localhost:8000"  # Local
# API_URL = "https://cardio-fastapi-8ijy.onrender.com"  # Production

url = f"{API_URL}/predict/compare"
data = {
    "age": 45,
    "gender": 1,
    "height": 170,
    "weight": 75,
    "ap_hi": 120,
    "ap_lo": 80,
    "cholesterol": 1,
    "gluc": 1,
    "smoke": 0,
    "alco": 0,
    "active": 1
}

response = requests.post(url, json=data)
print(response.json())
```

## Model Files Required

The API automatically downloads model files from GitHub releases on startup if not present locally:
- `logistic_weights.npy` - Logistic Regression weights
- `logistic_bias.npy` - Logistic Regression bias
- `random_forest_model.pkl` - Random Forest model (~202 MB)
- `scaler_num.pkl` - Scaler for numerical features
- `scaler_int.pkl` - Scaler for interaction features

Models are stored in the `models/` directory.

## Frontend Integration

### Using Environment Variables

Create a `.env` file in your frontend project:

```env
# For local development
API_URL=http://localhost:8000

# For production
# API_URL=https://cardio-fastapi-8ijy.onrender.com
```

### JavaScript/React Example

Use the provided `api-config.js`:

```javascript
import { API_ENDPOINTS, apiRequest } from './api-config';

// Make a prediction
const patientData = {
  age: 45,
  gender: 1,
  height: 170,
  weight: 75,
  ap_hi: 120,
  ap_lo: 80,
  cholesterol: 1,
  gluc: 1,
  smoke: 0,
  alco: 0,
  active: 1
};

const result = await apiRequest(API_ENDPOINTS.PREDICT_COMPARE, {
  method: 'POST',
  body: JSON.stringify(patientData),
});

console.log(result);
```

The API config automatically detects the environment and uses the correct URL.

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `422` - Validation Error (invalid input)
- `500` - Internal Server Error

Example error response:
```json
{
  "detail": "Error message here"
}
```

## CORS Configuration

CORS is configured to allow all origins for development. For production, update the `allow_origins` in `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Troubleshooting

### Port Already in Use
Change the port in `main.py`:
```python
uvicorn.run(app, host="0.0.0.0", port=8001)  # Use different port
```

### Models Not Loading
- Verify model files exist in `../models/` directory
- Check file paths are correct
- Ensure models were trained and saved properly

### CORS Errors
- Ensure backend is running before starting frontend
- Check CORS middleware configuration
- Verify API URL in frontend matches backend

## Development

To run in development mode with auto-reload:
```powershell
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Author
**Vishal Baraiya**  
Enrollment No: 23010101014  
Roll No: C3-635  
Course: Machine Learning & Deep Learning Project
