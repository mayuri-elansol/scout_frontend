import type { Meta, StoryObj } from "@storybook/react-vite";
import ZoneViolations from "./ZoneViolations";

const meta: Meta<typeof ZoneViolations> = {
  title: "Components/ZoneViolations",
  component: ZoneViolations,
};
export default meta;

type Story = StoryObj<typeof ZoneViolations>;

export const Loading: Story = {
  args: {
    cameraZones: [],
    loading: true,
    maxHeight: 300,
    tooltipMessage: "This shows violations and alarms for each zone.",
  },
};

export const WithData: Story = {
  args: {
    cameraZones: [
      { zone: "Zone A", violations: 5, alarms: 2 },
      { zone: "Zone B", violations: 3, alarms: 0 },
      { zone: "Zone C", violations: 8, alarms: 4 },
      { zone: "Zone D", violations: 0, alarms: 1 },
    ],
    loading: false,
    maxHeight: 300,
    tooltipMessage: "This shows violations and alarms for each zone.",
  },
};
