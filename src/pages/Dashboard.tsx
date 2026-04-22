import { 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Button, 
  Stack,
  Divider
} from '@mui/material';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';

const Dashboard = () => {
  const { user } = useAuthStore();

  const stats = [
    { label: 'New Matches', count: 24, icon: <PeopleIcon color="primary" />, link: '/matches' },
    { label: 'Interests Sent', count: 5, icon: <FavoriteIcon color="error" />, link: '#' },
    { label: 'Interests Received', count: 3, icon: <StarIcon sx={{ color: 'gold' }} />, link: '#' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 800 }}>
          Hello, {user?.name}!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Welcome back to KayasthaBandhan. Here's what's happening with your profile today.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((stat) => (
          <Grid item xs={12} md={4} key={stat.label}>
            <Paper 
              sx={{ 
                p: 3, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                borderRadius: 4,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
              component={Link}
              to={stat.link}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box sx={{ p: 1.5, bgcolor: 'rgba(0,0,0,0.03)', borderRadius: '50%' }}>
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{stat.count}</Typography>
                <Typography variant="body2" color="textSecondary">{stat.label}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom>Your Profile Completeness</Typography>
            <Box sx={{ height: 8, bgcolor: '#eee', borderRadius: 4, my: 2, overflow: 'hidden' }}>
              <Box sx={{ width: '70%', height: '100%', bgcolor: 'primary.main' }} />
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Your profile is 70% complete. Add more details to get better matches!
            </Typography>
            <Button variant="outlined">Complete Profile</Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, borderRadius: 4, bgcolor: 'secondary.main', color: 'white' }}>
            <Typography variant="h6" gutterBottom>Premium Membership</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
              Unlock contact details, see visitors, and get prioritized in searches.
            </Typography>
            <Button variant="contained" color="primary" fullWidth>Upgrade Now</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
