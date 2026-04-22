import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Button, 
  Box, 
  Stack 
} from '@mui/material';
import { Link } from 'react-router-dom';

import LoginModal from './LoginModal';

const PublicNavbar = () => {
  const [openLoginModal, setOpenLoginModal] = React.useState(false);

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={0} 
      sx={{ 
        bgcolor: 'white',
        borderBottom: '1px solid #f0f0f0',
        height: 72,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 100
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography 
            variant="h6" 
            color="primary" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              fontWeight: 900, 
              fontSize: '1.8rem',
              letterSpacing: '-1px'
            }}
          >
            kayasthabandhan<Box component="span" sx={{ color: '#ff5a60' }}>.com</Box>
          </Typography>
          
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button 
                onClick={() => setOpenLoginModal(true)}
                sx={{ 
                    color: 'text.primary', 
                    fontWeight: 700,
                    px: 3,
                    borderRadius: '50px',
                    '&:hover': {
                        color: 'primary.main',
                        bgcolor: 'rgba(0,163,173,0.05)'
                    }
                }}
            >
                Login
            </Button>
            <Button 
                component={Link} 
                to="/register" 
                variant="contained" 
                color="primary"
                sx={{ 
                    fontWeight: 800,
                    px: 3,
                    borderRadius: '50px',
                    boxShadow: 'none'
                }}
            >
                Register
            </Button>
          </Stack>
        </Toolbar>
      </Container>

      <LoginModal 
        open={openLoginModal} 
        handleClose={() => setOpenLoginModal(false)} 
      />
    </AppBar>
  );
};

export default PublicNavbar;
