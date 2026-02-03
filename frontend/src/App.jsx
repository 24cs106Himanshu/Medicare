import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import PatientDashboard from './pages/dashboard/PatientDashboard';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import AppointmentBooking from './pages/appointments/AppointmentBooking';
import AppointmentDetails from './pages/appointments/AppointmentDetails';
import PrescriptionViewer from './pages/prescriptions/PrescriptionViewer';
import MedicalRecords from './pages/records/MedicalRecords';
import Profile from './pages/profile/Profile';
import NotFound from './pages/NotFound';

// Chatbot
import ChatbotWidget from './components/chatbot/ChatbotWidget';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />

          {/* Protected Dashboard Routes with Layout */}
          <Route element={<Layout />}>
            <Route 
              path="/patient-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/book-appointment" 
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <AppointmentBooking />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/appointments/:id" 
              element={
                <ProtectedRoute>
                  <AppointmentDetails />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/prescriptions" 
              element={
                <ProtectedRoute>
                  <PrescriptionViewer />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/medical-records" 
              element={
                <ProtectedRoute>
                  <MedicalRecords />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Always show chatbot */}
        <ChatbotWidget />
      </div>
    </ThemeProvider>
  );
}

export default App;