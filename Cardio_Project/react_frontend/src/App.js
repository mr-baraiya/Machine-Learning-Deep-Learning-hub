import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import PatientForm from './components/PatientForm';
import PredictionResults from './components/PredictionResults';
import Header from './components/Header';

const API_URL = 'http://localhost:8000';

function App() {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (patientData) => {
    setLoading(true);
    setError(null);
    setPredictions(null);

    try {
      const response = await axios.post(`${API_URL}/predict/compare`, patientData);
      setPredictions(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get predictions. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPredictions(null);
    setError(null);
  };

  return (
    <div className="App">
      <Header />
      
      <div className="container">
        <div className="main-content">
          <PatientForm onSubmit={handlePredict} loading={loading} />
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Analyzing patient data...</p>
            </div>
          )}
          
          {predictions && !loading && (
            <PredictionResults 
              predictions={predictions} 
              onReset={handleReset}
            />
          )}
        </div>
      </div>

      <footer className="footer">
        <p>Vishal Baraiya | 23010101014 | Roll No: C3-635</p>
        <p>Machine Learning & Deep Learning Project</p>
      </footer>
    </div>
  );
}

export default App;
