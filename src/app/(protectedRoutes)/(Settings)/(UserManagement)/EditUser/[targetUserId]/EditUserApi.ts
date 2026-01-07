import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";


export interface AddUserPayload {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  phone: string;
  userName: string;
  password: string;
  orgId: string;
}

export const editUserApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    editUser: builder.mutation<
      { status: string; message: string; data?: any; error?: string },
      { payload: AddUserPayload; image?: File }
    >({
      query: ({ payload, image }) => {
        const formData = new FormData();

        formData.append("payload", JSON.stringify(payload));

        if (image) {
          formData.append("image", image);
        }

        return {
          url: `${apiRoutes.userInformation.root}/${apiRoutes.userInformation.editById}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["EditUser"],
    }),
  }),
});

export const { useEditUserMutation } = editUserApi;