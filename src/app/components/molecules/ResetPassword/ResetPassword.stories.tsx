import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import ResetPasswordForm from "./ResetPassword";
import type { ResetPasswordFormData } from "./ResetPassword.type";

const meta: Meta<typeof ResetPasswordForm> = {
  title: "Components/Molecules/ResetPasswordForm",
  component: ResetPasswordForm,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ResetPasswordForm>;

const defaultProps = {
  formData: {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  } as ResetPasswordFormData,
  showCurrentPassword: false,
  showPassword: false,
  showConfirmPassword: false,
  isLoading: false,
  error: "",
  onInputChange:
    (field: keyof ResetPasswordFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(`Changed ${field}:`, e.target.value);
    },
  onToggleCurrentPassword: () =>
    console.log("Toggle current password visibility"),
  onTogglePassword: () => console.log("Toggle password visibility"),
  onToggleConfirmPassword: () =>
    console.log("Toggle confirm password visibility"),
  onSubmit: (data: ResetPasswordFormData) => {
    console.log("Form submitted", data);
  },
  setError: (err: string) => console.log("Set error:", err),
};

export const Default: Story = {
  args: { ...defaultProps },
};

export const WithError: Story = {
  args: { ...defaultProps, error: "Passwords do not match" },
};

export const Loading: Story = {
  args: { ...defaultProps, isLoading: true },
};

export const Filled: Story = {
  args: {
    ...defaultProps,
  },
};
