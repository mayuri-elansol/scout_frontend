"use client";

import React from "react";
import styles from "./ResetPassword.module.css"; // ✅ reuse the same CSS
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
    <CardContent className={styles.cardContent}>
      <Typography variant="h4" className={styles.title}>
        Reset Password
      </Typography>
      <Typography variant="body1" className={styles.subtitle}>
        Enter your new password below
      </Typography>

      <form onSubmit={onSubmit} autoComplete="off">
        {error && (
          <Paper elevation={1} className={styles.errorBox}>
            <Alert
              severity="error"
              sx={{
                backgroundColor: "transparent",
                "& .MuiAlert-message": { padding: 0 },
              }}
              onClose={() => setError("")}
            >
              <span className={styles.errorMessage}>{error}</span>
            </Alert>
          </Paper>
        )}

        {/* Current Password */}
        <Box className={styles.fieldWrapper}>
          <Typography
            component="label"
            variant="body2"
            className={styles.label}
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
            InputProps={{
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
            }}
          />
        </Box>

        {/* New Password */}
        <Box className={styles.passwordWrapper}>
          <Typography
            component="label"
            variant="body2"
            className={styles.label}
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
            InputProps={{
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
            }}
          />
        </Box>

        {/* Confirm Password */}
        <Box className={styles.passwordWrapper}>
          <Typography
            component="label"
            variant="body2"
            className={styles.label}
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
            InputProps={{
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
            }}
          />
        </Box>

        {/* Submit Button */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={
            isLoading ||
            !formData.currentPassword ||
            !formData.password ||
            !formData.confirmPassword
          }
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </CardContent>
  );
};

export default ResetPasswordForm;
