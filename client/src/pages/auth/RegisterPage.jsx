import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Heart, Eye, EyeOff, UserPlus, Stethoscope, Activity, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'patient',
    // Patient specific
    dateOfBirth: '',
    gender: '',
    // Doctor specific
    specialization: '',
    licenseNumber: '',
    experience: '',
    consultationFee: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const registrationData = { ...formData };
      delete registrationData.confirmPassword;
      
      const response = await register(registrationData);
      toast.success('Registration successful!');
      
      // Redirect to appropriate dashboard based on user role
      const dashboardMap = {
        patient: '/patient-dashboard',
        doctor: '/doctor-dashboard',
        admin: '/admin-dashboard'
      };
      
      navigate(dashboardMap[response.user.role] || '/patient-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const FloatingIcon = ({ icon: Icon, className, delay = 0 }) => (
    <div 
      className={`absolute ${className} animate-float`}
      style={{ animationDelay: `${delay}s` }}
    >
      <Icon className="w-5 h-5 text-primary-300/20 dark:text-primary-400/10" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingIcon icon={Heart} className="top-16 left-8" delay={0} />
        <FloatingIcon icon={Activity} className="top-24 right-16" delay={1.5} />
        <FloatingIcon icon={Shield} className="bottom-32 left-16" delay={2.5} />
        <FloatingIcon icon={Stethoscope} className="bottom-16 right-8" delay={3.5} />
        
        {/* Animated Circles */}
        <div className="absolute top-8 right-8 w-24 h-24 bg-green-200/20 dark:bg-green-600/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-8 left-8 w-20 h-20 bg-blue-200/20 dark:bg-blue-600/10 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-primary-200/20 dark:bg-primary-600/10 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center py-8 sm:px-6 lg:px-8 min-h-screen">
        {/* Header Section */}
        <div className={`sm:mx-auto sm:w-full sm:max-w-md transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-green-600 to-primary-700 dark:from-green-500 dark:to-primary-600 p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                <UserPlus className="w-10 h-10 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-primary-800 dark:from-green-400 dark:to-primary-600 bg-clip-text text-transparent mb-2">
              Join Medicare
            </h1>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Create Your Account
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Start your healthcare journey with us
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className={`mt-6 sm:mx-auto sm:w-full sm:max-w-lg transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg py-8 px-6 shadow-2xl rounded-3xl border border-white/20 dark:border-gray-700/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Role Selection */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  I am registering as a
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    formData.role === 'patient' 
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600'
                  }`}>
                    <input
                      type="radio"
                      name="role"
                      value="patient"
                      checked={formData.role === 'patient'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <Heart className={`w-6 h-6 mx-auto mb-2 ${
                        formData.role === 'patient' ? 'text-primary-600' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        formData.role === 'patient' ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'
                      }`}>Patient</span>
                    </div>
                  </label>
                  <label className={`relative flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    formData.role === 'doctor' 
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600'
                  }`}>
                    <input
                      type="radio"
                      name="role"
                      value="doctor"
                      checked={formData.role === 'doctor'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <Stethoscope className={`w-6 h-6 mx-auto mb-2 ${
                        formData.role === 'doctor' ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        formData.role === 'doctor' ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'
                      }`}>Doctor</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
                    placeholder="First name"
                  />
                </div>
                <div className="group">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
                  placeholder="Enter your email"
                />
              </div>

              <div className="group">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Patient Specific Fields */}
              {formData.role === 'patient' && (
                <div className="space-y-4 p-4 bg-primary-50/50 dark:bg-primary-900/10 rounded-xl border border-primary-200/50 dark:border-primary-700/50">
                  <h3 className="text-sm font-medium text-primary-800 dark:text-primary-300 flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Patient Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="group">
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date of Birth
                      </label>
                      <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        required
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Doctor Specific Fields */}
              {formData.role === 'doctor' && (
                <div className="space-y-4 p-4 bg-green-50/50 dark:bg-green-900/10 rounded-xl border border-green-200/50 dark:border-green-700/50">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-300 flex items-center">
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Professional Information
                  </h3>
                  <div className="space-y-4">
                    <div className="group">
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Specialization
                      </label>
                      <input
                        id="specialization"
                        name="specialization"
                        type="text"
                        required
                        value={formData.specialization}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="e.g., Cardiology, Dermatology"
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        License Number
                      </label>
                      <input
                        id="licenseNumber"
                        name="licenseNumber"
                        type="text"
                        required
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="Medical license number"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group">
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Experience (years)
                        </label>
                        <input
                          id="experience"
                          name="experience"
                          type="number"
                          required
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                          placeholder="Years"
                        />
                      </div>
                      <div className="group">
                        <label htmlFor="consultationFee" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Consultation Fee ($)
                        </label>
                        <input
                          id="consultationFee"
                          name="consultationFee"
                          type="number"
                          required
                          value={formData.consultationFee}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                          placeholder="Fee"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Password Fields */}
              <div className="space-y-4">
                <div className="group">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              {/* Register Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-green-600 to-primary-700 hover:from-green-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <UserPlus className="h-5 w-5 text-green-300 group-hover:text-green-200 transition-colors duration-200" />
                  </span>
                  {isLoading ? <LoadingSpinner size="small" /> : 'Create Medicare Account'}
                </button>
              </div>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-200 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;