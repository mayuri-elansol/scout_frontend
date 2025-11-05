import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DynamicPieChart, { DynamicPieChartProps } from "./PieChart";

const meta: Meta<typeof DynamicPieChart> = {
  title: "Components/Organisms/DynamicPieChart",
  component: DynamicPieChart,
  tags: ["autodocs"],
  parameters: {
    layout: "padded", // prevent fullscreen stretching
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "300px",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #eee",
          borderRadius: "8px",
          background: "#fafafa",
          margin: "auto",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<DynamicPieChartProps>;

const sampleData = [
  { label: "Active", value: 50, color: "#4caf50" },
  { label: "Inactive", value: 30, color: "#f44336" },
  { label: "Pending", value: 20, color: "#ff9800" },
];

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const SmallDataset: Story = {
  args: {
    data: [
      { label: "Operational", value: 70, color: "#2196f3" },
      { label: "Fault", value: 30, color: "#e91e63" },
    ],
  },
};

export const WithoutZoneName: Story = {
  args: {
    data: sampleData,
  },
};
