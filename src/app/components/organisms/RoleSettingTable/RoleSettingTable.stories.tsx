import React from 'react';
import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs';

import RoleSettingTable from './RoleSettingTable';
import type { RoleRow } from './RoleSettingTable.types';

/* -------------------------------------------------------------------------- */
/*                                   MOCK DATA                                */
/* -------------------------------------------------------------------------- */

const mockRows: RoleRow[] = [
  {
    org_app_role_id: '1',
    role_id: { role_id: 'admin', name: 'Admin' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    org_app_role_id: '2',
    role_id: { role_id: 'manager', name: 'Manager' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    org_app_role_id: '3',
    role_id: { role_id: 'user', name: 'User' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];


/* -------------------------------------------------------------------------- */
/*                                   META                                     */
/* -------------------------------------------------------------------------- */

const meta: Meta<typeof RoleSettingTable> = {
  title: 'Components/RoleSettingTable',
  component: RoleSettingTable,
};

export default meta;

type Story = StoryObj<typeof RoleSettingTable>;

/* -------------------------------------------------------------------------- */
/*                                   TEMPLATE                                 */
/* -------------------------------------------------------------------------- */

const Template: Story['render'] = (args) => (
  <Box p={3} width="800px">
    <RoleSettingTable {...args} />
  </Box>
);

/* -------------------------------------------------------------------------- */
/*                                   STORIES                                  */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  render: Template,
  args: {
    rows: mockRows,
    roleName: 'Admin',
    canView: true,
    canEdit: true,
    canDelete: true,
    isDeleting: false,
    onView: (orgAppRoleId, roleId) =>
      alert(`View role: ${roleId} (orgAppRoleId: ${orgAppRoleId})`),
    onEdit: (orgAppRoleId, roleId) =>
      alert(`Edit role: ${roleId} (orgAppRoleId: ${orgAppRoleId})`),
    onDelete: (roleId) => alert(`Delete role: ${roleId}`),
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
    roleName: 'Manager',
    canView: true,
    canEdit: true,
    canDelete: true,
    isDeleting: false,
    onView: () => {},
    onEdit: () => {},
    onDelete: () => {},
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
