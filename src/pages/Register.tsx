import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  TextField, 
  Grid, 
  MenuItem,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const steps = ['Relationship', 'Basic Details', 'Location & Career', 'Family Info', 'Account'];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profileFor: '',
    fullName: '',
    gender: '',
    dob: '',
    age: '',
    subCaste: '',
    city: '',
    state: 'Bihar',
    profession: '',
    familyName: '',
    familyType: '',
    parentsOccupation: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Profile Created For"
                name="profileFor"
                value={formData.profileFor}
                onChange={handleChange}
              >
                {['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Relative'].map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Candidate Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField select fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleChange}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type="date" label="Date of Birth" name="dob" InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Age" name="age" type="number" value={formData.age} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Subcaste" name="subCaste" value={formData.subCaste} onChange={handleChange} />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="State" name="state" value={formData.state} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Profession" name="profession" value={formData.profession} onChange={handleChange} />
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Family Name" name="familyName" value={formData.familyName} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField select fullWidth label="Family Type" name="familyType" value={formData.familyType} onChange={handleChange}>
                <MenuItem value="Nuclear">Nuclear</MenuItem>
                <MenuItem value="Joint">Joint</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Parents Occupation" name="parentsOccupation" value={formData.parentsOccupation} onChange={handleChange} />
            </Grid>
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth type="password" label="Password" name="password" value={formData.password} onChange={handleChange} />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" color="primary" align="center" gutterBottom sx={{ fontWeight: 800 }}>
        Create Your Account
      </Typography>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 4, borderRadius: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        
        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={loading}
          >
            {activeStep === steps.length - 1 ? (loading ? 'Creating...' : 'Finish') : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
