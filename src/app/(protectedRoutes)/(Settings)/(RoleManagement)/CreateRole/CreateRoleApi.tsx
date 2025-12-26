import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";

export const createRoleApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation<{ status: string; message: string; data?: any; error?: string }, 
                                { tenantId: string; userId: string; roleName: string,description:string }>({
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
