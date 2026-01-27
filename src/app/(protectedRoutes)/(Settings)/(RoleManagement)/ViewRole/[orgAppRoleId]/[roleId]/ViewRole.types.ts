/* ---------- FEATURE ---------- */
export interface Feature {
  feature_id: string;
  name: string;
  description: string;
}

/* ---------- ROLE FEATURE MAPPING ---------- */
export interface RoleFeature {
  role_feature_id: string;
  feature: Feature;
}

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

/* ---------- STANDARD API RESPONSE ---------- */
export interface ApiResponse<T> {
  status: string;
  message: string;
  data: {
    status: string;
    message: string;
    data: T;
  };
}
