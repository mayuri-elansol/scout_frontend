// import type { Meta, StoryObj } from '@storybook/react';
import type { Meta, StoryObj } from "@storybook/react-vite";
import StatusBadgeGroup from "./StatusBadgeGroup";

const meta: Meta<typeof StatusBadgeGroup> = {
  title: "Components/Molecules/StatusBadgeGroup",
  component: StatusBadgeGroup,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "SCOUT Status Badge Group component for displaying collections of related status badges with counts. Used for alert status displays and overview dashboards (10+ instances).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Group title",
    },
    layout: {
      control: "select",
      options: ["horizontal", "vertical", "grid"],
      description: "Badge layout arrangement",
    },
    spacing: {
      control: "select",
      options: ["compact", "normal", "comfortable"],
      description: "Spacing between badges",
    },
    showCounts: {
      control: "boolean",
      description: "Show count numbers in badge labels",
    },
    showTitle: {
      control: "boolean",
      description: "Show group title",
    },
    totalLabel: {
      control: "text",
      description: "Label for total count display",
    },
    onClick: {
      action: "badge-clicked",
      description: "Badge click handler",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const alertStatusItems = [
  {
    id: "1",
    label: "Active",
    count: 12,
    variant: "status" as const,
    value: "active",
  },
  {
    id: "2",
    label: "Pending",
    count: 5,
    variant: "status" as const,
    value: "pending",
  },
  {
    id: "3",
    label: "Investigating",
    count: 3,
    variant: "status" as const,
    value: "investigating",
  },
  {
    id: "4",
    label: "Resolved",
    count: 28,
    variant: "status" as const,
    value: "resolved",
  },
];

const priorityItems = [
  {
    id: "1",
    label: "Critical",
    count: 2,
    variant: "priority" as const,
    value: "critical",
  },
  {
    id: "2",
    label: "High",
    count: 8,
    variant: "priority" as const,
    value: "high",
  },
  {
    id: "3",
    label: "Medium",
    count: 15,
    variant: "priority" as const,
    value: "medium",
  },
  {
    id: "4",
    label: "Low",
    count: 23,
    variant: "priority" as const,
    value: "low",
  },
];

const categoryItems = [
  {
    id: "1",
    label: "PPE",
    count: 7,
    variant: "category" as const,
    value: "ppe",
  },
  {
    id: "2",
    label: "Intrusion",
    count: 2,
    variant: "category" as const,
    value: "intrusion",
  },
  {
    id: "3",
    label: "Fire",
    count: 0,
    variant: "category" as const,
    value: "fire",
  },
  {
    id: "4",
    label: "Security",
    count: 4,
    variant: "category" as const,
    value: "security",
  },
  {
    id: "5",
    label: "Operational",
    count: 11,
    variant: "category" as const,
    value: "operational",
  },
];

export const AlertStatusOverview: Story = {
  args: {
    title: "Alert Status Overview",
    items: alertStatusItems,
    layout: "horizontal",
    spacing: "normal",
    showCounts: true,
    showTitle: true,
    totalLabel: "Total Alerts",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Alert status overview showing distribution of alerts by status.",
      },
    },
  },
};

export const PriorityDistribution: Story = {
  args: {
    title: "Priority Distribution",
    items: priorityItems,
    layout: "horizontal",
    spacing: "normal",
    showCounts: true,
    showTitle: true,
    totalLabel: "Total Items",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Priority distribution showing count of items by priority level.",
      },
    },
  },
};

export const CategoryBreakdown: Story = {
  args: {
    title: "Incident Categories",
    items: categoryItems,
    layout: "grid",
    spacing: "comfortable",
    showCounts: true,
    showTitle: true,
    totalLabel: "Total Incidents",
  },
  parameters: {
    docs: {
      description: {
        story: "Category breakdown in grid layout with comfortable spacing.",
      },
    },
  },
};

export const VerticalLayout: Story = {
  args: {
    title: "System Status",
    items: alertStatusItems,
    layout: "vertical",
    spacing: "normal",
    showCounts: true,
    showTitle: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Vertical layout arrangement for sidebar or narrow containers.",
      },
    },
  },
};

export const CompactSpacing: Story = {
  args: {
    title: "Quick Status",
    items: priorityItems.slice(0, 3),
    layout: "horizontal",
    spacing: "compact",
    showCounts: true,
    showTitle: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Compact spacing for tight layouts or dashboard widgets.",
      },
    },
  },
};

export const WithoutCounts: Story = {
  args: {
    title: "Available Statuses",
    items: alertStatusItems,
    layout: "horizontal",
    spacing: "normal",
    showCounts: false,
    showTitle: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Badge group without count numbers, showing only status labels.",
      },
    },
  },
};

export const WithoutTitle: Story = {
  args: {
    items: priorityItems,
    layout: "horizontal",
    spacing: "normal",
    showCounts: true,
    showTitle: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Badge group without title for embedded use in other components.",
      },
    },
  },
};

export const SecurityDashboard: Story = {
  args: {
    title: "Security Alerts",
    items: [
      {
        id: "1",
        label: "Critical",
        count: 1,
        variant: "priority" as const,
        value: "critical",
      },
      {
        id: "2",
        label: "High",
        count: 3,
        variant: "priority" as const,
        value: "high",
      },
      {
        id: "3",
        label: "Medium",
        count: 7,
        variant: "priority" as const,
        value: "medium",
      },
    ],
    layout: "horizontal",
    spacing: "comfortable",
    showCounts: true,
    showTitle: true,
    totalLabel: "Active Alerts",
  },
  parameters: {
    docs: {
      description: {
        story: "Security dashboard showing only priority levels with counts.",
      },
    },
  },
};

export const EmptyStates: Story = {
  args: {
    title: "System Status",
    items: [
      {
        id: "1",
        label: "Active",
        count: 0,
        variant: "status" as const,
        value: "active",
      },
      {
        id: "2",
        label: "Pending",
        count: 0,
        variant: "status" as const,
        value: "pending",
      },
      {
        id: "3",
        label: "Resolved",
        count: 0,
        variant: "status" as const,
        value: "resolved",
      },
    ],
    layout: "horizontal",
    spacing: "normal",
    showCounts: true,
    showTitle: true,
    totalLabel: "Total",
  },
  parameters: {
    docs: {
      description: {
        story: "Badge group with zero counts showing empty state.",
      },
    },
  },
};

export const MultipleGroups: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <StatusBadgeGroup
        title="Alert Status"
        items={alertStatusItems}
        layout="horizontal"
        totalLabel="Total Alerts"
      />
      <StatusBadgeGroup
        title="Priority Levels"
        items={priorityItems}
        layout="horizontal"
        totalLabel="Total Items"
      />
      <StatusBadgeGroup
        title="Incident Categories"
        items={categoryItems.slice(0, 3)}
        layout="horizontal"
        totalLabel="Total Incidents"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple badge groups stacked vertically as seen in dashboard layouts.",
      },
    },
  },
};
