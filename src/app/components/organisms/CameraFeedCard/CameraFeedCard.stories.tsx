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
  },
};

export const LiveStreamingGrid: Story = {
  decorators: [
    () => (
      <Grid container spacing={3} sx={{ maxWidth: "1200px", p: 2 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <CameraFeedCard
            zone={{
              id: "zone-a",
              name: "Production Zone A",
              status: "LIVE",
              worker: "Worker #2",
            }}
            aiProcessingEnabled={true}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <CameraFeedCard
            zone={{
              id: "zone-b",
              name: "Warehouse Zone B",
              status: "LIVE",
              worker: "Worker #4",
            }}
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
