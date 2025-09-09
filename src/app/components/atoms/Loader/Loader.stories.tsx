import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import Loader from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Atoms/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**SCOUT Loader Component**

A flexible loading spinner component for the SCOUT application. Features:
- Customizable size and colors
- Optional loading messages
- Determinate and indeterminate progress variants
- Consistent styling with Material-UI theme
- Responsive design

**Usage**: Use this component to indicate loading states throughout the SCOUT application, such as data fetching, authentication, or page transitions.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 20, max: 100, step: 10 },
      description: 'Size of the loading spinner in pixels',
    },
    message: {
      control: 'text',
      description: 'Loading message to display below spinner',
    },
    showMessage: {
      control: 'boolean',
      description: 'Whether to show the loading message',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit'],
      description: 'Color theme of the spinner',
    },
    variant: {
      control: 'select',
      options: ['indeterminate', 'determinate'],
      description: 'Progress indicator variant',
    },
    value: {
      control: { type: 'number', min: 0, max: 100, step: 5 },
      description: 'Progress value (0-100) for determinate variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default loading spinner with standard size and primary color.',
      },
    },
  },
};

export const WithoutMessage: Story = {
  args: {
    showMessage: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading spinner without text message.',
      },
    },
  },
};

export const CustomMessage: Story = {
  args: {
    message: 'Processing SCOUT data...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading spinner with custom message.',
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    size: 24,
    message: 'Loading',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small loading spinner for inline use.',
      },
    },
  },
};

export const LargeSize: Story = {
  args: {
    size: 60,
    message: 'Initializing SCOUT system...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large loading spinner for full-page loading states.',
      },
    },
  },
};

export const DifferentColors: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
      <Loader color="primary" message="Primary" size={32} />
      <Loader color="secondary" message="Secondary" size={32} />
      <Loader color="success" message="Success" size={32} />
      <Loader color="warning" message="Warning" size={32} />
      <Loader color="error" message="Error" size={32} />
      <Loader color="info" message="Info" size={32} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading spinners in different color themes.',
      },
    },
  },
};

export const DeterminateProgress: Story = {
  args: {
    variant: 'determinate',
    value: 65,
    message: 'Processing... 65%',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress indicator with specific completion percentage.',
      },
    },
  },
};

export const FullPageLoader: Story = {
  render: () => (
    <Box
      sx={{
        width: '100%',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f7fa',
        borderRadius: 2,
        border: '1px solid #e0e0e0',
      }}
    >
      <Loader
        size={50}
        message="Loading SCOUT Dashboard..."
        color="primary"
      />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of full-page loading state as used in SCOUT application.',
      },
    },
  },
};

export const InlineLoader: Story = {
  render: () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
      <span>Fetching alerts</span>
      <Loader size={20} showMessage={false} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Small inline loader for use within other components.',
      },
    },
  },
};