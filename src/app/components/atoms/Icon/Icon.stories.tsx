import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ScoutIconName } from "./Icon";

import ScoutIcon from "./Icon";

const meta: Meta<typeof ScoutIcon> = {
  title: "Components/Atoms/Icon",
  component: ScoutIcon,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "SCOUT Icon component using Material-UI icons with consistent sizing and coloring. Used throughout the application (50+ instances).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: [
        "Shield",
        "Warning",
        "Visibility",
        "People",
        "DirectionsCar",
        "Schedule",
        "Place",
        "Download",
        "Clear",
        "Search",
        "Add",
        "Home",
        "BarChart",
        "Settings",
        "VideoCall",
        "Description",
        "TrendingUp",
        "Security",
        "LocalFireDepartment",
        "Circle",
        "ExpandMore",
        "ExpandLess",
        "ChevronRight",
        "Menu",
      ],
      description: "Material-UI icon name",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large", "xlarge"],
      description: "Icon size",
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
        "disabled",
        "action",
        "inherit",
      ],
      description: "Icon color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Shield: Story = {
  args: {
    name: "Shield",
    size: "medium",
    color: "primary",
  },
  parameters: {
    docs: {
      description: {
        story: "Shield icon commonly used for PPE and safety features.",
      },
    },
  },
};

export const Warning: Story = {
  args: {
    name: "Warning",
    size: "medium",
    color: "warning",
  },
  parameters: {
    docs: {
      description: {
        story: "Warning icon for alerts and critical notifications.",
      },
    },
  },
};

export const People: Story = {
  args: {
    name: "People",
    size: "medium",
    color: "info",
  },
  parameters: {
    docs: {
      description: {
        story: "People icon for employee and personnel features.",
      },
    },
  },
};

export const Visibility: Story = {
  args: {
    name: "Visibility",
    size: "medium",
    color: "secondary",
  },
  parameters: {
    docs: {
      description: {
        story: "Visibility icon for camera and monitoring features.",
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    name: "Settings",
    size: "small",
    color: "action",
  },
  parameters: {
    docs: {
      description: {
        story: "Small icon size (16px) for compact interfaces.",
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    name: "Security",
    size: "large",
    color: "error",
  },
  parameters: {
    docs: {
      description: {
        story: "Large icon size (24px) for prominent features.",
      },
    },
  },
};

export const ExtraLargeSize: Story = {
  args: {
    name: "LocalFireDepartment",
    size: "xlarge",
    color: "warning",
  },
  parameters: {
    docs: {
      description: {
        story: "Extra large icon size (32px) for headers and hero sections.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <div style={{ textAlign: "center" }}>
        <ScoutIcon name="Shield" size="small" color="primary" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>Small</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ScoutIcon name="Shield" size="medium" color="primary" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>Medium</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ScoutIcon name="Shield" size="large" color="primary" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>Large</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ScoutIcon name="Shield" size="xlarge" color="primary" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>XLarge</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available icon sizes shown together.",
      },
    },
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      <div style={{ textAlign: "center" }}>
        <ScoutIcon name="Circle" size="large" color="primary" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>Primary</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ScoutIcon name="Circle" size="large" color="secondary" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>Secondary</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ScoutIcon name="Circle" size="large" color="success" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>Success</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ScoutIcon name="Circle" size="large" color="error" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>Error</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ScoutIcon name="Circle" size="large" color="warning" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>Warning</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ScoutIcon name="Circle" size="large" color="info" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>Info</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ScoutIcon name="Circle" size="large" color="disabled" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>Disabled</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ScoutIcon name="Circle" size="large" color="action" />
        <div style={{ fontSize: "12px", marginTop: "4px" }}>Action</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available icon colors shown together.",
      },
    },
  },
};

export const CommonIcons: Story = {
  render: () => {
    // Explicit typing to keyof typeof MuiIcons
    const icons: { name: ScoutIconName; label: string }[] = [
      { name: "Shield", label: "Shield" },
      { name: "Warning", label: "Warning" },
      { name: "Visibility", label: "Visibility" },
      { name: "People", label: "People" },
      { name: "DirectionsCar", label: "Car" },
      { name: "Schedule", label: "Schedule" },
      { name: "Place", label: "Place" },
      { name: "Download", label: "Download" },
      { name: "Search", label: "Search" },
      { name: "Add", label: "Add" },
      { name: "Home", label: "Home" },
      { name: "BarChart", label: "Chart" },
      { name: "Settings", label: "Settings" },
      { name: "VideoCall", label: "Video" },
      { name: "Security", label: "Security" },
      { name: "LocalFireDepartment", label: "Fire" },
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          gap: "16px",
        }}
      >
        {icons.map(({ name, label }) => (
          <div key={name} style={{ textAlign: "center" }}>
            <ScoutIcon name={name} size="large" color="primary" />
            <div style={{ fontSize: "12px", marginTop: "4px" }}>{label}</div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Common icons used throughout the SCOUT application.",
      },
    },
  },
};
