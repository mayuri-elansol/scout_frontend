// import type { Meta, StoryObj } from '@storybook/react';
import type { Meta, StoryObj } from "@storybook/react-vite";
import ScoutInput from "./Input";

const meta: Meta<typeof ScoutInput> = {
  title: "Components/Atoms/Input",
  component: ScoutInput,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "SCOUT Input component for form fields with consistent styling. Includes search variant with integrated search icon.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "search"],
      description: "Input style variant",
    },
    label: {
      control: "text",
      description: "Input label",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    value: {
      control: "text",
      description: "Input value",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    error: {
      control: "boolean",
      description: "Error state",
    },
    helperText: {
      control: "text",
      description: "Helper text below input",
    },
    required: {
      control: "boolean",
      description: "Required field indicator",
    },
    width: {
      control: "text",
      description: "Input width (CSS value)",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "Input type",
    },
    onChange: {
      action: "changed",
      description: "Change handler",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    label: "Employee Name",
    placeholder: "Enter employee name",
  },
  parameters: {
    docs: {
      description: {
        story: "Default input field used for form data entry.",
      },
    },
  },
};

export const Search: Story = {
  args: {
    variant: "search",
    placeholder: "Search employees...",
    width: "300px",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Search input with integrated search icon for filtering and searching.",
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    variant: "default",
    label: "Zone Name",
    placeholder: "e.g., Production Floor A",
    helperText: "Enter the name of the monitoring zone",
  },
  parameters: {
    docs: {
      description: {
        story: "Input with label and helper text for form guidance.",
      },
    },
  },
};

export const Required: Story = {
  args: {
    variant: "default",
    label: "Alert Title",
    placeholder: "Enter alert title",
    required: true,
    helperText: "This field is required",
  },
  parameters: {
    docs: {
      description: {
        story: "Required input field with validation indicator.",
      },
    },
  },
};

export const Error: Story = {
  args: {
    variant: "default",
    label: "Email Address",
    value: "invalid-email",
    error: true,
    helperText: "Please enter a valid email address",
  },
  parameters: {
    docs: {
      description: {
        story: "Input in error state with error message.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    variant: "default",
    label: "System Status",
    value: "Online",
    disabled: true,
    helperText: "This field is read-only",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled input field for read-only data.",
      },
    },
  },
};

export const DifferentTypes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "300px",
      }}
    >
      <ScoutInput label="Text Input" placeholder="Enter text" type="text" />
      <ScoutInput label="Email Input" placeholder="Enter email" type="email" />
      <ScoutInput
        label="Password Input"
        placeholder="Enter password"
        type="password"
      />
      <ScoutInput
        label="Number Input"
        placeholder="Enter number"
        type="number"
      />
      <ScoutInput variant="search" placeholder="Search anything..." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different input types and variants shown together.",
      },
    },
  },
};
