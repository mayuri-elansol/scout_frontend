import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DynamicBarChart, {
  DynamicBarChartProps,
  SeriesConfig,
} from "./BarChart";

// ✅ Example data model
interface ExampleData {
  month: string;
  sales: number;
  profit: number;
  [key: string]: string | number;
}

// ✅ Mock data
const sampleData: ExampleData[] = [
  { month: "Jan", sales: 4000, profit: 2400 },
  { month: "Feb", sales: 3000, profit: 1398 },
  { month: "Mar", sales: 2000, profit: 9800 },
  { month: "Apr", sales: 2780, profit: 3908 },
  { month: "May", sales: 1890, profit: 4800 },
  { month: "Jun", sales: 2390, profit: 3800 },
];

// ✅ Series config
const seriesConfig: SeriesConfig<ExampleData>[] = [
  { dataKey: "sales", label: "Sales", color: "#1976d2" },
  { dataKey: "profit", label: "Profit", color: "#2e7d32" },
];

// ✅ Wrapper to lock generic type for Storybook
const ExampleBarChart = (props: DynamicBarChartProps<ExampleData>) => (
  <div style={{ width: 600, height: 400 }}>
    <DynamicBarChart {...props} />
  </div>
);

const meta: Meta<typeof ExampleBarChart> = {
  title: "Components/Organisms/DynamicBarChart",
  component: ExampleBarChart,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ExampleBarChart>;

// ✅ Stories
export const Default: Story = {
  args: {
    data: sampleData,
    xAxisKey: "month",
    series: seriesConfig,
    yAxisLabel: "Value",
  },
};

export const Stacked: Story = {
  args: {
    data: sampleData,
    xAxisKey: "month",
    series: seriesConfig,
    yAxisLabel: "Total Value",
    stackId: "stack",
  },
};

export const MobileView: Story = {
  args: {
    data: sampleData,
    xAxisKey: "month",
    series: seriesConfig,
    yAxisLabel: "Count",
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
