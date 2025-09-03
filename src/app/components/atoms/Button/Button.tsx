import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ScoutButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'download' | 'clear';
  children: React.ReactNode;
}

const StyledButton = styled(MuiButton)<{ buttonvariant?: string }>(({ theme, buttonvariant }) => {
  const baseStyles = {
    textTransform: 'none' as const,
    fontWeight: 500,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1, 2),
    fontSize: '14px',
    minHeight: '36px',
    transition: 'all 0.2s ease',
  };

  switch (buttonvariant) {
    case 'primary':
      return {
        ...baseStyles,
        backgroundColor: '#1976d2',
        color: 'white',
        border: '1px solid #1976d2',
        '&:hover': {
          backgroundColor: '#1565c0',
          borderColor: '#1565c0',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 8px rgba(25, 118, 210, 0.3)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
        '&:disabled': {
          backgroundColor: '#e0e0e0',
          color: '#9e9e9e',
          borderColor: '#e0e0e0',
        },
      };
    case 'secondary':
      return {
        ...baseStyles,
        backgroundColor: 'transparent',
        color: '#1976d2',
        border: '1px solid #1976d2',
        '&:hover': {
          backgroundColor: 'rgba(25, 118, 210, 0.04)',
          borderColor: '#1565c0',
          color: '#1565c0',
        },
        '&:disabled': {
          color: '#9e9e9e',
          borderColor: '#e0e0e0',
        },
      };
    case 'download':
      return {
        ...baseStyles,
        backgroundColor: '#4caf50',
        color: 'white',
        border: '1px solid #4caf50',
        '&:hover': {
          backgroundColor: '#45a049',
          borderColor: '#45a049',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 8px rgba(76, 175, 80, 0.3)',
        },
      };
    case 'clear':
      return {
        ...baseStyles,
        backgroundColor: '#f44336',
        color: 'white',
        border: '1px solid #f44336',
        '&:hover': {
          backgroundColor: '#d32f2f',
          borderColor: '#d32f2f',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 8px rgba(244, 67, 54, 0.3)',
        },
      };
    default:
      return {
        ...baseStyles,
        backgroundColor: '#1976d2',
        color: 'white',
        border: '1px solid #1976d2',
        '&:hover': {
          backgroundColor: '#1565c0',
          borderColor: '#1565c0',
        },
      };
  }
});

const ScoutButton: React.FC<ScoutButtonProps> = ({
  variant = 'primary',
  children,
  ...props
}) => {
  return (
    <StyledButton
      buttonvariant={variant}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default ScoutButton;