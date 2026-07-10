import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Grid } from "@mui/material";
import AlertStatsCard from "./AlertStatsCard";

// ✅ Create an alias with the correct prop types
const Card = AlertStatsCard as React.FC<{
  value: string | number;
  label: string;
  color?: string;
  borderColor?: string;
}>;

const meta: Meta<typeof Card> = {
  title: "Components/Molecules/AlertStatsCard",
  component: Card, // use the alias here
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**SCOUT Alert Statistics Card**

Displays alert statistics with color-coded indicators used in the System Alerts page. Features:
- Color-coded borders and values
- Hover effects
- Flexible sizing options
- Used for showing alert counts by priority/status

**Project Usage**: Used in the Alerts page to display alert statistics (Total, Active, Critical, High, Medium, Low priority alerts).
        `,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box
        sx={{
          backgroundColor: "#f5f7fa",
          p: 2,
          borderRadius: 1,
          maxWidth: "200px",
        }}
      >
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    value: {
      control: "text",
      description: "The statistic value to display",
    },
    label: {
      control: "text",
      description: "The label describing the statistic",
    },
    color: {
      control: "color",
      description: "Optional colour for the value (and border if borderColor not set)",
    },
    borderColor: {
      control: "color",
      description: "Optional border colour (defaults to color)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TotalAlerts: Story = {
  args: {
    value: "10",
    label: "Total Alerts",
  },
  parameters: {
    docs: {
      description: {
        story: "Total alerts count card as it appears in the Alerts page.",
      },
    },
  },
};

export const ActiveAlerts: Story = {
  args: {
    value: "2",
    label: "Active Alerts",
    color: "#f44336",
    borderColor: "#f44336",
  },
  parameters: {
    docs: {
      description: {
        story: "Active alerts count with red color coding.",
      },
    },
  },
};

export const CriticalAlerts: Story = {
  args: {
    value: "2",
    label: "Critical",
    color: "#d32f2f",
    borderColor: "#d32f2f",
  },
  parameters: {
    docs: {
      description: {
        story: "Critical priority alerts count.",
      },
    },
  },
};

export const HighPriorityAlerts: Story = {
  args: {
    value: "3",
    label: "High Priority",
    color: "#ed6c02",
    borderColor: "#ed6c02",
  },
  parameters: {
    docs: {
      description: {
        story: "High priority alerts count with orange color.",
      },
    },
  },
};

export const AlertsGrid: Story = {
  render: () => {
    // Use the alias inside the render
    return (
      <Box
        sx={{
          backgroundColor: "#f5f7fa",
          p: 3,
          borderRadius: 1,
          width: "100%",
          minWidth: "1200px",
        }}
      >
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid size={{ xs: 2 }}>
            <Card value="10" label="Total Alerts" />
          </Grid>
          <Grid size={{ xs: 2 }}>
            <Card value="2" label="Active Alerts" color="#f44336" borderColor="#f44336" />
          </Grid>
          <Grid size={{ xs: 2 }}>
            <Card value="2" label="Critical" color="#d32f2f" borderColor="#d32f2f" />
          </Grid>
          <Grid size={{ xs: 2 }}>
            <Card value="3" label="High Priority" color="#ed6c02" borderColor="#ed6c02" />
          </Grid>
          <Grid size={{ xs: 2 }}>
            <Card value="3" label="Medium" color="#f9a825" borderColor="#f9a825" />
          </Grid>
          <Grid size={{ xs: 2 }}>
            <Card value="2" label="Low Priority" color="#9e9e9e" borderColor="#9e9e9e" />
          </Grid>
        </Grid>
      </Box>
    );
  },
  decorators: [],
  parameters: {
    docs: {
      description: {
        story:
          "Complete alert statistics grid as it appears in the SCOUT Alerts page.",
      },
    },
  },
};

export const SizeVariants: Story = {
  render: () => {
    return (
      <Box
        sx={{
          backgroundColor: "#f5f7fa",
          p: 3,
          borderRadius: 1,
          width: "100%",
          minWidth: "600px",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 4 }}>
            <Card value="5" label="Small" />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Card value="10" label="Medium" />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <Card value="15" label="Large" />
          </Grid>
        </Grid>
      </Box>
    );
  },
  decorators: [],
  parameters: {
    docs: {
      description: {
        story: "Different size variants of the alert stats card.",
      },
    },
  },
};