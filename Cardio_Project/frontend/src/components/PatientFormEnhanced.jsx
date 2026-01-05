import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

function PatientFormEnhanced({ onSubmit, loading }) {
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
    active: '1',
  });

  const [selectedModel, setSelectedModel] = useState('both');
  const [errors, setErrors] = useState({});

  const demoData = {
    highRisk: {
      age: '65',
      gender: '2',
      height: '165',
      weight: '95',
      ap_hi: '160',
      ap_lo: '100',
      cholesterol: '3',
      gluc: '3',
      smoke: '1',
      alco: '1',
      active: '0',
    },
    lowRisk: {
      age: '35',
      gender: '1',
      height: '175',
      weight: '70',
      ap_hi: '120',
      ap_lo: '80',
      cholesterol: '1',
      gluc: '1',
      smoke: '0',
      alco: '0',
      active: '1',
    },
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    if (name === 'age' && value) {
      if (value < 1 || value > 120) {
        newErrors.age = 'Age must be between 1 and 120 years';
      } else {
        delete newErrors.age;
      }
    }
    
    if (name === 'height' && value) {
      if (value < 100 || value > 250) {
        newErrors.height = 'Height must be between 100 and 250 cm';
      } else {
        delete newErrors.height;
      }
    }
    
    if (name === 'weight' && value) {
      if (value < 30 || value > 200) {
        newErrors.weight = 'Weight must be between 30 and 200 kg';
      } else {
        delete newErrors.weight;
      }
    }
    
    if (name === 'ap_hi' && value) {
      if (value < 90 || value > 200) {
        newErrors.ap_hi = 'Typical range: 90-200 mmHg';
      } else {
        delete newErrors.ap_hi;
      }
    }
    
    if (name === 'ap_lo' && value) {
      if (value < 60 || value > 130) {
        newErrors.ap_lo = 'Typical range: 60-130 mmHg';
      } else {
        delete newErrors.ap_lo;
      }
    }
    
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleDemoFill = (riskType) => {
    setFormData(demoData[riskType]);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
      active: parseInt(formData.active),
    };

    onSubmit(processedData, selectedModel);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Cardiovascular Risk Assessment
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Enter patient information for AI-powered prediction
      </p>

      {/* Demo Buttons */}
      <div className="flex gap-4 justify-center mb-8">
        <button
          type="button"
          onClick={() => handleDemoFill('lowRisk')}
          className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all transform hover:scale-105"
          title="Loads example low-risk patient data for testing"
        >
          Low Risk Demo
        </button>
        <button
          type="button"
          onClick={() => handleDemoFill('highRisk')}
          className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all transform hover:scale-105"
          title="Loads example high-risk patient data for testing"
        >
          High Risk Demo
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="1"
                  max="120"
                  placeholder="35"
                  className="w-full px-4 py-3 pr-20 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                  years
                </span>
              </div>
              {errors.age && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.age}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: '1' })}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                    formData.gender === '1'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: '2' })}
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
                    formData.gender === '2'
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Height <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  min="100"
                  max="250"
                  placeholder="170"
                  className="w-full px-4 py-3 pr-16 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                  cm
                </span>
              </div>
              {errors.height && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.height}
                </p>
              )}
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Weight <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  min="30"
                  max="200"
                  placeholder="70"
                  className="w-full px-4 py-3 pr-16 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                  kg
                </span>
              </div>
              {errors.weight && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.weight}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Blood Pressure</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Systolic */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Systolic (Upper) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="ap_hi"
                  value={formData.ap_hi}
                  onChange={handleChange}
                  required
                  min="90"
                  max="200"
                  placeholder="120"
                  className="w-full px-4 py-3 pr-20 bg-red-50 border-2 border-red-200 rounded-lg focus:border-red-400 focus:ring-2 focus:ring-red-200 outline-none transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                  mmHg
                </span>
              </div>
              {errors.ap_hi && (
                <p className="mt-1 text-xs text-orange-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.ap_hi}
                </p>
              )}
            </div>

            {/* Diastolic */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Diastolic (Lower) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="ap_lo"
                  value={formData.ap_lo}
                  onChange={handleChange}
                  required
                  min="60"
                  max="130"
                  placeholder="80"
                  className="w-full px-4 py-3 pr-20 bg-blue-50 border-2 border-blue-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                  mmHg
                </span>
              </div>
              {errors.ap_lo && (
                <p className="mt-1 text-xs text-orange-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.ap_lo}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Medical Indicators */}
        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Medical Indicators</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cholesterol */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cholesterol <span className="text-red-500">*</span>
              </label>
              <select
                name="cholesterol"
                value={formData.cholesterol}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition bg-white"
              >
                <option value="1">Normal</option>
                <option value="2">Above Normal</option>
                <option value="3">Well Above Normal</option>
              </select>
            </div>

            {/* Glucose */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Glucose <span className="text-red-500">*</span>
              </label>
              <select
                name="gluc"
                value={formData.gluc}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition bg-white"
              >
                <option value="1">Normal</option>
                <option value="2">Above Normal</option>
                <option value="3">Well Above Normal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lifestyle Factors */}
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Lifestyle Factors</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Smoking */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Smoking <span className="text-red-500">*</span>
              </label>
              <select
                name="smoke"
                value={formData.smoke}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition bg-white"
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            {/* Alcohol */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alcohol <span className="text-red-500">*</span>
              </label>
              <select
                name="alco"
                value={formData.alco}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition bg-white"
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            {/* Physical Activity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Physical Activity <span className="text-red-500">*</span>
              </label>
              <select
                name="active"
                value={formData.active}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition bg-white"
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Model Selection */}
        <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Prediction Model</h3>
          <p className="text-sm text-gray-600 mb-4">
            Choose which machine learning model to use for prediction
          </p>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition bg-white text-base font-medium"
          >
            <option value="both">Both Models - Recommended (Compare Results)</option>
            <option value="logistic">Logistic Regression (92% Accuracy)</option>
            <option value="random_forest">Random Forest (95% Accuracy)</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || Object.keys(errors).length > 0}
          className={`w-full py-4 rounded-lg font-bold text-lg text-white transition-all ${
            loading || Object.keys(errors).length > 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
          }`}
        >
          Predict Cardiovascular Risk
        </button>

        {/* Medical Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-xs text-gray-700 text-center flex items-start justify-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
            <span>
              <strong>Educational Purpose Only:</strong> This tool is for educational demonstration and should not be used for medical diagnosis. Always consult qualified healthcare professionals for medical advice.
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default PatientFormEnhanced;
