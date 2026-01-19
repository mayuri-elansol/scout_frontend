export interface Feature {
  feature_id: string; // match backend exactly
  name: string;
  description: string;
}

export interface Role {
  role_id: string;
  name: string;
  can_delete: boolean;
}

export interface RoleFeature {
  role_feature_id: string;
  role: Role;
  feature: Feature;
}

export interface GetFeaturesByOrgApiResponse {
  status: string;
  message: string;
  data: {
    status: string;
    message: string;
    data: Feature[];
  };
}

export interface AssignFeaturesApiResponse {
  status: string;
  message: string;
  data: {
    status: string;
    message: string;
    data: RoleFeature[];
  };
}
