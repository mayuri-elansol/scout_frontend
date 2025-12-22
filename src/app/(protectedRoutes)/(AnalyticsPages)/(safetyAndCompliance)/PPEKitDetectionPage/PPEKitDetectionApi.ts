import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import {
  PpeCsvReportRequest,
  PpeSingleReportRequest,
} from "./PPEKitDetection.types";
export const ppeKitDetectionApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getPPEKitDetectionKpiData: builder.query({
      query: (body) => ({
        url: `${apiRoutes.ppeKitDetection.root}/${apiRoutes.ppeKitDetection.getPpeKitDetectionAnalyticsKpi}`,
        method: "POST",
        body,
      }),
      providesTags: ["PPEKpi"],
    }),

    getPPEKitDetectionZoneViolations: builder.query({
      query: (body: {
        tenantId: string;
        startDate?: string;
        endDate?: string;
      }) => ({
        url: `${apiRoutes.ppeKitDetection.root}/${apiRoutes.ppeKitDetection.getPpeKitDetectionAnalyticsZoneViolations}`,
        method: "POST",
        body,
      }),
      providesTags: ["PpeZoneViolations"],
    }),

    getPpeKitDetectionDetailedReport: builder.query({
      query: (body) => ({
        url: `${apiRoutes.ppeKitDetection.root}/${apiRoutes.ppeKitDetection.getPpeKitDetectionAnalyticsDetailedReport}`,
        method: "POST",
        body,
      }),
      providesTags: ["PpeDetailedReport"],
    }),

    getPpeKitDetectionRecentViolations: builder.query({
      query: (body) => ({
        url: `${apiRoutes.ppeKitDetection.root}/${apiRoutes.ppeKitDetection.getPpeKitDetectionAnalyticsRecentViolations}`,
        method: "POST",
        body,
      }),
      providesTags: ["PpeRecentViolations"],
    }),
    getPpeKitDetectionSingleReportPdf: builder.mutation<
      Blob,
      PpeSingleReportRequest
    >({
      query: (body) => ({
        url: `${apiRoutes.ppeKitDetection.root}/${apiRoutes.ppeKitDetection.getPpeKitDetectionAnalyticsDownloadDetailedReportForSingleId}`,
        method: "POST",
        body,
        responseHandler: (response) => response.blob(),
      }),
    }),
    getPpeKitDetectionDetailedCsvReport: builder.mutation<
      Blob,
      PpeCsvReportRequest
    >({
      query: (body) => ({
        url: `${apiRoutes.ppeKitDetection.root}/${apiRoutes.ppeKitDetection.getPpeKitDetectionAnalyticsDownloadDetailedCsvReport}`,
        method: "POST",
        body,
        responseHandler: (response) => response.blob(),
      }),
    }),
    getPpeKitDetectionDetailedPdfReport: builder.mutation<
      Blob,
      PpeCsvReportRequest
    >({
      query: (body) => ({
        url: `${apiRoutes.ppeKitDetection.root}/${apiRoutes.ppeKitDetection.getPpeKitDetectionAnalyticsDownloadDetailedPdfReport}`,
        method: "POST",
        body,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useLazyGetPPEKitDetectionKpiDataQuery,
  useLazyGetPPEKitDetectionZoneViolationsQuery,
  useLazyGetPpeKitDetectionDetailedReportQuery,
  useLazyGetPpeKitDetectionRecentViolationsQuery,
  useGetPpeKitDetectionSingleReportPdfMutation,
  useGetPpeKitDetectionDetailedCsvReportMutation,
  useGetPpeKitDetectionDetailedPdfReportMutation,
} = ppeKitDetectionApi;
