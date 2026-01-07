export interface LoginApiResponse {
  status: string;
  message: string;
  data: {
    tokenOrError: string;
  };
}

export interface JwtPayload {
  userId: string;
  userName: string;
  roles: string;
  licenses: null;
  features?: string[];
  org_id: string;
  sid?: string;

}
export interface StoredUser {
  userId: string;
  userName: string;
  roles: string;
  org_id: string;
}
