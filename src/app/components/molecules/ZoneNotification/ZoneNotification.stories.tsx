import type { Meta, StoryObj } from "@storybook/react-vite";
import ZoneNotification from "./ZoneNotification";

const meta: Meta<typeof ZoneNotification> = {
  title: "Molecules/ZoneNotification",
  component: ZoneNotification,
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
      description: "Show skeleton loader instead of data",
    },
  },
};
export default meta;

type Story = StoryObj<typeof ZoneNotification>;

const sampleZones = [
  {
    zone: "Assembly Line 1",
    compliance: 92,
    violations: 2,
    cameras: "12",
    status: "excellent",
  },
  {
    zone: "Packaging Zone",
    compliance: 75,
    violations: 5,
    cameras: "8",
    status: "good",
  },
  {
    zone: "Loading Dock",
    compliance: 48,
    violations: 9,
    cameras: "5",
    status: "warning",
  },
];

export const Default: Story = {
  args: {
    zones: sampleZones,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    zones: [],
    loading: true,
  },
};
