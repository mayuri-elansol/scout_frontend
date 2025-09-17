"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ResetPasswordForm from "@/app/components/molecules/ResetPassword/ResetPassword";
import { ResetPasswordFormData } from "@/app/components/molecules/ResetPassword/ResetPassword.type";


const ResetPassword: React.FC = () => {
  const router = useRouter();
 
const [formData, setFormData] = useState<ResetPasswordFormData>({
  // email: "",
  password: "",
  confirmPassword: "",
});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send reset email. Please try again.");
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
    <ResetPasswordForm
      formData={formData}
      showPassword={false}
      showConfirmPassword={false}
      isLoading={isLoading}
      error={error}
      onInputChange={handleInputChange}
      onTogglePassword={() => {}} // not needed here
      onToggleConfirmPassword={() => {}} // not needed here
      onSubmit={handleSubmit}
      setError={setError}
    />
  );
};

export default ResetPassword;

