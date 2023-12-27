// PatientHistory.js
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import HeartResult from './HeartResult';
import PatientDetails from './patientDetails';

function PatientHistory(props) {
  const { patientId, patientName } = props;
 
  const labelStyle = {
    color: 'blue',
  };

  const headingStyle = {
    color: 'blue', // Change this color to your desired blue color
  };

  const [diabetesHistory, setDiabetesHistory] = useState(70);
  const [heartAttackHistory, setHeartAttackHistory] = useState(50);
  const [paralysisHistory, setParalysisHistory] = useState(50);
  const [gangreneHistory, setGangreneHistory] = useState(50);
  const [bloodPressureHistory, setBloodPressureHistory] = useState(50);
  const [breathingDifficultyHistory, setBreathingDifficultyHistory] = useState(50);
  const [loading, setLoading] = useState(false);
  const [heartHealth, setHeartHealth] = useState(null);

  const handleCalculate = async () => {
    try {
      setLoading(true);

      const requestBody = {
        patient_id: patientId,
        diabetes: diabetesHistory,
        heart_attack: heartAttackHistory,
        paralysis: paralysisHistory,
        gangrene: gangreneHistory,
        blood_pressure: bloodPressureHistory,
        breathing_difficulty: breathingDifficultyHistory,
      };

      const response = await fetch('http://52.15.81.194:8001/save_disease_history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        setHeartHealth(data.HeartHealth);
        console.log('HeartHealth:', data.HeartHealth);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const sliderContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '26px', // Adjust the marginBottom as needed
  };

  const sliderStyles = {
    width: '150%', // Adjust the width as needed
  };
  if (heartHealth) {
    // If heartHealth is available, render the HeartResult component
    return <HeartResult patientId={patientId} heartHealth={heartHealth}/>;
  }

  return (
    <div className="centered-container">
      <header className="App-header">
        <Typography variant="h4" gutterBottom style={headingStyle}>
            Patient History
        </Typography>
        <div className="form-container">
          <div style={sliderContainerStyle}>
            <Typography id="diabetes-slider-label" style={{ color: 'black' }}>
              History of Diabetes
            </Typography>
            <Slider
              id="diabetesSlider"
              defaultValue={70}
              aria-labelledby="diabetes-slider-label"
              valueLabelDisplay="auto"
              value={diabetesHistory}
              onChange={(event, value) => setDiabetesHistory(value)}
              sx={sliderStyles}
            />
          </div>

          <div style={sliderContainerStyle}>
            <Typography id="heart-attack-slider-label" style={{ color: 'black' }}>
              History of Heart Attack
            </Typography>
            <Slider
              id="heartAttackSlider"
              defaultValue={50}
              aria-labelledby="heart-attack-slider-label"
              valueLabelDisplay="auto"
              value={heartAttackHistory}
              onChange={(event, value) => setHeartAttackHistory(value)}
              sx={sliderStyles}
            />
          </div>

          <div style={sliderContainerStyle}>
            <Typography id="paralysis-slider-label" style={{ color: 'black' }}>
              History of Paralysis
            </Typography>
            <Slider
              id="paralysisSlider"
              defaultValue={50}
              aria-labelledby="paralysis-slider-label"
              valueLabelDisplay="auto"
              value={paralysisHistory}
              onChange={(event, value) => setParalysisHistory(value)}
              sx={sliderStyles}
            />
          </div>

          <div style={sliderContainerStyle}>
            <Typography id="gangrene-slider-label" style={{ color: 'black' }}>
              History of Gangrene
            </Typography>
            <Slider
              id="gangreneSlider"
              defaultValue={50}
              aria-labelledby="gangrene-slider-label"
              valueLabelDisplay="auto"
              value={gangreneHistory}
              onChange={(event, value) => setGangreneHistory(value)}
              sx={sliderStyles}
            />
          </div>

          <div style={sliderContainerStyle}>
            <Typography id="blood-pressure-slider-label" style={{ color: 'black' }}>
              History of Blood Pressure
            </Typography>
            <Slider
              id="bloodPressureSlider"
              defaultValue={50}
              aria-labelledby="blood-pressure-slider-label"
              valueLabelDisplay="auto"
              value={bloodPressureHistory}
              onChange={(event, value) => setBloodPressureHistory(value)}
              sx={sliderStyles}
            />
          </div>

          <div style={sliderContainerStyle}>
            <Typography id="breathing-difficulty-slider-label" style={{ color: 'black' }}>
              History of Breathing Difficulty
            </Typography>
            <Slider
              id="breathingDifficultySlider"
              defaultValue={50}
              aria-labelledby="breathing-difficulty-slider-label"
              valueLabelDisplay="auto"
              value={breathingDifficultyHistory}
              onChange={(event, value) => setBreathingDifficultyHistory(value)}
              sx={sliderStyles}
            />
          </div>

          <Button
            variant="contained"
            fullWidth
            style={{ marginTop: '16px' }}
            onClick={handleCalculate}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Calculate'}
          </Button>

          {heartHealth !== null && (
            <Typography variant="h6" style={{ marginTop: '16px' }}>
              HeartHealth: {heartHealth}
            </Typography>
          )}
        </div>
      </header>
    </div>
  );
}

export default PatientHistory;
