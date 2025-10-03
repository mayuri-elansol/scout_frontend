import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import CameraStatus from "./CameraStatus";

const meta: Meta<typeof CameraStatus> = {
  title: "Components/Organisms/CameraStatus",
  component: CameraStatus,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**SCOUT Camera Status by Zone**

This is the actual camera status component used in the SCOUT dashboard. It displays:
- Zone-based camera monitoring
- Active/total camera counts
- Status indicators (Excellent, Good, Warning)
- Color-coded status dots
- Real-time operational status

**Exactly matches the project UI** - This component appears in the main dashboard layout taking 35% width alongside the Activity Feed component.
        `,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#f5f7fa",
          p: 2,
          borderRadius: 1,
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default camera status as it appears in the SCOUT dashboard showing all zones with their operational status.",
      },
    },
  },
};

export const DashboardLayout: Story = {
  render: () => (
    <Box
      sx={{
        backgroundColor: "#f5f7fa",
        p: 3,
        borderRadius: 1,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        {/* Placeholder for Activity Feed - 60% width */}
        <Box
          sx={{
            flex: "1 1 60%",
            minWidth: "400px",
            backgroundColor: "white",
            borderRadius: 1,
            p: 3,
            border: "1px solid #e0e0e0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ textAlign: "center", color: "#5c6b7d" }}>
            <strong>Activity Feed Component</strong>
            <br />
            (60% width in dashboard)
          </Box>
        </Box>

        {/* Camera Status - 35% width as in dashboard */}
        <Box sx={{ flex: "1 1 35%", minWidth: "300px" }}>
          <CameraStatus cameraZones={[]} />
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Camera Status in dashboard layout showing the actual proportions used in the SCOUT application (35% width).",
      },
    },
  },
};

export const CriticalStatus: Story = {
  render: () => {
    // Override the component to show more critical camera statuses
    const CameraStatusCritical = () => {
      return (
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            border: "1px solid #e0e0e0",
            p: 3,
          }}
        >
          <Box
            sx={{
              color: "#1c2025",
              fontWeight: 600,
              fontSize: "16px",
              mb: 2.5,
            }}
          >
            Camera Status by Zone - Critical Issues
          </Box>

          <Box>
            {[
              {
                zone: "Production Floor",
                active: 6,
                total: 10,
                status: "warning",
              },
              {
                zone: "Chemical Plant",
                active: 2,
                total: 8,
                status: "warning",
              },
              { zone: "Main Entrance", active: 1, total: 3, status: "warning" },
              {
                zone: "Emergency Exits",
                active: 3,
                total: 6,
                status: "warning",
              },
              { zone: "Warehouse", active: 6, total: 6, status: "excellent" },
            ].map((zone, index) => {
              const getStatusColor = (status: string) => {
                switch (status) {
                  case "excellent":
                    return "#4caf50";
                  case "warning":
                    return "#ff9800";
                  default:
                    return "#9e9e9e";
                }
              };

              return (
                <Box
                  key={index + 1}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 2,
                    borderBottom: index < 4 ? "1px solid #f0f0f0" : "none",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        fontWeight: 500,
                        fontSize: "14px",
                        mb: 0.5,
                      }}
                    >
                      {zone.zone}
                    </Box>
                    <Box
                      sx={{
                        fontSize: "14px",
                        color: "#5c6b7d",
                      }}
                    >
                      {zone.active}/{zone.total} cameras active
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: getStatusColor(zone.status),
                      }}
                    />
                    <Box
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: getStatusColor(zone.status),
                        textTransform: "capitalize",
                      }}
                    >
                      {zone.status}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    };

    return <CameraStatusCritical />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "Camera status during critical period with multiple zones showing warning status due to camera outages.",
      },
    },
  },
};

export const AllOperational: Story = {
  render: () => {
    // Override the component to show all excellent status
    const CameraStatusOptimal = () => {
      return (
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            border: "1px solid #e0e0e0",
            p: 3,
          }}
        >
          <Box
            sx={{
              color: "#1c2025",
              fontWeight: 600,
              fontSize: "16px",
              mb: 2.5,
            }}
          >
            Camera Status by Zone - All Operational
          </Box>

          <Box>
            {[
              {
                zone: "Production Floor",
                active: 10,
                total: 10,
                status: "excellent",
              },
              { zone: "Warehouse", active: 6, total: 6, status: "excellent" },
              {
                zone: "Parking Area",
                active: 5,
                total: 5,
                status: "excellent",
              },
              {
                zone: "Main Entrance",
                active: 3,
                total: 3,
                status: "excellent",
              },
              {
                zone: "Assembly Line",
                active: 4,
                total: 4,
                status: "excellent",
              },
            ].map((zone, index) => (
              <Box
                key={index + 1}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2,
                  borderBottom: index < 4 ? "1px solid #f0f0f0" : "none",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      fontWeight: 500,
                      fontSize: "14px",
                      mb: 0.5,
                    }}
                  >
                    {zone.zone}
                  </Box>
                  <Box
                    sx={{
                      fontSize: "14px",
                      color: "#5c6b7d",
                    }}
                  >
                    {zone.active}/{zone.total} cameras active
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#4caf50",
                    }}
                  />
                  <Box
                    sx={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#4caf50",
                      textTransform: "capitalize",
                    }}
                  >
                    Excellent
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      );
    };

    return <CameraStatusOptimal />;
  },
  parameters: {
    docs: {
      description: {
        story:
          "Camera status when all zones are fully operational with excellent status.",
      },
    },
  },
};
