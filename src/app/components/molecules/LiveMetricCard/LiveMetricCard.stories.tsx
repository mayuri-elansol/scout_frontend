import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from '@mui/material';
import LiveMetricCard from './LiveMetricCard';

const meta = {
  title: 'Components/Molecules/LiveMetricCard',
  component: LiveMetricCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Live metric card component used to display key performance indicators on the Live Streaming page. Features colored borders and large value display.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: { 
      control: 'text',
      description: 'The metric value to display (e.g., "87.5%", "234")',
    },
    label: { 
      control: 'text',
      description: 'Label describing what the metric represents',
    },
    color: { 
      control: 'color',
      description: 'Color for the value text',
    },
    borderColor: { 
      control: 'color',
      description: 'Border color (defaults to same as color)',
    },
  },
  args: {
    value: '87.5%',
    label: 'PPE Compliance Rate',
    color: '#ff9800',
  },
} satisfies Meta<typeof LiveMetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PPECompliance: Story = {
  args: {
    value: '87.5%',
    label: 'PPE Compliance Rate',
    color: '#ff9800',
  },
};

export const ActiveViolations: Story = {
  args: {
    value: '3',
    label: 'Active Violations',
    color: '#f44336',
  },
};

export const PeopleDetected: Story = {
  args: {
    value: '234',
    label: 'People Detected',
    color: '#4caf50',
  },
};

export const NoHelmetDetected: Story = {
  args: {
    value: '12',
    label: 'No Helmet Detected',
    color: '#f44336',
  },
};

export const CustomColors: Story = {
  args: {
    value: '95.2%',
    label: 'System Uptime',
    color: '#2196f3',
    borderColor: '#1976d2',
  },
};

export const LargeNumber: Story = {
  args: {
    value: '1,247',
    label: 'Total Detections Today',
    color: '#9c27b0',
  },
};

export const LiveStreamingMetrics: Story = {
  decorators: [
    (Story) => (
      <Grid container spacing={3} sx={{ maxWidth: '800px', p: 2 }}>
        <Grid  size={{xs:12,sm:6,md:3}}>
          <LiveMetricCard
            value="87.5%"
            label="PPE Compliance Rate"
            color="#ff9800"
          />
        </Grid>
        <Grid size={{xs:12,sm:6,md:3}}>
          <LiveMetricCard
            value="3"
            label="Active Violations"
            color="#f44336"
          />
        </Grid>
        <Grid size={{xs:12,sm:6,md:3}}>
          <LiveMetricCard
            value="234"
            label="People Detected"
            color="#4caf50"
          />
        </Grid>
        <Grid size={{xs:12,sm:6,md:3}}>
          <LiveMetricCard
            value="12"
            label="No Helmet Detected"
            color="#f44336"
          />
        </Grid>
      </Grid>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Live metrics grid as shown on the Live Streaming page.',
      },
    },
  },
};