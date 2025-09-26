import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Grid, Typography } from "@mui/material";
import KpiCard from "./KpiCard";
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
    
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InteractiveSizing: StoryObj<typeof meta> = {
  args: {
    title: "PPE Compliance",
    value: "87.5%",
    
    icon: Shield,
    size: "medium",
    customWidth: 280,
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
            {args.customWidth || 280} x {160}px
          </Typography>
        )}

        <KpiCard {...args} />
      </Box>
    );
  },
};

// Individual Component Stories
export const Default: Story = {
  args: {
    title: "PPE Compliance",
    value: "87.5%",
   
    icon: Shield,
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

    icon: TrendingUp,

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

    icon: Visibility,
  
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
    icon: Security,
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

    icon: Place,
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

    icon: People,
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
  
            icon={Shield}
          />
        </Box>
        <Box>
          <KpiCard
            title="Fire Incidents"
            value="0"

            icon={LocalFireDepartment}
          />
        </Box>
        <Box>
          <KpiCard
            title="Security Breach"
            value="1"

            icon={Security}
          />
        </Box>
        <Box>
          <KpiCard
            title="Employees Present"
            value="234"
    
            icon={People}
          />
        </Box>
        <Box>
          <KpiCard
            title="Total People"
            value="267"
    
            icon={People}
          />
        </Box>
        <Box>
          <KpiCard
            title="Avg Speed (km/h)"
            value="15"

            icon={DirectionsCar}
          />
        </Box>
        <Box>
          <KpiCard
            title="Vehicles Tracked"
            value="45"
   
            icon={DirectionsCar}
          />
        </Box>
        <Box>
          <KpiCard
            title="Avg Work Hours"
            value="7.2"
    
            icon={Schedule}
          />
        </Box>
        <Box>
          <KpiCard
            title="Zone Occupancy"
            value="85%"
  
            icon={Place}
          />
        </Box>
        <Box>
          <KpiCard
            title="Crowd Alert"
            value="1"
     
            icon={People}
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
       
            icon={Shield}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            title="PPE Violations Per Day"
            value="12"
        
            icon={Warning}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            title="PPE Detection Accuracy"
            value="94.2%"
           
            icon={CheckCircle}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <KpiCard
            title="Time Since Last Violation"
            value="2h 34m"
            
            icon={Schedule}
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
            
            icon={TrendingUp}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Camera Uptime"
            value="94.2%"
            
            icon={Visibility}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="Security Alerts"
            value="5"
          
            icon={Security}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <KpiCard
            title="PPE Compliance"
            value="87.5%"
         
            icon={Shield}
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
