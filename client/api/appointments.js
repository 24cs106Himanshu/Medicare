// Vercel serverless function for appointments
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'medicare_vercel_secret_2024';

const mockAppointments = [
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
];

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (req.method === 'GET') {
      let userAppointments = mockAppointments;
      
      if (decoded.role === 'patient') {
        userAppointments = mockAppointments.filter(apt => apt.patientId === decoded.id);
      } else if (decoded.role === 'doctor') {
        userAppointments = mockAppointments.filter(apt => apt.doctorId === decoded.id);
      }
      
      res.json(userAppointments);
    } else if (req.method === 'POST') {
      const { doctorId, date, time, type, notes } = req.body;
      
      const newAppointment = {
        id: Date.now().toString(),
        patientId: decoded.id,
        doctorId,
        patientName: decoded.role === 'patient' ? 'Patient Name' : 'Patient Name',
        doctorName: 'Dr. Sarah Johnson',
        doctorSpecialization: 'Cardiology',
        date,
        time,
        type,
        status: 'pending',
        notes: notes || ''
      };

      res.status(201).json(newAppointment);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Appointments error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}