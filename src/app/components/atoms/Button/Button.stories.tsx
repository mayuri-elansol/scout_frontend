import type { Meta, StoryObj } from '@storybook/react';
import ScoutButton from './Button';
import { Download as DownloadIcon, Clear as ClearIcon, Add, Search } from '@mui/icons-material';

const meta: Meta<typeof ScoutButton> = {
  title: 'Components/Atoms/Button',
  component: ScoutButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'SCOUT Button component with multiple variants for different use cases. Primary for main actions, secondary for secondary actions, download for CSV exports, and clear for filter resets.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'download', 'clear'],
      description: 'Button style variant',
    },
    children: {
      control: 'text',
      description: 'Button text content',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    startIcon: {
      control: false,
      description: 'Icon to display before text',
    },
    endIcon: {
      control: false,
      description: 'Icon to display after text',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary button used for main actions throughout the application.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary button used for secondary actions with outlined style.',
      },
    },
  },
};

export const Download: Story = {
  args: {
    variant: 'download',
    children: 'Download Report',
    startIcon: <DownloadIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Download button specifically used for CSV export functionality.',
      },
    },
  },
};

export const Clear: Story = {
  args: {
    variant: 'clear',
    children: 'Clear Filters',
    startIcon: <ClearIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Clear button used for resetting filters with red styling.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state for any button variant.',
      },
    },
  },
};

export const WithIcons: Story = {
  args: {
    variant: 'primary',
    children: 'Add New Item',
    startIcon: <Add />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with start icon for enhanced visual communication.',
      },
    },
  },
};

export const SearchButton: Story = {
  args: {
    variant: 'secondary',
    children: 'Search',
    endIcon: <Search />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary button with end icon for search functionality.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <ScoutButton variant="primary">Primary</ScoutButton>
      <ScoutButton variant="secondary">Secondary</ScoutButton>
      <ScoutButton variant="download" startIcon={<DownloadIcon />}>Download</ScoutButton>
      <ScoutButton variant="clear" startIcon={<ClearIcon />}>Clear</ScoutButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants shown together for comparison.',
      },
    },
  },
};