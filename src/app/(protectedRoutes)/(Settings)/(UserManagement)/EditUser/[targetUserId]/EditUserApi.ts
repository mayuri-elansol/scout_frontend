import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";

export interface EditUserPayload {
  orgAppRoleId: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  phone: string;
  userName: string;
  orgId: string;
  targetUserId: string;
}

export const editUserApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    editUser: builder.mutation<
      { status: string; message: string; data?: any; error?: string },
      { payload: EditUserPayload; image?: File }
    >({
      query: ({ payload }) => ({
        url: `${apiRoutes.userInformation.root}/${apiRoutes.userInformation.editById}`,
        method: "POST",
        body: {
          tenantId: payload.orgId,
          userId: payload.targetUserId,
          userInformation: {
            userId: payload.targetUserId, // IMPORTANT
            first_name: payload.firstName,
            last_name: payload.lastName,
            email: payload.email,
            employee_id: payload.employeeId,
            phoneNumber: payload.phone,
            userName: payload.userName,
          },
        },
      }),

      invalidatesTags: ["EditUser"],
    }),

    getUserById: builder.query<
      { statusCode: number; status: string; message: string; data?: any },
      { tenantId: string; userId: string; targetUserId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.userInformation.root}/${apiRoutes.userInformation.getById}`,
        method: "POST",
        body,
      }),
    }),

    getUserRoleByUserId: builder.query<
      { statusCode: number; status: string; message: string; data?: any },
      { userId: string; orgId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getUserRoleByUserId}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useEditUserMutation,
  useGetUserByIdQuery,
  useGetUserRoleByUserIdQuery,
} = editUserApi;
