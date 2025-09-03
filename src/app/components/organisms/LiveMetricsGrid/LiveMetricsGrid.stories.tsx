import type { Meta, StoryObj } from '@storybook/react';
import LiveMetricsGrid from './LiveMetricsGrid';

const meta = {
  title: 'Components/Organisms/LiveMetricsGrid',
  component: LiveMetricsGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Live metrics grid component that displays multiple LiveMetricCard components in a responsive grid layout. Used at the top of the Live Streaming page.',
      },
    },
  },
  argTypes: {
    metrics: { 
      control: 'object',
      description: 'Array of metrics to display in the grid',
    },
    spacing: { 
      control: 'number',
      description: 'Grid spacing between metric cards',
    },
  },
  args: {
    metrics: [
      {
        value: '87.5%',
        label: 'PPE Compliance Rate',
        color: '#ff9800',
      },
      {
        value: '3',
        label: 'Active Violations',
        color: '#f44336',
      },
      {
        value: '234',
        label: 'People Detected',
        color: '#4caf50',
      },
      {
        value: '12',
        label: 'No Helmet Detected',
        color: '#f44336',
      },
    ],
    spacing: 3,
  },
} satisfies Meta<typeof LiveMetricsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const LiveStreamingMetrics: Story = {
  args: {
    metrics: [
      {
        value: '87.5%',
        label: 'PPE Compliance Rate',
        color: '#ff9800',
        borderColor: '#ff9800',
      },
      {
        value: '3',
        label: 'Active Violations',
        color: '#f44336',
        borderColor: '#f44336',
      },
      {
        value: '234',
        label: 'People Detected',
        color: '#4caf50',
        borderColor: '#4caf50',
      },
      {
        value: '12',
        label: 'No Helmet Detected',
        color: '#f44336',
        borderColor: '#f44336',
      },
    ],
  },
};

export const HighPerformance: Story = {
  args: {
    metrics: [
      {
        value: '98.2%',
        label: 'PPE Compliance Rate',
        color: '#4caf50',
        borderColor: '#4caf50',
      },
      {
        value: '0',
        label: 'Active Violations',
        color: '#4caf50',
        borderColor: '#4caf50',
      },
      {
        value: '456',
        label: 'People Detected',
        color: '#2196f3',
        borderColor: '#2196f3',
      },
      {
        value: '1',
        label: 'No Helmet Detected',
        color: '#ff9800',
        borderColor: '#ff9800',
      },
    ],
  },
};

export const CriticalAlerts: Story = {
  args: {
    metrics: [
      {
        value: '64.3%',
        label: 'PPE Compliance Rate',
        color: '#f44336',
        borderColor: '#f44336',
      },
      {
        value: '15',
        label: 'Active Violations',
        color: '#f44336',
        borderColor: '#f44336',
      },
      {
        value: '89',
        label: 'People Detected',
        color: '#2196f3',
        borderColor: '#2196f3',
      },
      {
        value: '32',
        label: 'No Helmet Detected',
        color: '#f44336',
        borderColor: '#f44336',
      },
    ],
  },
};

export const TightSpacing: Story = {
  args: {
    spacing: 1,
  },
};

export const WideSpacing: Story = {
  args: {
    spacing: 4,
  },
};

export const TwoMetrics: Story = {
  args: {
    metrics: [
      {
        value: '92.1%',
        label: 'Overall Safety Score',
        color: '#4caf50',
        borderColor: '#4caf50',
      },
      {
        value: '7',
        label: 'Total Incidents Today',
        color: '#ff9800',
        borderColor: '#ff9800',
      },
    ],
  },
};

export const SixMetrics: Story = {
  args: {
    metrics: [
      {
        value: '87.5%',
        label: 'PPE Compliance Rate',
        color: '#ff9800',
      },
      {
        value: '3',
        label: 'Active Violations',
        color: '#f44336',
      },
      {
        value: '234',
        label: 'People Detected',
        color: '#4caf50',
      },
      {
        value: '12',
        label: 'No Helmet Detected',
        color: '#f44336',
      },
      {
        value: '98.7%',
        label: 'Camera Uptime',
        color: '#2196f3',
      },
      {
        value: '24/7',
        label: 'Monitoring Status',
        color: '#4caf50',
      },
    ],
  },
};