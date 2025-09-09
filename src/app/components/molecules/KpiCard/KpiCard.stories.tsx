// import type { Meta, StoryObj } from '@storybook/react';
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Grid, Typography } from "@mui/material";
import KpiCard, { KpiCardProps } from "./KpiCard";
import {
  Shield,
  Visibility,
  Security,
  People,
  TrendingUp,
  Warning,
  LocalFireDepartment,
  DirectionsCar,
  Schedule,
  Place,
  CheckCircle,
} from "@mui/icons-material";

const meta: Meta<typeof KpiCard> = {
  title: "Components/Molecules/KpiCard",
  component: KpiCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**SCOUT KPI Card Component**

Enhanced KPI metric display cards used extensively throughout the SCOUT platform for real-time analytics. 
Features color-coded variants, interactive hover effects, and responsive sizing for different dashboard layouts.

**Usage Contexts:**
- Dashboard Grid: 5-column layout (20% width each) with 10 primary metrics
- Analytics Pages: 4-column responsive grid for specialized KPIs
- Status Displays: Single cards for specific metric highlighting

**Key Features:**
- 4 variant types (default, success, info, critical) with theme-based styling
- 3 size options (small, medium, large) for different contexts
- Trend indicators with color-coded chips
- Hover animations and interactive feedback
- Consistent SCOUT branding and typography
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "info", "critical"],
      description: "Card variant for different metric types and alert levels",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Card size - medium is standard for most dashboards",
    },
    title: {
      control: "text",
      description: "Primary metric title/label",
    },
    value: {
      control: "text",
      description: "Main metric value display",
    },
    subtitle: {
      control: "text",
      description: "Additional context or description",
    },
    trend: {
      control: "text",
      description: "Trend indicator (percentage, status, or count)",
    },
    trendColor: {
      control: "color",
      description: "Color for trend indicator chip",
    },
    customWidth: {
      control: { type: "range", min: 200, max: 600, step: 10 },
      description: "Custom card width (px) - overrides size preset",
      table: {
        category: "Layout Controls",
      },
    },
    customHeight: {
      control: { type: "range", min: 120, max: 400, step: 10 },
      description: "Custom card height (px) - overrides size preset",
      table: {
        category: "Layout Controls",
      },
    }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive Sizing Controls - Main Feature
type InteractiveSizingArgs = KpiCardProps & {
  containerPadding?: number;
  showContainer?: boolean;
};;

export const InteractiveSizing: StoryObj<typeof meta> = {
  args: {
    title: "PPE Compliance",
    value: "87.5%",
    subtitle: "3 violations in last hour",
    trend: "-2.3%",
    trendColor: "#f44336",
    color: "#ff9800",
    bgColor: "#fff8e1",
    icon: Shield,
    variant: "default",
    size: "medium",
    customWidth: 280,
    customHeight: 160,
  },
  render: (args) => {
    // Storybook-only props
    const containerPadding = 16;
    const showContainer = true;

    return (
      <Box
        sx={{
          width: args.customWidth
            ? `${args.customWidth + containerPadding * 2}px`
            : "320px",
          backgroundColor: showContainer ? "#f5f7fa" : "transparent",
          padding: `${containerPadding}px`,
          borderRadius: 1,
          border: showContainer ? "1px dashed #ddd" : "none",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {showContainer && (
          <Typography
            sx={{
              position: "absolute",
              top: 4,
              left: 8,
              fontSize: "10px",
              color: "#666",
              backgroundColor: "rgba(255,255,255,0.8)",
              px: 0.5,
              borderRadius: 0.5,
              zIndex: 10,
            }}
          >
            {args.customWidth || 280} x {args.customHeight || 160}px
          </Typography>
        )}

        <KpiCard
          {...args}
        />
      </Box>
    );
  },
};


// Individual Component Stories
export const Default: Story = {
  args: {
    title: "PPE Compliance",
    value: "87.5%",
    subtitle: "3 violations in last hour",
    trend: "-2.3%",
    trendColor: "#f44336",
    color: "#ff9800",
    bgColor: "#fff8e1",
    icon: Shield,
    variant: "default",
    size: "medium",
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: "280px",
          backgroundColor: "#f5f7fa",
          p: 2,
          borderRadius: 1,
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
          "Default KPI card variant used for standard metrics like compliance rates and operational data.",
      },
    },
  },
};

