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
  const [addNewPatient, setaddNewPatient] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');
  const [textColor, setTextColor] = useState('');

  const handleNewPatient = () => {
    setaddNewPatient(true);
  };

  const handleBackButtonClick = () => {
    setShowPatientDetails(true);
  };

  const handleLogout = () => {
    // Reload the page when the "Log out" button is pressed
    window.location.reload();
  };

  const headingStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  };
  if (showPatientDetails) {
    // If showPatientDetails is true, render the PatientDetails component
    return <PatientDetails newPatient={true} patientId={patientId} />;
  }
  if (addNewPatient) {
    // If showPatientDetails is true, render the PatientDetails component
    return <PatientDetails newPatient={false} patientId={1001} />;
  }

// Updated return statement with the centering
return (
  <div className="centered-container" style={{ backgroundColor, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', overflow: 'hidden' }}>
    <header className="App-header">
      <Typography variant="h4" gutterBottom style={headingStyle}>
        Health Result
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
              fontSize: '1.4em',
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
              <TableRow
                sx = {
                  withLab < 150
                    ? { backgroundColor: 'green', '& *': { color: 'white' } }
                    : withLab >= 150 && withLab <= 260
                    ? { backgroundColor: 'yellow' }
                    : withLab > 260
                    ? { backgroundColor: 'red', '& *': { color: 'white' } }
                    : {}
                }
              >
                <TableCell variant="head">WithLab :</TableCell>
                <TableCell align="left">{withLab.toFixed(4)}</TableCell>
              </TableRow>
              <TableRow
                sx={
                  withoutLab < 150
                    ? { backgroundColor: 'green', '& *': { color: 'white' } }
                    : withoutLab >= 150 && withoutLab <= 205
                    ? { backgroundColor: 'yellow' }
                    : withoutLab > 205
                    ? { backgroundColor: 'red', '& *': { color: 'white' } }
                    : {}
                }
              >
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
          onClick={handleNewPatient}
        >
          Add new
        </Button>

        <Button
          variant="contained"
          style={{ marginTop: '16px', marginRight: '30px' }}
          onClick={handleBackButtonClick}
        >
          Edit
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
