import { useEffect, useState } from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Button, 
  Stack,
  Divider,
  CircularProgress
} from '@mui/material';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [counts, setCounts] = useState({
    newMatches: 0,
    sentInterests: 0,
    receivedInterests: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/auth/stats');
        setCounts(response.data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'New Matches', count: counts.newMatches, icon: <PeopleIcon color="primary" />, link: '/dashboard/matches' },
    { label: 'Interests Sent', count: counts.sentInterests, icon: <FavoriteIcon sx={{ color: '#ff5a60' }} />, link: '#' },
    { label: 'Interests Received', count: counts.receivedInterests, icon: <StarIcon sx={{ color: 'gold' }} />, link: '#' },
  ];

  return (
    <Box>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 900, color: '#333' }}>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 500 }}>
          Here's a quick look at your matchmaking activity today.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {stats.map((stat) => (
          <Grid item xs={12} md={4} key={stat.label}>
            <Paper 
              sx={{ 
                p: 4, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 3, 
                borderRadius: 4,
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: '1px solid #f0f0f0',
                '&:hover': { 
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  borderColor: 'primary.light'
                }
              }}
              component={Link}
              to={stat.link}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box sx={{ p: 2, bgcolor: 'rgba(0,163,173,0.05)', borderRadius: '50%' }}>
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>{stat.count}</Typography>
                <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600 }}>{stat.label}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 5, borderRadius: 4, border: '1px solid #f0f0f0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Profile Strength</Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {user?.profileCompletion || 0}% COMPLETE
              </Typography>
            </Box>
            <Box sx={{ height: 12, bgcolor: '#f0f0f0', borderRadius: 6, mb: 4, overflow: 'hidden' }}>
              <Box 
                sx={{ 
                  width: `${user?.profileCompletion || 0}%`, 
                  height: '100%', 
                  bgcolor: 'primary.main', 
                  borderRadius: 6,
                  transition: 'width 1s ease-in-out'
                }} 
              />
            </Box>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 4, lineHeight: 1.6 }}>
              {user?.profileCompletion < 100 
                ? "Profiles with 100% completeness receive 3x more interests. Add your education and photos to stand out!"
                : "Your profile is 100% complete! This increases your visibility to potential matches."}
            </Typography>
            <Button 
              variant="contained" 
              endIcon={<ArrowForwardIcon />} 
              sx={{ borderRadius: '50px', px: 4 }}
              component={Link}
              to="/dashboard/profile"
            >
              {user?.profileCompletion < 100 ? "Complete My Profile" : "View My Profile"}
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            sx={{ 
                p: 5, 
                borderRadius: 4, 
                bgcolor: '#2e3b55', 
                color: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Go Premium</Typography>
                <Typography variant="body1" sx={{ opacity: 0.8, mb: 4, lineHeight: 1.6 }}>
                  Directly contact matches, see who visited you, and unlock unlimited searches.
                </Typography>
                <Button variant="contained" color="secondary" fullWidth sx={{ borderRadius: '50px', py: 1.5, fontWeight: 800 }}>
                  Upgrade Now
                </Button>
            </Box>
            <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
