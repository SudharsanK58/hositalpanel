// PatientDetails.js
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import PatientHistory from './PatientHistory';

function PatientDetails(props) {

  const labelStyle = {
    color: 'blue',
  };

  const headingStyle = {
    color: 'blue', // Change this color to your desired blue color
  };

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [patientId, setPatientId] = useState(null);


  const handleContinue = () => {
    // Validate if any field is empty
    if (!name || !age || !gender || !city || !height || !weight || !phoneNumber) {
      setError('All fields must be filled out.');
      return;
    }

    // Set loading to true to show CircularProgress
    setLoading(true);

    // API endpoint
    const apiUrl = 'http://52.15.81.194:8001/save_patient_details';

    // Payload
    const payload = {
      name,
      age: parseInt(age, 10),
      gender,
      city,
      height: parseInt(height, 10),
      weight: parseInt(weight, 10),
      phone_number: phoneNumber,
    };

    // Make POST request
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        // Log the patientId in the console
        console.log('PatientId:', data.PatientId);
        setPatientId(data.PatientId);
      })
      .catch(error => console.error('Error:', error))
      .finally(() => {
        // Reset loading state after the request is completed
        setLoading(false);
      });
  };

   // Render PatientHistory if patientId is available
   if (patientId) {
    return <PatientHistory patientId={patientId} patientName={name} />;
  }


  return (
    <div className="centered-container">
      <header className="App-header">
        <Typography variant="h4" gutterBottom style={headingStyle}>
          Details of Patients
        </Typography>
        <div className="form-container">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="age"
            label="Age"
            variant="outlined"
            fullWidth
            margin="normal"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            id="gender"
            label="Gender"
            variant="outlined"
            fullWidth
            margin="normal"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <TextField
            id="city"
            label="City"
            variant="outlined"
            fullWidth
            margin="normal"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            id="height"
            label="Height (cm)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <TextField
            id="weight"
            label="Weight (kg)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <TextField
            id="phoneNumber"
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {error && <Typography variant="body2" color="error">{error}</Typography>}
          <Button variant="contained" fullWidth style={{ marginTop: '16px' }} onClick={handleContinue} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
          </Button>
        </div>
      </header>
    </div>
  );
}

export default PatientDetails;
