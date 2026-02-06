# Medicare - Healthcare Management System

A full-stack healthcare management web application built with React.js, Node.js, Express.js, and MongoDB.

## 🚀 Features

### For Patients
- **User Registration & Authentication** - Secure signup and login
- **Appointment Booking** - Schedule visits with doctors
- **Medical Records** - Access complete health history
- **Prescription Management** - View and track medications
- **AI Medical Assistant** - Get instant health guidance
- **Dashboard** - Overview of health information

### For Doctors
- **Professional Dashboard** - Manage appointments and patients
- **Patient Management** - View patient records and history
- **Prescription Writing** - Create and manage prescriptions
- **Medical Records** - Update patient medical history
- **Appointment Scheduling** - Manage availability and bookings

### For Administrators
- **System Management** - Oversee platform operations
- **User Management** - Manage doctors and patients
- **Analytics & Reports** - System usage and health metrics
- **Security Monitoring** - Track system health and alerts

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Express Validator** - Input validation

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### 1. Clone the Repository
\`\`\`bash
git clone <repository-url>
cd medicare-healthcare-system
\`\`\`

### 2. Install Dependencies
\`\`\`bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
\`\`\`

### 3. Environment Setup
Create a \`.env\` file in the server directory:
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/medicare
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
AI_API_KEY=your_ai_api_key_here
AI_API_URL=https://api.openai.com/v1/chat/completions
\`\`\`

### 4. Start the Application
\`\`\`bash
# Start both frontend and backend (from root directory)
npm run dev

# Or start individually:
# Backend only
cd server && npm run dev

# Frontend only (in another terminal)
cd client && npm run dev
\`\`\`

## 🌐 Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 👥 User Roles & Demo Accounts

### Patient Account
- **Email**: patient@medicare.com
- **Password**: password123
- **Features**: Book appointments, view prescriptions, medical records

### Doctor Account
- **Email**: doctor@medicare.com
- **Password**: password123
- **Features**: Manage patients, write prescriptions, update records

### Admin Account
- **Email**: admin@medicare.com
- **Password**: password123
- **Features**: System management, user oversight, analytics

## 🔧 API Endpoints

### Authentication
- \`POST /api/auth/register\` - User registration
- \`POST /api/auth/login\` - User login
- \`GET /api/auth/profile\` - Get user profile
- \`PUT /api/auth/profile\` - Update profile

### Appointments
- \`GET /api/appointments/time-slots\` - Get available slots
- \`POST /api/appointments\` - Book appointment
- \`GET /api/appointments/:id\` - Get appointment details
- \`PUT /api/appointments/:id\` - Update appointment

### Prescriptions
- \`POST /api/prescriptions\` - Create prescription
- \`GET /api/prescriptions/:id\` - Get prescription
- \`GET /api/prescriptions/patient/:id\` - Get patient prescriptions

### Medical Records
- \`POST /api/records\` - Create medical record
- \`GET /api/records/:id\` - Get record details
- \`GET /api/records/patient/:id\` - Get patient records

### Chatbot
- \`POST /api/chatbot/message\` - Send message to AI assistant
- \`GET /api/chatbot/medical-info\` - Get medical information

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt encryption
- **Role-Based Access Control** - Different permissions per role
- **Input Validation** - Server-side validation
- **Rate Limiting** - API request throttling
- **CORS Protection** - Cross-origin request security
- **Helmet.js** - Security headers

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🤖 AI Medical Assistant

The integrated chatbot provides:
- General health information
- Medication guidance
- Symptom assessment
- Platform navigation help
- Medical disclaimers for safety

## 🚧 Development Status

### Completed Features ✅
- User authentication system
- Role-based dashboards
- Database models and API routes
- Responsive UI components
- AI chatbot integration
- Security implementation

### In Development 🔄
- Advanced appointment booking
- Prescription management UI
- Medical records interface
- File upload functionality
- Email notifications
- Payment integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Medicare** - Simplifying healthcare management for everyone. 🏥💙