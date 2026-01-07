import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, TreeDeciduous, Activity, ArrowLeft, Mail, X } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { sendReportViaBackend } from '../services/emailService';

function ResultsRandomForest() {
  const location = useLocation();
  const navigate = useNavigate();
  const predictions = location.state?.predictions;
  const personalDetails = location.state?.personalDetails || {};
  const [emailSending, setEmailSending] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailStatus, setEmailStatus] = useState({ type: '', message: '' });
  const demoModeNotice = 'Report Generated Successfully.\nEmail delivery is currently in demo mode. Please download the report or contact the project owner.';
  const statusThemes = {
    success: {
      title: 'Success!',
      textColor: 'text-green-600',
      button: 'bg-green-600 hover:bg-green-700'
    },
    demo: {
      title: 'Report Generated',
      textColor: 'text-amber-600',
      button: 'bg-amber-500 hover:bg-amber-600'
    },
    error: {
      title: 'Error',
      textColor: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700'
    }
  };
  const currentStatusTheme = statusThemes[emailStatus.type] || statusThemes.error;

  // Redirect to predict page if no predictions data
  if (!predictions) {
    navigate('/predict');
    return null;
  }

  const { prediction, probability } = predictions;
  const hasDisease = prediction === 1;
  const riskPercentage = (probability * 100).toFixed(2);

  const handleReset = () => {
    navigate('/predict');
  };

  const sendEmailWithReport = async () => {
    if (!personalDetails.email) {
      setEmailStatus({ type: 'error', message: 'No email address provided' });
      setShowEmailModal(true);
      return;
    }

    setEmailSending(true);
    try {
      const patientData = location.state?.patientData || {};
      
      await sendReportViaBackend(
        personalDetails.email,
        personalDetails.name || 'Patient',
        'randomforest',
        patientData,
        {
          risk_level: hasDisease ? 'High Risk' : 'Low Risk',
          probability: probability
        }
      );

      setEmailStatus({
        type: 'success',
        message: `Report successfully sent to ${personalDetails.email} with PDF attachment!`
      });
      setShowEmailModal(true);
    } catch (error) {
      if (error.isDemoMode || error.message === 'EMAIL_DEMO_MODE') {
        setEmailStatus({ type: 'demo', message: demoModeNotice });
      } else {
        setEmailStatus({
          type: 'error',
          message: error.response?.data?.detail || error.message || 'Failed to send email. Please try again.'
        });
      }
      setShowEmailModal(true);
    } finally {
      setEmailSending(false);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(34, 197, 94);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('CardioSense', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('Random Forest Analysis Report', 105, 30, { align: 'center' });
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    
    let yPos = 50;
    
    // Personal Details Section
    if (personalDetails.name || personalDetails.email || personalDetails.mobile || personalDetails.address) {
      doc.setFontSize(16);
      doc.text('Patient Information', 20, yPos);
      
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
        headStyles: { fillColor: [34, 197, 94] }
      });
      
      yPos = doc.lastAutoTable.finalY + 15;
    }
    
    // Prediction Result
    doc.setFontSize(16);
    doc.text('Prediction Result', 20, yPos);
    
    autoTable(doc, {
      startY: yPos + 5,
      head: [['Analysis Type', 'Result', 'Probability']],
      body: [
        [
          'Random Forest',
          hasDisease ? 'CVD Risk Detected' : 'No CVD Risk',
          `${riskPercentage}%`
        ]
      ],
      theme: 'grid',
      headStyles: { fillColor: [34, 197, 94] }
    });
    
    // Recommendations
    doc.setFontSize(16);
    doc.text('Recommendations', 20, doc.lastAutoTable.finalY + 15);
    
    const recommendations = hasDisease
      ? [
          '• Consult a cardiologist for comprehensive evaluation',
          '• Monitor blood pressure and cholesterol regularly',
          '• Adopt heart-healthy diet and exercise routine',
          '• Consider stress management techniques',
          '• Follow prescribed medication regimen if applicable'
        ]
      : [
          '• Maintain current healthy lifestyle habits',
          '• Regular annual cardiovascular check-ups',
          '• Continue balanced diet and physical activity',
          '• Monitor blood pressure periodically',
          '• Stay informed about cardiovascular health'
        ];
    
    doc.setFontSize(11);
    let recYPos = doc.lastAutoTable.finalY + 22;
    recommendations.forEach(rec => {
      doc.text(rec, 20, recYPos);
      recYPos += 7;
    });
    
    // Disclaimer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    recYPos += 10;
    doc.text('Disclaimer: This is an AI-based educational tool and not a substitute for professional', 20, recYPos);
    doc.text('medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals.', 20, recYPos + 5);
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 285, { align: 'center' });
    doc.text('CardioSense - AI-Powered Cardiovascular Risk Assessment', 105, 290, { align: 'center' });
    
    doc.save('CardioSense_RandomForest_Report.pdf');
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
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Random Forest Analysis
              </h2>
              <TreeDeciduous className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-gray-600">
              Ensemble machine learning model prediction based on patient data
            </p>
          </div>

          {/* Prediction Result */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl shadow-xl p-8 mb-6 ${
              hasDisease ? 'bg-red-50 border-2 border-red-200' : 'bg-green-50 border-2 border-green-200'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {hasDisease ? (
                  <XCircle className="w-16 h-16 text-red-600" />
                ) : (
                  <CheckCircle className="w-16 h-16 text-green-600" />
                )}
                <div>
                  <h3 className={`text-2xl font-bold ${hasDisease ? 'text-red-900' : 'text-green-900'}`}>
                    {hasDisease ? 'CVD Risk Detected' : 'No CVD Risk'}
                  </h3>
                  <p className={`text-lg ${hasDisease ? 'text-red-700' : 'text-green-700'}`}>
                    Random Forest Model
                  </p>
                </div>
              </div>
            </div>

            {/* Probability Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-semibold">Risk Probability</span>
                <span className={`text-2xl font-bold ${hasDisease ? 'text-red-600' : 'text-green-600'}`}>
                  {riskPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    hasDisease ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${riskPercentage}%` }}
                />
              </div>
            </div>

            <div className={`mt-4 p-4 rounded-lg ${hasDisease ? 'bg-red-100' : 'bg-green-100'}`}>
              <p className={`font-semibold ${hasDisease ? 'text-red-900' : 'text-green-900'}`}>
                Risk Level: <span className="text-xl">{hasDisease ? 'High Risk' : 'Low Risk'}</span>
              </p>
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Activity className="w-8 h-8 text-green-600" />
              Health Recommendations
            </h3>
            <div className="space-y-3">
              {hasDisease ? (
                <>
                  <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                    <span className="text-red-600 font-bold text-lg">•</span>
                    <p className="text-gray-800">Consult a cardiologist for comprehensive evaluation</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <span className="text-orange-600 font-bold text-lg">•</span>
                    <p className="text-gray-800">Monitor blood pressure and cholesterol regularly</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <span className="text-yellow-600 font-bold text-lg">•</span>
                    <p className="text-gray-800">Adopt heart-healthy diet and exercise routine</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-blue-600 font-bold text-lg">•</span>
                    <p className="text-gray-800">Consider stress management techniques</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <span className="text-purple-600 font-bold text-lg">•</span>
                    <p className="text-gray-800">Follow prescribed medication regimen if applicable</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-green-600 font-bold text-lg">•</span>
                    <p className="text-gray-800">Maintain current healthy lifestyle habits</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-blue-600 font-bold text-lg">•</span>
                    <p className="text-gray-800">Regular annual cardiovascular check-ups</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <span className="text-indigo-600 font-bold text-lg">•</span>
                    <p className="text-gray-800">Continue balanced diet and physical activity</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <span className="text-purple-600 font-bold text-lg">•</span>
                    <p className="text-gray-800">Monitor blood pressure periodically</p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-lg border border-pink-200">
                    <span className="text-pink-600 font-bold text-lg">•</span>
                    <p className="text-gray-800">Stay informed about cardiovascular health</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Check Another Patient
            </button>
            <button
              onClick={exportPDF}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Export PDF Report
            </button>
            <button
              onClick={sendEmailWithReport}
              disabled={!personalDetails.email || emailSending}
              className="flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {emailSending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Email Report
                </>
              )}
            </button>
          </motion.div>

          {/* Email Status Modal */}
          {showEmailModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowEmailModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-2xl font-bold ${currentStatusTheme.textColor}`}>
                    {currentStatusTheme.title}
                  </h3>
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
                <p className="text-gray-700 mb-6 whitespace-pre-line">{emailStatus.message}</p>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-colors ${currentStatusTheme.button}`}
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6"
          >
            <p className="text-sm text-gray-700 text-center">
              <span className="font-bold">Medical Disclaimer:</span> This is an AI-based educational tool and should not be used for medical diagnosis. 
              Always consult qualified healthcare professionals for medical advice, diagnosis, or treatment.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default ResultsRandomForest;
