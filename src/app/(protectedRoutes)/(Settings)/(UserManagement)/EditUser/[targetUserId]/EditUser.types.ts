// ✅ Payload for editing a user
export interface EditUserPayload {
  orgAppRoleId: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  phone: string;
  userName: string;
  orgId: string;
  targetUserId: string;
}

// ✅ API response type (no unknown)
export interface ApiResponse<T = null> {
  status: string;
  message: string;
  data?: T;
  error?: string;
}

// ✅ Role information
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
// Inner data wrapper for user roles
export interface UserRoleResponse {
  status: string;
  message: string;
  data: { orgAppRole: OrgAppRole }[];
}