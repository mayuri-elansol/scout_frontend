"use client";

import React from "react";
import {
  CardContent,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Box,
  Link,
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
import { useRouter } from "next/navigation";

const LoginForm: React.FC<LoginFormProps> = ({
  showPassword,
  isLoading,
  onSubmit,
  onTogglePassword,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onChange",
  });

  const router = useRouter();
  //12 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    
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
            error={!!errors.userName}
            helperText={errors.userName?.message}
            {...register("userName", {
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
              // pattern: {
              //   value: passwordRegex,
              //   message:
              //     "Password must be at least 12 characters and include uppercase, lowercase, number, and special character",
              // },
            })}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#353c4a" }} />
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
      {/*  Forgot Password link */}
      <Box textAlign="right" mb={3} mt={2}>
        <Link
          component="button"
          variant="body2"
          onClick={() => router.push("/ForgotPassword")}
          sx={{
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Forgot password?
        </Link>
      </Box>
    </CardContent>
  );
};

export default LoginForm;
