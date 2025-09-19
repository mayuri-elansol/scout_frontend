"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
    <CardContent sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 1, color: "#336590", fontSize: "28px" }}
      >
        Welcome
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "#5c6b7d", fontSize: "16px", marginBottom: "25px" }}
      >
        Sign in to access your surveillance analytics portal
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

        {/* Username */}
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
          disabled={isLoading || !formData.username || !formData.password}
          style={{
            width: "100%",
            padding: "14px 16px",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            backgroundColor:
              isLoading || !formData.username || !formData.password
                ? "#e5e7eb"
                : "#1976d2",
            color:
              isLoading || !formData.username || !formData.password
                ? "#9ca3af"
                : "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor:
              isLoading || !formData.username || !formData.password
                ? "not-allowed"
                : "pointer",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.2)",
            transition: "all 0.2s ease-in-out",
            fontFamily: "inherit",
          }}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </CardContent>
  );
};

export default LoginForm;
