import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import Header from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/Organisms/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
**SCOUT Application Header**

Fixed header component used across all pages in the SCOUT application. Features:
- SCOUT branding and logo
- System status indicators
- Real-time timestamp
- Navigation elements
- Fixed positioning at top of screen

**Exactly matches the project UI** - This is the actual header component used in the dashboard with proper SCOUT branding and styling.
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default SCOUT header as it appears in the application with full branding and status indicators.",
      },
    },
  },
};

export const WithSidebarLayout: Story = {
  render: () => (
    <Box
      sx={{ position: "relative", height: "400px", backgroundColor: "#f5f7fa" }}
    >
      <Header />

      {/* Simulated sidebar space */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: "64px",
          width: "280px",
          height: "calc(100% - 64px)",
          backgroundColor: "#1e293b",
          border: "1px solid #e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        Sidebar Area
      </Box>

      {/* Simulated main content */}
      <Box
        sx={{
          position: "absolute",
          left: "296px",
          right: "16px",
          top: "64px",
          bottom: 0,
          backgroundColor: "white",
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#5c6b7d",
        }}
      >
        Main Content Area
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Header in the complete SCOUT layout showing how it works with sidebar and main content positioning.",
      },
    },
  },
};
