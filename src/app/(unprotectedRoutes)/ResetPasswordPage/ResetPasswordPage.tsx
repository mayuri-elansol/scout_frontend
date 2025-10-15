"use client";

import React, { useState } from "react";
import ResetPasswordForm from "@/app/components/molecules/ResetPassword/ResetPassword";
import { ResetPasswordFormData } from "@/app/components/molecules/ResetPassword/ResetPassword.type";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/app/theme/theme";
const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: "",
    confirmPassword: "",
    currentPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("formdataaa", formData);
    } catch (err) {
      console.error(err);
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof ResetPasswordFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
      if (error) setError("");
    };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResetPasswordForm
        formData={formData}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        showCurrentPassword={showCurrentPassword}
        isLoading={isLoading}
        error={error}
        onInputChange={handleInputChange}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        onToggleConfirmPassword={() => setShowConfirmPassword((prev) => !prev)}
        onToggleCurrentPassword={() => setShowCurrentPassword((pre) => !pre)}
        onSubmit={handleSubmit}
        setError={setError}
      />
    </ThemeProvider>
  );
};

export default ResetPassword;
