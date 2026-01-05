import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PredictionResults from '../components/PredictionResults';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const predictions = location.state?.predictions;

  // Redirect to predict page if no predictions data
  if (!predictions) {
    navigate('/predict');
    return null;
  }

  const handleReset = () => {
    navigate('/predict');
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <PredictionResults predictions={predictions} onReset={handleReset} />
        </motion.div>
      </div>
    </div>
  );
}

export default Results;
