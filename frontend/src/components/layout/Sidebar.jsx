import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home,
  Calendar,
  FileText,
  Pill,
  User,
  Users,
  Activity,
  Settings,
  BookOpen,
  Stethoscope,
  Shield
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const getMenuItems = () => {
    if (!user) return [];

    const baseItems = [];

    // Role-specific dashboard
    if (user.role === 'patient') {
      baseItems.push({
        name: 'Dashboard',
        href: '/patient-dashboard',
        icon: Home
      });
    } else if (user.role === 'doctor') {
      baseItems.push({
        name: 'Dashboard',
        href: '/doctor-dashboard',
        icon: Stethoscope
      });
    } else if (user.role === 'admin') {
      baseItems.push({
        name: 'Dashboard',
        href: '/admin-dashboard',
        icon: Shield
      });
    }

    // Common items for all roles
    baseItems.push({
      name: 'Profile',
      href: '/profile',
      icon: User
    });

    // Role-specific feature items
    const featureItems = [];

    if (user.role === 'patient') {
      featureItems.push(
        {
          name: 'Book Appointment',
          href: '/book-appointment',
          icon: Calendar
        },
        {
          name: 'My Prescriptions',
          href: '/prescriptions',
          icon: Pill
        },
        {
          name: 'Medical Records',
          href: '/medical-records',
          icon: FileText
        }
      );
    } else if (user.role === 'doctor') {
      featureItems.push(
        {
          name: 'Appointments',
          href: '/appointments',
          icon: Calendar
        },
        {
          name: 'Patients',
          href: '/patients',
          icon: Users
        },
        {
          name: 'Prescriptions',
          href: '/prescriptions',
          icon: Pill
        },
        {
          name: 'Medical Records',
          href: '/medical-records',
          icon: FileText
        }
      );
    } else if (user.role === 'admin') {
      featureItems.push(
        {
          name: 'User Management',
          href: '/users',
          icon: Users
        },
        {
          name: 'System Reports',
          href: '/reports',
          icon: Activity
        },
        {
          name: 'Settings',
          href: '/settings',
          icon: Settings
        }
      );
    }

    return [...baseItems, ...featureItems];
  };

  const menuItems = getMenuItems();

  const isActive = (href) => {
    return location.pathname === href;
  };

  if (!user) {
    return null;
  }

  return (
    <aside className="fixed left-0 top-16 h-full w-64 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 z-40 transition-colors duration-200">
      <nav className="p-4 space-y-2">
        {/* User Info */}
        <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 dark:bg-primary-900 w-10 h-10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-r-2 border-primary-700 dark:border-primary-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Help Section */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-900 dark:text-primary-100">Need Help?</span>
          </div>
          <p className="text-xs text-primary-700 dark:text-primary-300 mb-3">
            Get support or learn how to use Medicare
          </p>
          <button className="w-full bg-primary-600 dark:bg-primary-500 text-white text-xs py-2 px-3 rounded-md hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;