import axios from "axios";

const API_BASE = "http://localhost:4001/api/v1"; 

// 🔥 Hard-coded tenant ID for now (use header later from Auth)
const TENANT_ID = "acc3018d4650c195";

export const getCameras = async () => {
  return axios.get(`${API_BASE}/configurator/camera-manager`, {
    headers: { "x-tenant-id": TENANT_ID },
  });
};

export const addCamera = async (cameraData: any) => {
  return axios.post(`${API_BASE}/configurator/camera-manager`, cameraData, {
    headers: { "x-tenant-id": TENANT_ID },
  });
};

export const deleteCamera = async (cameraId: string) => {
  return axios.delete(`${API_BASE}/configurator/camera-manager/${cameraId}`, {
    headers: { "x-tenant-id": TENANT_ID },
  });
};
