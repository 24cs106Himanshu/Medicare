# Medicare Vercel Deployment Guide

This guide will help you deploy the Medicare healthcare management system to Vercel with serverless backend functions.

## 🚀 Quick Deployment Steps

### 1. Prepare Your Repository

Make sure your project structure looks like this:
```
Medicare/
├── client/
│   ├── api/                    # Serverless functions
│   │   ├── auth/
│   │   │   ├── login.js
│   │   │   └── verify.js
│   │   ├── appointments.js
│   │   ├── prescriptions.js
│   │   └── records.js
│   ├── src/                    # React frontend
│   ├── package.json
│   ├── vercel.json
│   └── ...
└── backend/                    # Local development only
```

### 2. Deploy to Vercel

#### Option A: Deploy from GitHub
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Set the **Root Directory** to `client`
6. Click "Deploy"

#### Option B: Deploy with Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to client folder
cd client

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: medicare-healthcare
# - In which directory is your code located? ./
```

### 3. Configure Environment Variables (Optional)

In your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add any custom variables if needed

### 4. Test Your Deployment

After deployment, test these URLs:
- `https://your-app.vercel.app/` - Should show login page
- `https://your-app.vercel.app/api/auth/login` - API endpoint
- Login with demo accounts and verify dashboard redirect

## 🔧 Technical Details

### Serverless Functions
- **Location**: `client/api/` folder
- **Runtime**: Node.js 18.x
- **Authentication**: JWT tokens
- **Data**: In-memory (resets on each function call)

### Demo Accounts
- **Patient**: `patient@medicare.com` / `password123`
- **Doctor**: `doctor@medicare.com` / `password123`

### API Endpoints
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification
- `GET /api/appointments` - Get appointments
- `GET /api/prescriptions` - Get prescriptions
- `GET /api/records` - Get medical records

## 🎯 Features Working on Vercel

✅ **Authentication**: Login/logout with JWT tokens
✅ **Dashboard Redirect**: Automatic redirect after login
✅ **Role-based Access**: Patient/Doctor dashboards
✅ **Beautiful UI**: All animations and design
✅ **Responsive Design**: Mobile-friendly
✅ **Dark/Light Mode**: Theme switching
✅ **Mock Data**: Appointments, prescriptions, records

## 🔍 Troubleshooting

### Common Issues:

1. **404 on API routes**
   - Check `vercel.json` configuration
   - Ensure API files are in `client/api/` folder

2. **Login not working**
   - Check browser console for errors
   - Verify API endpoints are accessible

3. **Dashboard not loading**
   - Check if token is being stored in localStorage
   - Verify API responses in Network tab

### Debug Steps:
1. Check Vercel function logs in dashboard
2. Test API endpoints directly in browser
3. Check browser console for JavaScript errors
4. Verify network requests in DevTools

## 📱 Mobile Testing

The app is fully responsive. Test on:
- Desktop browsers
- Mobile browsers
- Tablet devices

## 🔒 Security Notes

- JWT tokens expire in 24 hours
- CORS is configured for all origins
- No sensitive data is stored (demo app)
- All API routes require authentication (except login)

## 🎨 UI Features

- **Animated Login**: Beautiful floating icons and transitions
- **Glass Morphism**: Frosted glass effects on cards
- **Gradient Backgrounds**: Medical-themed color schemes
- **Hover Effects**: Interactive elements with smooth animations
- **Loading States**: Elegant loading animations

Your Medicare app will be fully functional on Vercel with all the beautiful animations and features intact!