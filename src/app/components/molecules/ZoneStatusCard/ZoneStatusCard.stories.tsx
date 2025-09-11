import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "@mui/material";
import ZoneStatusCard from "./ZoneStatusCard";

const meta: Meta<typeof ZoneStatusCard> = {
  title: "Components/Molecules/ZoneStatusCard",
  component: ZoneStatusCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "SCOUT Zone Status Card component for critical zone monitoring. Shows personnel count, priority levels, and staffing status with visual indicators.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    priority: {
      control: "select",
      options: ["Critical", "High", "Medium", "Low"],
      description: "Zone priority level",
    },
    status: {
      control: "select",
      options: ["optimal", "understaffed", "overstaffed", "critical"],
      description: "Override personnel status",
    },
    currentPersonnel: {
      control: { type: "number", min: 0, max: 20 },
      description: "Current personnel count",
    },
    requiredPersonnel: {
      control: { type: "number", min: 1, max: 20 },
      description: "Required personnel count",
    },
    zoneName: {
      control: "text",
      description: "Zone name",
    },
    shift: {
      control: "text",
      description: "Current shift",
    },
    certificationRequired: {
      control: "text",
      description: "Required certification level",
    },
    onClick: {
      action: "zone-clicked",
      description: "Zone card click handler",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ReactorControlRoom: Story = {
  args: {
    zoneName: "Reactor Control Room",
    currentPersonnel: 3,
    requiredPersonnel: 3,
    shift: "Day shift",
    priority: "Critical",
    certificationRequired: "Level 3 required",
  },
  parameters: {
    docs: {
      description: {
        story: "Reactor Control Room at optimal staffing (matches screenshot).",
      },
    },
  },
};

export const ChemicalProcessingUnit: Story = {
  args: {
    zoneName: "Chemical Processing Unit",
    currentPersonnel: 2,
    requiredPersonnel: 3,
    shift: "Day shift",
    priority: "Critical",
    certificationRequired: "Level 2 required",
  },
  parameters: {
    docs: {
      description: {
        story: "Chemical Processing Unit understaffed (matches screenshot).",
      },
    },
  },
};

export const EmergencyResponseStation: Story = {
  args: {
    zoneName: "Emergency Response Station",
    currentPersonnel: 4,
    requiredPersonnel: 4,
    shift: "Day shift",
    priority: "High",
    certificationRequired: "Safety Cert required",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Emergency Response Station at full capacity (matches screenshot).",
      },
    },
  },
};

export const QualityControlLab: Story = {
  args: {
    zoneName: "Quality Control Lab",
    currentPersonnel: 2,
    requiredPersonnel: 3,
    shift: "Day shift",
    priority: "High",
    certificationRequired: "Lab Cert required",
  },
  parameters: {
    docs: {
      description: {
        story: "Quality Control Lab understaffed (matches screenshot).",
      },
    },
  },
};

export const MaintenanceWorkshop: Story = {
  args: {
    zoneName: "Maintenance Workshop",
    currentPersonnel: 5,
    requiredPersonnel: 6,
    shift: "Day shift",
    priority: "Medium",
    certificationRequired: "Tech Cert required",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Maintenance Workshop with medium priority (matches screenshot).",
      },
    },
  },
};

export const CriticalUnderstaffed: Story = {
  args: {
    zoneName: "Hazardous Material Storage",
    currentPersonnel: 1,
    requiredPersonnel: 4,
    shift: "Night shift",
    priority: "Critical",
    certificationRequired: "Level 4 required",
    status: "critical",
  },
  parameters: {
    docs: {
      description: {
        story: "Critically understaffed zone requiring immediate attention.",
      },
    },
  },
};

export const OverstaffedZone: Story = {
  args: {
    zoneName: "Training Center",
    currentPersonnel: 8,
    requiredPersonnel: 5,
    shift: "Day shift",
    priority: "Low",
    certificationRequired: "Basic Cert required",
    status: "overstaffed",
  },
  parameters: {
    docs: {
      description: {
        story: "Overstaffed zone with surplus personnel.",
      },
    },
  },
};

export const CriticalZonesSidebar: Story = {
  render: () => (
    <div
      style={{
        width: "280px",
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          mb: 2,
          color: "#1c2025",
        }}
      >
        Critical Zones Status
      </Typography>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <ZoneStatusCard
          zoneName="Reactor Control Room"
          currentPersonnel={3}
          requiredPersonnel={3}
          shift="Day shift"
          priority="Critical"
          certificationRequired="Level 3 required"
        />
        <ZoneStatusCard
          zoneName="Chemical Processing Unit"
          currentPersonnel={2}
          requiredPersonnel={3}
          shift="Day shift"
          priority="Critical"
          certificationRequired="Level 2 required"
        />
        <ZoneStatusCard
          zoneName="Emergency Response Station"
          currentPersonnel={4}
          requiredPersonnel={4}
          shift="Day shift"
          priority="High"
          certificationRequired="Safety Cert required"
        />
        <ZoneStatusCard
          zoneName="Quality Control Lab"
          currentPersonnel={2}
          requiredPersonnel={3}
          shift="Day shift"
          priority="High"
          certificationRequired="Lab Cert required"
        />
        <ZoneStatusCard
          zoneName="Maintenance Workshop"
          currentPersonnel={5}
          requiredPersonnel={6}
          shift="Day shift"
          priority="Medium"
          certificationRequired="Tech Cert required"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Critical Zones Status sidebar exactly as shown in the screenshot.",
      },
    },
  },
};
