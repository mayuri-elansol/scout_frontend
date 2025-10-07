// ViolationCard.stories.tsx

import type { Meta, StoryObj } from "@storybook/react-vite";
import { ViolationCard } from "./ViolationCard";

const meta: Meta<typeof ViolationCard> = {
  title: "Components/Molecules/ViolationCard",
  component: ViolationCard,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof ViolationCard>;

// Default sample data
const sampleViolation = {
  voilation: "Unauthorized Entry",
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
    violations: sampleViolation,
  },
};

// With Image Story
export const WithImage: Story = {
  args: {
    violations: {
      ...sampleViolation,
      imageUrl: "https://picsum.photos/400/200",
      voilation: "",
    },
  },
};

// Low Severity Story
export const LowSeverity: Story = {
  args: {
    violations: {
      ...sampleViolation,
      severity: "LOW",
      status: "RESOLVED",
      voilation: "",
    },
  },
};
