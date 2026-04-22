import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  Box, 
  Typography, 
  Avatar, 
  Grid, 
  IconButton, 
  Divider, 
  Button, 
  Stack,
  Chip,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneIcon from '@mui/icons-material/Phone';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileModal = ({ open, onClose, candidate, onInterest }) => {
  if (!candidate) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { 
          borderRadius: 8,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 25px 70px rgba(0,0,0,0.2)'
        }
      }}
    >
      <IconButton 
        onClick={onClose}
        sx={{ 
          position: 'absolute', 
          right: 24, 
          top: 24, 
          bgcolor: 'rgba(255,255,255,0.9)',
          '&:hover': { bgcolor: '#fff', transform: 'rotate(90deg)' },
          zIndex: 2,
          transition: 'all 0.3s ease'
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        <Grid container>
          {/* Left Column: Media */}
          <Grid item xs={12} md={5}>
            <Box sx={{ 
              height: '100%', 
              minHeight: { xs: 350, md: 600 },
              bgcolor: '#f5f5f5',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {candidate.photos?.[0]?.url ? (
                <motion.img 
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  src={candidate.photos[0].url} 
                  alt={candidate.fullName} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <Avatar sx={{ width: 150, height: 150, fontSize: 60, fontWeight: 800 }}>{candidate.fullName[0]}</Avatar>
              )}
              {candidate.matchScore && (
                <Chip 
                  label={`${candidate.matchScore}% Compatibility`}
                  color="primary"
                  sx={{ 
                    position: 'absolute', 
                    top: 24, 
                    left: 24, 
                    fontWeight: 900,
                    backdropFilter: 'blur(8px)',
                    bgcolor: 'rgba(0,163,173,0.85)',
                    px: 1
                  }}
                />
              )}
            </Box>
          </Grid>

          {/* Right Column: Details */}
          <Grid item xs={12} md={7}>
            <Box sx={{ p: { xs: 4, md: 6 } }}>
              <Box sx={{ mb: 4 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: '#1a1a1a' }}>{candidate.fullName}</Typography>
                  {candidate.isVerified && <VerifiedIcon sx={{ fontSize: 32, color: '#2196f3' }} />}
                </Stack>
                <Typography variant="h5" color="textSecondary" sx={{ fontWeight: 500 }}>
                  {candidate.age} yrs • {candidate.subCaste} • {candidate.gender}
                </Typography>
              </Box>

              {/* Revealable Contact Section */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  mb: 5, 
                  borderRadius: 4, 
                  bgcolor: 'rgba(0,163,173,0.04)', 
                  border: '1px dashed',
                  borderColor: 'primary.light',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Typography variant="caption" color="primary" sx={{ fontWeight: 800, display: 'block', mb: 1, letterSpacing: 1 }}>
                  DIRECT CONTACT REVEALED
                </Typography>
                <AnimatePresence mode="wait">
                  <motion.div
                    key="phone"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                        <PhoneIcon color="primary" />
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 900, color: 'primary.main', letterSpacing: 1 }}>
                        {candidate.phone || '+91 99XXXXXX01'}
                      </Typography>
                    </Stack>
                  </motion.div>
                </AnimatePresence>
              </Paper>

              <Divider sx={{ mb: 4 }} />

              <Stack spacing={4}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 1.5, color: '#333' }}>Professional Summary</Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Box sx={{ bgcolor: '#f0f4f8', p: 1, borderRadius: 2 }}><WorkIcon fontSize="small" color="action" /></Box>
                        <Box>
                          <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>OCCUPATION</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{candidate.profession}</Typography>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Box sx={{ bgcolor: '#f0f4f8', p: 1, borderRadius: 2 }}><SchoolIcon fontSize="small" color="action" /></Box>
                        <Box>
                          <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>EDUCATION</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>{candidate.education?.degree}</Typography>
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 1.5, color: '#333' }}>Personal Bio</Typography>
                  <Typography variant="body1" color="textSecondary" sx={{ lineHeight: 1.8, fontStyle: 'italic' }}>
                    "{candidate.aboutCandidate || "A dedicated professional looking for a life partner who shares similar values and interests."}"
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 1.5, color: '#333' }}>Family & Background</Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, border: '1px solid #eee' }}>
                        <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>FAMILY NAME</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{candidate.familyId?.familyName} Family</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, border: '1px solid #eee' }}>
                        <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700 }}>LOCATION</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{candidate.location?.city}, {candidate.location?.state}</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
