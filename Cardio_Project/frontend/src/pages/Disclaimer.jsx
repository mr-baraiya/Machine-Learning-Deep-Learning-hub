import React from 'react';
import { AlertTriangle, Shield, FileText } from 'lucide-react';

function Disclaimer() {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Medical Disclaimer</h1>
              <p className="text-gray-600 mt-1">Important Information About This Tool</p>
            </div>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Purpose of This Application
              </h2>
              <p>
                CardioSense is an educational machine learning project designed to demonstrate 
                the application of AI algorithms in healthcare. This tool provides risk assessments 
                for cardiovascular disease based on patient health metrics using Random Forest and 
                Logistic Regression models.
              </p>
            </section>

            <section className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                Not a Substitute for Medical Advice
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>This tool is <strong>NOT</strong> a medical device or diagnostic tool</li>
                <li>Predictions should <strong>NOT</strong> be used for medical diagnosis or treatment decisions</li>
                <li>Always consult qualified healthcare professionals for medical advice</li>
                <li>Do not delay seeking medical care based on results from this tool</li>
                <li>This is an academic project for educational purposes only</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Limitations and Accuracy
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Model accuracy is based on training data and may not apply to all populations</li>
                <li>Results are probabilistic estimates, not definitive diagnoses</li>
                <li>Individual health conditions may not be fully captured by the input parameters</li>
                <li>The model has not been clinically validated or approved by regulatory authorities</li>
                <li>Accuracy rates mentioned are based on test data and may vary in real-world scenarios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Privacy</h2>
              <p>
                No patient data entered into this system is stored, saved, or transmitted to any 
                third parties. All calculations are performed in real-time and data is not retained 
                after the session ends.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Liability</h2>
              <p>
                The developers and associated institutions bear no responsibility for any decisions 
                made based on the output of this tool. Users assume full responsibility for any 
                actions taken based on the information provided by this application.
              </p>
            </section>

            <section className="bg-blue-50 border border-blue-200 p-6 rounded-lg mt-8">
              <h3 className="font-semibold text-gray-900 mb-2">If You Have Concerns About Your Heart Health:</h3>
              <ul className="space-y-2 text-sm">
                <li>✓ Schedule an appointment with your primary care physician</li>
                <li>✓ Consult a board-certified cardiologist</li>
                <li>✓ Undergo proper clinical testing and evaluation</li>
                <li>✓ Follow evidence-based medical guidelines</li>
                <li>✓ In case of emergency, call your local emergency services immediately</li>
              </ul>
            </section>

            <section className="text-sm text-gray-600 pt-6 border-t mt-8">
              <p className="font-semibold mb-2">Academic Project Information:</p>
              <p>Developer: Vishal Baraiya | ML Engineer & Full Stack Developer</p>
              <p>Course: Machine Learning & Deep Learning</p>
              <p>Last Updated: January 2026</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Disclaimer;
