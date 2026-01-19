"use client";

import React from "react";
import { CardContent, TextField, Typography, Box, Link } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface Props {
  isLoading: boolean;
  error: string;
  onSubmit: (data: { userName: string }) => void;
}

const ForgotPasswordForm: React.FC<Props> = ({
  isLoading,
  error,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ userName: string }>({
    mode: "onChange",
  });

  const router = useRouter();

  return (
    <CardContent sx={{ padding: 4 }}>
      {/* ✅ Correct & non-conflicting title */}
      <Typography
        variant="h5"
        fontWeight={700}
        mb={1}
        sx={{ color: "#1c2025" }}
      >
        Forgot Password
      </Typography>

      {/* ✅ Clear explanation */}
      <Typography
        variant="body2"
        sx={{ color: "#5c6b7d", mb: 3, lineHeight: 1.6 }}
      >
        Enter your username. We’ll verify your account and contact you with
        instructions to forgot your password.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <Box mb={3}>
          <TextField
            fullWidth
            label="Username"
            placeholder="Enter your username"
            disabled={isLoading}
            error={!!errors.userName}
            helperText={errors.userName?.message}
            {...register("userName", {
              required: "Username is required",
            })}
          />
        </Box>

        {/* Error */}
        {error && (
          <Typography color="error" mb={2}>
            {error}
          </Typography>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: isLoading ? "#e5e7eb" : "#1976d2",
            color: isLoading ? "#9ca3af" : "#ffffff",
            borderRadius: "8px",
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
            fontWeight: 600,
            fontSize: "15px",
            marginBottom: "16px",
          }}
        >
          {isLoading ? "Requesting..." : "Request"}
        </button>
      </form>
      {/* 🔙 Back to login */}
      <Box textAlign="center">
        <Link
          component="button"
          variant="body2"
          onClick={() => router.push("/Login")}
          sx={{
            cursor: "pointer",
            fontWeight: 500,
            color: "#1976d2",
          }}
        >
          Back to Sign In
        </Link>
      </Box>
    </CardContent>
  );
};

export default ForgotPasswordForm;
