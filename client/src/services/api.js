import axios from 'axios';
import { mockAPI, isMockMode } from './mockApi';

const API_BASE_URL = import.meta.env.VITE_API_URL || (
  typeof window !== 'undefined' && window.location.origin.includes('vercel.app') 
    ? `${window.location.origin}/api` 
    : 'http://localhost:3001/api'
);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to handle API calls with fallback to mock
const apiCall = async (apiFunction, mockFunction) => {
  try {
    return await apiFunction();
  } catch (error) {
    console.warn('API call failed, falling back to mock data:', error.message);
    if (isMockMode()) {
      return await mockFunction();
    }
    throw error; // Re-throw if not in mock mode
  }
};

// Auth API
export const authAPI = {
  login: (credentials) => apiCall(
    () => api.post('/auth/login', credentials),
    () => mockAPI.login(credentials)
  ),
  register: (userData) => apiCall(
    () => api.post('/auth/register', userData),
    () => mockAPI.register(userData)
  ),
  verifyToken: () => apiCall(
    () => api.get('/auth/verify'),
    () => mockAPI.verifyToken()
  ),
  getProfile: () => apiCall(
    () => api.get('/auth/profile'),
    () => mockAPI.getProfile()
  ),
  updateProfile: (data) => apiCall(
    () => api.put('/auth/profile', data),
    () => mockAPI.updateProfile(data)
  ),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// Appointments API
export const appointmentsAPI = {
  getAll: () => apiCall(
    () => api.get('/appointments'),
    () => mockAPI.getAppointments()
  ),
  create: (data) => apiCall(
    () => api.post('/appointments', data),
    () => mockAPI.createAppointment(data)
  ),
  getById: (id) => api.get(`/appointments/${id}`),
  update: (id, data) => apiCall(
    () => api.put(`/appointments/${id}`, data),
    () => mockAPI.updateAppointment(id, data)
  ),
  cancel: (id) => api.delete(`/appointments/${id}`),
  getTimeSlots: (doctorId, date) => api.get(`/appointments/time-slots?doctorId=${doctorId}&date=${date}`),
  reschedule: (id, data) => api.put(`/appointments/${id}/reschedule`, data),
};

// Prescriptions API
export const prescriptionsAPI = {
  getAll: () => apiCall(
    () => api.get('/prescriptions'),
    () => mockAPI.getPrescriptions()
  ),
  create: (data) => apiCall(
    () => api.post('/prescriptions', data),
    () => mockAPI.createPrescription(data)
  ),
  getById: (id) => api.get(`/prescriptions/${id}`),
  update: (id, data) => apiCall(
    () => api.put(`/prescriptions/${id}`, data),
    () => mockAPI.updatePrescription(id, data)
  ),
  getByPatient: (patientId) => api.get(`/prescriptions/patient/${patientId}`),
  getByDoctor: (doctorId) => api.get(`/prescriptions/doctor/${doctorId}`),
};

// Medical Records API
export const recordsAPI = {
  getAll: () => apiCall(
    () => api.get('/records'),
    () => mockAPI.getRecords()
  ),
  create: (data) => apiCall(
    () => api.post('/records', data),
    () => mockAPI.createRecord(data)
  ),
  getById: (id) => api.get(`/records/${id}`),
  update: (id, data) => api.put(`/records/${id}`, data),
  getByPatient: (patientId) => api.get(`/records/patient/${patientId}`),
  getByDoctor: (doctorId) => api.get(`/records/doctor/${doctorId}`),
  uploadFile: (recordId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/records/${recordId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Doctors API
export const doctorsAPI = {
  getAll: (params) => apiCall(
    () => api.get('/doctors', { params }),
    () => mockAPI.getDoctors()
  ),
  getById: (id) => api.get(`/doctors/${id}`),
  getAvailability: (id, date) => api.get(`/doctors/${id}/availability?date=${date}`),
  updateProfile: (id, data) => api.put(`/doctors/${id}`, data),
  getAppointments: (id, params) => api.get(`/doctors/${id}/appointments`, { params }),
  getPatients: (id) => apiCall(
    () => api.get(`/patients`),
    () => mockAPI.getPatients()
  ),
};

// Patients API  
export const patientsAPI = {
  getAll: () => apiCall(
    () => api.get('/patients'),
    () => mockAPI.getPatients()
  ),
  getProfile: (id) => api.get(`/patients/${id}`),
  updateProfile: (id, data) => api.put(`/patients/${id}`, data),
  getMedicalHistory: (id) => api.get(`/patients/${id}/medical-history`),
  getPrescriptions: (id) => api.get(`/patients/${id}/prescriptions`),
  getAppointments: (id) => api.get(`/patients/${id}/appointments`),
};

// Chatbot API
export const chatbotAPI = {
  sendMessage: (message) => api.post('/chatbot/message', { message }),
  getHistory: () => api.get('/chatbot/history'),
  clearHistory: () => api.delete('/chatbot/history'),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => apiCall(
    () => api.get('/dashboard/stats'),
    () => mockAPI.getDashboardStats()
  ),
};

export default api;