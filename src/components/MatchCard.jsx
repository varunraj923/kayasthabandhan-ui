import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar, 
  Button, 
  Divider,
  Stack,
  IconButton,
  Chip
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneIcon from '@mui/icons-material/Phone';
import { motion } from 'framer-motion';

const MatchCard = ({ candidate, onInterest, onReveal }) => {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        position: 'relative',
        borderRadius: 6,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
        transition: 'all 0.4s ease',
        '&:hover': {
          boxShadow: '0 20px 40px rgba(0,163,173,0.12)',
          borderColor: 'primary.light'
        }
      }}>
        {/* Match Percentage Badge */}
        {candidate.matchScore && (
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 20, 
              left: 20, 
              bgcolor: 'primary.main', 
              px: 2, 
              py: 0.7,
              borderRadius: 50,
              color: 'white',
              fontWeight: 900,
              fontSize: '0.75rem',
              letterSpacing: '0.5px',
              zIndex: 2,
              boxShadow: '0 4px 10px rgba(0,163,173,0.3)'
            }}
          >
            {candidate.matchScore}% MATCH
          </Box>
        )}

        <IconButton 
          sx={{ 
            position: 'absolute', 
            top: 15, 
            right: 15, 
            bgcolor: 'rgba(255,255,255,0.9)',
            '&:hover': { bgcolor: '#fff', transform: 'scale(1.1)' },
            zIndex: 2,
            transition: 'all 0.2s'
          }}
          onClick={() => onInterest(candidate._id)}
        >
          <FavoriteIcon sx={{ color: '#ff5a60' }} />
        </IconButton>
        
        {/* Header/Image Section */}
        <Box sx={{ 
            pt: 6, 
            pb: 3, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #f9fbfc 0%, #fff 100%)'
        }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar 
              src={candidate.photos?.[0]?.url} 
              sx={{ 
                width: 160, 
                height: 160, 
                border: '6px solid #fff', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                fontSize: 60,
                fontWeight: 800
              }}
            >
              {candidate.fullName?.[0]}
            </Avatar>
            {candidate.isVerified && (
              <VerifiedIcon 
                sx={{ 
                  position: 'absolute', 
                  bottom: 8, 
                  right: 8, 
                  color: '#2196f3', 
                  bgcolor: 'white', 
                  borderRadius: '50%',
                  fontSize: 32,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }} 
              />
            )}
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 900, mt: 3, mb: 0.5 }}>{candidate.fullName}</Typography>
          <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>
            {candidate.age} yrs • {candidate.subCaste}
          </Typography>
        </Box>
        
        <CardContent sx={{ px: 4, pt: 0, pb: 3 }}>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
              <Box sx={{ bgcolor: 'rgba(0,163,173,0.1)', p: 1, borderRadius: 2 }}>
                <WorkIcon sx={{ fontSize: 20, color: 'primary.main' }} />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>{candidate.profession}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
              <Box sx={{ bgcolor: 'rgba(255,90,96,0.1)', p: 1, borderRadius: 2 }}>
                <LocationOnIcon sx={{ fontSize: 20, color: '#ff5a60' }} />
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>{candidate.location?.city}, {candidate.location?.state}</Typography>
            </Box>
          </Stack>
        </CardContent>

        <Divider sx={{ mx: 4, mb: 3 }} />

        <Box sx={{ px: 4, pb: 4, mt: 'auto' }}>
          <Button 
            variant="contained" 
            fullWidth 
            size="large"
            onClick={() => onReveal(candidate._id)}
            startIcon={<PhoneIcon />}
            sx={{ 
              borderRadius: '12px',
              py: 2,
              fontWeight: 800,
              fontSize: '1rem',
              boxShadow: '0 8px 20px rgba(0,163,173,0.2)',
              '&:hover': {
                boxShadow: '0 12px 30px rgba(0,163,173,0.3)'
              }
            }}
          >
            Reveal Phone Number
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
};

export default MatchCard;
