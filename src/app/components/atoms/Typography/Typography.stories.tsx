import type { Meta, StoryObj } from '@storybook/react';
import ScoutTypography from './Typography';

const meta: Meta<typeof ScoutTypography> = {
  title: 'Components/Atoms/Typography',
  component: ScoutTypography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'SCOUT Typography component with custom variants, weights, and colors. Used extensively throughout the application for consistent text styling (100+ instances).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'subtitle1', 'subtitle2',
        'body1', 'body2',
        'caption', 'overline',
        'pageTitle', 'sectionTitle', 'cardTitle', 'label', 'helperText'
      ],
      description: 'Typography variant',
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'text', 'muted', 'disabled'],
      description: 'Text color',
    },
    children: {
      control: 'text',
      description: 'Text content',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PageTitle: Story = {
  args: {
    variant: 'pageTitle',
    children: 'SCOUT Dashboard',
  },
  parameters: {
    docs: {
      description: {
        story: 'Page title variant used for main page headings.',
      },
    },
  },
};

export const SectionTitle: Story = {
  args: {
    variant: 'sectionTitle',
    children: 'Real-time Activity',
  },
  parameters: {
    docs: {
      description: {
        story: 'Section title variant used for content section headings.',
      },
    },
  },
};

export const CardTitle: Story = {
  args: {
    variant: 'cardTitle',
    children: 'PPE Compliance',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card title variant used for card and component titles.',
      },
    },
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Employee Name',
  },
  parameters: {
    docs: {
      description: {
        story: 'Label variant used for form labels and data labels.',
      },
    },
  },
};

export const HelperText: Story = {
  args: {
    variant: 'helperText',
    children: 'This field is required for system authentication',
  },
  parameters: {
    docs: {
      description: {
        story: 'Helper text variant used for form guidance and secondary information.',
      },
    },
  },
};

export const Body1Default: Story = {
  args: {
    variant: 'body1',
    children: 'This is the default body text used throughout the application for content and descriptions.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default body text variant for content.',
      },
    },
  },
};

export const Body2Secondary: Story = {
  args: {
    variant: 'body2',
    children: 'This is smaller body text used for secondary information and metadata.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary body text variant for additional information.',
      },
    },
  },
};

export const PrimaryColor: Story = {
  args: {
    variant: 'sectionTitle',
    color: 'primary',
    children: 'Primary Color Text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with primary color styling.',
      },
    },
  },
};

export const ErrorColor: Story = {
  args: {
    variant: 'body1',
    color: 'error',
    children: 'Error message or critical alert text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with error color styling for alerts and warnings.',
      },
    },
  },
};

export const SuccessColor: Story = {
  args: {
    variant: 'body1',
    color: 'success',
    children: 'Success message or positive status text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Text with success color styling for positive feedback.',
      },
    },
  },
};

export const MutedText: Story = {
  args: {
    variant: 'body2',
    color: 'muted',
    children: 'Muted text for secondary information',
  },
  parameters: {
    docs: {
      description: {
        story: 'Muted text styling for less important information.',
      },
    },
  },
};

export const BoldWeight: Story = {
  args: {
    variant: 'body1',
    weight: 'bold',
    children: 'Bold text for emphasis and importance',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bold font weight for emphasis.',
      },
    },
  },
};

export const LightWeight: Story = {
  args: {
    variant: 'h4',
    weight: 'light',
    children: 'Light weight heading',
  },
  parameters: {
    docs: {
      description: {
        story: 'Light font weight for subtle headings.',
      },
    },
  },
};

export const AllHeadings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ScoutTypography variant="h1">Heading 1</ScoutTypography>
      <ScoutTypography variant="h2">Heading 2</ScoutTypography>
      <ScoutTypography variant="h3">Heading 3</ScoutTypography>
      <ScoutTypography variant="h4">Heading 4</ScoutTypography>
      <ScoutTypography variant="h5">Heading 5</ScoutTypography>
      <ScoutTypography variant="h6">Heading 6</ScoutTypography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All heading variants shown together.',
      },
    },
  },
};

export const CustomVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <ScoutTypography variant="pageTitle">Page Title Variant</ScoutTypography>
      <ScoutTypography variant="sectionTitle">Section Title Variant</ScoutTypography>
      <ScoutTypography variant="cardTitle">Card Title Variant</ScoutTypography>
      <ScoutTypography variant="label">Label Variant</ScoutTypography>
      <ScoutTypography variant="helperText">Helper Text Variant</ScoutTypography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All custom SCOUT typography variants shown together.',
      },
    },
  },
};

export const ColorPalette: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <ScoutTypography variant="body1" color="primary">Primary Color</ScoutTypography>
      <ScoutTypography variant="body1" color="secondary">Secondary Color</ScoutTypography>
      <ScoutTypography variant="body1" color="success">Success Color</ScoutTypography>
      <ScoutTypography variant="body1" color="error">Error Color</ScoutTypography>
      <ScoutTypography variant="body1" color="warning">Warning Color</ScoutTypography>
      <ScoutTypography variant="body1" color="info">Info Color</ScoutTypography>
      <ScoutTypography variant="body1" color="text">Text Color</ScoutTypography>
      <ScoutTypography variant="body1" color="muted">Muted Color</ScoutTypography>
      <ScoutTypography variant="body1" color="disabled">Disabled Color</ScoutTypography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available text colors shown together.',
      },
    },
  },
};