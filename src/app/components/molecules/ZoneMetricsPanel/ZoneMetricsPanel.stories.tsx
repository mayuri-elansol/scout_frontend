import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import ZoneMetricsPanel from "./ZoneMetricsPanel";

const meta = {
  title: "Components/Molecules/ZoneMetricsPanel",
  component: ZoneMetricsPanel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Zone metrics panel component that displays multiple metrics in a row or column layout. Used in Live Streaming camera feed cards to show zone-specific analytics.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          p: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: 1,
          minWidth: "400px",
        }}
      >
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    metrics: {
      control: "object",
      description: "Array of metrics to display",
    },
    direction: {
      control: "select",
      options: ["row", "column"],
      description: "Layout direction for metrics",
    },
    spacing: {
      control: "number",
      description: "Spacing between metric items",
    },
  },
  args: {
    metrics: [
      { value: "87.5%", label: "Compliance Rate", color: "#4caf50" },
      { value: 3, label: "Active Violations", color: "#f44336" },
      { value: 234, label: "People Detected", color: "#2196f3" },
      { value: 12, label: "No Helmet Detected", color: "#f44336" },
    ],
    direction: "row",
    spacing: 2,
  },
} satisfies Meta<typeof ZoneMetricsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const ProductionZone: Story = {
  args: {
    metrics: [
      { value: "87.5%", label: "Compliance Rate", color: "#4caf50" },
      { value: 3, label: "Active Violations", color: "#f44336" },
      { value: 234, label: "People Detected", color: "#2196f3" },
      { value: 12, label: "No Helmet Detected", color: "#f44336" },
    ],
  },
};

export const WarehouseZone: Story = {
  args: {
    metrics: [
      { value: "92.3%", label: "Compliance Rate", color: "#4caf50" },
      { value: 1, label: "Active Violations", color: "#ff9800" },
      { value: 45, label: "People Detected", color: "#2196f3" },
      { value: 2, label: "No Helmet Detected", color: "#f44336" },
    ],
  },
};

export const AssemblyZone: Story = {
  args: {
    metrics: [
      { value: "95.1%", label: "Compliance Rate", color: "#4caf50" },
      { value: 0, label: "Active Violations", color: "#4caf50" },
      { value: 67, label: "People Detected", color: "#2196f3" },
      { value: 1, label: "No Helmet Detected", color: "#ff9800" },
    ],
  },
};

export const EmptyZone: Story = {
  args: {
    metrics: [
      { value: "—", label: "Compliance Rate", color: "#999" },
      { value: 0, label: "Active Violations", color: "#4caf50" },
      { value: 0, label: "People Detected", color: "#999" },
      { value: 0, label: "No Helmet Detected", color: "#4caf50" },
    ],
  },
};

export const ColumnLayout: Story = {
  args: {
    direction: "column",
    metrics: [
      { value: "87.5%", label: "Compliance Rate", color: "#4caf50" },
      { value: 3, label: "Active Violations", color: "#f44336" },
      { value: 234, label: "People Detected", color: "#2196f3" },
    ],
  },
};

export const TwoMetrics: Story = {
  args: {
    metrics: [
      { value: "98.5%", label: "System Uptime", color: "#4caf50" },
      { value: "LIVE", label: "Feed Status", color: "#2196f3" },
    ],
  },
};

export const LargeSpacing: Story = {
  args: {
    spacing: 4,
    metrics: [
      { value: "87.5%", label: "Compliance Rate", color: "#4caf50" },
      { value: 3, label: "Active Violations", color: "#f44336" },
      { value: 234, label: "People Detected", color: "#2196f3" },
    ],
  },
};
