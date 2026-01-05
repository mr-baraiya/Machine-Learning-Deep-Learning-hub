import React from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, TreeDeciduous, Lightbulb, AlertTriangle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import CompareChart from './CompareChart';

function PredictionResults({ predictions, onReset, personalDetails = {} }) {
  const { logistic_regression, random_forest, recommendation } = predictions;

  const getRiskColor = (riskLevel) => {
    if (riskLevel === 'Low Risk') return { bg: 'from-green-400 to-emerald-500', text: 'text-green-600', glow: 'shadow-green-500/50' };
    if (riskLevel === 'Moderate Risk') return { bg: 'from-yellow-400 to-orange-500', text: 'text-orange-600', glow: 'shadow-orange-500/50' };
    return { bg: 'from-red-400 to-pink-500', text: 'text-red-600', glow: 'shadow-red-500/50' };
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // Header
    doc.setFillColor(139, 92, 246);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('CardioSense Report', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('AI-Powered Cardiovascular Risk Assessment', 105, 30, { align: 'center' });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    let yPos = 50;
    
    // Date
    doc.setFontSize(10);
    doc.text(`Report Date: ${date}`, 14, yPos);
    yPos += 10;
    
    // Personal Details Section
    if (personalDetails.name || personalDetails.email || personalDetails.mobile || personalDetails.address) {
      doc.setFontSize(16);
      doc.text('Patient Information', 14, yPos);
      
      autoTable(doc, {
        startY: yPos + 5,
        head: [['Field', 'Details']],
        body: [
          ['Name', personalDetails.name || 'N/A'],
          ['Email', personalDetails.email || 'N/A'],
          ['Mobile', personalDetails.mobile || 'N/A'],
          ['Address', personalDetails.address || 'N/A']
        ],
        theme: 'grid',
        headStyles: { fillColor: [139, 92, 246] },
        margin: { left: 14 },
      });
      
      yPos = doc.lastAutoTable.finalY + 15;
    }

    // Random Forest Results
    doc.setFontSize(16);
    doc.setTextColor(22, 163, 74);
    doc.text('Random Forest Model', 14, yPos);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);

    const rfData = [
      ['Prediction', random_forest.prediction === 1 ? 'CVD Risk Detected' : 'No CVD Risk'],
      ['Probability', `${(random_forest.probability * 100).toFixed(2)}%`],
      ['Risk Level', random_forest.risk],
    ];

    autoTable(doc, {
      startY: yPos + 5,
      head: [['Metric', 'Value']],
      body: rfData,
      theme: 'grid',
      headStyles: { fillColor: [22, 163, 74] },
      margin: { left: 14 },
    });

    // Logistic Regression Results
    const lrStartY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(16);
    doc.setTextColor(139, 92, 246);
    doc.text('Logistic Regression Model', 14, lrStartY);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);

    const lrData = [
      ['Prediction', logistic_regression.prediction === 1 ? 'CVD Risk Detected' : 'No CVD Risk'],
      ['Probability', `${(logistic_regression.probability * 100).toFixed(2)}%`],
      ['Risk Level', logistic_regression.risk],
    ];

    autoTable(doc, {
      startY: lrStartY + 5,
      head: [['Metric', 'Value']],
      body: lrData,
      theme: 'grid',
      headStyles: { fillColor: [139, 92, 246] },
      margin: { left: 14 },
    });

    // Recommendation
    const recStartY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setTextColor(59, 130, 246);
    doc.text('Recommendation', 14, recStartY);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    const splitRecommendation = doc.splitTextToSize(recommendation, 180);
    doc.text(splitRecommendation, 14, recStartY + 7);

    // Disclaimer
    const disclaimerY = recStartY + 7 + (splitRecommendation.length * 7) + 10;
    doc.setFillColor(254, 243, 199);
    doc.rect(10, disclaimerY - 5, 190, 30, 'F');
    doc.setFontSize(10);
    doc.setTextColor(146, 64, 14);
    doc.text('Disclaimer:', 14, disclaimerY);
    doc.setTextColor(120, 53, 15);
    const disclaimer = doc.splitTextToSize(
      'This is a machine learning prediction and should not replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.',
      180
    );
    doc.text(disclaimer, 14, disclaimerY + 7);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text('Vishal Baraiya | CardioSense ML Project', 105, 285, { align: 'center' });
    doc.text('Machine Learning & Deep Learning Project', 105, 290, { align: 'center' });

    doc.save(`CardioSense_Report_${date.replace(/\//g, '-')}.pdf`);
  };

  const ModelCard = ({ modelData, title, delay, icon }) => {
    const colors = getRiskColor(modelData.risk);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, type: "spring", stiffness: 100 }}
        whileHover={{ y: -10, transition: { duration: 0.2 } }}
        className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100 overflow-hidden relative"
      >
        {/* Animated Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-5`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-4xl"
            >
              {icon}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.3, type: "spring" }}
            className={`mb-6 p-6 rounded-2xl font-bold text-xl text-center ${
              modelData.prediction === 1
                ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700'
                : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
            }`}
          >
            {modelData.prediction === 1 ? '⚠️ CVD Risk Detected' : '✓ No CVD Risk'}
          </motion.div>
          
          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-600">Probability</span>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: delay + 0.5 }}
                  className={`text-2xl font-bold ${colors.text}`}
                >
                  {(modelData.probability * 100).toFixed(2)}%
                </motion.span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${modelData.probability * 100}%` }}
                  transition={{ delay: delay + 0.6, duration: 1, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${colors.bg} rounded-full relative overflow-hidden`}
                >
                  <motion.div
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.7 }}
              className="bg-gray-50 rounded-xl p-4 flex justify-between items-center"
            >
              <span className="text-sm font-semibold text-gray-600">Risk Level</span>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className={`px-4 py-2 rounded-full font-bold text-sm bg-gradient-to-r ${colors.bg} text-white shadow-lg ${colors.glow}`}
              >
                {modelData.risk}
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-8 space-y-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white text-center mb-8"
      >
        🎯 Prediction Results
      </motion.h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <ModelCard 
          modelData={logistic_regression} 
          title="Logistic Regression"
          delay={0.2}
          icon={<TrendingUp className="w-8 h-8" />}
        />
        
        <ModelCard 
          modelData={random_forest} 
          title="Random Forest"
          delay={0.4}
          icon={<TreeDeciduous className="w-8 h-8" />}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lightbulb className="w-8 h-8 text-yellow-500" />
          </motion.div>
          <h3 className="text-3xl font-bold text-gray-800">Recommendation</h3>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg text-gray-700 mb-6 leading-relaxed"
        >
          {recommendation}
        </motion.p>
        
        <div className="grid md:grid-cols-2 gap-4 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-semibold">Logistic Regression</span>
              <motion.strong
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              >
                {(logistic_regression.probability * 100).toFixed(2)}%
              </motion.strong>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-semibold">Random Forest</span>
              <motion.strong
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 }}
                className="text-2xl bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent"
              >
                {(random_forest.probability * 100).toFixed(2)}%
              </motion.strong>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <CompareChart predictions={predictions} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-6"
      >
        <div className="flex gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
          <div>
            <p className="font-bold text-yellow-900 text-lg mb-2">Disclaimer</p>
            <p className="text-yellow-800">
              This is a machine learning prediction and should not replace professional medical advice. 
              Please consult with a healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div className="flex flex-col sm:flex-row gap-4 mt-8">
        <motion.button
          onClick={downloadPDF}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6 }}
          className="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold text-lg rounded-xl shadow-2xl hover:from-green-700 hover:to-teal-700 flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download PDF Report
        </motion.button>

        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6 }}
          className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-xl shadow-2xl hover:from-purple-700 hover:to-blue-700"
        >
          🔄 New Prediction
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default PredictionResults;
