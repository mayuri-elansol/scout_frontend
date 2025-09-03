import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Chip,
  useTheme,
} from '@mui/material';
import { Circle } from '@mui/icons-material';

const Header: React.FC = () => {
  const theme = useTheme();
  
const currentDateTime = new Date().toLocaleString('en-GB', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
});

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: theme.zIndex.drawer + 1,
        height: 64,
        backgroundColor: 'white',
        color: '#1c2025',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important', px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          {/* SCOUT Logo */}
          <Box
            sx={{
              width: 32,
              height: 32,
              backgroundColor: '#1976d2',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            S
          </Box>
          
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: '#1c2025',
                fontSize: '18px',
                lineHeight: 1,
              }}
            >
              SCOUT
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#5c6b7d',
                fontSize: '14px',
                lineHeight: 1,
                mt: 0.25,
              }}
            >
              CCTV Analytics Portal
            </Typography>
          </Box>
        </Box>

        {/* Right side - Date/Time and Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#5c6b7d',
              fontSize: '14px',
            }}
          >
            {currentDateTime}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Circle 
              sx={{ 
                fontSize: 12, 
                color: theme.palette.success.main,
              }} 
            />
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#5c6b7d',
                fontSize: '14px',
              }}
            >
              System Online
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;