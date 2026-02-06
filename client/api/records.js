// Vercel serverless function for medical records
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'medicare_vercel_secret_2024';

const mockRecords = [
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
    let userRecords = mockRecords;
    
    if (decoded.role === 'patient') {
      userRecords = mockRecords.filter(record => record.patientId === decoded.id);
    } else if (decoded.role === 'doctor') {
      userRecords = mockRecords.filter(record => record.doctorId === decoded.id);
    }
    
    res.json(userRecords);
  } catch (error) {
    console.error('Medical records error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}