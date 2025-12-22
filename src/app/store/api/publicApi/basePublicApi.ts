import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const basePublicApi = createApi({
  reducerPath: "basePublicApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      "http://localhost:4001/api/v1",

    // ✅ Public APIs do NOT send auth headers
    credentials: "include",
  }),
  endpoints: () => ({}),
  tagTypes: ["Login",
    "ResetPassword"
  ],
});
