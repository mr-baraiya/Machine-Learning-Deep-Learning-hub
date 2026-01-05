# React Frontend - Cardiovascular Disease Prediction UI

## Overview
Modern, responsive React application for cardiovascular disease risk prediction. Features a clean UI with real-time predictions from two ML models displayed side-by-side.

## Directory Structure
```
react_frontend/
├── public/
│   └── index.html                    # HTML template
├── src/
│   ├── components/
│   │   ├── Header.js                 # App header
│   │   ├── Header.css
│   │   ├── PatientForm.js            # Input form
│   │   ├── PatientForm.css
│   │   ├── PredictionResults.js     # Results display
│   │   └── PredictionResults.css
│   ├── App.js                        # Main app component
│   ├── App.css
│   ├── index.js                      # Entry point
│   └── index.css                     # Global styles
└── package.json                      # Dependencies
```

## Requirements
- Node.js 14+ 
- npm or yarn

## Installation

1. **Navigate to the frontend directory:**
```powershell
cd Cardio_Project\react_frontend
```

2. **Install dependencies:**
```powershell
npm install
```

## Running the Application

**Start the development server:**
```powershell
npm start
```

The app will open automatically at: `http://localhost:3000`

## Features

### User Interface
- **Modern Design** - Purple gradient theme with smooth animations
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Intuitive Form** - Organized sections for patient data
- **Real-time Validation** - Input validation and error messages
- **Loading States** - Spinner while processing predictions

### Prediction Display
- **Dual Model Results** - Side-by-side comparison
- **Visual Indicators** - Color-coded risk levels
- **Probability Bars** - Visual representation of risk
- **Recommendations** - Model agreement/disagreement alerts
- **Clear Messaging** - Easy-to-understand results

### Data Handling
- **Input Validation** - Client-side validation before submission
- **Error Handling** - User-friendly error messages
- **Secure Communication** - API calls via Axios
- **Reset Functionality** - Easy new prediction workflow

## Components

### Header Component
Displays application title and description.

**File:** `src/components/Header.js`

### PatientForm Component
Interactive form for entering patient data.

**Props:**
- `onSubmit` - Function to handle form submission
- `loading` - Boolean to disable form during prediction

**Features:**
- Grouped input sections (Basic Info, Blood Pressure, Medical, Lifestyle)
- Dropdown selects for categorical data
- Number inputs with validation
- Submit button with loading state

**File:** `src/components/PatientForm.js`

### PredictionResults Component
Displays predictions from both models.

**Props:**
- `predictions` - Prediction data from API
- `onReset` - Function to clear results and start new prediction

**Features:**
- Model comparison cards
- Risk level badges with color coding
- Probability bars
- Recommendation box
- Disclaimer message
- Reset button

**File:** `src/components/PredictionResults.js`

## API Integration

The frontend communicates with the FastAPI backend at `http://localhost:8000`

### API Call Example
```javascript
const response = await axios.post(
  'http://localhost:8000/predict/compare',
  patientData
);
```

### Changing API URL
Update the `API_URL` constant in `App.js`:
```javascript
const API_URL = 'http://your-api-url:8000';
```

## Styling

### Color Scheme
- **Primary Gradient:** `#667eea` to `#764ba2`
- **Success/Low Risk:** `#10b981`
- **Warning/Moderate Risk:** `#f59e0b`
- **Danger/High Risk:** `#ef4444`

### Responsive Breakpoints
- Desktop: > 768px
- Mobile: ≤ 768px

## Build for Production

**Create optimized production build:**
```powershell
npm run build
```

The build folder will contain optimized static files ready for deployment.

## Form Fields Reference

| Field | Label | Type | Values |
|-------|-------|------|--------|
| age | Age (years) | Number | 1-120 |
| gender | Gender | Select | Female (1), Male (2) |
| height | Height (cm) | Number | 100-250 |
| weight | Weight (kg) | Number | 30-200 |
| ap_hi | Systolic BP | Number | 60-240 |
| ap_lo | Diastolic BP | Number | 40-180 |
| cholesterol | Cholesterol | Select | Normal (1), Above (2), Well Above (3) |
| gluc | Glucose | Select | Normal (1), Above (2), Well Above (3) |
| smoke | Smoking | Select | No (0), Yes (1) |
| alco | Alcohol | Select | No (0), Yes (1) |
| active | Physical Activity | Select | No (0), Yes (1) |

## User Workflow

1. **Enter Patient Data** - Fill out the comprehensive form
2. **Submit** - Click "Predict Risk" button
3. **Wait** - Loading indicator appears
4. **View Results** - See predictions from both models
5. **Compare** - Review recommendation
6. **New Prediction** - Click "New Prediction" to reset

## Screenshots

### Main Form
Clean, organized form with grouped sections for easy data entry.

### Results Display
Side-by-side model comparison with visual probability indicators and risk levels.

### Mobile View
Fully responsive design that works seamlessly on mobile devices.

## Testing

### Manual Testing
1. Fill form with valid data
2. Submit and verify predictions appear
3. Try edge cases (min/max values)
4. Test error handling (invalid inputs)
5. Test responsive design (resize browser)

### Sample Test Data
```javascript
{
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
}
```

## Customization

### Changing Theme Colors
Edit the gradient in `src/index.css`:
```css
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

### Modifying Form Fields
Add/remove fields in `src/components/PatientForm.js` and update the state accordingly.

### Custom Styling
Each component has its own CSS file for easy customization.

## Troubleshooting

### npm install fails
```powershell
# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
# Reinstall
npm install
```

### Port 3000 already in use
React will automatically prompt to use another port, or specify manually:
```powershell
$env:PORT=3001; npm start
```

### API connection fails
- Ensure backend is running on port 8000
- Check API_URL in App.js
- Verify CORS is enabled on backend
- Check browser console for errors

### Blank page after build
- Ensure correct homepage in package.json
- Check browser console for errors
- Verify all imports are correct

## Dependencies

**Main Dependencies:**
- `react` - ^18.2.0
- `react-dom` - ^18.2.0
- `axios` - ^1.6.2
- `recharts` - ^2.10.3 (for future chart features)

**Dev Dependencies:**
- `react-scripts` - 5.0.1

## Scripts

```json
{
  "start": "react-scripts start",      // Development server
  "build": "react-scripts build",      // Production build
  "test": "react-scripts test",        // Run tests
  "eject": "react-scripts eject"       // Eject from CRA
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Add patient history tracking
- [ ] Export results as PDF
- [ ] Add data visualization charts
- [ ] Implement user authentication
- [ ] Add model explanation features
- [ ] Multi-language support

## Author
**Vishal Baraiya**  
Enrollment No: 23010101014  
Roll No: C3-635  
Course: Machine Learning & Deep Learning Project

## License
Educational project - Not for production use
