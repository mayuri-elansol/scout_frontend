import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ScoutTypographyProps extends Omit<TypographyProps, 'variant'> {
  variant?: 
    | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    | 'subtitle1' | 'subtitle2'
    | 'body1' | 'body2'
    | 'caption' | 'overline'
    | 'pageTitle' | 'sectionTitle' | 'cardTitle' | 'label' | 'helperText';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'text' | 'muted' | 'disabled';
}

const StyledTypography = styled(Typography)<ScoutTypographyProps>(({ theme, weight, color: textColor }) => ({
  // Font weight mapping
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  }[weight || 'regular'],

  // Color mapping
  color: {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    error: theme.palette.error.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
    text: theme.palette.text.primary,
    muted: theme.palette.text.secondary,
    disabled: theme.palette.text.disabled,
  }[textColor || 'text'],
}));

const ScoutTypography: React.FC<ScoutTypographyProps> = ({ 
  variant = 'body1', 
  weight = 'regular',
  color = 'text',
  children,
  ...props 
}) => {
  // Map custom variants to Material UI variants
  const getMuiVariant = (customVariant: string): any => {
    switch (customVariant) {
      case 'pageTitle':
        return 'h3';
      case 'sectionTitle':
        return 'h5';
      case 'cardTitle':
        return 'h6';
      case 'label':
        return 'body2';
      case 'helperText':
        return 'caption';
      default:
        return customVariant;
    }
  };

  return (
    <StyledTypography
      variant={getMuiVariant(variant)}
      weight={weight}
      color={color}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

export default ScoutTypography;
export type { ScoutTypographyProps as TypographyProps };
