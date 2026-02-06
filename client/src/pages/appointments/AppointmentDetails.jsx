import React from 'react';
import { useParams } from 'react-router-dom';

const AppointmentDetails = () => {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Appointment Details
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Appointment ID: {id}</p>
        <div className="mt-8 text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Appointment details will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;