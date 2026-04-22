import { useEffect, useState } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  TextField,
  MenuItem
} from '@mui/material';
import api from '../services/api';
import MatchCard from '../components/MatchCard';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await api.get('/candidates/matches');
        setMatches(response.data);
      } catch (err: any) {
        setError('Failed to fetch matches. Please ensure your profile is complete.');
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const handleInterest = async (id: string) => {
    try {
      await api.post('/interests/send', { toCandidateId: id });
      alert('Interest sent successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to send interest');
    }
  };

  const handleView = (id: string) => {
    // Navigate to profile detail (to be implemented)
    console.log('Viewing profile:', id);
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Your Matches</Typography>
        
        <TextField 
          select 
          label="Filter by Subcaste" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          sx={{ width: 200 }}
          size="small"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Srivastava">Srivastava</MenuItem>
          <MenuItem value="Saxena">Saxena</MenuItem>
          <MenuItem value="Mathur">Mathur</MenuItem>
        </TextField>
      </Box>

      {error && <Alert severity="warning" sx={{ mb: 4 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {matches.map((item: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
            <MatchCard 
              candidate={item} 
              onInterest={handleInterest} 
              onView={handleView} 
            />
          </Grid>
        ))}
      </Grid>

      {matches.length === 0 && !loading && !error && (
        <Typography align="center" variant="h6" color="textSecondary" sx={{ py: 10 }}>
          No matches found matching your preferences yet.
        </Typography>
      )}
    </Box>
  );
};

export default Matches;
