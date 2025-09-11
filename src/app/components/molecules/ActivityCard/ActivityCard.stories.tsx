import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

const meta: Meta<typeof ActivityCard> = {
  title: "Components/Molecules/ActivityCard",
  component: ActivityCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**SCOUT Activity Card Component**

Unified card component for displaying various types of activity information including:
- Employee tracking and monitoring
- PPE violation alerts
- Security breach notifications  
- Personnel tracking updates

Each card type has specific styling, status indicators, and action buttons appropriate to its context.

**Note**: Cards are fixed at 320px width to match the actual SCOUT application layout.
        `,
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Box
        sx={{
          width: "320px",
          backgroundColor: "#f5f7fa",
          p: 2,
          borderRadius: 1,
          // Ensure the story container doesn't expand beyond 320px
          maxWidth: "320px",
          minWidth: "320px",
        }}
      >
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    cardType: {
      control: "select",
      options: [
        "employee",
        "ppe_violation",
        "security_breach",
        "personnel_tracking",
      ],
      description: "Type of activity card",
    },
    title: {
      control: "text",
      description: "Main title/name for the card",
    },
    location: {
      control: "text",
      description: "Location where activity occurred",
    },
    status: {
      control: "select",
      options: ["active", "inactive", "break", "offline", "missing"],
      description: "Current status (for employee cards)",
    },
    priority: {
      control: "select",
      options: ["critical", "high", "medium", "low"],
      description: "Priority level (for alert cards)",
    },
    alertStatus: {
      control: "select",
      options: [
        "active",
        "acknowledged",
        "resolved",
        "investigating",
        "escalated",
      ],
      description: "Alert status (for alert cards)",
    },
    showLiveFeed: {
      control: "boolean",
      description: "Show live feed preview section",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Employee Cards (First Image)
export const EmployeeActive: Story = {
  args: {
    //  id: "emp-001",
    cardType: "employee",
    title: "John Mitchell",
    employeeName: "John Mitchell",
    employeeId: "EMP-4521",
    position: "Level 3 Operator",
    location: "Reactor Control Room",
    shift: "Day Shift",
    status: "active",
    showLiveFeed: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Employee activity card showing active status with live feed preview.",
      },
    },
  },
};

export const EmployeeOnBreak: Story = {
  args: {
    //  id: "emp-002",
    cardType: "employee",
    title: "Sarah Chen",
    employeeName: "Sarah Chen",
    employeeId: "EMP-3847",
    position: "Senior Technician",
    location: "Chemical Processing Unit",
    shift: "Day Shift",
    status: "break",
    showLiveFeed: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Employee on break with orange status indicator.",
      },
    },
  },
};

export const EmployeeMissing: Story = {
  args: {
    // id: "emp-004",
    cardType: "employee",
    title: "Lisa Anderson",
    employeeName: "Lisa Anderson",
    employeeId: "EMP-7891",
    position: "Lab Supervisor",
    location: "Quality Control Lab",
    shift: "Day Shift",
    status: "missing",
    liveFeedStatus: "offline",
    lastSeen: "2024-01-15T14:30:00",
    showLiveFeed: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Employee marked as missing with red status indicator and last seen timestamp.",
      },
    },
  },
};

export const EmployeeLoadingFeed: Story = {
  args: {
    //  id: "emp-005",
    cardType: "employee",
    title: "Michael Torres",
    employeeName: "Michael Torres",
    employeeId: "EMP-5623",
    position: "Safety Coordinator",
    location: "Emergency Response Station",
    shift: "Day Shift",
    status: "active",
    liveFeedStatus: "loading",
    showLiveFeed: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Employee card with loading feed animation and enhanced visual feedback.",
      },
    },
  },
};

// PPE Violation Cards (Second Image)
export const PPEViolationHigh: Story = {
  args: {
    //  id: "ppe-001",
    cardType: "ppe_violation",
    title: "Hard hat missing",
    location: "Production Zone A",
    timestamp: "14:32",
    workerId: "W-4521",
    priority: "high",
    alertStatus: "active",
    showLiveFeed: true,
    previewText: "Violation Image Preview",
  },
  parameters: {
    docs: {
      description: {
        story: "PPE violation alert for missing hard hat with high priority.",
      },
    },
  },
};

export const PPEViolationMedium: Story = {
  args: {
    //  id: "ppe-002",
    cardType: "ppe_violation",
    title: "Safety vest not worn",
    location: "Warehouse Zone B",
    timestamp: "14:18",
    workerId: "W-3847",
    priority: "medium",
    alertStatus: "acknowledged",
    showLiveFeed: true,
    previewText: "Violation Image Preview",
  },
  parameters: {
    docs: {
      description: {
        story:
          "PPE violation for missing safety vest with medium priority, already acknowledged.",
      },
    },
  },
};

// Security Breach Cards (Third Image)
export const SecurityBreachCritical: Story = {
  args: {
    //  id: "sec-001",
    cardType: "security_breach",
    title: "Unauthorized person at main gate",
    location: "Main Entrance Perimeter - Camera 1",
    timestamp: "15:42",
    intruderId: "UNKNOWN-001",
    priority: "critical",
    alertStatus: "active",
    showLiveFeed: true,
    previewText: "Intrusion Evidence",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Critical security breach alert for unauthorized access at main gate.",
      },
    },
  },
};

export const SecurityBreachResolved: Story = {
  args: {
    //  id: "sec-003",
    cardType: "security_breach",
    title: "Suspicious activity near warehouse",
    location: "Warehouse Perimeter - Camera 12",
    timestamp: "15:15",
    intruderId: "UNKNOWN-003",
    priority: "high",
    alertStatus: "resolved",
    showLiveFeed: true,
    previewText: "Intrusion Evidence",
  },
  parameters: {
    docs: {
      description: {
        story: "Security breach alert that has been resolved.",
      },
    },
  },
};

export const SecurityBreachEscalated: Story = {
  args: {
    //  id: "sec-004",
    cardType: "security_breach",
    title: "Multiple persons at restricted zone",
    location: "North Security Zone - Camera 15",
    timestamp: "14:58",
    intruderId: "UNKNOWN-004",
    priority: "critical",
    alertStatus: "escalated",
    showLiveFeed: true,
    previewText: "Intrusion Evidence",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Critical security breach that has been escalated to higher authorities.",
      },
    },
  },
};

// Layout Examples - Matching Project Grid with proper sizing
export const EmployeeGrid: Story = {
  render: () => (
    <Box
      sx={{
        backgroundColor: "#f5f7fa",
        p: 3,
        borderRadius: 1,
        // Use fixed container width to match project layout
        width: "fit-content",
        maxWidth: "680px", // 2 cards * 320px + gap
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 320px)",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <ActivityCard
          //  id="emp-001"
          cardType="employee"
          title="John Mitchell"
          employeeName="John Mitchell"
          employeeId="EMP-4521"
          position="Level 3 Operator"
          location="Reactor Control Room"
          shift="Day Shift"
          status="active"
          showLiveFeed={true}
        />
        <ActivityCard
          //  id="emp-002"
          cardType="employee"
          title="Sarah Chen"
          employeeName="Sarah Chen"
          employeeId="EMP-3847"
          position="Senior Technician"
          location="Chemical Processing Unit"
          shift="Day Shift"
          status="break"
          showLiveFeed={true}
        />
        <ActivityCard
          //  id="emp-003"
          cardType="employee"
          title="Michael Torres"
          employeeName="Michael Torres"
          employeeId="EMP-5623"
          position="Safety Coordinator"
          location="Emergency Response Station"
          shift="Day Shift"
          status="active"
          showLiveFeed={true}
        />
        <ActivityCard
          //  id="emp-004"
          cardType="employee"
          title="Lisa Anderson"
          employeeName="Lisa Anderson"
          employeeId="EMP-7891"
          position="Lab Supervisor"
          location="Quality Control Lab"
          shift="Day Shift"
          status="missing"
          showLiveFeed={true}
        />
      </Box>
    </Box>
  ),
  decorators: [], // Remove individual decorator for grid stories
  parameters: {
    docs: {
      description: {
        story:
          "Employee tracking grid layout as it appears in the actual SCOUT application.",
      },
    },
  },
};

export const PPEViolationGrid: Story = {
  render: () => (
    <Box
      sx={{
        backgroundColor: "#f5f7fa",
        p: 3,
        borderRadius: 1,
        width: "fit-content",
        maxWidth: "680px",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 320px)",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <ActivityCard
          //   id="ppe-001"
          cardType="ppe_violation"
          title="Hard hat missing"
          location="Production Zone A"
          timestamp="14:32"
          workerId="W-4521"
          priority="high"
          alertStatus="active"
          showLiveFeed={true}
        />
        <ActivityCard
          //   id="ppe-002"
          cardType="ppe_violation"
          title="Safety vest not worn"
          location="Warehouse Zone B"
          timestamp="14:18"
          workerId="W-3847"
          priority="medium"
          alertStatus="acknowledged"
          showLiveFeed={true}
        />
      </Box>
    </Box>
  ),
  decorators: [],
  parameters: {
    docs: {
      description: {
        story: "PPE violation alerts grid as shown in PPE Detection page.",
      },
    },
  },
};

export const SecurityBreachGrid: Story = {
  render: () => (
    <Box
      sx={{
        backgroundColor: "#f5f7fa",
        p: 3,
        borderRadius: 1,
        width: "fit-content",
        maxWidth: "680px",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 320px)",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <ActivityCard
          //  id="sec-001"
          cardType="security_breach"
          title="Unauthorized person at main gate"
          location="Main Entrance Perimeter - Camera 1"
          timestamp="15:42"
          intruderId="UNKNOWN-001"
          priority="critical"
          alertStatus="active"
          showLiveFeed={true}
        />
        <ActivityCard
          // id="sec-002"
          cardType="security_breach"
          title="Fence breach detected"
          location="East Boundary - Camera 8"
          timestamp="15:28"
          intruderId="UNKNOWN-002"
          priority="high"
          alertStatus="investigating"
          showLiveFeed={true}
        />
        <ActivityCard
          //  id="sec-003"
          cardType="security_breach"
          title="Suspicious activity near warehouse"
          location="Warehouse Perimeter - Camera 12"
          timestamp="15:15"
          intruderId="UNKNOWN-003"
          priority="high"
          alertStatus="resolved"
          showLiveFeed={true}
        />
        <ActivityCard
          //  id="sec-004"
          cardType="security_breach"
          title="Multiple persons at restricted zone"
          location="North Security Zone - Camera 15"
          timestamp="14:58"
          intruderId="UNKNOWN-004"
          priority="critical"
          alertStatus="escalated"
          showLiveFeed={true}
        />
      </Box>
    </Box>
  ),
  decorators: [],
  parameters: {
    docs: {
      description: {
        story:
          "Security breach alerts grid as shown in Intrusion Detection page.",
      },
    },
  },
};
