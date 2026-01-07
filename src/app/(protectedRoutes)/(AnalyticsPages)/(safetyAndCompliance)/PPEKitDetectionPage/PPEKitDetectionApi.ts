import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import {
  PpeCsvReportRequest,
  PpeSingleReportRequest,
} from "./PPEKitDetection.types";
import { rtkAPIToast } from "@/utils/rtkAPIToast";
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

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage:
            "PPE detection single report PDF downloaded successfully.",
          errorMessage:
            "Failed to download the PPE detection single report PDF.",
          duration: 4000,
        });
      },
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

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage:
            "PPE detection detailed CSV report downloaded successfully.",
          errorMessage:
            "Failed to download the PPE detection detailed CSV report.",
          duration: 4000,
        });
      },
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage:
            "PPE detailed report has been downloaded successfully.",
          errorMessage:
            "Failed to download the PPE detailed report. Please try again.",
          duration: 4000,
        });
      },
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
