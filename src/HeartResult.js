// HeartResult.js
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PatientDetails from './patientDetails';

function HeartResult(props) {
  const { heartHealth, patientId, patientName, withLab, withoutLab, bmi } = props;
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');
  const [textColor, setTextColor] = useState('');

  const handleBackButtonClick = () => {
    setShowPatientDetails(true);
  };

  const handleLogout = () => {
    // Reload the page when the "Log out" button is pressed
    window.location.reload();
  };

  const headingStyle = {
    fontSize: '3em',
    fontWeight: 'bold',
    color: textColor,
    textAlign: 'center',
  };

  const heartHealthStyle = {
    fontSize: '8em',
    fontWeight: 'bold',
    color: textColor,
  };

  // Use useEffect to update the background color based on heartHealth changes
  useEffect(() => {
    if (heartHealth >= 0 && heartHealth <= 700) {
      setBackgroundColor('green');
      setTextColor('white');
    } else if (heartHealth >= 701 && heartHealth <= 1400) {
      setBackgroundColor('yellow');
      setTextColor('blue');
    } else if (heartHealth >= 1401 && heartHealth <= 2100) {
      setBackgroundColor('red');
      setTextColor('white');
    } else {
      setBackgroundColor('white'); // Default background color
      setTextColor('black');
    }
  }, [heartHealth]);

  if (showPatientDetails) {
    // If showPatientDetails is true, render the PatientDetails component
    return <PatientDetails />;
  }

  // Updated return statement to include patient details
  return (
    <div className="centered-container" style={{ backgroundColor }}>
      <header className="App-header">
        <Typography variant="h4" gutterBottom style={headingStyle}>
          Heart Health
        </Typography>
        <div className="form-container">
          <Typography variant="h6" style={heartHealthStyle}>
            {heartHealth}
          </Typography>

          {/* Include patient details */}
          <Typography variant="body1">
            Patient ID: {patientId}
          </Typography>
          <Typography variant="body1">
            Patient Name: {patientName}
          </Typography>
          <Typography variant="body1">
            With Lab: {withLab}
          </Typography>
          <Typography variant="body1">
            Without Lab: {withoutLab}
          </Typography>
          <Typography variant="body1">
            BMI: {bmi}
          </Typography>

          <Button
            variant="contained"
            style={{ marginTop: '16px', marginRight: '30px' }}
            onClick={handleBackButtonClick}
          >
            Back
          </Button>

          <Button
            variant="contained"
            style={{ marginTop: '16px' }}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </header>
    </div>
  );
}

export default HeartResult;
