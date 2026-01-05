# 🫀 Cardiovascular Disease Prediction System

A complete end-to-end machine learning project for predicting cardiovascular disease risk using multiple models with a modern full-stack web application.

## 📋 Project Overview

This project implements a comprehensive cardiovascular disease prediction system featuring:
- **Machine Learning Models**: Logistic Regression (from scratch) and Random Forest
- **Backend API**: FastAPI REST API with dual model support
- **Frontend UI**: Modern React.js application with real-time predictions
- **Data Processing**: Complete ETL pipeline from raw data to deployment

## 👨‍🎓 Student Information

**Name:** Vishal Baraiya  
**Enrollment No:** 23010101014  
**Roll No:** C3-635  
**Course:** Machine Learning & Deep Learning Project

---

## 📁 Project Structure

```
Cardio_Project/
│
├── Data/
│   ├── raw/
│   │   └── cardio_train.csv              # Original dataset (70k records)
│   └── processed/
│       └── clean_cardio.csv              # Cleaned dataset
│
├── notebooks/
│   ├── Week1_Exploration.ipynb           # Data exploration & problem definition
│   ├── Week2_Data_Cleaning_Preprocessing_EDA.ipynb  # Data cleaning & feature engineering
│   ├── Week3_ML_Model_From_Scratch.ipynb # Logistic Regression implementation
│   ├── Week3_Random_Forest_Model.ipynb   # Random Forest implementation
│   ├── Week4_Flask_App_and_Visualization.ipynb  # Flask app development
│   └── Week5_Deployment_on_Render.ipynb  # Deployment preparation
│
├── models/
│   ├── logistic_weights.npy             # Logistic Regression weights
│   ├── logistic_bias.npy                # Logistic Regression bias
│   ├── random_forest_model.pkl          # Random Forest model
│   ├── scaler_num.pkl                   # Numerical feature scaler
│   └── scaler_int.pkl                   # Interaction feature scaler
│
├── fastapi_app/                          # 🔥 FastAPI Backend
│   ├── main.py                           # API implementation
│   ├── requirements.txt                  # Python dependencies
│   └── README.md                         # Backend documentation
│
├── react_frontend/                       # ⚛️ React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── PatientForm.js
│   │   │   └── PredictionResults.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md                         # Frontend documentation
│
├── flask_app/                            # Original Flask implementation
│   ├── app.py
│   ├── model_utils.py
│   └── templates/
│
└── README.md                             # This file
```

---

## 🎯 Project Objectives

1. **Data Analysis**: Explore and understand cardiovascular disease patterns
2. **Data Preprocessing**: Clean data, handle outliers, engineer features
3. **Model Development**: Build ML models from scratch and using libraries
4. **Web Application**: Create user-friendly prediction interface
5. **Deployment**: Deploy models as accessible web service

---

## 📊 Dataset Information

**Source:** Kaggle - Cardiovascular Disease Dataset  
**Records:** 70,000 patient records  
**Target:** Binary classification (0 = No CVD, 1 = CVD)

### Features:
| Feature | Description | Type |
|---------|-------------|------|
| age | Age in years | Continuous |
| gender | 1=Female, 2=Male | Categorical |
| height | Height in cm | Continuous |
| weight | Weight in kg | Continuous |
| ap_hi | Systolic blood pressure | Continuous |
| ap_lo | Diastolic blood pressure | Continuous |
| cholesterol | 1=Normal, 2=Above, 3=Well above | Categorical |
| gluc | Glucose level (same scale) | Categorical |
| smoke | 0=No, 1=Yes | Binary |
| alco | Alcohol consumption | Binary |
| active | Physical activity | Binary |
| **cardio** | **Target: CVD presence** | **Binary** |

---

## 🔬 Machine Learning Models

### 1. Logistic Regression (From Scratch)
- **Implementation**: Pure NumPy implementation
- **Features**: Sigmoid activation, gradient descent, class balancing
- **Accuracy**: ~73%
- **Files**: 
  - Training: `notebooks/Week3_ML_Model_From_Scratch.ipynb`
  - Weights: `models/logistic_weights.npy`, `models/logistic_bias.npy`

### 2. Random Forest Classifier
- **Implementation**: Scikit-learn
- **Configuration**: 100 trees, balanced classes
- **Accuracy**: ~72%
- **Features**: Feature importance analysis
- **Files**:
  - Training: `notebooks/Week3_Random_Forest_Model.ipynb`
  - Model: `models/random_forest_model.pkl`

