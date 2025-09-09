import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import VideoControlButton from "./VideoControlButton";

const meta = {
  title: "Components/Atoms/VideoControlButton",
  component: VideoControlButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Video control button component used in Live Streaming camera feeds. Supports various control types with consistent dark overlay styling.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: [
        "play",
        "pause",
        "stop",
        "volume-on",
        "volume-off",
        "fullscreen",
        "fullscreen-exit",
        "skip-next",
        "skip-previous",
      ],
      description: "Type of video control action",
    },
    onClick: {
      action: "clicked",
      description: "Callback fired when button is clicked",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the control button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    title: {
      control: "text",
      description: "Tooltip text for accessibility",
    },
  },
  args: {
    type: "play",
    onClick: () => {},
    size: "small",
    disabled: false,
    title: "Play video",
  },
} satisfies Meta<typeof VideoControlButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Simple stories
export const Play: Story = { args: { type: "play", title: "Play video" } };
export const Pause: Story = { args: { type: "pause", title: "Pause video" } };
export const VolumeOn: Story = { args: { type: "volume-on", title: "Mute" } };
export const VolumeOff: Story = {
  args: { type: "volume-off", title: "Unmute" },
};
export const Fullscreen: Story = {
  args: { type: "fullscreen", title: "Fullscreen" },
};
export const Disabled: Story = {
  args: { type: "play", disabled: true, title: "Video unavailable" },
};
export const MediumSize: Story = { args: { type: "play", size: "medium" } };
export const LargeSize: Story = { args: { type: "play", size: "large" } };

// Decorated group stories
export const ControlGroup: Story = {
  decorators: [
    () => (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          p: 2,
          backgroundColor: "#2c2c2c",
          borderRadius: 1,
        }}
      >
        <VideoControlButton type="play" onClick={() => {}} title="Play" />
        <VideoControlButton
          type="volume-off"
          onClick={() => {}}
          title="Unmute"
        />
        <VideoControlButton
          type="fullscreen"
          onClick={() => {}}
          title="Fullscreen"
        />
      </Box>
    ),
  ],
};

export const AllControls: Story = {
  decorators: [
    () => (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          p: 2,
          backgroundColor: "#2c2c2c",
          borderRadius: 1,
          maxWidth: "300px",
        }}
      >
        <VideoControlButton
          type="skip-previous"
          onClick={() => {}}
          title="Previous"
        />
        <VideoControlButton type="play" onClick={() => {}} title="Play" />
        <VideoControlButton type="pause" onClick={() => {}} title="Pause" />
        <VideoControlButton type="stop" onClick={() => {}} title="Stop" />
        <VideoControlButton type="skip-next" onClick={() => {}} title="Next" />
        <VideoControlButton type="volume-on" onClick={() => {}} title="Mute" />
        <VideoControlButton
          type="volume-off"
          onClick={() => {}}
          title="Unmute"
        />
        <VideoControlButton
          type="fullscreen"
          onClick={() => {}}
          title="Fullscreen"
        />
        <VideoControlButton
          type="fullscreen-exit"
          onClick={() => {}}
          title="Exit fullscreen"
        />
      </Box>
    ),
  ],
};
