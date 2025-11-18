import React, { useState } from 'react';
import { X, Mail, Lock, User, AlertCircle, Loader, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [validationError, setValidationError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { login, register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Password validation for signup only
    if (name === 'password') {
      if (!isLogin && value.length > 0 && value.length < 6) {
        setValidationError('Password must be at least 6 characters long');
      } else {
        setValidationError('');
      }
    }
    
    // Clear errors when user starts typing
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!isLogin && formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return;
    }
    
    // Clear validation error
    setValidationError('');
    
    try {
      if (isLogin) {
        // Login
        await login({
          email: formData.email,
          password: formData.password
        });
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // Register
        const registrationData = {
          name: formData.name,
          email: formData.email,
          password: formData.password
        };
        
        await register(registrationData);
        
        // Redirect to dashboard
        navigate('/dashboard');
      }
      
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
      // Error is handled by context
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    clearError();
    setValidationError('');
    // Reset form when switching modes
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleOverlayClick}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            disabled={isLoading}
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Join E-SPARK'}
            </h2>
            <p className="text-gray-300 text-sm">
              {isLogin ? 'Please enter your login details' : 'Create your account and get started'}
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Validation Error Alert */}
          {validationError && (
            <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center space-x-2">
              <AlertCircle size={16} className="text-yellow-400 flex-shrink-0" />
              <p className="text-yellow-400 text-sm">{validationError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field - Only for Sign Up */}
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all disabled:opacity-50"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all disabled:opacity-50"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full pl-11 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all disabled:opacity-50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin mr-2" size={20} />
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                isLogin ? 'Login' : 'Create Account'
              )}
            </button>

            {/* Toggle Text */}
            <p className="text-center text-sm text-gray-400 mt-4">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={handleToggleMode}
                disabled={isLoading}
                className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors disabled:opacity-50"
              >
                {isLogin ? 'Sign up here' : 'Login here'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;