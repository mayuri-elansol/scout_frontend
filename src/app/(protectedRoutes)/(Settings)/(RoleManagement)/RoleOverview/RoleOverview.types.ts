/* ---------- ROLE ---------- */
export interface RoleInfo {
  role_id: string;
  name: string;
}

/* ---------- ORG APP ROLE ---------- */
export interface OrgAppRole {
  org_app_role_id: string;
  createdAt: string;
  updatedAt: string;
  role_id: RoleInfo;
}

/* ---------- API RESPONSE ---------- */
export interface ApiResponse<T> {
  status: string;
  message: string;
  data: {
    status: string;
    message: string;
    data: T;
  };
}
