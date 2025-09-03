import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import AlertsFilterPanel from './AlertsFilterPanel';

const meta: Meta<typeof AlertsFilterPanel> = {
  title: 'Components/Organisms/AlertsFilterPanel',
  component: AlertsFilterPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**SCOUT Alerts Filter Panel**

Filter and search panel used in the System Alerts page. Features:
- Text search with search icon
- Severity level dropdown filter
- Category dropdown filter
- Export functionality
- Refresh button
- Responsive grid layout

**Project Usage**: Used in the Alerts page to provide search and filtering capabilities for the alerts list.
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
      }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    searchQuery: {
      control: 'text',
      description: 'Current search query',
    },
    severityFilter: {
      control: 'select',
      options: ['', 'critical', 'high', 'medium', 'low'],
      description: 'Current severity filter',
    },
    categoryFilter: {
      control: 'select',
      options: ['', 'safety', 'security', 'workforce', 'operational'],
      description: 'Current category filter',
    },
    onSearchChange: {
      action: 'search-changed',
      description: 'Search query change handler',
    },
    onSeverityChange: {
      action: 'severity-changed',
      description: 'Severity filter change handler',
    },
    onCategoryChange: {
      action: 'category-changed',
      description: 'Category filter change handler',
    },
    onExport: {
      action: 'export-clicked',
      description: 'Export button click handler',
    },
    onRefresh: {
      action: 'refresh-clicked',
      description: 'Refresh button click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default filter panel as it appears in the SCOUT Alerts page.',
      },
    },
  },
};

export const WithFiltersApplied: Story = {
  args: {
    searchQuery: 'hard hat',
    severityFilter: 'critical',
    categoryFilter: 'safety',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter panel with search query and filters applied.',
      },
    },
  },
};

export const SecurityFocus: Story = {
  args: {
    searchQuery: 'unauthorized',
    severityFilter: 'critical',
    categoryFilter: 'security',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter panel configured for security-related alerts.',
      },
    },
  },
};

export const AllSeverities: Story = {
  args: {
    searchQuery: '',
    severityFilter: '',
    categoryFilter: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter panel showing all alerts without any filters applied.',
      },
    },
  },
};

export const ResponsiveLayout: Story = {
  render: () => (
    <Box sx={{ backgroundColor: '#f5f7fa', p: 3, borderRadius: 1 }}>
      <Box sx={{ mb: 3 }}>
        <h3>Desktop Layout</h3>
        <AlertsFilterPanel
          searchQuery="emergency"
          severityFilter="high"
          categoryFilter="safety"
        />
      </Box>
      
      <Box sx={{ maxWidth: '600px' }}>
        <h3>Tablet Layout</h3>
        <AlertsFilterPanel
          searchQuery="security"
          severityFilter="critical"
          categoryFilter="security"
        />
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Filter panel responsive behavior on different screen sizes.',
      },
    },
  },
};
