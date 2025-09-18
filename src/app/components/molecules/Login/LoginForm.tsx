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
import {
  Visibility,
  VisibilityOff,
  Lock,
  AccountCircle,
} from "@mui/icons-material";
import styles from "./LoginForm.module.css";

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginFormProps {
  formData: LoginFormData;
  showPassword: boolean;
  isLoading: boolean;
  error: string;
  onInputChange: (
    field: keyof LoginFormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onSubmit: (event: React.FormEvent) => void;
  setError: (error: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  showPassword,
  isLoading,
  error,
  onInputChange,
  onTogglePassword,
  onSubmit,
  setError,
}) => {
  return (
    <CardContent className={styles.cardContent}>
      <Typography variant="h4" className={styles.title}>
        Welcome
      </Typography>
      <Typography variant="body1" className={styles.subtitle}>
        Sign in to access your surveillance analytics portal
      </Typography>

      <form onSubmit={onSubmit} autoComplete="off">
        {error && (
          <Paper elevation={1} className={styles.errorBox}>
            <Alert
              severity="error"
              sx={{
                backgroundColor: "transparent",
                "& .MuiAlert-message": { padding: 0 }, // keep padding controlled
              }}
              onClose={() => setError("")}
            >
              <span className={styles.errorMessage}>{error}</span>
            </Alert>
          </Paper>
        )}

        {/* Username */}
        <Box className={styles.fieldWrapper}>
          <Typography
            component="label"
            variant="body2"
            className={styles.label}
          >
            Username
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={formData.username}
            onChange={onInputChange("username")}
            placeholder="Enter your username"
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle sx={{ color: "#6b7280" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Password */}
        <Box className={styles.passwordWrapper}>
          <Typography
            component="label"
            variant="body2"
            className={styles.label}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={onInputChange("password")}
            placeholder="Enter your password"
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

        {/* Button */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading || !formData.username || !formData.password}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </CardContent>
  );
};

export default LoginForm;
