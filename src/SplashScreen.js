// SplashScreen.js
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Lottie from 'lottie-react';
import animationData from './Animation-1704798623688.json';
import Typography from '@mui/material/Typography';

const SplashScreen = () => {
    const headingStyle = {
        color: 'blue',
      };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <Typography variant="h4" gutterBottom style={headingStyle}>
        Health Monitoring System
    </Typography>
      <Lottie
        animationData={animationData}
        autoplay
        loop
        style={{ width: '50%', height: '50%' }} // Adjust the width and height as needed
      />
      <p style={{ fontSize: '24px', fontWeight: 'bold', animation: 'flash 2s infinite' }}>Please wait.....!</p>
    </div>
  );
};

export default SplashScreen;
