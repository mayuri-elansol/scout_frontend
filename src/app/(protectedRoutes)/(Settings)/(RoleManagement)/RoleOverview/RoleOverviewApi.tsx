import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
const roleOverviewApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    roleOverview: builder.query<
      { status: string; message: string; data?: any },
      { tenantId: string; userId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getList}`,
        method: "POST",
        body,
      }),
      providesTags: ["RoleOverview"],
    }),
    deleteRoleById: builder.mutation<
      { status: string; message: string; data?: any; error?: string },
      { tenantId: string; userId: string; roleId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.deleteById}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["RoleOverview"],
    }),
  }),
});

export const { useRoleOverviewQuery,useDeleteRoleByIdMutation } = roleOverviewApi;
