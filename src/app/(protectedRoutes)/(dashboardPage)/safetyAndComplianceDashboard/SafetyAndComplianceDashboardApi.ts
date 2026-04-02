import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { ShiftType } from "../../(analyticsPages)/(SurveillanceMonitoring)/intrusionDetectionPage/IntrusionDetection.types";

export const safetyAndComplianceDashboardApi = baseProtectedApi.injectEndpoints(
  {
    endpoints: (builder) => ({
      getSafetyAndComplianceDashboardKpiData: builder.query({
        query: (body) => ({
          url: `${apiRoutes.SafetyMonitoringDashboard.root}/${apiRoutes.SafetyMonitoringDashboard.getSafetyMonitoringDashboardData}`,
          method: "POST",
          body,
        }),
        providesTags: ["SafetyAndComplianceDashboardKpi"],
      }),
      getOrgShiftTimeSafetyData: builder.query<
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
  },
);

export const {
  useLazyGetSafetyAndComplianceDashboardKpiDataQuery,
  useGetOrgShiftTimeSafetyDataQuery,
} = safetyAndComplianceDashboardApi;
