export interface RoleRow {
  org_app_role_id: string;
  createdAt: string;
  updatedAt: string;
  role_id: {
    role_id: string;
    name: string;
  };
}


export interface RoleSettingTableProps {
  rows: RoleRow[];
  roleName?: string;

  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;

  isDeleting: boolean;

  onView: (orgAppRoleId: string, roleId: string) => void;
  onEdit: (orgAppRoleId: string, roleId: string) => void;
  onDelete: (roleId: string) => void;
}
