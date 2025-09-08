// src/stories/UnderDevelopment.stories.tsx
// import type { Meta, StoryObj } from '@storybook/react';
import type { Meta, StoryObj } from "@storybook/react-vite";
import UnderDevelopment from "./UnderDevelopment";

const meta: Meta<typeof UnderDevelopment> = {
  title: "Molecules/UnderDevelopment",
  component: UnderDevelopment,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    pageName: {
      control: "text",
      description: "The name of the page that is under development",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UnderDevelopment>;

export const Default: Story = {
  args: {
    pageName: "dashboard",
  },
};

export const PPEDetection: Story = {
  args: {
    pageName: "ppe-detection",
  },
};

export const FireDetection: Story = {
  args: {
    pageName: "fire-detection",
  },
};

export const Reports: Story = {
  args: {
    pageName: "reports",
  },
};

export const Settings: Story = {
  args: {
    pageName: "settings",
  },
};
