import React from 'react';
import {
  Calendar,
  Users,
  FileText,
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';

const DoctorDashboard = () => {
  // Mock user data for demo
  const user = { lastName: 'Smith' };

  const todayAppointments = [
    {
      id: 1,
      patient: 'John Smith',
      time: '9:00 AM',
      type: 'Regular Checkup',
      status: 'confirmed'
    },
    {
      id: 2,
      patient: 'Sarah Wilson',
      time: '10:30 AM',
      type: 'Follow-up',
      status: 'confirmed'
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      time: '2:00 PM',
      type: 'Consultation',
      status: 'pending'
    }
  ];

  const recentPatients = [
    {
      id: 1,
      name: 'Emma Davis',
      lastVisit: '2024-01-28',
      condition: 'Hypertension',
      status: 'Stable'
    },
    {
      id: 2,
      name: 'Robert Brown',
      lastVisit: '2024-01-27',
      condition: 'Diabetes',
      status: 'Monitoring'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-700 dark:to-secondary-700 rounded-lg p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">
          Good morning, Dr. {user?.lastName}!
        </h1>
        <p className="text-primary-100 dark:text-primary-200 text-sm sm:text-base">
          You have {todayAppointments.length} appointments scheduled for today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Today's Appointments</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Total Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">42</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Records Updated</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Patient Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Today's Appointments
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">
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
                      {appointment.type}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {appointment.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Patients
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="bg-secondary-100 dark:bg-secondary-900 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">
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
                      {patient.condition}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last visit: {patient.lastVisit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 bg-primary-50 dark:bg-primary-900 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors">
            <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
            <span className="font-medium text-primary-700 dark:text-primary-300">View Schedule</span>
          </button>
          <button className="flex items-center p-4 bg-secondary-50 dark:bg-secondary-900 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors">
            <FileText className="w-6 h-6 text-secondary-600 dark:text-secondary-400 mr-3" />
            <span className="font-medium text-secondary-700 dark:text-secondary-300">Add Record</span>
          </button>
          <button className="flex items-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
            <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-3" />
            <span className="font-medium text-purple-700 dark:text-purple-300">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;