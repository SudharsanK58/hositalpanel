import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const labelStyle = {
    color: 'blue',
  };

  const headingStyle = {
    color: 'blue', // Change this color to your desired blue color
  };

  const [attendantName, setAttendantName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

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
      const response = await fetch('http://52.15.81.194:8001/login', {
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
    return <Dashboard attendantName={attendantName} password={password}/>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h4" gutterBottom style={headingStyle}>
          Heart Health Monitoring System
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
