import React from 'react';
import { Box } from '@mui/material';
import RoleSettingTable from './RoleSettingTable';
import type { Meta, StoryObj } from '@storybook/react';

// Mock data
const mockRows = [
  {
    org_app_role_id: '1',
    role_id: { role_id: 'admin', name: 'Admin', can_delete: false },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    org_app_role_id: '2',
    role_id: { role_id: 'manager', name: 'Manager', can_delete: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    org_app_role_id: '3',
    role_id: { role_id: 'user', name: 'User', can_delete: true },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const meta: Meta<typeof RoleSettingTable> = {
  title: 'Components/RoleSettingTable',
  component: RoleSettingTable,
};

export default meta;
type Story = StoryObj<typeof RoleSettingTable>;

// Template function
const Template = (args: any) => (
  <Box p={3} width="800px">
    <RoleSettingTable {...args} />
  </Box>
);

// ✅ Stories

export const Default: Story = {
  render: Template,
  args: {
    rows: mockRows,
    roleName: 'Admin',
    canView: true,
    canEdit: true,
    canDelete: true,
    isDeleting: false,
    onView: (orgAppRoleId: string, roleId: string) =>
      alert(`View role: ${roleId} (orgAppRoleId: ${orgAppRoleId})`),
    onEdit: (orgAppRoleId: string, roleId: string) =>
      alert(`Edit role: ${roleId} (orgAppRoleId: ${orgAppRoleId})`),
    onDelete: (roleId: string) => alert(`Delete role: ${roleId}`),
  },
};

export const NoPermissions: Story = {
  render: Template,
  args: {
    rows: mockRows,
    roleName: 'Admin',
    canView: false,
    canEdit: false,
    canDelete: false,
    isDeleting: false,
    onView: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const SelfRoleEditDeleteDisabled: Story = {
  render: Template,
  args: {
    rows: mockRows,
    roleName: 'Manager', // logged-in as manager
    canView: true,
    canEdit: true,
    canDelete: true,
    isDeleting: false,
    onView: (orgAppRoleId: string, roleId: string) =>
      alert(`View role: ${roleId} (orgAppRoleId: ${orgAppRoleId})`),
    onEdit: (orgAppRoleId: string, roleId: string) =>
      alert(`Edit role: ${roleId} (orgAppRoleId: ${orgAppRoleId})`),
    onDelete: (roleId: string) => alert(`Delete role: ${roleId}`),
  },
};

export const DeletingState: Story = {
  render: Template,
  args: {
    rows: mockRows,
    roleName: 'Admin',
    canView: true,
    canEdit: true,
    canDelete: true,
    isDeleting: true, 
    onView: () => {},
    onEdit: () => {},
    onDelete: () => {},
  },
};
