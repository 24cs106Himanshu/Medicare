import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Users,
  Calendar,
  Activity,
  TrendingUp,
  FileText,
  Shield,
  Settings,
  AlertTriangle
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  const systemStats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Appointments Today', value: '89', change: '+5%', icon: Calendar, color: 'green' },
    { label: 'Active Doctors', value: '156', change: '+3%', icon: Activity, color: 'purple' },
    { label: 'System Uptime', value: '99.9%', change: '0%', icon: TrendingUp, color: 'orange' }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      message: 'New doctor registered: Dr. Sarah Johnson',
      time: '2 minutes ago',
      icon: Users
    },
    {
      id: 2,
      type: 'appointment',
      message: '15 appointments scheduled for tomorrow',
      time: '5 minutes ago',
      icon: Calendar
    },
    {
      id: 3,
      type: 'system',
      message: 'Database backup completed successfully',
      time: '1 hour ago',
      icon: Shield
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Server storage is 85% full',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'info',
      message: 'Scheduled maintenance in 2 days',
      priority: 'low'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-700 dark:to-secondary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Admin Dashboard
        </h1>
        <p className="text-primary-100 dark:text-primary-200">
          System overview and management tools
        </p>
      </div>

      {/* System Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
            green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
            purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
            orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
          };

          return (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</p>
                  <p className={`text-xs mt-1 ${
                    stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500 dark:text-yellow-400" />
              System Alerts
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'warning' 
                      ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-500'
                      : 'bg-blue-50 dark:bg-blue-900/20 border-blue-400 dark:border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{alert.message}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.priority === 'medium'
                        ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    }`}>
                      {alert.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activities
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start">
                    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                      <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Management Tools */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Management Tools
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center p-4 bg-primary-50 dark:bg-primary-900 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors">
                <Users className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" />
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Manage Users</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-secondary-50 dark:bg-secondary-900 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors">
                <Calendar className="w-8 h-8 text-secondary-600 dark:text-secondary-400 mb-2" />
                <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Appointments</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
                <FileText className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Reports</span>
              </button>
              <button className="flex flex-col items-center p-4 bg-orange-50 dark:bg-orange-900 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors">
                <Settings className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            System Health
          </h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Security</h3>
              <p className="text-sm text-green-600 dark:text-green-400">All systems secure</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Performance</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">Optimal performance</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white">Usage</h3>
              <p className="text-sm text-purple-600 dark:text-purple-400">Growing steadily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;