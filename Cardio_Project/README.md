# CardioSense - Cardiovascular Disease Prediction System

**Complete End-to-End Machine Learning Project with Full-Stack Web Application**

[![Python](https://img.shields.io/badge/Python-3.13+-3776AB.svg)](https://www.python.org)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg)](https://fastapi.tiangolo.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Live Application

- **Frontend**: [https://cardiosense.netlify.app](https://cardiosense.netlify.app)
- **Backend API**: [https://cardio-fastapi-8ijy.onrender.com](https://cardio-fastapi-8ijy.onrender.com)
- **API Documentation**: [https://cardio-fastapi-8ijy.onrender.com/docs](https://cardio-fastapi-8ijy.onrender.com/docs)
- **ML Models**: [Hugging Face Repository](https://huggingface.co/mr-baraiya/cardio-disease-model)
- **Dataset**: [Cardiovascular Disease Dataset](https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset)
- **GitHub**: [Project Repository](https://github.com/vishalbharaiya007/Cardio_Project)

---

## Project Overview

CardioSense is a comprehensive cardiovascular disease risk prediction system that leverages machine learning to assess patient health data and provide accurate risk assessments. The project features dual ML models, a production-ready backend API, and a modern frontend application.

### Key Features

- **Dual ML Models**: Random Forest (Test accuracy: 0.747, CV: 0.703 ± 0.004) & Logistic Regression (Test accuracy: 0.729, CV: 0.728 ± 0.004)
- **Full-Stack Application**: React frontend + FastAPI backend
- **Real-time Predictions**: Instant risk assessment with probability scores
- **PDF Reports**: Professional health reports with ReportLab
- **Email Service**: SMTP-based email with PDF attachments
- **Modern UI/UX**: Professional medical-themed design
- **Responsive**: Works on desktop, tablet, and mobile
- **Secure**: Input validation, environment variables, HTTPS

---

## Student Information

**Name:** Vishal Baraiya  
**GitHub:** [@vishalbharaiya007](https://github.com/vishalbharaiya007)  
**Email:** vvbaraiya32@gmail.com  
**Course:** Machine Learning & Deep Learning Project  

---

## Application Screenshots

### Landing Page
Professional home page with CardioSense branding and feature highlights.

### Prediction Form
Comprehensive patient data collection with custom validation and demo data.

### Results Dashboard
- Individual model results (Logistic Regression & Random Forest)
- Comparative analysis with side-by-side comparison
- Color-coded risk levels and probability bars
- Personalized health recommendations

### PDF Reports
Professional health reports with patient data, predictions, and recommendations sent via email.

---

## Technology Stack

### Frontend
- **React 18.2.0**: UI framework
- **Vite 7.3.0**: Build tool and dev server
- **Tailwind CSS v4**: Utility-first styling
- **React Router 7.11.0**: Client-side routing
- **Axios 1.6.2**: HTTP client
- **Framer Motion 12.23.27**: Smooth animations
- **jsPDF 4.0.0**: Client-side PDF generation
- **Lucide React 0.562.0**: Icon library

### Backend
- **FastAPI 0.110+**: Modern web framework
- **Uvicorn 0.27+**: ASGI server
- **Python 3.13+**: Programming language
- **Pydantic 2.0+**: Data validation
- **Scikit-learn 1.3+**: ML models
- **ReportLab 4.0.0+**: PDF generation
- **python-dotenv 1.0.0+**: Environment management

### Machine Learning
- **Random Forest Classifier**: Ensemble model (Test accuracy: 0.747, CV: 0.703 ± 0.004)
- **Logistic Regression**: Custom implementation (Test accuracy: 0.729, CV: 0.728 ± 0.004)
- **StandardScaler**: Feature normalization
- **Feature Engineering**: BMI calculation, interaction features

### Deployment
- **Frontend**: Netlify
- **Backend**: Render.com
- **Model Storage**: Hugging Face Hub
- **Version Control**: Git & GitHub

---

## Project Structure

```
Cardio_Project/
│
├── Data/                              # Dataset files
│   ├── raw/
│   │   └── cardio_train.csv          # Original dataset (70k records)
│   └── processed/
│       └── clean_cardio.csv          # Cleaned dataset
│
├── notebooks/                         # Jupyter notebooks
│   ├── Week1_Exploration.ipynb       # Data exploration
│   ├── Week2_Data_Cleaning_Preprocessing_EDA.ipynb
│   ├── Week3_ML_Model_From_Scratch.ipynb
│   ├── Week3_Random_Forest_Model.ipynb
│   ├── Week4_Flask_App_and_Visualization.ipynb
│   └── Week5_Deployment_on_Render.ipynb
│
├── fastapi_app/                       # Backend API
│   ├── main.py                       # FastAPI application
│   ├── requirements.txt              # Python dependencies
│   ├── .env                          # Environment variables
│   ├── .env.example                  # Environment template
│   ├── README.md                     # Backend documentation
│   └── models/                       # ML models (auto-downloaded)
│
├── frontend/                          # React application
│   ├── src/
│   │   ├── components/               # Reusable components
│   │   ├── pages/                    # Route pages
│   │   ├── services/                 # API services
│   │   ├── utils/                    # Utility functions
│   │   ├── App.jsx                   # Main app component
│   │   └── main.jsx                  # Entry point
│   ├── public/                       # Static assets
│   ├── package.json                  # Node dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   └── README.md                     # Frontend documentation
│
├── models/                            # Saved model files
│   ├── random_forest_model.pkl
│   ├── scaler_int.pkl
│   ├── scaler_num.pkl
│   ├── logistic_weights.npy
│   └── logistic_bias.npy
│
├── PDFs/                              # Project documentation
├── LICENSE                            # MIT License
├── requirements.txt                   # Root Python dependencies
└── README.md                          # This file
```

---

## Quick Start

### Prerequisites
- Python 3.13+
- Node.js 18+
- npm
- Git
- Gmail account (for email service)

### 1. Clone Repository
```bash
git clone https://github.com/vishalbharaiya007/Cardio_Project.git
cd Cardio_Project
```

### 2. Backend Setup

```bash
cd fastapi_app

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your SMTP credentials

# Run server
python main.py
```

Backend will be available at: `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
# Add VITE_API_URL=http://localhost:8000

# Run development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## Dataset Information

**Source**: [Cardiovascular Disease Dataset on Kaggle](https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset)

- **Records**: 70,000 patient records
- **Features**: 11 health metrics + 1 target variable
- **Target**: Binary classification (0 = No CVD, 1 = CVD)

### Features
| Feature | Type | Description |
|---------|------|-------------|
| age | int | Age in days |
| gender | int | 1=Female, 2=Male |
| height | int | Height in cm |
| weight | float | Weight in kg |
| ap_hi | int | Systolic blood pressure |
| ap_lo | int | Diastolic blood pressure |
| cholesterol | int | 1=Normal, 2=Above, 3=High |
| gluc | int | 1=Normal, 2=Above, 3=High |
| smoke | int | 0=No, 1=Yes |
| alco | int | 0=No, 1=Yes |
| active | int | 0=No, 1=Yes |
| cardio | int | Target variable (0/1) |

---

## Machine Learning Models

### Random Forest Classifier
- **Type**: Ensemble Learning
- **Accuracy**: 74.74%
- **Features**: 13 (original + engineered)
- **Trees**: 100 estimators
- **Max Depth**: None
- **Training**: Scikit-learn

### Logistic Regression (Custom)
- **Type**: Binary Classification
- **Accuracy**: 72.93%
- **Implementation**: From scratch (NumPy)
- **Features**: 13 (original + engineered)
- **Regularization**: L2 (Ridge)
- **Optimizer**: Gradient Descent

### Feature Engineering
- **BMI**: weight / (height/100)²
- **Pulse Pressure**: ap_hi - ap_lo
- **MAP**: (ap_hi + 2*ap_lo) / 3
- **Interaction Features**: age_bmi, bp_product, etc.

---

## API Endpoints

### Health Check
```http
GET /health
```

### Predictions
```http
POST /predict/randomforest
POST /predict/logistic
POST /predict/compare
```

### Email Report
```http
POST /send-report
```

See [API Documentation](https://cardio-fastapi-8ijy.onrender.com/docs) for detailed request/response schemas.

---

## Email Service Configuration

1. **Enable Gmail 2-Step Verification**
   - Go to [Google Account Security](https://myaccount.google.com/security)

2. **Generate App Password**
   - App Passwords → Mail → Copy password

3. **Update .env**
   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-16-char-app-password
   ```

---

## Deployment

### Frontend (Netlify)
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables
5. Deploy

### Backend (Render)
1. Create Web Service
2. Connect repository
3. Build: `pip install -r requirements.txt`
4. Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables
6. Deploy

---

## Testing

### Backend Testing
```bash
cd fastapi_app
python -m pytest  # If tests exist
```

**Manual Testing**:
- Open `http://localhost:8000/docs`
- Use Swagger UI to test endpoints

### Frontend Testing
```bash
cd frontend
npm run test  # If tests configured
```

**Manual Testing**:
- Test form validation
- Test all prediction modes
- Test PDF export
- Test email functionality
- Test responsive design

---

## Project Timeline

1. **Week 1**: Data exploration and analysis
2. **Week 2**: Data cleaning and preprocessing
3. **Week 3**: ML model development (Logistic & Random Forest)
4. **Week 4**: Flask app and visualization
5. **Week 5**: FastAPI migration and deployment
6. **Week 6**: React frontend development
7. **Week 7**: Email service and PDF reports
8. **Week 8**: Final testing and deployment

---

## Learning Outcomes

- End-to-end ML project development
- FastAPI backend development
- React frontend development
- Model deployment and hosting
- RESTful API design
- PDF generation with ReportLab
- SMTP email integration
- Git version control
- Cloud deployment (Netlify, Render, Hugging Face)

---

## Security Features

- Input validation with Pydantic
- Environment variable management
- HTTPS in production
- Email validation (EmailStr)
- CORS configuration
- No sensitive data in commits
- Gmail App Passwords

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## Acknowledgments

- **Dataset**: [Cardiovascular Disease Dataset](https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset)
- **ML Libraries**: Scikit-learn, NumPy, Pandas
- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: FastAPI, Uvicorn
- **Deployment**: Netlify, Render, Hugging Face
- **Icons**: Lucide React
- **Animations**: Framer Motion

---

## Support

For issues, questions, or feedback:

- Email: vvbaraiya32@gmail.com
- Issues: [GitHub Issues](https://github.com/vishalbharaiya007/Cardio_Project/issues)
- Discussions: [GitHub Discussions](https://github.com/vishalbharaiya007/Cardio_Project/discussions)

---

## Documentation

- [Backend API Documentation](fastapi_app/README.md)
- [Frontend Documentation](frontend/README.md)
- [API Swagger Docs](https://cardio-fastapi-8ijy.onrender.com/docs)

---

## Future Enhancements

- [ ] Dark mode support
- [ ] Multi-language support
- [ ] User authentication
- [ ] Patient history tracking
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Doctor consultation integration
- [ ] Real-time health monitoring
- [ ] Integration with wearable devices

---

<div align="center">

## Made with love for better cardiovascular health

**Star this repository if you find it helpful!**

[Live Demo](https://cardiosense.netlify.app) • [API Docs](https://cardio-fastapi-8ijy.onrender.com/docs) • [GitHub](https://github.com/vishalbharaiya007/Cardio_Project)

**CardioSense** - *Empowering Health through AI*

</div>
