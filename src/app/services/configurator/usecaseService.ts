import axios from "axios";

const API_BASE = "http://localhost:4001/api/v1"; 
const TENANT_ID = "47a996e22a6ff828";  // temp hardcoded

export const getUsecases = async () => {
  return axios.get(`${API_BASE}/configurator/use-case-manager/usecases`, {
    headers: { "x-tenant-id": TENANT_ID }
  });
};

export const getCameras = async () => {
  return axios.get(`${API_BASE}/configurator/use-case-manager/cameras`, {
    headers: { "x-tenant-id": TENANT_ID }
  });
};

export const getAssignments = async (usecaseId: string) => {
  return axios.get(`${API_BASE}/configurator/use-case-manager/assignments/${usecaseId}`, {
    headers: { "x-tenant-id": TENANT_ID }
  });
};

export const assignCameras = async (usecaseId: string, cameraIds: string[]) => {
  return axios.post(
    `${API_BASE}/configurator/use-case-manager/assign`,
    { usecaseId, cameraIds },
    { headers: { "x-tenant-id": TENANT_ID } }
  );
};

export const getCameraAssignments = async (cameraId: string) => {
  return axios.get(`${API_BASE}/configurator/use-case-manager/camera-assignments/${cameraId}`, {
    headers: { "x-tenant-id": TENANT_ID }
  });
};

export const unassignCamera = async (usecaseId: string, cameraId: string) => {
  return axios.delete(`${API_BASE}/configurator/use-case-manager/unassign`, {
    data: { usecaseId, cameraId },
    headers: { "x-tenant-id": TENANT_ID },
  });
};


