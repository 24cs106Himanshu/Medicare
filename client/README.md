# Medicare - Healthcare Management System

A beautiful, animated healthcare management system built with React.js frontend and serverless backend, featuring role-based access control for patients and doctors.

## 🌟 Live Demo

**Deploy to Vercel**: [One-click deployment](https://vercel.com/new/clone?repository-url=https://github.com/your-username/Medicare)

**Demo Accounts**:
- **Patient**: `patient@medicare.com` / `password123`
- **Doctor**: `doctor@medicare.com` / `password123`

## ✨ Features

### 🎨 Beautiful Animated UI
- **Glass Morphism Design**: Frosted glass effects with backdrop blur
- **Floating Medical Icons**: Animated heart, stethoscope, and activity icons
- **Smooth Transitions**: 300ms animations on all interactions
- **Gradient Backgrounds**: Medical-themed blue and green gradients
- **Responsive Design**: Perfect on desktop, tablet, and mobile

### 🏥 Healthcare Features
- **Patient Dashboard**: Appointments, prescriptions, medical records
- **Doctor Dashboard**: Patient management, appointment scheduling
- **Role-Based Access**: Different interfaces for patients and doctors
- **Authentication**: Secure JWT-based login system
- **Dark/Light Mode**: Theme toggle for better user experience

## 🚀 Quick Start

### Local Development

1. **Clone and setup**
```bash
git clone https://github.com/your-username/Medicare.git
cd Medicare/client
npm install
npm run dev
```

2. **Open browser**: `http://localhost:5173`

### 🌐 Deploy to Vercel

1. **Push to GitHub** (if not already done)

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set **Root Directory** to `client`
   - Click "Deploy"

3. **That's it!** Your app will be live with serverless backend

📖 **Detailed deployment guide**: [VERCEL_DEPLOYMENT.md](../VERCEL_DEPLOYMENT.md)

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite** - Modern development
- **Tailwind CSS** - Styling with animations
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons
- **JWT** - Authentication

### Backend (Serverless)
- **Vercel Functions** - Serverless API
- **Node.js 18** - Runtime
- **JWT** - Token authentication
- **In-memory data** - Demo data storage

## 📁 Project Structure

```
client/
├── api/                    # Vercel serverless functions
│   ├── auth/              # Authentication endpoints
│   ├── appointments.js    # Appointments API
│   ├── prescriptions.js   # Prescriptions API
│   └── records.js         # Medical records API
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── contexts/         # React contexts
│   └── services/         # API services
├── package.json
└── vercel.json           # Vercel configuration
```

## 🎯 Key Features

### 🔐 Authentication
- Secure JWT-based login
- Role-based access control
- Token verification
- Auto-redirect to appropriate dashboard

### 📊 Patient Dashboard
- **Animated Welcome**: Personalized greeting with floating icons
- **Stats Cards**: Total appointments, active prescriptions, medical records
- **Quick Actions**: Book appointment, view prescriptions, access records
- **Upcoming Appointments**: Interactive appointment cards
- **Recent Prescriptions**: Medication management

### 👨‍⚕️ Doctor Dashboard
- **Professional Interface**: Medical-themed green color scheme
- **Patient Management**: Recent patients with conditions and status
- **Today's Schedule**: Appointment management with time slots
- **Statistics**: Patient count, ratings, records updated
- **Quick Actions**: Schedule management, record creation

### 🎨 Design System
- **Consistent Animations**: Floating, scaling, and transition effects
- **Medical Iconography**: Heart, stethoscope, activity, shield icons
- **Color Psychology**: Trust-building blues and medical greens
- **Glass Morphism**: Modern frosted glass card designs
- **Responsive Layout**: Mobile-first design approach

## 📱 Responsive Design

Works seamlessly across all devices:
- **Desktop**: Full-featured experience with hover effects
- **Tablet**: Optimized layout with touch-friendly interactions
- **Mobile**: Compact design with swipe gestures

## 🔒 Security

- JWT tokens with 24-hour expiration
- CORS configuration for secure API access
- Input validation and sanitization
- No sensitive data storage (demo environment)

## 🎭 Demo Data

Realistic demo data included:
- **2 User accounts** (Patient & Doctor)
- **Sample appointments** with different statuses
- **Mock prescriptions** with medication details
- **Medical records** with diagnoses and treatments

## 🚀 Deployment Options

### Vercel (Recommended)
- **Serverless functions** for backend
- **Automatic deployments** from GitHub
- **Global CDN** for fast loading
- **Zero configuration** required

### Other Platforms
- **Netlify**: Static hosting with serverless functions
- **GitHub Pages**: Static hosting only
- **Firebase Hosting**: Google's hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for healthcare professionals and patients**

*Experience the future of healthcare management with beautiful animations and intuitive design.*