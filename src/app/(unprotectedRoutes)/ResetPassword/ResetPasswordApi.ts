// LoginApi.ts
import { basePublicApi } from "@/app/store/api/publicApi/basePublicApi";
import { apiRoutes } from "@/constants/apiRoutes";

export const resetPasswordApi = basePublicApi.injectEndpoints({
  endpoints: (builder) => ({
    getResetPasswordData: builder.mutation<
      { data: { tokenOrError: string } },
      { email: string; password: string; sid: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.authentication.root}${apiRoutes.authentication.resetPassword}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ResetPassword"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetResetPasswordDataMutation } = resetPasswordApi;
