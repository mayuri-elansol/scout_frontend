import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { ShiftType } from "./fallDetection.types";

export const fallLaydownDetectionApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getFallLaydownDetectionKpiData: builder.query({
      query: (body) => ({
        url: `${apiRoutes.fallLaydownDetection.root}/${apiRoutes.fallLaydownDetection.getFallLaydownDetectionAnalyticsKpi}`,
        method: "POST",
        body,
      }),
      providesTags: ["FallLaydownDetectionKpi"],
    }),

    getFallLaydownDetectionZoneViolations: builder.query({
      query: (body: {
        tenantId: string;
        startDate?: string;
        endDate?: string;
      }) => ({
        url: `${apiRoutes.fallLaydownDetection.root}/${apiRoutes.fallLaydownDetection.getFallLaydownDetectionAnalyticsZoneViolations}`,
        method: "POST",
        body,
      }),
      providesTags: ["FallLaydownDetectionZoneViolations"],
    }),

    getFallLaydownDetectionDetailedReport: builder.query({
      query: (body) => ({
        url: `${apiRoutes.fallLaydownDetection.root}/${apiRoutes.fallLaydownDetection.getFallLaydownDetectionAnalyticsDetailedReport}`,
        method: "POST",
        body,
      }),
      providesTags: ["FallLaydownDetectionDetailedReport"],
    }),

    getFallLaydownDetectionRecentViolations: builder.query({
      query: (body) => ({
        url: `${apiRoutes.fallLaydownDetection.root}/${apiRoutes.fallLaydownDetection.getFallLaydownDetectionAnalyticsRecentViolations}`,
        method: "POST",
        body,
      }),
      providesTags: ["FallLaydownDetectionRecentViolations"],
    }),

    getOrgShiftTimeFallLaydownData: builder.query<
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
  useGetOrgShiftTimeFallLaydownDataQuery,
  useLazyGetFallLaydownDetectionKpiDataQuery,
  useLazyGetFallLaydownDetectionZoneViolationsQuery,
  useLazyGetFallLaydownDetectionDetailedReportQuery,
  useLazyGetFallLaydownDetectionRecentViolationsQuery,
} = fallLaydownDetectionApi;
