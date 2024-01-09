// HeartResult.js
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
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
    color: 'blue',
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

// Updated return statement with the centering
return (
  <div className="centered-container" style={{ backgroundColor, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', overflow: 'hidden' }}>
    <header className="App-header">
      <Typography variant="h4" gutterBottom style={headingStyle}>
        Heart Health
      </Typography>
      <div className="form-container" style={{ textAlign: 'center', width: '100%' }}>

        {/* Include patient details in a vertical table */}
        <TableContainer
          component={Paper}
          sx={{
            margin: 'auto',
            width: 'fit-content',
            boxShadow: 'none',
            border: '1px solid black',
            '& td, & th': {
              fontSize: '0.9em',
              fontWeight: 'bold',
            },
          }}
>
          <Table aria-label="patient details">
            <TableBody>
              <TableRow>
                <TableCell variant="head">Name :</TableCell>
                <TableCell align="left">{patientName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">WithLab :</TableCell>
                <TableCell align="left">{withLab.toFixed(4)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">WithoutLab :</TableCell>
                <TableCell align="left">{withoutLab.toFixed(4)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">BMI :</TableCell>
                <TableCell align="left">{bmi.toFixed(4)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

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