export const Success: Story = {
  args: {
    title: "System Health",
    value: "98.5%",
    subtitle: "All systems operational",
    trend: "+2.3%",
    trendColor: "#4caf50",
    color: "#2e7d32",
    bgColor: "#e8f5e9",
    icon: TrendingUp,
    variant: "success",
    size: "medium",
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: "280px",
          backgroundColor: "#f5f7fa",
          p: 2,
          borderRadius: 1,
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
          "Success variant for positive metrics and achievements, using green color scheme.",
      },
    },
  },
};

export const Info: Story = {
  args: {
    title: "Camera Uptime",
    value: "94.2%",
    subtitle: "2 cameras offline",
    trend: "-1.2%",
    trendColor: "#ff9800",
    color: "#1565c0",
    bgColor: "#e3f2fd",
    icon: Visibility,
    variant: "info",
    size: "medium",
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: "280px",
          backgroundColor: "#f5f7fa",
          p: 2,
          borderRadius: 1,
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
          "Info variant for informational metrics and status updates, using blue color scheme.",
      },
    },
  },
};

export const Critical: Story = {
  args: {
    title: "Security Alerts",
    value: "5",
    subtitle: "Immediate attention required",
    trend: "+150%",
    trendColor: "#f44336",
    color: "#c62828",
    bgColor: "#ffebee",
    icon: Security,
    variant: "critical",
    size: "medium",
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: "280px",
          backgroundColor: "#f5f7fa",
          p: 2,
          borderRadius: 1,
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
          "Critical variant for urgent alerts and high-priority metrics, using red color scheme.",
      },
    },
  },
};

// Size Variants
export const SmallSize: Story = {
  args: {
    title: "Zone Status",
    value: "4/5",
    subtitle: "Active zones",
    trend: "Normal",
    trendColor: "#4caf50",
    color: "#1976d2",
    bgColor: "#e3f2fd",
    icon: Place,
    size: "small",
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: "200px",
          backgroundColor: "#f5f7fa",
          p: 2,
          borderRadius: 1,
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
          "Small size variant for compact layouts, sidebars, or secondary metrics.",
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    title: "Total Employees",
    value: "1,247",
    subtitle: "Current facility capacity at 78%",
    trend: "+5.2%",
    trendColor: "#4caf50",
    color: "#1976d2",
    bgColor: "#e3f2fd",
    icon: People,
    size: "large",
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: "380px",
          backgroundColor: "#f5f7fa",
          p: 2,
          borderRadius: 1,
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
          "Large size variant for prominent display of key metrics and executive dashboards.",
      },
    },
  },
};

// Dashboard Layout
export const DashboardLayout: Story = {
  render: () => (
    <Box
      sx={{
        backgroundColor: "#f5f7fa",
        p: 3,
        borderRadius: 1,
      }}
    >
      <Typography
        sx={{ mb: 2, color: "#5c6b7d", fontSize: "14px", fontWeight: 500 }}
      >
        Main Dashboard Layout - 5 Column Grid (20% width each)
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2.5,
          "& > div": {
            width: "calc(20% - 16px)",
            minWidth: "200px",
          },
        }}
      >
        <Box>
          <KpiCard
            title="PPE Compliance"
            value="87.5%"
            subtitle="3 violations in last hour"
            trend="-2.3%"
            trendColor="#f44336"
            color="#ff9800"
            bgColor="#fff8e1"
            icon={Shield}
          />
        </Box>
        <Box>
          <KpiCard
            title="Fire Incidents"
            value="0"
            subtitle="All systems operational"
            trend="Clear"
            trendColor="#4caf50"
            color="#4caf50"
            bgColor="#e8f5e9"
            icon={LocalFireDepartment}
            variant="success"
          />
        </Box>
        <Box>
          <KpiCard
            title="Security Breach"
            value="1"
            subtitle="Gate 3 unauthorized access"
            trend="Active"
            trendColor="#f44336"
            color="#f44336"
            bgColor="#ffebee"
            icon={Security}
            variant="critical"
          />
        </Box>
        <Box>
          <KpiCard
            title="Employees Present"
            value="234"
            subtitle="98.3% attendance rate"
            trend="+5.2%"
            trendColor="#4caf50"
            color="#4caf50"
            bgColor="#e8f5e9"
            icon={People}
            variant="success"
          />
        </Box>
        <Box>
          <KpiCard
            title="Total People"
            value="267"
            subtitle="Including 33 visitors"
            trend="+12"
            trendColor="#2196f3"
            color="#2196f3"
            bgColor="#e3f2fd"
            icon={People}
            variant="info"
          />
        </Box>
        <Box>
          <KpiCard
            title="Avg Speed (km/h)"
            value="15"
            subtitle="2 speed violations"
            trend="2 alerts"
            trendColor="#ff9800"
            color="#ff9800"
            bgColor="#fff8e1"
            icon={DirectionsCar}
          />
        </Box>
        <Box>
          <KpiCard
            title="Vehicles Tracked"
            value="45"
            subtitle="License plates recognized"
            trend="99.1%"
            trendColor="#4caf50"
            color="#4caf50"
            bgColor="#e8f5e9"
            icon={DirectionsCar}
            variant="success"
          />
        </Box>
        <Box>
          <KpiCard
            title="Avg Work Hours"
            value="7.2"
            subtitle="89% efficiency rate"
            trend="+1.8%"
            trendColor="#2196f3"
            color="#2196f3"
            bgColor="#e3f2fd"
            icon={Schedule}
            variant="info"
          />
        </Box>
        <Box>
          <KpiCard
            title="Zone Occupancy"
            value="85%"
            subtitle="Within safe limits"
            trend="Normal"
            trendColor="#4caf50"
            color="#4caf50"
            bgColor="#e8f5e9"
            icon={Place}
            variant="success"
          />
        </Box>
        <Box>
          <KpiCard
            title="Crowd Alert"
            value="1"
            subtitle="Cafeteria overcrowding"
            trend="1 alert"
            trendColor="#f44336"
            color="#f44336"
            bgColor="#ffebee"
            icon={People}
            variant="critical"
          />
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Complete dashboard layout showing all 10 KPI cards as they appear on the main SCOUT dashboard.",
      },
    },
  },
};

