
import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";
import { AssignFeaturesApiResponse, Feature, GetFeaturesByOrgApiResponse, RoleFeature } from "./AddFeatures.types";

export const featuresApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturesByOrgId: builder.query<Feature[], { userId: string; orgId: string }>({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getFeaturesByOrgId}`,
        method: "POST",
        body,
      }),
      transformResponse: (response: GetFeaturesByOrgApiResponse) => {
        // drill down to innermost array and return as Feature[]
        return response.data.data; 
      },
      providesTags: ["AddFeatures"],
    }),

    assignFeatureToRole: builder.mutation<RoleFeature[], { tenantId: string; orgAppRoleId: string; featureIds: string[] }>({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.assignFeaturesToRoleByRoleId}`,
        method: "POST",
        body,
      }),
      transformResponse: (response: AssignFeaturesApiResponse) => {
        // drill down to innermost array and return as RoleFeature[]
        return response.data.data;
      },
      invalidatesTags: ["AddFeatures"],
    }),
  }),
});





export const {
  useGetFeaturesByOrgIdQuery,
  useAssignFeatureToRoleMutation,
} = featuresApi;
