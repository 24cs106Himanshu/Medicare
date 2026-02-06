import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Calendar,
  Users,
  FileText,
  Clock,
  TrendingUp,
  Activity,
  Stethoscope,
  Heart,
  Shield,
  Bell,
  ChevronRight,
  Plus,
  Star,
  UserCheck
} from 'lucide-react';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const FloatingIcon = ({ icon: Icon, className, delay = 0 }) => (
    <div 
      className={`absolute ${className} animate-float opacity-20`}
      style={{ animationDelay: `${delay}s` }}
    >
      <Icon className="w-6 h-6 text-green-300/30 dark:text-green-400/20" />
    </div>
  );

  const todayAppointments = [
    {
      id: 1,
      patient: 'John Smith',
      time: '9:00 AM',
      type: 'Regular Checkup',
      status: 'confirmed',
      duration: '30 min'
    },
    {
      id: 2,
      patient: 'Sarah Wilson',
      time: '10:30 AM',
      type: 'Follow-up',
      status: 'confirmed',
      duration: '20 min'
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      time: '2:00 PM',
      type: 'Consultation',
      status: 'pending',
      duration: '45 min'
    }
  ];

  const recentPatients = [
    {
      id: 1,
      name: 'Emma Davis',
      lastVisit: '2024-01-28',
      condition: 'Hypertension',
      status: 'Stable',
      age: 45
    },
    {
      id: 2,
      name: 'Robert Brown',
      lastVisit: '2024-01-27',
      condition: 'Diabetes',
      status: 'Monitoring',
      age: 52
    },
    {
      id: 3,
      name: 'Lisa Chen',
      lastVisit: '2024-01-26',
      condition: 'Asthma',
      status: 'Stable',
      age: 34
    }
  ];

  const quickActions = [
    {
      title: 'View Schedule',
      description: 'Check today\'s appointments',
      icon: Calendar,
      href: '/appointments',
      gradient: 'from-blue-500 to-primary-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Patient Records',
      description: 'Access medical histories',
      icon: FileText,
      href: '/medical-records',
      gradient: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Prescriptions',
      description: 'Manage medications',
      icon: Activity,
      href: '/prescriptions',
      gradient: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon icon={Stethoscope} className="top-20 left-10" delay={0} />
        <FloatingIcon icon={Heart} className="top-32 right-20" delay={1} />
        <FloatingIcon icon={Shield} className="bottom-40 left-20" delay={2} />
        <FloatingIcon icon={Activity} className="top-1/2 left-1/4" delay={1.5} />
        
        {/* Animated Circles */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-green-200/10 dark:bg-green-600/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-200/10 dark:bg-blue-600/5 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-primary-200/10 dark:bg-primary-600/5 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Welcome Header */}
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-gradient-to-r from-green-600 via-primary-700 to-blue-600 dark:from-green-700 dark:via-primary-800 dark:to-blue-700 rounded-3xl p-8 text-white shadow-2xl border border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-blue-600/80 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center">
                    <Stethoscope className="w-8 h-8 mr-3 animate-pulse" />
                    Good morning, Dr. {user?.lastName || 'Johnson'}!
                  </h1>
                  <p className="text-green-100 dark:text-green-200 text-lg">
                    You have {todayAppointments.length} appointments scheduled for today
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <UserCheck className="w-12 h-12 text-white animate-pulse" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-green-100">
                <div className="flex items-center">
                  <Bell className="w-4 h-4 mr-2" />
                  <span className="text-sm">Ready to help patients today!</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  <span className="text-sm">4.8 Patient Rating</span>
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{todayAppointments.length}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Today's Appointments</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Total Patients</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">42</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Records Updated</p>
              </div>
            </div>
          </div>

          <div className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Patient Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`transform transition-all duration-1000 delay-400 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-3 text-green-600" />
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
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {action.description}
                  </p>
                  <div className="flex items-center text-green-600 dark:text-green-400 group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-medium">Access Now</span>
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
          {/* Today's Appointments */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden">
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-primary-50/50 dark:from-blue-900/20 dark:to-primary-900/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                  Today's Appointments
                </h2>
                <Link
                  to="/appointments"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center group"
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {todayAppointments.map((appointment, index) => (
                  <div
                    key={appointment.id}
                    className="group flex items-center p-4 bg-gradient-to-r from-gray-50/50 to-blue-50/50 dark:from-gray-700/50 dark:to-blue-900/20 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-primary-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                          {appointment.patient}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {appointment.type} • {appointment.duration}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {appointment.time}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Patients */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/20 overflow-hidden">
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Users className="w-5 h-5 mr-3 text-green-600" />
                  Recent Patients
                </h2>
                <Link
                  to="/patients"
                  className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium flex items-center group"
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentPatients.map((patient, index) => (
                  <div
                    key={patient.id}
                    className="group flex items-center p-4 bg-gradient-to-r from-gray-50/50 to-green-50/50 dark:from-gray-700/50 dark:to-green-900/20 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50"
                  >
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                          {patient.name}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          patient.status === 'Stable' 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        }`}>
                          {patient.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {patient.condition} • Age {patient.age}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Last visit: {patient.lastVisit}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                ))}
              </div>
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

export default DoctorDashboard;