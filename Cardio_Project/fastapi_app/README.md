# CardioSense Backend API

**AI-Powered Cardiovascular Disease Prediction System**

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.13+-3776AB.svg)](https://www.python.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](../LICENSE)

## Live Links

- **Backend API**: [https://cardio-fastapi-8ijy.onrender.com](https://cardio-fastapi-8ijy.onrender.com)
- **API Documentation (Swagger)**: [https://cardio-fastapi-8ijy.onrender.com/docs](https://cardio-fastapi-8ijy.onrender.com/docs)
- **Frontend Application**: [https://cardiosense.netlify.app](https://cardiosense.netlify.app)
- **ML Models (Hugging Face)**: [cardio-disease-model](https://huggingface.co/mr-baraiya/cardio-disease-model)
- **Dataset (Kaggle)**: [Cardiovascular Disease Dataset](https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset)
- **GitHub Repository**: [Cardio_Project](https://github.com/vishalbharaiya007/Cardio_Project)

---

## 🎯 Overview

CardioSense Backend is a production-ready FastAPI service that provides cardiovascular disease risk prediction using machine learning models. The API features:

- **Dual ML Models**: Random Forest (70.56% accuracy) & Logistic Regression (72.77% accuracy)
- **Real-time Predictions**: Fast inference with pre-trained models
- **PDF Report Generation**: Professional health reports with ReportLab
- **Email Service**: Resend-based email delivery with PDF attachments
- **Auto Model Loading**: Downloads models from Hugging Face on startup
- **CORS Enabled**: Seamless frontend integration

---

## Features

### Machine Learning
- **Random Forest Classifier**: Ensemble model with 70.56% accuracy
- **Logistic Regression**: Custom implementation with 72.77% accuracy
- **Feature Engineering**: BMI calculation and interaction features
- **Preprocessing**: StandardScaler for numerical and integer features

### Email Service
- **Resend Integration**: API-based email delivery
- **PDF Attachments**: Professional health reports
- **HTML Email Body**: Rich formatted emails
- **Error Handling**: Comprehensive error management

### PDF Generation
- **Professional Layout**: ReportLab-based PDF creation
- **Patient Metrics**: Complete health data visualization
- **Risk Assessment**: Color-coded results (Red: High Risk, Green: Low Risk)
- **Recommendations**: Personalized health advice
- **Medical Disclaimer**: Legal compliance

### Security
- **Environment Variables**: Secure credential management
- **Input Validation**: Pydantic models with field constraints
- **CORS Configuration**: Controlled origin access
- **Email Validation**: EmailStr type checking

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| FastAPI | 0.110+ | Web framework |
| Uvicorn | 0.27+ | ASGI server |
| Python | 3.13+ | Runtime |
| Pydantic | 2.0+ | Data validation |
| Scikit-learn | 1.3+ | ML models |
| NumPy | 1.24+ | Numerical computing |
| Joblib | 1.3+ | Model serialization |
| ReportLab | 4.0.0+ | PDF generation |
| python-dotenv | 1.0.0+ | Environment variables |
| email-validator | 2.0.0+ | Email validation |
| Resend | 0.8.0+ | Email delivery |

---

## Quick Start

### Prerequisites
- Python 3.13 or higher
- pip (Python package manager)
- Resend account (for email service)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/vishalbharaiya007/Cardio_Project.git
cd Cardio_Project/fastapi_app
```

### 2. Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create `.env` file in `fastapi_app/` directory:

```env
# Resend Email Configuration
RESEND_API_KEY=your_resend_api_key
RESEND_FROM=CardioSense <reports@resend.dev>
```

**📝 Note**: Create an API key in your Resend dashboard and verify the sending domain or use a Resend-provided address.

### 5. Run Server
```bash
# Development
python main.py

# Production
uvicorn main:app --host 0.0.0.0 --port 8000
```

Server will start at: `http://localhost:8000`

### 6. Access API Documentation
Open browser: `http://localhost:8000/docs`

---

## API Endpoints

### Health Check
**GET** `/health`

Check if server is running.

**Response:**
```json
{
  "status": "healthy",
  "message": "CardioSense API is running"
}
```

---

### Random Forest Prediction
**POST** `/predict/randomforest`

Predict using Random Forest model (70.56% accuracy).

**Request Body:**
```json
{
  "age": 45,
  "gender": 2,
  "height": 175,
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

**Response:**
```json
{
  "prediction": 0,
  "probability": 0.15,
  "model": "Random Forest"
}
```

---

### Logistic Regression Prediction
**POST** `/predict/logistic`

Predict using Logistic Regression model (72.77% accuracy).

**Request Body:** (same as Random Forest)

**Response:**
```json
{
  "prediction": 0,
  "probability": 0.22,
  "model": "Logistic Regression"
}
```

---

### Compare Models
**POST** `/predict/compare`

Get predictions from both models.

**Request Body:** (same as above)

**Response:**
```json
{
  "random_forest": {
    "prediction": 0,
    "probability": 0.15,
    "model": "Random Forest"
  },
  "logistic_regression": {
    "prediction": 0,
    "probability": 0.22,
    "model": "Logistic Regression"
  }
}
```

---

### Send Email Report
**POST** `/send-report`

Generate PDF and send via email.

**Request Body:**
```json
{
  "to_email": "patient@example.com",
  "patient_name": "John Doe",
  "model_type": "randomforest",
  "patient_data": {
    "age": 45,
    "gender": 2,
    "height": 175,
    "weight": 75,
    "ap_hi": 120,
    "ap_lo": 80,
    "cholesterol": 1,
    "gluc": 1,
    "smoke": 0,
    "alco": 0,
    "active": 1
  },
  "prediction_result": {
    "risk_level": "Low Risk",
    "probability": 0.15
  }
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Report successfully sent to patient@example.com",
  "timestamp": "2026-01-05T12:30:45.123456",
  "recipient": "patient@example.com",
  "patient_name": "John Doe",
  "risk_level": "Low Risk",
  "probability": "15.00%"
}
```

---

## Input Validation

| Field | Type | Range | Description |
|-------|------|-------|-------------|
| age | float | 0-120 | Age in years |
| gender | int | 1-2 | 1=Female, 2=Male |
| height | float | >50 | Height in cm |
| weight | float | >20 | Weight in kg |
| ap_hi | float | >50 | Systolic BP (mmHg) |
| ap_lo | float | >30 | Diastolic BP (mmHg) |
| cholesterol | int | 1-3 | 1=Normal, 2=Above, 3=High |
| gluc | int | 1-3 | 1=Normal, 2=Above, 3=High |
| smoke | int | 0-1 | 0=No, 1=Yes |
| alco | int | 0-1 | 0=No, 1=Yes |
| active | int | 0-1 | 0=No, 1=Yes |

---

## Email Configuration

### Resend Setup

1. **Create API Key**
  - In Resend dashboard, create an API key.

2. **Verify From Address**
  - Use the verified sender/domain (e.g., `CardioSense <reports@cardiosense.ai>`).

3. **Update .env File**
  ```env
  RESEND_API_KEY=your_resend_api_key
  RESEND_FROM=CardioSense <reports@resend.dev>
  ```

### Test Email
Use Swagger UI at `/docs` to test email functionality.

---

## Deployment

### Deploy on Render

1. **Create Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → Web Service
   - Connect GitHub repository

2. **Configure Service**
   - **Name**: cardio-fastapi
   - **Environment**: Python 3.13
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Add Environment Variables**
  - RESEND_API_KEY
  - RESEND_FROM

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)

---

## Testing

### Using Swagger UI
1. Open `http://localhost:8000/docs`
2. Click "Try it out" on any endpoint
3. Fill in request body
4. Click "Execute"

### Using cURL

**Health Check:**
```bash
curl http://localhost:8000/health
```

**Prediction:**
```bash
curl -X POST "http://localhost:8000/predict/randomforest" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 45, "gender": 2, "height": 175, "weight": 75,
    "ap_hi": 120, "ap_lo": 80, "cholesterol": 1,
    "gluc": 1, "smoke": 0, "alco": 0, "active": 1
  }'
```

---

## Project Structure

```
fastapi_app/
├── main.py                 # FastAPI application
├── requirements.txt        # Dependencies
├── .env                    # Environment variables (create this)
├── .env.example           # Environment template
├── README.md              # This file
└── models/                # Auto-created, stores ML models
    ├── random_forest_model.pkl
    ├── scaler_int.pkl
    ├── scaler_num.pkl
    ├── logistic_weights.npy
    └── logistic_bias.npy
```

---

## Security Best Practices

1. **Never commit `.env` file** to version control
2. **Use App Passwords** for Gmail (not regular password)
3. **Enable HTTPS** in production (Render provides this)
4. **Validate all inputs** (Pydantic handles this)
5. **Rate limiting** (consider adding in production)
6. **API Keys** (add authentication for production)

---

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

## Author

**Vishal Baraiya**

- GitHub: [@vishalbharaiya007](https://github.com/vishalbharaiya007)
- Email: vvbaraiya32@gmail.com

---

## Acknowledgments

- **Dataset**: [Cardiovascular Disease Dataset](https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset) from Kaggle
- **ML Models**: Trained using scikit-learn
- **Deployment**: Render.com
- **Model Hosting**: Hugging Face

---

## Support

For issues or questions:
- Email: vvbaraiya32@gmail.com
- Issues: [GitHub Issues](https://github.com/vishalbharaiya007/Cardio_Project/issues)

---

<div align="center">

**Made with love for better cardiovascular health**

Star this repo if you find it helpful!

[Frontend](https://cardiosense.netlify.app) • [API Docs](https://cardio-fastapi-8ijy.onrender.com/docs) • [GitHub](https://github.com/vishalbharaiya007/Cardio_Project)

</div>
