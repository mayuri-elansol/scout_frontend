import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
// import { rtkAPIToast } from "@/app/utils/rtkAPIToast";
import { apiRoutes } from "@/constants/apiRoutes";
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
    getPpeKitDetectionSingleReportPdf: builder.mutation<Blob, any>({
      query: (body) => ({
        url: `${apiRoutes.ppeKitDetection.root}/${apiRoutes.ppeKitDetection.getPpeKitDetectionAnalyticsDownloadDetailedReportForSingleId}`,
        method: "POST",
        body,
        responseHandler: (response) => response.blob(), // ✅ IMPORTANT
      }),
    }),
    // getPpeKitDetectionDetailedCsvReport: builder.mutation<Blob, any>({
    //   query: (body) => ({
    //     url: `${apiRoutes.ppeKitDetection.root}/${apiRoutes.ppeKitDetection.getPpeKitDetectionAnalyticsDownloadDetailedCsvReport}`,
    //     method: "POST",
    //     body,
    //     responseHandler: (response) => response.blob(), // ✅ KEY
    //   }),
    // }),
    getPpeKitDetectionDetailedCsvReport: builder.mutation<any, any>({
      query: (body) => ({
        url: `${apiRoutes.ppeKitDetection.root}/${apiRoutes.ppeKitDetection.getPpeKitDetectionAnalyticsDownloadDetailedCsvReport}`,
        method: "POST",
        body,
        responseHandler: (response) => response.blob(), // browser receives blob
      }),

      transformResponse: async (blob: Blob) => {
        return {
          blob, // actual blob for download
          cacheSafe: "csv_downloaded", // serializable placeholder stored in Redux
        };
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
} = ppeKitDetectionApi;
