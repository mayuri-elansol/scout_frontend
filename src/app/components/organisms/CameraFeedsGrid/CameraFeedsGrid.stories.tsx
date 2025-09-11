import type { Meta, StoryObj } from "@storybook/react-vite";
import CameraFeedsGrid from "./CameraFeedsGrid";

const mockZones = [
  {
    id: "zone-a",
    name: "Production Zone A",
    status: "LIVE" as const,
    worker: "Worker #2",
    metrics: [
      { value: "87.5%", label: "Compliance Rate", color: "#4caf50" },
      { value: 3, label: "Active Violations", color: "#f44336" },
      { value: 234, label: "People Detected", color: "#2196f3" },
      { value: 12, label: "No Helmet Detected", color: "#f44336" },
    ],
  },
  {
    id: "zone-b",
    name: "Warehouse Zone B",
    status: "LIVE" as const,
    worker: "Worker #4",
    metrics: [
      { value: "92.3%", label: "Compliance Rate", color: "#4caf50" },
      { value: 1, label: "Active Violations", color: "#ff9800" },
      { value: 45, label: "People Detected", color: "#2196f3" },
      { value: 2, label: "No Helmet Detected", color: "#f44336" },
    ],
  },
  {
    id: "zone-c",
    name: "Assembly Zone C",
    status: "LIVE" as const,
    worker: undefined,
    metrics: [
      { value: "95.1%", label: "Compliance Rate", color: "#4caf50" },
      { value: 0, label: "Active Violations", color: "#4caf50" },
      { value: 67, label: "People Detected", color: "#2196f3" },
      { value: 1, label: "No Helmet Detected", color: "#ff9800" },
    ],
  },
  {
    id: "zone-d",
    name: "Loading Dock Zone D",
    status: "LIVE" as const,
    worker: undefined,
    metrics: [
      { value: "—", label: "Compliance Rate", color: "#999" },
      { value: 0, label: "Active Violations", color: "#4caf50" },
      { value: 0, label: "People Detected", color: "#999" },
      { value: 0, label: "No Helmet Detected", color: "#4caf50" },
    ],
  },
];

const meta = {
  title: "Components/Organisms/CameraFeedsGrid",
  component: CameraFeedsGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Camera feeds grid component that displays multiple CameraFeedCard components in a responsive grid layout. Used in the main content area of the Live Streaming page.",
      },
    },
  },
  argTypes: {
    zones: {
      control: "object",
      description: "Array of camera zones to display",
    },
    aiProcessingEnabled: {
      control: "boolean",
      description: "Whether AI processing overlays are enabled globally",
    },
    spacing: {
      control: "number",
      description: "Grid spacing between camera feed cards",
    },
    onPlayPause: {
      action: "play-pause",
      description: "Callback for play/pause actions",
    },
    onMuteToggle: {
      action: "mute-toggle",
      description: "Callback for mute toggle actions",
    },
    onFullscreen: {
      action: "fullscreen",
      description: "Callback for fullscreen actions",
    },
  },
  args: {
    zones: mockZones,
    aiProcessingEnabled: true,
    spacing: 3,
    onPlayPause: () => {},
    onMuteToggle: () => {},
    onFullscreen: () => {},
  },
} satisfies Meta<typeof CameraFeedsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const AllZonesLive: Story = {
  args: {
    zones: mockZones,
    aiProcessingEnabled: true,
  },
};

export const NoAIProcessing: Story = {
  args: {
    zones: mockZones,
    aiProcessingEnabled: false,
  },
};

export const MixedStatus: Story = {
  args: {
    zones: [
      {
        id: "zone-1",
        name: "Production Zone A",
        status: "LIVE",
        worker: "Worker #2",
        metrics: [
          { value: "87.5%", label: "Compliance Rate", color: "#4caf50" },
          { value: 3, label: "Active Violations", color: "#f44336" },
          { value: 234, label: "People Detected", color: "#2196f3" },
          { value: 12, label: "No Helmet Detected", color: "#f44336" },
        ],
      },
      {
        id: "zone-2",
        name: "Maintenance Zone",
        status: "OFFLINE",
        worker: undefined,
        metrics: [
          { value: "—", label: "Compliance Rate", color: "#999" },
          { value: "—", label: "Active Violations", color: "#999" },
          { value: "—", label: "People Detected", color: "#999" },
          { value: "—", label: "No Helmet Detected", color: "#999" },
        ],
      },
      {
        id: "zone-3",
        name: "Security Checkpoint",
        status: "MAINTENANCE",
        worker: undefined,
        metrics: [
          { value: "—", label: "Compliance Rate", color: "#999" },
          { value: "—", label: "Active Violations", color: "#999" },
          { value: "—", label: "People Detected", color: "#999" },
          { value: "—", label: "No Helmet Detected", color: "#999" },
        ],
      },
      {
        id: "zone-4",
        name: "Assembly Zone",
        status: "LIVE",
        worker: "Worker #7",
        metrics: [
          { value: "95.1%", label: "Compliance Rate", color: "#4caf50" },
          { value: 0, label: "Active Violations", color: "#4caf50" },
          { value: 67, label: "People Detected", color: "#2196f3" },
          { value: 1, label: "No Helmet Detected", color: "#ff9800" },
        ],
      },
    ],
  },
};

export const TwoZones: Story = {
  args: {
    zones: mockZones.slice(0, 2),
  },
};

export const SingleZone: Story = {
  args: {
    zones: [mockZones[0]],
  },
};

export const TightSpacing: Story = {
  args: {
    spacing: 1,
  },
};

export const WideSpacing: Story = {
  args: {
    spacing: 4,
  },
};

export const HighActivity: Story = {
  args: {
    zones: [
      {
        id: "zone-high-1",
        name: "Critical Production Zone",
        status: "LIVE",
        worker: "Supervisor #1",
        metrics: [
          { value: "76.2%", label: "Compliance Rate", color: "#ff9800" },
          { value: 15, label: "Active Violations", color: "#f44336" },
          { value: 523, label: "People Detected", color: "#2196f3" },
          { value: 47, label: "No Helmet Detected", color: "#f44336" },
        ],
      },
      {
        id: "zone-high-2",
        name: "Emergency Assembly Point",
        status: "LIVE",
        worker: "Safety Officer #3",
        metrics: [
          { value: "89.1%", label: "Compliance Rate", color: "#4caf50" },
          { value: 7, label: "Active Violations", color: "#ff9800" },
          { value: 156, label: "People Detected", color: "#2196f3" },
          { value: 18, label: "No Helmet Detected", color: "#f44336" },
        ],
      },
    ],
  },
};
