import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Stack,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PsychologyIcon from '@mui/icons-material/Psychology';
import StarIcon from '@mui/icons-material/Star';

import heroImage from '../assets/hero.png';
import varunImage from '../assets/varun.png';
import PublicNavbar from '../components/PublicNavbar';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: '30 Day Money Back Guarantee',
      desc: 'Get matched with someone special within 30 days, or we\'ll refund your money—guaranteed!',
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 40, color: '#00bcd4' }} />,
      bgColor: '#e0f7fa'
    },
    {
      title: 'Blue Tick to find your Green Flag',
      desc: 'Did you know our blue-tick profiles get 40% more connection requests than others?',
      icon: <VerifiedUserIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
      bgColor: '#e8f5e9'
    },
    {
      title: 'Matchmaking Powered by AI',
      desc: 'Cutting-edge technology with two decades of expertise to help you find "the one".',
      icon: <PsychologyIcon sx={{ fontSize: 40, color: '#2196f3' }} />,
      bgColor: '#e3f2fd'
    }
  ];

  return (
    <Box>
      <PublicNavbar />
      {/* Hero Section */}
      <Box 
        sx={{ 
          height: '92vh', 
          width: '100%',
          position: 'relative',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          display: 'flex',
          alignItems: 'flex-end', // Push content to bottom
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            // Gradient: Transparent at top, Dark at bottom
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.9) 100%)',
            zIndex: 1
          }
        }}
      >
        <Container sx={{ position: 'relative', textAlign: 'center', color: 'white', pb: 12, zIndex: 2 }}>
          <Box sx={{ mb: 2, display: 'inline-block', px: 2, py: 0.5, bgcolor: 'rgba(0,163,173,0.9)', borderRadius: '50px' }}>
            <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 1 }}>MADE BY BIHARI • FOR THE WORLD</Typography>
          </Box>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '3.2rem', md: '5.5rem' }, 
              fontWeight: 900, 
              mb: 2,
              color: '#ffffff', // Pure white for legibility
              textShadow: '0 4px 15px rgba(0,0,0,0.6)'
            }}
          >
            Find your forever ❤️
          </Typography>
          <Typography variant="h5" sx={{ mb: 6, fontWeight: 500, opacity: 1, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            A mission by <Box component="span" sx={{ fontWeight: 900, color: '#00bcd4', textDecoration: 'underline', textUnderlineOffset: '4px' }}>Varun Raj</Box> to strengthen the <Box component="span" sx={{ fontWeight: 800 }}>Kayastha community</Box>
          </Typography>
          
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/register')}
              sx={{ 
                px: 6, 
                py: 2, 
                fontSize: '1.2rem', 
                borderRadius: '50px',
                bgcolor: '#00bcd4',
                '&:hover': { bgcolor: '#00acc1' }
              }}
            >
              Find Your Match
            </Button>
          </Stack>
          
          <Typography variant="body1" sx={{ mt: 3, fontWeight: 700, color: '#fffa65' }}>
            🎉 SPECIAL LAUNCH OFFER: FIRST 10 MATCHES ABSOLUTELY FREE!
          </Typography>
        </Container>
      </Box>

      {/* Trust Bar */}
      <Box sx={{ bgcolor: 'black', py: 2, color: 'white' }}>
        <Container>
          <Grid container justifyContent="center" alignItems="center" spacing={4}>
            <Grid item><Typography variant="body2" sx={{ fontWeight: 700 }}>Proudly Made in Bihar</Typography></Grid>
            <Grid item sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Box sx={{ display: 'flex' }}>{[1,2,3,4,5].map(i => <StarIcon key={i} sx={{ color: 'gold', fontSize: 16 }} />)}</Box>
              <Typography variant="body2">Trusted by 10,000+ Bihari Families</Typography>
            </Grid>
            <Grid item><Typography variant="body2">Strengthening the Kayastha Bond</Typography></Grid>
          </Grid>
        </Container>
      </Box>

      {/* Meet the Creator & Why Choose Us Section */}
      <Box sx={{ bgcolor: '#ffffff', py: { xs: 10, md: 15 }, borderBottom: '1px solid #f0f0f0' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Left side: Story & Mission */}
            <Grid item xs={12} lg={7}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="overline" color="primary" sx={{ fontWeight: 900, letterSpacing: 3, fontSize: '0.9rem' }}>
                  BUILT BY
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 2.5, fontSize: { xs: '2.4rem', md: '2.8rem' } }}>
                  A personal mission to <Box component="span" sx={{ color: 'primary.main' }}>Unite</Box> us all.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.7, mb: 3.5 }}>
                  I built KayasthaBandhan with a single goal: to provide a dedicated, genuine, and free platform for our community.
                  In a world of generic matchmaking, I wanted something that understands our unique values and roots.
                </Typography>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#777', borderLeft: '4px solid #00bcd4', pl: 3, mb: 4 }}>
                  "This platform is a work of love and is currently under development. I am committed to adding more industry-level features."
                </Typography>
                
                <Stack 
                  direction={{ xs: 'column', md: 'row' }} 
                  spacing={5} 
                  alignItems="center" 
                  sx={{ 
                    bgcolor: '#ffffff', 
                    p: { xs: 4, md: 6 }, 
                    borderRadius: 10, 
                    border: '1px solid #e0f2f1',
                    boxShadow: '0 40px 100px rgba(0,163,173,0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    '&:hover': { 
                      transform: 'translateY(-10px)', 
                      boxShadow: '0 50px 120px rgba(0,163,173,0.2)',
                      borderColor: 'primary.light'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0, left: 0, right: 0, height: '6px',
                      background: 'linear-gradient(90deg, #00bcd4, #00acc1)'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '300px',
                      height: '300px',
                      background: 'radial-gradient(circle, rgba(0,188,212,0.05) 0%, rgba(255,255,255,0) 70%)',
                      top: '-150px',
                      right: '-150px',
                      zIndex: 0
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 5, width: '100%' }}>
                    <Avatar 
                      src={varunImage} 
                      sx={{ 
                        width: { xs: 160, md: 220 }, 
                        height: { xs: 160, md: 220 }, 
                        boxShadow: '0 25px 60px rgba(0,163,173,0.45)',
                        border: '8px solid #fff',
                        outline: '3px solid #00bcd4'
                      }} 
                    />
                  <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Box sx={{ bgcolor: 'primary.main', color: 'white', px: 2, py: 0.6, borderRadius: 1.5, display: 'inline-block', mb: 2, boxShadow: '0 4px 15px rgba(0,188,212,0.3)' }}>
                      <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1.5 }}>
                        PLATFORM BUILT BY
                      </Typography>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, color: '#1a1a1a', mb: 1, fontSize: { xs: '2.5rem', md: '3.2rem' } }}>
                      Varun Raj
                    </Typography>
                    <Typography 
                      variant="h6" 
                      color="primary" 
                      sx={{ 
                        fontWeight: 800, 
                        lineHeight: 1.5,
                        fontSize: '1.2rem',
                        mb: 2.5
                      }}
                    >
                      Trainee Software Engineer at ComplianceMedQra
                      <Box component="span" sx={{ display: 'block', color: 'text.primary', mt: 1, fontWeight: 700 }}>
                        & Upcoming Associate Software Engineer at LTM
                      </Box>
                      <Box component="span" sx={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'text.secondary', mt: 0.5 }}>
                        (A Larsen & Toubro Group Company)
                      </Box>
                    </Typography>
                    
                    <Box sx={{ bgcolor: 'rgba(0,163,173,0.08)', color: 'primary.main', px: 3, py: 1, borderRadius: 3, display: 'inline-block', border: '1px solid rgba(0,163,173,0.2)' }}>
                      <Typography variant="body2" sx={{ fontWeight: 900 }}>varunsrivastava.dev@gmail.com</Typography>
                    </Box>
                  </Box>
                </Box>
                </Stack>
              </Box>
            </Grid>

            {/* Right side: Why Choose Us */}
            <Grid item xs={12} lg={5}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: { xs: 4, md: 4.5 }, 
                  borderRadius: 7, 
                  bgcolor: '#00bcd4', 
                  color: 'white',
                  boxShadow: '0 25px 60px rgba(0,188,212,0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Decorative background element */}
                <Box sx={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)' }} />
                
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 4 }}>Why choose us?</Typography>
                
                <Stack spacing={3}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 0.8, borderRadius: 1.5, height: 'fit-content' }}>
                      <StarIcon sx={{ color: '#fff', fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: '0.95rem' }}>Separate & Dedicated</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.8rem' }}>Designed specifically for our community.</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 0.8, borderRadius: 1.5, height: 'fit-content' }}>
                      <AccountBalanceWalletIcon sx={{ color: '#fff', fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: '0.95rem' }}>100% Free of Cost</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.8rem' }}>No hidden charges or subscriptions.</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ bgcolor: 'rgba(255,255,255,0.2)', p: 0.8, borderRadius: 1.5, height: 'fit-content' }}>
                      <VerifiedUserIcon sx={{ color: '#fff', fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: '0.95rem' }}>Genuine Profiles</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '0.8rem' }}>Direct family contact for maximum trust.</Typography>
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 12 }}>
        <Typography variant="h2" align="center" sx={{ mb: 8, fontWeight: 800 }}>
          The Kayastha Experience
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3, transition: '0.3s', '&:hover': { transform: 'translateY(-10px)' } }}>
                <Box sx={{ width: 80, height: 80, borderRadius: '20px', bgcolor: feature.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {feature.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
