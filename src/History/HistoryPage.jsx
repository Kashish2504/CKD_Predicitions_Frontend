import React, { useState } from 'react';
import { Activity, Calendar, TrendingUp, TrendingDown, FileText, Download, Filter, Search, ChevronDown, ChevronUp, Clock, AlertCircle, CheckCircle, AlertTriangle, BarChart3, Eye, Trash2, Menu, X } from 'lucide-react';
import Navbar from '../common/Navbar';
// Header Component


// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, trend, trendValue, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {trendValue}
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-600 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

// Risk Badge Component
const RiskBadge = ({ risk }) => {
  const riskConfig = {
    low: { color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
    medium: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: AlertTriangle },
    high: { color: 'bg-red-100 text-red-700 border-red-200', icon: AlertCircle }
  };

  const config = riskConfig[risk.toLowerCase()];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${config.color}`}>
      <Icon className="w-3 h-3" />
      {risk}
    </span>
  );
};

// History Record Card Component
const HistoryRecordCard = ({ record, onViewDetails, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-gray-800">Assessment #{record.id}</h3>
              <RiskBadge risk={record.riskLevel} />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {record.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {record.time}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(record)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
              title="View Details"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(record.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Risk Score</p>
            <p className="text-xl font-bold text-gray-800">{record.riskScore}%</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Prediction Period</p>
            <p className="text-xl font-bold text-gray-800">{record.predictionPeriod}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Model Used</p>
            <p className="text-sm font-semibold text-gray-800">{record.modelUsed}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Confidence</p>
            <p className="text-xl font-bold text-gray-800">{record.confidence}%</p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Details
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show More Details
            </>
          )}
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">Key Health Indicators</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {record.healthIndicators.map((indicator, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">{indicator.name}</p>
                  <p className="text-sm font-bold text-gray-800">{indicator.value}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">Doctor's Notes</h4>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                {record.notes || 'No notes available'}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
        <span className="text-xs text-gray-500">
          Last updated: {record.lastUpdated}
        </span>
        <button
          onClick={() => alert('Download report functionality')}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium"
        >
          <Download className="w-4 h-4" />
          Download Report
        </button>
      </div>
    </div>
  );
};

// Filter Panel Component
const FilterPanel = ({ filters, onFilterChange, onApply, onReset }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h3>
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Risk Level
          </label>
          <select
            value={filters.riskLevel}
            onChange={(e) => onFilterChange('riskLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => onFilterChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Time</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model Type
          </label>
          <select
            value={filters.modelType}
            onChange={(e) => onFilterChange('modelType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Models</option>
            <option value="CNN">CNN</option>
            <option value="LSTM">LSTM</option>
            <option value="BiLSTM">BiLSTM</option>
            <option value="Ensemble">Ensemble</option>
          </select>
        </div>

        <button
          onClick={onApply}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

// Search Bar Component
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search by assessment ID, date, or notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

// Main History Page Component
const HistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    riskLevel: '',
    dateRange: '',
    modelType: ''
  });

  // Sample history data
  const [historyRecords] = useState([
    {
      id: 'NS-2024-001',
      date: 'Nov 15, 2024',
      time: '10:30 AM',
      riskLevel: 'Low',
      riskScore: 23,
      predictionPeriod: '6 months',
      modelUsed: 'Ensemble',
      confidence: 96,
      lastUpdated: 'Nov 15, 2024 10:45 AM',
      healthIndicators: [
        { name: 'Blood Pressure', value: '120/80 mmHg' },
        { name: 'Creatinine', value: '1.0 mg/dL' },
        { name: 'GFR', value: '95 mL/min' },
        { name: 'Blood Sugar', value: '95 mg/dL' },
        { name: 'Hemoglobin', value: '14.5 g/dL' },
        { name: 'Albumin', value: '4.2 g/dL' }
      ],
      notes: 'Patient shows healthy kidney function. Continue regular monitoring and maintain current lifestyle.'
    },
    {
      id: 'NS-2024-002',
      date: 'Oct 28, 2024',
      time: '02:15 PM',
      riskLevel: 'Medium',
      riskScore: 58,
      predictionPeriod: '12 months',
      modelUsed: 'LSTM',
      confidence: 92,
      lastUpdated: 'Oct 28, 2024 02:30 PM',
      healthIndicators: [
        { name: 'Blood Pressure', value: '138/88 mmHg' },
        { name: 'Creatinine', value: '1.4 mg/dL' },
        { name: 'GFR', value: '72 mL/min' },
        { name: 'Blood Sugar', value: '118 mg/dL' },
        { name: 'Hemoglobin', value: '13.2 g/dL' },
        { name: 'Albumin', value: '3.8 g/dL' }
      ],
      notes: 'Moderate risk detected. Recommend lifestyle modifications and follow-up in 3 months.'
    },
    {
      id: 'NS-2024-003',
      date: 'Oct 10, 2024',
      time: '09:00 AM',
      riskLevel: 'High',
      riskScore: 78,
      predictionPeriod: '6 months',
      modelUsed: 'BiLSTM',
      confidence: 94,
      lastUpdated: 'Oct 10, 2024 09:20 AM',
      healthIndicators: [
        { name: 'Blood Pressure', value: '152/95 mmHg' },
        { name: 'Creatinine', value: '2.1 mg/dL' },
        { name: 'GFR', value: '48 mL/min' },
        { name: 'Blood Sugar', value: '145 mg/dL' },
        { name: 'Hemoglobin', value: '11.8 g/dL' },
        { name: 'Albumin', value: '3.2 g/dL' }
      ],
      notes: 'High risk identified. Immediate consultation with nephrologist recommended. Start treatment plan.'
    },
    {
      id: 'NS-2024-004',
      date: 'Sep 22, 2024',
      time: '11:45 AM',
      riskLevel: 'Low',
      riskScore: 19,
      predictionPeriod: '12 months',
      modelUsed: 'CNN',
      confidence: 97,
      lastUpdated: 'Sep 22, 2024 12:00 PM',
      healthIndicators: [
        { name: 'Blood Pressure', value: '118/75 mmHg' },
        { name: 'Creatinine', value: '0.9 mg/dL' },
        { name: 'GFR', value: '98 mL/min' },
        { name: 'Blood Sugar', value: '88 mg/dL' },
        { name: 'Hemoglobin', value: '15.0 g/dL' },
        { name: 'Albumin', value: '4.5 g/dL' }
      ],
      notes: 'Excellent kidney health markers. Continue preventive care and annual screenings.'
    }
  ]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleApplyFilters = () => {
    alert('Filters applied! In production, this would filter the records.');
  };

  const handleResetFilters = () => {
    setFilters({
      riskLevel: '',
      dateRange: '',
      modelType: ''
    });
  };

  const handleViewDetails = (record) => {
    alert(`Viewing details for Assessment ${record.id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      alert(`Deleted assessment ${id}`);
    }
  };

  // Calculate stats
  const totalAssessments = historyRecords.length;
  const avgRiskScore = Math.round(
    historyRecords.reduce((sum, record) => sum + record.riskScore, 0) / totalAssessments
  );
  const highRiskCount = historyRecords.filter(r => r.riskLevel === 'High').length;
  const lastAssessment = historyRecords[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Assessment History</h1>
          <p className="text-gray-600">View and manage your CKD risk assessment records</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={FileText}
            title="Total Assessments"
            value={totalAssessments}
            trend="up"
            trendValue="+2"
            color="blue"
          />
          <StatsCard
            icon={BarChart3}
            title="Average Risk Score"
            value={`${avgRiskScore}%`}
            trend="down"
            trendValue="-5%"
            color="green"
          />
          <StatsCard
            icon={AlertCircle}
            title="High Risk Alerts"
            value={highRiskCount}
            color="red"
          />
          <StatsCard
            icon={Calendar}
            title="Last Assessment"
            value={lastAssessment.date}
            color="yellow"
          />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
            />
          </div>

          {/* History Records */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            {/* Export Button */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {historyRecords.length} assessment{historyRecords.length !== 1 ? 's' : ''}
              </p>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                <Download className="w-4 h-4" />
                Export All
              </button>
            </div>

            {/* Records List */}
            <div className="space-y-4">
              {historyRecords.map((record) => (
                <HistoryRecordCard
                  key={record.id}
                  record={record}
                  onViewDetails={handleViewDetails}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50" disabled>
                Previous
              </button>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 bg-blue-600 text-white rounded-lg">1</button>
                <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-lg">2</button>
                <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded-lg">3</button>
              </div>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">
                Next
              </button>
            </div>
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

export default HistoryPage;