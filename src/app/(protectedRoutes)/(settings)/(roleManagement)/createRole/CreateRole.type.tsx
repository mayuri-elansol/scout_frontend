// types/createRole.ts

export interface OrgAppRole {
  org_app_role_id: string;
}

export interface CreateRoleInnerData {
  data: OrgAppRole;
  status: string;
  message: string;
}

export interface CreateRoleApiResponse {
  status: string;
  message: string;
  data: CreateRoleInnerData;
}
