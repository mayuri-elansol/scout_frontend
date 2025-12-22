// LoginApi.ts
import { basePublicApi } from "@/app/store/api/publicApi/basePublicApi";
import { apiRoutes } from "@/constants/apiRoutes";

export const loginApi = basePublicApi.injectEndpoints({
  endpoints: (builder) => ({
    getLoginData: builder.mutation<
      { data: { tokenOrError: string } },
      { userName: string; password: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.authentication.root}${apiRoutes.authentication.login}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Login"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetLoginDataMutation } = loginApi;
