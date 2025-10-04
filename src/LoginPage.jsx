import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  ShoppingBag,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Home,
} from "lucide-react";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [loginType, setLoginType] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // ✅ useNavigate hook

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${loginType} login attempt:`, formData);

    // ✅ Navigate based on login type
    if (loginType === "customer") {
      navigate("/customer-dashboard");
    } else {
      navigate("/vendor-dashboard");
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* Background Animation */}
      <div className={styles.bgAnimation}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
      </div>

      {/* Main Content */}
      <div className={styles.loginContent}>
        {/* Back to Home Button */}
        <Link to="/" className={styles.backToHomeButton}>
          <Home size={20} />
          <span>Back to Home</span>
        </Link>

        {/* Login Type Selector */}
        <div className={styles.loginTypeSelector}>
          <div className={styles.selectorGrid}>
            <button
              onClick={() => setLoginType("customer")}
              className={`${styles.selectorButton} ${
                loginType === "customer"
                  ? styles.active + " " + styles.customer
                  : ""
              }`}
            >
              <ShoppingBag size={20} />
              <span>Customer</span>
            </button>
            <button
              onClick={() => setLoginType("vendor")}
              className={`${styles.selectorButton} ${
                loginType === "vendor"
                  ? styles.active + " " + styles.vendor
                  : ""
              }`}
            >
              <User size={20} />
              <span>Vendor</span>
            </button>
          </div>
        </div>

        {/* Login Form Container */}
        <div className={styles.loginFormContainer}>
          {/* Header */}
          <div className={styles.loginHeader}>
            <div
              className={`${styles.loginIcon} ${
                loginType === "customer" ? styles.customer : styles.vendor
              }`}
            >
              {loginType === "customer" ? (
                <ShoppingBag size={28} />
              ) : (
                <User size={28} />
              )}
            </div>
            <h2 className={styles.loginTitle}>Welcome Back</h2>
            <p className={styles.loginSubtitle}>
              Sign in to your {loginType} account
            </p>
          </div>

          {/* Form */}
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className={styles.inputGroup}>
              <div className={styles.inputIcon}>
                <Mail size={20} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email address"
                className={styles.formInput}
                required
              />
            </div>

            {/* Password Input */}
            <div className={styles.inputGroup}>
              <div className={styles.inputIcon}>
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className={`${styles.formInput} ${styles.passwordInput}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Form Options */}
            <div className={styles.formOptions}>
              <label className={styles.checkboxGroup}>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className={styles.forgotPassword}>
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`${styles.submitButton} ${
                loginType === "customer" ? styles.customer : styles.vendor
              }`}
            >
              Sign In as{" "}
              {loginType === "customer" ? "Customer" : "Vendor"}
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <span className={styles.dividerText}>or</span>
            <div className={styles.dividerLine}></div>
          </div>

          {/* Sign Up Link */}
          <div className={styles.signupSection}>
            <p className={styles.signupText}>
              Don't have an account?{" "}
              <Link
                to={
                  loginType === "customer"
                    ? "/customer-signup"
                    : "/vendor-signup"
                }
                className={`${styles.signupLink} ${
                  loginType === "customer"
                    ? styles.customer
                    : styles.vendor
                }`}
              >
                Sign up as {loginType}
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.loginFooter}>
          <p className={styles.footerText}>
            By signing in, you agree to our Terms of Service and Privacy
            Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
