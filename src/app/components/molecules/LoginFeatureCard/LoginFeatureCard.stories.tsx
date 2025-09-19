import type { Meta, StoryObj } from "@storybook/react";
import  LoginFeatureCard  from "./LoginFeatureCard";
import { Lock, Security, Analytics } from "@mui/icons-material";

//  Default export with metadata (required)
const meta: Meta<typeof LoginFeatureCard> = {
  title: "Molecules/LoginFeatureCard",
  component: LoginFeatureCard,
  tags: ["autodocs"], // enables autodocs in SB 7+
  args: {
    delay: 0,
  },
};

export default meta;
type Story = StoryObj<typeof LoginFeatureCard>;

//  Stories
export const Default: Story = {
  args: {
    icon: <Lock />,
    title: "Secure Login",
    description: "Your account is protected with modern security measures.",
  },
};

export const WithAnalytics: Story = {
  args: {
    icon: <Analytics />,
    title: "Insights",
    description: "Get powerful analytics right from the dashboard.",
    delay: 200,
  },
};

export const WithSecurity: Story = {
  args: {
    icon: <Security />,
    title: "Multi-layer Security",
    description: "Advanced protection for your CCTV portal.",
    delay: 400,
  },
};