---

## 🚀 Quick Start Guide

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Step 1: Clone and Navigate
```powershell
cd Cardio_Project
```

### Step 2: Start Backend (FastAPI)

```powershell
# Navigate to backend
cd fastapi_app

# Create virtual environment
python -m venv venv
.\venv\Scripts\Activate

# Install dependencies
pip install -r requirements.txt

# Run server
python main.py
```

✅ Backend running at: `http://localhost:8000`  
📚 API Docs: `http://localhost:8000/docs`

### Step 3: Start Frontend (React)

**Open NEW terminal:**

```powershell
# Navigate to frontend
cd Cardio_Project\react_frontend

# Install dependencies
npm install

# Start development server
npm start
```

✅ Frontend running at: `http://localhost:3000`

---

## 🎨 Application Features

### Backend (FastAPI)
- ✅ Dual model predictions (Logistic Regression & Random Forest)
- ✅ RESTful API with automatic documentation
- ✅ Input validation using Pydantic
- ✅ CORS enabled for frontend integration
- ✅ Risk level classification (Low/Moderate/High)
- ✅ Model comparison endpoint

**Key Endpoints:**
- `POST /predict/logistic` - Logistic Regression prediction
- `POST /predict/randomforest` - Random Forest prediction
- `POST /predict/compare` - Compare both models
- `GET /health` - Health check

[📖 Full Backend Documentation](fastapi_app/README.md)

### Frontend (React)
- ✅ Modern, responsive UI with gradient design
- ✅ Comprehensive patient data form
- ✅ Real-time predictions with loading states
- ✅ Side-by-side model comparison
- ✅ Visual risk indicators (color-coded)
- ✅ Probability bars and recommendations
- ✅ Error handling and validation
- ✅ Mobile-friendly design

[📖 Full Frontend Documentation](react_frontend/README.md)

---

## 📓 Jupyter Notebooks Workflow

### Week 1: Exploration
**File:** `notebooks/Week1_Exploration.ipynb`
- Problem definition
- Dataset loading and inspection
- Basic statistics
- Initial visualizations
- Target variable distribution

### Week 2: Data Cleaning & Preprocessing
**File:** `notebooks/Week2_Data_Cleaning_Preprocessing_EDA.ipynb`
- Handle duplicates
- Convert age (days → years)
- Fix blood pressure outliers
- Remove unrealistic height/weight values
- Feature engineering (BMI, interaction terms)
- Scaling (StandardScaler)
- EDA with correlation analysis

### Week 3: Model Development (Logistic Regression)
**File:** `notebooks/Week3_ML_Model_From_Scratch.ipynb`
- Implement Logistic Regression from scratch
- Sigmoid function, loss calculation
- Gradient descent with class balancing
- Train-test split
- Model evaluation (accuracy, precision, recall, F1, ROC-AUC)
- Confusion matrix and ROC curve
- Save model parameters

### Week 3: Model Development (Random Forest)
**File:** `notebooks/Week3_Random_Forest_Model.ipynb`
- Random Forest classifier training
- 100 decision trees
- Feature importance analysis
- Model evaluation metrics
- Comparison with Logistic Regression
- Model persistence with pickle

### Week 4: Flask Application
**File:** `notebooks/Week4_Flask_App_and_Visualization.ipynb`
- Load trained models
- Create Flask app structure
- HTML templates (input form, results page)
- Model inference functions
- Visualization generation

### Week 5: Deployment
**File:** `notebooks/Week5_Deployment_on_Render.ipynb`
- Deployment preparation
- Requirements file generation
- Configuration setup
- Cloud deployment guide

---

## 🔧 API Usage Examples

### Using cURL
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

### Using Python
```python
import requests

url = "http://localhost:8000/predict/compare"
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

---

## 📈 Model Performance

### Logistic Regression
- **Accuracy**: ~73%
- **Precision**: 0.72
- **Recall**: 0.75
- **F1 Score**: 0.73
- **ROC-AUC**: 0.80

### Random Forest
- **Accuracy**: ~72%
- **Precision**: 0.71
- **Recall**: 0.74
- **F1 Score**: 0.72
- **ROC-AUC**: 0.79

### Key Insights
- Both models show similar performance
- Age and blood pressure are top predictive features
- Models complement each other well
- Ensemble approach recommended for production

---

## 🧪 Testing

### Test the Backend API
```powershell
# Health check
curl http://localhost:8000/health

