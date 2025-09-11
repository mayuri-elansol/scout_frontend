import type { Meta, StoryObj } from "@storybook/react-vite";

import { Box } from "@mui/material";
import AiToggleSwitch from "./AiToggleSwitch";

const meta = {
  title: "Components/Atoms/AiToggleSwitch",
  component: AiToggleSwitch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "AI Processing toggle switch component used in Live Streaming page. Includes status chip and customizable styling for SCOUT analytics platform.",
      },
    },
  },
  argTypes: {
    enabled: {
      control: "boolean",
      description: "Whether AI processing is currently enabled",
    },
    onChange: {
      action: "toggled",
      description: "Callback fired when the toggle state changes",
    },
    label: {
      control: "text",
      description: "Label text displayed next to the toggle",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "Size of the toggle switch",
    },
    showChip: {
      control: "boolean",
      description: "Whether to show the status chip",
    },
  },
  args: {
    enabled: true,
    onChange: () => {},
    label: "AI Processing",
    size: "medium",
    showChip: true,
  },
} satisfies Meta<typeof AiToggleSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Enabled: Story = {
  args: {
    enabled: true,
  },
};

export const Disabled: Story = {
  args: {
    enabled: false,
  },
};

export const WithoutChip: Story = {
  args: {
    enabled: true,
    showChip: false,
  },
};

export const SmallSize: Story = {
  args: {
    enabled: true,
    size: "small",
  },
};

export const CustomLabel: Story = {
  args: {
    enabled: true,
    label: "ROI Detection",
  },
};

export const LiveStreamingContext: Story = {
  args: {
    enabled: true,
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          p: 3,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          minWidth: "400px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Story />
        </Box>
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "AI toggle switch as it appears in the Live Streaming page header.",
      },
    },
  },
};
