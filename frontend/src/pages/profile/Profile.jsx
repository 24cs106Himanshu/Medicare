import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Phone, Calendar, MapPin } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Profile</h1>
        <p className="text-gray-600 dark:text-gray-300">Manage your account information</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-6 mb-8">
          <div className="bg-primary-100 dark:bg-primary-900 w-20 h-20 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 capitalize">{user?.role}</p>
            {user?.specialization && (
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.specialization}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
            
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-gray-900 dark:text-white">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="text-gray-900 dark:text-white">{user?.phone || 'Not provided'}</p>
              </div>
            </div>

            {user?.dateOfBirth && (
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</p>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            {user?.gender && (
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Gender</p>
                  <p className="text-gray-900 dark:text-white capitalize">{user.gender}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {user?.role === 'doctor' ? 'Professional Information' : 'Additional Information'}
            </h3>

            {user?.role === 'doctor' && (
              <>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">License Number</p>
                  <p className="text-gray-900 dark:text-white">{user?.licenseNumber || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                  <p className="text-gray-900 dark:text-white">{user?.experience || 0} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Consultation Fee</p>
                  <p className="text-gray-900 dark:text-white">${user?.consultationFee || 0}</p>
                </div>
              </>
            )}

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                <p className="text-gray-900 dark:text-white">
                  {user?.address ? (
                    <>
                      {user.address.street && <span>{user.address.street}<br /></span>}
                      {user.address.city && <span>{user.address.city}, </span>}
                      {user.address.state && <span>{user.address.state} </span>}
                      {user.address.zipCode && <span>{user.address.zipCode}</span>}
                    </>
                  ) : (
                    'Not provided'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button className="bg-primary-600 dark:bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;