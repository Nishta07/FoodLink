import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

import { 
  ArrowLeft, 
  ShoppingBag, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Phone, 
  MapPin, 
  Calendar,
  Check,
  X,
  Loader
} from 'lucide-react';
import './CustomerSignup.css';

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    postalCode: '',
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

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
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Customer signup data:', formData);
      alert('Account created successfully! Welcome to our platform.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        postalCode: '',
        agreeToTerms: false
      });
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthClass = () => {
    if (passwordStrength <= 2) return 'strength-weak';
    if (passwordStrength <= 3) return 'strength-medium';
    return 'strength-strong';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="signup-container">
      {/* Background Animation */}
      <div className="bg-animation">
        <div className="bg-circle-1"></div>
        <div className="bg-circle-2"></div>
        <div className="bg-circle-3"></div>
      </div>

      {/* Main Content */}
      <div className="signup-content">
        {/* Back Button */}
            <Link to="/login" className="back-button">
            ← Back to Login
            </Link>

        {/* Signup Form Container */}
        <div className="signup-form-container">
          {/* Header */}
          <div className="signup-header">
            <div className="signup-icon">
              <ShoppingBag size={28} />
            </div>
            <h1 className="signup-title">Create Account</h1>
            <p className="signup-subtitle">Join thousands of happy customers</p>
          </div>

          {/* Form */}
          <div className="signup-form">
            {/* Name Fields */}
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">First Name *</label>
                <div className="input-icon">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="form-input"
                  required
                />
                {errors.firstName && (
                  <div className="error-message">
                    <X size={14} />
                    {errors.firstName}
                  </div>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">Last Name *</label>
                <div className="input-icon">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  className="form-input"
                  required
                />
                {errors.lastName && (
                  <div className="error-message">
                    <X size={14} />
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="input-group">
              <label className="input-label">Email Address *</label>
              <div className="input-icon">
                <Mail size={20} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
                className="form-input"
                required
              />
              {errors.email && (
                <div className="error-message">
                  <X size={14} />
                  {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div className="input-group">
              <label className="input-label">Password *</label>
              <div className="input-icon">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
                className="form-input password-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-label">
                    Password strength: {getStrengthText()}
                  </div>
                  <div className="strength-bar">
                    <div className={`strength-fill ${getStrengthClass()}`}></div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <div className="error-message">
                  <X size={14} />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <label className="input-label">Confirm Password *</label>
              <div className="input-icon">
                <Lock size={20} />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="form-input password-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="success-message">
                  <Check size={14} />
                  Passwords match
                </div>
              )}
              {errors.confirmPassword && (
                <div className="error-message">
                  <X size={14} />
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Phone and Date of Birth */}
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">Phone Number *</label>
                <div className="phone-group">
                  <input
                    type="text"
                    className="form-input country-code"
                    value="+1"
                    readOnly
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    className="form-input phone-input"
                    required
                  />
                </div>
                {errors.phone && (
                  <div className="error-message">
                    <X size={14} />
                    {errors.phone}
                  </div>
                )}
              </div>

              <div className="input-group">
                <label className="input-label">Date of Birth</label>
                <div className="input-icon">
                  <Calendar size={20} />
                </div>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            {/* Gender and Address */}
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">Gender</label>
                <div className="input-icon">
                  <User size={20} />
                </div>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">City</label>
                <div className="input-icon">
                  <MapPin size={20} />
                </div>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                  className="form-input"
                />
              </div>
            </div>

            {/* Address */}
            <div className="input-group">
              <label className="input-label">Street Address</label>
              <div className="input-icon">
                <MapPin size={20} />
              </div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main Street"
                className="form-input"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="terms-group">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="terms-checkbox"
                required
              />
              <div className="terms-text">
                I agree to the{' '}
                <a href="#" className="terms-link">Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="terms-link">Privacy Policy</a>.
                I also agree to receive marketing communications.
              </div>
            </div>
            {errors.agreeToTerms && (
              <div className="error-message">
                <X size={14} />
                {errors.agreeToTerms}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? (
                <>
                  <span className="loading"></span>
                  Creating Account...
                </>
              ) : (
                'Create Customer Account'
              )}
            </button>
          </div>

          {/* Social Signup */}
          <div className="social-section">
            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">or sign up with</span>
              <div className="divider-line"></div>
            </div>

            <div className="social-buttons">
              <a href="#" className="social-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </a>
              
              <a href="#" className="social-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>

          {/* Login Link */}
          <div className="login-section">
            <p className="login-text">
              Already have an account?{' '}
               <Link to="/login" className="login-link">
                Sign in here
                </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignup;