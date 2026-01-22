import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";



export interface BackendUser {
  userId: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  role?: string; 
}
export interface UserOverviewResponse {
  status: string;
  message: string;
  data: BackendUser[];
}
export interface DeleteUserPayload {
  tenantId: string;
  userId: string;        // logged-in user
  targetUserId: string;  // user to delete
}
export const userOverviewApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserOverview: builder.query<
      {
        statusCode: number;
        status: string;
        message: string;
        data?: BackendUser[];
        error?: string;
      },
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
      invalidatesTags: ["UserList"],
    }),
  }),
});

export const {
  useGetUserOverviewQuery,
  useDeleteUserMutation,
} = userOverviewApi;
