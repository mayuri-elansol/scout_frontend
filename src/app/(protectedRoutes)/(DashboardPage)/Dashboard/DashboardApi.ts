// import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
// import { apiRoutes } from "@/constants/apiRoutes";

// export const mainDashboardApi = baseProtectedApi.injectEndpoints({
//   endpoints: (builder) => ({
//     getMainDashboardKpiData: builder.query({
//       query: (body) => ({
//         url: `${apiRoutes.MainDashboard.root}/${apiRoutes.MainDashboard.getMainDashboardAnalyticsKpi}`,
//         method: "POST",
//         body,
//       }),
//       providesTags: ["MainDashboardKpi"],
//     }),
//   }),
// });

// export const { useLazyGetMainDashboardKpiDataQuery } = mainDashboardApi;

import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";

export const MainDashboardApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getMainDashboardKpiData: builder.query({
      query: (body) => ({
        url: `${apiRoutes.MainDashboard.root}/${apiRoutes.MainDashboard.getMainDashboardAnalyticsKpi}`,
        method: "POST",
        body,
      }),
      providesTags: ["MainDashboardKpi"],
    }),
  }),
});

export const { useLazyGetMainDashboardKpiDataQuery } = MainDashboardApi;
