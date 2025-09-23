"use client";

import React from "react";
import {
  CardContent,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock,
  AccountCircle,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import {
  LoginFormData,
  LoginFormProps,
} from "@/app/components/molecules/Login/Login.types";

const LoginForm: React.FC<LoginFormProps> = ({
  showPassword,
  isLoading,

  onTogglePassword,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onChange",
  });
  const onSubmit = (data: LoginFormData) => {
    console.log("Form submitted login data:", data);
  };
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

      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
            placeholder="Enter your username"
            disabled={isLoading}
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register("username", {
              required: "Username is required",
            })}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle sx={{ color: "#6b7280" }} />
                  </InputAdornment>
                ),
              },
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
            placeholder="Enter your password"
            disabled={isLoading}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Password is required",
            })}
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

        {/* Button */}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "14px 16px",
            fontSize: "16px",
            fontWeight: 600,
            textTransform: "none",
            backgroundColor: isLoading ? "#e5e7eb" : "#1976d2",
            color: isLoading ? "#9ca3af" : "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: isLoading ? "not-allowed" : "pointer",
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
