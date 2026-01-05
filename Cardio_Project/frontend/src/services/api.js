import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://cardio-fastapi-8ijy.onrender.com';

// API instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000, // 120 seconds (2 minutes) - Render free tier can take time to wake up
});

// Health check endpoint
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

// Random Forest prediction
export const predictRandomForest = async (patientData) => {
  try {
    const response = await api.post('/predict/randomforest', patientData);
    return response.data;
  } catch (error) {
    console.error('Random Forest prediction failed:', error);
    throw error;
  }
};

// Logistic Regression prediction
export const predictLogistic = async (patientData) => {
  try {
    const response = await api.post('/predict/logistic', patientData);
    return response.data;
  } catch (error) {
    console.error('Logistic prediction failed:', error);
    throw error;
  }
};

// Compare both models
export const predictCompare = async (patientData) => {
  try {
    const response = await api.post('/predict/compare', patientData);
    return response.data;
  } catch (error) {
    console.error('Compare prediction failed:', error);
    throw error;
  }
};

export default api;
