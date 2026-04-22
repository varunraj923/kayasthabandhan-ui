import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Avatar, 
  Button, 
  Chip, 
  Divider,
  Stack
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import VerifiedIcon from '@mui/icons-material/Verified';

interface MatchCardProps {
  candidate: any;
  onInterest: (id: string) => void;
  onView: (id: string) => void;
}

const MatchCard = ({ candidate, onInterest, onView }: MatchCardProps) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {candidate.matchScore && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 16, 
            right: 16, 
            bgcolor: 'success.light', 
            px: 1, 
            borderRadius: 1,
            color: 'white',
            fontWeight: 700,
            fontSize: '0.75rem'
          }}
        >
          {candidate.matchScore}% Match
        </Box>
      )}
      
      <CardContent sx={{ pt: 4, textAlign: 'center', flexGrow: 1 }}>
        <Avatar 
          src={candidate.photos?.[0]?.url} 
          sx={{ width: 100, height: 100, mx: 'auto', mb: 2, border: '4px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
        >
          {candidate.fullName[0]}
        </Avatar>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 1 }}>
          <Typography variant="h6">{candidate.fullName}</Typography>
          {candidate.isVerified && <VerifiedIcon color="info" sx={{ fontSize: 18 }} />}
        </Box>
        
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {candidate.age} yrs • {candidate.subCaste}
        </Typography>

        <Stack spacing={1} sx={{ mt: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
            <WorkIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2">{candidate.profession}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
            <LocationOnIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2">{candidate.location.city}, {candidate.location.state}</Typography>
          </Box>
        </Stack>
      </CardContent>

      <Divider />
      
      <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
        <Button 
          variant="outlined" 
          fullWidth 
          size="small"
          onClick={() => onInterest(candidate._id)}
        >
          Send Interest
        </Button>
        <Button 
          variant="contained" 
          fullWidth 
          size="small"
          onClick={() => onView(candidate._id)}
        >
          View Profile
        </Button>
      </Box>
    </Card>
  );
};

export default MatchCard;
