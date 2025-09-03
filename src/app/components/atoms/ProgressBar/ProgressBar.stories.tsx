import type { Meta, StoryObj } from '@storybook/react';
import ScoutProgressBar from './ProgressBar';

const meta: Meta<typeof ScoutProgressBar> = {
  title: 'Components/Atoms/ProgressBar',
  component: ScoutProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'SCOUT Progress Bar component for status visualization, capacity monitoring, and performance indicators. Used across the application for visual status representation (10+ instances).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value',
    },
    max: {
      control: { type: 'number', min: 1, max: 1000, step: 1 },
      description: 'Maximum value',
    },
    variant: {
      control: 'select',
      options: ['status', 'capacity', 'performance', 'default'],
      description: 'Progress bar variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Progress bar size',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show status label',
    },
    showPercentage: {
      control: 'boolean',
      description: 'Show percentage value',
    },
    label: {
      control: 'text',
      description: 'Custom label text',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'info'],
      description: 'Progress bar color (auto if not set)',
    },
    animated: {
      control: 'boolean',
      description: 'Show animated loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PPECompliance: Story = {
  args: {
    value: 87,
    variant: 'status',
    label: 'PPE Compliance',
  },
  parameters: {
    docs: {
      description: {
        story: 'PPE compliance status with automatic color coding based on percentage.',
      },
    },
  },
};

export const CameraUptime: Story = {
  args: {
    value: 94,
    variant: 'performance',
    label: 'Camera Uptime',
    color: 'success',
  },
  parameters: {
    docs: {
      description: {
        story: 'Camera system uptime performance indicator.',
      },
    },
  },
};

export const ZoneCapacity: Story = {
  args: {
    value: 23,
    max: 50,
    variant: 'capacity',
    label: 'Zone Occupancy',
    color: 'info',
  },
  parameters: {
    docs: {
      description: {
        story: 'Zone capacity showing current vs maximum occupancy.',
      },
    },
  },
};

export const AlertResponseTime: Story = {
  args: {
    value: 45,
    variant: 'performance',
    label: 'Response Time Efficiency',
    color: 'warning',
  },
  parameters: {
    docs: {
      description: {
        story: 'Alert response time performance with warning color.',
      },
    },
  },
};

export const SystemHealth: Story = {
  args: {
    value: 98,
    variant: 'status',
    label: 'System Health',
    size: 'large',
  },
  parameters: {
    docs: {
      description: {
        story: 'Overall system health status with large size.',
      },
    },
  },
};

export const StorageUsage: Story = {
  args: {
    value: 1240,
    max: 2000,
    variant: 'capacity',
    label: 'Storage Usage (GB)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Storage capacity usage with current/max display.',
      },
    },
  },
};

export const CriticalAlert: Story = {
  args: {
    value: 15,
    variant: 'status',
    label: 'Security Level',
    color: 'error',
  },
  parameters: {
    docs: {
      description: {
        story: 'Critical security level with red error color.',
      },
    },
  },
};

export const LoadingState: Story = {
  args: {
    animated: true,
    label: 'Processing Data...',
    showPercentage: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated loading state for processing operations.',
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    value: 76,
    size: 'small',
    label: 'Compact Status',
    variant: 'status',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small progress bar for compact interfaces.',
      },
    },
  },
};

export const NoLabels: Story = {
  args: {
    value: 63,
    showLabel: false,
    showPercentage: false,
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar without labels for minimal display.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <ScoutProgressBar value={85} size="small" label="Small" />
      <ScoutProgressBar value={85} size="medium" label="Medium" />
      <ScoutProgressBar value={85} size="large" label="Large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available progress bar sizes shown together.',
      },
    },
  },
};

export const StatusLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <ScoutProgressBar value={95} variant="status" label="Excellent" />
      <ScoutProgressBar value={80} variant="status" label="Good" />
      <ScoutProgressBar value={60} variant="status" label="Fair" />
      <ScoutProgressBar value={35} variant="status" label="Poor" />
      <ScoutProgressBar value={15} variant="status" label="Critical" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different status levels with automatic color coding.',
      },
    },
  },
};