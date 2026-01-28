import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";

/* ---------- TYPES ---------- */

export type Zone = {
  id: string;
  zoneName: string;
  description?: string;
  locations?: Location[];

  locationsCount?: number;
  camerasCount?: number; // ✅ ADD THIS
};


export type Location = {
  id: string;
  zoneId: string;
  locationName: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateZonePayload = {
  zoneName: string;
  description: string;
};

export type UpdateZonePayload = {
  zoneName: string;
  description: string;
};

export type CreateLocationPayload = {
  zoneId: string;
  locationName: string;
  description: string;
};

export type GetZonesResponse = {
  stats: {
    totalZones: number;
    configuredZones: number;
    totalLocationAssignments: number;
    camerasCount: number;
  };
  zones: Zone[];
};

/* ---------- API ---------- */

export const zoneLocationMappingApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({

    /* ---------- GET ALL ZONES ---------- */
    getZones: builder.query<GetZonesResponse, void>({
      query: () => ({
        url: `${apiRoutes.configurator.root}${apiRoutes.configurator.zoneMapping}/zone`,
        method: "GET",
      }),
      providesTags: ["ZoneLocationManagement"],
    }),


    /* ---------- CREATE ZONE ---------- */
    createZone: builder.mutation<
      { status: string; message: string; data?: Zone; error?: string },
      CreateZonePayload
    >({
      query: (body) => ({
        url: `${apiRoutes.configurator.root}${apiRoutes.configurator.zoneMapping}/zone`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ZoneLocationManagement"],
    }),

    /* ---------- UPDATE ZONE ---------- */
    updateZone: builder.mutation<
      { status: string; message: string; data?: Zone; error?: string },
      { id: string; data: UpdateZonePayload }
    >({
      query: ({ id, data }) => ({
        url: `${apiRoutes.configurator.root}${apiRoutes.configurator.zoneMapping}/zone/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ZoneLocationManagement"],
    }),

    /* ---------- DELETE ZONE ---------- */
    deleteZone: builder.mutation<
      { status: string; message: string; data?: string; error?: string },
      string
    >({
      query: (id) => ({
        url: `${apiRoutes.configurator.root}${apiRoutes.configurator.zoneMapping}/zone/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ZoneLocationManagement"],
    }),

    /* ---------- CREATE LOCATION ---------- */
    createLocation: builder.mutation<
      { status: string; message: string; data?: Location; error?: string },
      CreateLocationPayload
    >({
      query: (body) => ({
        url: `${apiRoutes.configurator.root}${apiRoutes.configurator.zoneMapping}/location`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ZoneLocationManagement"],
    }),

  }),
});

/* ---------- HOOK EXPORTS ---------- */

export const {
  useGetZonesQuery,
  useCreateZoneMutation,
  useUpdateZoneMutation,
  useDeleteZoneMutation,
  useCreateLocationMutation,
  useLazyGetZonesQuery,
} = zoneLocationMappingApi;
