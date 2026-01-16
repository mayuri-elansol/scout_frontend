import type { Meta, StoryObj } from "@storybook/react-vite";
import LiveVideoPlayer from "./LiveVideoPlayer";

const meta: Meta<typeof LiveVideoPlayer> = {
  title: "Components/Molecules/LiveVideoPlayer",
  component: LiveVideoPlayer,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0f1216" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  argTypes: {
    isLive: {
      control: "boolean",
    },
    aiProcessingEnabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof LiveVideoPlayer>;

const cameras = [
  { id: "cam-1", name: "Entrance Camera" },
  { id: "cam-2", name: "Warehouse Camera" },
];

const useCases = [
  { id: "uc-1", name: "PPE Detection" },
  { id: "uc-2", name: "Intrusion Detection" },
];

export const NotLive: Story = {
  args: {
    isLive: false,
    selectedCamera: "cam-1",
    selectedUseCase: "uc-1",
    cameras,
    useCases,
    aiProcessingEnabled: false,
  },
};

export const LiveStreaming: Story = {
  args: {
    isLive: true,
    selectedCamera: "cam-1",
    selectedUseCase: "uc-1",
    cameras,
    useCases,
    aiProcessingEnabled: true,
  },
};

export const LiveWithoutAI: Story = {
  args: {
    isLive: true,
    selectedCamera: "cam-2",
    selectedUseCase: "uc-2",
    cameras,
    useCases,
    aiProcessingEnabled: false,
  },
};
