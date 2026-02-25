import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { ShiftType } from "../../(analyticsPages)/(SurveillanceMonitoring)/intrusionDetectionPage/IntrusionDetection.types";

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
    getCameraTamperingDashboardKpiData: builder.query({
      query: (body) => ({
        url: `${apiRoutes.CameraTamperingDashboard.root}/${apiRoutes.CameraTamperingDashboard.getCameraTamperingDashboardAnalyticsKpi}`,
        method: "POST",
        body,
      }),
      providesTags: ["CameraTamperingDashboardKpi"],
    }),
    getOrgShiftTimeDashboardData: builder.query<
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
  useLazyGetMainDashboardKpiDataQuery,
  useLazyGetCameraTamperingDashboardKpiDataQuery,
  useGetOrgShiftTimeDashboardDataQuery,
} = MainDashboardApi;
