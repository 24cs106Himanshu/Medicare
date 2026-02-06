// Vercel serverless function for login
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'medicare_vercel_secret_2024';

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

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

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
}