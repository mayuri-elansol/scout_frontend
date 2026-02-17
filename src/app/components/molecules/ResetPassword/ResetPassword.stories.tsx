import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import ResetPasswordForm from "./ResetPassword";
import type { ResetPasswordFormData } from "./ResetPassword.type";

const meta: Meta<typeof ResetPasswordForm> = {
  title: "Components/Molecules/ResetPasswordForm",
  component: ResetPasswordForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResetPasswordForm>;

// ✅ Wrapper to handle formData and loading internally
const ResetPasswordFormWrapper = ({
  initialFormData,
  initialLoading = false,
}: {
  initialFormData?: ResetPasswordFormData;
  initialLoading?: boolean;
}) => {
  const defaultFormData: ResetPasswordFormData = {
    userName: "",
    password: "",
    confirmPassword: "",
    ...initialFormData,
  };

  const [formData, setFormData] = useState<ResetPasswordFormData>(defaultFormData);
  const [isLoading, setIsLoading] = useState<boolean>(initialLoading);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleInputChange =
    (field: keyof ResetPasswordFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Form submitted", data);
    }, 1000);
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <ResetPasswordForm
      showPassword={showPassword}
      showConfirmPassword={showConfirmPassword}
      isLoading={isLoading}
      onTogglePassword={handleTogglePassword}
      onToggleConfirmPassword={handleToggleConfirmPassword}
      onSubmit={handleSubmit}
    />
  );
};

// ✅ Stories
export const Default: Story = {
  render: () => <ResetPasswordFormWrapper />,
};

export const Loading: Story = {
  render: () => <ResetPasswordFormWrapper initialLoading={true} />,
};

export const Filled: Story = {
  render: () =>
    <ResetPasswordFormWrapper
      initialFormData={{
        userName: "demoUser",
        password: "newpass",
        confirmPassword: "newpass",
      }}
    />,
};