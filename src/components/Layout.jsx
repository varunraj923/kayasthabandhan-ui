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
  MenuItem,
  Stack,
  Grid,
  Snackbar,
  Alert,
  Badge,
  List,
  ListItem,
  ListItemText,
  Popover,
  Divider
} from '@mui/material';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import api from '../services/api';

const Layout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notiAnchorEl, setNotiAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', name: '' });

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleInterestReceived = (event) => {
      fetchNotifications();
      setNotification({
        open: true,
        message: 'shows interest on your profile',
        name: event.detail.name
      });
    };

    window.addEventListener('interestReceived', handleInterestReceived);
    return () => window.removeEventListener('interestReceived', handleInterestReceived);
  }, []);

  const handleNotiClick = (event) => setNotiAnchorEl(event.currentTarget);
  const handleNotiClose = () => setNotiAnchorEl(null);

  const handleMarkAllRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      fetchNotifications();
      handleNotiClose();
    } catch (err) {
      console.error('Failed to mark notifications as read', err);
    }
  };

  const handleMenu = (event) => {
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
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={0} 
        sx={{ 
          bgcolor: 'white', 
          borderBottom: '1px solid #f0f0f0',
          height: 72,
          display: 'flex',
          justifyContent: 'center'
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
                letterSpacing: '-0.5px'
              }}
            >
              kayasthabandhan<Box component="span" sx={{ color: '#ff5a60' }}>.com</Box>
            </Typography>
            
            <Stack direction="row" spacing={1} alignItems="center">
              <Button component={Link} to="/dashboard" color="inherit" sx={{ fontWeight: 600 }}>Dashboard</Button>
              <Button component={Link} to="/dashboard/matches" color="inherit" sx={{ fontWeight: 600 }}>My Matches</Button>
              
              <IconButton color="inherit" onClick={handleNotiClick} sx={{ ml: 1 }}>
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <IconButton onClick={handleMenu} sx={{ ml: 1 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    width: 38, 
                    height: 38, 
                    fontSize: '1rem',
                    fontWeight: 700
                  }}
                >
                  {user?.name?.[0].toUpperCase()}
                </Avatar>
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                sx={{ mt: 1 }}
              >
                <MenuItem disabled sx={{ fontWeight: 600, color: 'text.secondary' }}>{user?.email}</MenuItem>
                <MenuItem onClick={() => { handleClose(); navigate('/dashboard/profile'); }}>My Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main', fontWeight: 600 }}>Logout</MenuItem>
              </Menu>

              <Popover
                open={Boolean(notiAnchorEl)}
                anchorEl={notiAnchorEl}
                onClose={handleNotiClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: { width: 320, maxHeight: 450, mt: 1, borderRadius: 3, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }
                }}
              >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Notifications</Typography>
                  {unreadCount > 0 && (
                    <Button size="small" onClick={handleMarkAllRead}>Mark all read</Button>
                  )}
                </Box>
                <Divider />
                <List sx={{ p: 0 }}>
                  {notifications.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: 'center' }}>
                      <Typography variant="body2" color="textSecondary">No notifications yet</Typography>
                    </Box>
                  ) : (
                    notifications.map((n) => (
                      <ListItem 
                        key={n._id} 
                        divider 
                        sx={{ 
                          bgcolor: n.isRead ? 'transparent' : 'rgba(0,163,173,0.05)',
                          '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
                        }}
                      >
                        <ListItemText 
                          primary={n.message}
                          secondary={new Date(n.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          primaryTypographyProps={{ variant: 'body2', fontWeight: n.isRead ? 500 : 700 }}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                    ))
                  )}
                </List>
              </Popover>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ minHeight: 'calc(100vh - 72px)', bgcolor: '#f8f9fa' }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Outlet />
        </Container>
      </Box>

      {/* Localized Footer */}
      <Box sx={{ py: 6, bgcolor: 'white', borderTop: '1px solid #eee' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} md={4}>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 900, mb: 2 }}>
                kayasthabandhan<Box component="span" sx={{ color: '#ff5a60' }}>.com</Box>
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                A personal mission by <Box component="span" sx={{ color: 'primary.main', fontWeight: 800 }}>Varun Raj</Box> to strengthen our community.
                This entire platform is <b>Built by him</b> to help families connect easily.
              </Typography>
              <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>
                © 2026 • Platform Built by <b>Varun Raj</b>
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>Community</Typography>
              <Stack spacing={1}>
                <Link to="/" style={{ textDecoration: 'none', color: '#666', fontSize: '0.875rem' }}>Bihar Matches</Link>
                <Link to="/" style={{ textDecoration: 'none', color: '#666', fontSize: '0.875rem' }}>Kayastha Global</Link>
                <Link to="/" style={{ textDecoration: 'none', color: '#666', fontSize: '0.875rem' }}>Success Stories</Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>Support</Typography>
              <Stack spacing={1}>
                <Link to="/" style={{ textDecoration: 'none', color: '#666', fontSize: '0.875rem' }}>10 Free Matches</Link>
                <Link to="/" style={{ textDecoration: 'none', color: '#666', fontSize: '0.875rem' }}>Privacy Policy</Link>
                <Link to="/" style={{ textDecoration: 'none', color: '#666', fontSize: '0.875rem' }}>Contact Varun</Link>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setNotification({ ...notification, open: false })} 
          severity="success" 
          icon={<FavoriteIcon fontSize="inherit" />}
          sx={{ 
            width: '100%', 
            borderRadius: 3, 
            fontWeight: 700,
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            bgcolor: 'white',
            color: 'primary.main',
            border: '1px solid',
            borderColor: 'primary.light'
          }}
        >
          {notification.name} {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Layout;
