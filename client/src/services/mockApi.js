// Mock API for Vercel deployment when backend is not available
const MOCK_MODE = false; // Always use real API since we have a simple backend

const mockUsers = {
  'patient@medicare.com': {
    id: '1',
    firstName: 'John',
    lastName: 'Patient',
    email: 'patient@medicare.com',
    role: 'patient',
    phone: '+1-555-0123',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    address: '123 Main St, City, State 12345'
  },
  'doctor@medicare.com': {
    id: '2',
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'doctor@medicare.com',
    role: 'doctor',
    specialization: 'Cardiology',
    licenseNumber: 'MD123456',
    experience: 8,
    consultationFee: 150,
    phone: '+1-555-0456',
    address: '456 Medical Center Dr, City, State 12345'
  },
  'admin@medicare.com': {
    id: '3',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@medicare.com',
    role: 'admin',
    phone: '+1-555-0789',
    address: '789 Admin Blvd, City, State 12345'
  }
};

const mockAppointments = [
  {
    id: '1',
    patientId: '1',
    doctorId: '2',
    date: '2024-02-15',
    time: '10:00 AM',
    type: 'Regular Checkup',
    status: 'confirmed',
    doctorName: 'Dr. Sarah Johnson',
    patientName: 'John Patient',
    doctorSpecialization: 'Cardiology',
    notes: 'Annual physical examination'
  },
  {
    id: '2',
    patientId: '1',
    doctorId: '2',
    date: '2024-02-20',
    time: '2:30 PM',
    type: 'Follow-up',
    status: 'pending',
    doctorName: 'Dr. Sarah Johnson',
    patientName: 'John Patient',
    doctorSpecialization: 'Cardiology',
    notes: 'Follow-up for blood pressure monitoring'
  }
];

const mockPrescriptions = [
  {
    id: '1',
    patientId: '1',
    doctorId: '2',
    medication: 'Lisinopril 10mg',
    dosage: 'Once daily',
    duration: '30 days',
    status: 'Active',
    doctorName: 'Dr. Sarah Johnson',
    patientName: 'John Patient',
    prescribedDate: '2024-01-15',
    instructions: 'Take with food in the morning'
  },
  {
    id: '2',
    patientId: '1',
    doctorId: '2',
    medication: 'Metformin 500mg',
    dosage: 'Twice daily',
    duration: '90 days',
    status: 'Active',
    doctorName: 'Dr. Sarah Johnson',
    patientName: 'John Patient',
    prescribedDate: '2024-01-10',
    instructions: 'Take with meals'
  }
];

const mockRecords = [
  {
    id: '1',
    patientId: '1',
    doctorId: '2',
    title: 'Annual Physical Examination',
    type: 'consultation',
    date: '2024-01-28',
    doctorName: 'Dr. Sarah Johnson',
    patientName: 'John Patient',
    diagnosis: 'Hypertension, Type 2 Diabetes',
    symptoms: 'Elevated blood pressure, increased thirst',
    treatment: 'Prescribed Lisinopril and Metformin',
    notes: 'Patient advised to monitor blood pressure daily'
  },
  {
    id: '2',
    patientId: '1',
    doctorId: '2',
    title: 'Blood Work Results',
    type: 'lab-result',
    date: '2024-01-20',
    doctorName: 'Dr. Sarah Johnson',
    patientName: 'John Patient',
    diagnosis: 'Elevated glucose levels',
    symptoms: 'None reported',
    treatment: 'Dietary modifications recommended',
    notes: 'HbA1c: 7.2%, Glucose: 145 mg/dL'
  }
];

const mockDoctors = [
  {
    id: '2',
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'doctor@medicare.com',
    role: 'doctor',
    specialization: 'Cardiology',
    licenseNumber: 'MD123456',
    experience: 8,
    consultationFee: 150,
    phone: '+1-555-0456',
    address: '456 Medical Center Dr, City, State 12345'
  },
  {
    id: '4',
    firstName: 'Dr. Michael',
    lastName: 'Smith',
    email: 'doctor2@medicare.com',
    role: 'doctor',
    specialization: 'Neurology',
    licenseNumber: 'MD789012',
    experience: 12,
    consultationFee: 200,
    phone: '+1-555-0321',
    address: '321 Neuro Center Ave, City, State 12345'
  }
];

const mockPatients = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Patient',
    email: 'patient@medicare.com',
    role: 'patient',
    phone: '+1-555-0123',
    dateOfBirth: '1990-05-15',
    gender: 'male',
    address: '123 Main St, City, State 12345',
    lastVisit: '2024-01-28',
    lastVisitType: 'Regular Checkup'
  }
];

