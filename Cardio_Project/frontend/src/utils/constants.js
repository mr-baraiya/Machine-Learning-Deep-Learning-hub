// Risk levels and their colors
export const RISK_LEVELS = {
  LOW: {
    label: 'Low Risk',
    color: 'green',
    bgGradient: 'from-green-400 to-emerald-500',
    textColor: 'text-green-600',
    shadowColor: 'shadow-green-500/50',
  },
  MODERATE: {
    label: 'Moderate Risk',
    color: 'orange',
    bgGradient: 'from-yellow-400 to-orange-500',
    textColor: 'text-orange-600',
    shadowColor: 'shadow-orange-500/50',
  },
  HIGH: {
    label: 'High Risk',
    color: 'red',
    bgGradient: 'from-red-400 to-pink-500',
    textColor: 'text-red-600',
    shadowColor: 'shadow-red-500/50',
  },
};

// Form field information and tooltips
export const FORM_FIELDS = {
  age: {
    label: 'Age',
    unit: 'years',
    min: 1,
    max: 120,
    placeholder: 'e.g., 45',
    tooltip: 'Patient age in years. Age is a significant risk factor for cardiovascular disease.',
    icon: 'User',
  },
  gender: {
    label: 'Gender',
    tooltip: 'Gender can influence cardiovascular disease risk due to hormonal and biological differences.',
    icon: 'Users',
    options: [
      { value: '1', label: 'Female' },
      { value: '2', label: 'Male' },
    ],
  },
  height: {
    label: 'Height',
    unit: 'cm',
    min: 100,
    max: 250,
    placeholder: 'e.g., 170',
    tooltip: 'Height in centimeters. Used to calculate BMI and assess body composition.',
    icon: 'Ruler',
  },
  weight: {
    label: 'Weight',
    unit: 'kg',
    min: 30,
    max: 200,
    placeholder: 'e.g., 75',
    tooltip: 'Weight in kilograms. Essential for BMI calculation and obesity assessment.',
    icon: 'Weight',
  },
  ap_hi: {
    label: 'Systolic BP',
    unit: 'mmHg',
    min: 60,
    max: 240,
    placeholder: 'e.g., 120',
    tooltip: 'Systolic blood pressure (top number). Normal range: 90-120 mmHg. Higher values indicate hypertension.',
    icon: 'Heart',
  },
  ap_lo: {
    label: 'Diastolic BP',
    unit: 'mmHg',
    min: 40,
    max: 180,
    placeholder: 'e.g., 80',
    tooltip: 'Diastolic blood pressure (bottom number). Normal range: 60-80 mmHg.',
    icon: 'HeartPulse',
  },
  cholesterol: {
    label: 'Cholesterol Level',
    tooltip: 'Blood cholesterol level. High cholesterol can lead to plaque buildup in arteries.',
    icon: 'Flask',
    options: [
      { value: '1', label: 'Normal' },
      { value: '2', label: 'Above Normal' },
      { value: '3', label: 'Well Above Normal' },
    ],
  },
  gluc: {
    label: 'Glucose Level',
    tooltip: 'Blood glucose level. High glucose indicates diabetes risk, which increases cardiovascular disease risk.',
    icon: 'Droplet',
    options: [
      { value: '1', label: 'Normal' },
      { value: '2', label: 'Above Normal' },
      { value: '3', label: 'Well Above Normal' },
    ],
  },
  smoke: {
    label: 'Smoking',
    tooltip: 'Smoking significantly increases risk of heart disease and stroke.',
    icon: 'Cigarette',
    options: [
      { value: '0', label: 'No' },
      { value: '1', label: 'Yes' },
    ],
  },
  alco: {
    label: 'Alcohol Intake',
    tooltip: 'Excessive alcohol consumption can lead to high blood pressure and heart damage.',
    icon: 'Wine',
    options: [
      { value: '0', label: 'No' },
      { value: '1', label: 'Yes' },
    ],
  },
  active: {
    label: 'Physical Activity',
    tooltip: 'Regular physical activity reduces cardiovascular disease risk and improves heart health.',
    icon: 'Bike',
    options: [
      { value: '0', label: 'No' },
      { value: '1', label: 'Yes' },
    ],
  },
};

// Model information
export const MODELS = {
  RANDOM_FOREST: {
    name: 'Random Forest',
    icon: 'TreeDeciduous',
    description: 'Ensemble learning method that uses multiple decision trees for robust predictions.',
    color: 'from-green-600 to-teal-600',
  },
  LOGISTIC_REGRESSION: {
    name: 'Logistic Regression',
    icon: 'TrendingUp',
    description: 'Statistical model that estimates probability using a logistic function.',
    color: 'from-purple-600 to-blue-600',
  },
};

// Feature categories
export const FEATURE_CATEGORIES = [
  {
    title: 'Basic Information',
    icon: 'User',
    gradient: 'from-purple-500 to-blue-500',
    fields: ['age', 'gender', 'height', 'weight'],
  },
  {
    title: 'Blood Pressure',
    icon: 'Heart',
    gradient: 'from-red-500 to-pink-500',
    fields: ['ap_hi', 'ap_lo'],
  },
  {
    title: 'Medical Indicators',
    icon: 'Flask',
    gradient: 'from-green-500 to-teal-500',
    fields: ['cholesterol', 'gluc'],
  },
  {
    title: 'Lifestyle Factors',
    icon: 'Bike',
    gradient: 'from-orange-500 to-yellow-500',
    fields: ['smoke', 'alco', 'active'],
  },
];

// Navigation links
export const NAV_LINKS = [
  { path: '/', label: 'Home', icon: 'Home' },
  { path: '/predict', label: 'Predict', icon: 'Activity' },
  { path: '/about', label: 'About', icon: 'Info' },
];

// Statistics for home page
export const STATS = [
  { value: '74.74%', label: 'Random Forest accuracy', icon: 'Target' },
  { value: '72.93%', label: 'Logistic Regression accuracy', icon: 'TrendingUp' },
  { value: '<1s', label: 'Response Time', icon: 'Zap' },
  { value: '11', label: 'Health Factors', icon: 'BarChart' },
];
