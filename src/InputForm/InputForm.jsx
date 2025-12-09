import React, { useState } from 'react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  User,
  Heart,
  Droplet,
  Wind,
  TestTube,
  Scale,
  Ruler,
  Calendar,
  FileText,
  Info,
  Upload,
  X,
  Save,
  Send,
  Loader,
  Menu
} from 'lucide-react';

// --- UI Components ---

// Progress Bar Component
const ProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {[...Array(totalSteps)].map((_, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center z-10 relative">
              <div
                className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold
                transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white ring-4 ring-blue-200'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentStep ? <CheckCircle className="w-6 h-6" /> : index + 1}
              </div>
              <div
                className={`text-xs mt-2 font-medium absolute top-12 w-24 text-center ${
                  index === currentStep ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {index === 0
                  ? 'Personal'
                  : index === 1
                  ? 'Medical'
                  : index === 2
                  ? 'Lab Tests'
                  : 'Review'}
              </div>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  unit,
  required,
  icon: Icon,
  helpText,
  error,
  step
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          step={step}
          className={`
            w-full px-4 ${Icon ? 'pl-11' : ''} ${unit ? 'pr-16' : ''} py-3
            border-2 rounded-lg transition-all duration-200
            focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none
            ${error ? 'border-red-500' : 'border-gray-200'}
          `}
        />
        {unit && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
            {unit}
          </div>
        )}
      </div>
      {helpText && !error && (
        <div className="flex items-start space-x-2 text-xs text-gray-500">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{helpText}</span>
        </div>
      )}
      {error && (
        <div className="flex items-start space-x-2 text-xs text-red-500">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// Select Field Component
const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
  icon: Icon,
  error
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`
            w-full px-4 ${Icon ? 'pl-11' : ''} py-3
            border-2 rounded-lg transition-all duration-200
            focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none
            appearance-none cursor-pointer
            ${error ? 'border-red-500' : 'border-gray-200'}
          `}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {error && (
        <div className="flex items-start space-x-2 text-xs text-red-500">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

// Radio Group Component
const RadioGroup = ({ label, name, value, onChange, options, required }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              flex-1 min-w-[100px] px-4 py-3 border-2 rounded-lg cursor-pointer
              transition-all duration-200 flex items-center justify-center
              ${
                value === option.value
                  ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-100'
                  : 'border-gray-200 hover:border-blue-300'
              }
            `}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="sr-only"
            />
            <div className="text-center">
              <div className="font-semibold text-gray-900">{option.label}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

// File Upload Component
const FileUpload = ({ label, onFileChange, fileName, required }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition group bg-gray-50 hover:bg-blue-50">
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3 group-hover:text-blue-500 transition" />
        <div className="space-y-2">
          <label className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition shadow-md hover:shadow-lg">
            Choose File
            <input
              type="file"
              onChange={onFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
            />
          </label>
          {fileName ? (
            <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 font-medium bg-blue-100 py-1 px-3 rounded-full mx-auto w-fit mt-2">
              <FileText className="w-4 h-4" />
              <span>{fileName}</span>
            </div>
          ) : (
            <p className="text-xs text-gray-500 mt-2">
              PDF, JPG, PNG up to 10MB
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Form Step Components ---

// Step 1: Personal Information
const PersonalInfoStep = ({ formData, handleInputChange, errors }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-800">
          Please provide accurate personal information for better prediction
          accuracy.
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="John Doe"
          icon={User}
          required
          error={errors.fullName}
        />
        <InputField
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleInputChange}
          placeholder="35"
          unit="years"
          icon={Calendar}
          required
          error={errors.age}
          helpText="Age between 18-100 years"
        />
        <RadioGroup
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ]}
          required
        />
        <SelectField
          label="Blood Type"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleInputChange}
          options={[
            { value: 'A+', label: 'A+' },
            { value: 'A-', label: 'A-' },
            { value: 'B+', label: 'B+' },
            { value: 'B-', label: 'B-' },
            { value: 'AB+', label: 'AB+' },
            { value: 'AB-', label: 'AB-' },
            { value: 'O+', label: 'O+' },
            { value: 'O-', label: 'O-' }
          ]}
          icon={Droplet}
          error={errors.bloodType}
        />
        <InputField
          label="Weight"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleInputChange}
          placeholder="70"
          unit="kg"
          icon={Scale}
          required
          error={errors.weight}
        />
        <InputField
          label="Height"
          name="height"
          type="number"
          value={formData.height}
          onChange={handleInputChange}
          placeholder="175"
          unit="cm"
          icon={Ruler}
          required
          error={errors.height}
        />
      </div>
    </div>
  );
};

// Step 2: Medical History
const MedicalHistoryStep = ({ formData, handleInputChange, errors }) => {
  const conditions = [
    'Diabetes',
    'Hypertension',
    'Heart Disease',
    'Anemia',
    'None'
  ];
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-800">
          Your medical history helps our AI model provide more accurate
          predictions.
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="Blood Pressure (Systolic)"
          name="bloodPressureSystolic"
          type="number"
          value={formData.bloodPressureSystolic}
          onChange={handleInputChange}
          placeholder="120"
          unit="mmHg"
          icon={Heart}
          required
          error={errors.bloodPressureSystolic}
          helpText="Normal range: 90-120 mmHg"
        />
        <InputField
          label="Blood Pressure (Diastolic)"
          name="bloodPressureDiastolic"
          type="number"
          value={formData.bloodPressureDiastolic}
          onChange={handleInputChange}
          placeholder="80"
          unit="mmHg"
          icon={Heart}
          required
          error={errors.bloodPressureDiastolic}
          helpText="Normal range: 60-80 mmHg"
        />
        <InputField
          label="Blood Sugar Level"
          name="bloodSugar"
          type="number"
          value={formData.bloodSugar}
          onChange={handleInputChange}
          placeholder="95"
          unit="mg/dL"
          icon={Droplet}
          required
          error={errors.bloodSugar}
          helpText="Fasting: 70-100 mg/dL"
        />
        <InputField
          label="Heart Rate"
          name="heartRate"
          type="number"
          value={formData.heartRate}
          onChange={handleInputChange}
          placeholder="72"
          unit="bpm"
          icon={Activity}
          required
          error={errors.heartRate}
          helpText="Normal range: 60-100 bpm"
        />
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Pre-existing Conditions
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {conditions.map((condition) => (
            <label
              key={condition}
              className={`
                px-4 py-3 border-2 rounded-lg cursor-pointer text-center
                transition-all duration-200 flex items-center justify-center
                ${
                  formData.conditions?.includes(condition)
                    ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-100'
                    : 'border-gray-200 hover:border-blue-300'
                }
              `}
            >
              <input
                type="checkbox"
                name="conditions"
                value={condition}
                checked={formData.conditions?.includes(condition)}
                onChange={(e) => {
                  const value = e.target.value;
                  const currentConditions = formData.conditions || [];
                  const newConditions = e.target.checked
                    ? [...currentConditions, value]
                    : currentConditions.filter((c) => c !== value);
                  handleInputChange({
                    target: { name: 'conditions', value: newConditions }
                  });
                }}
                className="sr-only"
              />
              <span className="font-medium text-gray-900">{condition}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Current Medications
        </label>
        <textarea
          name="medications"
          value={formData.medications}
          onChange={handleInputChange}
          placeholder="List any current medications or supplements..."
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 resize-none"
        />
      </div>
    </div>
  );
};

// Step 3: Lab Test Results
const LabTestsStep = ({
  formData,
  handleInputChange,
  handleFileChange,
  fileName,
  errors
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-800">
          Lab test results are crucial for accurate CKD risk prediction. Please
          enter the most recent values.
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          label="Serum Creatinine"
          name="creatinine"
          type="number"
          step="0.01"
          value={formData.creatinine}
          onChange={handleInputChange}
          placeholder="1.2"
          unit="mg/dL"
          icon={TestTube}
          required
          error={errors.creatinine}
          helpText="Normal: 0.7-1.3 mg/dL (male), 0.6-1.1 mg/dL (female)"
        />
        <InputField
          label="Blood Urea Nitrogen (BUN)"
          name="bun"
          type="number"
          value={formData.bun}
          onChange={handleInputChange}
          placeholder="15"
          unit="mg/dL"
          icon={TestTube}
          required
          error={errors.bun}
          helpText="Normal range: 7-20 mg/dL"
        />
        <InputField
          label="Glomerular Filtration Rate (GFR)"
          name="gfr"
          type="number"
          value={formData.gfr}
          onChange={handleInputChange}
          placeholder="90"
          unit="mL/min"
          icon={TestTube}
          required
          error={errors.gfr}
          helpText="Normal: >90 mL/min"
        />
        <InputField
          label="Hemoglobin"
          name="hemoglobin"
          type="number"
          step="0.1"
          value={formData.hemoglobin}
          onChange={handleInputChange}
          placeholder="14.0"
          unit="g/dL"
          icon={Droplet}
          required
          error={errors.hemoglobin}
          helpText="Normal: 13.5-17.5 (male), 12.0-15.5 (female)"
        />
        <InputField
          label="Albumin in Urine"
          name="albumin"
          type="number"
          value={formData.albumin}
          onChange={handleInputChange}
          placeholder="20"
          unit="mg/g"
          icon={TestTube}
          required
          error={errors.albumin}
          helpText="Normal: <30 mg/g"
        />
        <InputField
          label="Potassium"
          name="potassium"
          type="number"
          step="0.1"
          value={formData.potassium}
          onChange={handleInputChange}
          placeholder="4.5"
          unit="mEq/L"
          icon={TestTube}
          required
          error={errors.potassium}
          helpText="Normal range: 3.5-5.0 mEq/L"
        />
        <InputField
          label="Sodium"
          name="sodium"
          type="number"
          value={formData.sodium}
          onChange={handleInputChange}
          placeholder="140"
          unit="mEq/L"
          icon={TestTube}
          required
          error={errors.sodium}
          helpText="Normal range: 135-145 mEq/L"
        />
        <InputField
          label="Calcium"
          name="calcium"
          type="number"
          step="0.1"
          value={formData.calcium}
          onChange={handleInputChange}
          placeholder="9.5"
          unit="mg/dL"
          icon={TestTube}
          required
          error={errors.calcium}
          helpText="Normal range: 8.5-10.5 mg/dL"
        />
      </div>
      <FileUpload
        label="Upload Lab Report (Optional)"
        onFileChange={handleFileChange}
        fileName={fileName}
      />
    </div>
  );
};

// Step 4: Review and Submit
const ReviewStep = ({ formData }) => {
  const sections = [
    {
      title: 'Personal Information',
      icon: User,
      data: [
        { label: 'Full Name', value: formData.fullName },
        { label: 'Age', value: `${formData.age} years` },
        { label: 'Gender', value: formData.gender },
        { label: 'Blood Type', value: formData.bloodType },
        { label: 'Weight', value: `${formData.weight} kg` },
        { label: 'Height', value: `${formData.height} cm` }
      ]
    },
    {
      title: 'Medical History',
      icon: Heart,
      data: [
        {
          label: 'Blood Pressure',
          value: `${formData.bloodPressureSystolic}/${formData.bloodPressureDiastolic} mmHg`
        },
        { label: 'Blood Sugar', value: `${formData.bloodSugar} mg/dL` },
        { label: 'Heart Rate', value: `${formData.heartRate} bpm` },
        {
          label: 'Conditions',
          value: formData.conditions?.join(', ') || 'None'
        }
      ]
    },
    {
      title: 'Lab Test Results',
      icon: TestTube,
      data: [
        { label: 'Serum Creatinine', value: `${formData.creatinine} mg/dL` },
        { label: 'BUN', value: `${formData.bun} mg/dL` },
        { label: 'GFR', value: `${formData.gfr} mL/min` },
        { label: 'Hemoglobin', value: `${formData.hemoglobin} g/dL` },
        { label: 'Albumin', value: `${formData.albumin} mg/g` },
        { label: 'Potassium', value: `${formData.potassium} mEq/L` },
        { label: 'Sodium', value: `${formData.sodium} mEq/L` },
        { label: 'Calcium', value: `${formData.calcium} mg/dL` }
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-green-800">
          Please review all information carefully before submitting for AI
          analysis.
        </div>
      </div>
      {sections.map((section, idx) => (
        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <section.icon className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {section.data.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
              >
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {item.value || '-'}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Main App Component ---

export default function InputForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    bloodType: '',
    weight: '',
    height: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    bloodSugar: '',
    heartRate: '',
    conditions: [],
    medications: '',
    creatinine: '',
    bun: '',
    gfr: '',
    hemoglobin: '',
    albumin: '',
    potassium: '',
    sodium: '',
    calcium: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 0) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.age || formData.age < 18 || formData.age > 100)
        newErrors.age = 'Valid age (18-100) is required';
      if (!formData.weight || formData.weight < 20 || formData.weight > 300)
        newErrors.weight = 'Valid weight is required';
      if (!formData.height || formData.height < 100 || formData.height > 250)
        newErrors.height = 'Valid height is required';
      if (!formData.bloodType) newErrors.bloodType = 'Blood type is required';
    } else if (currentStep === 1) {
      if (!formData.bloodPressureSystolic)
        newErrors.bloodPressureSystolic = 'Systolic BP is required';
      if (!formData.bloodPressureDiastolic)
        newErrors.bloodPressureDiastolic = 'Diastolic BP is required';
      if (!formData.bloodSugar) newErrors.bloodSugar = 'Blood sugar is required';
      if (!formData.heartRate) newErrors.heartRate = 'Heart rate is required';
    } else if (currentStep === 2) {
      if (!formData.creatinine) newErrors.creatinine = 'Creatinine is required';
      if (!formData.bun) newErrors.bun = 'BUN is required';
      if (!formData.gfr) newErrors.gfr = 'GFR is required';
      if (!formData.hemoglobin) newErrors.hemoglobin = 'Hemoglobin is required';
      if (!formData.albumin) newErrors.albumin = 'Albumin is required';
      if (!formData.potassium) newErrors.potassium = 'Potassium is required';
      if (!formData.sodium) newErrors.sodium = 'Sodium is required';
      if (!formData.calcium) newErrors.calcium = 'Calcium is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 1:
        return (
          <MedicalHistoryStep
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <LabTestsStep
            formData={formData}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
            fileName={fileName}
            errors={errors}
          />
        );
      case 3:
        return <ReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Assessment Submitted
          </h2>
          <p className="text-gray-600 mb-8">
            Your data has been successfully analyzed. Your personalized risk
            report has been generated and sent to your dashboard.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pb-12">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-lg shadow-md">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                NephroSafe
              </span>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition rounded-lg hover:bg-gray-50">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-10 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            CKD Risk Assessment Form
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete the form to get your personalized CKD risk prediction. All
            medical data is processed securely.
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 mb-8 min-h-[400px]">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold
              transition-all duration-200
              ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:shadow-md'
              }
            `}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {currentStep < totalSteps - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Next Step</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`
                flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold
                transition-all duration-200
                ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-emerald-500 hover:shadow-xl transform hover:-translate-y-0.5'
                }
                text-white
              `}
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit for Analysis</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Save Draft Button */}
        <div className="mt-6 text-center">
          <button className="inline-flex items-center space-x-2 px-6 py-2 text-gray-500 hover:text-blue-600 transition">
            <Save className="w-4 h-4" />
            <span className="text-sm font-medium">Save as Draft</span>
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Need Help?</h3>
              <p className="text-blue-50 mb-4 max-w-3xl">
                Our AI models require accurate information to provide the best
                predictions. If you're unsure about any values, consult your
                recent lab reports or contact your healthcare provider.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition text-sm">
                  Contact Support
                </button>
                <button className="px-4 py-2 bg-white/20 text-white border border-white/40 rounded-lg font-semibold hover:bg-white/30 transition text-sm">
                  View Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500 text-xs sm:text-sm border-t border-gray-200 mt-8">
        <p>
          🔒 Your data is encrypted and secure. We comply with HIPAA
          regulations.
        </p>
        <p className="mt-2 text-blue-600 font-medium">
          Prediction accuracy: 98% (6-month) | 97% (12-month)
        </p>
      </div>
    </div>
  );
}