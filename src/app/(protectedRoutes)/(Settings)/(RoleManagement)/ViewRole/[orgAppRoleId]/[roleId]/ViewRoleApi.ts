import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";

export const createRoleApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getRole: builder.query<
      { status: string; message: string; data?: any },
      { tenantId: string; userId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getList}`,
        method: 'POST',
        body,
      }),
      providesTags: ['ViewRole'],
    }),
    getFeatureOfRoleByRoleId: builder.mutation<
      { status: string; message: string; data?: any; error?: string },
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

export const { useGetRoleQuery, useGetFeatureOfRoleByRoleIdMutation } = createRoleApi;
