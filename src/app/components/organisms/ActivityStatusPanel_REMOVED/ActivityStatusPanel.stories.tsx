// import type { Meta, StoryObj } from '@storybook/react';
import type { Meta, StoryObj } from "@storybook/react-vite";
import ActivityStatusPanel from "./ActivityStatusPanel";

const meta: Meta<typeof ActivityStatusPanel> = {
  title: "Components/Templates/ActivityStatusPanel",
  component: ActivityStatusPanel,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "SCOUT Activity Status Panel template combining personnel cards and critical zone status. This is the complete layout shown in the screenshots with personnel grid on the left and zone status sidebar on the right.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showViewAllButton: {
      control: "boolean",
      description: 'Show "View All" button in personnel section',
    },
    personnelGridColumns: {
      control: "select",
      options: [1, 2, 3, 4],
      description: "Number of columns in personnel grid",
    },
    onViewAllPersonnel: {
      action: "view-all-clicked",
      description: "View All personnel handler",
    },
    onPersonnelTrack: {
      action: "personnel-track-clicked",
      description: "Personnel track button handler",
    },
    onPersonnelProfile: {
      action: "personnel-profile-clicked",
      description: "Personnel profile button handler",
    },
    onZoneClick: {
      action: "zone-clicked",
      description: "Zone card click handler",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const samplePersonnelData = [
  {
    employeeId: "EMP-4521",
    employeeName: "John Mitchell",
    zone: "Reactor Control Room",
    shift: "Day Shift",
    role: "Level 3 Operator",
    status: "active" as const,
    liveFeedStatus: "live" as const,
  },
  {
    employeeId: "EMP-3847",
    employeeName: "Sarah Chen",
    zone: "Chemical Processing Unit",
    shift: "Day Shift",
    role: "Senior Technician",
    status: "break" as const,
    liveFeedStatus: "live" as const,
  },
  {
    employeeId: "EMP-5623",
    employeeName: "Michael Torres",
    zone: "Emergency Response Station",
    shift: "Day Shift",
    role: "Safety Coordinator",
    status: "active" as const,
    liveFeedStatus: "live" as const,
  },
  {
    employeeId: "EMP-7891",
    employeeName: "Lisa Anderson",
    zone: "Quality Control Lab",
    shift: "Day Shift",
    role: "Lab Supervisor",
    status: "missing" as const,
    liveFeedStatus: "offline" as const,
    lastSeen: "2024-01-15T14:30:00",
  },
];

const sampleZoneData = [
  {
    zoneName: "Reactor Control Room",
    currentPersonnel: 3,
    requiredPersonnel: 3,
    shift: "Day shift",
    priority: "Critical" as const,
    certificationRequired: "Level 3 required",
  },
  {
    zoneName: "Chemical Processing Unit",
    currentPersonnel: 2,
    requiredPersonnel: 3,
    shift: "Day shift",
    priority: "Critical" as const,
    certificationRequired: "Level 2 required",
  },
  {
    zoneName: "Emergency Response Station",
    currentPersonnel: 4,
    requiredPersonnel: 4,
    shift: "Day shift",
    priority: "High" as const,
    certificationRequired: "Safety Cert required",
  },
  {
    zoneName: "Quality Control Lab",
    currentPersonnel: 2,
    requiredPersonnel: 3,
    shift: "Day shift",
    priority: "High" as const,
    certificationRequired: "Lab Cert required",
  },
  {
    zoneName: "Maintenance Workshop",
    currentPersonnel: 5,
    requiredPersonnel: 6,
    shift: "Day shift",
    priority: "Medium" as const,
    certificationRequired: "Tech Cert required",
  },
];

export const Default: Story = {
  args: {
    personnelData: samplePersonnelData,
    zoneData: sampleZoneData,
    showViewAllButton: true,
    personnelGridColumns: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default activity status panel layout exactly matching the screenshot.",
      },
    },
  },
};

export const CriticalSituation: Story = {
  args: {
    personnelData: [
      {
        employeeId: "EMP-4521",
        employeeName: "John Mitchell",
        zone: "Reactor Control Room",
        shift: "Day Shift",
        role: "Level 3 Operator",
        status: "active" as const,
        liveFeedStatus: "live" as const,
      },
      {
        employeeId: "EMP-7891",
        employeeName: "Lisa Anderson",
        zone: "Quality Control Lab",
        shift: "Day Shift",
        role: "Lab Supervisor",
        status: "missing" as const,
        liveFeedStatus: "offline" as const,
        lastSeen: "2024-01-15T14:30:00",
      },
    ],
    zoneData: [
      {
        zoneName: "Reactor Control Room",
        currentPersonnel: 1,
        requiredPersonnel: 3,
        shift: "Day shift",
        priority: "Critical" as const,
        certificationRequired: "Level 3 required",
        status: "critical" as const,
      },
      {
        zoneName: "Chemical Processing Unit",
        currentPersonnel: 0,
        requiredPersonnel: 3,
        shift: "Day shift",
        priority: "Critical" as const,
        certificationRequired: "Level 2 required",
        status: "critical" as const,
      },
    ],
    showViewAllButton: true,
    personnelGridColumns: 2,
  },
};
