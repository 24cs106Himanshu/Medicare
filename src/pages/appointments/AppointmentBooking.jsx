import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const AppointmentBooking = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Book Appointment</h1>
        <p className="text-gray-600 dark:text-gray-300">Schedule a visit with your preferred doctor</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Appointment Booking System
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This feature is under development. You'll be able to:
          </p>
          <div className="text-left max-w-md mx-auto space-y-2">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <User className="w-5 h-5 mr-3 text-primary-600 dark:text-primary-400" />
              Select your preferred doctor
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="w-5 h-5 mr-3 text-primary-600 dark:text-primary-400" />
              Choose available dates
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="w-5 h-5 mr-3 text-primary-600 dark:text-primary-400" />
              Pick convenient time slots
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;