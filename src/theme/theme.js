import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00a3ad', // Shaadi teal/aqua
      light: '#33b5bd',
      dark: '#007279',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff5a60', // Shaadi red/pink accent
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#727272',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '3.5rem', fontWeight: 800, color: '#333' },
    h2: { fontSize: '2.5rem', fontWeight: 700, color: '#333' },
    h4: { fontWeight: 700, color: '#333' },
    h6: { fontWeight: 600 },
    button: {
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 32px',
          borderRadius: '50px', // Round buttons for premium feel
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 15px rgba(0, 163, 173, 0.3)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #00a3ad 0%, #00c4cc 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
          border: '1px solid #f1f1f1',
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
