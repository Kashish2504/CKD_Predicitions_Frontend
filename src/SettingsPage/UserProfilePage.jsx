import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Lock, Bell, Shield, Database, LogOut, Camera, Save, X } from 'lucide-react';
import Navbar from '../common/Navbar';

// Separate Components

// Profile Header Component
const ProfileHeader = ({ userData, onImageChange }) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 mb-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">
            <img 
              src={userData.profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + userData.name} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <button 
            onClick={onImageChange}
            className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            <Camera className="w-4 h-4 text-blue-600" />
          </button>
        </div>
        
        <div className="flex-1 text-white">
          <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
          <p className="text-blue-100 mb-3">{userData.email}</p>
          <div className="flex gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg">
              <span className="font-semibold">Patient ID:</span> {userData.patientId}
            </div>
            <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg">
              <span className="font-semibold">Member Since:</span> {userData.memberSince}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Lock },
  ];

  return (
    <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

// Personal Info Tab Component
const PersonalInfoTab = ({ userData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              name="dob"
              value={userData.dob}
              onChange={handleInputChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
            <textarea
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              rows="3"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={userData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blood Group
          </label>
          <select
            name="bloodGroup"
            value={userData.bloodGroup}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Security Tab Component
const SecurityTab = ({ passwordData, handlePasswordChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Security Settings</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Account Security</h3>
            <p className="text-sm text-blue-700">
              Keep your account secure by using a strong password and enabling two-factor authentication.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter current password"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter new password"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm new password"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <h3 className="font-semibold text-gray-800 mb-3">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );
};

// Notifications Tab Component
const NotificationsTab = ({ notifications, handleNotificationChange }) => {
  const notificationSettings = [
    { id: 'emailAlerts', label: 'Email Alerts', description: 'Receive risk assessment updates via email' },
    { id: 'smsAlerts', label: 'SMS Alerts', description: 'Get text messages for critical health alerts' },
    { id: 'appointmentReminders', label: 'Appointment Reminders', description: 'Reminders for upcoming medical appointments' },
    { id: 'reportReady', label: 'Report Ready', description: 'Notification when your health report is ready' },
    { id: 'weeklyDigest', label: 'Weekly Digest', description: 'Summary of your health data and trends' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Notification Preferences</h2>
      
      <div className="space-y-4">
        {notificationSettings.map(setting => (
          <div key={setting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{setting.label}</h3>
              <p className="text-sm text-gray-600">{setting.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications[setting.id]}
                onChange={(e) => handleNotificationChange(setting.id, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// Privacy Tab Component
const PrivacyTab = ({ privacy, handlePrivacyChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Privacy & Data</h2>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <Database className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-1">Your Data is Protected</h3>
            <p className="text-sm text-yellow-700">
              All your medical data is encrypted and stored securely. We comply with HIPAA regulations.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">Share Data with Doctors</h3>
            <p className="text-sm text-gray-600">Allow healthcare providers to access your health data</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.shareDoctors}
              onChange={(e) => handlePrivacyChange('shareDoctors', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">Anonymous Research Data</h3>
            <p className="text-sm text-gray-600">Help improve CKD detection by sharing anonymized data</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.shareResearch}
              onChange={(e) => handlePrivacyChange('shareResearch', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Management</h3>
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition">
            Download My Data
          </button>
          <button className="w-full text-left px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition">
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Profile Page Component
const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dob: '1985-06-15',
    address: '123 Medical Center Drive, Suite 400, Boston, MA 02115',
    gender: 'male',
    bloodGroup: 'A+',
    patientId: 'NS-2024-001234',
    memberSince: 'Jan 2024',
    profileImage: null
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    appointmentReminders: true,
    reportReady: true,
    weeklyDigest: true
  });

  const [privacy, setPrivacy] = useState({
    shareDoctors: true,
    shareResearch: false
  });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (id, value) => {
    setNotifications({ ...notifications, [id]: value });
  };

  const handlePrivacyChange = (id, value) => {
    setPrivacy({ ...privacy, [id]: value });
  };

  const handleImageChange = () => {
    alert('Image upload functionality will be implemented with file picker');
  };

  const handleSave = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logout functionality will redirect to login page');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in">
          <Save className="w-5 h-5" />
          Changes saved successfully!
        </div>
      )}

      {/* Header */}
      <Navbar/>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader userData={userData} onImageChange={handleImageChange} />

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === 'personal' && (
            <PersonalInfoTab userData={userData} handleInputChange={handleInputChange} />
          )}

          {activeTab === 'security' && (
            <SecurityTab passwordData={passwordData} handlePasswordChange={handlePasswordChange} />
          )}

          {activeTab === 'notifications' && (
            <NotificationsTab notifications={notifications} handleNotificationChange={handleNotificationChange} />
          )}

          {activeTab === 'privacy' && (
            <PrivacyTab privacy={privacy} handlePrivacyChange={handlePrivacyChange} />
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            © 2024 NephroSafe. All rights reserved. | HIPAA Compliant | Secure Medical Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UserProfilePage;