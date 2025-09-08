// import type { Meta, StoryObj } from '@storybook/react';
import type { Meta, StoryObj } from "@storybook/react-vite";

import LiveStreamingPage from "./LiveStreamingPage";

const meta = {
  title: "Components/Templates/LiveStreamingPage",
  component: LiveStreamingPage,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Complete Live Streaming page template with AI toggle, metrics grid, and camera feeds grid. Built using atomic design components: AiToggleSwitch, LiveMetricsGrid, and CameraFeedsGrid.",
      },
    },
  },
} satisfies Meta<typeof LiveStreamingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const FullPageView: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Complete Live Streaming page as it appears in the SCOUT application.",
      },
    },
  },
};
