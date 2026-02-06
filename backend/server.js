const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'medicare_simple_secret_2024';

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Demo users
const users = {
  'patient@medicare.com': {
    id: '1',
    firstName: 'John',
    lastName: 'Patient',
    email: 'patient@medicare.com',
    password: 'password123',
    role: 'patient',
    phone: '+1-555-0123',
    dateOfBirth: '1990-05-15',
    gender: 'male'
  },
  'doctor@medicare.com': {
    id: '2',
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'doctor@medicare.com',
    password: 'password123',
    role: 'doctor',
    specialization: 'Cardiology',
    licenseNumber: 'MD123456',
    experience: 8,
    consultationFee: 150
  }
};

// Mock data for dashboard
const mockData = {
  appointments: [
    {
      id: '1',
      patientId: '1',
      doctorId: '2',
      patientName: 'John Patient',
      doctorName: 'Dr. Sarah Johnson',
      doctorSpecialization: 'Cardiology',
      date: '2024-02-15',
      time: '10:00 AM',
      type: 'Regular Checkup',
      status: 'confirmed',
      notes: 'Annual physical examination'
    },
    {
      id: '2',
      patientId: '1',
      doctorId: '2',
      patientName: 'John Patient',
      doctorName: 'Dr. Sarah Johnson',
      doctorSpecialization: 'Cardiology',
      date: '2024-02-20',
      time: '2:30 PM',
      type: 'Follow-up',
      status: 'pending',
      notes: 'Follow-up for blood pressure monitoring'
    }
  ],
  prescriptions: [
    {
      id: '1',
      patientId: '1',
      doctorId: '2',
      patientName: 'John Patient',
      doctorName: 'Dr. Sarah Johnson',
      medication: 'Lisinopril 10mg',
      dosage: 'Once daily',
      duration: '30 days',
      instructions: 'Take with food in the morning',
      status: 'Active',
      prescribedDate: '2024-01-15'
    },
    {
      id: '2',
      patientId: '1',
      doctorId: '2',
      patientName: 'John Patient',
      doctorName: 'Dr. Sarah Johnson',
      medication: 'Metformin 500mg',
      dosage: 'Twice daily',
      duration: '90 days',
      instructions: 'Take with meals',
      status: 'Active',
      prescribedDate: '2024-01-10'
    }
  ],
  medicalRecords: [
    {
      id: '1',
      patientId: '1',
      doctorId: '2',
      patientName: 'John Patient',
      doctorName: 'Dr. Sarah Johnson',
      title: 'Annual Physical Examination',
      type: 'consultation',
      date: '2024-01-28',
      diagnosis: 'Hypertension, well controlled',
      symptoms: 'No acute symptoms',
      treatment: 'Continue current medication',
      notes: 'Patient reports feeling well. Blood pressure stable.'
    },
    {
      id: '2',
      patientId: '1',
      doctorId: '2',
      patientName: 'John Patient',
      doctorName: 'Dr. Sarah Johnson',
      title: 'Blood Work Results',
      type: 'lab-result',
      date: '2024-01-20',
      diagnosis: 'Normal glucose levels',
      symptoms: 'Routine screening',
      treatment: 'No treatment needed',
      notes: 'All lab values within normal range'
    }
  ]
};

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Auth middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Medicare Simple Backend is running!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Medicare API is running',
    timestamp: new Date().toISOString()
  });
});

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const user = users[email];
    if (!user || password !== user.password) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// Register (simple version)
app.post('/api/auth/register', (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }

    if (users[email]) {
      return res.status(409).json({
        message: 'User with this email already exists'
      });
    }

    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password,
      role,
      ...req.body
    };

    users[email] = newUser;
    const token = generateToken(newUser);
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

// Verify token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  try {
    const userEmail = Object.keys(users).find(email => users[email].id === req.user.id);
    const user = users[userEmail];
    
    if (!user) {
      return res.status(401).json({
        message: 'Invalid token'
      });
    }

    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      message: 'Token valid',
      user: userWithoutPassword
    });

  } catch (error) {
    res.status(401).json({
      message: 'Invalid token'
    });
  }
});

// Get appointments
app.get('/api/appointments', authenticateToken, (req, res) => {
  try {
    let userAppointments = mockData.appointments;
    
    if (req.user.role === 'patient') {
      userAppointments = mockData.appointments.filter(apt => apt.patientId === req.user.id);
    } else if (req.user.role === 'doctor') {
      userAppointments = mockData.appointments.filter(apt => apt.doctorId === req.user.id);
    }
    
    res.json(userAppointments);
  } catch (error) {
    console.error('Appointments error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get prescriptions
app.get('/api/prescriptions', authenticateToken, (req, res) => {
  try {
    let userPrescriptions = mockData.prescriptions;
    
    if (req.user.role === 'patient') {
      userPrescriptions = mockData.prescriptions.filter(pres => pres.patientId === req.user.id);
    } else if (req.user.role === 'doctor') {
      userPrescriptions = mockData.prescriptions.filter(pres => pres.doctorId === req.user.id);
    }
    
    res.json(userPrescriptions);
  } catch (error) {
    console.error('Prescriptions error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get medical records
app.get('/api/records', authenticateToken, (req, res) => {
  try {
    let userRecords = mockData.medicalRecords;
    
    if (req.user.role === 'patient') {
      userRecords = mockData.medicalRecords.filter(record => record.patientId === req.user.id);
    } else if (req.user.role === 'doctor') {
      userRecords = mockData.medicalRecords.filter(record => record.doctorId === req.user.id);
    }
    
    res.json(userRecords);
  } catch (error) {
    console.error('Medical records error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get dashboard stats
app.get('/api/dashboard/stats', authenticateToken, (req, res) => {
  try {
    const appointments = mockData.appointments.filter(apt => 
      req.user.role === 'patient' ? apt.patientId === req.user.id : apt.doctorId === req.user.id
    );
    const prescriptions = mockData.prescriptions.filter(pres => 
      req.user.role === 'patient' ? pres.patientId === req.user.id : pres.doctorId === req.user.id
    );
    const records = mockData.medicalRecords.filter(record => 
      req.user.role === 'patient' ? record.patientId === req.user.id : record.doctorId === req.user.id
    );

    if (req.user.role === 'patient') {
      res.json({
        totalAppointments: appointments.length,
        activePrescriptions: prescriptions.filter(p => p.status === 'Active').length,
        medicalRecords: records.length,
        upcomingAppointments: appointments.filter(a => new Date(a.date) > new Date()).length
      });
    } else if (req.user.role === 'doctor') {
      res.json({
        todayAppointments: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
        totalPatients: 156, // Mock number
        activePrescriptions: prescriptions.filter(p => p.status === 'Active').length,
        recordsUpdated: 42 // Mock number
      });
    }
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create appointment (simple)
app.post('/api/appointments', authenticateToken, (req, res) => {
  try {
    const { doctorId, date, time, type, notes } = req.body;
    
    const newAppointment = {
      id: Date.now().toString(),
      patientId: req.user.id,
      doctorId,
      patientName: req.user.role === 'patient' ? `${req.user.firstName} ${req.user.lastName}` : 'Patient Name',
      doctorName: 'Dr. Sarah Johnson', // Mock
      doctorSpecialization: 'Cardiology', // Mock
      date,
      time,
      type,
      status: 'pending',
      notes: notes || ''
    };

    mockData.appointments.push(newAppointment);
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`✅ Medicare Simple Backend running on port ${PORT}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👤 Demo Accounts:`);
  console.log(`   Patient: patient@medicare.com / password123`);
  console.log(`   Doctor: doctor@medicare.com / password123`);
});

module.exports = app;