// Analytics Page Layout
export const AnalyticsPageLayout: Story = {
  render: () => (
    <Box sx={{ backgroundColor: "#f5f7fa", p: 3, borderRadius: 1 }}>
      <Typography
        sx={{ mb: 2, color: "#5c6b7d", fontSize: "14px", fontWeight: 500 }}
      >
        Analytics Page Layout - 4 Column Responsive Grid
      </Typography>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            title="PPE Compliance Rate"
            value="87.5%"
            subtitle="Current compliance level"
            trend="-2.3%"
            trendColor="#ff9800"
            color="#ff9800"
            bgColor="#fff8e1"
            icon={Shield}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            title="PPE Violations Per Day"
            value="12"
            subtitle="Today's violations"
            trend="+3"
            trendColor="#f44336"
            color="#f44336"
            bgColor="#ffebee"
            icon={Warning}
            variant="critical"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            title="PPE Detection Accuracy"
            value="94.2%"
            subtitle="System accuracy rate"
            trend="+1.1%"
            trendColor="#4caf50"
            color="#4caf50"
            bgColor="#e8f5e9"
            icon={CheckCircle}
            variant="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            title="Time Since Last Violation"
            value="2h 34m"
            subtitle="Last incident recorded"
            trend="Recent"
            trendColor="#2196f3"
            color="#2196f3"
            bgColor="#e3f2fd"
            icon={Schedule}
            variant="info"
          />
        </Grid>
      </Grid>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Analytics page layout showing PPE Detection KPIs in a responsive 4-column grid.",
      },
    },
  },
};

// Variant Comparison
export const AllVariantsComparison: Story = {
  render: () => (
    <Box sx={{ backgroundColor: "#f5f7fa", p: 3, borderRadius: 1 }}>
      <Typography
        sx={{ mb: 2, color: "#5c6b7d", fontSize: "14px", fontWeight: 500 }}
      >
        All Variants - Complete styling comparison
      </Typography>
      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="System Health"
            value="98.5%"
            subtitle="All systems operational"
            trend="+2.3%"
            trendColor="#4caf50"
            color="#2e7d32"
            bgColor="#e8f5e9"
            icon={TrendingUp}
            variant="success"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Camera Uptime"
            value="94.2%"
            subtitle="2 cameras offline"
            trend="-1.2%"
            trendColor="#ff9800"
            color="#1565c0"
            bgColor="#e3f2fd"
            icon={Visibility}
            variant="info"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Security Alerts"
            value="5"
            subtitle="Immediate attention required"
            trend="+150%"
            trendColor="#f44336"
            color="#c62828"
            bgColor="#ffebee"
            icon={Security}
            variant="critical"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="PPE Compliance"
            value="87.5%"
            subtitle="3 violations in last hour"
            trend="-2.3%"
            trendColor="#f44336"
            color="#ff9800"
            bgColor="#fff8e1"
            icon={Shield}
            variant="default"
          />
        </Grid>
      </Grid>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Side-by-side comparison of all KPI card variants with their distinctive color schemes.",
      },
    },
  },
};
