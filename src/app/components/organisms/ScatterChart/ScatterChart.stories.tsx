import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DynamicViolationScatterChart from "./ScatterChart";

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

// Use typeof component props for type
type Story = StoryObj<React.ComponentProps<typeof DynamicViolationScatterChart>>;

// ✅ Sample demo data for Storybook
const demoItem = {
  title: "Employee Violations",
  graphs: {
    data: {
      granularity: "Hour",
   series: [
  {
    zone: "Zone A",
    color: "#ef4444",
    data: [
      { label: "08:00", count: 3 },
      { label: "09:00", count: 5 },
      { label: "10:00", count: 7 },
    ],
  },
  {
    zone: "Zone B",
    color: "#3b82f6",
    data: [
      { label: "08:00", count: 1 },
      { label: "09:00", count: 6 },
      { label: "10:00", count: 4 },
      { label: "11:00", count: 3 },
    ],
  },
  {
    zone: "Zone C",
    color: "#22c55e",
    data: [
      { label: "08:00", count: 2 },
      { label: "09:00", count: 4 },
      { label: "10:00", count: 8 },
      { label: "11:00", count: 5 },
    ],
  },
]
    },
  },
};

export const Default: Story = {
  args: {
    item: demoItem,
  },
};

export const EmptyData: Story = {
  args: {
    item: {
      title: "Empty Violations",
      graphs: { data: { series: [] } },
    },
  },
};

export const SingleZone: Story = {
  args: {
    item: {
      title: "Single Zone Violations",
      graphs: {
        data: {
          granularity: "Hour",
          series: [
           {
  zone: "Zone A",
  color: "#ef4444",
  data: [
    { label: "08:00", count: 2 },
    { label: "09:00", count: 4 },
  ],
}
          ],
        },
      },
    },
  },
};