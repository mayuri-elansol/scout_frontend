import type { Meta, StoryObj } from "@storybook/react-vite";
import Sidebar from "./Sidebar";
import type { PageType } from "../../../types";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Organisms/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "SCOUT Navigation Sidebar with collapsible analytics categories, dashboard navigation, and Elansol Technologies branding. Provides access to all analytics pages and system features.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: "select",
      options: [
        "dashboard",
        "ppe-detection",
        "intrusion-detection",
        "employee-presence",
        "people-count",
        "live-streaming",
        "alerts",
      ] as PageType[],
      description: "Currently active page",
    },
    onPageChange: {
      action: "page-changed",
      description: "Page change handler",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
  args: {
    currentPage: "dashboard",
    onPageChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Sidebar with Dashboard page selected.",
      },
    },
  },
};

export const PPEDetection: Story = {
  args: {
    currentPage: "ppe-detection",
    onPageChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Sidebar with PPE Detection analytics page selected.",
      },
    },
  },
};

export const IntrusionDetection: Story = {
  args: {
    currentPage: "intrusion-detection",
    onPageChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Sidebar with Intrusion Detection analytics page selected.",
      },
    },
  },
};

export const LiveStreaming: Story = {
  args: {
    currentPage: "live-streaming",
    onPageChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Sidebar with Live Streaming page selected.",
      },
    },
  },
};

export const Alerts: Story = {
  args: {
    currentPage: "alerts",
    onPageChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          "Sidebar with System Alerts page selected, showing notification badge.",
      },
    },
  },
};
