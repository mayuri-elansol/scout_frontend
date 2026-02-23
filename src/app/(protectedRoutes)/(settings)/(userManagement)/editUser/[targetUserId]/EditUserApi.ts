import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { ApiResponse, EditUserPayload, UserRoleResponse } from "./EditUser.types";



export const editUserApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    editUser: builder.mutation<ApiResponse<null>, { payload: EditUserPayload; image?: File }>({
      query: ({ payload, image }) => {
        const formData = new FormData();

        formData.append("tenantId", payload.orgId);
        formData.append("userId", payload.targetUserId);

        formData.append(
          "userInformation",
          JSON.stringify({
            userId: payload.targetUserId,
            first_name: payload.firstName,
            last_name: payload.lastName,
            email: payload.email,
            employee_id: payload.employeeId,
            phoneNumber: payload.phone,
            userName: payload.userName,
          })
        );

        if (image) formData.append("image", image);

        return {
          url: `${apiRoutes.userInformation.root}/${apiRoutes.userInformation.editById}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["EditUser"],
    }),

    getUserById: builder.query<ApiResponse<{ 
      first_name: string;
      last_name: string;
      email: string;
      employee_id: string;
      phoneNumber: string;
      userName: string;
      image_path?: string;
    }>, { tenantId: string; userId: string }>({
      query: (body) => ({
        url: `${apiRoutes.userInformation.root}/${apiRoutes.userInformation.getById}`,
        method: "POST",
        body,
      }),
      providesTags: ["EditUser"],
    }),

      getUserRoleByUserId: builder.query<ApiResponse<UserRoleResponse>, { userId: string; orgId: string }>({

      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getUserRoleByUserId}`,
        method: "POST",
        body,
      }),
      providesTags: ["EditUser"],
    }),
  }),
});

export const {
  useEditUserMutation,
  useGetUserByIdQuery,
  useGetUserRoleByUserIdQuery,
} = editUserApi;