# Interactive docs
# Open browser: http://localhost:8000/docs
```

### Test the Frontend
1. Open `http://localhost:3000`
2. Fill the patient form
3. Click "Predict Risk"
4. Verify both model results appear
5. Test with different inputs

---

## 🐛 Troubleshooting

### Backend Issues

**Models not loading:**
- Verify all model files exist in `models/` directory
- Check file paths in `main.py`
- Ensure models were trained and saved properly

**Port already in use:**
```python
# In main.py, change:
uvicorn.run(app, host="0.0.0.0", port=8001)
```

**CORS errors:**
- Ensure backend is running first
- Check CORS middleware configuration
- Verify frontend API URL matches backend

### Frontend Issues

**npm install fails:**
```powershell
Remove-Item -Recurse node_modules
Remove-Item package-lock.json
npm install
```

**API connection fails:**
- Verify backend is running on port 8000
- Check API_URL in `src/App.js`
- Open browser console for error details

**Port 3000 in use:**
- React will prompt to use different port
- Or set manually: `$env:PORT=3001; npm start`

---

## 📚 Technologies Used

### Machine Learning
- Python 3.8+
- NumPy - Array operations and math
- Pandas - Data manipulation
- Scikit-learn - ML algorithms and preprocessing
- Matplotlib & Seaborn - Visualization
- Joblib - Model serialization

### Backend
- FastAPI - Modern Python web framework
- Uvicorn - ASGI server
- Pydantic - Data validation
- Python-multipart - Form data handling

### Frontend
- React 18 - UI library
- Axios - HTTP client
- CSS3 - Styling and animations
- Recharts - Data visualization (planned)

---

## 🎓 Learning Outcomes

Through this project, the following concepts were demonstrated:

1. **Data Science**
   - Exploratory Data Analysis (EDA)
   - Data cleaning and preprocessing
   - Feature engineering
   - Handling imbalanced datasets

2. **Machine Learning**
   - Implementing algorithms from scratch
   - Using scikit-learn library
   - Model evaluation and comparison
   - Cross-validation techniques
   - Feature importance analysis

3. **Software Engineering**
   - RESTful API design
   - Frontend-backend integration
   - Error handling and validation
   - Code organization and documentation
   - Version control with Git

4. **Web Development**
   - React component architecture
   - State management
   - Responsive design
   - API integration
   - User experience (UX) design

---

## 🚀 Future Enhancements

- [ ] **Model Improvements**
  - Add more advanced models (XGBoost, Neural Networks)
  - Implement hyperparameter tuning
  - Add model explainability (SHAP values)

- [ ] **Application Features**
  - User authentication and profiles
  - Patient history tracking
  - Export predictions as PDF
  - Email notifications for high-risk patients
  - Multi-language support

- [ ] **Deployment**
  - Docker containerization
  - Deploy to cloud (AWS/Azure/Render)
  - CI/CD pipeline
  - Monitoring and logging
  - Load balancing

- [ ] **UI/UX**
  - Data visualization dashboard
  - Historical trends charts
  - Comparison with population averages
  - Dark mode support

---

## ⚠️ Important Notes

### Medical Disclaimer
This application is for **educational purposes only** and should not be used for actual medical diagnosis. Always consult qualified healthcare professionals for medical advice and diagnosis.

### Data Privacy
- No patient data is stored
- All predictions are processed in real-time
- HIPAA compliance not implemented (educational project)

### Limitations
- Models trained on specific dataset - may not generalize to all populations
- Limited feature set - real diagnosis requires more comprehensive evaluation
- Performance metrics are educational benchmarks

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review component-specific READMEs:
   - [Backend Documentation](fastapi_app/README.md)
   - [Frontend Documentation](react_frontend/README.md)
3. Check browser console for frontend errors
4. Check terminal logs for backend errors

---

## 📄 License

This project is part of an academic course and is intended for educational purposes only.

---

## 🙏 Acknowledgments

- Dataset: Kaggle Cardiovascular Disease Dataset
- Course: Machine Learning & Deep Learning
- Institution: [Your University Name]
- Instructor: [Instructor Name]

---

## 📊 Project Statistics

- **Total Lines of Code**: ~3000+
- **Number of Components**: 8 (Frontend + Backend)
- **API Endpoints**: 5
- **Models Implemented**: 2
- **Development Time**: 5 weeks
- **Technologies**: 10+

---

**Built with ❤️ by Vishal Baraiya**  
*23010101014 | C3-635*  
*Machine Learning & Deep Learning Project - 2026*
