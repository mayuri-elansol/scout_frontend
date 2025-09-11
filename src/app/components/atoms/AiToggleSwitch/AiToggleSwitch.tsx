import React from "react";
import { Switch, FormControlLabel, Typography, Chip, Box } from "@mui/material";

export interface AiToggleSwitchProps {
  /** Whether AI processing is enabled */
  enabled: boolean;
  /** Callback when toggle state changes */
  onChange: (enabled: boolean) => void;
  /** Label text for the toggle */
  label?: string;
  /** Size variant */
  size?: "small" | "medium";
  /** Show status chip */
  showChip?: boolean;
  /** Custom styling */
  sx?: object;
}

const AiToggleSwitch: React.FC<AiToggleSwitchProps> = ({
  enabled,
  onChange,
  label = "AI Processing",
  size = "medium",
  showChip = true,
  sx = {},
}) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
          size={size}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#4caf50",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#4caf50",
            },
          }}
        />
      }
      label={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontWeight: 600, color: "#333" }}>
            {label}
          </Typography>
          {showChip && (
            <Chip
              label={enabled ? "Enabled" : "Disabled"}
              size="small"
              sx={{
                backgroundColor: enabled ? "#e8f5e9" : "#ffebee",
                color: enabled ? "#4caf50" : "#f44336",
                fontWeight: 600,
                fontSize: "12px",
              }}
            />
          )}
        </Box>
      }
      sx={{ ml: 0, ...sx }}
    />
  );
};

export default AiToggleSwitch;
