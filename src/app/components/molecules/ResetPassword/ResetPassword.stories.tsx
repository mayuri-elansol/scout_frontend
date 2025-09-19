import type { Meta, StoryObj } from "@storybook/react";
import ResetPasswordForm from "./ResetPassword";

const meta: Meta<typeof ResetPasswordForm> = {
  title: "Components/Molecules/ResetPasswordForm",
  component: ResetPasswordForm,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ResetPasswordForm>;

const defaultProps = {
  formData: {
    password: "",
    confirmPassword: "",
  },
  showPassword: false,
  showConfirmPassword: false,
  isLoading: false,
  error: "",
  onInputChange:
    (field: "password" | "confirmPassword") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(`Changed ${field}:`, e.target.value);
    },
  onTogglePassword: () => console.log("Toggle password visibility"),
  onToggleConfirmPassword: () =>
    console.log("Toggle confirm password visibility"),
  onSubmit: (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
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
    formData: {
      currentPassword: "SEcreate123!",
      password: "Secret123!",
      confirmPassword: "Secret123!",
    },
  },
};
