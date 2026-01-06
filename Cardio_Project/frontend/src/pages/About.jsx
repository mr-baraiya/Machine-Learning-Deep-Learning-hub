import React from 'react';
import { Brain, Target, Code, Heart, Database, Github, Linkedin, Mail, Phone, Lightbulb, BarChart, Shield, User } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-600 to-blue-800 text-white pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About CardioSense</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              An advanced machine learning application leveraging artificial intelligence to assess 
              cardiovascular disease risk, combining clinical accuracy with cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                CardioSense aims to democratize cardiovascular risk assessment through accessible, 
                accurate AI-powered prediction tools. By combining Random Forest and Logistic Regression 
                models, we provide comprehensive analysis that aids in early detection and prevention.
              </p>
              <p className="text-gray-600 leading-relaxed">
                This educational project demonstrates the practical application of machine learning in 
                healthcare, showcasing how AI can support medical professionals in making informed decisions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">75% / 72%</div>
                <p className="text-sm text-gray-700">Model Accuracy (RF / LR)</p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">70K+</div>
                <p className="text-sm text-gray-700">Training Samples</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 mb-2">11</div>
                <p className="text-sm text-gray-700">Health Parameters</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-orange-600 mb-2">2</div>
                <p className="text-sm text-gray-700">ML Algorithms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced features designed for accuracy, reliability, and user experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dual Model Approach</h3>
              <p className="text-gray-600 leading-relaxed">
                Combines Random Forest (75% accuracy) and Logistic Regression (72% accuracy) for 
                comprehensive risk assessment with cross-validation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy First</h3>
              <p className="text-gray-600 leading-relaxed">
                No data storage or collection. All predictions are processed in real-time without 
                saving any personal health information.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visual Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Interactive charts comparing model predictions with detailed explanations and 
                downloadable PDF reports for reference.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Actionable Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Personalized recommendations based on risk assessment to help users take 
                proactive steps towards better cardiovascular health.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Medical Standards</h3>
              <p className="text-gray-600 leading-relaxed">
                Built following healthcare UI/UX guidelines with clear disclaimers and 
                emphasis on professional medical consultation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Extensive Dataset</h3>
              <p className="text-gray-600 leading-relaxed">
                Trained on 70,000 patient records with rigorous validation to ensure 
                reliable and consistent predictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technology Stack</h2>
            <p className="text-lg text-gray-600">Built with modern, industry-standard technologies</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Code className="w-6 h-6 text-blue-600" />
                Frontend Technologies
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">React.js 18</span>
                    <span className="text-sm text-gray-500">UI Framework</span>
                  </div>
                  <p className="text-sm text-gray-600">Modern component-based architecture</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Tailwind CSS v4</span>
                    <span className="text-sm text-gray-500">Styling</span>
                  </div>
                  <p className="text-sm text-gray-600">Utility-first CSS framework</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Recharts</span>
                    <span className="text-sm text-gray-500">Visualization</span>
                  </div>
                  <p className="text-sm text-gray-600">Interactive data visualization</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Vite</span>
                    <span className="text-sm text-gray-500">Build Tool</span>
                  </div>
                  <p className="text-sm text-gray-600">Lightning-fast development</p>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-green-50 to-green-100 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Database className="w-6 h-6 text-green-600" />
                Backend & ML Stack
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">FastAPI</span>
                    <span className="text-sm text-gray-500">API Framework</span>
                  </div>
                  <p className="text-sm text-gray-600">High-performance Python backend</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Scikit-learn</span>
                    <span className="text-sm text-gray-500">ML Library</span>
                  </div>
                  <p className="text-sm text-gray-600">Model training and prediction</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">NumPy & Pandas</span>
                    <span className="text-sm text-gray-500">Data Processing</span>
                  </div>
                  <p className="text-sm text-gray-600">Numerical computing and analysis</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Python 3.11</span>
                    <span className="text-sm text-gray-500">Runtime</span>
                  </div>
                  <p className="text-sm text-gray-600">Latest Python interpreter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Journey */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Development Journey</h2>
            <p className="text-lg text-gray-600">From concept to deployment</p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">1</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Data Collection & Exploration</h3>
                <p className="text-gray-600">Acquired and analyzed 70,000 cardiovascular patient records, exploring distributions, correlations, and patterns.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">2</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Data Preprocessing & Feature Engineering</h3>
                <p className="text-gray-600">Cleaned data, handled outliers, normalized features, and prepared dataset for optimal model training.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">3</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Model Development & Training</h3>
                <p className="text-gray-600">Implemented Random Forest and Logistic Regression from scratch, trained models with cross-validation.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">4</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">API Development</h3>
                <p className="text-gray-600">Built FastAPI backend with endpoints for model predictions, health checks, and data validation.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">5</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Frontend Development</h3>
                <p className="text-gray-600">Created responsive React application with professional medical UI, visualization charts, and PDF export.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0">6</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Deployment & Testing</h3>
                <p className="text-gray-600">Deployed backend on Render, tested end-to-end functionality, and validated model predictions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Developer</h2>
            <p className="text-lg text-gray-600">Created as part of ML & Deep Learning coursework</p>
          </div>

          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-full shrink-0 bg-blue-600 flex items-center justify-center">
                <User className="w-16 h-16 text-white" strokeWidth={1.5} />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Vishal Baraiya</h3>
                <p className="text-lg text-blue-600 font-semibold mb-4">ML Engineer & Full Stack Developer</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-700 mb-6">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>baraiyavishalbhai32@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>+91 7383359679</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <a 
                    href="http://github.com/mr-baraiya" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/baraiya-vishalbhai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a 
                    href="https://huggingface.co/mr-baraiya/cardio-disease-model" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
                  >
                    <Brain className="w-4 h-4" />
                    HuggingFace
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-blue-200">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-700">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  <a 
                    href="https://github.com/mr-baraiya/Machine-Learning-Deep-Learning-hub/tree/v1.0-model/Cardio_Project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                  >
                    View Complete Repository
                  </a>
                </div>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-green-600" />
                  <a 
                    href="https://github.com/mr-baraiya/Machine-Learning-Deep-Learning-hub/releases/tag/v1.0-model"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-700 font-medium hover:underline"
                  >
                    Model Release v1.0
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-linear-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Assess Your Risk?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Try our AI-powered cardiovascular disease prediction tool
          </p>
          <a 
            href="/predict" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
          >
            Start Assessment
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;
