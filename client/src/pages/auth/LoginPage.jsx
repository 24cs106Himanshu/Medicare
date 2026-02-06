import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Heart, Eye, EyeOff, Activity, Shield, Users, Stethoscope } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const { login } = useAuth();
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
    setIsLoading(true);

    try {
      const response = await login(formData);
      toast.success('Login successful!');
      
      // Redirect to appropriate dashboard based on user role
      const dashboardMap = {
        patient: '/patient-dashboard',
        doctor: '/doctor-dashboard',
        admin: '/admin-dashboard'
      };
      
      navigate(dashboardMap[response.user.role] || '/patient-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const FloatingIcon = ({ icon: Icon, className, delay = 0 }) => (
    <div 
      className={`absolute ${className} animate-float`}
      style={{ animationDelay: `${delay}s` }}
    >
      <Icon className="w-6 h-6 text-primary-300/30 dark:text-primary-400/20" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingIcon icon={Heart} className="top-20 left-10" delay={0} />
        <FloatingIcon icon={Activity} className="top-32 right-20" delay={1} />
        <FloatingIcon icon={Shield} className="bottom-40 left-20" delay={2} />
        <FloatingIcon icon={Users} className="bottom-20 right-10" delay={3} />
        <FloatingIcon icon={Stethoscope} className="top-1/2 left-1/4" delay={1.5} />
        
        {/* Animated Circles */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary-200/20 dark:bg-primary-600/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-cyan-200/20 dark:bg-cyan-600/10 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-green-200/20 dark:bg-green-600/10 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen">
        {/* Header Section */}
        <div className={`sm:mx-auto sm:w-full sm:max-w-md transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent mb-2">
              Medicare
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sign in to access your healthcare dashboard
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg py-8 px-6 shadow-2xl rounded-3xl border border-white/20 dark:border-gray-700/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
                    placeholder="Enter your email"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 to-primary-500/0 group-focus-within:from-primary-500/10 group-focus-within:to-cyan-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 group-hover:shadow-md"
                    placeholder="Enter your password"
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
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 to-primary-500/0 group-focus-within:from-primary-500/10 group-focus-within:to-cyan-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 transition-colors duration-200"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-200">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Login Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Heart className="h-5 w-5 text-primary-300 group-hover:text-primary-200 transition-colors duration-200" />
                  </span>
                  {isLoading ? <LoadingSpinner size="small" /> : 'Sign In to Medicare'}
                </button>
              </div>
            </form>

            {/* Demo Accounts Section */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300/50 dark:border-gray-600/50" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 font-medium">
                    Quick Demo Access
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-2xl border border-blue-200/50 dark:border-blue-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="font-medium text-blue-800 dark:text-blue-200">Demo Accounts</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          email: 'patient@medicare.com',
                          password: 'password123'
                        });
                      }}
                      className="group p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-blue-200/50 dark:border-blue-600/50 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
                    >
                      <div className="text-center">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                          <Heart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="text-xs font-medium text-blue-800 dark:text-blue-200">Patient</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">Try Patient View</p>
                      </div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          email: 'doctor@medicare.com',
                          password: 'password123'
                        });
                      }}
                      className="group p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl border border-green-200/50 dark:border-green-600/50 hover:bg-white dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-md transform hover:scale-[1.02]"
                    >
                      <div className="text-center">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                          <Stethoscope className="w-4 h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <p className="text-xs font-medium text-green-800 dark:text-green-200">Doctor</p>
                        <p className="text-xs text-green-600 dark:text-green-400">Try Doctor View</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-200 hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;