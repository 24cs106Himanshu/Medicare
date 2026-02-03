import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Heart,
  Calendar,
  FileText,
  MessageCircle,
  Shield,
  Clock,
  Users,
  Award
} from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: Calendar,
      title: 'Easy Appointment Booking',
      description: 'Book appointments with your preferred doctors at convenient times'
    },
    {
      icon: FileText,
      title: 'Digital Medical Records',
      description: 'Access your complete medical history and prescriptions online'
    },
    {
      icon: MessageCircle,
      title: 'AI Medical Assistant',
      description: 'Get instant answers to your health questions 24/7'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your medical data is protected with enterprise-grade security'
    }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Patients Served' },
    { icon: Award, value: '500+', label: 'Qualified Doctors' },
    { icon: Clock, value: '24/7', label: 'Support Available' },
    { icon: Heart, value: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 dark:bg-primary-500 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Medicare</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link
                  to={`/${user?.role}-dashboard`}
                  className="bg-primary-600 dark:bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary-600 dark:bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-700 dark:to-secondary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Health, <span className="text-secondary-200 dark:text-secondary-300">Simplified</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 dark:text-primary-200 max-w-3xl mx-auto">
              Manage appointments, access medical records, and get AI-powered health guidance 
              all in one secure platform.
            </p>
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-white dark:bg-gray-100 text-primary-600 dark:text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
                >
                  Start Free Today
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white dark:border-gray-200 text-white dark:text-gray-100 px-8 py-3 rounded-lg font-semibold hover:bg-white dark:hover:bg-gray-100 hover:text-primary-600 dark:hover:text-primary-700 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for Better Healthcare
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive platform brings together all aspects of healthcare management 
              in one easy-to-use interface.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-primary-100 dark:bg-primary-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-primary-600 dark:bg-primary-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl text-primary-100 dark:text-primary-200 mb-8 max-w-2xl mx-auto">
              Join thousands of patients and healthcare providers who trust Medicare 
              for their healthcare management needs.
            </p>
            <Link
              to="/register"
              className="bg-white dark:bg-gray-100 text-primary-600 dark:text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors inline-block"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Medicare</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Medicare. All rights reserved. | Privacy Policy | Terms of Service
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;