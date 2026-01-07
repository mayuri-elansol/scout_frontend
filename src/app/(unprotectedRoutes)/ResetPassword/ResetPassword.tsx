"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ResetPasswordForm from "@/app/components/molecules/ResetPassword/ResetPassword";
import { ResetPasswordFormData } from "@/app/components/molecules/ResetPassword/ResetPassword.type";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/app/theme/theme";
import { useGetResetPasswordDataMutation } from "./ResetPasswordApi";

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  const sid = params?.sid as string;

  const [resetPassword] = useGetResetPasswordDataMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (data: ResetPasswordFormData) => {
    if (!sid) {
      alert("Invalid or expired reset link");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword({
        userName: data.userName,
        password: data.password,
        sid,
      }).unwrap();

      router.replace("/Login");
    } catch (err: any) {
      alert(err?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResetPasswordForm
        isLoading={isLoading}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        onTogglePassword={() => setShowPassword((p) => !p)}
        onToggleConfirmPassword={() => setShowConfirmPassword((p) => !p)}
        onSubmit={handleSubmit}
      />
    </ThemeProvider>
  );
};

export default ResetPassword;
