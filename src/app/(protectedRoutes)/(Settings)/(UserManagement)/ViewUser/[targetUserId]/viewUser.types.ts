export type DropdownOption = {
  id: string;
  label: string;
  orgAppRoleId?: string;
  roleId?: string;
  org_app_role_id: string;
  role_id: {
    role_id: string;
    name: string;
  };
  siteId: string;
  departmentId: string;
  name: string;
};

export interface UserInformationProps {
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
  updatedBy: string | null;
  imagePath: string | null;
  image: string | null;
  videoPath: string | null;
  documentPath: string | null;
  userId: string;
  first_name: string;
  last_name: string;
  email: string;
  phoneNumber: string | null;
  department: string | null;
  site_id: string | null;
  employee_id: string | null;
  orgAppRoleId?: string;
  roleId?: string;
  username: string;
  userName?: string;
  site?: string;
}

export interface ViewUserPageProps {
  readonly userInformationData: Readonly<UserInformationProps> | null;
}
export interface BackendUser {
  userId: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  role?: string; 
  image_path?:string
}

export interface BackendRole {
  orgAppRole: {
    role_id: {
      name: string;
    };
  };
}


export interface UserOverviewResponse {
  status: string;
  message: string;
  data: BackendUser[];
}
export interface BackendRoleResponse {
  status: string;
  message: string;
  data: BackendRole[];
}
