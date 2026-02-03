# Medicare - Healthcare Management System Frontend

A modern, responsive React frontend for the Medicare healthcare management system with complete authentication, role-based access control, and dark/light mode support.

## 🚀 Features

### ✅ **Authentication & Authorization**
- JWT token-based authentication
- Role-based access control (Patient/Doctor/Admin)
- Protected routes with automatic redirects
- Demo accounts for testing

### ✅ **User Dashboards**
- **Patient Dashboard:** View appointments, prescriptions, medical records
- **Doctor Dashboard:** Manage patients, appointments, prescriptions
- **Admin Dashboard:** System overview and management tools
- Real-time data integration with backend API

### ✅ **Modern UI/UX**
- **Dark/Light Mode:** Complete theme switching
- **Responsive Design:** Mobile-first approach
- **Modern Components:** Built with Tailwind CSS
- **Icons:** Lucide React icon library
- **Animations:** Smooth transitions and loading states

### ✅ **Technical Features**
- React 18 + Vite for fast development
- React Router for navigation
- Context API for state management
- Axios for API communication
- React Hot Toast for notifications
- React Query for data fetching

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Data Fetching:** React Query

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Demo Accounts

### Patient Account
- **Email:** patient@medicare.com
- **Password:** password123
- **Access:** Patient dashboard, appointments, prescriptions, medical records

### Doctor Account
- **Email:** doctor@medicare.com
- **Password:** password123
- **Access:** Doctor dashboard, patient management, prescriptions, medical records

## 🎯 Key Components

### Authentication
- `LoginPage.jsx` - User login with demo account quick-fill
- `RegisterPage.jsx` - User registration with role selection
- `AuthContext.jsx` - Authentication state management
- `ProtectedRoute.jsx` - Route protection and role validation

### Dashboards
- `PatientDashboard.jsx` - Patient overview with stats and appointments
- `DoctorDashboard.jsx` - Doctor interface with patient management
- `AdminDashboard.jsx` - System administration interface

### Layout
- `Layout.jsx` - Main application layout wrapper
- `Header.jsx` - Navigation header with user menu and theme toggle
- `Sidebar.jsx` - Role-based navigation sidebar

### Features
- `ThemeContext.jsx` - Dark/light mode management
- `api.js` - Centralized API service layer
- `ChatbotWidget.jsx` - AI assistant interface

## 🎨 Theme System

The application supports both dark and light themes with:
- Automatic system preference detection
- Manual theme switching
- Persistent theme selection
- Complete component coverage
- Smooth transitions

## 📱 Responsive Design

- **Mobile First:** Optimized for mobile devices
- **Tablet Support:** Adapted layouts for tablets
- **Desktop:** Full-featured desktop experience
- **Touch Friendly:** Large touch targets and gestures

## 🔒 Security Features

- JWT token validation
- Automatic token refresh
- Protected route access
- Role-based permissions
- Secure API communication

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy the dist folder to your hosting service
```

## 📊 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── chatbot/        # AI chatbot widget
│   ├── common/         # Common components (buttons, modals, etc.)
│   └── layout/         # Layout components (header, sidebar)
├── contexts/           # React Context providers
├── pages/              # Page components
│   ├── auth/          # Authentication pages
│   ├── dashboard/     # Dashboard pages
│   ├── appointments/  # Appointment management
│   ├── prescriptions/ # Prescription management
│   ├── records/       # Medical records
│   └── profile/       # User profile
├── services/          # API services
└── styles/            # Global styles and Tailwind config
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the demo accounts and test data

---

**Built with ❤️ for modern healthcare management**