// import type { Meta, StoryObj } from '@storybook/react';
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "@mui/material";
import CameraFeedCard from "./CameraFeedCard";

const meta = {
  title: "Components/Organisms/CameraFeedCard",
  component: CameraFeedCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Complete camera feed card component used in Live Streaming page. Combines video feed, AI overlays, controls, and zone metrics in a single card.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "600px", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    zone: {
      control: "object",
      description: "Zone information including ID, name, status, and worker",
    },
    metrics: {
      control: "object",
      description: "Array of zone metrics to display",
    },
    aiProcessingEnabled: {
      control: "boolean",
      description: "Whether AI processing overlays are shown",
    },
    roiLabel: {
      control: "text",
      description: "Label for ROI detection overlay",
    },
    initialPlaying: {
      control: "boolean",
      description: "Initial playing state",
    },
    initialMuted: {
      control: "boolean",
      description: "Initial muted state",
    },
    onPlayPause: {
      action: "play-pause",
      description: "Callback for play/pause action",
    },
    onMuteToggle: {
      action: "mute-toggle",
      description: "Callback for mute toggle action",
    },
    onFullscreen: {
      action: "fullscreen",
      description: "Callback for fullscreen action",
    },
  },
  args: {
    zone: {
      id: "zone-a",
      name: "Production Zone A",
      status: "LIVE",
      worker: "Worker #2",
    },
    metrics: [
      { value: "87.5%", label: "Compliance Rate", color: "#4caf50" },
      { value: 3, label: "Active Violations", color: "#f44336" },
      { value: 234, label: "People Detected", color: "#2196f3" },
      { value: 12, label: "No Helmet Detected", color: "#f44336" },
    ],
    aiProcessingEnabled: true,
    roiLabel: "ROI DETECTION",
    initialPlaying: false,
    initialMuted: true,
    onPlayPause: () => {},
    onMuteToggle: () => {},
    onFullscreen: () => {},
  },
} satisfies Meta<typeof CameraFeedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductionZone: Story = {
  args: {},
};

export const WarehouseZone: Story = {
  args: {
    zone: {
      id: "zone-b",
      name: "Warehouse Zone B",
      status: "LIVE",
      worker: "Worker #4",
    },
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
    zone: {
      id: "zone-c",
      name: "Assembly Zone C",
      status: "LIVE",
      worker: undefined,
    },
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
    zone: {
      id: "zone-d",
      name: "Loading Dock Zone D",
      status: "LIVE",
      worker: undefined,
    },
    metrics: [
      { value: "—", label: "Compliance Rate", color: "#999" },
      { value: 0, label: "Active Violations", color: "#4caf50" },
      { value: 0, label: "People Detected", color: "#999" },
      { value: 0, label: "No Helmet Detected", color: "#4caf50" },
    ],
  },
};

export const OfflineZone: Story = {
  args: {
    zone: {
      id: "zone-offline",
      name: "Maintenance Zone",
      status: "OFFLINE",
      worker: undefined,
    },
    metrics: [
      { value: "—", label: "Compliance Rate", color: "#999" },
      { value: "—", label: "Active Violations", color: "#999" },
      { value: "—", label: "People Detected", color: "#999" },
      { value: "—", label: "No Helmet Detected", color: "#999" },
    ],
    aiProcessingEnabled: false,
  },
};

export const MaintenanceZone: Story = {
  args: {
    zone: {
      id: "zone-maintenance",
      name: "Security Checkpoint",
      status: "MAINTENANCE",
      worker: undefined,
    },
    metrics: [
      { value: "—", label: "Compliance Rate", color: "#999" },
      { value: "—", label: "Active Violations", color: "#999" },
      { value: "—", label: "People Detected", color: "#999" },
      { value: "—", label: "No Helmet Detected", color: "#999" },
    ],
    aiProcessingEnabled: false,
  },
};

export const NoAIProcessing: Story = {
  args: {
    aiProcessingEnabled: false,
  },
};

export const PPEDetection: Story = {
  args: {
    roiLabel: "PPE DETECTION",
    zone: {
      id: "zone-ppe",
      name: "PPE Checkpoint Zone",
      status: "LIVE",
      worker: "Worker #7",
    },
    metrics: [
      { value: "76.2%", label: "PPE Compliance", color: "#ff9800" },
      { value: 8, label: "Violations", color: "#f44336" },
      { value: 34, label: "People Detected", color: "#2196f3" },
      { value: 8, label: "Missing PPE", color: "#f44336" },
    ],
  },
};

export const LiveStreamingGrid: Story = {
  decorators: [
    () => (
      <Grid container spacing={3} sx={{ maxWidth: "1200px", p: 2 }}>
        <Grid size={{ xs:12, lg:6 }}>
          <CameraFeedCard
            zone={{
              id: "zone-a",
              name: "Production Zone A",
              status: "LIVE",
              worker: "Worker #2",
            }}
            metrics={[
              { value: "87.5%", label: "Compliance Rate", color: "#4caf50" },
              { value: 3, label: "Active Violations", color: "#f44336" },
              { value: 234, label: "People Detected", color: "#2196f3" },
              { value: 12, label: "No Helmet Detected", color: "#f44336" },
            ]}
            aiProcessingEnabled={true}
          />
        </Grid>
        <Grid size={{ xs:12, lg:6 }}>
          <CameraFeedCard
            zone={{
              id: "zone-b",
              name: "Warehouse Zone B",
              status: "LIVE",
              worker: "Worker #4",
            }}
            metrics={[
              { value: "92.3%", label: "Compliance Rate", color: "#4caf50" },
              { value: 1, label: "Active Violations", color: "#ff9800" },
              { value: 45, label: "People Detected", color: "#2196f3" },
              { value: 2, label: "No Helmet Detected", color: "#f44336" },
            ]}
            aiProcessingEnabled={true}
          />
        </Grid>
      </Grid>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Camera feed cards as they appear in the Live Streaming page grid layout.",
      },
    },
  },
};
