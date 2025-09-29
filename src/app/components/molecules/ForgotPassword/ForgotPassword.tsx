"use client";

import React from "react";
import {
  CardContent,
  TextField,
  InputAdornment,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordFormData,
  ForgotPasswordFormProps,
} from "./ForgotPassword.types";

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onTogglePassword,
  showPassword,
  onToggleConfirmPassword,
  showConfirmPassword,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    mode: "onChange",
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <CardContent sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 1, color: "#336590", fontSize: "28px" }}
      >
        Forgot Password
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "#5c6b7d", fontSize: "16px", marginBottom: "25px" }}
      >
        Enter your new password below
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
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
            placeholder="Enter your new password"
            disabled={isLoading}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: { value: /^\d+$/, message: "Only digits allowed" },
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
            placeholder="Enter your confirm password"
            disabled={isLoading}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
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
              isLoading || !watch("password") || !watch("confirmPassword")
                ? "#e5e7eb"
                : "#1976d2",
            color:
              isLoading || !watch("password") || !watch("confirmPassword")
                ? "#9ca3af"
                : "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor:
              isLoading || !watch("password") || !watch("confirmPassword")
                ? "not-allowed"
                : "pointer",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.2)",
            transition: "all 0.2s ease-in-out",
            fontFamily: "inherit",
          }}
          disabled={
            isLoading || !watch("password") || !watch("confirmPassword")
          }
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </CardContent>
  );
};

export default ForgotPasswordForm;
