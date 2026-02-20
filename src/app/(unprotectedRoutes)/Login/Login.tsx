"use client";

import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/app/theme/theme";
import LoginForm from "../../components/molecules/Login/LoginForm";
import { useAuth } from "@/customhooks/useAuth";
import { useGetLoginDataMutation } from "./LoginApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { triggerToast } from "@/utils/toast";

interface LoginFormData {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [triggerLogin] = useGetLoginDataMutation();

  const handleSubmit = async (data: LoginFormData) => {
    setError("");
    setIsLoading(true);

    try {
      const response = await triggerLogin(data).unwrap();

      const token = response.data.tokenOrError;
      const result = login(token);

      if (result?.type === "LOGIN_SUCCESS") {
        triggerToast("Login successful!", "success");
      }

      if (result?.type === "RESET_REQUIRED") {
        triggerToast("Please reset your password", "info");
      }
    } catch (err) {
      const fetchError = err as FetchBaseQueryError & {
        data?: { details?: string; error?: string };
      };

      const errorMsg =
        fetchError.data?.details ||
        fetchError.data?.error ||
        "Invalid username or password";

      setError(errorMsg);
      triggerToast(errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoginForm
        showPassword={showPassword}
        isLoading={isLoading}
        error={error}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        onSubmit={handleSubmit}
      />
    </ThemeProvider>
  );
};

export default Login;
