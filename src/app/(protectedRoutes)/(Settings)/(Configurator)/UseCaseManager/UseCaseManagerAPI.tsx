import { baseProtectedApi } from "@/app/store/api/protectedAPI/baseProtectedApi";
import { apiRoutes } from "@/constants/apiRoutes";

/* ---------- TYPES ---------- */

export type UseCase = {
  id: string;
  usecaseName: string;
  description?: string;
  category?: string;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
  labels?: string[];  
};

export type Camera = {
  id: string;
  cameraName: string;
  cameraIp: string;
  RTSPport: string | number;
  cameraZone?: string;
  connectionType?: string;
  status?: string;
};

export type Assignment = {
  id: string;
  usecaseId: string;
  cameraId: string;
  createdAt?: string;
};

export type AssignCamerasPayload = {
  usecaseId: string;
  cameraIds: string[];
};

export type UnassignCameraPayload = {
  usecaseId: string;
  cameraId: string;
};

/* ---------- API ---------- */

export const useCaseManagerApi = baseProtectedApi.injectEndpoints({
  endpoints: (builder) => ({

    /* ---------- GET USE CASES ---------- */
    getUsecases: builder.query<UseCase[], void>({
      query: () => ({
        url: `${apiRoutes.configurator.root}${apiRoutes.configurator.useCaseManager}/usecases`,
        method: "GET",
      }),
      providesTags: ["UseCaseManager"],
    }),


    /* ---------- GET CAMERAS ---------- */
    getCameras: builder.query<Camera[], void>({
      query: () => ({
        url: `${apiRoutes.configurator.root}${apiRoutes.configurator.useCaseManager}/cameras`,
        method: "GET",
      }),
      providesTags: ["UseCaseManager"],
    }),

    /* ---------- GET ASSIGNMENTS BY USE CASE ID ---------- */
    getAssignments: builder.query<
      { status: string; message: string; data: Assignment[]; error?: string },
      string
    >({
      query: (usecaseId) => ({
        url: `${apiRoutes.configurator.root}${apiRoutes.configurator.useCaseManager}/assignments/${usecaseId}`,
        method: "GET",
      }),
      providesTags: (result, error, usecaseId) => [
        { type: "UseCaseManager", id: usecaseId },
      ],
    }),

    /* ---------- ASSIGN CAMERAS TO USE CASE ---------- */
    assignCameras: builder.mutation<
      { status: string; message: string; data?: string; error?: string },
      AssignCamerasPayload
    >({
      query: (body) => ({
        url: `${apiRoutes.configurator.root}${apiRoutes.configurator.useCaseManager}/assign`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { usecaseId }) => [
        "UseCaseManager",
        { type: "UseCaseManager", id: usecaseId },
      ],
    }),

    /* ---------- GET CAMERA ASSIGNMENTS ---------- */
    getCameraAssignments: builder.query<
      { status: string; message: string; data: Assignment[]; error?: string },
      string
    >({
      query: (cameraId) => ({
        url: `${apiRoutes.configurator.root}${apiRoutes.configurator.useCaseManager}/camera-assignments/${cameraId}`,
        method: "GET",
      }),
      providesTags: (result, error, cameraId) => [
        { type: "UseCaseManager", id: `camera-${cameraId}` },
      ],
    }),

    /* ---------- UNASSIGN CAMERA ---------- */
    unassignCamera: builder.mutation<
      { status: string; message: string; data?: string; error?: string },
      UnassignCameraPayload
    >({
      query: (body) => ({
        url: `${apiRoutes.configurator.root}${apiRoutes.configurator.useCaseManager}/unassign`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: (result, error, { usecaseId, cameraId }) => [
        "UseCaseManager",
        { type: "UseCaseManager", id: usecaseId },
        { type: "UseCaseManager", id: `camera-${cameraId}` },
      ],
    }),

  }),
});

/* ---------- HOOK EXPORTS ---------- */

export const {
  useGetUsecasesQuery,
  useGetCamerasQuery,
  useGetAssignmentsQuery,
  useAssignCamerasMutation,
  useGetCameraAssignmentsQuery,
  useUnassignCameraMutation,
  useLazyGetAssignmentsQuery,
  useLazyGetCameraAssignmentsQuery,
} = useCaseManagerApi;
