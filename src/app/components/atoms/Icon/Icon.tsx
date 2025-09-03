import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as MuiIcons from '@mui/icons-material';

interface ScoutIconProps extends Omit<SvgIconProps, 'color'> {
  name: keyof typeof MuiIcons;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'disabled' | 'action' | 'inherit';
}

const StyledSvgIcon = styled(SvgIcon)<{ 
  iconsize?: string; 
  iconcolor?: string; 
}>(({ theme, iconsize, iconcolor }) => {
  const sizes = {
    small: '16px',
    medium: '20px',
    large: '24px',
    xlarge: '32px',
  };

  const colors = {
    primary: '#1976d2',
    secondary: '#5c6b7d',
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    disabled: '#9e9e9e',
    action: '#6b7280',
    inherit: 'inherit',
  };

  return {
    fontSize: iconsize ? sizes[iconsize as keyof typeof sizes] : '20px',
    color: iconcolor ? colors[iconcolor as keyof typeof colors] : 'inherit',
    transition: 'all 0.2s ease',
  };
});

const ScoutIcon: React.FC<ScoutIconProps> = ({
  name,
  size = 'medium',
  color = 'inherit',
  ...props
}) => {
  // Get the icon component from Material-UI icons
  const IconComponent = MuiIcons[name] as React.ComponentType<SvgIconProps>;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Material-UI icons`);
    return (
      <StyledSvgIcon 
        iconsize={size} 
        iconcolor={color} 
        {...props}
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </StyledSvgIcon>
    );
  }

  return (
    <IconComponent
      sx={{
        fontSize: size === 'small' ? '16px' : 
                 size === 'medium' ? '20px' : 
                 size === 'large' ? '24px' : '32px',
        color: color === 'primary' ? '#1976d2' :
               color === 'secondary' ? '#5c6b7d' :
               color === 'success' ? '#4caf50' :
               color === 'error' ? '#f44336' :
               color === 'warning' ? '#ff9800' :
               color === 'info' ? '#2196f3' :
               color === 'disabled' ? '#9e9e9e' :
               color === 'action' ? '#6b7280' : 'inherit',
        transition: 'all 0.2s ease',
      }}
      {...props}
    />
  );
};

export default ScoutIcon;