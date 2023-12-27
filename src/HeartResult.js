// HeartResult.js
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PatientDetails from './patientDetails';


function HeartResult(props) {
  const { patientId, heartHealth} = props;
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const handleBackButtonClick = () => {
    setShowPatientDetails(true);
  };
  const labelStyle = {
    color: 'blue',
  };

  const headingStyle = {
    color: 'blue', // Change this color to your desired blue color
  };

  if (showPatientDetails) {
    // If heartHealth is available, render the HeartResult component
    return <PatientDetails/>;
  }


  return (
    <div className="centered-container">
      <header className="App-header">
        <Typography variant="h4" gutterBottom style={headingStyle}>
          Heart Health Monitoring System
        </Typography>
        <div className="form-container">
          <Typography variant="h6" style={headingStyle}>
            Patient ID: {patientId}
          </Typography>
          <Typography variant="h6" style={headingStyle}>
            Heart Health: {heartHealth}
          </Typography>

          <Button
            variant="contained"
            style={{ marginTop: '16px' }}
            onClick={handleBackButtonClick}
          >
            Back
          </Button>
        </div>
      </header>
    </div>
  );
}

export default HeartResult;
