import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Calendar, Shield, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight, Activity } from 'lucide-react';

const Logo = () => (
  <div className="flex items-center justify-center gap-3 mb-8">
    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
      <Activity className="w-8 h-8 text-white" />
    </div>
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">NephroSafe</h1>
      <p className="text-sm text-gray-500">Early CKD Detection Platform</p>
    </div>
  </div>
);

const InputField = ({ icon: Icon, type, name, placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;
  return (
    <div className="mb-4">
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input type={inputType} name={name} placeholder={placeholder} value={value} onChange={onChange}
          className={`w-full pl-11 ${type === 'password' ? 'pr-11' : 'pr-4'} py-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`} />
        {type === 'password' && (
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />{error}
        </p>
      )}
    </div>
  );
};

const ErrorMessage = ({ message }) => (
  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
    <p className="text-sm text-red-700">{message}</p>
  </div>
);

const LoginForm = ({ onSwitchToSignup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!formData.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Please enter a valid email';
    if (!formData.password) e.password = 'Password is required';
    else if (formData.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setIsLoading(true);
    setGeneralError('');
    setTimeout(() => {
      setIsLoading(false);
      // Mock auth: any email + password >= 6 chars works, OR demo creds
      const isDemo = formData.email === 'demo@nephrosafe.com' && formData.password === 'demo123';
      const isValid = isDemo || (/\S+@\S+\.\S+/.test(formData.email) && formData.password.length >= 6);
      if (isValid) {
        localStorage.setItem('nephrosafe_auth', JSON.stringify({ email: formData.email, loggedInAt: new Date().toISOString() }));
        navigate('/dashboard');
      } else {
        setGeneralError('Invalid email or password.');
      }
    }, 800);
  };

  return (
    <div className="space-y-5">
      {generalError && <ErrorMessage message={generalError} />}
      <InputField icon={Mail} type="email" name="email" placeholder="Enter your email"
        value={formData.email} onChange={handleChange} error={errors.email} />
      <InputField icon={Lock} type="password" name="password" placeholder="Enter your password"
        value={formData.password} onChange={handleChange} error={errors.password} />
      <div className="flex items-center justify-between">
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" checked={formData.rememberMe}
            onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <button onClick={() => alert('Password reset feature coming soon')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Forgot Password?
        </button>
      </div>
      <button onClick={handleSubmit} disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
        {isLoading ? (
          <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Signing In...</>
        ) : (
          <>Sign In<ArrowRight className="w-5 h-5" /></>
        )}
      </button>
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button onClick={onSwitchToSignup} className="text-blue-600 font-semibold hover:text-blue-700">Sign Up</button>
        </p>
      </div>
    </div>
  );
};

const SignupForm = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', dateOfBirth: '', password: '', confirmPassword: '', agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const e = {};
    if (!formData.fullName) e.fullName = 'Full name is required';
    else if (formData.fullName.length < 3) e.fullName = 'Name must be at least 3 characters';
    if (!formData.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Please enter a valid email';
    if (!formData.phone) e.phone = 'Phone number is required';
    else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) e.phone = 'Please enter a valid phone number';
    if (!formData.dateOfBirth) e.dateOfBirth = 'Date of birth is required';
    if (!formData.password) e.password = 'Password is required';
    else if (formData.password.length < 8) e.password = 'Password must be at least 8 characters';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) e.password = 'Password must contain uppercase, lowercase, and number';
    if (!formData.confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!formData.agreeToTerms) e.agreeToTerms = 'You must agree to the terms and conditions';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      // Auto-login after signup and navigate
      localStorage.setItem('nephrosafe_auth', JSON.stringify({ email: formData.email, name: formData.fullName, loggedInAt: new Date().toISOString() }));
      setTimeout(() => navigate('/dashboard'), 1500);
    }, 1200);
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Account Created!</h3>
        <p className="text-gray-600 mb-4">Your account has been successfully created.</p>
        <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <InputField icon={User} type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} error={errors.fullName} />
      <InputField icon={Mail} type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} error={errors.email} />
      <InputField icon={Phone} type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} error={errors.phone} />
      <InputField icon={Calendar} type="date" name="dateOfBirth" placeholder="Date of Birth" value={formData.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} />
      <InputField icon={Lock} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} error={errors.password} />
      <InputField icon={Lock} type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
      <div>
        <label className="flex items-start cursor-pointer">
          <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1" />
          <span className="ml-2 text-sm text-gray-600">
            I agree to the <span className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">Terms of Service</span> and <span className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">Privacy Policy</span>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />{errors.agreeToTerms}
          </p>
        )}
      </div>
      <button onClick={handleSubmit} disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
        {isLoading ? (
          <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>Creating Account...</>
        ) : (
          <>Create Account<ArrowRight className="w-5 h-5" /></>
        )}
      </button>
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-blue-600 font-semibold hover:text-blue-700">Sign In</button>
        </p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    { icon: Shield, title: 'Secure & Encrypted', description: 'Your health data is protected with enterprise-grade encryption' },
    { icon: Activity, title: 'AI-Powered Predictions', description: 'Industry-leading accuracy backed by trained ML models' },
    { icon: CheckCircle, title: 'Early Detection', description: 'Identify CKD risk early for better outcomes' }
  ];
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Early Detection Saves Lives</h2>
        <p className="text-blue-100 text-lg">Advanced AI platform for chronic kidney disease prediction</p>
      </div>
      <div className="space-y-4">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">{f.title}</h3>
                  <p className="text-blue-100 text-sm">{f.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Platform Stats</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div><div className="text-3xl font-bold text-white mb-1">10K+</div><div className="text-blue-100 text-xs">Patients</div></div>
          <div><div className="text-3xl font-bold text-white mb-1">High</div><div className="text-blue-100 text-xs">Accuracy</div></div>
          <div><div className="text-3xl font-bold text-white mb-1">500+</div><div className="text-blue-100 text-xs">Doctors</div></div>
        </div>
      </div>
    </div>
  );
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 shadow-2xl">
              <FeaturesSection />
            </div>
          </div>
          <div className="w-full">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
              <Logo />
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-600">
                  {isLogin ? 'Sign in to access your health dashboard' : 'Join NephroSafe for early CKD detection'}
                </p>
              </div>
              {isLogin ? (
                <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
              ) : (
                <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
              )}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => alert('Social login coming soon')}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Google</span>
                </button>
                <button onClick={() => alert('Social login coming soon')}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Facebook</span>
                </button>
              </div>
              {isLogin && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-700 font-medium mb-1">Quick Demo Access:</p>
                  <p className="text-xs text-blue-600">Email: demo@nephrosafe.com</p>
                  <p className="text-xs text-blue-600">Password: demo123</p>
                </div>
              )}
            </div>
            <div className="text-center mt-6">
              <p className="text-xs text-gray-500">© 2026 NephroSafe. HIPAA Compliant | Secure Medical Platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;