// LoginApi.ts
import { basePublicApi } from "@/app/store/api/publicApi/basePublicApi";
import { apiRoutes } from "@/constants/apiRoutes";

export const loginApi = basePublicApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔐 LOGIN
    getLoginData: builder.mutation<
      { data: { tokenOrError: string } },
      { userName: string; password: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.authentication.root}${apiRoutes.authentication.login}`,
        method: "POST",
        body,
      }),
    }),

    // ✅ VALIDATE TOKEN
    validateToken: builder.mutation<
      { valid: boolean }, 
      { token: string; orgId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.authentication.root}${apiRoutes.authentication.validateToken}`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLoginDataMutation,
  useValidateTokenMutation,
} = loginApi;
