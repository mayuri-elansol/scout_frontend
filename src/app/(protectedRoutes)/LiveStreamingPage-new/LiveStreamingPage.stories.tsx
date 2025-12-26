import type { Meta, StoryObj } from "@storybook/nextjs";
import LiveStreamingPage from "./LiveStreamingPage";

const meta: Meta<typeof LiveStreamingPage> = {
  title: "Pages/LiveStreamingPage-New",
  component: LiveStreamingPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "New Live Streaming Page with single video feed and camera/use case selection controls.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveStreamingPage>;

export const Default: Story = {};

export const InitialState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Initial state showing the selection controls and placeholder video area.",
      },
    },
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story:
          "Mobile responsive layout with stacked controls and responsive video player.",
      },
    },
  },
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "Tablet responsive layout optimized for medium-sized screens.",
      },
    },
  },
};
