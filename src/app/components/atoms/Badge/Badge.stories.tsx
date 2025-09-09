// import type { Meta, StoryObj } from '@storybook/react';
import type { Meta, StoryObj } from "@storybook/react-vite";

import ScoutBadge from "./Badge";

const meta: Meta<typeof ScoutBadge> = {
  title: "Components/Atoms/Badge",
  component: ScoutBadge,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "SCOUT Badge component for status indicators, priority levels, categories, and notification counts. Used extensively throughout the application (30+ instances).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["status", "priority", "category", "count"],
      description: "Badge variant type",
    },
    status: {
      control: "select",
      options: [
        "active",
        "inactive",
        "pending",
        "resolved",
        "investigating",
        "critical",
        "warning",
        "success",
        "info",
        "break",
        "offline",
      ],
      description: "Status value (when variant is status)",
    },
    priority: {
      control: "select",
      options: ["critical", "high", "medium", "low"],
      description: "Priority level (when variant is priority)",
    },
    category: {
      control: "select",
      options: [
        "ppe",
        "intrusion",
        "employee",
        "fire",
        "security",
        "operational",
      ],
      description: "Category type (when variant is category)",
    },
    label: {
      control: "text",
      description: "Badge text content",
    },
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "Badge size",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const StatusActive: Story = {
  args: {
    variant: "status",
    status: "active",
    label: "Active",
  },
  parameters: {
    docs: {
      description: {
        story: "Active status badge with green styling.",
      },
    },
  },
};

export const StatusPending: Story = {
  args: {
    variant: "status",
    status: "pending",
    label: "Pending",
  },
  parameters: {
    docs: {
      description: {
        story: "Pending status badge with blue styling.",
      },
    },
  },
};

export const StatusCritical: Story = {
  args: {
    variant: "status",
    status: "critical",
    label: "Critical",
  },
  parameters: {
    docs: {
      description: {
        story: "Critical status badge with red styling.",
      },
    },
  },
};

export const PriorityCritical: Story = {
  args: {
    variant: "priority",
    priority: "critical",
    label: "Critical",
  },
  parameters: {
    docs: {
      description: {
        story: "Critical priority badge for urgent alerts.",
      },
    },
  },
};

export const PriorityHigh: Story = {
  args: {
    variant: "priority",
    priority: "high",
    label: "High",
  },
  parameters: {
    docs: {
      description: {
        story: "High priority badge for important alerts.",
      },
    },
  },
};

export const CategoryPPE: Story = {
  args: {
    variant: "category",
    category: "ppe",
    label: "PPE",
  },
  parameters: {
    docs: {
      description: {
        story: "PPE category badge for safety-related alerts.",
      },
    },
  },
};

export const CategoryIntrusion: Story = {
  args: {
    variant: "category",
    category: "intrusion",
    label: "Intrusion",
  },
  parameters: {
    docs: {
      description: {
        story: "Intrusion category badge for security alerts.",
      },
    },
  },
};

export const CountBadge: Story = {
  args: {
    variant: "count",
    label: "12",
  },
  parameters: {
    docs: {
      description: {
        story: "Count badge for notification indicators.",
      },
    },
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <ScoutBadge variant="status" status="active" label="Active" />
      <ScoutBadge variant="status" status="inactive" label="Inactive" />
      <ScoutBadge variant="status" status="pending" label="Pending" />
      <ScoutBadge variant="status" status="resolved" label="Resolved" />
      <ScoutBadge
        variant="status"
        status="investigating"
        label="Investigating"
      />
      <ScoutBadge variant="status" status="critical" label="Critical" />
      <ScoutBadge variant="status" status="warning" label="Warning" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All status badge variants shown together.",
      },
    },
  },
};

export const AllPriorities: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <ScoutBadge variant="priority" priority="critical" label="Critical" />
      <ScoutBadge variant="priority" priority="high" label="High" />
      <ScoutBadge variant="priority" priority="medium" label="Medium" />
      <ScoutBadge variant="priority" priority="low" label="Low" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All priority badge variants shown together.",
      },
    },
  },
};

export const AllCategories: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <ScoutBadge variant="category" category="ppe" label="PPE" />
      <ScoutBadge variant="category" category="intrusion" label="Intrusion" />
      <ScoutBadge variant="category" category="employee" label="Employee" />
      <ScoutBadge variant="category" category="fire" label="Fire" />
      <ScoutBadge variant="category" category="security" label="Security" />
      <ScoutBadge
        variant="category"
        category="operational"
        label="Operational"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All category badge variants shown together.",
      },
    },
  },
};

export const StatusBreak: Story = {
  args: {
    variant: "status",
    status: "break",
    label: "BREAK",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Break status badge with orange styling for employee break time.",
      },
    },
  },
};

export const StatusOffline: Story = {
  args: {
    variant: "status",
    status: "offline",
    label: "OFFLINE",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Offline status badge with red styling for unavailable employees.",
      },
    },
  },
};
