import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css';

function App() {
  const labelStyle = {
    color: 'blue',
  };

  const headingStyle = {
    color: 'blue', // Change this color to your desired blue color
  };

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
          />
          <Button variant="contained" fullWidth style={{ marginTop: '16px' }}>
            Login
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
