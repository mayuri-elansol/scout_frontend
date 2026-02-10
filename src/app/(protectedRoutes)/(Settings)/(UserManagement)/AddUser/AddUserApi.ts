

import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { ApiResponse } from "./AddUser.types";

export interface AddUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  phone: string;
  userName: string;
  password: string;
  orgId: string;
  orgAppRoleId:string
}

export const addUserApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation<
      ApiResponse<null>,
      { payload: AddUserPayload; image?: File }
    >({
      query: ({ payload, image }) => {
        const formData = new FormData();
        formData.append("payload", JSON.stringify(payload));

        if (image) {
          formData.append("image", image);
        }

        return {
          url: `${apiRoutes.authentication.root}/${apiRoutes.authentication.addUser}`,
          method: "POST",
          body: formData,
        };
      },

      
      invalidatesTags: ["AddUser"],
    }),
  }),
});

export const { useAddUserMutation } = addUserApi;
