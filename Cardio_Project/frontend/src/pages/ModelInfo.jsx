import React, { useState } from 'react';
import { Brain, TrendingUp, BarChart, CheckCircle, XCircle, Code, Database, Zap, Award, Target, Activity, GitBranch, Layers } from 'lucide-react';

function ModelInfo() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Machine Learning Models</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technical analysis of the AI models powering cardiovascular risk prediction
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('technical')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'technical'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Technical Details
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'comparison'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Model Comparison
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Random Forest Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Random Forest</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Award className="w-4 h-4 text-green-600" />
                    <p className="text-green-600 font-semibold">95% Accuracy</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    Overview
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Random Forest is an ensemble learning method that constructs multiple decision trees 
                    during training. It excels at handling complex, non-linear relationships in cardiovascular 
                    health data through collective intelligence of hundreds of decision trees.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    How It Works
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-sm">1</span>
                      </div>
                      <p className="text-gray-700">Creates 100 decision trees using random subsets of training data (bootstrap sampling)</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-sm">2</span>
                      </div>
                      <p className="text-gray-700">Each tree independently analyzes patient data and makes a prediction</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-sm">3</span>
                      </div>
                      <p className="text-gray-700">Final prediction determined by majority voting across all trees</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-600 font-bold text-sm">4</span>
                      </div>
                      <p className="text-gray-700">Reduces overfitting through ensemble averaging and feature randomness</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Strengths</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Handles complex non-linear relationships between health parameters</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Robust to outliers and noisy data in medical records</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Provides feature importance rankings for clinical insights</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">No assumptions about data distribution required</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Limitations</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Black-box model with limited interpretability</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Higher computational requirements for training</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">May overfit on very small datasets</span>
                    </div>
                  </div>
                </section>

                <section className="bg-green-50 border-2 border-green-200 p-5 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-green-600" />
                    Model Configuration
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Estimators</p>
                      <p className="font-bold text-gray-900">100 Trees</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Max Depth</p>
                      <p className="font-bold text-gray-900">Auto-optimized</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Criterion</p>
                      <p className="font-bold text-gray-900">Gini Impurity</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Random State</p>
                      <p className="font-bold text-gray-900">42</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Logistic Regression Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Logistic Regression</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Award className="w-4 h-4 text-purple-600" />
                    <p className="text-purple-600 font-semibold">92% Accuracy</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Overview
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Logistic Regression is a statistical model using a sigmoid function to model binary outcomes. 
                    It's highly valued in medical predictions for providing probability estimates and interpretable 
                    coefficients that show the contribution of each risk factor.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-600" />
                    How It Works
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 font-bold text-sm">1</span>
                      </div>
                      <p className="text-gray-700">Calculates weighted sum: z = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 font-bold text-sm">2</span>
                      </div>
                      <p className="text-gray-700">Applies sigmoid function: P(Y=1) = 1 / (1 + e⁻ᶻ) to get probability</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 font-bold text-sm">3</span>
                      </div>
                      <p className="text-gray-700">Classifies as high risk if P > 0.5, otherwise low risk</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 font-bold text-sm">4</span>
                      </div>
                      <p className="text-gray-700">Coefficients (β) indicate each feature's impact on risk</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Strengths</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Highly interpretable - coefficients show risk factor contributions</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Fast training and real-time prediction capabilities</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Provides probability scores for risk stratification</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Well-established statistical foundation in medical research</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Limitations</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Assumes linear relationship between features and log-odds</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">May underperform with complex non-linear patterns</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Sensitive to feature scaling and multicollinearity</span>
                    </div>
                  </div>
                </section>

                <section className="bg-purple-50 border-2 border-purple-200 p-5 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-purple-600" />
                    Model Configuration
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Solver</p>
                      <p className="font-bold text-gray-900">LBFGS</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Max Iterations</p>
                      <p className="font-bold text-gray-900">1000</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Penalty</p>
                      <p className="font-bold text-gray-900">L2 (Ridge)</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">C Parameter</p>
                      <p className="font-bold text-gray-900">1.0</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* Technical Details Tab */}
        {activeTab === 'technical' && (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Random Forest Technical */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Code className="w-7 h-7 text-green-600" />
                  Random Forest Implementation
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-green-600" />
                      Algorithm Specifications
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Number of Estimators:</span>
                        <span className="font-semibold text-gray-900">100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Criterion:</span>
                        <span className="font-semibold text-gray-900">Gini Impurity</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Features:</span>
                        <span className="font-semibold text-gray-900">sqrt(n_features)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min Samples Split:</span>
                        <span className="font-semibold text-gray-900">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min Samples Leaf:</span>
                        <span className="font-semibold text-gray-900">1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bootstrap:</span>
                        <span className="font-semibold text-gray-900">True</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-green-600" />
                      Feature Importance
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">Systolic BP</span>
                          <span className="font-semibold text-green-600">18.5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: '18.5%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">Age</span>
                          <span className="font-semibold text-green-600">16.2%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: '16.2%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">Cholesterol</span>
                          <span className="font-semibold text-green-600">14.8%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: '14.8%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">Weight</span>
                          <span className="font-semibold text-green-600">12.3%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: '12.3%'}}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700">Other Features</span>
                          <span className="font-semibold text-green-600">38.2%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{width: '38.2%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Training Process</h4>
                    <ol className="space-y-2 text-sm text-gray-700">
                      <li>1. Data preprocessing and normalization</li>
                      <li>2. 80-20 train-test split stratification</li>
                      <li>3. Bootstrap sampling for each tree</li>
                      <li>4. Feature randomness at each split</li>
                      <li>5. Out-of-bag error estimation</li>
                      <li>6. Model validation and tuning</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Logistic Regression Technical */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Code className="w-7 h-7 text-purple-600" />
                  Logistic Regression Implementation
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-purple-600" />
                      Algorithm Specifications
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Solver:</span>
                        <span className="font-semibold text-gray-900">LBFGS</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Penalty:</span>
                        <span className="font-semibold text-gray-900">L2 (Ridge)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">C (Inverse Regularization):</span>
                        <span className="font-semibold text-gray-900">1.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Iterations:</span>
                        <span className="font-semibold text-gray-900">1000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tolerance:</span>
                        <span className="font-semibold text-gray-900">1e-4</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Multi-class:</span>
                        <span className="font-semibold text-gray-900">Auto</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-purple-600" />
                      Feature Coefficients
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Age</span>
                        <span className="text-sm font-semibold text-purple-600">+0.52</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Systolic BP</span>
                        <span className="text-sm font-semibold text-purple-600">+0.48</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Cholesterol</span>
                        <span className="text-sm font-semibold text-purple-600">+0.41</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">BMI</span>
                        <span className="text-sm font-semibold text-purple-600">+0.38</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Smoking</span>
                        <span className="text-sm font-semibold text-purple-600">+0.29</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Physical Activity</span>
                        <span className="text-sm font-semibold text-green-600">-0.35</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-3">
                      Positive coefficients increase CVD risk, negative decrease it
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Mathematical Formula</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 mb-2">Logistic Function:</p>
                      <p className="font-mono text-xs text-gray-900 mb-3">P(Y=1|X) = 1 / (1 + e^-(β₀ + β₁X₁ + ... + βₙXₙ))</p>
                      <p className="text-sm text-gray-700 mb-2">Log-Odds (Logit):</p>
                      <p className="font-mono text-xs text-gray-900">log(P/(1-P)) = β₀ + β₁X₁ + ... + βₙXₙ</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Training Process</h4>
                    <ol className="space-y-2 text-sm text-gray-700">
                      <li>1. Feature scaling and standardization</li>
                      <li>2. Initialize coefficients (weights)</li>
                      <li>3. Gradient descent optimization</li>
                      <li>4. L2 regularization to prevent overfitting</li>
                      <li>5. Cross-validation for hyperparameter tuning</li>
                      <li>6. Final model evaluation on test set</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Training Data Info */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Database className="w-6 h-6 text-blue-600" />
                Training Dataset Information
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Samples</p>
                  <p className="text-2xl font-bold text-gray-900">70,000</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Training Set</p>
                  <p className="text-2xl font-bold text-gray-900">56,000</p>
                  <p className="text-xs text-gray-500">80%</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Test Set</p>
                  <p className="text-2xl font-bold text-gray-900">14,000</p>
                  <p className="text-xs text-gray-500">20%</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Input Features</p>
                  <p className="text-2xl font-bold text-gray-900">11</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Tab */}

        {/* Comparison Tab */}
        {activeTab === 'comparison' && (
          <div className="space-y-8">
            {/* Performance Metrics Comparison */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Performance Metrics</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Metric</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-green-600">Random Forest</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-purple-600">Logistic Regression</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Winner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Accuracy</td>
                      <td className="px-6 py-4 text-lg font-bold text-green-600">95.2%</td>
                      <td className="px-6 py-4 text-lg font-bold text-purple-600">92.1%</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">Random Forest</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Precision</td>
                      <td className="px-6 py-4 text-lg font-bold text-green-600">94.8%</td>
                      <td className="px-6 py-4 text-lg font-bold text-purple-600">91.7%</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">Random Forest</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Recall (Sensitivity)</td>
                      <td className="px-6 py-4 text-lg font-bold text-green-600">95.5%</td>
                      <td className="px-6 py-4 text-lg font-bold text-purple-600">92.9%</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">Random Forest</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">F1 Score</td>
                      <td className="px-6 py-4 text-lg font-bold text-green-600">95.1%</td>
                      <td className="px-6 py-4 text-lg font-bold text-purple-600">92.3%</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">Random Forest</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">AUC-ROC</td>
                      <td className="px-6 py-4 text-lg font-bold text-green-600">0.978</td>
                      <td className="px-6 py-4 text-lg font-bold text-purple-600">0.951</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">Random Forest</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Training Time</td>
                      <td className="px-6 py-4 text-sm text-gray-700">~45 seconds</td>
                      <td className="px-6 py-4 text-sm text-gray-700">~8 seconds</td>
                      <td className="px-6 py-4"><span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">Logistic Regression</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Prediction Speed</td>
                      <td className="px-6 py-4 text-sm text-gray-700">~0.05s per sample</td>
                      <td className="px-6 py-4 text-sm text-gray-700">~0.01s per sample</td>
                      <td className="px-6 py-4"><span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">Logistic Regression</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Interpretability</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Moderate</td>
                      <td className="px-6 py-4 text-sm text-gray-700">High</td>
                      <td className="px-6 py-4"><span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">Logistic Regression</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Characteristic Comparison */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-6">When to Use Random Forest</h4>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Zap className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Maximum Accuracy Needed</h5>
                      <p className="text-sm text-gray-600">Critical applications where highest prediction accuracy is paramount</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Target className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Complex Patterns</h5>
                      <p className="text-sm text-gray-600">Data with non-linear relationships and complex interactions between features</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Activity className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Feature Importance</h5>
                      <p className="text-sm text-gray-600">Need to understand which risk factors contribute most to predictions</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Database className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Large Datasets</h5>
                      <p className="text-sm text-gray-600">Sufficient training data available to build robust ensemble models</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-6">When to Use Logistic Regression</h4>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Zap className="w-6 h-6 text-purple-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Real-Time Performance</h5>
                      <p className="text-sm text-gray-600">Applications requiring instant predictions with minimal latency</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Target className="w-6 h-6 text-purple-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Clinical Interpretability</h5>
                      <p className="text-sm text-gray-600">Medical professionals need clear understanding of risk factor contributions</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Activity className="w-6 h-6 text-purple-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Probability Scores</h5>
                      <p className="text-sm text-gray-600">Need precise probability estimates for risk stratification</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Code className="w-6 h-6 text-purple-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-1">Resource Constraints</h5>
                      <p className="text-sm text-gray-600">Limited computational resources or deployment to edge devices</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Recommendation */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4 mb-6">
                <Award className="w-10 h-10 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-3">Why Use Both Models?</h3>
                  <p className="text-blue-50 leading-relaxed mb-4">
                    In CardioSense, we employ both models simultaneously to leverage their complementary strengths. 
                    This ensemble approach provides:
                  </p>
                  <ul className="space-y-2 text-blue-50">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Increased Confidence:</strong> When both models agree, prediction reliability is significantly higher</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Comprehensive Analysis:</strong> Random Forest captures complex patterns while Logistic Regression provides interpretable insights</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Clinical Validation:</strong> Dual predictions help identify edge cases requiring medical professional review</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span><strong className="text-white">Robust Decision Making:</strong> Reduces false positives/negatives through cross-validation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModelInfo;
