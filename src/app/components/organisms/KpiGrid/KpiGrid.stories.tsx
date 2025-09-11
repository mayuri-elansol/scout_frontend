import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import {
  Shield,
  Warning,
  Visibility,
  People,
  DirectionsCar,
  Schedule,
  Place,
} from "@mui/icons-material";
import KpiGrid from "./KpiGrid";

const meta: Meta<typeof KpiGrid> = {
  title: "Components/Organisms/KpiGrid",
  component: KpiGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**SCOUT KPI Grid Layout**

Grid layout component for organizing KPI cards in the dashboard. This component provides:
- Responsive grid layout for KPI cards
- Configurable column counts per breakpoint
- Consistent spacing and alignment
- Alternative to flex layout for KPI cards

**Project Usage**: While the main dashboard uses flex layout, this component provides a grid-based alternative for organizing the 10 KPI cards.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: "object",
      description: "Responsive column configuration",
    },
    spacing: {
      control: "number",
      description: "Grid spacing",
    },
    maxWidth: {
      control: "text",
      description: "Maximum width of grid container",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const dashboardKpiData = [
  {
    title: "PPE Compliance",
    value: "87.5%",
    subtitle: "3 violations in last hour",
    trend: "-2.3%",
    trendColor: "#f44336",
    color: "#ff9800",
    bgColor: "#fff8e1",
    icon: Shield,
  },
  {
    title: "Fire Incidents",
    value: "0",
    subtitle: "All systems operational",
    trend: "Clear",
    trendColor: "#4caf50",
    color: "#4caf50",
    bgColor: "#e8f5e9",
    icon: Warning,
  },
  {
    title: "Security Breach",
    value: "1",
    subtitle: "Gate 3 unauthorized access",
    trend: "Active",
    trendColor: "#f44336",
    color: "#f44336",
    bgColor: "#ffebee",
    icon: Visibility,
  },
  {
    title: "Employees Present",
    value: "234",
    subtitle: "98.3% attendance rate",
    trend: "+5.2%",
    trendColor: "#4caf50",
    color: "#4caf50",
    bgColor: "#e8f5e9",
    icon: People,
  },
  {
    title: "Total People",
    value: "267",
    subtitle: "Including 33 visitors",
    trend: "+12",
    trendColor: "#2196f3",
    color: "#2196f3",
    bgColor: "#e3f2fd",
    icon: People,
  },
  {
    title: "Avg Speed (km/h)",
    value: "15",
    subtitle: "2 speed violations",
    trend: "2 alerts",
    trendColor: "#ff9800",
    color: "#ff9800",
    bgColor: "#fff8e1",
    icon: DirectionsCar,
  },
  {
    title: "Vehicles Tracked",
    value: "45",
    subtitle: "License plates recognized",
    trend: "99.1%",
    trendColor: "#4caf50",
    color: "#4caf50",
    bgColor: "#e8f5e9",
    icon: DirectionsCar,
  },
  {
    title: "Avg Work Hours",
    value: "7.2",
    subtitle: "89% efficiency rate",
    trend: "+1.8%",
    trendColor: "#2196f3",
    color: "#2196f3",
    bgColor: "#e3f2fd",
    icon: Schedule,
  },
  {
    title: "Zone Occupancy",
    value: "85%",
    subtitle: "Within safe limits",
    trend: "Normal",
    trendColor: "#4caf50",
    color: "#4caf50",
    bgColor: "#e8f5e9",
    icon: Place,
  },
  {
    title: "Crowd Alert",
    value: "1",
    subtitle: "Cafeteria overcrowding",
    trend: "1 alert",
    trendColor: "#f44336",
    color: "#f44336",
    bgColor: "#ffebee",
    icon: People,
  },
];

export const DashboardLayout: Story = {
  args: {
    kpis: dashboardKpiData,
    columns: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 3,
      xl: 2.4, // 5 cards per row
    },
    spacing: 2.5,
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          backgroundColor: "#f5f7fa",
          p: 3,
          borderRadius: 1,
          width: "100%",
        }}
      >
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Complete dashboard KPI grid with all 10 cards as they appear in the SCOUT dashboard (5 cards per row).",
      },
    },
  },
};

export const CompactGrid: Story = {
  args: {
    kpis: dashboardKpiData.slice(0, 6),
    columns: {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 4,
      xl: 4,
    },
    spacing: 2,
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          backgroundColor: "#f5f7fa",
          p: 2,
          borderRadius: 1,
          maxWidth: "1200px",
        }}
      >
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Compact grid layout with 6 KPI cards arranged in 3 columns.",
      },
    },
  },
};

export const HighDensity: Story = {
  args: {
    kpis: dashboardKpiData,
    columns: {
      xs: 12,
      sm: 6,
      md: 3,
      lg: 2.4,
      xl: 2,
    },
    spacing: 1.5,
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          backgroundColor: "#f5f7fa",
          p: 2,
          borderRadius: 1,
          width: "100%",
        }}
      >
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "High-density grid layout with smaller spacing and more columns for compact displays.",
      },
    },
  },
};

export const CriticalMetrics: Story = {
  args: {
    kpis: [
      {
        title: "PPE Compliance",
        value: "72.1%",
        subtitle: "8 violations in last hour",
        trend: "-15.4%",
        trendColor: "#f44336",
        color: "#f44336",
        bgColor: "#ffebee",
        icon: Shield,
      },
      {
        title: "Security Breach",
        value: "3",
        subtitle: "Multiple access attempts",
        trend: "+200%",
        trendColor: "#f44336",
        color: "#f44336",
        bgColor: "#ffebee",
        icon: Visibility,
      },
      {
        title: "Fire Incidents",
        value: "1",
        subtitle: "Smoke detected Zone C",
        trend: "Active",
        trendColor: "#f44336",
        color: "#f44336",
        bgColor: "#ffebee",
        icon: Warning,
      },
      {
        title: "Crowd Alert",
        value: "4",
        subtitle: "Emergency exits blocked",
        trend: "+300%",
        trendColor: "#f44336",
        color: "#f44336",
        bgColor: "#ffebee",
        icon: People,
      },
    ],
    columns: {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 3,
      xl: 3,
    },
    spacing: 3,
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          backgroundColor: "#f5f7fa",
          p: 3,
          borderRadius: 1,
          maxWidth: "1000px",
        }}
      >
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Critical metrics view showing emergency situations with high-priority alerts.",
      },
    },
  },
};
