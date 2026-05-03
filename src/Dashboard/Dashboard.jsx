import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Added Import
import { 
  Activity, Bell, Settings, LogOut, User, Calendar, TrendingUp, 
  AlertCircle, CheckCircle, Clock, Brain, BarChart3, FileText, 
  Download, Share2, ChevronRight, Heart, Droplet, Wind, Zap,
  Menu, X, Home, ClipboardList, History, Users
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sidebar Component
const Sidebar = ({ activePage, setActivePage, isMobileOpen, setIsMobileOpen }) => {
  const navigate = useNavigate(); // Added Navigate
  const menuItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard', path: '/dashboard' },
    { icon: ClipboardList, label: 'New Prediction', id: 'prediction', path: '/inputform' },
    { icon: History, label: 'History', id: 'history', path: '/history' },
    { icon: FileText, label: 'Reports', id: 'reports', path: '/result' },
    { icon: Settings, label: 'Settings', id: 'settings', path: '/profile' },
  ];

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)}></div>
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">NephroSafe</span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsMobileOpen(false);
                  navigate(item.path); // Added Navigation
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activePage === item.id ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">John Doe</div>
                <div className="text-xs text-gray-500">Patient ID: 12345</div>
              </div>
              <button onClick={() => navigate('/auth')} className="text-gray-400 hover:text-gray-600">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// Top Navigation Bar
