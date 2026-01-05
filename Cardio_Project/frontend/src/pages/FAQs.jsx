import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition"
      >
        <span className="font-semibold text-gray-900 text-left">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function FAQs() {
  const faqs = [
    {
      question: "What is CardioSense?",
      answer: "CardioSense is an educational machine learning project that uses AI algorithms to assess cardiovascular disease risk based on patient health metrics. It demonstrates the application of Random Forest and Logistic Regression models in healthcare prediction."
    },
    {
      question: "How accurate are the predictions?",
      answer: "The Random Forest model achieves approximately 95% accuracy and the Logistic Regression model achieves about 92% accuracy on the test dataset. However, these are academic metrics and should not be used for actual medical diagnosis."
    },
    {
      question: "Can I use this for medical diagnosis?",
      answer: "No. This is an educational tool and NOT a medical device. Predictions should never be used for medical diagnosis or treatment decisions. Always consult qualified healthcare professionals for medical advice."
    },
    {
      question: "What data do you collect?",
      answer: "We do not store or collect any patient data. All calculations are performed in real-time in your browser, and no information is saved or transmitted to any servers. Your data privacy is fully protected."
    },
    {
      question: "What input parameters does the model use?",
      answer: "The model uses 11 health parameters: age, gender, height, weight, systolic blood pressure, diastolic blood pressure, cholesterol level, glucose level, smoking status, alcohol consumption, and physical activity level."
    },
    {
      question: "How were the models trained?",
      answer: "The models were trained on the Cardiovascular Disease dataset containing 70,000 patient records. The data was preprocessed, cleaned, and split into training and testing sets. Models were evaluated using cross-validation and various performance metrics."
    },
    {
      question: "What is the difference between the two models?",
      answer: "Random Forest is an ensemble method using multiple decision trees, providing high accuracy for complex patterns. Logistic Regression is a statistical model that's faster and more interpretable. Comparing both gives a more comprehensive risk assessment."
    },
    {
      question: "Why do the two models give different predictions?",
      answer: "Different algorithms use different approaches to analyze data. Random Forest can capture non-linear relationships better, while Logistic Regression assumes linear relationships. Comparing results from multiple models provides a more robust assessment."
    },
    {
      question: "What do the risk levels mean?",
      answer: "Low Risk: Low probability of cardiovascular disease. Moderate Risk: Moderate probability, lifestyle changes recommended. High Risk: High probability, medical consultation strongly advised. These are algorithmic assessments, not medical diagnoses."
    },
    {
      question: "Can I download my results?",
      answer: "Yes, you can download a PDF report containing your risk assessment results from both models, including recommendations. This is for personal reference only and should not replace medical consultation."
    },
    {
      question: "Is this tool free to use?",
      answer: "Yes, this is an educational project and completely free to use. It was developed as part of a Machine Learning & Deep Learning course project."
    },
    {
      question: "Who developed this application?",
      answer: "This project was developed by Vishal Baraiya as part of the Machine Learning & Deep Learning course curriculum. View the source code at: https://github.com/mr-baraiya/Machine-Learning-Deep-Learning-hub/tree/v1.0-model/Cardio_Project"
    },
    {
      question: "Can I use this project for my research?",
      answer: "This is an educational project. If you wish to reference or build upon this work for academic purposes, please contact the developer for proper attribution and permission."
    },
    {
      question: "What should I do if I get a high-risk result?",
      answer: "Do not panic. Remember this is not a medical diagnosis. Schedule an appointment with a healthcare professional for proper clinical evaluation. Maintain a healthy lifestyle and follow your doctor's advice."
    },
    {
      question: "How often should I check my cardiovascular risk?",
      answer: "This tool is for educational demonstration only. For actual health monitoring, follow your doctor's recommendations for regular check-ups and screenings based on your age, medical history, and risk factors."
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about CardioSense
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-700 mb-4">
            If you couldn't find the answer you're looking for, feel free to contact us.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
