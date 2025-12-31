import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";

/* ---------- COMMON RESPONSE TYPE ---------- */
export interface ApiResponse<T = any> {
  status: string;
  message: string;
  data?: T;
  error?: string;
}

export const EditRoleApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------- FETCH ROLE FEATURES ---------- */
    getFeaturesOfRoleByRoleId: builder.query<
      ApiResponse<any>,
      { tenantId: string; roleId: string; orgAppRoleId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getFeaturesOfRoleByRoleId}`,
        method: "POST",
        body,
      }),
      providesTags: (result, error, arg) => [
        { type: "EditRole", id: arg.orgAppRoleId },
      ],
    }),

    /* ---------- FETCH ALL FEATURES ---------- */
    getFeaturesByOrgId: builder.query<
      ApiResponse<any>,
      { userId: string; orgId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getFeaturesByOrgId}`,
        method: "POST",
        body,
      }),
      providesTags: ["EditRole"],
    }),

    /* ---------- ASSIGN FEATURES ---------- */
    assignFeatureToRole: builder.mutation<
      ApiResponse<any>,
      { tenantId: string; orgAppRoleId: string; featureIds: string[] }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.assignFeaturesToRoleByRoleId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "EditRole", id: arg.orgAppRoleId },
      ],
    }),

    /* ---------- UNMAP FEATURES ---------- */
    unmappedFeatureFromRoleByRoleId: builder.mutation<
      ApiResponse<any>,
      { tenantId: string; orgAppRoleId: string; featureIds: string[] }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.unmapFeatureFromRoleByRoleId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "EditRole", id: arg.orgAppRoleId },
      ],
    }),
  }),
});

/* ---------- HOOK EXPORTS ---------- */
export const {
  useGetFeaturesOfRoleByRoleIdQuery,
  useGetFeaturesByOrgIdQuery,
  useAssignFeatureToRoleMutation,
  useUnmappedFeatureFromRoleByRoleIdMutation,
} = EditRoleApi;
