import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { ApiResponse, UserRoleResponse } from "./UserOverview.types";



export interface BackendUser {
  userId: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  roleName?: string; 
}
export interface UserOverviewResponse {
  status: string;
  message: string;
  data: BackendUser[];
}




export interface PaginatedUsers {
  data: BackendUser[];
  total: number;
  page: number;
  limit: number;
}

export interface GetUserOverviewResponse {
  statusCode: number;
  status: string;
  message: string;
  data: PaginatedUsers;
}
export interface DeleteUserPayload {
  tenantId: string;
  userId: string;        // logged-in user
  targetUserId: string;  // user to delete
}
export const userOverviewApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
getUserOverview: builder.query<
  GetUserOverviewResponse,
  { tenantId: string; userId: string }
>({
      query: (body) => ({
        url: `${apiRoutes.userInformation.root}/${apiRoutes.userInformation.getList}`,
        method: "POST",
        body,
      }),
      providesTags: ["UserOverview","EditUser"],
    }),
      deleteUser: builder.mutation<
      { statusCode: number; status: string; message: string },
      DeleteUserPayload
    >({
      query: (body) => ({
        url: `${apiRoutes.userInformation.root}/${apiRoutes.userInformation.deleteById}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserOverview"],
    }),


        getUserRoleByUserId: builder.query<ApiResponse<UserRoleResponse>, { userId: string; orgId: string }>({
          query: (body) => ({
            url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getUserRoleByUserId}`,
            method: "POST",
            body,
          }),
          providesTags: ["UserOverview"],
        }),
  }),
});

export const {
  useGetUserOverviewQuery,
  useDeleteUserMutation,
  useGetUserRoleByUserIdQuery
} = userOverviewApi;
