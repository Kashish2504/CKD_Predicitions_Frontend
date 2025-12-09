import React, { useState } from 'react';
import { Activity, Calendar, TrendingUp, TrendingDown, FileText, Download, Filter, Search, ChevronDown, ChevronUp, Clock, AlertCircle, CheckCircle, AlertTriangle, BarChart3, Eye, Trash2, Menu, X } from 'lucide-react';

// Header Component
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">NephroSafe</h1>
              <p className="text-xs text-gray-500">Prediction History</p>
            </div>
          </div>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <nav className="hidden lg:flex items-center gap-4">
            <button className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition">
              Dashboard
            </button>
            <button className="px-4 py-2 text-blue-600 font-medium border-b-2 border-blue-600">
              History
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition">
              New Assessment
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition">
              Profile
            </button>
          </nav>
        </div>
        
        {menuOpen && (
          <nav className="lg:hidden mt-4 pb-4 space-y-2">
            <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              Dashboard
            </button>
            <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">
              History
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              New Assessment
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              Profile
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};
export default Navbar;