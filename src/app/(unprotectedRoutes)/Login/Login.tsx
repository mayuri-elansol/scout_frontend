"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/app/theme/theme";
import LoginForm from "../../components/molecules/Login/LoginForm";
import { useAuth } from "@/customhooks/useAuth";
import { useGetLoginDataMutation } from "./LoginApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { triggerToast } from "@/utils/toast";
import type { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";    
interface LoginFormData {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  // ✅ ADD THIS
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [triggerLogin] = useGetLoginDataMutation();

  const handleSubmit = async (data: LoginFormData) => {
    setError("");
    setIsLoading(true);

    try {
      const response = await triggerLogin(data).unwrap();

    // const token = response.data.tokenOrError;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxODg1ZTA5NzlkZDQyN2RjIiwidXNlck5hbWUiOiJub3ZhX2FkbWluIiwicm9sZXMiOiJPcmdhbmlzYXRpb25fQWRtaW4iLCJsaWNlbnNlcyI6bnVsbCwiZmVhdHVyZXMiOlsiRjAwNSIsIkYwMDYiLCJGMDA3IiwiRjAwOCIsIkYwMDkiLCJGMDEwIiwiRjAxMSIsIkYwMTIiLCJGMDEzIiwiRjAxNCIsIkYwMTUiLCJGMDE2IiwiRjAxNyIsIkYwMTgiLCJGMDE5IiwiRjAyMCIsIkYwMjEiLCJGMDIyIl0sIm9yZ19pZCI6ImFlYWFkM2RhM2NlYjdlYmQiLCJpYXQiOjE3NjY0MDg5OTAsImV4cCI6MTc2NjQxMjU5MCwiaXNzIjoieW91ci1hcHAtbmFtZSIsInNpZCI6IjExOTY4ODM0MzAifQ.rZyjyQUgS5pcN6piSYyh43ZszOqRN-kj96EycTqoaZc";
      //  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNTFkNjQ1ZjUxNTgwZDZmIiwidXNlck5hbWUiOiJhZG1pbl9lbGFuc29sX3RlY2giLCJyb2xlcyI6Ik9yZ2FuaXNhdGlvbl9BZG1pbiIsImxpY2Vuc2VzIjpudWxsLCJmZWF0dXJlcyI6WyJGMDAyIiwiRjAwNSIsIkYwMDYiLCJGMDA3IiwiRjAwOCIsIkYwMDkiLCJGMDEwIiwiRjAxMSIsIkYwMTIiLCJGMDEzIiwiRjAxNCIsIkYwMTUiLCJGMDE2IiwiRjAxNyIsIkYwMTgiLCJGMDE5IiwiRjAyMCIsIkYwMjEiLCJGMDIyIiwiRjAyMyIsIkYwMjQiLCJGMDI1IiwiRjAyNiIsIkYwMjciLCJGMDI4IiwiRjAyOSIsIkYwMzAiLCJGMDMxIl0sIm9yZ19pZCI6ImU4MTc0MTY1MmU3Y2I2NmUiLCJpYXQiOjE3NjYwNTM3MjYsImV4cCI6MTc2NjA1NzMyNiwiaXNzIjoieW91ci1hcHAtbmFtZSJ9.JXrP18qFGbvLM9YfebMBj2G6QtPvK-IPYr4mAPqA5x0";
       // Send token to API to set HttpOnly cookie

      const decoded = login(token); // 🔥 decode once, inside hook
      triggerToast("Login successful!", "success");
      console.log("Decoded JWT:", decoded);
      // if (decoded && decoded.sid) {
      //   router.push(`/ResetPassword/${decoded.sid}`);
      // } else {
      //   router.push("/SafetyAndComplianceDashboard");
      // }
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
        onSubmit={handleSubmit} // ✅ must accept form data
      />
    </ThemeProvider>
  );
};

export default Login;
