// import type { Meta, StoryObj } from '@storybook/react';
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import {
  Warning,
  ErrorOutline,
  Person,
  InfoOutlined,
} from "@mui/icons-material";
import AlertCard from "./AlertCard";

const meta: Meta<typeof AlertCard> = {
  title: "Components/Molecules/AlertCard",
  component: AlertCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**SCOUT Alert Card**

Individual alert card component used in the System Alerts page. Features:
- Color-coded severity indicators (Critical, High, Medium, Low)
- Status badges (Active, Escalated, Acknowledged, Resolved)
- Alert metadata (location, time, assigned person, duration)
- Quick action buttons
- Category tags
- Hover effects and interactions

**Project Usage**: Used in the Alerts page to display individual alert details with all relevant information and actions.
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
          // Match project UI - full width container, no maxWidth constraint
        }}
      >
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    severity: {
      control: "select",
      options: ["CRITICAL", "HIGH", "MEDIUM", "LOW"],
      description: "Alert severity level",
    },
    status: {
      control: "select",
      options: ["ACTIVE", "ESCALATED", "ACKNOWLEDGED", "RESOLVED"],
      description: "Alert status",
    },
    category: {
      control: "text",
      description: "Alert category",
    },
    // onViewDetails: {
    //   action: "view-details-clicked",
    //   description: "View details button handler",
    // },
    onActionClick: {
      action: "action-clicked",
      description: "Quick action button handler",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CriticalSafetyAlert: Story = {
  args: {
    id: "ALT-7892",
    title: "Hard hat missing in reactor zone",
    description:
      "Worker W-4521 detected without hard hat in critical reactor control area",
    severity: "CRITICAL",
    status: "ACTIVE",
    category: "Safety",
    location: "Reactor Control Room - Camera 3",
    time: "16:45",
    assignedTo: "Safety Officer",
    duration: "8m",
    icon: ErrorOutline,
    actions: ["Notify Worker", "Send Safety Alert", "Log Incident"],
  },
  parameters: {
    docs: {
      description: {
        story: "Critical safety alert as it appears in the SCOUT Alerts page.",
      },
    },
  },
};

export const CriticalSecurityAlert: Story = {
  args: {
    id: "ALT-7891",
    title: "Unauthorized person at main gate",
    description:
      "Unknown individual attempting unauthorized access at main entrance perimeter",
    severity: "CRITICAL",
    status: "ESCALATED",
    category: "Security",
    location: "Main Entrance - Camera 1",
    time: "16:32",
    assignedTo: "Security Team",
    duration: "15m",
    icon: ErrorOutline,
    actions: ["Alert Security", "Lock Down", "Call Authorities"],
  },
  parameters: {
    docs: {
      description: {
        story: "Critical security alert with escalated status.",
      },
    },
  },
};

export const HighPriorityAlert: Story = {
  args: {
    id: "ALT-7890",
    title: "Equipment blocking emergency exit",
    description: "Large machinery cart left blocking Emergency Route B",
    severity: "HIGH",
    status: "ACTIVE",
    category: "Safety",
    location: "Emergency Route B - Camera 9",
    time: "16:18",
    assignedTo: "Maintenance",
    duration: "23m",
    icon: Warning,
    actions: ["Clear Path", "Relocate Equipment", "Update Logs"],
  },
  parameters: {
    docs: {
      description: {
        story: "High priority safety alert for blocked emergency exit.",
      },
    },
  },
};

export const AcknowledgedAlert: Story = {
  args: {
    id: "ALT-7889",
    title: "Missing personnel in critical area",
    description:
      "Required Level 3 operator not present in chemical processing unit",
    severity: "HIGH",
    status: "ACKNOWLEDGED",
    category: "Workforce",
    location: "Chemical Processing Unit",
    time: "16:05",
    assignedTo: "Shift Supervisor",
    duration: "35m",
    icon: Person,
    actions: ["Assign Replacement", "Notify HR", "Log Absence"],
  },
  parameters: {
    docs: {
      description: {
        story: "High priority workforce alert that has been acknowledged.",
      },
    },
  },
};

export const MediumPriorityAlert: Story = {
  args: {
    id: "ALT-7888",
    title: "High occupancy in break room",
    description: "Break room exceeding maximum capacity during shift change",
    severity: "MEDIUM",
    status: "ACTIVE",
    category: "Operational",
    location: "Break Room A - Camera 12",
    time: "15:52",
    assignedTo: "Facility Manager",
    duration: "48m",
    icon: InfoOutlined,
    actions: ["Manage Crowd", "Open Additional Area", "Update Schedule"],
  },
  parameters: {
    docs: {
      description: {
        story: "Medium priority operational alert for crowd management.",
      },
    },
  },
};

export const AlertsList: Story = {
  render: () => (
    <Box sx={{ backgroundColor: "#f5f7fa", p: 3, borderRadius: 1 }}>
      <AlertCard
        id="ALT-7892"
        title="Hard hat missing in reactor zone"
        description="Worker W-4521 detected without hard hat in critical reactor control area"
        severity="CRITICAL"
        status="ACTIVE"
        category="Safety"
        location="Reactor Control Room - Camera 3"
        time="16:45"
        assignedTo="Safety Officer"
        duration="8m"
        icon={ErrorOutline}
        actions={["Notify Worker", "Send Safety Alert", "Log Incident"]}
      />

      <AlertCard
        id="ALT-7891"
        title="Unauthorized person at main gate"
        description="Unknown individual attempting unauthorized access at main entrance perimeter"
        severity="CRITICAL"
        status="ESCALATED"
        category="Security"
        location="Main Entrance - Camera 1"
        time="16:32"
        assignedTo="Security Team"
        duration="15m"
        icon={ErrorOutline}
        actions={["Alert Security", "Lock Down", "Call Authorities"]}
      />

      <AlertCard
        id="ALT-7890"
        title="Equipment blocking emergency exit"
        description="Large machinery cart left blocking Emergency Route B"
        severity="HIGH"
        status="ACTIVE"
        category="Safety"
        location="Emergency Route B - Camera 9"
        time="16:18"
        assignedTo="Maintenance"
        duration="23m"
        icon={Warning}
        actions={["Clear Path", "Relocate Equipment", "Update Logs"]}
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple alert cards as they appear in the SCOUT Alerts page list.",
      },
    },
  },
};
