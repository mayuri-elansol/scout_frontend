// "use client";

// import React, { useState } from "react";
// import ResetPasswordForm from "@/app/components/molecules/ResetPassword/ResetPassword";
// import { ResetPasswordFormData } from "@/app/components/molecules/ResetPassword/ResetPassword.type";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import { theme } from "@/app/theme/theme";
// const ResetPassword: React.FC = () => {
//   const [formData, setFormData] = useState<ResetPasswordFormData>({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     currentPassword: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string>("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const handleSubmit = async (data: ResetPasswordFormData) => {
//     setError("");
//     setIsLoading(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       console.log("formdataaa from the reset password", data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to reset password. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange =
//     (field: keyof ResetPasswordFormData) =>
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       setFormData({ ...formData, [field]: event.target.value });
//       if (error) setError("");
//     };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <ResetPasswordForm
//         formData={formData}
//         showPassword={showPassword}
//         showConfirmPassword={showConfirmPassword}
//         showCurrentPassword={showCurrentPassword}
//         isLoading={isLoading}
//         error={error}
//         onInputChange={handleInputChange}
//         onTogglePassword={() => setShowPassword((prev) => !prev)}
//         onToggleConfirmPassword={() => setShowConfirmPassword((prev) => !prev)}
//         onToggleCurrentPassword={() => setShowCurrentPassword((pre) => !pre)}
//         onSubmit={handleSubmit}
//         setError={setError}
//       />
//     </ThemeProvider>
//   );
// };

// export default ResetPassword;
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ResetPasswordForm from "@/app/components/molecules/ResetPassword/ResetPassword";
import { ResetPasswordFormData } from "@/app/components/molecules/ResetPassword/ResetPassword.type";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/app/theme/theme";
import { useGetResetPasswordDataMutation } from "./ResetPasswordApi";

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";
  const sid = searchParams.get("sid") ?? "";

  const [resetPassword] = useGetResetPasswordDataMutation();

  const [formData, setFormData] = useState<ResetPasswordFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    currentPassword: "", // not sent to backend
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  // 🔐 SUBMIT HANDLER
  const handleSubmit = async (data: ResetPasswordFormData) => {
    setError("");

    // ✅ Frontend validation
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!email || !sid) {
      setError("Invalid or expired reset link");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword({
        email,
        password: data.password,
        sid,
      }).unwrap();

      // ✅ Success → redirect to login
      router.replace("/Login");
    } catch (err: any) {
      console.error(err);
      setError(
        err?.data?.message ?? "Failed to reset password. Please try again."
      );
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
        onToggleConfirmPassword={() =>
          setShowConfirmPassword((prev) => !prev)
        }
        onToggleCurrentPassword={() =>
          setShowCurrentPassword((prev) => !prev)
        }
        onSubmit={handleSubmit}
        setError={setError}
      />
    </ThemeProvider>
  );
};

export default ResetPassword;
