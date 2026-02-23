// ForgotPasswordApi.ts
import { basePublicApi } from "@/app/store/api/publicApi/basePublicApi";
import { apiRoutes } from "@/constants/apiRoutes";

interface ForgotPasswordResponse {
  status: string;
  message: string;
  data: {
    user_id: string;
    user_name: string;
    email: string;
    sid: string;
  };
}

interface ForgotPasswordRequest {
  userName: string;
}

export const forgotPasswordApi = basePublicApi.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: `${apiRoutes.authentication.root}${apiRoutes.authentication.forgotPassword}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation } = forgotPasswordApi;
