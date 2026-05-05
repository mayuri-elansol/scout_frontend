import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { ShiftType } from "../../(analyticsPages)/(SurveillanceMonitoring)/intrusionDetectionPage/IntrusionDetection.types";

export const surveillanceMonitoringDashboardApi =
  baseProtectedApi.injectEndpoints({
    endpoints: (builder) => ({
      getSurveillanceMonitoringDashboardKpiData: builder.query({
        query: (body) => ({
          url: `${apiRoutes.surveillanceMonitoringDashboard.root}/${apiRoutes.surveillanceMonitoringDashboard.getsurveillanceMonitoringDashboardAnalytics}`,
          method: "POST",
          body,
        }),
        providesTags: ["SurveillanceMonitoringDashboardKpi"],
      }),
      getOrgShiftTimeSurveillanceData: builder.query<
        ShiftType[],
        { tenantId: string }
      >({
        query: (body) => ({
          url: `${apiRoutes.authentication.root}/${apiRoutes.authentication.getOrgShiftTiming}`,
          method: "POST",
          body,
        }),
        providesTags: ["orgShiftTime"],
      }),
    }),
  });

export const {
  useLazyGetSurveillanceMonitoringDashboardKpiDataQuery,
  useGetOrgShiftTimeSurveillanceDataQuery,
} = surveillanceMonitoringDashboardApi;
