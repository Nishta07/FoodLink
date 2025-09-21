import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
    
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone, 
  Building2,
  Globe,
  MapPin,
  FileText,
  Upload,
  DollarSign,
  Calendar,
  Briefcase,
  Check,
  X,
  Loader
} from 'lucide-react';
import './VendorSignup.css';

const VendorSignup = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    
    // Business Information
    businessName: '',
    businessType: '',
    businessDescription: '',
    website: '',
    establishedYear: '',
    
    // Address Information
    businessAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    
    // Financial Information
    taxId: '',
    bankAccount: '',
    
    // Documents
    businessLicense: null,
    taxDocument: null,
    
    // Legal
    agreeToTerms: false,
    agreeToVendorTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  // Password strength calculation
  useEffect(() => {
    const calculateStrength = () => {
      const password = formData.password;
      let strength = 0;
      
      if (password.length >= 8) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[a-z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;
      
      setPasswordStrength(strength);
    };

    calculateStrength();
  }, [formData.password]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal Information Validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    // Business Information Validation
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.businessDescription.trim()) newErrors.businessDescription = 'Business description is required';

    // Address Validation
    if (!formData.businessAddress.trim()) newErrors.businessAddress = 'Business address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

    // Financial Validation
    if (!formData.taxId.trim()) newErrors.taxId = 'Tax ID is required';

    // Legal Validation
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    if (!formData.agreeToVendorTerms) newErrors.agreeToVendorTerms = 'You must agree to the vendor terms';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('Vendor signup data:', formData);
      alert('Vendor account created successfully! Please wait for approval.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        businessName: '',
        businessType: '',
        businessDescription: '',
        website: '',
        establishedYear: '',
        businessAddress: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        taxId: '',
        bankAccount: '',
        businessLicense: null,
        taxDocument: null,
        agreeToTerms: false,
        agreeToVendorTerms: false
      });
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthClass = () => {
    if (passwordStrength <= 2) return 'vendor-strength-weak';
    if (passwordStrength <= 3) return 'vendor-strength-medium';
    return 'vendor-strength-strong';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="vendor-signup-container">
      {/* Background Animation */}
      <div className="vendor-bg-animation">
        <div className="vendor-bg-circle-1"></div>
        <div className="vendor-bg-circle-2"></div>
        <div className="vendor-bg-circle-3"></div>
        <div className="vendor-bg-circle-4"></div>
      </div>

      {/* Main Content */}
      <div className="vendor-signup-content">
        {/* Back Button */}
        <Link to="/login" className="vendor-back-button">
             ← Back to Login
        </Link>

        {/* Signup Form Container */}
        <div className="vendor-signup-form-container">
          {/* Header */}
          <div className="vendor-signup-header">
            <div className="vendor-signup-icon">
              <Briefcase size={32} />
            </div>
            <h1 className="vendor-signup-title">Become a Vendor</h1>
            <p className="vendor-signup-subtitle">
              Join our marketplace and reach thousands of customers
            </p>
          </div>

          {/* Form */}
          <div className="vendor-signup-form">
            {/* Personal Information Section */}
            <div className="vendor-form-row">
              <div className="vendor-input-group">
                <label className="vendor-input-label">
                  First Name <span className="vendor-required">*</span>
                </label>
                <div className="vendor-input-icon">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="vendor-form-input"
                  required
                />
                {errors.firstName && (
                  <div className="vendor-error-message">
                    <X size={14} />
                    {errors.firstName}
                  </div>
                )}
              </div>

              <div className="vendor-input-group">
                <label className="vendor-input-label">
                  Last Name <span className="vendor-required">*</span>
                </label>
                <div className="vendor-input-icon">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="vendor-form-input"
                  required
                />
                {errors.lastName && (
                  <div className="vendor-error-message">
                    <X size={14} />
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="vendor-input-group">
              <label className="vendor-input-label">
                Email Address <span className="vendor-required">*</span>
              </label>
              <div className="vendor-input-icon">
                <Mail size={20} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@business.com"
                className="vendor-form-input"
                required
              />
              {errors.email && (
                <div className="vendor-error-message">
                  <X size={14} />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password Fields */}
            <div className="vendor-form-row">
              <div className="vendor-input-group">
                <label className="vendor-input-label">
                  Password <span className="vendor-required">*</span>
                </label>
                <div className="vendor-input-icon">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  className="vendor-form-input vendor-password-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="vendor-password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="vendor-password-strength">
                    <div className="vendor-strength-label">
                      Password strength: {getStrengthText()}
                    </div>
                    <div className="vendor-strength-bar">
                      <div className={`vendor-strength-fill ${getStrengthClass()}`}></div>
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <div className="vendor-error-message">
                    <X size={14} />
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="vendor-input-group">
                <label className="vendor-input-label">
                  Confirm Password <span className="vendor-required">*</span>
                </label>
                <div className="vendor-input-icon">
                  <Lock size={20} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="vendor-form-input vendor-password-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="vendor-password-toggle"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <div className="vendor-success-message">
                    <Check size={14} />
                    Passwords match
                  </div>
                )}
                {errors.confirmPassword && (
                  <div className="vendor-error-message">
                    <X size={14} />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="vendor-input-group">
              <label className="vendor-input-label">
                Phone Number <span className="vendor-required">*</span>
              </label>
              <div className="vendor-input-icon">
                <Phone size={20} />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                className="vendor-form-input"
                required
              />
              {errors.phone && (
                <div className="vendor-error-message">
                  <X size={14} />
                  {errors.phone}
                </div>
              )}
            </div>

            {/* Business Information */}
            <div className="vendor-form-row">
              <div className="vendor-input-group">
                <label className="vendor-input-label">
                  Business Name <span className="vendor-required">*</span>
                </label>
                <div className="vendor-input-icon">
                  <Building2 size={20} />
                </div>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Your Business LLC"
                  className="vendor-form-input"
                  required
                />
                {errors.businessName && (
                  <div className="vendor-error-message">
                    <X size={14} />
                    {errors.businessName}
                  </div>
                )}
              </div>

              <div className="vendor-input-group">
                <label className="vendor-input-label">
                  Business Type <span className="vendor-required">*</span>
                </label>
                <div className="vendor-input-icon">
                  <Briefcase size={20} />
                </div>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="vendor-form-select"
                  required
                >
                  <option value="">Select Business Type</option>
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="services">Services</option>
                  <option value="technology">Technology</option>
                  <option value="food-beverage">Food & Beverage</option>
                  <option value="fashion">Fashion & Apparel</option>
                  <option value="health-beauty">Health & Beauty</option>
                  <option value="home-garden">Home & Garden</option>
                  <option value="electronics">Electronics</option>
                  <option value="other">Other</option>
                </select>
                {errors.businessType && (
                  <div className="vendor-error-message">
                    <X size={14} />
                    {errors.businessType}
                  </div>
                )}
              </div>
            </div>

            {/* Business Description */}
            <div className="vendor-input-group">
              <label className="vendor-input-label">
                Business Description <span className="vendor-required">*</span>
              </label>
              <div className="vendor-textarea-icon">
                <FileText size={20} />
              </div>
              <textarea
                name="businessDescription"
                value={formData.businessDescription}
                onChange={handleInputChange}
                placeholder="Describe your business, products, and services..."
                className="vendor-form-textarea"
                required
              />
              {errors.businessDescription && (
                <div className="vendor-error-message">
                  <X size={14} />
                  {errors.businessDescription}
                </div>
              )}
            </div>

            {/* Website and Established Year */}
            <div className="vendor-form-row">
              <div className="vendor-input-group">
                <label className="vendor-input-label">Website</label>
                <div className="vendor-input-icon">
                  <Globe size={20} />
                </div>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://www.yourbusiness.com"
                  className="vendor-form-input"
                />
              </div>

              <div className="vendor-input-group">
                <label className="vendor-input-label">Established Year</label>
                <div className="vendor-input-icon">
                  <Calendar size={20} />
                </div>
                <input
                  type="number"
                  name="establishedYear"
                  value={formData.establishedYear}
                  onChange={handleInputChange}
                  placeholder="2020"
                  min="1800"
                  max="2025"
                  className="vendor-form-input"
                />
              </div>
            </div>

            {/* Business Address */}
            <div className="vendor-input-group">
              <label className="vendor-input-label">
                Business Address <span className="vendor-required">*</span>
              </label>
              <div className="vendor-input-icon">
                <MapPin size={20} />
              </div>
              <input
                type="text"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleInputChange}
                placeholder="123 Business Street"
                className="vendor-form-input"
                required
              />
              {errors.businessAddress && (
                <div className="vendor-error-message">
                  <X size={14} />
                  {errors.businessAddress}
                </div>
              )}
            </div>

            {/* City, State, Postal Code */}
            <div className="vendor-form-row-triple">
              <div className="vendor-input-group">
                <label className="vendor-input-label">
                  City <span className="vendor-required">*</span>
                </label>
                <div className="vendor-input-icon">
                  <MapPin size={20} />
                </div>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                  className="vendor-form-input"
                  required
                />
                {errors.city && (
                  <div className="vendor-error-message">
                    <X size={14} />
                    {errors.city}
                  </div>
                )}
              </div>

              <div className="vendor-input-group">
                <label className="vendor-input-label">State</label>
                <div className="vendor-input-icon">
                  <MapPin size={20} />
                </div>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="NY"
                  className="vendor-form-input"
                />
              </div>

              <div className="vendor-input-group">
                <label className="vendor-input-label">
                  Postal Code <span className="vendor-required">*</span>
                </label>
                <div className="vendor-input-icon">
                  <MapPin size={20} />
                </div>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                  className="vendor-form-input"
                  required
                />
                {errors.postalCode && (
                  <div className="vendor-error-message">
                    <X size={14} />
                    {errors.postalCode}
                  </div>
                )}
              </div>
            </div>

            {/* Financial Information */}
            <div className="vendor-form-row">
              <div className="vendor-input-group">
                <label className="vendor-input-label">
                  Tax ID / EIN <span className="vendor-required">*</span>
                </label>
                <div className="vendor-input-icon">
                  <DollarSign size={20} />
                </div>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  placeholder="12-3456789"
                  className="vendor-form-input"
                  required
                />
                {errors.taxId && (
                  <div className="vendor-error-message">
                    <X size={14} />
                    {errors.taxId}
                  </div>
                )}
              </div>

              <div className="vendor-input-group">
                <label className="vendor-input-label">Bank Account (Last 4 digits)</label>
                <div className="vendor-input-icon">
                  <DollarSign size={20} />
                </div>
                <input
                  type="text"
                  name="bankAccount"
                  value={formData.bankAccount}
                  onChange={handleInputChange}
                  placeholder="****1234"
                  maxLength="4"
                  className="vendor-form-input"
                />
              </div>
            </div>

            {/* Document Uploads */}
            <div className="vendor-form-row">
              <div className="vendor-input-group">
                <label className="vendor-input-label">Business License</label>
                <div className="vendor-file-upload">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'businessLicense')}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="vendor-file-input"
                  />
                  <div className="vendor-file-content">
                    <Upload className="vendor-file-icon" />
                    <div className="vendor-file-text">
                      {formData.businessLicense ? formData.businessLicense.name : 'Upload Business License'}
                    </div>
                    <div className="vendor-file-subtext">
                      PDF, JPG, PNG up to 5MB
                    </div>
                  </div>
                </div>
              </div>

              <div className="vendor-input-group">
                <label className="vendor-input-label">Tax Documents</label>
                <div className="vendor-file-upload">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, 'taxDocument')}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="vendor-file-input"
                  />
                  <div className="vendor-file-content">
                    <Upload className="vendor-file-icon" />
                    <div className="vendor-file-text">
                      {formData.taxDocument ? formData.taxDocument.name : 'Upload Tax Documents'}
                    </div>
                    <div className="vendor-file-subtext">
                      PDF, JPG, PNG up to 5MB
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="vendor-terms-group">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="vendor-terms-checkbox"
                required
              />
              <div className="vendor-terms-text">
                I agree to the{' '}
                <a href="#" className="vendor-terms-link">Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="vendor-terms-link">Privacy Policy</a>.
              </div>
            </div>
            {errors.agreeToTerms && (
              <div className="vendor-error-message">
                <X size={14} />
                {errors.agreeToTerms}
              </div>
            )}

            <div className="vendor-terms-group">
              <input
                type="checkbox"
                name="agreeToVendorTerms"
                checked={formData.agreeToVendorTerms}
                onChange={handleInputChange}
                className="vendor-terms-checkbox"
                required
              />
              <div className="vendor-terms-text">
                I agree to the{' '}
                <a href="#" className="vendor-terms-link">Vendor Agreement</a>{' '}
                and understand that my account will be reviewed for approval.
              </div>
            </div>
            {errors.agreeToVendorTerms && (
              <div className="vendor-error-message">
                <X size={14} />
                {errors.agreeToVendorTerms}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="vendor-submit-button"
            >
              {isLoading ? (
                <>
                  <span className="vendor-loading"></span>
                  Creating Vendor Account...
                </>
              ) : (
                'Create Vendor Account'
              )}
            </button>
          </div>

          {/* Social Signup */}
          <div className="vendor-social-section">
            <div className="vendor-divider">
              <div className="vendor-divider-line"></div>
              <span className="vendor-divider-text">or sign up with</span>
              <div className="vendor-divider-line"></div>
            </div>

            <div className="vendor-social-buttons">
              <a href="#" className="vendor-social-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </a>
              
              <a href="#" className="vendor-social-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>

          {/* Login Link */}
          <div className="vendor-login-section">
            <p className="vendor-login-text">
              Already have a vendor account?{' '}
              <Link to="/login" className="vendor-login-link">
                    Sign in here
                </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;