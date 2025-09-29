import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: {
      main: string;
      light: string;
      dark: string;
    };
  }

  interface PaletteOptions {
    tertiary?: {
      main: string;
      light: string;
      dark: string;
    };
  }
}

export const theme = createTheme({

  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    error: {
      main: '#f44336',
      light: '#ef5350',
      dark: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    grey: {
      50: '#f8f9fa',
      100: '#f1f3f4',
      200: '#e8eaed',
      300: '#dadce0',
      400: '#bdc1c6',
      500: '#9aa0a6',
      600: '#80868b',
      700: '#5f6368',
      800: '#3c4043',
      900: '#202124',
    },
    tertiary: {
      main: '#ff5722',
      light: '#ff8a65',
      dark: '#e64a19',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
      
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.3,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f8f9fa',
          fontFamily: "'Inter', sans-serif",
        },

        // Scrollbar styles...
        '*::-webkit-scrollbar': { width: '6px' },
        '*::-webkit-scrollbar-track': { background: '#f1f1f1' },
        '*::-webkit-scrollbar-thumb': { background: '#c1c1c1', borderRadius: '3px' },
        '*::-webkit-scrollbar-thumb:hover': { background: '#a8a8a8' },

        // Autofill fix for all states
        'input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill, input:-webkit-autofill:hover, textarea:-webkit-autofill:hover, select:-webkit-autofill:hover, input:-webkit-autofill:focus, textarea:-webkit-autofill:focus, select:-webkit-autofill:focus, input:-webkit-autofill:active, textarea:-webkit-autofill:active, select:-webkit-autofill:active': {
          // WebkitBoxShadow: '0 0 0 1000px #fff inset !important',
          WebkitTextFillColor: '#000 !important',
          caretColor: '#000',
          transition: 'background-color 5000s ease-in-out 0s',
        },

      },
    },




    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 6,
        },
        containedPrimary: {
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        },
        outlinedPrimary: {
          borderColor: '#1976d2',
          color: '#1976d2',
          '&:hover': {
            borderColor: '#1565c0',
            backgroundColor: 'rgba(25, 118, 210, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #e0e0e0',
          boxShadow: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#333333',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 4,
          '&.Mui-selected': {
            backgroundColor: '#1976d2',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            '& .MuiListItemIcon-root': {
              color: '#ffffff',
            },
          },
          '&:hover': {
            backgroundColor: '#f5f5f5',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
        colorError: {
          backgroundColor: '#f44336',
          color: '#ffffff',
        },
        colorWarning: {
          backgroundColor: '#ff9800',
          color: '#ffffff',
        },
        colorSuccess: {
          backgroundColor: '#4caf50',
          color: '#ffffff',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 8,
          borderRadius: 4,
          backgroundColor: '#e0e0e0',
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        asterisk: {
          color: "red",
        },
        outlined: {
          top: '-4px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            height: 48,

          },
          '& .MuiOutlinedInput-input': {
            padding: '10px 14px',
            height: '100%',
            boxSizing: 'border-box',
          },
          '& .MuiInputLabel-root': {
            lineHeight: 1.2,
            top: '-2px',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          height: 48,

        },
        select: {
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
        },

      }
    },  MuiTableCell: {
      styleOverrides: {
        head: {
          // backgroundColor: "#f5f5f5",
          fontWeight: 800,
          color: "#1c2025",
        },
      },
    },

  },

});

export default theme;