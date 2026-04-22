import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Button, 
  Box, 
  Avatar, 
  IconButton, 
  Menu, 
  MenuItem 
} from '@mui/material';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import React, { useState } from 'react';

const Layout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: '1px solid #eee', bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography 
              variant="h6" 
              color="primary" 
              component={Link} 
              to="/" 
              sx={{ flexGrow: 1, textDecoration: 'none', fontWeight: 800, fontSize: '1.5rem' }}
            >
              KayasthaBandhan
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button component={Link} to="/" color="inherit">Dashboard</Button>
              <Button component={Link} to="/matches" color="inherit">My Matches</Button>
              
              <IconButton onClick={handleMenu} sx={{ ml: 1 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32, fontSize: '0.875rem' }}>
                  {user?.name?.[0].toUpperCase()}
                </Avatar>
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ mt: 1 }}
              >
                <MenuItem disabled>{user?.email}</MenuItem>
                <MenuItem onClick={handleClose}>Profile Settings</MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ py: 4, minHeight: 'calc(100vh - 64px)', bgcolor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
