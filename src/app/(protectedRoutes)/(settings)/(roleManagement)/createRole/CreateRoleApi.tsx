
import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { CreateRoleApiResponse } from "./CreateRole.type";

export const createRoleApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation<
      CreateRoleApiResponse,
      {
        tenantId: string;
        userId: string;
        roleName: string;
        description: string;
      }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.add}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["CreateRole"],
    }),
  }),
});

export const { useCreateRoleMutation } = createRoleApi;
