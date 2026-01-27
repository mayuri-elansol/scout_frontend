"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ResetPasswordForm from "@/app/components/molecules/ResetPassword/ResetPassword";
import { ResetPasswordFormData } from "@/app/components/molecules/ResetPassword/ResetPassword.type";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/app/theme/theme";
import { useGetResetPasswordDataMutation } from "./ResetPasswordApi";
import { showToast } from "@/app/store/slices/toasterSlice";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useDispatch } from "react-redux";

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

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
    } 
    // catch (err) {
    //   alert(err?.data?.message || "Failed to reset password");
    // } 
    catch (err) {
          dispatch(
            showToast({
              id: crypto.randomUUID(),
              message: getErrorMessage(err,"Failed to reset password") ,
              severity: "error",
            })
          );
        }
    
    finally {
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
