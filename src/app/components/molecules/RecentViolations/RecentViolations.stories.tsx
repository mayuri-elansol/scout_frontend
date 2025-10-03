import type { Meta, StoryObj } from "@storybook/react-vite";
import RecentViolations from "./RecentViolations";

const meta: Meta<typeof RecentViolations> = {
  title: "Components/Molecules/RecentViolations",
  component: RecentViolations,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof RecentViolations>;

const sampleViolations = [
  {
    title: "Unauthorized Access",
    zone: "Main Gate",
    time: "10:30 AM",
    Id: "V-101",
    severity: "HIGH",
    status: "ACTIVE",
    imageUrl: "",
  },
  {
    title: "Safety Protocol Breach",
    zone: "Reactor Zone",
    time: "11:15 AM",
    Id: "V-102",
    severity: "MEDIUM",
    status: "RESOLVED",
    imageUrl: "",
  },
];

export const Default: Story = {
  args: {
    label: "Recent Violations",
    violations: sampleViolations,
  },
};

export const Loading: Story = {
  args: {
    label: "Recent Violations",
    violations: [],
    loading: true,
  },
};