export const mockAPI = {
  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    const user = mockUsers[credentials.email];
    if (user && credentials.password === 'password123') {
      return {
        data: {
          message: 'Login successful',
          token: 'mock_jwt_token_' + Date.now(),
          user
        }
      };
    }
    throw new Error('Invalid credentials');
  },

  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockUsers[userData.email]) {
      throw new Error('User with this email already exists');
    }
    
    const newUser = {
      id: (Object.keys(mockUsers).length + 1).toString(),
      ...userData
    };
    
    mockUsers[userData.email] = newUser;
    
    return {
      data: {
        message: 'Registration successful',
        token: 'mock_jwt_token_' + Date.now(),
        user: newUser
      }
    };
  },

  verifyToken: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get user from localStorage or default to patient
    const token = localStorage.getItem('token');
    if (token && token.startsWith('mock_jwt_token_')) {
      // Try to get the last logged in user from localStorage
      const lastUser = localStorage.getItem('lastLoggedInUser');
      if (lastUser) {
        const user = JSON.parse(lastUser);
        return {
          data: {
            message: 'Token valid',
            user
          }
        };
      }
    }
    
    return {
      data: {
        message: 'Token valid',
        user: mockUsers['patient@medicare.com'] // Default to patient
      }
    };
  },

  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const lastUser = localStorage.getItem('lastLoggedInUser');
    const user = lastUser ? JSON.parse(lastUser) : mockUsers['patient@medicare.com'];
    return { data: user };
  },

  updateProfile: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const lastUser = localStorage.getItem('lastLoggedInUser');
    const user = lastUser ? JSON.parse(lastUser) : mockUsers['patient@medicare.com'];
    const updatedUser = { ...user, ...data };
    localStorage.setItem('lastLoggedInUser', JSON.stringify(updatedUser));
    return { data: updatedUser };
  },

  getAppointments: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const lastUser = localStorage.getItem('lastLoggedInUser');
    const user = lastUser ? JSON.parse(lastUser) : mockUsers['patient@medicare.com'];
    
    let userAppointments = mockAppointments;
    if (user.role === 'patient') {
      userAppointments = mockAppointments.filter(apt => apt.patientId === user.id);
    } else if (user.role === 'doctor') {
      userAppointments = mockAppointments.filter(apt => apt.doctorId === user.id);
    }
    
    return { data: userAppointments };
  },

  createAppointment: async (appointmentData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newAppointment = {
      id: (mockAppointments.length + 1).toString(),
      ...appointmentData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    mockAppointments.push(newAppointment);
    return { data: newAppointment };
  },

  updateAppointment: async (id, data) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const appointmentIndex = mockAppointments.findIndex(apt => apt.id === id);
    if (appointmentIndex !== -1) {
      mockAppointments[appointmentIndex] = { ...mockAppointments[appointmentIndex], ...data };
      return { data: mockAppointments[appointmentIndex] };
    }
    throw new Error('Appointment not found');
  },

  getPrescriptions: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const lastUser = localStorage.getItem('lastLoggedInUser');
    const user = lastUser ? JSON.parse(lastUser) : mockUsers['patient@medicare.com'];
    
    let userPrescriptions = mockPrescriptions;
    if (user.role === 'patient') {
      userPrescriptions = mockPrescriptions.filter(pres => pres.patientId === user.id);
    } else if (user.role === 'doctor') {
      userPrescriptions = mockPrescriptions.filter(pres => pres.doctorId === user.id);
    }
    
    return { data: userPrescriptions };
  },

  createPrescription: async (prescriptionData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newPrescription = {
      id: (mockPrescriptions.length + 1).toString(),
      ...prescriptionData,
      status: 'Active',
      prescribedDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    mockPrescriptions.push(newPrescription);
    return { data: newPrescription };
  },

  updatePrescription: async (id, data) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const prescriptionIndex = mockPrescriptions.findIndex(pres => pres.id === id);
    if (prescriptionIndex !== -1) {
      mockPrescriptions[prescriptionIndex] = { ...mockPrescriptions[prescriptionIndex], ...data };
      return { data: mockPrescriptions[prescriptionIndex] };
    }
    throw new Error('Prescription not found');
  },

  getRecords: async () => {
    await new Promise(resolve => setTimeout(resolve, 700));
    const lastUser = localStorage.getItem('lastLoggedInUser');
    const user = lastUser ? JSON.parse(lastUser) : mockUsers['patient@medicare.com'];
    
    let userRecords = mockRecords;
    if (user.role === 'patient') {
      userRecords = mockRecords.filter(record => record.patientId === user.id);
    } else if (user.role === 'doctor') {
      userRecords = mockRecords.filter(record => record.doctorId === user.id);
    }
    
    return { data: userRecords };
  },

  createRecord: async (recordData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newRecord = {
      id: (mockRecords.length + 1).toString(),
      ...recordData,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    mockRecords.push(newRecord);
    return { data: newRecord };
  },

  getDoctors: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockDoctors };
  },

  getPatients: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockPatients };
  },

  getDashboardStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const lastUser = localStorage.getItem('lastLoggedInUser');
    const user = lastUser ? JSON.parse(lastUser) : mockUsers['patient@medicare.com'];
    
    if (user.role === 'patient') {
      return {
        data: {
          totalAppointments: mockAppointments.filter(apt => apt.patientId === user.id).length,
          upcomingAppointments: mockAppointments.filter(apt => apt.patientId === user.id && apt.status === 'confirmed').length,
          activePrescriptions: mockPrescriptions.filter(pres => pres.patientId === user.id && pres.status === 'Active').length,
          medicalRecords: mockRecords.filter(record => record.patientId === user.id).length
        }
      };
    } else if (user.role === 'doctor') {
      return {
        data: {
          totalPatients: mockPatients.length,
          todayAppointments: mockAppointments.filter(apt => apt.doctorId === user.id && apt.date === new Date().toISOString().split('T')[0]).length,
          totalAppointments: mockAppointments.filter(apt => apt.doctorId === user.id).length,
          activePrescriptions: mockPrescriptions.filter(pres => pres.doctorId === user.id && pres.status === 'Active').length
        }
      };
    }
    
    return { data: {} };
  }
};

export const isMockMode = () => MOCK_MODE;