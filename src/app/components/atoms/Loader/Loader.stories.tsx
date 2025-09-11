import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Box } from "@mui/material";
import Loader from "./Loader";

const meta: Meta<typeof Loader> = {
  title: "Components/Atoms/Loader",
  component: Loader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
**SCOUT Loader Component**

A flexible loading spinner component for the SCOUT application.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "number", min: 20, max: 100, step: 10 } },
    message: { control: "text" },
    showMessage: { control: "boolean" },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "error",
        "info",
        "success",
        "warning",
        "inherit",
      ],
    },
    variant: { control: "select", options: ["indeterminate", "determinate"] },
    value: { control: { type: "number", min: 0, max: 100, step: 5 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutMessage: Story = {
  args: { showMessage: false },
};

export const CustomMessage: Story = {
  args: { message: "Processing SCOUT data..." },
};

export const SmallSize: Story = {
  args: { size: 24, message: "Loading" },
};

export const LargeSize: Story = {
  args: { size: 60, message: "Initializing SCOUT system..." },
};

export const DifferentColors: Story = {
  render: () => (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <Loader color="primary" message="Primary" size={32} />
      <Loader color="secondary" message="Secondary" size={32} />
      <Loader color="success" message="Success" size={32} />
      <Loader color="warning" message="Warning" size={32} />
      <Loader color="error" message="Error" size={32} />
      <Loader color="info" message="Info" size={32} />
    </Box>
  ),
};

export const DeterminateProgress: Story = {
  args: { variant: "determinate", value: 65, message: "Processing... 65%" },
};

export const FullPageLoader: Story = {
  render: () => (
    <Box
      sx={{
        width: "100%",
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f7fa",
        borderRadius: 2,
        border: "1px solid #e0e0e0",
      }}
    >
      <Loader size={50} message="Loading SCOUT Dashboard..." color="primary" />
    </Box>
  ),
};

export const InlineLoader: Story = {
  render: () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
      <span>Fetching alerts</span>
      <Loader size={20} showMessage={false} />
    </Box>
  ),
};
