"use client";

import React from "react";
import styles from "./ResetPassword.module.css";
import {
  CardContent,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import { useRouter } from "next/navigation"; // ✅ correct import

import { ResetPasswordFormData } from "./ResetPassword.type";

export interface ResetPasswordFormProps {
  formData: ResetPasswordFormData;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isLoading: boolean;
  error: string;
  onInputChange: (
    field: keyof ResetPasswordFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onSubmit: (event: React.FormEvent) => Promise<void> | void;
  setError: (error: string) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  formData,
  showPassword,
  showConfirmPassword,
  isLoading,
  error,
  onInputChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
  setError,
}) => {
  const router = useRouter();

  const isDisabled =
    isLoading ||
    !formData.password ||
    !formData.confirmPassword ||
    formData.password !== formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(e);
    router.push("/LoginPage");
  };

  return (
    <CardContent className={styles.cardContent}>
      <Typography className={styles.title}>Reset Password</Typography>
      <Typography className={styles.subtitle}>
        Enter your new password below
      </Typography>

      {error && (
        <Paper elevation={1} className={styles.errorPaper}>
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        </Paper>
      )}

      <form onSubmit={handleSubmit} autoComplete="off">
        {/* Password Field */}
        <Box sx={{ mb: 3 }}>
          <Typography component="label" className={styles.inputLabel}>
            Password
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={onInputChange("password")}
            placeholder="Enter new password"
            className={styles.textField}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#6b7280" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={onTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            disabled={isLoading}
          />
        </Box>

        {/* Confirm Password Field */}
        <Box sx={{ mb: 3 }}>
          <Typography component="label" className={styles.inputLabel}>
            Confirm Password
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={onInputChange("password")}
            placeholder="Enter new password"
            className={styles.textField}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#6b7280" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={onTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            disabled={isLoading}
          />
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          className={`${styles.submitButton} ${
            isDisabled ? styles.disabled : styles.enabled
          }`}
          disabled={isDisabled}
        >
          {isLoading ? "Updating..." : "Reset Password"}
        </Button>
      </form>
    </CardContent>
  );
};

export default ResetPasswordForm;
