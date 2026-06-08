import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { OperationalInsightsDashboardResponse, ShiftType } from "./OperationalInsightsDashboard.types";
;

export const operationalDashboardApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // 🔹 KPI DATA (People Inside, Alerts, etc.)
    getOperationalDashboardData: builder.query<OperationalInsightsDashboardResponse[], { tenantId: string; startDate?: string; endDate?: string }>({
   // getOperationalDashboardData: builder.query<any, any>({
      query: (body) => ({
        url: `${apiRoutes.OperationalMonitoringDashboard.root}/${apiRoutes.OperationalMonitoringDashboard.getOperationalMonitoringDashboardAnalytics}`,
        method: "POST",
        body,
      }),
      providesTags: ["OperationalDashboardData"],
    }),

    // 🔹 SHIFT DATA
    getOrgShiftTimeData: builder.query<
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
  useLazyGetOperationalDashboardDataQuery,
  useGetOrgShiftTimeDataQuery,
} = operationalDashboardApi;