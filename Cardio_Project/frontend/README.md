# CardioSense - Frontend Application

**AI-Powered Cardiovascular Disease Risk Assessment Platform**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](../LICENSE)

## Live Links

- **Live Application**: [https://cardiosense.netlify.app](https://cardiosense.netlify.app)
- **Backend API**: [https://cardio-fastapi-8ijy.onrender.com](https://cardio-fastapi-8ijy.onrender.com)
- **API Documentation**: [https://cardio-fastapi-8ijy.onrender.com/docs](https://cardio-fastapi-8ijy.onrender.com/docs)
- **ML Models (Hugging Face)**: [cardio-disease-model](https://huggingface.co/mr-baraiya/cardio-disease-model)
- **Dataset (Kaggle)**: [Cardiovascular Disease Dataset](https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset)
- **GitHub Repository**: [Cardio_Project](https://github.com/vishalbharaiya007/Cardio_Project)

---

## 📸 Screenshots

### 🏠 Home Page
Professional landing page with CardioSense branding and medical theme.

### 📊 Prediction Form
Comprehensive patient data collection with custom validation and demo data buttons.

### 📈 Results Pages
- **Logistic Regression Results**: Individual model predictions with risk assessment
- **Random Forest Results**: Ensemble model predictions with probability bars
- **Comparative Analysis**: Side-by-side model comparison with detailed charts

### 📧 Email Reports
Professional PDF reports sent via email with patient data and recommendations.

---

## 🎯 Overview

CardioSense Frontend is a modern, responsive React application that provides an intuitive interface for cardiovascular disease risk prediction. Built with cutting-edge technologies, it offers a seamless user experience from data input to results visualization.

### Key Features
- **Modern UI/UX**: Professional medical-themed design with Tailwind CSS v4
- **Dual Model Predictions**: Compare Random Forest and Logistic Regression results
- **PDF Generation**: Client-side PDF report creation with jsPDF
- **Email Service**: Send PDF reports via backend SMTP service
- **Real-time Validation**: Custom form validation with immediate feedback
- **Responsive Design**: Mobile-first approach, works on all devices
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Animations**: Smooth transitions with Framer Motion

---

## Features

### Prediction System
- **Multiple Models**: Switch between Random Forest, Logistic Regression, or Compare mode
- **Real-time Results**: Instant predictions with probability scores
- **Risk Assessment**: Color-coded risk levels (High/Low)
- **Visual Feedback**: Interactive charts and probability bars

### Patient Form
- **11 Health Metrics**: Age, Gender, Height, Weight, Blood Pressure, etc.
- **Custom Validation**: Field-level validation with error messages
- **Demo Data**: Pre-filled low/high risk patient scenarios
- **Personal Details**: Name, Email, Mobile, Address for reports
- **Loading States**: Button spinners during API calls

### Results Visualization
- **Individual Pages**: Separate pages for each model
- **Comparison Page**: Side-by-side model comparison
- **Probability Bars**: Visual representation of risk scores
- **Recommendations**: Personalized health advice based on risk
- **Action Buttons**: Export PDF, Email Report, New Prediction

### Email & PDF
- **PDF Export**: Download professional health reports
- **Email Reports**: Send PDF via backend SMTP service
- **Patient Details**: Include personal information in reports
- **Medical Disclaimer**: Legal compliance in all reports

### User Interface
- **Professional Theme**: Medical-grade serious design
- **Consistent Branding**: CardioSense identity throughout
- **Responsive Layout**: Works on desktop, tablet, mobile
- **Accessibility**: Keyboard navigation, screen reader support
- **Dark Mode Ready**: Prepared for future dark mode implementation

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI framework |
| Vite | 7.3.0 | Build tool |
| Tailwind CSS | v4 | Styling |
| React Router | 7.11.0 | Routing |
| Axios | 1.6.2 | HTTP client |
| Framer Motion | 12.23.27 | Animations |
| jsPDF | 4.0.0 | PDF generation |
| jspdf-autotable | 5.0.7 | PDF tables |
| Lucide React | 0.562.0 | Icons |
| EmailJS | Latest | Email notifications |

---

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git
- Backend API running (or use live API)

### 1. Clone Repository
```bash
git clone https://github.com/vishalbharaiya007/Cardio_Project.git
cd Cardio_Project/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create `.env` file in `frontend/` directory:

```env
# Backend API URL
VITE_API_URL=https://cardio-fastapi-8ijy.onrender.com

# EmailJS Configuration (optional for notifications)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Run Development Server
```bash
npm run dev
```

Open browser: `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

Output directory: `dist/`

### 6. Preview Production Build
```bash
npm run preview
```

---

## Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts
│   ├── components/        # Reusable components
│   │   ├── CompareChart.jsx
│   │   ├── Header.js
│   │   ├── Navbar.jsx
│   │   └── PatientFormEnhanced.jsx
│   ├── pages/             # Route pages
│   │   ├── About.jsx
│   │   ├── Home.jsx
│   │   ├── Predict.jsx
│   │   ├── ResultsLogistic.jsx
│   │   ├── ResultsRandomForest.jsx
│   │   ├── ResultsCompare.jsx
│   │   ├── ModelInfo.jsx
│   │   └── FAQs.jsx
│   ├── services/          # API services
│   │   ├── api.js
│   │   └── emailService.js
│   ├── utils/             # Utility functions
│   │   └── constants.js
│   ├── App.jsx            # Main app component
│   ├── App.css            # Global styles
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind imports
├── .env                   # Environment variables
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── README.md              # This file
```

---

## Pages Overview

### 1. Home Page (`/`)
- Hero section with CTA
- Feature highlights
- Model information cards
- Statistics section
- Call to action

### 2. Prediction Page (`/predict`)
- Patient data form
- Model selection dropdown
- Demo data buttons
- Personal details section
- Custom validation
- Loading states

### 3. Results Pages
- **Logistic Regression** (`/results/logistic`)
  - Prediction result
  - Probability bar
  - Recommendations
  - PDF export
  - Email report

- **Random Forest** (`/results/random-forest`)
  - Prediction result
  - Probability bar
  - Recommendations
  - PDF export
  - Email report

- **Compare** (`/results/compare`)
  - Side-by-side comparison
  - Comparison chart
  - Both model results
  - Combined recommendations
  - PDF export
  - Email report

### 4. About Page (`/about`)
- Project overview
- Team information
- Technology stack
- Mission statement

### 5. Model Info Page (`/model-info`)
- Model descriptions
- Accuracy metrics
- Training details
- Feature importance

### 6. FAQs Page (`/faqs`)
- Common questions
- Accordion UI
- Auto-close behavior

---

## API Integration

### Backend Endpoints Used

**1. Prediction Endpoints**
```javascript
// Random Forest
POST /predict/randomforest

// Logistic Regression
POST /predict/logistic

// Compare Both
POST /predict/compare
```

**2. Email Report**
```javascript
POST /send-report
```

### API Service (`services/api.js`)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 120000, // 2 minutes for cold starts
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictWithModel = async (patientData, modelType) => {
  const endpoints = {
    randomforest: '/predict/randomforest',
    logistic: '/predict/logistic',
    compare: '/predict/compare',
  };
  
  const response = await api.post(endpoints[modelType], patientData);
  return response.data;
};
```

### Email Service (`services/emailService.js`)
```javascript
export const sendReportViaBackend = async (
  toEmail,
  patientName,
  modelType,
  patientData,
  predictionResult
) => {
  const response = await axios.post(
    `${BASE_URL}/send-report`,
    {
      to_email: toEmail,
      patient_name: patientName,
      model_type: modelType,
      patient_data: patientData,
      prediction_result: {
        risk_level: predictionResult.risk_level,
        probability: predictionResult.probability
      }
    }
  );
  return response.data;
};
```

---

## Styling Guide

### Tailwind CSS v4
Modern utility-first CSS with custom configuration.

**Primary Colors:**
- Green: `#22C55E` (Low Risk, Success)
- Red: `#DC2626` (High Risk, Danger)
- Purple: `#8B5CF6` (Branding)
- Blue: `#3B82F6` (Info, Actions)

**Typography:**
- Headings: `font-bold` with responsive sizes
- Body: `font-normal` with proper line-height
- Medical theme: Professional, clear, readable

**Components:**
- Cards: `rounded-2xl shadow-xl border`
- Buttons: `rounded-xl px-8 py-4 transform hover:scale-105`
- Inputs: `rounded-xl border-2 focus:border-green-500`

---

## Responsive Design

### Breakpoints
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Mobile Optimization
- Touch-friendly buttons (min 44px)
- Readable font sizes (16px minimum)
- Proper spacing for thumbs
- Hamburger menu on mobile
- Stacked layouts on small screens

---

## Deployment

### Deploy on Netlify

1. **Connect Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub repository

2. **Configure Build**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18+

3. **Add Environment Variables**
   - VITE_API_URL
   - VITE_EMAILJS_SERVICE_ID (optional)
   - VITE_EMAILJS_TEMPLATE_ID (optional)
   - VITE_EMAILJS_PUBLIC_KEY (optional)

4. **Deploy**
   - Click "Deploy site"
   - Wait for build (2-3 minutes)
   - Get live URL: `https://cardiosense.netlify.app`

### Deploy on Vercel

```bash
npm install -g vercel
vercel
```

Follow prompts and add environment variables.

---

## Testing

### Manual Testing Checklist

**Form Validation:**
- [ ] All fields required
- [ ] Valid ranges enforced
- [ ] Error messages display
- [ ] Demo data works

**Predictions:**
- [ ] Random Forest prediction
- [ ] Logistic Regression prediction
- [ ] Compare mode
- [ ] Loading states

**Results:**
- [ ] Correct risk display
- [ ] Probability bars work
- [ ] Recommendations show
- [ ] PDF export works
- [ ] Email report works

**Responsiveness:**
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## Form Fields

| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| Age | Number | 1-120 | Patient age in years |
| Gender | Select | Male/Female | Biological gender |
| Height | Number | 50-250 cm | Height in centimeters |
| Weight | Number | 20-300 kg | Weight in kilograms |
| Systolic BP | Number | 60-250 mmHg | Systolic blood pressure |
| Diastolic BP | Number | 40-200 mmHg | Diastolic blood pressure |
| Cholesterol | Select | Normal/Above/High | Cholesterol level |
| Glucose | Select | Normal/Above/High | Glucose level |
| Smoking | Radio | Yes/No | Smoking habit |
| Alcohol | Radio | Yes/No | Alcohol consumption |
| Physical Activity | Radio | Yes/No | Regular exercise |

---

## Security & Privacy

- **No Data Storage**: Patient data not stored on client
- **Secure API Calls**: HTTPS only
- **Environment Variables**: Sensitive data in .env
- **Input Validation**: All inputs sanitized
- **Medical Disclaimer**: Clear in all reports
- **Privacy Policy**: Recommended for production

---

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

## Author

**Vishal Baraiya**

- GitHub: [@vishalbharaiya007](https://github.com/vishalbharaiya007)
- Email: vvbaraiya32@gmail.com
- Portfolio: [Coming Soon]

---

## Acknowledgments

- **Dataset**: [Cardiovascular Disease Dataset](https://www.kaggle.com/datasets/sulianova/cardiovascular-disease-dataset)
- **UI Icons**: [Lucide React](https://lucide.dev)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: [Netlify](https://www.netlify.com)
- **Backend**: [Render](https://render.com)

---

## Support

For issues or questions:
- Email: vvbaraiya32@gmail.com
- Issues: [GitHub Issues](https://github.com/vishalbharaiya007/Cardio_Project/issues)

---

<div align="center">

**Made with love for better cardiovascular health**

Star this repo if you find it helpful!

[Live App](https://cardiosense.netlify.app) • [API Docs](https://cardio-fastapi-8ijy.onrender.com/docs) • [GitHub](https://github.com/vishalbharaiya007/Cardio_Project)

</div>
