import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Accept all valid MUI variants + custom design variants
type CustomVariant = 'pageTitle' | 'sectionTitle' | 'cardTitle' | 'label' | 'helperText';

interface ScoutTypographyProps extends Omit<TypographyProps, 'variant'> {
  variant?: TypographyProps['variant'] | CustomVariant;
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'text' | 'muted' | 'disabled';
}

const StyledTypography = styled(Typography)<ScoutTypographyProps>(({ theme, weight, color: textColor }) => ({
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  }[weight || 'regular'],
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
  // Map custom variants to valid MUI variants
  const getMuiVariant = (v: ScoutTypographyProps['variant']): TypographyProps['variant'] => {
    switch (v) {
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
        return v as TypographyProps['variant']; // now safe
    }
  };

  return (
    <StyledTypography variant={getMuiVariant(variant)} weight={weight} color={color} {...props}>
      {children}
    </StyledTypography>
  );
};

export default ScoutTypography;
export type { ScoutTypographyProps as TypographyProps };
