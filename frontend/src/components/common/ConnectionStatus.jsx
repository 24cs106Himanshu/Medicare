import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setIsConnected(data.status === 'OK');
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.log('Backend connection check failed:', error);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial check
    checkConnection();
    
    // Check every 10 seconds
    const interval = setInterval(checkConnection, 10000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 z-50 px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2 text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
        <span>Checking Backend...</span>
      </div>
    );
  }

  return (
    <div className={`fixed top-4 right-4 z-50 px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2 text-sm transition-all duration-300 cursor-pointer ${
      isConnected 
        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700'
        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700'
    }`} onClick={() => window.open('http://localhost:5000/api/health', '_blank')}>
      {isConnected ? (
        <>
          <Wifi className="w-4 h-4" />
          <span>Backend Online</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4" />
          <span>Backend Offline</span>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;