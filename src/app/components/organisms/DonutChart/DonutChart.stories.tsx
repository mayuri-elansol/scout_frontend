import type { Meta, StoryObj } from "@storybook/react";
import CameraStatusDonutChart from "./DonutChart";

const meta: Meta<typeof CameraStatusDonutChart> = {
  title: "Components/Organisms/DonutChart",
  component: CameraStatusDonutChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CameraStatusDonutChart>;

export const Default: Story = {
  args: {
    data: [
      {
        label: "Fire",
        value: 12,
        color: "#FF5252",
      },
      {
        label: "Smoke",
        value: 8,
        color: "#FF9800",
      },
      {
        label: "PPE",
        value: 20,
        color: "#4CAF50",
      },
      {
        label: "Intrusion",
        value: 5,
        color: "#2196F3",
      },
    ],
  },
};

export const SingleIncidentType: Story = {
  args: {
    data: [
      {
        label: "Fire",
        value: 25,
        color: "#FF5252",
      },
    ],
  },
};

export const ZeroData: Story = {
  args: {
    data: [
      {
        label: "Fire",
        value: 0,
        color: "#FF5252",
      },
      {
        label: "Smoke",
        value: 0,
        color: "#FF9800",
      },
    ],
  },
};

export const LargeNumbers: Story = {
  args: {
    data: [
      {
        label: "Fire",
        value: 1200,
        color: "#FF5252",
      },
      {
        label: "Smoke",
        value: 800,
        color: "#FF9800",
      },
      {
        label: "PPE",
        value: 2000,
        color: "#4CAF50",
      },
    ],
  },
};
