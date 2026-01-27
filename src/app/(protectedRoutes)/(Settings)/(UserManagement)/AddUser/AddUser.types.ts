export interface ApiResponse<T> {
  status: string;
  message: string;
  data?: T;
  error?: string;
}
export interface OrgAppRole {
  org_app_role_id: string;
  createdAt: string;
  updatedAt: string;
  role_id: RoleInfo;
}
export interface RoleInfo {
  role_id: string;
  name: string;
}
