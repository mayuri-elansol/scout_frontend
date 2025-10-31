import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DynamicViolationScatterChart, {
  DynamicViolationScatterChartProps,
  ViolationData,
} from "./ScatterChart";

const meta: Meta<typeof DynamicViolationScatterChart> = {
  title: "Components/Organisms/DynamicViolationScatterChart",
  component: DynamicViolationScatterChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "600px",
          height: "400px",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          background: "#fafafa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          padding: "16px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<DynamicViolationScatterChartProps>;

// ✅ Sample demo data
const demoData: ViolationData[] = [
  { time: "08:00", zone: "Zone A", count: 3 },
  { time: "09:00", zone: "Zone A", count: 5 },
  { time: "10:00", zone: "Zone A", count: 7 },
  { time: "08:00", zone: "Zone B", count: 1 },
  { time: "09:00", zone: "Zone B", count: 6 },
  { time: "10:00", zone: "Zone B", count: 4 },
  { time: "11:00", zone: "Zone B", count: 3 },
  { time: "08:00", zone: "Zone C", count: 2 },
  { time: "09:00", zone: "Zone C", count: 4 },
  { time: "10:00", zone: "Zone C", count: 8 },
  { time: "11:00", zone: "Zone C", count: 5 },
  { time: "09:00", zone: "Zone D", count: 2 },
  { time: "10:00", zone: "Zone D", count: 3 },
  { time: "11:00", zone: "Zone D", count: 6 },
];

export const Default: Story = {
  args: {
    data: demoData,
    colors: ["#f44336", "#2196f3", "#4caf50", "#ff9800"],
  },
};

export const EmptyData: Story = {
  args: {
    data: [],
  },
};

export const CustomColors: Story = {
  args: {
    data: demoData,
    colors: ["#8e44ad", "#3498db", "#27ae60", "#e67e22"],
  },
};
