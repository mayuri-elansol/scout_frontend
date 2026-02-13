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
import { Visibility, VisibilityOff, Lock, Email } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import {
  ResetPasswordFormData,
  ResetPasswordFormProps,
} from "@/app/components/molecules/ResetPassword/ResetPassword.type";

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  isLoading,
  showPassword,
  showConfirmPassword,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    mode: "onChange",
  });
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
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
        Reset your new password below
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email / Username */}
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
            error={!!errors.userName}
            helperText={errors.userName?.message}
            {...register("userName", {
              required: "Email is required",
            })}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: "#6b7280" }} />
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
            placeholder="Enter your new password"
            disabled={isLoading}
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "New password is required",
              pattern: {
                value: passwordRegex,
                message:
                  "Password must be at least 12 characters and include atleast 1 uppercase, 1 lowercase, 1 number, and 1 special character",
              },
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
            placeholder="Enter confirm password"
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
            backgroundColor:
              isLoading ||
                !watch("userName") ||
                !watch("password") ||
                !watch("confirmPassword")
                ? "#e5e7eb"
                : "#1976d2",
            color:
              isLoading ||
                !watch("userName") ||
                !watch("password") ||
                !watch("confirmPassword")
                ? "#9ca3af"
                : "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor:
              isLoading ||
                !watch("userName") ||
                !watch("password") ||
                !watch("confirmPassword")
                ? "not-allowed"
                : "pointer",
            boxShadow: "0 2px 8px rgba(25, 118, 210, 0.2)",
            transition: "all 0.2s ease-in-out",
          }}
          disabled={
            isLoading ||
            !watch("userName") ||
            !watch("password") ||
            !watch("confirmPassword")
          }
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </CardContent>
  );
};

export default ResetPasswordForm;
