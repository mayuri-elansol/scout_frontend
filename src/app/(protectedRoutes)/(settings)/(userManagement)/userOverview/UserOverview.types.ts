export interface ApiResponse<T = null> {
  status: string;
  message: string;
  data?: T;
  error?: string;
}export interface UserRoleResponse {
  status: string;
  message: string;
  data: { orgAppRole: OrgAppRole }[];
}
export interface RoleInfo {
  role_id: string;
  name: string;
}

// ✅ OrgAppRole type
export interface OrgAppRole {
  org_app_role_id: string;
  createdAt: string;
  updatedAt: string;
  role_id: RoleInfo;
}