import type { Meta, StoryObj } from "@storybook/react-vite";
import Sidebar from "./Sidebar";
import type { PageType } from "../../../types";

// ✅ Create an alias that explicitly accepts the props used in stories
const SidebarWithProps = Sidebar as React.FC<{
  currentPage: PageType | string; // allow string to cover "safety-compliance-dashboard"
  onPageChange: (page: PageType) => void;
}>;

const meta: Meta<typeof SidebarWithProps> = {
  title: "Components/Organisms/Sidebar",
  component: SidebarWithProps,
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
        "safety-compliance-dashboard",
        "ppe-detection",
        "intrusion-detection",
        "employee-presence",
        "people-count",
        "live-streaming",
        "alerts",
      ] as const,
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
    currentPage: "safety-compliance-dashboard",
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