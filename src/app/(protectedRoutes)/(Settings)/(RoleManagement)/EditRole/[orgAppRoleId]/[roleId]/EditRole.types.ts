/* ---------- FEATURE ---------- */
export interface Feature {
  feature_id: string;
  name: string;
  description: string;
}

/* ---------- ROLE FEATURE (assigned feature shape) ---------- */
export interface RoleFeature {
  feature_id?: string;
  feature?: Feature;
}

/* ---------- API RESPONSE WRAPPERS ---------- */
export interface ApiInnerResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: ApiInnerResponse<T>;
}
