import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { predictCompare, predictLogistic, predictRandomForest } from '../services/api';
import PatientFormEnhanced from '../components/PatientFormEnhanced';

function Predict() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async (patientData, selectedModel) => {
    setLoading(true);
    setError(null);

    try {
      console.log('=== PREDICTION REQUEST START ===');
      console.log('Sending patient data:', JSON.stringify(patientData, null, 2));
      console.log('Selected model:', selectedModel);
      
      let data;
      let resultRoute;
      
      // Call different API based on selected model
      if (selectedModel === 'logistic') {
        console.log('API URL:', 'https://cardio-fastapi-8ijy.onrender.com/predict/logistic');
        data = await predictLogistic(patientData);
        resultRoute = '/results/logistic';
      } else if (selectedModel === 'randomforest') {
        console.log('API URL:', 'https://cardio-fastapi-8ijy.onrender.com/predict/randomforest');
        data = await predictRandomForest(patientData);
        resultRoute = '/results/randomforest';
      } else {
        // both models
        console.log('API URL:', 'https://cardio-fastapi-8ijy.onrender.com/predict/compare');
        data = await predictCompare(patientData);
        resultRoute = '/results/compare';
      }
      
      console.log('=== PREDICTION REQUEST SUCCESS ===');
      console.log('Received predictions:', JSON.stringify(data, null, 2));
      
      // Navigate to appropriate results page with prediction data
      navigate(resultRoute, { state: { predictions: data, model: selectedModel } });
    } catch (err) {
      console.error('=== PREDICTION REQUEST FAILED ===');
      console.error('Error:', err);
      console.error('Error message:', err.message);
      console.error('Error code:', err.code);
      console.error('Error response:', err.response);
      console.error('Error config:', err.config);
      
      const errorMessage = err.code === 'ECONNABORTED' 
        ? 'Request timed out. The server might be sleeping. Please wait a moment and try again.'
        : err.response?.data?.detail || err.response?.data?.message || err.message || 'Failed to get predictions. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <PatientFormEnhanced onSubmit={handlePredict} loading={loading} />

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-6 bg-red-500/90 backdrop-blur-sm text-white p-6 rounded-2xl shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="font-medium">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 bg-white rounded-2xl shadow-xl border border-gray-200 p-12"
              >
                <div className="flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full"
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-gray-900 text-2xl font-bold"
                  >
                    Analyzing Patient Data...
                  </motion.p>
                  <p className="mt-2 text-gray-600">
                    Processing with machine learning models
                  </p>
                  <motion.div className="flex gap-2 mt-6">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="w-3 h-3 bg-blue-600 rounded-full"
                      />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default Predict;
