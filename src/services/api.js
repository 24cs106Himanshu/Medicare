import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verifyToken: () => api.get('/auth/verify'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// Appointments API
export const appointmentsAPI = {
  getAll: () => api.get('/appointments'),
  create: (data) => api.post('/appointments', data),
  getById: (id) => api.get(`/appointments/${id}`),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  cancel: (id) => api.delete(`/appointments/${id}`),
  getTimeSlots: (doctorId, date) => api.get(`/appointments/time-slots?doctorId=${doctorId}&date=${date}`),
  reschedule: (id, data) => api.put(`/appointments/${id}/reschedule`, data),
};

// Prescriptions API
export const prescriptionsAPI = {
  getAll: () => api.get('/prescriptions'),
  create: (data) => api.post('/prescriptions', data),
  getById: (id) => api.get(`/prescriptions/${id}`),
  update: (id, data) => api.put(`/prescriptions/${id}`, data),
  getByPatient: (patientId) => api.get(`/prescriptions/patient/${patientId}`),
  getByDoctor: (doctorId) => api.get(`/prescriptions/doctor/${doctorId}`),
};

// Medical Records API
export const recordsAPI = {
  getAll: () => api.get('/records'),
  create: (data) => api.post('/records', data),
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
  getAll: (params) => api.get('/doctors', { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  getAvailability: (id, date) => api.get(`/doctors/${id}/availability?date=${date}`),
  updateProfile: (id, data) => api.put(`/doctors/${id}`, data),
  getAppointments: (id, params) => api.get(`/doctors/${id}/appointments`, { params }),
  getPatients: (id) => api.get(`/patients`),
};

// Patients API  
export const patientsAPI = {
  getAll: () => api.get('/patients'),
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

export default api;