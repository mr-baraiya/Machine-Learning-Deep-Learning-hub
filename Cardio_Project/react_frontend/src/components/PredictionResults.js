import React from 'react';
import './PredictionResults.css';

function PredictionResults({ predictions, onReset }) {
  const { logistic_regression, random_forest, recommendation } = predictions;

  const getRiskColor = (riskLevel) => {
    if (riskLevel === 'Low Risk') return '#10b981';
    if (riskLevel === 'Moderate Risk') return '#f59e0b';
    return '#ef4444';
  };

  const ModelCard = ({ modelData, title }) => (
    <div className="model-card">
      <h3>{title}</h3>
      <div className="prediction-badge" style={{
        background: modelData.prediction === 1 ? '#fee' : '#efe'
      }}>
        {modelData.prediction === 1 ? 'CVD Risk Detected' : 'No CVD Risk'}
      </div>
      
      <div className="metrics">
        <div className="metric">
          <span className="metric-label">Probability:</span>
          <span className="metric-value">{(modelData.probability * 100).toFixed(2)}%</span>
        </div>
        
        <div className="metric">
          <span className="metric-label">Risk Level:</span>
          <span 
            className="metric-value risk-badge"
            style={{ color: getRiskColor(modelData.risk_level) }}
          >
            {modelData.risk_level}
          </span>
        </div>
      </div>
      
      <div className="probability-bar">
        <div 
          className="probability-fill"
          style={{
            width: `${modelData.probability * 100}%`,
            background: getRiskColor(modelData.risk_level)
          }}
        />
      </div>
      
      <p className="message">{modelData.message}</p>
    </div>
  );

  return (
    <div className="prediction-results">
      <h2>Prediction Results</h2>
      
      <div className="models-container">
        <ModelCard 
          modelData={logistic_regression} 
          title="Logistic Regression"
        />
        
        <ModelCard 
          modelData={random_forest} 
          title="Random Forest"
        />
      </div>

      <div className="recommendation-box">
        <h3>Recommendation</h3>
        <p>{recommendation}</p>
        
        <div className="comparison">
          <div className="comparison-item">
            <span>Logistic Regression:</span>
            <strong>{(logistic_regression.probability * 100).toFixed(2)}%</strong>
          </div>
          <div className="comparison-item">
            <span>Random Forest:</span>
            <strong>{(random_forest.probability * 100).toFixed(2)}%</strong>
          </div>
        </div>
      </div>

      <div className="disclaimer">
        <p><strong>Disclaimer:</strong> This is a machine learning prediction and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.</p>
      </div>

      <button onClick={onReset} className="reset-btn">
        New Prediction
      </button>
    </div>
  );
}

export default PredictionResults;
