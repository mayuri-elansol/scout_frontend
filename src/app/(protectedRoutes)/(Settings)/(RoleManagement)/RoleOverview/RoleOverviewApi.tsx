import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";

export const roleOverviewApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    roleOverview: builder.mutation<{ status: string; message: string; data?: any; error?: string }, 
                                { tenantId: string; userId: string;  }>({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getList}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["RoleOverview"], 
    }),
  }),
});

export const { useRoleOverviewMutation } = roleOverviewApi;
