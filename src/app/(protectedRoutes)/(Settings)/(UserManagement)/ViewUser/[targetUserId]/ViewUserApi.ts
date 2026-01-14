import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { BackendRole, BackendRoleResponse, BackendUser } from "./viewUser.types";




export const viewUserApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetailsByUserId: builder.query<
      {
        statusCode: number;
        status: string;
        message: string;
        data?: BackendUser;
        error?: string;
      },
      { tenantId: string; userId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.userInformation.root}/${apiRoutes.userInformation.getById}`,
        method: "POST",
        body,
      }),
      providesTags: ["ViewUser"],
    }),
    getUserRole: builder.query<
      {
        statusCode: number;
        status: string;
        message: string;
        data?: BackendRoleResponse;
        error?: string;
      },
      { tenantId: string; userId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getUserRoleByUserId}`,
        method: "POST",
        body,
      }),
      providesTags: ["ViewUser"],
    }),
  }),
});

export const {
    useGetUserRoleQuery,
  useGetUserDetailsByUserIdQuery,   
} = viewUserApi;
