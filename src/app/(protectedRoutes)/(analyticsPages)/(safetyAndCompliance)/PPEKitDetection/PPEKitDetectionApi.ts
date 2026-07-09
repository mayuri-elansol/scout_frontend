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
  }),
});

export const { useLazyGetPPEKitDetectionKpiDataQuery } = ppeKitDetectionApi;
