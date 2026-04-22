import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  Avatar, 
  IconButton, 
  Divider,
  Alert,
  CircularProgress,
  Stack,
  LinearProgress
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import api from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

const Profile = () => {
  const { user, setAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [profileData, setProfileData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    age: '',
    subCaste: '',
    location: { city: '', state: '' },
    profession: '',
    education: { degree: '', institution: '' },
    income: '',
    aboutCandidate: '',
    family: {
      familyName: '',
      familyType: '',
      parentsOccupation: ''
    }
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      const { candidate, family } = response.data;
      setProfileData({
        fullName: candidate?.fullName || '',
        gender: candidate?.gender || '',
        dob: candidate?.dob ? candidate.dob.split('T')[0] : '',
        age: candidate?.age || '',
        subCaste: family?.subCaste || '',
        location: candidate?.location || { city: '', state: '' },
        profession: candidate?.profession || '',
        education: candidate?.education || { degree: '', institution: '' },
        income: candidate?.income || '',
        aboutCandidate: candidate?.aboutCandidate || '',
        family: {
          familyName: family?.familyName || '',
          familyType: family?.familyType || '',
          parentsOccupation: family?.parentsOccupation || ''
        }
      });
      if (candidate?.photos?.[0]?.url) {
        setPhotoPreview(candidate.photos[0].url);
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }));
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      formData.append('fullName', profileData.fullName);
      formData.append('gender', profileData.gender);
      formData.append('dob', profileData.dob);
      formData.append('age', profileData.age);
      formData.append('location', JSON.stringify(profileData.location));
      formData.append('profession', profileData.profession);
      formData.append('education', JSON.stringify(profileData.education));
      formData.append('income', profileData.income);
      formData.append('aboutCandidate', profileData.aboutCandidate);
      formData.append('subCaste', profileData.family.subCaste);
      formData.append('familyName', profileData.family.familyName);
      formData.append('familyType', profileData.family.familyType);
      formData.append('parentsOccupation', profileData.family.parentsOccupation);
      
      if (photo) {
        formData.append('profilePhoto', photo);
      }

      const response = await api.put('/auth/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const updatedUser = { ...user, profileCompletion: response.data.profileCompletion };
      setAuth(updatedUser, localStorage.getItem('token'));
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>My Profile</Typography>
        <Typography variant="body1" color="textSecondary">Keep your profile updated for better matching results.</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4, height: '100%' }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                <Avatar 
                  src={photoPreview} 
                  sx={{ width: 150, height: 150, border: '4px solid #fff', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                >
                  {profileData.fullName ? profileData.fullName[0].toUpperCase() : '?'}
                </Avatar>
                <IconButton 
                  color="primary" 
                  component="label"
                  sx={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    right: 0, 
                    bgcolor: 'white',
                    '&:hover': { bgcolor: '#f5f5f5' },
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}
                >
                  <PhotoCameraIcon />
                  <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                </IconButton>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>{profileData.fullName}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>{user?.email}</Typography>
              
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ textAlign: 'left', mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>Profile Strength</Typography>
                  <Typography variant="caption" color="primary" sx={{ fontWeight: 700 }}>{user?.profileCompletion}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={user?.profileCompletion || 0} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, borderRadius: 4 }}>
              {message.text && <Alert severity={message.type} sx={{ mb: 3 }}>{message.text}</Alert>}
              
              <Stack spacing={4}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>Basic Information</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField 
                        fullWidth 
                        label="Full Name" 
                        name="fullName" 
                        value={profileData.fullName} 
                        onChange={handleInputChange} 
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        select 
                        fullWidth 
                        label="Gender" 
                        name="gender" 
                        value={profileData.gender} 
                        onChange={handleInputChange}
                        SelectProps={{ native: true }}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        fullWidth 
                        type="date" 
                        label="Date of Birth" 
                        name="dob" 
                        InputLabelProps={{ shrink: true }} 
                        value={profileData.dob} 
                        onChange={handleInputChange} 
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        fullWidth 
                        label="Age" 
                        name="age" 
                        type="number" 
                        value={profileData.age} 
                        onChange={handleInputChange} 
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        fullWidth 
                        label="Subcaste" 
                        name="subCaste" 
                        value={profileData.subCaste} 
                        onChange={handleInputChange} 
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        fullWidth 
                        multiline 
                        rows={4} 
                        label="About Me" 
                        name="aboutCandidate" 
                        value={profileData.aboutCandidate} 
                        onChange={handleInputChange} 
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>Location & Career</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField 
                        fullWidth 
                        label="State" 
                        name="location.state" 
                        value={profileData.location.state} 
                        onChange={handleInputChange} 
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        fullWidth 
                        label="City" 
                        name="location.city" 
                        value={profileData.location.city} 
                        onChange={handleInputChange} 
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        fullWidth 
                        label="Profession" 
                        name="profession" 
                        value={profileData.profession} 
                        onChange={handleInputChange} 
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        fullWidth 
                        label="Degree" 
                        name="education.degree" 
                        value={profileData.education.degree} 
                        onChange={handleInputChange} 
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        fullWidth 
                        label="Institution" 
                        name="education.institution" 
                        value={profileData.education.institution} 
                        onChange={handleInputChange} 
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        fullWidth 
                        label="Annual Income" 
                        name="income" 
                        value={profileData.income} 
                        onChange={handleInputChange} 
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>Family Details</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField 
                        fullWidth 
                        label="Family Name" 
                        name="family.familyName" 
                        value={profileData.family.familyName} 
                        onChange={handleInputChange} 
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        select 
                        fullWidth 
                        label="Family Type" 
                        name="family.familyType" 
                        value={profileData.family.familyType} 
                        onChange={handleInputChange}
                        SelectProps={{ native: true }}
                      >
                        <option value="Nuclear">Nuclear</option>
                        <option value="Joint">Joint</option>
                      </TextField>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField 
                        fullWidth 
                        label="Parents Occupation" 
                        name="family.parentsOccupation" 
                        value={profileData.family.parentsOccupation} 
                        onChange={handleInputChange} 
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large" 
                  disabled={saving}
                  sx={{ borderRadius: 10, py: 1.5, fontWeight: 800 }}
                >
                  {saving ? 'Saving...' : 'Save Profile Changes'}
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Profile;
