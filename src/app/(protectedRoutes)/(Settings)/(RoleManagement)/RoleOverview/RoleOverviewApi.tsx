
import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { ApiResponse, OrgAppRole } from "./RoleOverview.types";

const roleOverviewApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    roleList: builder.query<
      ApiResponse<OrgAppRole[]>,
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
      ApiResponse<null>,
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

export const {
  useRoleListQuery,
  useDeleteRoleByIdMutation,
} = roleOverviewApi;
