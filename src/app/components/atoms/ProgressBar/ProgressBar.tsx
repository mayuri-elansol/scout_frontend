'use client';
import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface ScoutProgressBarProps {
  value: number;
  max?: number;
  variant?: "status" | "capacity" | "performance" | "default";
  size?: "small" | "medium" | "large";
  showLabel?: boolean;
  showPercentage?: boolean;
  label?: string;
  color?: "primary" | "success" | "warning" | "error" | "info";
  animated?: boolean;
}

const StyledLinearProgress = styled(LinearProgress)<{
  progressvariant?: string;
  progresssize?: string;
  progresscolor?: string;
}>(({ progressvariant, progresssize, progresscolor }) => {
  const heights = {
    small: "6px",
    medium: "8px",
    large: "12px",
  };

  const colors = {
    primary: "#1976d2",
    success: "#4caf50",
    warning: "#ff9800",
    error: "#f44336",
    info: "#2196f3",
  };

  const getColorByValue = (value: number) => {
    if (value >= 80) return colors.success;
    if (value >= 60) return colors.warning;
    if (value >= 40) return colors.warning;
    return colors.error;
  };

  const progressColor = progresscolor
    ? colors[progresscolor as keyof typeof colors]
    : getColorByValue(50);

  return {
    height: heights[progresssize as keyof typeof heights] || heights.medium,
    borderRadius: "6px",
    backgroundColor: `${progressColor}20`,
    "& .MuiLinearProgress-bar": {
      borderRadius: "6px",
      backgroundColor: progressColor,
      transition: "transform 0.4s ease",
    },
    ...(progressvariant === "status" && {
      "& .MuiLinearProgress-bar": {
        background: `linear-gradient(90deg, ${progressColor}, ${progressColor}dd)`,
      },
    }),
  };
});

const ScoutProgressBar: React.FC<ScoutProgressBarProps> = ({
  value,
  max = 100,
  variant = "default",
  size = "medium",
  showLabel = true,
  showPercentage = true,
  label,
  color,
  animated = false,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const getAutoColor = (percent: number) => {
    if (percent >= 80) return "success";
    if (percent >= 60) return "primary";
    if (percent >= 40) return "warning";
    return "error";
  };

  const finalColor = color || getAutoColor(percentage);

  const getStatusText = (percent: number) => {
    if (percent >= 90) return "Excellent";
    if (percent >= 75) return "Good";
    if (percent >= 50) return "Fair";
    if (percent >= 25) return "Poor";
    return "Critical";
  };

  return (
    <Box sx={{ width: "100%" }}>
      {(showLabel || label) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          {(label || showLabel) && (
            <Typography
              variant="body2"
              sx={{
                fontSize: size === "small" ? "12px" : "14px",
                fontWeight: 500,
                color: "#374151",
              }}
            >
              {label ||
                (variant === "status" ? getStatusText(percentage) : "Progress")}
            </Typography>
          )}
          {showPercentage && (
            <Typography
              variant="body2"
              sx={{
                fontSize: size === "small" ? "12px" : "14px",
                fontWeight: 600,
                color:
                  finalColor === "success"
                    ? "#4caf50"
                    : finalColor === "warning"
                    ? "#ff9800"
                    : finalColor === "error"
                    ? "#f44336"
                    : finalColor === "info"
                    ? "#2196f3"
                    : "#1976d2",
              }}
            >
              {variant === "capacity" || variant === "performance"
                ? `${value}/${max}`
                : `${Math.round(percentage)}%`}
            </Typography>
          )}
        </Box>
      )}

      <StyledLinearProgress
        variant={animated ? "indeterminate" : "determinate"}
        value={animated ? undefined : percentage}
        progressvariant={variant}
        progresssize={size}
        progresscolor={finalColor}
      />

      {variant === "capacity" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 0.5,
          }}
        >
          <Typography variant="caption" color="textSecondary">
            0
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {max}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ScoutProgressBar;
