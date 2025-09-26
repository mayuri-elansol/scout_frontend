"use client";

import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/app/theme/theme";
import ForgotPasswordForm from "@/app/components/molecules/ForgotPassword/ForgotPassword";
import { ForgotPasswordFormData } from "@/app/components/molecules/ForgotPassword/ForgotPassword.types";

const ForgotPasswordPage: React.FC = () => {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // 👇 states for toggle visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("formdata", formData);
  
    } catch (err) {
      console.error(err);
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof ForgotPasswordFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
      if (error) setError("");
    };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ForgotPasswordForm
        formData={formData}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        isLoading={isLoading}
        error={error}
        onInputChange={handleInputChange}
        onTogglePassword={() => setShowPassword((prev) => !prev)} // ✅ working toggle
        onToggleConfirmPassword={() => setShowConfirmPassword((prev) => !prev)} // ✅ working toggle
        onSubmit={handleSubmit}
        setError={setError}
      />
    </ThemeProvider>
  );
};

export default ForgotPasswordPage;
