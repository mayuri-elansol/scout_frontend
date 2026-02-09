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

  //12 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

  const handleSubmit = async (data: ResetPasswordFormData) => {
    if (!sid) {
       dispatch(
      showToast({
        id: crypto.randomUUID(),
        message:
          "Invalid or expired reset link",
        severity: "error",
      })
    );
      return;
    }
 if (!passwordRegex.test(data.password)) {
    dispatch(
      showToast({
        id: crypto.randomUUID(),
        message:
          "Password must be at least 12 characters, include uppercase, lowercase, number, and special character.",
        severity: "error",
      })
    );
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
