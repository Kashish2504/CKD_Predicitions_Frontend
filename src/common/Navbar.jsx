import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Added Navigation Hook
import { Activity, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // 2. Initialized Navigate

  // Helper function to navigate and close mobile menu simultaneously
  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  // Helper to highlight the active tab based on current URL
  const isActive = (path) => window.location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo - Now clickable to return home/dashboard */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => handleNavigation('/dashboard')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">NephroSafe</h1>
              <p className="text-xs text-gray-500">CKD Prediction</p>
            </div>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => handleNavigation('/dashboard')}
              className={`px-4 py-2 font-medium transition ${isActive('/dashboard') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => handleNavigation('/history')}
              className={`px-4 py-2 font-medium transition ${isActive('/history') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              History
            </button>
            <button 
              onClick={() => handleNavigation('/inputform')}
              className={`px-4 py-2 font-medium transition ${isActive('/inputform') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              New Assessment
            </button>
            <button 
              onClick={() => handleNavigation('/profile')}
              className={`px-4 py-2 font-medium transition ${isActive('/profile') ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Profile
            </button>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="lg:hidden mt-4 pb-4 space-y-2">
            <button 
              onClick={() => handleNavigation('/dashboard')}
              className={`w-full text-left px-4 py-2 rounded-lg ${isActive('/dashboard') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => handleNavigation('/history')}
              className={`w-full text-left px-4 py-2 rounded-lg ${isActive('/history') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              History
            </button>
            <button 
              onClick={() => handleNavigation('/inputform')}
              className={`w-full text-left px-4 py-2 rounded-lg ${isActive('/inputform') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              New Assessment
            </button>
            <button 
              onClick={() => handleNavigation('/profile')}
              className={`w-full text-left px-4 py-2 rounded-lg ${isActive('/profile') ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Profile
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;