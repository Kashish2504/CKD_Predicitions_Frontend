import React, { useState, useEffect } from 'react';
import { 
  Activity, ArrowLeft, Download, Share2, AlertTriangle, 
  CheckCircle, TrendingUp, Calendar, User, Heart,
  Brain, BarChart3, Info, FileText, Clock
} from 'lucide-react';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              NephroSafe
            </span>
          </div>
          <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition">
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">John Doe</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Risk Score Circle Component
const RiskScoreCircle = ({ score, period }) => {
  const [progress, setProgress] = useState(0);
  const percentage = Math.round(score * 100);
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getRiskLevel = (score) => {
    if (score < 0.3) return { level: 'Low', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score < 0.7) return { level: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'High', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const risk = getRiskLevel(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <svg className="transform -rotate-90 w-48 h-48">
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke={score < 0.3 ? '#10b981' : score < 0.7 ? '#f59e0b' : '#ef4444'}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${risk.color}`}>{percentage}%</span>
          <span className="text-gray-500 text-sm mt-1">Risk Score</span>
        </div>
      </div>
      <div className={`mt-4 px-6 py-2 rounded-full ${risk.bgColor}`}>
        <span className={`font-semibold ${risk.color}`}>{risk.level} Risk</span>
      </div>
      <div className="mt-2 text-gray-600 text-sm">{period}</div>
    </div>
  );
};

// Timeline Prediction Component
const TimelinePrediction = ({ predictions }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Clock className="w-6 h-6 mr-2 text-blue-600" />
        Prediction Timeline
      </h3>
      <div className="space-y-6">
        {predictions.map((pred, idx) => (
          <div key={idx} className="relative">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                pred.risk < 0.3 ? 'bg-green-100' : pred.risk < 0.7 ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <Calendar className={`w-6 h-6 ${
                  pred.risk < 0.3 ? 'text-green-600' : pred.risk < 0.7 ? 'text-yellow-600' : 'text-red-600'
                }`} />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-800">{pred.period}</h4>
                    <p className="text-sm text-gray-500">{pred.date}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-semibold ${
                    pred.risk < 0.3 ? 'bg-green-100 text-green-700' : 
                    pred.risk < 0.7 ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {Math.round(pred.risk * 100)}%
                  </div>
                </div>
              </div>
            </div>
            {idx < predictions.length - 1 && (
              <div className="ml-6 h-8 w-0.5 bg-gray-200"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Feature Importance Component
const FeatureImportance = ({ features }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
        Key Risk Factors
      </h3>
      <div className="space-y-4">
        {features.map((feature, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{feature.name}</span>
              <span className="text-sm font-semibold text-gray-800">{feature.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all duration-1000 ${
                  feature.importance > 0.7 ? 'bg-red-500' : 
                  feature.importance > 0.4 ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`}
                style={{ width: `${feature.importance * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Recommendations Component
const Recommendations = ({ riskLevel }) => {
  const getRecommendations = (level) => {
    if (level === 'Low') {
      return [
        { icon: CheckCircle, text: 'Continue regular health check-ups', color: 'text-green-600' },
        { icon: Heart, text: 'Maintain healthy diet and hydration', color: 'text-green-600' },
        { icon: TrendingUp, text: 'Regular exercise routine recommended', color: 'text-green-600' },
        { icon: Calendar, text: 'Annual kidney function tests', color: 'text-green-600' }
      ];
    } else if (level === 'Medium') {
      return [
        { icon: AlertTriangle, text: 'Schedule appointment with nephrologist', color: 'text-yellow-600' },
        { icon: Heart, text: 'Monitor blood pressure and glucose levels', color: 'text-yellow-600' },
        { icon: FileText, text: 'Comprehensive kidney function tests needed', color: 'text-yellow-600' },
        { icon: TrendingUp, text: 'Lifestyle modifications recommended', color: 'text-yellow-600' }
      ];
    } else {
      return [
        { icon: AlertTriangle, text: 'Immediate consultation with specialist required', color: 'text-red-600' },
        { icon: Heart, text: 'Close monitoring of kidney function essential', color: 'text-red-600' },
        { icon: FileText, text: 'Complete diagnostic workup recommended', color: 'text-red-600' },
        { icon: Brain, text: 'Consider preventive treatment options', color: 'text-red-600' }
      ];
    }
  };

  const recommendations = getRecommendations(riskLevel);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Brain className="w-6 h-6 mr-2 text-blue-600" />
        AI Recommendations
      </h3>
      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="flex items-start space-x-3 bg-white p-4 rounded-xl">
            <rec.icon className={`w-6 h-6 mt-0.5 ${rec.color}`} />
            <p className="text-gray-700 flex-1">{rec.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Patient Info Card Component
const PatientInfoCard = ({ patient }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{patient.name}</h2>
          <p className="text-blue-100">Patient ID: {patient.id}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-blue-100 text-sm">Age</p>
          <p className="text-xl font-semibold">{patient.age} years</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm">Gender</p>
          <p className="text-xl font-semibold">{patient.gender}</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm">Test Date</p>
          <p className="text-xl font-semibold">{patient.testDate}</p>
        </div>
        <div>
          <p className="text-blue-100 text-sm">Analysis ID</p>
          <p className="text-xl font-semibold">{patient.analysisId}</p>
        </div>
      </div>
    </div>
  );
};

// Main Prediction Result Page
const PredictionResultPage = () => {
  // Sample data - would come from API in production
  const patientData = {
    name: 'John Doe',
    id: 'P-2024-1234',
    age: 58,
    gender: 'Male',
    testDate: 'Nov 19, 2025',
    analysisId: 'ANA-5678'
  };

  const predictions = [
    { period: '6-Month Prediction', date: 'May 2026', risk: 0.42 },
    { period: '12-Month Prediction', date: 'Nov 2026', risk: 0.58 }
  ];

  const features = [
    { name: 'Serum Creatinine', value: '1.8 mg/dL', importance: 0.92 },
    { name: 'Blood Urea Nitrogen', value: '28 mg/dL', importance: 0.85 },
    { name: 'eGFR', value: '52 mL/min', importance: 0.78 },
    { name: 'Blood Pressure', value: '145/92 mmHg', importance: 0.65 },
    { name: 'Hemoglobin', value: '11.2 g/dL', importance: 0.58 },
    { name: 'Albumin', value: '3.4 g/dL', importance: 0.45 }
  ];

  const currentRisk = predictions[0].risk;
  const riskLevel = currentRisk < 0.3 ? 'Low' : currentRisk < 0.7 ? 'Medium' : 'High';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Prediction Results</h1>
            <p className="text-gray-600 mt-1">AI-powered CKD risk assessment</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-600 transition">
              <Download className="w-5 h-5" />
              <span className="font-medium">Download PDF</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition">
              <Share2 className="w-5 h-5" />
              <span className="font-medium">Share</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Score Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col md:flex-row items-center justify-around space-y-8 md:space-y-0">
                <RiskScoreCircle score={predictions[0].risk} period="6-Month Risk" />
                <div className="hidden md:block w-px h-48 bg-gray-200"></div>
                <RiskScoreCircle score={predictions[1].risk} period="12-Month Risk" />
              </div>
              
              {/* Alert Banner */}
              <div className={`mt-8 p-4 rounded-xl flex items-start space-x-3 ${
                riskLevel === 'Low' ? 'bg-green-50 border border-green-200' :
                riskLevel === 'Medium' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-red-50 border border-red-200'
              }`}>
                <Info className={`w-6 h-6 mt-0.5 ${
                  riskLevel === 'Low' ? 'text-green-600' :
                  riskLevel === 'Medium' ? 'text-yellow-600' :
                  'text-red-600'
                }`} />
                <div>
                  <h4 className={`font-semibold ${
                    riskLevel === 'Low' ? 'text-green-800' :
                    riskLevel === 'Medium' ? 'text-yellow-800' :
                    'text-red-800'
                  }`}>
                    {riskLevel === 'Low' ? 'Good News!' : 
                     riskLevel === 'Medium' ? 'Attention Required' : 
                     'Immediate Action Recommended'}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    riskLevel === 'Low' ? 'text-green-700' :
                    riskLevel === 'Medium' ? 'text-yellow-700' :
                    'text-red-700'
                  }`}>
                    {riskLevel === 'Low' 
                      ? 'Your kidney function appears healthy. Continue maintaining your current lifestyle and regular check-ups.'
                      : riskLevel === 'Medium'
                      ? 'Your results indicate moderate risk. We recommend consulting with a healthcare provider for preventive measures.'
                      : 'Your results show elevated risk factors. Please consult with a nephrologist as soon as possible for comprehensive evaluation.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline and Features */}
            <div className="grid md:grid-cols-2 gap-6">
              <TimelinePrediction predictions={predictions} />
              <FeatureImportance features={features} />
            </div>

            {/* Recommendations */}
            <Recommendations riskLevel={riskLevel} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Patient Info */}
            <PatientInfoCard patient={patientData} />

            {/* Model Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-blue-600" />
                AI Model Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Model Type</span>
                  <span className="font-semibold text-gray-800">Ensemble AI</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Accuracy (6m)</span>
                  <span className="font-semibold text-green-600">98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Accuracy (12m)</span>
                  <span className="font-semibold text-green-600">97%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Features Used</span>
                  <span className="font-semibold text-gray-800">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Processing Time</span>
                  <span className="font-semibold text-gray-800">1.2s</span>
                </div>
              </div>
            </div>

            {/* Disclaimer Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h4 className="font-semibold text-blue-900 mb-2">Medical Disclaimer</h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                This AI prediction is for informational purposes only and should not replace professional medical advice. Always consult with qualified healthcare providers for diagnosis and treatment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResultPage;