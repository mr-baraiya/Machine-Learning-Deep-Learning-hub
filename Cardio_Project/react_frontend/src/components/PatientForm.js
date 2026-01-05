import React, { useState } from 'react';
import './PatientForm.css';

function PatientForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    age: '',
    gender: '1',
    height: '',
    weight: '',
    ap_hi: '',
    ap_lo: '',
    cholesterol: '1',
    gluc: '1',
    smoke: '0',
    alco: '0',
    active: '1'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert string values to numbers
    const processedData = {
      age: parseFloat(formData.age),
      gender: parseInt(formData.gender),
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      ap_hi: parseFloat(formData.ap_hi),
      ap_lo: parseFloat(formData.ap_lo),
      cholesterol: parseInt(formData.cholesterol),
      gluc: parseInt(formData.gluc),
      smoke: parseInt(formData.smoke),
      alco: parseInt(formData.alco),
      active: parseInt(formData.active)
    };
    
    onSubmit(processedData);
  };

  return (
    <div className="patient-form-container">
      <h2>Patient Information</h2>
      <form onSubmit={handleSubmit} className="patient-form">
        
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Age (years) *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="1"
                max="120"
                placeholder="e.g., 45"
              />
            </div>
            
            <div className="form-group">
              <label>Gender *</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="1">Female</option>
                <option value="2">Male</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Height (cm) *</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
                min="100"
                max="250"
                placeholder="e.g., 170"
              />
            </div>
            
            <div className="form-group">
              <label>Weight (kg) *</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                min="30"
                max="200"
                placeholder="e.g., 75"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Blood Pressure</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Systolic BP (ap_hi) *</label>
              <input
                type="number"
                name="ap_hi"
                value={formData.ap_hi}
                onChange={handleChange}
                required
                min="60"
                max="240"
                placeholder="e.g., 120"
              />
            </div>
            
            <div className="form-group">
              <label>Diastolic BP (ap_lo) *</label>
              <input
                type="number"
                name="ap_lo"
                value={formData.ap_lo}
                onChange={handleChange}
                required
                min="40"
                max="180"
                placeholder="e.g., 80"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Medical Indicators</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Cholesterol Level *</label>
              <select name="cholesterol" value={formData.cholesterol} onChange={handleChange}>
                <option value="1">Normal</option>
                <option value="2">Above Normal</option>
                <option value="3">Well Above Normal</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Glucose Level *</label>
              <select name="gluc" value={formData.gluc} onChange={handleChange}>
                <option value="1">Normal</option>
                <option value="2">Above Normal</option>
                <option value="3">Well Above Normal</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Lifestyle Factors</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Smoking *</label>
              <select name="smoke" value={formData.smoke} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Alcohol Intake *</label>
              <select name="alco" value={formData.alco} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Physical Activity *</label>
              <select name="active" value={formData.active} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Analyzing...' : 'Predict Risk'}
        </button>
      </form>
    </div>
  );
}

export default PatientForm;
