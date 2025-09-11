import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ExpandMore } from "@mui/icons-material";

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface ScoutSelectProps extends Omit<SelectProps, "onChange" | "variant"> {
  id: string;
  label?: string;
  helperText?: string;
  options: SelectOption[];
  error?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  size?: "small" | "medium";
  variant?: "outlined" | "filled" | "standard";
  placeholder?: string;
  width?: string;
  onChange: (value: string | number) => void;
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    marginTop: 4,
  },
}));

const StyledSelect = styled(Select)<{
  variant: "outlined" | "filled" | "standard";
}>(({ theme, variant }) => ({
  "& .MuiSelect-icon": {
    color: theme.palette.text.secondary,
  },
  ...(variant === "outlined" && {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.divider,
    },
  }),
}));

const ScoutSelect: React.FC<ScoutSelectProps> = ({
  id,
  label,
  helperText,
  options,
  error = false,
  required = false,
  fullWidth = false,
  size = "medium",
  variant = "outlined",
  placeholder,
  width,
  value,
  onChange,
  disabled = false,
  ...props
}) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange(event.target.value as string | number);
  };

  return (
    <StyledFormControl
      fullWidth={fullWidth}
      error={error}
      required={required}
      size={size}
      variant={variant}
      sx={{ width: width || "auto" }}
    >
      {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}

      <StyledSelect
        labelId={`${id}-label`}
        id={id}
        value={value || ""}
        label={label}
        onChange={handleChange}
        disabled={disabled}
        variant={variant}
        IconComponent={ExpandMore}
        displayEmpty={Boolean(placeholder)}
        {...props}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            <em>{placeholder}</em>
          </MenuItem>
        )}

        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </StyledFormControl>
  );
};

export default ScoutSelect;
export type { ScoutSelectProps as SelectProps, SelectOption };
