// Vercel serverless function for prescriptions
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'medicare_vercel_secret_2024';

const mockPrescriptions = [
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
];

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    let userPrescriptions = mockPrescriptions;
    
    if (decoded.role === 'patient') {
      userPrescriptions = mockPrescriptions.filter(pres => pres.patientId === decoded.id);
    } else if (decoded.role === 'doctor') {
      userPrescriptions = mockPrescriptions.filter(pres => pres.doctorId === decoded.id);
    }
    
    res.json(userPrescriptions);
  } catch (error) {
    console.error('Prescriptions error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}