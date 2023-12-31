import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import PatientHistory from './PatientHistory';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

function PatientDetails(props) {
  const labelStyle = {
    color: 'blue',
  };

  const labelStyle2 = {
    color: 'grey',
  };

  const tamilNaduCities = [
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Tiruchirappalli',
    'Salem',
    'Tirunelveli',
    // Add more cities as needed
  ];

  const headingStyle = {
    color: 'blue',
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
  const [focusedInput, setFocusedInput] = useState(null);
  const [keyboardStyle, setKeyboardStyle] = useState({});

  const handleInputFocus = (input) => {
    setFocusedInput(input);
    positionKeyboard(input);
  };

  const positionKeyboard = (input) => {
    const inputElement = document.getElementById(input);
    if (inputElement) {
      const inputRect = inputElement.getBoundingClientRect();
      const spaceBelowInput = window.innerHeight - inputRect.bottom;
  
      // Set a threshold value to determine when to reposition the keyboard
      const threshold = 150; // Adjust as needed
  
      // If there's not enough space below, reposition the keyboard above the input
      if (spaceBelowInput < threshold) {
        const keyboardTop = inputRect.top - window.scrollY - 10; // Adjust as needed
        const keyboardLeft = inputRect.left + window.scrollX;
  
        setKeyboardStyle({
          position: 'absolute',
          top: `${keyboardTop}px`,
          left: `${keyboardLeft}px`,
          background: '#fff', // Set a non-transparent background color
        });
      } else {
        const keyboardTop = inputRect.bottom + window.scrollY + 10; // Adjust as needed
        const keyboardLeft = inputRect.left + window.scrollX;
  
        setKeyboardStyle({
          position: 'absolute',
          top: `${keyboardTop}px`,
          left: `${keyboardLeft}px`,
          background: '#fff', // Set a non-transparent background color
        });
      }
    }
  };
  
  
  


  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const handleInputChange = (input, value) => {
    switch (input) {
      case 'name':
        setName(value);
        break;
      case 'age':
        setAge(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'height':
        setHeight(value);
        break;
      case 'weight':
        setWeight(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      default:
        break;
    }
  };

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
            onFocus={() => handleInputFocus('name')}
            onBlur={handleInputBlur}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="age"
            label="Age"
            variant="outlined"
            fullWidth
            margin="normal"
            value={age}
            onFocus={() => handleInputFocus('age')}
            onBlur={handleInputBlur}
            onChange={(e) => setAge(e.target.value)}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="gender-label" style={labelStyle2}>
              Gender
            </InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              label="Gender"
              value={gender}
              onFocus={() => handleInputFocus('gender')}
              onBlur={handleInputBlur}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="city-label" style={labelStyle2}>
              City
            </InputLabel>
            <Select
              labelId="city-label"
              id="city"
              label="City"
              value={city}
              onFocus={() => handleInputFocus('city')}
              onBlur={handleInputBlur}
              onChange={(e) => setCity(e.target.value)}
            >
              {tamilNaduCities.map((cityName) => (
                <MenuItem key={cityName} value={cityName}>
                  {cityName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="height"
            label="Height (cm)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={height}
            onFocus={() => handleInputFocus('height')}
            onBlur={handleInputBlur}
            onChange={(e) => setHeight(e.target.value)}
          />
          <TextField
            id="weight"
            label="Weight (kg)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={weight}
            onFocus={() => handleInputFocus('weight')}
            onBlur={handleInputBlur}
            onChange={(e) => setWeight(e.target.value)}
          />
          <TextField
            id="phoneNumber"
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={phoneNumber}
            onFocus={() => handleInputFocus('phoneNumber')}
            onBlur={handleInputBlur}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {focusedInput && (
            <div style={keyboardStyle}>
              <Keyboard
                onChange={(input, e) => {
                  e.preventDefault(); // Prevent default behavior
                  e.stopPropagation(); // Stop event propagation
                  handleInputChange(focusedInput, input);
                }}
                inputName={focusedInput}
                layout={{
                  default: ['1 2 3 4 5 6 7 8 9 0 {bksp}', 'q w e r t y u i o p', 'a s d f g h j k l', 'z x c v b n m'],
                }}
              />
            </div>
          )}
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
