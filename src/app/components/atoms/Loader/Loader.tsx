"use client";

import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";

export interface LoaderProps {
  /** Size of the loading spinner */
  size?: number;
  /** Loading message to display */
  message?: string;
  /** Whether to show the message */
  showMessage?: boolean;
  /** Color of the spinner */
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";
  /** Variant of the progress indicator */
  variant?: "determinate" | "indeterminate";
  /** Progress value (0-100) for determinate variant */
  value?: number;
  /** Custom styling */
  sx?: SxProps<Theme>;
}

const Loader: React.FC<LoaderProps> = ({
  size = 40,
  message = "Loading...",
  showMessage = true,
  color = "primary",
  variant = "indeterminate",
  value,
  sx,
}) => {
  return (
<Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "600px",
    height: "100%",
    width: "100%",
    gap: 1.5,
    ...sx,
  }}
>

      <CircularProgress
        size={size}
        color={color}
        variant={variant}
        value={value}
      />
      {showMessage && (
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontSize: "14px",
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loader;
