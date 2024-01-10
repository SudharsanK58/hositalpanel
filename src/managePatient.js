// managePatient.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import PatientDetails from './patientDetails';

const ManagePatient = () => {
const [viewDetails, setViewDetails] = useState(false);
  const buttonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '250px',
    height: '250px',
  };

  const textStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
  };
  const handleAddPatientClick = () => {
    // Set viewDetails to true when Add Patient button is clicked
    setViewDetails(true);
  };

  if (viewDetails) {
    // If viewDetails is true, render the PatientDetails component
    return <PatientDetails />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Button color="primary" size="large" style={buttonStyle} onClick={handleAddPatientClick}>
          <PersonAddIcon style={{ fontSize: '6em', marginBottom: '5px' }} />
          <span style={textStyle}>Add Patient</span>
        </Button>

        <Button color="primary" size="large" style={{ ...buttonStyle, marginLeft: '10px' }}>
          <GroupsIcon style={{ fontSize: '6em', marginBottom: '5px' }} />
          <span style={textStyle}>View Patient</span>
        </Button>
      </div>
    </div>
  );
}

export default ManagePatient;
