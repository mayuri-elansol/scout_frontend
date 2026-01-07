import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseProtectedApi = createApi({
  reducerPath: "protectedApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4001/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: [
    "PPEKpi",
    "PpeZoneViolations",
    "PpeRecentViolations",
    "PpeDetailedReport",
    "PpeReportCsv",
    'CreateRole',
    'AddFeatures',
    'AssignFeatureToRole',
    'RoleOverview'
  ],
});
