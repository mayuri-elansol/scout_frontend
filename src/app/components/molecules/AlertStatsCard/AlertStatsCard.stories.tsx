import type { Meta, StoryObj } from '@storybook/react';
import { Box, Grid } from '@mui/material';
import AlertStatsCard from './AlertStatsCard';

const meta: Meta<typeof AlertStatsCard> = {
  title: 'Components/Molecules/AlertStatsCard',
  component: AlertStatsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**SCOUT Alert Statistics Card**

Displays alert statistics with color-coded indicators used in the System Alerts page. Features:
- Color-coded borders and values
- Hover effects
- Flexible sizing options
- Used for showing alert counts by priority/status

**Project Usage**: Used in the Alerts page to display alert statistics (Total, Active, Critical, High, Medium, Low priority alerts).
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ 
        backgroundColor: '#f5f7fa', 
        p: 2, 
        borderRadius: 1,
        maxWidth: '200px', // Match project sizing - approximately 1/6 of container width
      }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    value: {
      control: 'text',
      description: 'The statistic value to display',
    },
    label: {
      control: 'text',
      description: 'The label describing the statistic',
    },
    color: {
      control: 'color',
      description: 'Color for the value text',
    },
    borderColor: {
      control: 'color',
      description: 'Color for the card border',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TotalAlerts: Story = {
  args: {
    value: '10',
    label: 'Total Alerts',
    color: '#666',
    borderColor: '#e0e0e0',
  },
  parameters: {
    docs: {
      description: {
        story: 'Total alerts count card as it appears in the Alerts page.',
      },
    },
  },
};

export const ActiveAlerts: Story = {
  args: {
    value: '2',
    label: 'Active Alerts',
    color: '#f44336',
    borderColor: '#f44336',
  },
  parameters: {
    docs: {
      description: {
        story: 'Active alerts count with red color coding.',
      },
    },
  },
};

export const CriticalAlerts: Story = {
  args: {
    value: '2',
    label: 'Critical',
    color: '#d32f2f',
    borderColor: '#d32f2f',
  },
  parameters: {
    docs: {
      description: {
        story: 'Critical priority alerts count.',
      },
    },
  },
};

export const HighPriorityAlerts: Story = {
  args: {
    value: '3',
    label: 'High Priority',
    color: '#ff9800',
    borderColor: '#ff9800',
  },
  parameters: {
    docs: {
      description: {
        story: 'High priority alerts count with orange color.',
      },
    },
  },
};

export const AlertsGrid: Story = {
  render: () => (
    <Box sx={{ backgroundColor: '#f5f7fa', p: 3, borderRadius: 1, width: '100%', minWidth: '1200px' }}>
      {/* Match exact project implementation - single row layout */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{xs:2}} >
          <AlertStatsCard
            value="10"
            label="Total Alerts"
            color="#666"
            borderColor="#e0e0e0"
          />
        </Grid>
        <Grid size={{xs:2}}>
          <AlertStatsCard
            value="2"
            label="Active Alerts"
            color="#f44336"
            borderColor="#f44336"
          />
        </Grid>
        <Grid size={{xs:2}}>
          <AlertStatsCard
            value="2"
            label="Critical"
            color="#d32f2f"
            borderColor="#d32f2f"
          />
        </Grid>
        <Grid size={{xs:2}}>
          <AlertStatsCard
            value="3"
            label="High Priority"
            color="#ff9800"
            borderColor="#ff9800"
          />
        </Grid>
        <Grid size={{xs:2}}>
          <AlertStatsCard
            value="3"
            label="Medium"
            color="#ffa726"
            borderColor="#ffa726"
          />
        </Grid>
        <Grid size={{xs:2}}>
          <AlertStatsCard
            value="2"
            label="Low Priority"
            color="#4caf50"
            borderColor="#4caf50"
          />
        </Grid>
      </Grid>
    </Box>
  ),
  decorators: [], // Override the default decorator for grid layout
  parameters: {
    docs: {
      description: {
        story: 'Complete alert statistics grid as it appears in the SCOUT Alerts page.',
      },
    },
  },
};

export const SizeVariants: Story = {
  render: () => (
    <Box sx={{ backgroundColor: '#f5f7fa', p: 3, borderRadius: 1, width: '100%', minWidth: '600px' }}>
      <Grid container spacing={2}>
        <Grid size={{xs:4}}>
          <AlertStatsCard
            value="5"
            label="Small"
            color="#666"
            borderColor="#e0e0e0"
            size="small"
          />
        </Grid>
        <Grid size={{xs:4}}>
          <AlertStatsCard
            value="10"
            label="Medium"
            color="#666"
            borderColor="#e0e0e0"
            size="medium"
          />
        </Grid>
        <Grid size={{xs:4}}>
          <AlertStatsCard
            value="15"
            label="Large"
            color="#666"
            borderColor="#e0e0e0"
            size="large"
          />
        </Grid>
      </Grid>
    </Box>
  ),
  decorators: [], // Override the default decorator for grid layout
  parameters: {
    docs: {
      description: {
        story: 'Different size variants of the alert stats card.',
      },
    },
  },
};
