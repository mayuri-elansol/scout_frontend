export interface LoginApiResponse {
  status: string;
  message: string;
  data: {
    tokenOrError: string;
  };
}


export interface StoredUser {
  userId: string;
  userName: string;
  role: string;
  org_id: string;
}


export interface Role {
  appId: string;
  roleId: string;
  appName: string;
  roleName: string;
  userRoleId: string;
}

export interface License {
  appId: string;
  features: string[];
  expiresOn: string;
  licenseId: string;
  licenseTypeId: string;
  licenseTypeName: string;
}
export interface JwtPayload {
  userId: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  roles: Role[];           
  licenses: License[];     
  features?: string[];
  org_id: string;
  sid?: string;
  iat?: number;
  exp?: number;
  iss?: string;
}
