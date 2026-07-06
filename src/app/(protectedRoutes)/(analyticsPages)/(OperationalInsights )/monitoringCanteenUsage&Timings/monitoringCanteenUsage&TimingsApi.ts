import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";

import { rtkAPIToast } from "@/utils/rtkAPIToast";
import { CanteenUsageDetailedReportResponse, CanteenUsageReportRequest, CanteenUsageResponse, CanteenUsageSingleReportRequest, ShiftType,  } from "./monitoringCanteenUsage&Timings.types";

export const canteenUsageApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({

    getCanteenUsageDetailedReport: builder.query<
      CanteenUsageDetailedReportResponse,
      Record<string, unknown>
    >({
      query: (body) => ({
        url: `${apiRoutes.monitoringCanteenUsageAndTimings.root}/${apiRoutes.monitoringCanteenUsageAndTimings.getMonitoringCanteenUsageAndTimingsAnalyticsDetailedReport}`,
        method: "POST",
        body,
      }),
      providesTags: ["CanteenUsageDetailedReport"],
    }),

    getCanteenUsageData: builder.query<
      CanteenUsageResponse,
      { tenantId: string; startDate?: string; endDate?: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.monitoringCanteenUsageAndTimings.root}/${apiRoutes.monitoringCanteenUsageAndTimings.getMonitoringCanteenUsageAndTimingsAnalyticsData}`,
        method: "POST",
        body,
      }),
      providesTags: ["CanteenUsageData"],
    }),

    getCanteenUsageDetailedPdfReport: builder.mutation<
      null,
      CanteenUsageReportRequest
    >({
      query: (body) => ({
        url: `${apiRoutes.monitoringCanteenUsageAndTimings.root}/${apiRoutes.monitoringCanteenUsageAndTimings.getMonitoringCanteenUsageAndTimingsAnalyticsDownloadDetailedPdfReport}`,
        method: "POST",
        body,
        responseHandler: async (response) => {
          const blob = await response.blob();

          const url = globalThis.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `Canteen-Usage-Detailed-Report-${Date.now()}.pdf`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          globalThis.URL.revokeObjectURL(url);

          return null; // Must return something serializable for Redux
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage:
            "Canteen usage detailed report has been downloaded successfully.",
          errorMessage:
            "Failed to download the canteen usage detailed report. Please try again.",
          duration: 5000,
        });
      },
    }),

    getCanteenUsageDetailedCsvReport: builder.mutation<
      null,
      CanteenUsageReportRequest
    >({
      query: (body) => ({
        url: `${apiRoutes.monitoringCanteenUsageAndTimings.root}/${apiRoutes.monitoringCanteenUsageAndTimings.getMonitoringCanteenUsageAndTimingsAnalyticsDownloadDetailedCSVReport}`,
        method: "POST",
        body,
        responseHandler: async (response) => {
          const blob = await response.blob();

          const url = globalThis.URL.createObjectURL(blob);
          const a = document.createElement("a");

          a.href = url;
          a.download = `Canteen-Usage-Report-${Date.now()}.csv`;
          document.body.appendChild(a);
          a.click();

          a.remove();
          globalThis.URL.revokeObjectURL(url);

          return null;
        },
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage:
            "Canteen usage detailed CSV report downloaded successfully.",
          errorMessage:
            "Failed to download the canteen usage detailed CSV report.",
          duration: 4000,
        });
      },
    }),

    getCanteenUsageSingleReportPdf: builder.mutation<
      null,
      CanteenUsageSingleReportRequest
    >({
      query: (body) => ({
        url: `${apiRoutes.monitoringCanteenUsageAndTimings.root}/${apiRoutes.monitoringCanteenUsageAndTimings.getMonitoringCanteenUsageAndTimingsAnalyticsDownloadDetailedReportForSingleId}`,
        method: "POST",
        body,
        responseHandler: async (response) => {
          const blob = await response.blob();

          const url = globalThis.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `Canteen-Usage-Single-Report-${Date.now()}.pdf`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          globalThis.URL.revokeObjectURL(url);

          return null;
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await rtkAPIToast(queryFulfilled, dispatch, {
          successMessage:
            "Canteen usage single PDF report downloaded successfully.",
          errorMessage:
            "Failed to download the canteen usage single PDF report.",
          duration: 4000,
        });
      },
    }),

    getOrgShiftTimeCanteenUsageData: builder.query<
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
  useGetOrgShiftTimeCanteenUsageDataQuery,
  useLazyGetCanteenUsageDetailedReportQuery,
  useLazyGetCanteenUsageDataQuery,
  useGetCanteenUsageDetailedPdfReportMutation,
  useGetCanteenUsageDetailedCsvReportMutation,
  useGetCanteenUsageSingleReportPdfMutation,
} = canteenUsageApi;