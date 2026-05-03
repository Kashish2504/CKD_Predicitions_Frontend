import React, { useState, useEffect } from 'react';
import {
  Calendar, TrendingUp, TrendingDown, FileText, Download, Filter, Search,
  ChevronDown, ChevronUp, Clock, AlertCircle, CheckCircle, AlertTriangle,
  BarChart3, Eye, Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import { getHistory, deleteAssessment } from '../utils/historyStorage';

const StatsCard = ({ icon: Icon, title, value, trend, trendValue, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600', green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600', red: 'bg-red-50 text-red-600'
  };
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}><Icon className="w-6 h-6" /></div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}{trendValue}
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

const RiskBadge = ({ risk }) => {
  const cfg = {
    low: { color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
    medium: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: AlertTriangle },
    high: { color: 'bg-red-100 text-red-700 border-red-200', icon: AlertCircle }
  };
  const c = cfg[risk.toLowerCase()];
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${c.color}`}>
      <Icon className="w-3 h-3" />{risk}
    </span>
  );
};

const HistoryRecordCard = ({ record, onViewDetails, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-gray-800">Assessment {record.id}</h3>
              <RiskBadge risk={record.riskLevel} />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1"><Calendar className="w-4 h-4" />{record.date}</div>
              <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{record.time}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onViewDetails(record)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View Details">
              <Eye className="w-5 h-5" />
            </button>
            <button onClick={() => onDelete(record.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Delete">
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
            <p className="text-xs text-gray-600 mb-1">Prediction</p>
            <p className="text-xl font-bold text-gray-800 uppercase">{record.prediction}</p>
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

        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
          {expanded ? (<><ChevronUp className="w-4 h-4" />Hide Details</>) : (<><ChevronDown className="w-4 h-4" />Show More Details</>)}
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">Key Health Indicators</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {record.healthIndicators.map((ind, i) => (
                <div key={i} className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">{ind.name}</p>
                  <p className="text-sm font-bold text-gray-800">{ind.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">Patient</h4>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                {record.patient?.name || 'N/A'} · Age {record.patient?.age || '-'} · {record.patient?.gender || '-'}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
        <span className="text-xs text-gray-500">Last updated: {record.lastUpdated}</span>
        <button onClick={() => window.print()} className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium">
          <Download className="w-4 h-4" />Download Report
        </button>
      </div>
    </div>
  );
};

const FilterPanel = ({ filters, onFilterChange, onApply, onReset }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-800 flex items-center gap-2"><Filter className="w-5 h-5" />Filters</h3>
      <button onClick={onReset} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Reset</button>
    </div>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
        <select value={filters.riskLevel} onChange={(e) => onFilterChange('riskLevel', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">All Levels</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
        <select value={filters.dateRange} onChange={(e) => onFilterChange('dateRange', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="1year">Last Year</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Prediction</label>
        <select value={filters.modelType} onChange={(e) => onFilterChange('modelType', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">All</option>
          <option value="ckd">CKD</option>
          <option value="notckd">Healthy</option>
        </select>
      </div>
      <button onClick={onApply} className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
        Apply Filters
      </button>
    </div>
  </div>
);

const SearchBar = ({ value, onChange }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input type="text" placeholder="Search by ID, prediction, or patient name..."
      value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
  </div>
);

// Convert localStorage record into the shape the cards expect
const transformRecord = (h) => {
  const risk = h.result?.probabilities?.ckd ?? (h.result?.is_ckd ? 1 : 0);
  const riskScore = Math.round(risk * 100);
  const riskLevel = riskScore < 30 ? 'Low' : riskScore < 70 ? 'Medium' : 'High';
  const dt = new Date(h.createdAt);
  return {
    id: h.id,
    rawId: h.id,
    date: dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    riskLevel,
    riskScore,
    prediction: h.result?.prediction || 'N/A',
    modelUsed: 'Random Forest',
    confidence: h.result?.confidence || 0,
    lastUpdated: dt.toLocaleString(),
    patient: h.patient || {},
    rawCreatedAt: h.createdAt,
    healthIndicators: [
      { name: 'Blood Pressure', value: `${h.payload?.bp || '-'} mmHg` },
      { name: 'Creatinine', value: `${h.payload?.sc || '-'} mg/dL` },
      { name: 'Hemoglobin', value: `${h.payload?.hemo || '-'} g/dL` },
      { name: 'Blood Glucose', value: `${h.payload?.bgr || '-'} mg/dL` },
      { name: 'Sodium', value: `${h.payload?.sod || '-'} mEq/L` },
      { name: 'Potassium', value: `${h.payload?.pot || '-'} mEq/L` }
    ]
  };
};

const HistoryPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ riskLevel: '', dateRange: '', modelType: '' });
  const [appliedFilters, setAppliedFilters] = useState({ riskLevel: '', dateRange: '', modelType: '' });
  const [allRecords, setAllRecords] = useState([]);

  useEffect(() => {
    setAllRecords(getHistory().map(transformRecord));
  }, []);

  const handleFilterChange = (key, value) => setFilters({ ...filters, [key]: value });
  const handleApplyFilters = () => setAppliedFilters({ ...filters });
  const handleResetFilters = () => {
    const empty = { riskLevel: '', dateRange: '', modelType: '' };
    setFilters(empty);
    setAppliedFilters(empty);
  };

  const handleViewDetails = (record) => {
    // Navigate to result page with this record
    const raw = getHistory().find(h => h.id === record.rawId);
    if (raw) {
      navigate('/result', { state: { result: raw.result, payload: raw.payload, patient: raw.patient, recordId: raw.id } });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      deleteAssessment(id);
      setAllRecords(getHistory().map(transformRecord));
    }
  };

  // Apply search + filters
  const filtered = allRecords.filter(r => {
    if (appliedFilters.riskLevel && r.riskLevel.toLowerCase() !== appliedFilters.riskLevel) return false;
    if (appliedFilters.modelType && r.prediction.toLowerCase() !== appliedFilters.modelType) return false;
    if (appliedFilters.dateRange) {
      const days = { '7days': 7, '30days': 30, '90days': 90, '1year': 365 }[appliedFilters.dateRange];
      const cutoff = Date.now() - days * 24 * 3600 * 1000;
      if (new Date(r.rawCreatedAt).getTime() < cutoff) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const haystack = `${r.id} ${r.prediction} ${r.patient?.name || ''} ${r.date}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const totalAssessments = filtered.length;
  const avgRiskScore = totalAssessments > 0 ? Math.round(filtered.reduce((sum, r) => sum + r.riskScore, 0) / totalAssessments) : 0;
  const highRiskCount = filtered.filter(r => r.riskLevel === 'High').length;
  const lastAssessment = filtered[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Assessment History</h1>
          <p className="text-gray-600">View and manage your CKD risk assessment records</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard icon={FileText} title="Total Assessments" value={totalAssessments} color="blue" />
          <StatsCard icon={BarChart3} title="Average Risk Score" value={`${avgRiskScore}%`} color="green" />
          <StatsCard icon={AlertCircle} title="High Risk Alerts" value={highRiskCount} color="red" />
          <StatsCard icon={Calendar} title="Last Assessment" value={lastAssessment?.date || 'None'} color="yellow" />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} onApply={handleApplyFilters} onReset={handleResetFilters} />
          </div>
          <div className="lg:col-span-3 space-y-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {filtered.length} assessment{filtered.length !== 1 ? 's' : ''}
              </p>
              <button onClick={() => navigate('/inputform')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                + New Assessment
              </button>
            </div>

            <div className="space-y-4">
              {filtered.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No assessments found</h3>
                  <p className="text-gray-600 mb-6">Start your first CKD risk assessment to see records here.</p>
                  <button onClick={() => navigate('/inputform')} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition">
                    Start New Assessment
                  </button>
                </div>
              ) : (
                filtered.map(r => (
                  <HistoryRecordCard key={r.id} record={r} onViewDetails={handleViewDetails} onDelete={handleDelete} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            © 2026 NephroSafe. All rights reserved. | HIPAA Compliant | Secure Medical Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HistoryPage;