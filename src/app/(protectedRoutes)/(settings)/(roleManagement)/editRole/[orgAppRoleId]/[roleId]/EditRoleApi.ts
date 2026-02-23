


import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import {
  ApiResponse,
  Feature,
  RoleFeature,
} from "./EditRole.types";

export const EditRoleApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------- FETCH ROLE FEATURES ---------- */
    getFeaturesOfRoleByRoleId: builder.query<
      ApiResponse<RoleFeature[]>,
      { tenantId: string; roleId: string; orgAppRoleId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getFeaturesOfRoleByRoleId}`,
        method: "POST",
        body,
      }),
      providesTags: (_, __, arg) => [
        { type: "EditRole", id: arg.orgAppRoleId },
      ],
    }),

    /* ---------- FETCH ALL FEATURES ---------- */
    getFeaturesByOrgId: builder.query<
      ApiResponse<Feature[]>,
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
      ApiResponse<RoleFeature[]>,
      { tenantId: string; orgAppRoleId: string; featureIds: string[] }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.assignFeaturesToRoleByRoleId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, arg) => [
        { type: "EditRole", id: arg.orgAppRoleId },
      ],
    }),

    /* ---------- UNMAP FEATURES ---------- */
    unmappedFeatureFromRoleByRoleId: builder.mutation<
      ApiResponse<RoleFeature[]>,
      { tenantId: string; orgAppRoleId: string; featureIds: string[] }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.unmapFeatureFromRoleByRoleId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_, __, arg) => [
        { type: "EditRole", id: arg.orgAppRoleId },
      ],
    }),
  }),
});

export const {
  useGetFeaturesOfRoleByRoleIdQuery,
  useGetFeaturesByOrgIdQuery,
  useAssignFeatureToRoleMutation,
  useUnmappedFeatureFromRoleByRoleIdMutation,
} = EditRoleApi;
