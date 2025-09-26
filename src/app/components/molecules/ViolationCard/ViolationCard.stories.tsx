import type { Meta, StoryObj } from "@storybook/react-vite";

import { ViolationCard } from "./ViolationCard";
// Storybook metadata
const meta: Meta<typeof ViolationCard> = {
  title: "Components/Molecules/ViolationCard",
  component: ViolationCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ViolationCard>;

// Default sample data
const sampleViolation: {
  title: string;
  zone: string;
  time: string;
  Id: string;
  severity?: "HIGH" | "MEDIUM" | "LOW";
  status?: "ACTIVE" | "RESOLVED";
  imageUrl?: string;
} = {
  title: "Unauthorized Entry",
  zone: "Main Gate",
  time: "10:30 AM",
  Id: "VIO-00123",
  severity: "HIGH",
  status: "ACTIVE",
  imageUrl: "",
};

// Default Story
export const Default: Story = {
  args: {
    violation: sampleViolation,
  },
};

//  With Image Story
export const WithImage: Story = {
  args: {
    violation: {
      ...sampleViolation,
      imageUrl: "https://picsum.photos/400/200",
    },
  },
};

//  Low Severity Story
export const LowSeverity: Story = {
  args: {
    violation: {
      ...sampleViolation,
      severity: "LOW",
      status: "RESOLVED",
    },
  },
};
