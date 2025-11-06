import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import VehicleCountBarChart, {
  VehicleCountBarChartProps,
} from "./JointBarGraphChart";

const meta: Meta<typeof VehicleCountBarChart> = {
  title: "Components/Organisms/JointBarGraphChart",
  component: VehicleCountBarChart,
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

type Story = StoryObj<VehicleCountBarChartProps>;

// ✅ Sample data for the chart
const times = ["08:00", "09:00", "10:00", "11:00", "12:00"];

const seriesData = [
  {
    label: "Cars",
    data: [15, 25, 30, 20, 10],
    color: "#1976d2",
  },
  {
    label: "Trucks",
    data: [5, 8, 10, 6, 4],
    color: "#ef5350",
  },
  {
    label: "Bikes",
    data: [20, 30, 25, 28, 15],
    color: "#66bb6a",
  },
  {
    label: "Buses",
    data: [2, 4, 5, 3, 2],
    color: "#ffb300",
  },
];

export const Default: Story = {
  args: {
    times,
    seriesData,
  },
};

export const CustomColors: Story = {
  args: {
    times,
    seriesData: [
      {
        label: "Cars",
        data: [10, 15, 20, 18, 12],
        color: "#8e44ad",
      },
      {
        label: "Bikes",
        data: [25, 22, 18, 30, 20],
        color: "#3498db",
      },
      {
        label: "Trucks",
        data: [5, 6, 9, 8, 4],
        color: "#e67e22",
      },
    ],
  },
};

export const NoData: Story = {
  args: {
    times: [],
    seriesData: [],
  },
};
