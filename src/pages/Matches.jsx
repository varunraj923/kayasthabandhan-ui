import { useEffect, useState } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  TextField,
  MenuItem,
  Container,
  Paper,
  Stack
} from '@mui/material';
import api from '../services/api';
import MatchCard from '../components/MatchCard';
import ProfileModal from '../components/ProfileModal';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [filters, setFilters] = useState({
    gender: 'All',
    ageMin: 18,
    ageMax: 50,
    state: '',
    city: ''
  });
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await api.get('/candidates/matches');
        setMatches(response.data);
        
        // Auto-set opposite gender as default filter if user gender is known
        if (user?.gender) {
          setFilters(prev => ({
            ...prev,
            gender: user.gender === 'Male' ? 'Female' : 'Male'
          }));
        }
      } catch (err) {
        setError('Complete your profile to see more accurate matches.');
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [user]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredMatches = matches.filter(match => {
    const matchGender = filters.gender === 'All' || match.gender === filters.gender;
    const matchAge = match.age >= filters.ageMin && match.age <= filters.ageMax;
    const matchState = !filters.state || match.location?.state?.toLowerCase().includes(filters.state.toLowerCase());
    const matchCity = !filters.city || match.location?.city?.toLowerCase().includes(filters.city.toLowerCase());
    const matchSubcaste = filter === 'All' || match.subCaste === filter;

    return matchGender && matchAge && matchState && matchCity && matchSubcaste;
  });

  const handleReveal = async (id) => {
    const candidate = matches.find(m => m._id === id);
    setSelectedCandidate(candidate);

    try {
      // 1. Automatically send interest when number is revealed
      await api.post('/interests/send', { toCandidateId: id });
      
      // 2. Demo Simulation: Trigger a "Received Interest" notification for the user
      const event = new CustomEvent('interestReceived', { 
        detail: { name: candidate?.fullName || 'Someone' } 
      });
      window.dispatchEvent(event);
    } catch (err) {
      console.error('Interest auto-send failed', err);
    }
  };

  const handleInterest = async (id) => {
    try {
      await api.post('/interests/send', { toCandidateId: id });
      
      const candidate = matches.find(m => m._id === id);
      const event = new CustomEvent('interestReceived', { 
        detail: { name: candidate?.fullName || 'Someone' } 
      });
      window.dispatchEvent(event);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send interest');
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 15 }}>
      <CircularProgress thickness={5} size={60} sx={{ color: 'primary.main' }} />
    </Box>
  );

  return (
    <Box>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>My Matches</Typography>
        <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 500 }}>
          Curated list of potential partners matching your preferences
        </Typography>
      </Box>

      {/* Advanced Filter Bar */}
      <Paper sx={{ p: 4, mb: 6, borderRadius: 4, display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
        <TextField 
          select 
          label="Show Me" 
          name="gender"
          value={filters.gender} 
          onChange={handleFilterChange}
          sx={{ width: 150 }}
        >
          <MenuItem value="All">All Genders</MenuItem>
          <MenuItem value="Male">Brides (Male view)</MenuItem>
          <MenuItem value="Female">Grooms (Female view)</MenuItem>
        </TextField>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ width: 300 }}>
          <TextField 
            label="Min Age" 
            name="ageMin"
            type="number" 
            value={filters.ageMin} 
            onChange={handleFilterChange}
          />
          <Typography>-</Typography>
          <TextField 
            label="Max Age" 
            name="ageMax"
            type="number" 
            value={filters.ageMax} 
            onChange={handleFilterChange}
          />
        </Stack>

        <TextField 
            label="State Search" 
            name="state"
            value={filters.state} 
            onChange={handleFilterChange}
            sx={{ width: 180 }}
            placeholder="e.g. Bihar"
        />

        <TextField 
            label="City Search" 
            name="city"
            value={filters.city} 
            onChange={handleFilterChange}
            sx={{ width: 180 }}
            placeholder="e.g. Patna"
        />

        <TextField 
          select 
          label="Subcaste" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          sx={{ width: 180 }}
        >
          {['All', 'Srivastava', 'Saxena', 'Mathur', 'Nigam'].map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>
      </Paper>

      {error && (
        <Alert 
          severity="info" 
          sx={{ 
            mb: 6, 
            borderRadius: 3, 
            py: 2, 
            fontSize: '1rem',
            fontWeight: 600,
            border: '1px solid #cce5ff'
          }}
        >
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {filteredMatches.map((item, index) => (
          <Grid item xs={12} sm={6} lg={4} key={item._id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MatchCard 
                candidate={item} 
                onInterest={handleInterest} 
                onReveal={handleReveal} 
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {filteredMatches.length === 0 && !loading && !error && (
        <Box sx={{ textAlign: 'center', py: 15 }}>
          <Typography variant="h5" color="textSecondary" sx={{ fontWeight: 700 }}>
            We're searching for your best matches...
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Check back later for new profiles.
          </Typography>
        </Box>
      )}

      <ProfileModal 
        open={!!selectedCandidate} 
        onClose={() => setSelectedCandidate(null)} 
        candidate={selectedCandidate} 
        onInterest={handleInterest} 
      />
    </Box>
  );
};

export default Matches;
