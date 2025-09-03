import React from 'react';
import { TextField, TextFieldProps, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Search as SearchIcon } from '@mui/icons-material';

interface ScoutInputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'default' | 'search';
  width?: string | number;
}

const StyledTextField = styled(TextField)<{ inputvariant?: string; width?: string | number }>(({ theme, inputvariant, width }) => ({
  width: width || '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    backgroundColor: '#ffffff',
    fontSize: '14px',
    minHeight: '40px',
    transition: 'all 0.2s ease',
    '& fieldset': {
      borderColor: '#d1d5db',
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: '#9ca3af',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
      borderWidth: '2px',
    },
    '&.Mui-error fieldset': {
      borderColor: '#f44336',
    },
  },
  '& .MuiInputLabel-root': {
    fontSize: '14px',
    color: '#6b7280',
    '&.Mui-focused': {
      color: '#1976d2',
    },
    '&.Mui-error': {
      color: '#f44336',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 14px',
    fontSize: '14px',
    '&::placeholder': {
      color: '#9ca3af',
      opacity: 1,
    },
  },
  '& .MuiFormHelperText-root': {
    fontSize: '12px',
    margin: '4px 0 0 0',
    '&.Mui-error': {
      color: '#f44336',
    },
  },
  ...(inputvariant === 'search' && {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#f9fafb',
      '& fieldset': {
        borderColor: '#e5e7eb',
      },
      '&:hover fieldset': {
        borderColor: '#d1d5db',
      },
    },
  }),
}));

const ScoutInput: React.FC<ScoutInputProps> = ({
  variant = 'default',
  width,
  ...props
}) => {
  const getInputProps = () => {
    if (variant === 'search') {
      return {
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ fontSize: 20, color: '#6b7280' }} />
          </InputAdornment>
        ),
      };
    }
    return {};
  };

  return (
    <StyledTextField
      inputvariant={variant}
      width={width}
      InputProps={getInputProps()}
      {...props}
    />
  );
};

export default ScoutInput;