const TopNav = ({ setIsMobileOpen }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsMobileOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-900"><Menu className="w-6 h-6" /></button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, John!</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button onClick={() => navigate('/profile')} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, change, changeType, iconBg }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 ${iconBg} rounded-lg`}><Icon className="w-6 h-6 text-white" /></div>
        {change && (
          <div className={`flex items-center space-x-1 text-sm font-semibold ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className={`w-4 h-4 ${changeType === 'down' ? 'rotate-180' : ''}`} />
            <span>{change}</span>
          </div>
        )}
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-600">{title}</div>
      </div>
    </div>
  );
};

// Risk Assessment Card
const RiskAssessmentCard = () => {
  const [timeRange, setTimeRange] = useState('6');
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Current Risk Assessment</h3>
        <div className="flex space-x-2">
          {['6', '12'].map((range) => (
            <button key={range} onClick={() => setTimeRange(range)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${timeRange === range ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {range} Months
            </button>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-sm text-gray-600">Risk Level</div>
                <div className="text-2xl font-bold text-green-600">Low Risk</div>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600">23%</div>
          </div>
          <div className="space-y-3">
            {[ { label: 'Prediction Confidence', val: '98%', bg: 'from-blue-600 to-cyan-500' }, { label: 'Model Accuracy', val: timeRange === '6' ? '98%' : '97%', bg: 'from-green-500 to-emerald-500' } ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-2"><span className="text-gray-600">{item.label}</span><span className="font-semibold text-gray-900">{item.val}</span></div>
                <div className="w-full bg-gray-200 rounded-full h-2"><div className={`bg-gradient-to-r ${item.bg} h-2 rounded-full`} style={{width: item.val}}></div></div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t">
            <div className="text-sm text-gray-600 mb-2">Last Updated</div>
            <div className="flex items-center space-x-2 text-gray-900"><Clock className="w-4 h-4" /><span className="font-medium">Today, 10:30 AM</span></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-sm font-semibold text-gray-900 mb-3">AI Model Analysis</div>
          <div className="space-y-3">
            {[ { name: 'CNN Analysis', color: 'blue', w: '95%' }, { name: 'LSTM Prediction', color: 'cyan', w: '97%' }, { name: 'BiLSTM Processing', color: 'purple', w: '96%' } ].map((m, i) => (
              <div key={i} className={`p-3 bg-${m.color}-50 rounded-lg border border-${m.color}-100`}>
                <div className="flex items-center justify-between mb-2"><span className="text-sm font-medium text-gray-900">{m.name}</span><span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Complete</span></div>
                <div className={`w-full bg-${m.color}-200 rounded-full h-2`}><div className={`bg-${m.color}-600 h-2 rounded-full`} style={{width: m.w}}></div></div>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <button onClick={() => navigate('/result')} className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center">
              <FileText className="w-5 h-5 mr-2" />View Detailed Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Recent Activity Card
const RecentActivityCard = () => {
  const navigate = useNavigate();
  const activities = [
    { icon: Brain, text: 'New prediction completed', time: '2 hours ago', color: 'bg-blue-100 text-blue-600' },
    { icon: FileText, text: 'Report generated', time: '1 day ago', color: 'bg-green-100 text-green-600' },
    { icon: AlertCircle, text: 'Health metrics updated', time: '3 days ago', color: 'bg-orange-100 text-orange-600' },
    { icon: Users, text: 'Shared report with Dr. Smith', time: '5 days ago', color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
        <button onClick={() => navigate('/history')} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
          View All <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition">
            <div className={`p-2 rounded-lg ${activity.color}`}><activity.icon className="w-5 h-5" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">{activity.text}</div>
              <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Quick Actions Card
const QuickActionsCard = () => {
  const navigate = useNavigate();
  const actions = [
    { icon: ClipboardList, label: 'New Prediction', gradient: 'from-blue-600 to-cyan-500', path: '/inputform' },
    { icon: FileText, label: 'View Reports', gradient: 'from-purple-600 to-pink-500', path: '/result' },
    { icon: Calendar, label: 'Schedule Appointment', gradient: 'from-green-600 to-emerald-500', path: '/dashboard' },
    { icon: Share2, label: 'Share Results', gradient: 'from-orange-600 to-red-500', path: '/result' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, idx) => (
          <button 
            key={idx}
            onClick={() => navigate(action.path)} // Added Navigation
            className={`p-4 bg-gradient-to-r ${action.gradient} text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition`}
          >
            <action.icon className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-medium">{action.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Health Metrics, Vital Signs, Risk Distribution (Remain largely the same visually)
const HealthMetricsChart = () => {
  const data = [ { month: 'Jan', creatinine: 1.1, gfr: 85, hemoglobin: 13.5 }, { month: 'Feb', creatinine: 1.0, gfr: 88, hemoglobin: 13.8 }, { month: 'Mar', creatinine: 1.2, gfr: 82, hemoglobin: 13.2 }, { month: 'Apr', creatinine: 1.1, gfr: 86, hemoglobin: 13.6 }, { month: 'May', creatinine: 1.0, gfr: 90, hemoglobin: 14.0 }, { month: 'Jun', creatinine: 0.9, gfr: 92, hemoglobin: 14.2 } ];
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Health Metrics Trend</h3>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition"><Download className="w-5 h-5 text-gray-600" /></button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition"><Share2 className="w-5 h-5 text-gray-600" /></button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#9ca3af" /><YAxis stroke="#9ca3af" />
          <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
          <Legend />
          <Line type="monotone" dataKey="creatinine" stroke="#3b82f6" strokeWidth={2} name="Creatinine" />
          <Line type="monotone" dataKey="gfr" stroke="#06b6d4" strokeWidth={2} name="GFR" />
          <Line type="monotone" dataKey="hemoglobin" stroke="#8b5cf6" strokeWidth={2} name="Hemoglobin" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const RiskDistributionChart = () => {
  const data = [ { name: 'Low Risk', value: 65, color: '#10b981' }, { name: 'Medium Risk', value: 25, color: '#f59e0b' }, { name: 'High Risk', value: 10, color: '#ef4444' } ];
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Risk Distribution Analysis</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart><Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">{data.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie><Tooltip /></PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {data.map((item, idx) => (
          <div key={idx} className="text-center">
            <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{backgroundColor: item.color}}></div>
            <div className="text-2xl font-bold text-gray-900">{item.value}%</div>
            <div className="text-xs text-gray-600">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VitalSignsCard = () => {
  const vitals = [ { icon: Heart, label: 'Blood Pressure', value: '120/80', unit: 'mmHg', color: 'text-green-600' }, { icon: Droplet, label: 'Blood Sugar', value: '95', unit: 'mg/dL', color: 'text-green-600' }, { icon: Wind, label: 'Oxygen Level', value: '98', unit: '%', color: 'text-green-600' }, { icon: Zap, label: 'Heart Rate', value: '72', unit: 'bpm', color: 'text-green-600' } ];
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Vital Signs</h3>
      <div className="grid grid-cols-2 gap-4">
        {vitals.map((v, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-2"><v.icon className={`w-5 h-5 ${v.color}`} /><span className="text-sm text-gray-600">{v.label}</span></div>
            <div className="text-2xl font-bold text-gray-900">{v.value}<span className="text-sm text-gray-500 ml-1">{v.unit}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function Dashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav setIsMobileOpen={setIsMobileOpen} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard icon={TrendingUp} title="Risk Score" value="23%" change="5% decrease" changeType="down" iconBg="bg-gradient-to-r from-green-500 to-emerald-500" />
              <StatsCard icon={Brain} title="Predictions" value="12" change="3 this month" changeType="up" iconBg="bg-gradient-to-r from-blue-500 to-cyan-500" />
              <StatsCard icon={BarChart3} title="Accuracy" value="98%" iconBg="bg-gradient-to-r from-purple-500 to-pink-500" />
              <StatsCard icon={Clock} title="Last Check" value="Today" iconBg="bg-gradient-to-r from-orange-500 to-red-500" />
            </div>
            <div className="grid lg:grid-cols-3 gap-6 mb-8"><div className="lg:col-span-2"><RiskAssessmentCard /></div><div className="space-y-6"><RiskDistributionChart /></div></div>
            <div className="grid lg:grid-cols-2 gap-6 mb-8"><HealthMetricsChart /><VitalSignsCard /></div>
            <div className="grid lg:grid-cols-2 gap-6"><RecentActivityCard /><QuickActionsCard /></div>
          </div>
        </main>
      </div>
    </div>
  );
}