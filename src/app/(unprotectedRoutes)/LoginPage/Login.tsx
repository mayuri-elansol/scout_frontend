'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  Container,
  ThemeProvider,
  CssBaseline,
  Paper,
  Typography,
} from '@mui/material';
import { theme } from '@/app/theme/theme';
import LoginHeader from '../../components/molecules/Login/LoginHeader';
import LoginForm from '../../components/molecules/Login/LoginForm';
import { Shield } from '@mui/icons-material';
import users from './user.json';

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [cardHovered, setCardHovered] = useState(false);

  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const currentDateTime = new Date().toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const handleInputChange = (field: keyof LoginFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError('');
  };


const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault(); // prevent page refresh
  setError('');
  setIsLoading(true);

  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch('/data/user.json');
    const users = await response.json();

 const foundUser = users.find(
  (u: any) =>
    u.username === formData.username &&
    u.password === formData.password
);


if (foundUser) {
  // Example: generate a mock token
  const token = `token-${Date.now()}`;

  // Save token
  localStorage.setItem('scout_auth_token', token);

  // Save user data
  localStorage.setItem(
    'scout_user',
    JSON.stringify({
      username: foundUser.username,
    
      lastLogin: new Date().toISOString(),
    })
  );

  router.push('/DashboardPage');
} else {
  setError('Invalid username or password');
}

  } catch (err) {
    console.error(err);
    setError('Login failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        {/* Header */}
        <LoginHeader currentDateTime={currentDateTime} />

        {/* Login Content */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 88px)',
            padding: 4,
          }}
        >
          <Container maxWidth="sm">
            <Card
              elevation={cardHovered ? 4 : 2}
              onMouseEnter={() => setCardHovered(true)}
              onMouseLeave={() => setCardHovered(false)}
              sx={{
                borderRadius: 2,
                maxWidth: 520,
                margin: '0 auto',
                backgroundColor: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: cardHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: cardHovered 
                  ? '0 8px 16px rgba(0,0,0,0.12), 0 0 0 1px rgba(25, 118, 210, 0.1)'
                  : '0 2px 8px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                  borderRadius: '8px 8px 0 0',
                },
              }}
            >
              {/* Card Header */}
              <Box
                sx={{
                  padding: 4,
                  paddingTop: 5,
                  textAlign: 'center',
                  backgroundColor: '#ffffff',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: '#1976d2',
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    margin: '0 auto 20px',
                  }}
                >
                  <Shield sx={{ fontSize: 28 }} />
                </Box>
                
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 1,
                    color: '#000000',
                    fontSize: '28px',
                  }}
                >
                  Sign in to SCOUT
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#5c6b7d',
                    fontSize: '16px',
                  }}
                >
                  Sign in to access your SCOUT dashboard
                </Typography>
              </Box>

              {/* Login Form */}
              <LoginForm
                formData={formData}
                showPassword={showPassword}
                isLoading={isLoading}
                error={error}
                onInputChange={handleInputChange}
                onTogglePassword={handleTogglePassword}
                onSubmit={handleSubmit}
                setError={setError}
              />

              {/* Footer */}
              <Paper
                elevation={0}
                sx={{
                  textAlign: 'center',
                  py: 3,
                  backgroundColor: '#fafafa',
                  borderTop: '1px solid #f0f0f0',
                  borderRadius: '0 0 8px 8px',
                }}
              >
                <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '13px', fontWeight: 500 }}>
                  © 2025 SCOUT Security System. All rights reserved.
                </Typography>
              </Paper>
            </Card>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
