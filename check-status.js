const http = require('http');

// Check backend health
const checkBackend = () => {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:5000/api/health', (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });
    
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
};

// Check frontend
const checkFrontend = () => {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:5173', (res) => {
      resolve({ status: res.statusCode, message: 'Frontend is running' });
    });
    
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
};

async function checkStatus() {
  console.log('🏥 Medicare Healthcare System - Status Check\n');
  
  try {
    // Check Backend
    console.log('🔍 Checking Backend API...');
    const backendStatus = await checkBackend();
    console.log('✅ Backend:', backendStatus.message);
    
    // Check Frontend
    console.log('🔍 Checking Frontend...');
    const frontendStatus = await checkFrontend();
    console.log('✅ Frontend: Running on port 5173');
    
    console.log('\n🎉 All systems are operational!');
    console.log('\n📱 Access your application:');
    console.log('   Frontend: http://localhost:5173');
    console.log('   Backend:  http://localhost:5000');
    console.log('\n👥 Demo accounts:');
    console.log('   Patient: patient@medicare.com / password123');
    console.log('   Doctor:  doctor@medicare.com / password123');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkStatus();