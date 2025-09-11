import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import { VideoCall } from "@mui/icons-material";
import VideoControlPanel from "./VideoControlPanel";
import VideoControlButton from "../../atoms/VideoControlButton/VideoControlButton";

const meta = {
  title: "Components/Molecules/VideoControlPanel",
  component: VideoControlPanel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Video control panel component that groups video control buttons. Used in Live Streaming camera feeds with various positioning options.",
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
    isPlaying: {
      control: "boolean",
      description: "Whether video is currently playing",
    },
    isMuted: {
      control: "boolean",
      description: "Whether audio is muted",
    },
    isFullscreen: {
      control: "boolean",
      description: "Whether video is in fullscreen mode",
    },
    onPlayPause: {
      action: "play-pause",
      description: "Callback for play/pause button",
    },
    onMuteToggle: {
      action: "mute-toggle",
      description: "Callback for mute/unmute button",
    },
    onFullscreenToggle: {
      action: "fullscreen-toggle",
      description: "Callback for fullscreen toggle button",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the control buttons",
    },
    position: {
      control: "select",
      options: ["bottom-left", "bottom-center", "bottom-right", "center"],
      description: "Position of the control panel",
    },
  },
  args: {
    isPlaying: false,
    isMuted: true,
    isFullscreen: false,
    onPlayPause: () => {},
    onMuteToggle: () => {},
    onFullscreenToggle: () => {},
    size: "small",
    position: "bottom-left",
  },
} satisfies Meta<typeof VideoControlPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Playing: Story = {
  args: {
    isPlaying: true,
    isMuted: false,
  },
};

export const BottomCenter: Story = {
  args: {
    position: "bottom-center",
  },
};

export const BottomRight: Story = {
  args: {
    position: "bottom-right",
  },
};

export const Center: Story = {
  args: {
    position: "center",
    size: "medium",
  },
};

export const MediumSize: Story = {
  args: {
    size: "medium",
    isPlaying: true,
  },
};

export const LargeSize: Story = {
  args: {
    size: "large",
    position: "center",
  },
};

export const Fullscreen: Story = {
  args: {
    isFullscreen: true,
    isPlaying: true,
    isMuted: false,
  },
};

export const LiveFeedExample: Story = {
  args: {
    isPlaying: false,
    isMuted: true,
    position: "bottom-left",
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

        {/* Fullscreen button in bottom right */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            right: 12,
          }}
        >
          <VideoControlButton
            type="fullscreen"
            onClick={() => {}}
            size="small"
            title="Enter fullscreen"
          />
        </Box>

        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Video control panel as used in Live Streaming camera feeds, with additional fullscreen button positioned separately.",
      },
    },
  },
};
