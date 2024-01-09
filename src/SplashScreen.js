// SplashScreen.js
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const SplashScreen = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress size={60} />
      <p>Loading...</p>
    </div>
  );
};

export default SplashScreen;
