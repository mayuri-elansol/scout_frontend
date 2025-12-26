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

      ///with sid
      //   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZGY5NThlNjJkNTViMWE5IiwidXNlck5hbWUiOiJtYXl1cmlfZGV2Iiwicm9sZXMiOiJPcmdhbml6YXRpb25fQWRtaW5fU2NvdXQiLCJsaWNlbnNlcyI6bnVsbCwic2lkIjoiZjcwYTY1YTg0NzRkMDM1NyIsImZlYXR1cmVzIjpbIkYwMDUiLCJGMDA2IiwiRjAwNyIsIkYwMDgiLCJGMDA5IiwiRjAxMCIsIkYwMTEiLCJGMDEyIiwiRjAxMyIsIkYwMTQiLCJGMDE1IiwiRjAxNiIsIkYwMTciLCJGMDE4IiwiRjAxOSIsIkYwMjAiLCJGMDIxIiwiRjAyMiIsIkYwMjMiXSwib3JnX2lkIjoiYzhiMDI5OTc1ZjRmZjIxOCIsImlhdCI6MTc2NjQ5NTQ4OSwiZXhwIjoxNzY2NDk5MDg5LCJpc3MiOiJ5b3VyLWFwcC1uYW1lIn0.MAHoS-eF2_lu_CjlBIeiRuG9KpvBx0f8fNsLxqVWdFY";

      //without sid
      // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZGY5NThlNjJkNTViMWE5IiwidXNlck5hbWUiOiJtYXl1cmlfZGV2Iiwicm9sZXMiOiJPcmdhbml6YXRpb25fQWRtaW5fU2NvdXQiLCJsaWNlbnNlcyI6bnVsbCwic2lkIjpudWxsLCJmZWF0dXJlcyI6WyJGMDA1IiwiRjAwNiIsIkYwMDciLCJGMDA4IiwiRjAwOSIsIkYwMTAiLCJGMDExIiwiRjAxMiIsIkYwMTMiLCJGMDE0IiwiRjAxNSIsIkYwMTYiLCJGMDE3IiwiRjAxOCIsIkYwMTkiLCJGMDIwIiwiRjAyMSIsIkYwMjIiLCJGMDIzIl0sIm9yZ19pZCI6ImM4YjAyOTk3NWY0ZmYyMTgiLCJpYXQiOjE3NjY0OTU0ODksImV4cCI6MTc2NjQ5OTA4OSwiaXNzIjoieW91ci1hcHAtbmFtZSJ9.33e628JSBgJyAQ_ImAOi5yPLuNrrnRM0IsokehNWWlM"
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
        onSubmit={handleSubmit} //  must accept form data
      />
    </ThemeProvider>
  );
};

export default Login;
