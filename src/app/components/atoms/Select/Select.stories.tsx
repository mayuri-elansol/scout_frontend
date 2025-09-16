import type { Meta, StoryObj } from "@storybook/react-vite";
import ScoutSelect from "./Select";

const meta: Meta<typeof ScoutSelect> = {
  title: "Components/Atoms/Select",
  component: ScoutSelect,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "SCOUT Select dropdown component for filter controls and form selections. Used extensively for filtering data (15+ instances).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Select field label",
    },
    options: {
      control: "object",
      description: "Array of option objects with value and label",
    },
    value: {
      control: "text",
      description: "Selected value",
    },
    helperText: {
      control: "text",
      description: "Helper text below select",
    },
    error: {
      control: "boolean",
      description: "Error state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    width: {
      control: "text",
      description: "Select width (CSS value)",
    },
    onChange: {
      action: "changed",
      description: "Change handler",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "resolved", label: "Resolved" },
  { value: "investigating", label: "Investigating" },
];

const priorityOptions = [
  { value: "all", label: "All Priorities" },
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const zoneOptions = [
  { value: "all", label: "All Zones" },
  { value: "production-floor", label: "Production Floor" },
  { value: "warehouse", label: "Warehouse" },
  { value: "parking-area", label: "Parking Area" },
  { value: "main-entrance", label: "Main Entrance" },
  { value: "assembly-line", label: "Assembly Line" },
];

const timeRangeOptions = [
  { value: "1hour", label: "Last 1 hour" },
  { value: "3hours", label: "Last 3 hours" },
  { value: "6hours", label: "Last 6 hours" },
  { value: "12hours", label: "Last 12 hours" },
  { value: "24hours", label: "Last 24 hours" },
];

export const StatusFilter: Story = {
  args: {
    id: "status-filter",
    label: "Filter by Status",
    options: statusOptions,
    value: "all",
    width: "200px",
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Status filter dropdown used throughout the application.",
      },
    },
  },
};

export const PriorityFilter: Story = {
  args: {
    id: "priority-filter",
    label: "Priority Level",
    options: priorityOptions,
    value: "all",
    width: "180px",
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Priority filter for alert and incident management.",
      },
    },
  },
};

export const ZoneFilter: Story = {
  args: {
    id: "zone-filter",
    label: "Select Zone",
    options: zoneOptions,
    value: "all",
    width: "220px",
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Zone filter for location-based filtering.",
      },
    },
  },
};

export const TimeRangeFilter: Story = {
  args: {
    id: "time-range-filter",
    label: "Time Range",
    options: timeRangeOptions,
    value: "15min",
    width: "180px",
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Time range selector for data filtering.",
      },
    },
  },
};

export const WithHelperText: Story = {
  args: {
    id: "detection-type",
    label: "Detection Type",
    options: [
      { value: "ppe", label: "PPE Detection" },
      { value: "intrusion", label: "Intrusion Detection" },
      { value: "employee", label: "Employee Presence" },
      { value: "fire", label: "Fire Detection" },
    ],
    value: "ppe",
    helperText: "Select the type of detection to monitor",
    width: "250px",
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Select with helper text for user guidance.",
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    id: "required-field",
    label: "Required Field",
    options: statusOptions,
    value: "",
    error: true,
    helperText: "Please select a status",
    width: "200px",
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Select in error state with validation message.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    id: "system-mode",
    label: "System Mode",
    options: [
      { value: "monitoring", label: "Monitoring" },
      { value: "maintenance", label: "Maintenance" },
    ],
    value: "monitoring",
    disabled: true,
    helperText: "Contact admin to change system mode",
    width: "200px",
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled select for read-only data.",
      },
    },
  },
};

export const WithDisabledOptions: Story = {
  args: {
    id: "camera-selection",
    label: "Camera Selection",
    options: [
      { value: "cam1", label: "Camera 1 - Production Floor" },
      { value: "cam2", label: "Camera 2 - Warehouse" },
      { value: "cam3", label: "Camera 3 - Offline", disabled: true },
      { value: "cam4", label: "Camera 4 - Parking Area" },
      { value: "cam5", label: "Camera 5 - Maintenance", disabled: true },
    ],
    value: "cam1",
    width: "280px",
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Select with some disabled options (offline cameras).",
      },
    },
  },
};

export const FilterGroup: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <ScoutSelect
        id="status-filter-group"
        label="Status"
        options={statusOptions}
        value="active"
        width="150px"
        onChange={() => {}}
      />
      <ScoutSelect
        id="priority-filter-group"
        label="Priority"
        options={priorityOptions}
        value="high"
        width="150px"
        onChange={() => {}}
      />
      <ScoutSelect
        id="zone-filter-group"
        label="Zone"
        options={zoneOptions}
        value="production-floor"
        width="180px"
        onChange={() => {}}
      />
      <ScoutSelect
        id="time-range-filter-group"
        label="Time Range"
        options={timeRangeOptions}
        value="1hour"
        width="150px"
        onChange={() => {}}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple select filters shown together as typically used in the application.",
      },
    },
  },
};
