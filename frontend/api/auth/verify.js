// Vercel serverless function for token verification
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'medicare_vercel_secret_2024';

const users = {
  '1': {
    id: '1',
    firstName: 'John',
    lastName: 'Patient',
    email: 'patient@medicare.com',
    role: 'patient',
    phone: '+1-555-0123',
    dateOfBirth: '1990-05-15',
    gender: 'male'
  },
  '2': {
    id: '2',
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    email: 'doctor@medicare.com',
    role: 'doctor',
    specialization: 'Cardiology',
    licenseNumber: 'MD123456',
    experience: 8,
    consultationFee: 150
  }
};

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
      return res.status(401).json({
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users[decoded.id];
    
    if (!user) {
      return res.status(401).json({
        message: 'Invalid token'
      });
    }
    
    res.json({
      message: 'Token valid',
      user
    });

  } catch (error) {
    res.status(401).json({
      message: 'Invalid token'
    });
  }
}