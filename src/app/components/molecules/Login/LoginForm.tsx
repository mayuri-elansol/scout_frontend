'use client';

import React from 'react';
import {
  CardContent,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Lock,
  AccountCircle,
} from '@mui/icons-material';

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  formData: LoginFormData;
  showPassword: boolean;
  isLoading: boolean;
  error: string;
  onInputChange: (field: keyof LoginFormData) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onSubmit: (event: React.FormEvent) => void;
  setError: (error: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  showPassword,
  isLoading,
  error,
  onInputChange,
  onTogglePassword,
  onSubmit,
  setError,
}) => {
  return (
    <CardContent sx={{ padding: 4 }}>
      <form onSubmit={onSubmit}>
        {error && (
          <Paper
            elevation={1}
            sx={{ 
              mb: 3,
              p: 2,
              backgroundColor: '#fff5f5',
              border: '1px solid #fecaca',
              borderRadius: 2,
            }}
          >
            <Alert 
              severity="error" 
              sx={{ 
                backgroundColor: 'transparent',
                '& .MuiAlert-message': {
                  color: '#dc2626',
                  fontSize: '14px',
                  fontWeight: 500,
                },
              }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          </Paper>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography 
            component="label"
            variant="body2" 
            sx={{ 
              color: '#1c2025',
              fontWeight: 600,
              mb: 1.5,
              fontSize: '15px',
              display: 'block',
            }}
          >
            Username
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={formData.username}
            onChange={onInputChange('username')}
            placeholder="Enter your username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle sx={{ color: '#6b7280' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fafafa',
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                '& fieldset': {
                  borderColor: '#e5e7eb',
                  borderWidth: '2px',
                },
                '&:hover': {
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#1976d2',
                  },
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
                  '& fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              },
            }}
            disabled={isLoading}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography 
            component="label"
            variant="body2" 
            sx={{ 
              color: '#1c2025',
              fontWeight: 600,
              mb: 1.5,
              fontSize: '15px',
              display: 'block',
            }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={onInputChange('password')}
            placeholder="Enter your password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: '#6b7280' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={onTogglePassword}
                    edge="end"
                    disabled={isLoading}
                    sx={{ 
                      color: '#6b7280',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fafafa',
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                '& fieldset': {
                  borderColor: '#e5e7eb',
                  borderWidth: '2px',
                },
                '&:hover': {
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#1976d2',
                  },
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 0 3px rgba(25, 118, 210, 0.1)',
                  '& fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              },
            }}
            disabled={isLoading}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rememberMe}
                onChange={onInputChange('rememberMe')}
                disabled={isLoading}
                sx={{
                  color: '#6b7280',
                  '&.Mui-checked': {
                    color: '#1976d2',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" sx={{ color: '#5c6b7d', fontSize: '15px', fontWeight: 500 }}>
                Remember me
              </Typography>
            }
          />
          <Button
            variant="text"
            size="small"
            disabled={isLoading}
            sx={{ 
              textTransform: 'none', 
              fontSize: '15px',
              color: '#1976d2',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                textDecoration: 'none',
              },
            }}
          >
            Forgot Password?
          </Button>
        </Box>

        <button
          type="submit"
          disabled={isLoading || !formData.username || !formData.password}
          style={{
            width: '100%',
            padding: '14px 16px',
            fontSize: '16px',
            fontWeight: 600,
            textTransform: 'none',
            backgroundColor: (isLoading || !formData.username || !formData.password) ? '#e5e7eb' : '#1976d2',
            color: (isLoading || !formData.username || !formData.password) ? '#9ca3af' : '#ffffff',
            border: 'none',
            borderRadius: '8px',
            cursor: (isLoading || !formData.username || !formData.password) ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)',
            transition: 'all 0.2s ease-in-out',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => {
            if (!isLoading && formData.username && formData.password) {
              e.currentTarget.style.backgroundColor = '#1565c0';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading && formData.username && formData.password) {
              e.currentTarget.style.backgroundColor = '#1976d2';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(25, 118, 210, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
          onMouseDown={(e) => {
            if (!isLoading && formData.username && formData.password) {
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </CardContent>
  );
};

export default LoginForm;
