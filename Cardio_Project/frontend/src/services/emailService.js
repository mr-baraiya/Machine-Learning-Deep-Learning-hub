import emailjs from '@emailjs/browser';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://cardio-fastapi-8ijy.onrender.com';

/**
 * Send PDF report via backend SMTP (with PDF attachment)
 * @param {string} toEmail - Recipient email address
 * @param {string} patientName - Patient's full name
 * @param {string} modelType - Type of model (randomforest, logistic, compare)
 * @param {object} patientData - Patient health data
 * @param {object} predictionResult - Prediction results from model
 * @returns {Promise} Backend response
 */
export const sendReportViaBackend = async (toEmail, patientName, modelType, patientData, predictionResult) => {
  if (!toEmail || !patientName) {
    throw new Error('Email address and patient name are required');
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/send-report`,
      {
        to_email: toEmail,
        patient_name: patientName,
        model_type: modelType,
        patient_data: patientData,
        prediction_result: predictionResult
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 seconds
      }
    );

    return response.data;
  } catch (error) {
    console.error('Backend email service failed:', error);
    if (error.response) {
      throw new Error(error.response.data.detail || 'Failed to send email via backend');
    }
    throw error;
  }
};

/**
 * Send PDF report notification via email (without attachment - EmailJS limitation)
 * @param {string} userEmail - Recipient email address
 * @param {string} userName - Recipient name
 * @param {string} reportType - Type of report (Logistic/Random Forest/Compare)
 * @param {string} riskLevel - Risk level result
 * @param {number} probability - Risk probability percentage
 * @returns {Promise} EmailJS response
 */
export const sendReportNotification = async (userEmail, userName, reportType, riskLevel, probability) => {
  if (!userEmail) {
    throw new Error('Email address is required to send report notification');
  }

  try {
    const templateParams = {
      to_name: userName || 'Patient',
      to_email: userEmail,
      report_type: reportType,
      risk_level: riskLevel,
      probability: probability,
      report_date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      message: `Your ${reportType} cardiovascular risk assessment has been completed. Risk Level: ${riskLevel} (${probability}% probability). Please check your results and consult with healthcare professionals for medical advice.`,
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    return response;
  } catch (error) {
    console.error('Email notification failed:', error);
    throw error;
  }
};
