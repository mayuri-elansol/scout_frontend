"use client";

import React from "react";
import {
  CardContent,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";

export interface ResetPasswordFormData {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordFormProps {
  formData: ResetPasswordFormData;
  showCurrentPassword: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isLoading: boolean;
  error: string;
  onInputChange: (
    field: keyof ResetPasswordFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleCurrentPassword: () => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onSubmit: (event: React.FormEvent) => void;
  setError: (error: string) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  formData,
  showCurrentPassword,
  showPassword,
  showConfirmPassword,
  isLoading,
  error,
  onInputChange,
  onToggleCurrentPassword,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
  setError,
}) => {
  return (
    <CardContent sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 1, color: "#336590", fontSize: "28px" }}
      >
        Reset Password
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "#5c6b7d", fontSize: "16px", marginBottom: "25px" }}
      >
        Enter your new password below
      </Typography>

      <form onSubmit={onSubmit} autoComplete="off">
        {error && (
          <Paper
            elevation={1}
            sx={{
              mb: 3,
              p: 2,
              backgroundColor: "#fff5f5",
              border: "1px solid #fecaca",
              borderRadius: 2,
            }}
          >
            <Alert
              severity="error"
              sx={{
                backgroundColor: "transparent",
                "& .MuiAlert-message": {
                  color: "#dc2626",
                  fontSize: "14px",
                  fontWeight: 500,
                },
              }}
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          </Paper>
        )}

        {/* Current Password */}
        <Box sx={{ mb: 3.2 }}>
          <Typography
            component="label"
            variant="body2"
            sx={{
              color: "#1c2025",
              fontWeight: 600,
              mb: 1.5,
              fontSize: "15px",
              display: "block",
            }}
          >
            Current Password
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type={showCurrentPassword ? "text" : "password"}
            value={formData.currentPassword}
            onChange={onInputChange("currentPassword")}
            placeholder="Enter your current password"
            disabled={isLoading}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#6b7280" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={onToggleCurrentPassword}
                      edge="end"
                      disabled={isLoading}
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* New Password */}
        <Box sx={{ mb: 3 }}>
          <Typography
            component="label"
            variant="body2"
            sx={{
              color: "#1c2025",
              fontWeight: 600,
              mb: 1.5,
              fontSize: "15px",
              display: "block",
            }}
          >
            New Password
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={onInputChange("password")}
            placeholder="Enter your new password"
            disabled={isLoading}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#6b7280" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={onTogglePassword}
                      edge="end"
                      disabled={isLoading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Confirm Password */}
        <Box sx={{ mb: 3 }}>
          <Typography
            component="label"
            variant="body2"
            sx={{
              color: "#1c2025",
              fontWeight: 600,
              mb: 1.5,
              fontSize: "15px",
              display: "block",
            }}
          >
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={onInputChange("confirmPassword")}
            placeholder="Enter your confirm password"
            disabled={isLoading}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#6b7280" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={onToggleConfirmPassword}
                      edge="end"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px 16px",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            backgroundColor:
              isLoading ||
              !formData.confirmPassword ||
              !formData.password ||
              !formData.currentPassword
                ? "#e5e7eb"
                : "#1976d2",
            color:
              isLoading ||
              !formData.confirmPassword ||
              !formData.password ||
              !formData.currentPassword
                ? "#9ca3af"
                : "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor:
              isLoading ||
              !formData.confirmPassword ||
              !formData.password ||
              !formData.currentPassword
                ? "not-allowed"
                : "pointer",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.2)",
            transition: "all 0.2s ease-in-out",
            fontFamily: "inherit",
          }}
          disabled={
            isLoading ||
            !formData.currentPassword ||
            !formData.password ||
            !formData.confirmPassword
          }
        >
          {isLoading ? "Reseing..." : "Reset Password"}
        </button>
      </form>
    </CardContent>
  );
};

export default ResetPasswordForm;
