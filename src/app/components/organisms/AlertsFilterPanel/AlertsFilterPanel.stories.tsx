// import type { Meta, StoryObj } from "@storybook/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "@mui/material";
import AlertsFilterPanel from "./AlertsFilterPanel";

const meta: Meta<typeof AlertsFilterPanel> = {
  title: "Components/Organisms/AlertsFilterPanel",
  component: AlertsFilterPanel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**SCOUT Alerts Filter Panel**

Filter panel used in the System Alerts page. Features:
- Category dropdown filter with hierarchical sub-categories
- Sub-Category dropdown that updates based on selected category
- Apply button to execute filters
- Refresh button to reset/reload
- Responsive layout

**Categories & Sub-Categories**:
- **Safety & Compliance**: PPE Detection, Fire Detection, Speed Monitoring, Fall Detection, etc.
- **Security Monitoring**: Intrusion Detection, Camera Tampering, People Presence
- **Workforce Monitoring**: Employee Presence, Idle Time, Phone Usage, etc.
- **Vehicle Operational Insights**: Vehicle Count, Tracking, Unauthorized Parking
- **Facial Recognition Analytics**: Access Control, Attendance, Canteen Usage

**Project Usage**: Used in the Alerts page to provide hierarchical filtering capabilities for the alerts list.
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
        }}
      >
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    categoryFilter: {
      control: "select",
      options: [
        "",
        "safety-compliance",
        "security-monitoring",
        "workforce-monitoring",
        "vehicle-operational-insights",
        "facial-recognition-analytics",
      ],
      description: "Current category filter",
    },
    subCategoryFilter: {
      control: "text",
      description:
        "Current sub-category filter (auto-populated based on category)",
    },
    onCategoryChange: {
      action: "category-changed",
      description: "Category filter change handler",
    },
    onSubCategoryChange: {
      action: "sub-category-changed",
      description: "Sub-category filter change handler",
    },
    onApply: {
      action: "apply-clicked",
      description: "Apply button click handler",
    },
    onRefresh: {
      action: "refresh-clicked",
      description: "Refresh button click handler",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default filter panel as it appears in the SCOUT Alerts page.",
      },
    },
  },
};

export const SafetyCompliance: Story = {
  args: {
    categoryFilter: "safety-compliance",
    subCategoryFilter: "Personal Protective Equipment (PPE) Detection",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Filter panel configured for Safety & Compliance alerts with PPE Detection selected.",
      },
    },
  },
};

export const SecurityMonitoring: Story = {
  args: {
    categoryFilter: "security-monitoring",
    subCategoryFilter: "Intrusion Detection at Premises Perimeter",
  },
  parameters: {
    docs: {
      description: {
        story: "Filter panel configured for Security Monitoring alerts.",
      },
    },
  },
};

export const WorkforceMonitoring: Story = {
  args: {
    categoryFilter: "workforce-monitoring",
    subCategoryFilter: "Employee Presence Detection in Critical Areas",
  },
  parameters: {
    docs: {
      description: {
        story: "Filter panel configured for Workforce Monitoring alerts.",
      },
    },
  },
};

export const VehicleOperationalInsights: Story = {
  args: {
    categoryFilter: "vehicle-operational-insights",
    subCategoryFilter: "Vehicle Count & ANPR at Entry/Exit Gates",
  },
  parameters: {
    docs: {
      description: {
        story: "Filter panel configured for Vehicle Operational Insights.",
      },
    },
  },
};

export const FacialRecognitionAnalytics: Story = {
  args: {
    categoryFilter: "facial-recognition-analytics",
    subCategoryFilter:
      "Face Recognition for Entry/Exit Logging, (Attendance system Lite)",
  },
  parameters: {
    docs: {
      description: {
        story: "Filter panel configured for Facial Recognition Analytics.",
      },
    },
  },
};

export const CategoryOnlySelected: Story = {
  args: {
    categoryFilter: "safety-compliance",
    subCategoryFilter: "",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Filter panel with only category selected, showing all sub-categories available.",
      },
    },
  },
};

export const NoFiltersSelected: Story = {
  args: {
    categoryFilter: "",
    subCategoryFilter: "",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Filter panel with no filters selected, showing all categories and disabled sub-category dropdown.",
      },
    },
  },
};

export const ResponsiveLayout: Story = {
  render: () => (
    <Box sx={{ backgroundColor: "#f5f7fa", p: 3, borderRadius: 1 }}>
      <Box sx={{ mb: 3 }}>
        <h3>Desktop Layout</h3>
        <AlertsFilterPanel
          categoryFilter="safety-compliance"
          subCategoryFilter="Personal Protective Equipment (PPE) Detection"
        />
      </Box>

      <Box sx={{ maxWidth: "600px" }}>
        <h3>Tablet Layout</h3>
        <AlertsFilterPanel
          categoryFilter="security-monitoring"
          subCategoryFilter="Camera Tampering or Offline Detection"
        />
      </Box>

      <Box sx={{ maxWidth: "400px", mt: 3 }}>
        <h3>Mobile Layout</h3>
        <AlertsFilterPanel
          categoryFilter="workforce-monitoring"
          subCategoryFilter=""
        />
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: "Filter panel responsive behavior on different screen sizes.",
      },
    },
  },
};
