# Medicare Backend Setup - Local Database

## 🚀 Quick Start

### Backend Server
```bash
cd server
node app.js
```
Server runs on: http://localhost:5000

### Frontend Server
```bash
cd client
npm run dev
```
Frontend runs on: http://localhost:5173

## 📋 Demo Accounts

### Patient Account
- **Email:** patient@medicare.com
- **Password:** password123
- **Dashboard:** Patient Dashboard with appointments, prescriptions, medical records

### Doctor Account
- **Email:** doctor@medicare.com
- **Password:** password123
- **Dashboard:** Doctor Dashboard with patient management, appointments, prescriptions

## 🗄️ Database Structure

The backend uses a local JSON file (`server/database.json`) as the database with:

- **Users:** Patient and Doctor accounts with full profile data
- **Appointments:** Sample appointments between patient and doctor
- **Prescriptions:** Active prescriptions with medication details
- **Medical Records:** Patient medical history and consultation notes

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/verify` - Token verification

### Data (Protected Routes)
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/appointments` - User appointments
- `GET /api/prescriptions` - User prescriptions
- `GET /api/records` - Medical records

## ✨ Features

### ✅ Working Features
- **Authentication:** JWT-based login/register
- **Role-based Access:** Patient and Doctor dashboards
- **Local Database:** JSON file storage
- **Dark/Light Mode:** Complete theme switching
- **Responsive Design:** Mobile-friendly interface
- **Demo Data:** Pre-populated with realistic data

### 🔄 Data Flow
1. User logs in with demo credentials
2. JWT token generated and stored
3. Dashboard loads with user-specific data
4. All API calls include authentication token
5. Backend returns filtered data based on user role

## 🎯 Next Steps for MongoDB Integration

When ready to connect to MongoDB:
1. Replace `server/utils/database.js` with MongoDB queries
2. Update connection string in environment variables
3. Migrate data from `database.json` to MongoDB collections
4. Add proper password hashing with bcrypt

## 🛠️ Technical Stack

- **Backend:** Node.js + Express
- **Authentication:** JWT tokens
- **Database:** Local JSON file (temporary)
- **Frontend:** React + Vite
- **Styling:** Tailwind CSS with dark mode
- **Icons:** Lucide React

## 🔍 Testing

1. Visit http://localhost:5173
2. Use demo credentials to login
3. Test both Patient and Doctor dashboards
4. Verify dark/light mode switching
5. Check responsive design on mobile

The system is now fully functional with local data and ready for production database integration!