import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DynamicBarChartWithThreshold, {
  DynamicBarChartWithThresholdProps,
  SeriesConfig,
} from "./BarChartWithThreshold";

interface DemoData {
  name: string;
  active: number;
  inactive: number;
  pending: number;
  [key: string]: string | number;
}

const sampleData: DemoData[] = [
  { name: "Zone A", active: 40, inactive: 15, pending: 10 },
  { name: "Zone B", active: 55, inactive: 10, pending: 15 },
  { name: "Zone C", active: 35, inactive: 25, pending: 5 },
  { name: "Zone D", active: 60, inactive: 5, pending: 10 },
];

const seriesConfig: SeriesConfig<DemoData>[] = [
  { dataKey: "active", label: "Active", color: "#4caf50" },
  { dataKey: "inactive", label: "Inactive", color: "#f44336" },
  { dataKey: "pending", label: "Pending", color: "#ff9800" },
];

const meta: Meta<typeof DynamicBarChartWithThreshold> = {
  title: "Components/Organisms/DynamicBarChartWithThreshold",
  component: DynamicBarChartWithThreshold,
  tags: ["autodocs"],
  parameters: {
    layout: "padded", // prevents full stretch
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "500px",
          height: "350px",
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

type Story = StoryObj<DynamicBarChartWithThresholdProps<DemoData>>;

export const Default: Story = {
  args: {
    data: sampleData,
    xAxisKey: "name",
    series: seriesConfig,
    thresholdValue: 50,
    thresholdLabel: "Target",
    thresholdColor: "#1976d2",
    yAxisLabel: "User Count",
  },
};

export const HighThreshold: Story = {
  args: {
    data: sampleData,
    xAxisKey: "name",
    series: seriesConfig,
    thresholdValue: 70,
    thresholdLabel: "High Target",
    thresholdColor: "red",
  },
};

export const LowThreshold: Story = {
  args: {
    data: sampleData,
    xAxisKey: "name",
    series: seriesConfig,
    thresholdValue: 20,
    thresholdLabel: "Low Limit",
    thresholdColor: "orange",
  },
};
