import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { ApiResponse, OrgAppRole, RoleFeature } from "./ViewRole.types";

export const viewRoleApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------- GET ROLE LIST ---------- */
    getRole: builder.query<
      ApiResponse<OrgAppRole[]>,
      { tenantId: string; userId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getList}`,
        method: "POST",
        body,
      }),
      providesTags: ["ViewRole"],
    }),

    /* ---------- GET FEATURES OF ROLE ---------- */
    getFeatureOfRoleByRoleId: builder.mutation<
      ApiResponse<RoleFeature[]>,
      { tenantId: string; roleId: string; orgAppRoleId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getFeaturesOfRoleByRoleId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ViewRole"],
    }),
  }),
});

export const {
  useGetRoleQuery,
  useGetFeatureOfRoleByRoleIdMutation,
} = viewRoleApi;
