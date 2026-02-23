import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { ShiftType } from "../../(analyticsPages)/(SurveillanceMonitoring)/intrusionDetectionPage/IntrusionDetection.types";

export const WorkforceMonitoringDashboardApi = baseProtectedApi.injectEndpoints(
  {
    endpoints: (builder) => ({
      getWorkforceMonitoringDashboardKpiData: builder.query({
        query: (body) => ({
          url: `${apiRoutes.WorkforceMonitoringDashboard.root}/${apiRoutes.WorkforceMonitoringDashboard.getWorkforceMonitoringDashboardAnalyticsgraphs}`,
          method: "POST",
          body,
        }),
        providesTags: ["WorkforceMonitoringDashboardKpi"],
      }),
      getOrgShiftTimeWorkforceData: builder.query<
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
  useLazyGetWorkforceMonitoringDashboardKpiDataQuery,
  useGetOrgShiftTimeWorkforceDataQuery,
} = WorkforceMonitoringDashboardApi;
