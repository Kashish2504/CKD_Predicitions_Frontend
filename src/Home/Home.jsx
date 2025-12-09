import React, { useState, useEffect } from 'react';
import { Activity, Shield, TrendingUp, Clock, Users, Brain, ChevronRight, Menu, X, CheckCircle, BarChart3, Zap } from 'lucide-react';

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              NephroSafe
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition font-medium">Home</a>
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition font-medium scroll-smooth">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition font-medium">How It Works</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition font-medium">About</a>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition">
              Get Started
            </button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-gray-700">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <a href="#home" className="block text-gray-700 hover:text-blue-600 transition py-2">Home</a>
            <a href="#features" className="block text-gray-700 hover:text-blue-600 transition py-2">Features</a>
            <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600 transition py-2">How It Works</a>
            <a href="#about" className="block text-gray-700 hover:text-blue-600 transition py-2">About</a>
            <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero Component
const Hero = () => {
  return (
    <section id="home" className="pt-20 md:pt-32 pb-16 md:pb-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                AI-Powered CKD Prediction
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Predict CKD Risk
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                6-12 Months Early
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              NephroSafe leverages advanced deep learning to identify Chronic Kidney Disease risk before symptoms appear, enabling early intervention and better outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition flex items-center justify-center">
                Start Prediction
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
                Learn More
              </button>
            </div>
            <div className="flex items-center space-x-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-blue-600">98%</div>
                <div className="text-sm text-gray-600">6-Month Accuracy</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-cyan-500">97%</div>
                <div className="text-sm text-gray-600">12-Month Accuracy</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl transform rotate-3 opacity-20"></div>
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">AI Analysis</div>
                      <div className="font-semibold text-gray-900">Processing...</div>
                    </div>
                  </div>
                  <div className="text-blue-600 font-bold">94%</div>
                </div>
                
                <div className="space-y-3">
                  {['CNN Analysis', 'LSTM Prediction', 'BiLSTM Processing'].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Risk Assessment</span>
                    <span className="text-green-600 font-semibold">Low Risk</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, gradient }) => {
  return (
    <div className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100">
      <div className={`w-16 h-16 ${gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

// Features Section
const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Real-Time Prediction",
      description: "Get instant CKD risk assessment powered by ensemble deep learning models with 98% accuracy.",
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "Early Detection",
      description: "Identify CKD risk 6-12 months before symptoms appear, enabling timely medical intervention.",
      gradient: "bg-gradient-to-br from-cyan-500 to-cyan-600"
    },
    {
      icon: BarChart3,
      title: "Interactive Dashboard",
      description: "Visual reports and historical data tracking for better patient-doctor communication.",
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced ensemble of CNN, LSTM, and BiLSTM models for superior prediction accuracy.",
      gradient: "bg-gradient-to-br from-indigo-500 to-indigo-600"
    },
    {
      icon: Clock,
      title: "Web-Based Access",
      description: "Check your CKD risk anytime, anywhere with no advanced hardware required.",
      gradient: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      icon: Users,
      title: "Patient-Centric",
      description: "Easy-to-use interface designed for both patients and healthcare professionals.",
      gradient: "bg-gradient-to-br from-orange-500 to-orange-600"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">NephroSafe</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI technology meets intuitive design for early CKD detection and prevention
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorks = () => {
  const steps = [
    { number: "01", title: "Input Health Data", description: "Enter your medical parameters through our secure, user-friendly interface" },
    { number: "02", title: "AI Analysis", description: "Our ensemble deep learning models process your data with advanced feature selection" },
    { number: "03", title: "Get Results", description: "Receive comprehensive risk assessment with 6-month and 12-month predictions" },
    { number: "04", title: "Take Action", description: "Share results with your doctor and plan early interventions if needed" }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, fast, and accurate CKD prediction in four easy steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="text-center">
                <div className="inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-cyan-300 -z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Section
const Stats = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center text-white">
          <div>
            <div className="text-5xl font-bold mb-2">98%</div>
            <div className="text-blue-100">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">12M</div>
            <div className="text-blue-100">Early Prediction</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">24/7</div>
            <div className="text-blue-100">Availability</div>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2">3</div>
            <div className="text-blue-100">AI Models</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTA = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Ready to Take Control of Your Kidney Health?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Start your CKD risk assessment today and take the first step towards early prevention
        </p>
        <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition">
          Get Started Now
        </button>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">NephroSafe</span>
            </div>
            <p className="text-gray-400">Early CKD detection powered by AI for better health outcomes.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 NephroSafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}