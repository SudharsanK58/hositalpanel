import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

function App() {
  const [attendantName, setAttendantName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

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
    if (!attendantName || !password) {
      setError('Both fields must be filled out.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Your login API call here

      // Simulating a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulating a successful login

    } catch (error) {
      console.error('Error:', error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Typography variant="h4" gutterBottom>
        Heart Health Monitoring System
      </Typography>
      <div className="form-container">
        <TextField
          id="attendant"
          label="Attendant"
          variant="outlined"
          fullWidth
          margin="normal"
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
          onFocus={() => handleInputFocus('password')}
          onBlur={handleInputBlur}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {focusedInput && (
          <Keyboard
            onChange={(input) => handleInputChange(focusedInput, input)}
            inputName={focusedInput}
            layout={{
              default: ['1 2 3 4 5 6 7 8 9 0 {bksp}', 'q w e r t y u i o p', 'a s d f g h j k l', 'z x c v b n m'],
            }}
          />
        )}
        {error && <Typography variant="body2" color="error">{error}</Typography>}
        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: '16px' }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
      </div>
    </div>
  );
}

export default App;
