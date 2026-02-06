import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { appointmentsAPI, prescriptionsAPI, recordsAPI } from '../../services/api';
import {
  Calendar,
  FileText,
  Pill,
  Clock,
  User,
  Plus,
  Activity,
  Heart,
  Stethoscope,
  Shield,
  TrendingUp,
  Bell,
  ChevronRight
} from 'lucide-react';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    activePrescriptions: 0,
    medicalRecords: 0,
    upcomingAppointments: 0
  });
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, prescriptionsRes, recordsRes] = await Promise.all([
          appointmentsAPI.getAll(),
          prescriptionsAPI.getAll(),
          recordsAPI.getAll()
        ]);

        const appointmentsData = appointmentsRes.data || [];
        const prescriptionsData = prescriptionsRes.data || [];
        const recordsData = recordsRes.data || [];

        setAppointments(appointmentsData);
        setPrescriptions(prescriptionsData);
        setRecords(recordsData);
        
        // Calculate stats
        setStats({
          totalAppointments: appointmentsData.length,
          activePrescriptions: prescriptionsData.filter(p => p.status === 'Active').length,
          medicalRecords: recordsData.length,
          upcomingAppointments: appointmentsData.filter(a => new Date(a.date) > new Date()).length
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Keep default stats on error
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const FloatingIcon = ({ icon: Icon, className, delay = 0 }) => (
    <div 
      className={`absolute ${className} animate-float opacity-20`}
      style={{ animationDelay: `${delay}s` }}
    >
      <Icon className="w-6 h-6 text-primary-300/30 dark:text-primary-400/20" />
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <FloatingIcon icon={Heart} className="top-20 left-10" delay={0} />
          <FloatingIcon icon={Activity} className="top-32 right-20" delay={1} />
          <FloatingIcon icon={Shield} className="bottom-40 left-20" delay={2} />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Book Appointment',
      description: 'Schedule a visit with your doctor',
      icon: Calendar,
      href: '/book-appointment',
      gradient: 'from-blue-500 to-primary-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'View Prescriptions',
      description: 'Check your current medications',
      icon: Pill,
      href: '/prescriptions',
      gradient: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Medical Records',
      description: 'Access your health history',
      icon: FileText,
      href: '/medical-records',
      gradient: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  const upcomingAppointments = appointments.slice(0, 3);
  const recentPrescriptions = prescriptions.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon icon={Heart} className="top-20 left-10" delay={0} />
        <FloatingIcon icon={Activity} className="top-32 right-20" delay={1} />
        <FloatingIcon icon={Shield} className="bottom-40 left-20" delay={2} />
        <FloatingIcon icon={Stethoscope} className="top-1/2 left-1/4" delay={1.5} />
        
        {/* Animated Circles */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary-200/10 dark:bg-primary-600/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-cyan-200/10 dark:bg-cyan-600/5 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-green-200/10 dark:bg-green-600/5 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Welcome Header */}
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-blue-600 dark:from-primary-700 dark:via-primary-800 dark:to-blue-700 rounded-3xl p-8 text-white shadow-2xl border border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/80 to-blue-600/80 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center">
                    <Heart className="w-8 h-8 mr-3 animate-pulse" />
                    Welcome back, {user?.firstName}!
                  </h1>
                  <p className="text-primary-100 dark:text-primary-200 text-lg">
                    Here's your personalized health dashboard
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <Activity className="w-12 h-12 text-white animate-pulse" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-primary-100">
                <div className="flex items-center">
                  <Bell className="w-4 h-4 mr-2" />
                  <span className="text-sm">Stay healthy, stay happy!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transform transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-primary-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAppointments}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Total Appointments</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activePrescriptions}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Active Prescriptions</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.medicalRecords}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Medical Records</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.upcomingAppointments}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Upcoming</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`transform transition-all duration-1000 delay-400 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-3 text-primary-600" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.href}
                  className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className={`bg-gradient-to-r ${action.gradient} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {action.description}
                  </p>
                  <div className="flex items-center text-primary-600 dark:text-primary-400 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-medium">Get Started</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={`grid grid-cols-1 xl:grid-cols-2 gap-8 transform transition-all duration-1000 delay-600 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Upcoming Appointments */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden">
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-primary-50/50 dark:from-blue-900/20 dark:to-primary-900/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-primary-600" />
                  Upcoming Appointments
                </h2>
                <Link
                  to="/book-appointment"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium flex items-center group"
                >
                  <Plus className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform duration-200" />
                  Book New
                </Link>
              </div>
            </div>
            <div className="p-6">
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div
                      key={appointment.id || index}
                      className="group flex items-center p-4 bg-gradient-to-r from-gray-50/50 to-blue-50/50 dark:from-gray-700/50 dark:to-blue-900/20 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50"
                    >
                      <div className="bg-gradient-to-r from-primary-500 to-blue-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                          {appointment.doctorName || 'Dr. Sarah Johnson'}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {appointment.doctorSpecialization || 'Cardiology'} • {appointment.type || 'Regular Checkup'}
                        </p>
                        <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{appointment.date} at {appointment.time}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-700 dark:to-blue-900/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No upcoming appointments</p>
                  <Link
                    to="/book-appointment"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl hover:from-primary-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Book your first appointment
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Prescriptions */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden">
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Pill className="w-5 h-5 mr-3 text-green-600" />
                  Recent Prescriptions
                </h2>
                <Link
                  to="/prescriptions"
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium flex items-center group"
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentPrescriptions.length > 0 ? (
                <div className="space-y-4">
                  {recentPrescriptions.map((prescription, index) => (
                    <div
                      key={prescription.id || index}
                      className="group flex items-center p-4 bg-gradient-to-r from-gray-50/50 to-green-50/50 dark:from-gray-700/50 dark:to-green-900/20 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50"
                    >
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Pill className="w-5 h-5 text-white" />
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                          {prescription.medication}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Prescribed by {prescription.doctorName}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {prescription.prescribedDate || prescription.date}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                            {prescription.status}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-r from-gray-100 to-green-100 dark:from-gray-700 dark:to-green-900/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Pill className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">No recent prescriptions</p>
                </div>
              )}
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

export default PatientDashboard;