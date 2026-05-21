import axios from "axios";

type AddCameraPayload = {
  cameraName: string;
  cameraIp: string;
  userName: string;
  password: string;
  RTSPport: string | number;
  cameraZone?: string;
  channel?: string;
  connectionType: "DIRECT_TO_CAMERA" | "NVR";
  refreshRate?: number;
};

type DetectNvrChannelsPayload = {
  nvrName: string;
  ip: string;
  port: number;
  username: string;
  password: string;
  numberofchannels: number;
  rtsplink?: string;
};


const API_BASE = "http://localhost:4001/api/v1"; 

// 🔥 Hard-coded tenant ID for now (use header later from Auth)
// const TENANT_ID = "acc3018d4650c195";
const TENANT_ID = "47a996e22a6ff828";

const getTenantId = () => {
  return localStorage.getItem('tenantId') || '';
};


export const getCameras = async () => {
  return axios.get(`${API_BASE}/configurator/camera-manager`, {
    headers: { "x-tenant-id": getTenantId() },
  });
};


export const fetchZones = async () => {
  return axios.get(`${API_BASE}/configurator/camera-manager/zones`, {
    headers: { "x-tenant-id": getTenantId() },
  });
};

export const fetchLocations = async (zoneId: string) => {
  return axios.get(`${API_BASE}/configurator/camera-manager/locations/${zoneId}`, {
    headers: { "x-tenant-id": getTenantId() },
  });
};
export const addCamera = async (cameraData: AddCameraPayload) => {
  return axios.post(`${API_BASE}/configurator/camera-manager`, cameraData, {
    headers: { "x-tenant-id": getTenantId() },
  });
};

export const deleteCamera = async (cameraId: string) => {
  return axios.delete(`${API_BASE}/configurator/camera-manager/${cameraId}`, {
    headers: { "x-tenant-id": getTenantId() },
  });
};

export const detectNvrChannels = async (data: DetectNvrChannelsPayload) => {
  return axios.post(`${API_BASE}/configurator/camera-manager/detect-nvr-channels`, data, {
    headers: { "x-tenant-id": getTenantId() },
  });
};
