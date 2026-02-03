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
  Activity
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Book Appointment',
      description: 'Schedule a visit with your doctor',
      icon: Calendar,
      href: '/book-appointment',
      color: 'bg-primary-500'
    },
    {
      title: 'View Prescriptions',
      description: 'Check your current medications',
      icon: Pill,
      href: '/prescriptions',
      color: 'bg-secondary-500'
    },
    {
      title: 'Medical Records',
      description: 'Access your health history',
      icon: FileText,
      href: '/medical-records',
      color: 'bg-purple-500'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      date: '2024-02-15',
      time: '10:00 AM',
      type: 'Regular Checkup'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialization: 'Dermatology',
      date: '2024-02-20',
      time: '2:30 PM',
      type: 'Follow-up'
    }
  ];

  const recentPrescriptions = [
    {
      id: 1,
      medication: 'Lisinopril 10mg',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-01-28',
      status: 'Active'
    },
    {
      id: 2,
      medication: 'Metformin 500mg',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-01-28',
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-700 dark:to-secondary-700 rounded-lg p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-primary-100 dark:text-primary-200 text-sm sm:text-base">
          Here's an overview of your health dashboard
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.href}
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className={`${action.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 sm:p-3 rounded-lg">
              <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAppointments}</p>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Total Appointments</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900 p-2 sm:p-3 rounded-lg">
              <Pill className="w-4 h-4 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.activePrescriptions}</p>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Active Prescriptions</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 sm:p-3 rounded-lg">
              <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.medicalRecords}</p>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Medical Records</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-orange-100 dark:bg-orange-900 p-2 sm:p-3 rounded-lg">
              <Activity className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.upcomingAppointments}</p>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Upcoming</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Upcoming Appointments
              </h2>
              <Link
                to="/book-appointment"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
              >
                Book New
              </Link>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                        {appointment.doctor}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {appointment.specialization} • {appointment.type}
                      </p>
                      <div className="flex items-center mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        <span className="truncate">{appointment.date} at {appointment.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No upcoming appointments</p>
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center mt-4 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Book your first appointment
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Prescriptions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Recent Prescriptions
              </h2>
              <Link
                to="/prescriptions"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            {recentPrescriptions.length > 0 ? (
              <div className="space-y-4">
                {recentPrescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="flex items-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="bg-secondary-100 dark:bg-secondary-900 p-2 rounded-lg">
                      <Pill className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                        {prescription.medication}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 truncate">
                        Prescribed by {prescription.doctor}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {prescription.date}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          {prescription.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Pill className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No recent prescriptions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;