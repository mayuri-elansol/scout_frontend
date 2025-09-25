import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import ForgotPasswordForm from "./ForgotPassword";

const meta: Meta<typeof ForgotPasswordForm> = {
  title: "Auth/ForgotPasswordForm",
  component: ForgotPasswordForm,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ForgotPasswordForm>;

export const Default: Story = {
  render: (args) => <ForgotPasswordForm {...args} isLoading={false} />,
};

export const Loading: Story = {
  render: (args) => <ForgotPasswordForm {...args} isLoading={true} />,
};
