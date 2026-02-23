
"use client";

import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/app/theme/theme";
import ForgotPasswordForm from "@/app/components/molecules/ForgotPassword/ForgotPassword";
import { useForgotPasswordMutation } from "./ForgotPasswordApi";
import { useRouter } from "next/navigation";
import { triggerToast } from "@/utils/toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ForgotPasswordFormData {
  userName: string;
}

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const [forgotPassword] = useForgotPasswordMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    setError("");
    setIsLoading(true);

    try {
      const response = await forgotPassword({
        userName: data.userName,
      }).unwrap();

      // ✅ success from backend
      triggerToast(response.message, "success");

      // ✅ redirect to Login
      router.push("/login");

    } catch (err) {
      const fetchError = err as FetchBaseQueryError & {
        data?: { message?: string };
      };

      const errorMsg =
        fetchError.data?.message || "Failed to request password reset";

      setError(errorMsg);
      triggerToast(errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ForgotPasswordForm
        isLoading={isLoading}
        error={error}
        onSubmit={handleSubmit}
      />
    </ThemeProvider>
  );
};

export default ForgotPasswordPage;
