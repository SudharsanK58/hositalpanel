// PatientHistory.js
import React, { useState, useEffect } from 'react';
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
import InputAdornment from '@mui/material/InputAdornment';



function PatientHistory(props) {
  const { patientId, patientNamePass, patientAge, patientWeight, patientHeight, patientGender, newPatient,} = props;
  useEffect(() => {
    const fetchData = async () => {
      if (newPatient && patientId) {
        try {
          const response = await fetch(`http://3.144.9.52:8001/get_patient_by_id/${patientId}`);
          if (response.ok) {
            const patientData = await response.json();
            setObstructiveAirwayDisease(patientData.obstructive_airway_disease);
            setSmokingTobaccoConsumption(patientData.Smokingtobaccoconsumption);
            setHistoryOfHeartAttack(patientData.historyofMI);
            setPriorSymptomaticHF(patientData.PriorsymptomaticHF);
            setCreatinineValue(patientData.creatinine.toString());
            setHeartRateValue(patientData.Heartrate.toString());
            setSbpValue(patientData.SBP.toString());
            setDbpValue(patientData.DBP.toString());
            setBloodGlucoseValue(patientData.Bloodglucose.toString());
            setHemoglobinValue(patientData.Hb.toString());
            setBnpValue(patientData.BNP.toString());
            setHypertension(patientData.HTN);
            setDiabetesMellitus(patientData.DM);
          } else {
            console.error('Error:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
    };

    fetchData();
  }, [newPatient, patientId]);
 
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
  const [creatinineValue, setCreatinineValue] = useState(''); // Initial value, you can set it to any value you prefer
  const [heartRateValue, setHeartRateValue] = useState(''); // Initial
  const [sbpValue, setSbpValue] = useState(''); // Initial value, you can set it to any value you prefer
  const [dbpValue, setDbpValue] = useState(''); // Initial value, you can set it to any value you prefer
  const [bloodGlucoseValue, setBloodGlucoseValue] = useState(''); // Initial value, you can set it to any value you prefer
  const [hemoglobinValue, setHemoglobinValue] = useState(''); // Initial value, you can set it to any value you prefer
  const [bnpValue, setBnpValue] = useState(''); // Initial value, you can set it to any value you prefer
  const [focusedInput, setFocusedInput] = useState(null);
  const [error, setError] = useState('');

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
    } else if (inputName === 'creatinineValue') {
      // Handle the input value for creatinineValue
      setCreatinineValue(Number(input));
    } else if (inputName === 'heartRateValue') {
      // Handle the input value for heartRateValue
      setHeartRateValue(Number(input));
    } else if (inputName === 'sbpValue') {
      // Handle the input value for sbpValue
      setSbpValue(Number(input));
    } else if (inputName === 'dbpValue') {
      // Handle the input value for dbpValue
      setDbpValue(Number(input));
    } else if (inputName === 'bloodGlucoseValue') {
      // Handle the input value for bloodGlucoseValue
      setBloodGlucoseValue(Number(input));
    } else if (inputName === 'bnpValue') {
      // Handle the input value for bnpValue
      setBnpValue(Number(input));
    }   
    // Add similar conditions for other input names if needed
  };
  
  

  const handleCalculate = async () => {
    try {
      setLoading(true);
      // Check for empty values before making the API call
      if (
        hemoglobinValue === '' ||
        creatinineValue === '' ||
        heartRateValue === '' ||
        sbpValue === '' ||
        dbpValue === '' ||
        bloodGlucoseValue === '' ||
        bnpValue === ''
      ) {
        // Handle the case where any of the required fields are empty
        console.error('Error: Some fields are empty');
        setError('Some fields are empty. Please fill out all required fields.');
        return;
      }
  
      const requestBody = {
        "PatientId": patientId,
        "Sex": patientGender === "Male" ? 1 : 0,
        "obstructiveairwaydisease": obstructiveAirwayDisease,
        "Smokingtobaccoconsumption": smokingTobaccoConsumption,
        "historyofMI": historyOfHeartAttack,
        "PriorsymptomaticHF": priorSymptomaticHF,
        "Age": parseInt(patientAge, 10),
        "creatinine": parseFloat(creatinineValue), // Parse as float
        "Heartrate": parseInt(heartRateValue, 10), // Parse as integer
        "weight": parseInt(patientWeight, 10),
        "height_cm": parseInt(patientHeight, 10),
        "SBP": parseInt(sbpValue, 10), // Parse as integer
        "DBP": parseInt(dbpValue, 10), // Parse as integer
        "Bloodglucose": parseInt(bloodGlucoseValue, 10), // Parse as integer
        "Hb": parseFloat(hemoglobinValue), // Parse as float
        "BNP": parseInt(bnpValue, 10), // Parse as integer
        "HTN": parseInt(hypertension, 10), // Parse as integer
        "DM": parseInt(diabetesMellitus, 10),
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
    marginBottom: '20px', // Adjust the marginBottom as needed
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
            <TextField
              id="creatinineInput"
              variant="outlined"
              label="Creatinine"
              fullWidth
              margin="normal"
              value={creatinineValue}
              onFocus={() => handleInputFocus('creatinineValue')}
              onBlur={handleInputBlur}
              onChange={(e) => setCreatinineValue(e.target.value)}
            />
            {focusedInput === 'creatinineValue' && (
              <div style={{ position: 'relative', marginTop: '8px', width: '420px' }}>
                <Keyboard
                  onChange={(input, e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleInputChange('creatinineValue', input);
                  }}
                  inputName="creatinineValue"
                  layout={{
                    default: ['1 2 3', '4 5 6', '7 8 9', '. 0 {bksp}'],
                  }}
                />
              </div>
            )}
          </div>


          <div style={sliderContainerStyle}>
          <TextField
            id="heartRateInput"
            variant="outlined"
            label="Heart Rate"
            fullWidth
            margin="normal"
            value={heartRateValue}
            onFocus={() => handleInputFocus('heartRateValue')}
            onBlur={handleInputBlur}
            onChange={(e) => setHeartRateValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  Pulse per minute
                </InputAdornment>
              ),
            }}
          />
            {focusedInput === 'heartRateValue' && (
              <div style={{ position: 'relative', marginTop: '8px', width: '420px' }}>
                <Keyboard
                  onChange={(input, e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleInputChange('heartRateValue', input);
                  }}
                  inputName="heartRateValue"
                  layout={{
                    default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}'],
                  }}
                />
              </div>
            )}
          </div>
          <div style={sliderContainerStyle}>
            <TextField
              id="sbpInput"
              variant="outlined"
              label="SBP"
              fullWidth
              margin="normal"
              value={sbpValue}
              onFocus={() => handleInputFocus('sbpValue')}
              onBlur={handleInputBlur}
              onChange={(e) => setSbpValue(e.target.value)}
            />
            {focusedInput === 'sbpValue' && (
              <div style={{ position: 'relative', marginTop: '8px', width: '420px' }}>
                <Keyboard
                  onChange={(input, e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleInputChange('sbpValue', input);
                  }}
                  inputName="sbpValue"
                  layout={{
                    default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}'],
                  }}
                />
              </div>
            )}
            </div>
            <div style={sliderContainerStyle}>
              <TextField
                id="dbpInput"
                variant="outlined"
                label="DBP"
                fullWidth
                margin="normal"
                value={dbpValue}
                onFocus={() => handleInputFocus('dbpValue')}
                onBlur={handleInputBlur}
                onChange={(e) => setDbpValue(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      mm Hg
                    </InputAdornment>
                  ),
                }}
              />
              {focusedInput === 'dbpValue' && (
                <div style={{ position: 'relative', marginTop: '8px', width: '420px' }}>
                  <Keyboard
                    onChange={(input, e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleInputChange('dbpValue', input);
                    }}
                    inputName="dbpValue"
                    layout={{
                      default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}'],
                    }}
                  />
                </div>
              )}
            </div>

            <div style={sliderContainerStyle}>
              <TextField
                id="bloodGlucoseInput"
                variant="outlined"
                label="Blood Glucose"
                fullWidth
                margin="normal"
                value={bloodGlucoseValue}
                onFocus={() => handleInputFocus('bloodGlucoseValue')}
                onBlur={handleInputBlur}
                onChange={(e) => setBloodGlucoseValue(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      mg/dl
                    </InputAdornment>
                  ),
                }}
              />
              {focusedInput === 'bloodGlucoseValue' && (
                <div style={{ position: 'relative', marginTop: '8px', width: '420px' }}>
                  <Keyboard
                    onChange={(input, e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleInputChange('bloodGlucoseValue', input);
                    }}
                    inputName="bloodGlucoseValue"
                    layout={{
                      default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}'],
                    }}
                  />
                </div>
              )}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    g/dl
                  </InputAdornment>
                ),
              }}
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
                    default: ['1 2 3', '4 5 6', '7 8 9', '. 0 {bksp}'],
                  }}
                />
              </div>
            )}
          </div>
          <div style={sliderContainerStyle}>
            <TextField
              id="bnpInput"
              variant="outlined"
              label="BNP"
              fullWidth
              margin="normal"
              value={bnpValue}
              onFocus={() => handleInputFocus('bnpValue')}
              onBlur={handleInputBlur}
              onChange={(e) => setBnpValue(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    pg/dl
                  </InputAdornment>
                ),
              }}
            />
            {focusedInput === 'bnpValue' && (
              <div style={{ position: 'relative', marginTop: '8px', width: '420px' }}>
                <Keyboard
                  onChange={(input, e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleInputChange('bnpValue', input);
                  }}
                  inputName="bnpValue"
                  layout={{
                    default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}'],
                  }}
                />
              </div>
            )}
          </div>
          {error && <Typography variant="body2" color="error">{error}</Typography>}
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
