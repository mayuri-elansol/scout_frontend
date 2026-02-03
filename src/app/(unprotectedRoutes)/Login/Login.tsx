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
      //  console.log(token);
      ///with sid
      // const token =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZGY5NThlNjJkNTViMWE5IiwidXNlck5hbWUiOiJtYXl1cmlfZGV2Iiwicm9sZXMiOiJPcmdhbml6YXRpb25fQWRtaW5fU2NvdXQiLCJsaWNlbnNlcyI6bnVsbCwic2lkIjoiZjcwYTY1YTg0NzRkMDM1NyIsImZlYXR1cmVzIjpbIkYwMDUiLCJGMDA2IiwiRjAwNyIsIkYwMDgiLCJGMDA5IiwiRjAxMCIsIkYwMTEiLCJGMDEyIiwiRjAxMyIsIkYwMTQiLCJGMDE1IiwiRjAxNiIsIkYwMTciLCJGMDE4IiwiRjAxOSIsIkYwMjAiLCJGMDIxIiwiRjAyMiIsIkYwMjMiXSwib3JnX2lkIjoiYzhiMDI5OTc1ZjRmZjIxOCIsImlhdCI6MTc2NjQ5NTQ4OSwiZXhwIjoxNzY2NDk5MDg5LCJpc3MiOiJ5b3VyLWFwcC1uYW1lIn0.MAHoS-eF2_lu_CjlBIeiRuG9KpvBx0f8fNsLxqVWdFY";

      //without sid
      // const token =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4M2IyZTVlMTNhN2IzMWQ1IiwidXNlck5hbWUiOiJzaHlhbWpvc2hpIiwiZmlyc3ROYW1lIjoiU2h5YW0iLCJsYXN0TmFtZSI6Ikpvc2hpIiwic2lkIjpudWxsLCJyb2xlcyI6W3siYXBwSWQiOiJFVFBMX1NPTFVUSU9OXzMiLCJyb2xlSWQiOiJSNiIsImFwcE5hbWUiOiJTY291dCIsInJvbGVOYW1lIjoiT3JnYW5pc2F0aW9uX0FkbWluX1Njb3V0IiwidXNlclJvbGVJZCI6IjQ3M2ZlMDU4YzljMjAxMzEifV0sImxpY2Vuc2VzIjpbeyJhcHBJZCI6IkVUUExfU09MVVRJT05fMyIsImZlYXR1cmVzIjpbIlNGMDAxIiwiU0YwMDIiLCJTRjAwMyIsIlNGMDA0IiwiU0YwMDUiLCJTRjAwNiIsIlNGMDA3IiwiU0YwMDgiLCJTRjAwOSIsIlNGMDEwIiwiU0YwMTEiLCJTRjAxMiIsIlNGMDEzIiwiU0YwMTQiLCJTRjAxNSIsIlNGMDE2IiwiU0YwMTciLCJTRjAxOCIsIlNGMDE5IiwiU0YwMjAiLCJTRjAyMSIsIlNGMDIyIiwiU0YwMjMiLCJTRjAyNCIsIlNGMDI1IiwiU0YwMjYiLCJTRjAyNyIsIlNGMDI4IiwiU0YwMjkiLCJTRjAzMCIsIlNGMDMxIiwiU0YwMzIiLCJTRjAzMyIsIlNGMDM0IiwiU0YwMzUiLCJTRjAzNiIsIlNGMDM3IiwiU0YwMzgiLCJTRjAzOSIsIlNGMDQxIl0sImV4cGlyZXNPbiI6IjIwMjctMDEtMDciLCJsaWNlbnNlSWQiOiJMSUMtNDQ0IiwibGljZW5zZVR5cGVJZCI6IkxULVNDT1VULVRlc3QiLCJsaWNlbnNlVHlwZU5hbWUiOiJTQ09VVCBsaWNlbnNlIHRlc3QifV0sImZlYXR1cmVzIjpbIlNGMDAxIiwiU0YwMDIiLCJTRjAwMyIsIlNGMDA0IiwiU0YwMDUiLCJTRjAwNiIsIlNGMDA3IiwiU0YwMDgiLCJTRjAwOSIsIlNGMDEwIiwiU0YwMTEiLCJTRjAxMiIsIlNGMDEzIiwiU0YwMTQiLCJTRjAxNSIsIlNGMDE2IiwiU0YwMTciLCJTRjAxOCIsIlNGMDE5IiwiU0YwMjAiLCJTRjAyMSIsIlNGMDIyIiwiU0YwMjMiLCJTRjAyNCIsIlNGMDI1IiwiU0YwMjYiLCJTRjAyNyIsIlNGMDI4IiwiU0YwMjkiLCJTRjAzMCIsIlNGMDMxIiwiU0YwMzIiLCJTRjAzMyIsIlNGMDM0IiwiU0YwMzUiLCJTRjAzNiIsIlNGMDM3IiwiU0YwMzgiLCJTRjAzOSIsIlNGMDQxIl0sIm9yZ19pZCI6IjRmM2UyZjgwZTU1NzQxMTEiLCJpYXQiOjE3Njc4NjY3NDQsImV4cCI6MTc2Nzg3MDM0NCwiaXNzIjoieW91ci1hcHAtbmFtZSJ9.IUVbpWipOwV4rcZ1zKAs8w60lfPMU-k_4ifogzVF3PY";
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
