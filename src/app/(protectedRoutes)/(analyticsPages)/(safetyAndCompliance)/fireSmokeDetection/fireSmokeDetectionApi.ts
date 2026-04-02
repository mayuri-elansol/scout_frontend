import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { ShiftType } from "./fireSmokeDetection.types";

export const fireSmokeDetectionApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getFireSmokeDetectionKpiData: builder.query({
      query: (body) => ({
        url: `${apiRoutes.fireSmokeDetection.root}/${apiRoutes.fireSmokeDetection.getFireSmokeDetectionAnalyticsKpi}`,
        method: "POST",
        body,
      }),
      providesTags: ["FireSmokeDetectionKpi"],
    }),

    getFireSmokeDetectionZoneViolations: builder.query({
      query: (body: {
        tenantId: string;
        startDate?: string;
        endDate?: string;
      }) => ({
        url: `${apiRoutes.fireSmokeDetection.root}/${apiRoutes.fireSmokeDetection.getFireSmokeDetectionAnalyticsZoneViolations}`,
        method: "POST",
        body,
      }),
      providesTags: ["FireSmokeDetectionZoneViolations"],
    }),

    getFireSmokeDetectionDetailedReport: builder.query({
      query: (body) => ({
        url: `${apiRoutes.fireSmokeDetection.root}/${apiRoutes.fireSmokeDetection.getFireSmokeDetectionAnalyticsDetailedReport}`,
        method: "POST",
        body,
      }),
      providesTags: ["FireSmokeDetectionDetailedReport"],
    }),

    getFireSmokeDetectionRecentViolations: builder.query({
      query: (body) => ({
        url: `${apiRoutes.fireSmokeDetection.root}/${apiRoutes.fireSmokeDetection.getFireSmokeDetectionAnalyticsRecentViolations}`,
        method: "POST",
        body,
      }),
      providesTags: ["FireSmokeDetectionRecentViolations"],
    }),

    getOrgShiftTimeFireSmokeData: builder.query<
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
  useGetOrgShiftTimeFireSmokeDataQuery,
  useLazyGetFireSmokeDetectionKpiDataQuery,
  useLazyGetFireSmokeDetectionZoneViolationsQuery,
  useLazyGetFireSmokeDetectionDetailedReportQuery,
  useLazyGetFireSmokeDetectionRecentViolationsQuery,
} = fireSmokeDetectionApi;
