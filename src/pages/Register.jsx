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
  Alert,
  Fade
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

const steps = ['Relationship', 'Basic Details', 'Location & Career', 'Family Info', 'Profile Photo', 'Account'];

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const data = new FormData();
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      
      // Add photo if exists
      if (photo) {
        data.append('profilePhoto', photo);
      }

      const response = await api.post('/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const { accessToken, ...userData } = response.data;
      
      // Auto-login
      setAuth(userData, accessToken);
      
      // Direct redirect to matches
      navigate('/dashboard/matches');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Fade in={true}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Who are you looking for?</Typography>
                <TextField
                  select
                  fullWidth
                  label="Profile Created For"
                  name="profileFor"
                  value={formData.profileFor}
                  onChange={handleChange}
                  variant="outlined"
                >
                  {['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Relative'].map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Fade>
        );
      case 1:
        return (
          <Fade in={true}>
            <Grid container spacing={3}>
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
          </Fade>
        );
      case 2:
        return (
          <Fade in={true}>
            <Grid container spacing={3}>
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
          </Fade>
        );
      case 3:
        return (
          <Fade in={true}>
            <Grid container spacing={3}>
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
          </Fade>
        );
      case 4:
        return (
          <Fade in={true}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Upload your profile photo (Optional)</Typography>
              <Box 
                sx={{ 
                  width: 200, 
                  height: 200, 
                  borderRadius: '50%', 
                  border: '2px dashed #ccc', 
                  margin: '0 auto 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  bgcolor: '#fcfcfc'
                }}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Typography variant="body2" color="textSecondary">No photo selected</Typography>
                )}
              </Box>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="photo-upload"
                type="file"
                onChange={handlePhotoChange}
              />
              <label htmlFor="photo-upload">
                <Button variant="outlined" component="span" sx={{ borderRadius: '25px', px: 4 }}>
                  {photo ? 'Change Photo' : 'Select Photo'}
                </Button>
              </label>
              <Typography variant="caption" display="block" sx={{ mt: 2, color: 'text.secondary' }}>
                Industry Tip: Profiles with photos get 10x more responses.
              </Typography>
            </Box>
          </Fade>
        );
      case 5:
        return (
          <Fade in={true}>
            <Grid container spacing={3}>
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
          </Fade>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" color="primary" sx={{ fontWeight: 900, mb: 1 }}>
          Your journey begins here
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Tell us about yourself to find the most compatible matches
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 6, borderRadius: 4, boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        
        {renderStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6 }}>
          <Button 
            disabled={activeStep === 0} 
            onClick={handleBack}
            sx={{ fontWeight: 700 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={loading}
            sx={{ 
              px: 6, 
              py: 1.5, 
              borderRadius: '50px',
              fontWeight: 800
            }}
          >
            {activeStep === steps.length - 1 ? (loading ? 'Creating...' : 'Register Complete') : 'Continue'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
