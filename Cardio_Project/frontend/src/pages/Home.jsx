import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { STATS } from '../utils/constants';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <LucideIcons.Heart className="w-10 h-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              CardioSense
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              AI-Powered Cardiovascular Risk Assessment
            </p>
            <p className="text-lg text-blue-50 mb-10 max-w-2xl mx-auto">
              Advanced machine learning technology for early detection and risk assessment of cardiovascular disease. 
              Combining Random Forest and Logistic Regression models for comprehensive analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/predict"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                Start Assessment <LucideIcons.ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/models"
                className="inline-flex items-center justify-center gap-2 bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-500 transition"
              >
                Learn About Models
              </Link>
              <a
                href="https://huggingface.co/mr-baraiya/cardio-disease-model"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                <LucideIcons.Brain className="w-5 h-5" />
                HuggingFace Model
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => {
              const IconComponent = LucideIcons[stat.icon];
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose CardioSense?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              State-of-the-art machine learning models providing accurate, reliable cardiovascular risk assessment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <LucideIcons.Brain className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced AI Models</h3>
              <p className="text-gray-600 mb-4">
                Dual-model approach using Random Forest (70.56% accuracy) and Logistic Regression (72.77% accuracy) 
                for comprehensive risk assessment.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Trained on 70,000 patient records</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Validated performance metrics</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <LucideIcons.Shield className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy & Security</h3>
              <p className="text-gray-600 mb-4">
                Your health data is processed securely with no storage or external transmission. 
                Complete privacy protection guaranteed.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">No data storage or logging</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">HIPAA-compliant architecture</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <LucideIcons.Activity className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Results</h3>
              <p className="text-gray-600 mb-4">
                Get immediate risk assessment with detailed analysis and personalized recommendations 
                within seconds.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Real-time predictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Downloadable PDF reports</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple 3-step process for cardiovascular risk assessment
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Enter Health Data</h3>
              <p className="text-gray-600">
                Input 11 basic health parameters including age, blood pressure, cholesterol, and lifestyle factors
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our dual ML models analyze your data using patterns from 70,000 patient records
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Results</h3>
              <p className="text-gray-600">
                Receive instant risk assessment with personalized recommendations and downloadable report
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Assess Your Cardiovascular Risk?
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Get started with a comprehensive AI-powered health assessment in just a few minutes
          </p>
          <Link
            to="/predict"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition shadow-xl text-lg"
          >
            Start Free Assessment <LucideIcons.ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="py-8 bg-yellow-50 border-t border-yellow-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-700">
            <strong>Educational Purpose Only:</strong> This tool is for educational demonstration and should not be used for medical diagnosis. 
            Always consult qualified healthcare professionals for medical advice.{' '}
            <Link to="/disclaimer" className="text-blue-600 hover:underline font-semibold">
              Read full disclaimer
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
