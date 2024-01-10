import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './App.css';
import PatientDetails from './patientDetails';
import SplashScreen from './SplashScreen';

function App() {
  const labelStyle = {
    color: 'blue',
  };

  const headingStyle = {
    color: 'blue',
  };

  const [attendantName, setAttendantName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous task (e.g., fetching initial data)
    const fetchData = async () => {
      // Delay for demonstration purposes
      await new Promise(resolve => setTimeout(resolve, 20000));
      setShowSplash(false);
    };

    fetchData();
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }


  const handleInputFocus = (input) => {
    setFocusedInput(input);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const handleInputChange = (input, value) => {
    if (input === 'attendant') {
      setAttendantName(value);
    } else if (input === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    // Validation: Check if either field is empty
    if (!attendantName || !password) {
      setError('Both fields must be filled out.');
      return;
    }

    try {
      // Set loading state to true
      setLoading(true);

      // Clear previous error on successful validation
      setError('');

      // Construct payload
      const payload = {
        name: attendantName,
        password: password,
      };

      // Make POST request to the login API
      const response = await fetch('http://3.144.9.52:8001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Parse and handle the response
      const responseData = await response.json();

      if (response.ok) {
        // Successful login
        console.log('Login successful');
        setLoggedIn(true);
      } else {
        // Invalid credentials
        setError(responseData.detail || 'An error occurred during login.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred.');
    } finally {
      // Set loading state back to false, regardless of the outcome
      setLoading(false);
    }
  };

  // Render AnotherPage component when logged in
  if (loggedIn) {
    return <PatientDetails />;
  }

  return (
    <div className="App" >
      <header className="App-header">
        <Typography variant="h4" gutterBottom style={headingStyle}>
          Health Monitoring System
        </Typography>
        <div className="form-container">
          <TextField
            id="attendant"
            label="Attendant"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: labelStyle,
            }}
            onFocus={() => handleInputFocus('attendant')}
            onBlur={handleInputBlur}
            value={attendantName}
            onChange={(e) => setAttendantName(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              style: labelStyle,
            }}
            onFocus={() => handleInputFocus('password')}
            onBlur={handleInputBlur}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {focusedInput && (
            <div style={{ position: 'relative', marginTop: '8px', width: '450px'}}>
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
          <Button variant="contained" fullWidth style={{ marginTop: '16px' }} onClick={handleLogin} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
