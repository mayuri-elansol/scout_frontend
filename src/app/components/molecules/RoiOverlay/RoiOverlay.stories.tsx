// import type { Meta, StoryObj } from '@storybook/react';
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import { VideoCall } from "@mui/icons-material";
import RoiOverlay from "./RoiOverlay";

const meta = {
  title: "Components/Molecules/RoiOverlay",
  component: RoiOverlay,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Region of Interest (ROI) overlay component for AI-powered video analysis. Shows detection labels and bounding boxes over camera feeds.",
      },
    },
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          position: "relative",
          width: 320,
          height: 280,
          backgroundColor: "#2c2c2c",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Mock Video Feed Background */}
        <VideoCall sx={{ fontSize: 60, color: "#666" }} />
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    visible: {
      control: "boolean",
      description: "Whether the ROI overlay is visible",
    },
    detectionLabel: {
      control: "text",
      description: "Label for the detection type",
    },
    workerLabel: {
      control: "text",
      description: "Worker identifier label",
    },
    boxColor: {
      control: "color",
      description: "Color of the bounding box and chips",
    },
    boundingBox: {
      control: "object",
      description: "Position and size of the bounding box",
    },
  },
  args: {
    visible: true,
    detectionLabel: "ROI DETECTION",
    workerLabel: "Worker #2",
    boxColor: "#1976d2",
    boundingBox: {
      top: 60,
      left: 40,
      width: 120,
      height: 160,
    },
  },
} satisfies Meta<typeof RoiOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithoutWorker: Story = {
  args: {
    visible: true,
    detectionLabel: "ROI DETECTION",
    workerLabel: undefined,
  },
};

export const PPEDetection: Story = {
  args: {
    visible: true,
    detectionLabel: "PPE DETECTION",
    workerLabel: "Worker #4",
    boxColor: "#ff9800",
  },
};

export const IntrusionDetection: Story = {
  args: {
    visible: true,
    detectionLabel: "INTRUSION DETECTED",
    workerLabel: undefined,
    boxColor: "#f44336",
  },
};

export const CustomPosition: Story = {
  args: {
    visible: true,
    detectionLabel: "CUSTOM ROI",
    workerLabel: "Worker #1",
    boundingBox: {
      top: 80,
      left: 80,
      width: 160,
      height: 120,
    },
    boxColor: "#4caf50",
  },
};

export const MultipleBoxes: Story = {
  decorators: [
    () => (
      <Box
        sx={{
          position: "relative",
          width: 400,
          height: 300,
          backgroundColor: "#2c2c2c",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <VideoCall sx={{ fontSize: 60, color: "#666" }} />

        {/* First ROI */}
        <RoiOverlay
          visible={true}
          detectionLabel="ROI DETECTION"
          workerLabel="Worker #2"
          boundingBox={{ top: 40, left: 30, width: 100, height: 140 }}
          boxColor="#1976d2"
        />

        {/* Second ROI */}
        <RoiOverlay
          visible={true}
          detectionLabel="PPE DETECTION"
          boundingBox={{ top: 60, left: 200, width: 120, height: 160 }}
          boxColor="#ff9800"
        />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Multiple ROI overlays can be used on the same video feed for different detection types.",
      },
    },
  },
};

export const Hidden: Story = {
  args: {
    visible: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Overlay hidden when AI processing is disabled.",
      },
    },
  },
};
