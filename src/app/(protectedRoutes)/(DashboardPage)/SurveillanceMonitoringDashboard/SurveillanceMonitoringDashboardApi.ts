import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";

export const surveillanceMonitoringDashboardApi =
  baseProtectedApi.injectEndpoints({
    endpoints: (builder) => ({
      getSurveillanceMonitoringDashboardKpiData: builder.query({
        query: (body) => ({
          url: `${apiRoutes.surveillanceMonitoringDashboard.root}/${apiRoutes.surveillanceMonitoringDashboard.getsurveillanceMonitoringDashboardAnalyticsKpi}`,
          method: "POST",
          body,
        }),
        providesTags: ["SurveillanceMonitoringDashboardKpi"],
      }),
    }),
  });

export const { useLazyGetSurveillanceMonitoringDashboardKpiDataQuery } =
  surveillanceMonitoringDashboardApi;
