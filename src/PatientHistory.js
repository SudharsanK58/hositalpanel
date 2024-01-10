// PatientHistory.js
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import HeartResult from './HeartResult';
import PatientDetails from './patientDetails';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import InputLabel from '@mui/material/InputLabel';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import TextField from '@mui/material/TextField';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';


function PatientHistory(props) {
  const { patientId, patientNamePass, patientAge, patientWeight, patientHeight, patientGender} = props;
 
  const labelStyle = {
    color: 'blue',
  };

  const headingStyle = {
    color: 'blue', // Change this color to your desired blue color
  };
  const [withLab, setWithLab] = useState(null);
  const [withoutLab, setWithoutLab] = useState(null);
  const [BMI, setBMI] = useState(null);
  const [patientName, setPatientName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [heartHealth, setHeartHealth] = useState(null);
  const [obstructiveAirwayDisease, setObstructiveAirwayDisease] = useState(0);
  const [smokingTobaccoConsumption, setSmokingTobaccoConsumption] = useState(0);
  const [historyOfHeartAttack, setHistoryOfHeartAttack] = useState(0);
  const [priorSymptomaticHF, setPriorSymptomaticHF] = useState(0);
  const [hypertension, setHypertension] = useState(0);
  const [diabetesMellitus, setDiabetesMellitus] = useState(0);
  const [creatinineValue, setCreatinineValue] = useState(100); // Initial value, you can set it to any value you prefer
  const [heartRateValue, setHeartRateValue] = useState(75); // Initial
  const [sbpValue, setSbpValue] = useState(120); // Initial value, you can set it to any value you prefer
  const [dbpValue, setDbpValue] = useState(80); // Initial value, you can set it to any value you prefer
  const [bloodGlucoseValue, setBloodGlucoseValue] = useState(120); // Initial value, you can set it to any value you prefer
  const [hemoglobinValue, setHemoglobinValue] = useState(''); // Initial value, you can set it to any value you prefer
  const [bnpValue, setBnpValue] = useState(100); // Initial value, you can set it to any value you prefer
  const [focusedInput, setFocusedInput] = useState(null);

  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const handleInputChange = (inputName, input) => {
    if (inputName === 'hemoglobinValue') {
      // Handle the input value for hemoglobinValue
      setHemoglobinValue(Number(input));
    }
  };


  const handleCalculate = async () => {
    try {
      setLoading(true);
  
      const requestBody = {
        "PatientId": patientId, // Assuming patientId is already defined in your component
        "Sex": patientGender === "Male" ? 1 : 0,
        "obstructiveairwaydisease": obstructiveAirwayDisease,
        "Smokingtobaccoconsumption": smokingTobaccoConsumption,
        "historyofMI": historyOfHeartAttack,
        "PriorsymptomaticHF": priorSymptomaticHF,
        "Age": parseInt(patientAge, 10),
        "creatinine": creatinineValue,
        "Heartrate": heartRateValue,
        "weight": parseInt(patientWeight, 10),
        "height_cm": parseInt(patientHeight, 10), // Convert height to integer
        "SBP": sbpValue,
        "DBP": dbpValue,
        "Bloodglucose": bloodGlucoseValue,
        "Hb": hemoglobinValue,
        "BNP": bnpValue,
        "HTN": hypertension,
        "DM": diabetesMellitus,
      };
  
      const response = await fetch('http://3.144.9.52:8001/save_disease_history2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
  
        // Assuming "heartHealth" is a boolean state variable
        setHeartHealth(true);
  
        // Pass relevant data to state variables if needed
        setPatientName(data.PatientName);
        setWithLab(data.withlab);
        setWithoutLab(data.withoutlab);
        setBMI(data.BMI);
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
    width: '100%', // Adjust the width as needed
  };
  if (heartHealth) {
    // If heartHealth is available, render the HeartResult component
    return (
      <HeartResult
        patientId={patientId}
        patientName={patientName}
        withLab={withLab}
        withoutLab={withoutLab}
        bmi={BMI}
      />
    );
  }
  

  return (
    <div className="centered-container">
      <header className="App-header">
        <Typography variant="h4" gutterBottom style={headingStyle}>
            Patient History
        </Typography>
        <div className="form-container">
        <TableContainer component={Paper} style={sliderContainerStyle} sx={{ borderCollapse: 'collapse', border: 'none', boxShadow: 'none' }}>
            <Table aria-label="patient-history-table">
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: 'none' }}><Typography id="paralysis-slider-label" style={{ color: 'black' }}>Obstructive Airway Disease</Typography></TableCell>
                  <TableCell align="right" sx={{ border: 'none' }}>
                    <RadioGroup
                      row
                      aria-labelledby="obstructive-airway-disease-label"
                      name="obstructive-airway-disease-group"
                      value={obstructiveAirwayDisease.toString()}
                      onChange={(event) => setObstructiveAirwayDisease(parseInt(event.target.value, 10))}
                    >
                      <FormControlLabel value="1" control={<Radio />} label="Yes" />
                      <FormControlLabel value="0" control={<Radio />} label="No" />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 'none' }}><Typography id="paralysis-slider-label" style={{ color: 'black' }}>Smoking Tobacco Consumption</Typography></TableCell>
                  <TableCell align="right" sx={{ border: 'none' }}>
                    <RadioGroup
                      row
                      aria-labelledby="smoking-tobacco-consumption-label"
                      name="smoking-tobacco-consumption-group"
                      value={smokingTobaccoConsumption.toString()}
                      onChange={(event) => setSmokingTobaccoConsumption(parseInt(event.target.value, 10))}
                    >
                      <FormControlLabel value="1" control={<Radio />} label="Yes" />
                      <FormControlLabel value="0" control={<Radio />} label="No" />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 'none' }}><Typography id="paralysis-slider-label" style={{ color: 'black' }}>History of Heart Attack</Typography></TableCell>
                  <TableCell align="right" sx={{ border: 'none' }}>
                    <RadioGroup
                      row
                      aria-labelledby="history-of-heart-attack-label"
                      name="history-of-heart-attack-group"
                      value={historyOfHeartAttack.toString()}
                      onChange={(event) => setHistoryOfHeartAttack(parseInt(event.target.value, 10))}
                    >
                      <FormControlLabel value="1" control={<Radio />} label="Yes" />
                      <FormControlLabel value="0" control={<Radio />} label="No" />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 'none' }}><Typography id="paralysis-slider-label" style={{ color: 'black' }}>Prior Symptomatic Heart Failure</Typography></TableCell>
                  <TableCell align="right" sx={{ border: 'none' }}>
                    <RadioGroup
                      row
                      aria-labelledby="prior-symptomatic-hf-label"
                      name="prior-symptomatic-hf-group"
                      value={priorSymptomaticHF.toString()}
                      onChange={(event) => setPriorSymptomaticHF(parseInt(event.target.value, 10))}
                    >
                      <FormControlLabel value="1" control={<Radio />} label="Yes" />
                      <FormControlLabel value="0" control={<Radio />} label="No" />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 'none' }}><Typography id="paralysis-slider-label" style={{ color: 'black' }}>Hypertension (HTN)</Typography></TableCell>
                  <TableCell align="right" sx={{ border: 'none' }}>
                    <RadioGroup
                      row
                      aria-labelledby="hypertension-label"
                      name="hypertension-group"
                      value={hypertension.toString()}
                      onChange={(event) => setHypertension(parseInt(event.target.value, 10))}
                    >
                      <FormControlLabel value="1" control={<Radio />} label="Yes" />
                      <FormControlLabel value="0" control={<Radio />} label="No" />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 'none' }}><Typography id="paralysis-slider-label" style={{ color: 'black' }}>Diabetes Mellitus (DM)</Typography></TableCell>
                  <TableCell align="right" sx={{ border: 'none' }}>
                    <RadioGroup
                      row
                      aria-labelledby="diabetes-mellitus-label"
                      name="diabetes-mellitus-group"
                      value={diabetesMellitus.toString()}
                      onChange={(event) => setDiabetesMellitus(parseInt(event.target.value, 10))}
                    >
                      <FormControlLabel value="1" control={<Radio />} label="Yes" />
                      <FormControlLabel value="0" control={<Radio />} label="No" />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <div style={sliderContainerStyle}>
            <Typography id="creatinine-slider-label" style={{ color: 'black' }}>
              Creatinine: {creatinineValue}
            </Typography>
            <Slider
              id="creatinineSlider"
              defaultValue={creatinineValue}
              aria-labelledby="creatinine-slider-label"
              valueLabelDisplay="auto"
              value={creatinineValue}
              onChange={(event, value) => setCreatinineValue(value)}
              sx={sliderStyles}
              min={0}
              max={200}
            />
          </div>

          <div style={sliderContainerStyle}>
            <Typography id="heart-rate-slider-label" style={{ color: 'black' }}>
              Heart Rate: {heartRateValue}
            </Typography>
            <Slider
              id="heartRateSlider"
              defaultValue={heartRateValue}
              aria-labelledby="heart-rate-slider-label"
              valueLabelDisplay="auto"
              value={heartRateValue}
              onChange={(event, value) => setHeartRateValue(value)}
              sx={sliderStyles}
              min={0}
              max={200}
            />
          </div>

          <div style={sliderContainerStyle}>
            <Typography id="sbp-slider-label" style={{ color: 'black' }}>
              SBP: {sbpValue}
            </Typography>
            <Slider
              id="sbpSlider"
              defaultValue={sbpValue}
              aria-labelledby="sbp-slider-label"
              valueLabelDisplay="auto"
              value={sbpValue}
              onChange={(event, value) => setSbpValue(value)}
              sx={sliderStyles}
              min={0}
              max={200}
            />
          </div>

          <div style={sliderContainerStyle}>
            <Typography id="dbp-slider-label" style={{ color: 'black' }}>
              DBP: {dbpValue}
            </Typography>
            <Slider
              id="dbpSlider"
              defaultValue={dbpValue}
              aria-labelledby="dbp-slider-label"
              valueLabelDisplay="auto"
              value={dbpValue}
              onChange={(event, value) => setDbpValue(value)}
              sx={sliderStyles}
              min={0}
              max={200}
            />
          </div>
          <div style={sliderContainerStyle}>
            <Typography id="blood-glucose-slider-label" style={{ color: 'black' }}>
              Blood Glucose: {bloodGlucoseValue}
            </Typography>
            <Slider
              id="bloodGlucoseSlider"
              defaultValue={bloodGlucoseValue}
              aria-labelledby="blood-glucose-slider-label"
              valueLabelDisplay="auto"
              value={bloodGlucoseValue}
              onChange={(event, value) => setBloodGlucoseValue(value)}
              sx={sliderStyles}
              min={0}
              max={200}
            />
          </div>
          <div style={sliderContainerStyle}>
            <TextField
              id="hemoglobinInput"
              variant="outlined"
              label = "Hemoglobin"
              fullWidth 
              margin="normal"
              value={hemoglobinValue}
              onFocus={() => handleInputFocus('hemoglobinValue')}
              onBlur={handleInputBlur}
              onChange={(e) => setHemoglobinValue(e.target.value)}
            />
            {focusedInput === 'hemoglobinValue' && (
              <div style={{ position: 'relative', marginTop: '8px', width: '420px' }}>
                <Keyboard
                  onChange={(input, e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleInputChange('hemoglobinValue', input);
                  }}
                  inputName="hemoglobinValue"
                  layout={{
                    default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}'],
                  }}
                />
              </div>
            )}
          </div>
          <div style={sliderContainerStyle}>
            <Typography id="bnp-slider-label" style={{ color: 'black' }}>
              BNP: {bnpValue}
            </Typography>
            <Slider
              id="bnpSlider"
              defaultValue={bnpValue}
              aria-labelledby="bnp-slider-label"
              valueLabelDisplay="auto"
              value={bnpValue}
              onChange={(event, value) => setBnpValue(value)}
              sx={sliderStyles}
              min={0}
              max={200}
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
