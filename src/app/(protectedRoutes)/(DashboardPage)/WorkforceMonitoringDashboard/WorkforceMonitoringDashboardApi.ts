import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";

export const surveillanceMonitoringDashboardApi =
  baseProtectedApi.injectEndpoints({
    endpoints: (builder) => ({
      getWorkforceMonitoringDashboardKpiData: builder.query({
        query: (body) => ({
          url: `${apiRoutes.WorkforceMonitoringDashboard.root}/${apiRoutes.WorkforceMonitoringDashboard.getWorkforceMonitoringDashboardAnalyticsKpi}`,
          method: "POST",
          body,
        }),
        providesTags: ["WorkforceMonitoringDashboardKpi"],
      }),
    }),
  });

export const { useLazyGetWorkforceMonitoringDashboardKpiDataQuery } =
  surveillanceMonitoringDashboardApi;
