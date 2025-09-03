import type { Meta, StoryObj } from '@storybook/react';
import FilterPanel from './FilterPanel';

const meta: Meta<typeof FilterPanel> = {
  title: 'Components/Molecules/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'SCOUT Filter Panel component for data filtering across analytics pages. Supports multiple filter types including select dropdowns, search inputs, and date ranges (7 instances).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Panel title',
    },
    filters: {
      control: 'object',
      description: 'Array of filter configurations',
    },
    collapsible: {
      control: 'boolean',
      description: 'Enable panel collapse/expand',
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Default expanded state',
    },
    showApplyButton: {
      control: 'boolean',
      description: 'Show apply filters button',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Show clear all button',
    },
    onFilterChange: {
      action: 'filter-changed',
      description: 'Filter change handler',
    },
    onClearAll: {
      action: 'clear-all',
      description: 'Clear all filters handler',
    },
    onApply: {
      action: 'apply-filters',
      description: 'Apply filters handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ppeFilters = [
  {
    id: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { value: '', label: 'All Statuses' },
      { value: 'active', label: 'Active' },
      { value: 'resolved', label: 'Resolved' },
      { value: 'investigating', label: 'Investigating' },
    ],
  },
  {
    id: 'priority',
    label: 'Priority',
    type: 'select' as const,
    options: [
      { value: '', label: 'All Priorities' },
      { value: 'critical', label: 'Critical' },
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' },
    ],
  },
  {
    id: 'zone',
    label: 'Zone',
    type: 'select' as const,
    options: [
      { value: '', label: 'All Zones' },
      { value: 'production-floor', label: 'Production Floor' },
      { value: 'warehouse', label: 'Warehouse' },
      { value: 'assembly-line', label: 'Assembly Line' },
    ],
  },
  {
    id: 'employee',
    label: 'Employee Search',
    type: 'search' as const,
    placeholder: 'Search by employee ID or name...',
  },
];

export const PPEViolationFilters: Story = {
  args: {
    title: 'PPE Violation Filters',
    filters: ppeFilters,
    collapsible: true,
    defaultExpanded: true,
    showApplyButton: false,
    showClearButton: true,
  },
};

export const SimpleFilters: Story = {
  args: {
    title: 'Quick Filters',
    filters: [
      {
        id: 'status',
        label: 'Status',
        type: 'select' as const,
        options: [
          { value: '', label: 'All' },
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ],
      },
      {
        id: 'search',
        label: 'Search',
        type: 'search' as const,
        placeholder: 'Search records...',
      },
    ],
    collapsible: false,
    showApplyButton: false,
    showClearButton: true,
  },
};

export const CollapsedByDefault: Story = {
  args: {
    title: 'Advanced Filters',
    filters: ppeFilters,
    collapsible: true,
    defaultExpanded: false,
    showApplyButton: true,
    showClearButton: true,
  },
};