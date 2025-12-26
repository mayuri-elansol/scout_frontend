import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";

export const featuresApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturesByOrgId: builder.mutation<
      { status: string; message: string; data?: any; error?: string },
      { userId: string; orgId: string }
    >({
      query: (body) => ({
        url: `${apiRoutes.roleInformation.root}/${apiRoutes.roleInformation.getFeaturesByOrgId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AddFeatures"], 
    }),

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
      invalidatesTags: ["AssignFeatureToRole"],
    }),
    
  }),
});

export const { useGetFeaturesByOrgIdMutation ,useAssignFeatureToRoleMutation} = featuresApi;
