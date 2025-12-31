import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";

export const featuresApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({

    /* ---------- FETCH FEATURES (QUERY) ---------- */
    getFeaturesByOrgId: builder.query<
      { status: string; message: string; data?: any; error?: string },
      { userId: string; orgId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getFeaturesByOrgId}`,
        method: "POST",
        body,
      }),
      providesTags: ["AddFeatures"],
    }),

    /* ---------- ASSIGN FEATURES (MUTATION) ---------- */
    assignFeatureToRole: builder.mutation<
      { status: string; message: string; data?: any; error?: string },
      {
        tenantId: string;
        orgAppRoleId: string;
        featureIds: string[];
      }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.assignFeaturesToRoleByRoleId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AddFeatures"],
    }),

  }),
});

export const {
  useGetFeaturesByOrgIdQuery,
  useAssignFeatureToRoleMutation,
} = featuresApi;
