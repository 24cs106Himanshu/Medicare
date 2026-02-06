# Medicare Simple Backend

A lightweight Node.js backend for Medicare healthcare management system that handles authentication and basic dashboard functionality.

## Features

- User authentication (login/register)
- JWT token-based security
- Role-based access (Patient/Doctor)
- Mock data for dashboard functionality
- Simple API endpoints for appointments, prescriptions, and medical records

## Demo Accounts

- **Patient**: patient@medicare.com / password123
- **Doctor**: doctor@medicare.com / password123

## Installation

```bash
cd backend
npm install
```

## Start Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `GET /api/auth/verify` - Verify JWT token

### Dashboard Data
- `GET /api/appointments` - Get user appointments
- `GET /api/prescriptions` - Get user prescriptions
- `GET /api/records` - Get user medical records
- `GET /api/dashboard/stats` - Get dashboard statistics
- `POST /api/appointments` - Create new appointment

### Health Check
- `GET /api/health` - Server health status

## Server Details

- **Port**: 3001
- **CORS**: Enabled for localhost:5173 and localhost:3000
- **JWT**: 24-hour token expiration
- **Data**: In-memory mock data (resets on server restart)

This is a simplified backend focused on authentication and basic dashboard functionality.