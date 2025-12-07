# ❤️ Cardiovascular Disease Prediction System
### Machine Learning + Flask Web Application

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.1.1-green.svg)
![Machine Learning](https://img.shields.io/badge/ML-Logistic%20Regression-orange.svg)
![Status](https://img.shields.io/badge/Status-Active-success.svg)

This project predicts the risk of **Cardiovascular Disease** using patient health parameters such as age, blood pressure, cholesterol, BMI, and lifestyle habits. The ML model (Logistic Regression) is implemented **from scratch using NumPy**, and deployed using a **Flask Web Application** with a modern, responsive UI.

---

## 🚀 Features

- ✅ **Logistic Regression implemented from scratch** (No sklearn for training)
- ✅ **Interactive Web UI** with real-time validation and user-friendly design
- ✅ **Pre-filled demo data** for quick testing (Low Risk & High Risk examples)
- ✅ **Automated BMI calculation** from height and weight
- ✅ **Comprehensive data preprocessing** including outlier removal and feature engineering
- ✅ **Scalable Flask backend** with error handling and logging
- ✅ **Model artifacts saved** (weights, bias, scaler) for efficient deployment
- ✅ **Mobile-responsive design** for all device sizes
- ✅ **Medical disclaimer** for responsible AI usage

---

## 📁 Project Structure

```
Cardio_Project/
│
├── Data/
│   ├── raw/
│   │   └── cardio_train.csv              # Original dataset
│   └── processed/
│       └── clean_cardio.csv              # Cleaned and preprocessed data
│
├── models/
│   ├── logistic_weights.npy             # Trained model weights
│   ├── logistic_bias.npy                # Trained model bias
│   └── scaler.pkl                       # StandardScaler for feature normalization
│
├── flask_app/
│   ├── app.py                           # Main Flask application
│   ├── model_utils.py                   # Prediction logic and model loading
│   ├── requirements.txt                 # Flask app dependencies
│   ├── templates/
│   │   ├── index.html                   # Home page with input form
│   │   └── result.html                  # Prediction results page
│   ├── static/
│   │   └── style.css                    # Styling and animations
│   └── __pycache__/                     # Python cache files
│
├── notebooks/
│   ├── Week1_Exploration.ipynb          # Initial data exploration
│   ├── Week2_Data_Cleaning_Preprocessing_EDA.ipynb
│   ├── Week3_ML_Model_From_Scratch.ipynb
│   ├── Week4_Flask_App_and_Visualization.ipynb
│   └── Week5_Deployment_on_Render.ipynb
│
├── PDFs/                                # Project documentation
├── requirements.txt                     # Project dependencies
└── README.md                           # This file
```

---

## 🧠 Machine Learning Workflow

### **Week 1 – Data Exploration**
- Loaded the Kaggle Cardiovascular Disease dataset
- Performed initial exploratory data analysis (EDA)
- Visualized feature distributions and correlations
- Identified data quality issues

### **Week 2 – Data Cleaning & Preprocessing**
- Converted age from days to years
- Removed outliers using IQR method
- Created BMI feature from height and weight
- Applied StandardScaler to numerical features
- Saved cleaned dataset and scaler object

### **Week 3 – Model Training**
- Implemented Logistic Regression from scratch using NumPy
- Sigmoid activation function with numerical stability
- Trained using Gradient Descent optimization
- Evaluated model performance (accuracy, precision, recall)
- Saved model artifacts:
  - `logistic_weights.npy` (11 features)
  - `logistic_bias.npy`
  - `scaler.pkl` (6 continuous features)

### **Week 4 – Flask Application Development**
- Built Flask web application with routes
- Created prediction pipeline in `model_utils.py`
- Designed responsive HTML/CSS UI
- Implemented input validation and error handling
- Added demo data buttons for testing

### **Week 5 – Deployment**
- Prepared for deployment on Render
- Created requirements.txt
- Configured for production environment
- Added logging and monitoring

---

## ⚙️ Installation & Setup

### **Prerequisites**
- Python 3.8 or higher
- pip package manager
- Virtual environment (recommended)

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/mr-baraiya/Machine-Learning-Deep-Learning-hub.git
cd Machine-Learning-Deep-Learning-hub/Cardio_Project
```

### **2️⃣ Create Virtual Environment**

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### **3️⃣ Install Dependencies**

```bash
pip install -r requirements.txt
```

### **4️⃣ Run the Flask Application**

```bash
cd flask_app
python app.py
```

The application will be available at:
```
http://127.0.0.1:5000
```

---

## 🎯 How to Use

### **Web Interface**

1. **Navigate to the home page** at `http://127.0.0.1:5000`

2. **Fill in patient information:**
   - Age (years)
   - Height (cm)
   - Weight (kg)
   - Systolic Blood Pressure (mmHg)
   - Diastolic Blood Pressure (mmHg)
   - Cholesterol Level (Normal/Above Normal/Well Above Normal)
   - Blood Glucose Level (Normal/Above Normal/Well Above Normal)
   - Smoking Status (Yes/No)
   - Alcohol Consumption (Yes/No)
   - Physical Activity (Yes/No)

3. **Or use demo data:**
   - Click "Fill Low Risk Demo" for healthy patient profile
   - Click "Fill High Risk Demo" for high-risk patient profile

4. **Submit** and view the prediction results with:
   - Risk classification (High Risk / Low Risk)
   - Confidence score percentage
   - Visual progress bar
   - Risk-based recommendations

---

## 🔍 Model Details

### **Features Used (11 total)**

**Continuous Features (scaled):**
1. Age (years)
2. Height (cm)
3. Weight (kg)
4. Systolic Blood Pressure (ap_hi)
5. Diastolic Blood Pressure (ap_lo)
6. BMI (calculated)

**Categorical Features (not scaled):**
7. Cholesterol (1=Normal, 2=Above, 3=Well Above)
8. Glucose (1=Normal, 2=Above, 3=Well Above)
9. Smoking (0=No, 1=Yes)
10. Alcohol (0=No, 1=Yes)
11. Physical Activity (0=No, 1=Yes)

### **Prediction Pipeline**

```python
# 1. Separate features
continuous_features = [age, height, weight, ap_hi, ap_lo, bmi]
categorical_features = [cholesterol, gluc, smoke, alco, active]

# 2. Scale continuous features
scaled_continuous = scaler.transform(continuous_features)

# 3. Concatenate with categorical
final_features = [scaled_continuous + categorical_features]

# 4. Compute prediction
z = weights · final_features + bias
probability = sigmoid(z)
prediction = 1 if probability ≥ 0.5 else 0
```

### **Input Validation Ranges**

| Feature | Minimum | Maximum |
|---------|---------|---------|
| Age | 1 | 120 |
| Height | 50 cm | 250 cm |
| Weight | 20 kg | 300 kg |
| Systolic BP | 50 mmHg | 300 mmHg |
| Diastolic BP | 30 mmHg | 200 mmHg |
| BMI | 10 | 60 |
| Cholesterol | 1 | 3 |
| Glucose | 1 | 3 |
| Smoking | 0 | 1 |
| Alcohol | 0 | 1 |
| Activity | 0 | 1 |

---

## 🚀 Deployment on Render

### **Step 1: Prepare for Deployment**

Ensure you have:
- `requirements.txt` in the root directory
- `Procfile` or use Render's auto-detection
- All model files in `models/` directory

### **Step 2: Push to GitHub**

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### **Step 3: Deploy on Render**

1. Go to [Render.com](https://render.com)
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Configure settings:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `cd flask_app && gunicorn app:app`
   - **Python Version:** 3.8+

5. Click **Deploy** 🚀

Your app will be live at: `https://your-app-name.onrender.com`

---

## 📦 Dependencies

```txt
flask==3.1.1
flask-cors==6.0.1
numpy==2.2.2
pandas==2.2.3
scikit-learn==1.6.1
joblib==1.5.2
gunicorn==23.0.0
```

---

## 🎨 UI Features

- **Modern gradient design** with medical-friendly blue theme
- **Real-time input validation** with visual feedback
- **Responsive layout** for mobile, tablet, and desktop
- **Animated results** with fade-in effects and progress bars
- **Color-coded risk display** (Green for Low Risk, Red for High Risk)
- **Confidence meter** showing prediction probability
- **Contextual recommendations** based on risk level
- **Medical disclaimer** for responsible AI usage

---

## 📊 Sample Predictions

### **Low Risk Example**
```
Age: 45 years
Height: 170 cm
Weight: 68 kg
Blood Pressure: 115/75 mmHg
Cholesterol: Normal
Glucose: Normal
Smoking: No
Alcohol: No
Physical Activity: Yes

→ Prediction: Low Risk (34% probability)
```

### **High Risk Example**
```
Age: 62 years
Height: 165 cm
Weight: 95 kg
Blood Pressure: 160/105 mmHg
Cholesterol: Well Above Normal
Glucose: Well Above Normal
Smoking: Yes
Alcohol: Yes
Physical Activity: No

→ Prediction: High Risk (78% probability)
```

---

## 🎤 Viva Preparation

### **Key Questions & Answers**

**Q1: Why did you choose Flask over other frameworks?**
Flask is lightweight, easy to learn, and perfect for deploying machine learning models. It provides flexibility without unnecessary complexity, making it ideal for our prediction application.

**Q2: Why did you save the scaler separately?**
The scaler must use the same mean and standard deviation from training data to ensure consistent feature normalization for new predictions. This prevents data leakage and maintains model accuracy.

**Q3: Why Logistic Regression for this problem?**
Logistic Regression is ideal for binary classification (disease/no disease), is interpretable for medical contexts, trains quickly, and provides probability estimates that help assess confidence in predictions.

**Q4: How does your model make predictions?**
1. Normalize continuous features using the saved scaler
2. Concatenate with categorical features
3. Compute weighted sum: z = w·x + b
4. Apply sigmoid function: p = 1/(1 + e^(-z))
5. Classify based on threshold (0.5)

**Q5: What preprocessing steps did you perform?**
- Converted age from days to years
- Removed outliers using IQR method
- Created BMI feature
- Applied StandardScaler to continuous features
- Validated data ranges

**Q6: How do you handle invalid inputs?**
- Frontend validation with min/max constraints
- Backend validation with try-except blocks
- Clear error messages displayed to users
- Logging for debugging and monitoring

**Q7: What are the limitations of your model?**
- Based on statistical patterns, not a medical diagnosis
- Requires accurate input data
- Limited to features in training dataset
- Should be used as a screening tool only

---

## ⚠️ Disclaimer

**This tool is for educational and informational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical concerns.**

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Vishal Baraiya**
- GitHub: [@mr-baraiya](https://github.com/mr-baraiya)
- Project Repository: [Cardio_Project](https://github.com/mr-baraiya/Machine-Learning-Deep-Learning-hub/tree/main/Cardio_Project)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- Dataset: [Kaggle Cardiovascular Disease Dataset](https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset)
- Flask Documentation
- Scikit-learn Documentation
- Stack Overflow Community

---

## 📈 Future Enhancements

- [ ] Add more ML algorithms (Random Forest, XGBoost)
- [ ] Implement model comparison dashboard
- [ ] Add data visualization charts on results page
- [ ] Create REST API with authentication
- [ ] Add user account system to track history
- [ ] Implement A/B testing for UI improvements
- [ ] Add multilingual support
- [ ] Create mobile app version
- [ ] Add SHAP values for model explainability
- [ ] Implement continuous model retraining pipeline

---

## 📞 Support

For questions or support, please:
- Open an issue on [GitHub](https://github.com/mr-baraiya/Machine-Learning-Deep-Learning-hub/issues)
- Star ⭐ this repository if you find it helpful!

---

<div align="center">

### Made with ❤️ and Python

**If this project helped you, please give it a ⭐**

</div>
