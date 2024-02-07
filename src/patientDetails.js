import React, { useState, useEffect } from 'react';
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
import InputAdornment from '@mui/material/InputAdornment';

function PatientDetails(props) {

  useEffect(() => {
    const fetchPatientInfo = async () => {
      if (props.newPatient && props.patientId) {
        try {
          const apiUrl = `http://3.144.9.52:8001/get_patient_info/${props.patientId}`;
          const response = await fetch(apiUrl);
          const responseData = await response.json();
  
          if (response.ok) {
            // Update the state with fetched patient information
            setName(responseData.Name || '');
            setAge(responseData.Age || '');
            setGender(responseData.Gender === 1 ? 'Male' : 'Female'); // Convert gender to string
            setCity(responseData.City || '');
            setHeight(responseData.Height || '');
            setWeight(responseData.Weight || '');
            setPhoneNumber(responseData.PhoneNumber || '');
          } else {
            console.error('Error fetching patient info:', responseData.detail || 'An error occurred.');
            setError('Error fetching patient information.');
          }
        } catch (error) {
          console.error('Error:', error);
          setError('An unexpected error occurred.');
        }
      }
    };
  
    fetchPatientInfo();
  }, [props.newPatient, props.patientId]);
  

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
    if (!name || !age || !gender || !city || !height || !weight) {
      setError('All fields must be filled out.');
      return;
    }
  
    // Validate if phone number is not exactly 10 digits
    if (!phoneNumber || phoneNumber.length !== 10) {
      setError('Phone number should be exactly 10 digits.');
      return;
    }
  
    // Set loading to true to show CircularProgress
    setLoading(true);
  
    if (props.newPatient) {
      // API endpoint for updating patient information
      const updateApiUrl = `http://3.144.9.52:8001/update_patient_info/${props.patientId}`;
  
      // Payload for updating patient information
      const updatePayload = {
        name,
        age: parseInt(age, 10),
        gender,
        city,
        height: parseInt(height, 10),
        weight: parseInt(weight, 10),
        phone_number: phoneNumber,
      };
  
      // Make POST request to update patient information
      fetch(updateApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
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
    } else {
      // API endpoint for saving new patient details
      const saveApiUrl = 'http://3.144.9.52:8001/save_patient_details';
  
      // Payload for saving new patient details
      const savePayload = {
        name,
        age: parseInt(age, 10),
        gender,
        city,
        height: parseInt(height, 10),
        weight: parseInt(weight, 10),
        phone_number: phoneNumber,
      };
  
      // Make POST request to save new patient details
      fetch(saveApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(savePayload),
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
    }
  };
  

 // Render PatientHistory if patientId is available
if (patientId) {
  return (
    <PatientHistory
      patientId={patientId}
      patientNamePass={name}
      patientAge={age}
      patientWeight={weight}
      patientHeight={height}
      patientGender={gender}
      newPatient={props.newPatient} 
    />
  );
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
            {focusedInput === 'name' && (
              <div style={{ position: 'relative', marginTop: '8px' }}>
                <Keyboard
                  onChange={(input, e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleInputChange('name', input);
                  }}
                  inputName="name"
                  layout={{
                    default: ['q w e r t y u i o p', 'a s d f g h j k l', 'z x c v b n m','{bksp}'],
                  }}
                />
              </div>
            )}
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
        {focusedInput === 'age' && (
          <div style={{ position: 'relative', marginTop: '8px' }}>
            <Keyboard
              onChange={(input, e) => {
                e.preventDefault();
                e.stopPropagation();
                handleInputChange('age', input);
              }}
              inputName="age"
              layout={{
                default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}'],
              }}
            />
          </div>
        )}
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
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
          <TextField
            id="city"
            label="City"
            variant="outlined"
            fullWidth
            margin="normal"
            value={city}
            onFocus={() => handleInputFocus('city')}
            onBlur={handleInputBlur}
            onChange={(e) => setCity(e.target.value)}
          />
          {focusedInput === 'city' && (
            <div style={{ position: 'relative', marginTop: '8px' }}>
              <Keyboard
                onChange={(input, e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleInputChange('city', input);
                }}
                inputName="city"
                layout={{
                  default: ['q w e r t y u i o p', 'a s d f g h j k l', 'z x c v b n m', '{bksp}'],
                }}
              />
            </div>
          )}

          </FormControl>
          <TextField
            id="height"
            label="Height"
            variant="outlined"
            fullWidth
            margin="normal"
            value={height}
            onFocus={() => handleInputFocus('height')}
            onBlur={handleInputBlur}
            onChange={(e) => setHeight(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  cm
                </InputAdornment>
              ),
            }}
          />
          {focusedInput === 'height' && (
            <div style={{ position: 'relative', marginTop: '8px' }}>
              <Keyboard
                onChange={(input, e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleInputChange('height', input);
                }}
                inputName="height"
                layout={{
                  default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}'],
                }}
              />
            </div>
          )}
          <TextField
            id="weight"
            label="Weight"
            variant="outlined"
            fullWidth
            margin="normal"
            value={weight}
            onFocus={() => handleInputFocus('weight')}
            onBlur={handleInputBlur}
            onChange={(e) => setWeight(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  kg
                </InputAdornment>
              ),
            }}
          />
          {focusedInput === 'weight' && (
            <div style={{ position: 'relative', marginTop: '8px' }}>
              <Keyboard
                onChange={(input, e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleInputChange('weight', input);
                }}
                inputName="weight"
                layout={{
                  default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}'],
                }}
              />
            </div>
          )}
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
          {focusedInput === 'phoneNumber' && (
            <div style={{ position: 'relative', marginTop: '8px' }}>
              <Keyboard
                onChange={(input, e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleInputChange('phoneNumber', input);
                }}
                inputName="phoneNumber"
                layout={{
                  default: ['1 2 3', '4 5 6', '7 8 9', '+ 0 {bksp}'],
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
