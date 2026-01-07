import axios from "axios";

const API_BASE = "http://localhost:4001/api/v1"; // backend base

// 🔥 Hard-coded tenant ID for now
// const TENANT_ID = "acc3018d4650c195";
const TENANT_ID = "47a996e22a6ff828";

export const getZones = async () => {
  return axios.get(`${API_BASE}/configurator/zone-mapping/zone`, {
    headers: { "x-tenant-id": TENANT_ID },
  });
};

export const createZone = async (data: { zoneName: string; description: string }) => {
  return axios.post(`${API_BASE}/configurator/zone-mapping/zone`, data, {
    headers: { "x-tenant-id": TENANT_ID },
  });
};

export const updateZone = async (id: string, data: { zoneName: string; description: string }) => {
  return axios.put(`${API_BASE}/configurator/zone-mapping/zone/${id}`, data, {
    headers: { "x-tenant-id": TENANT_ID },
  });
};

export const deleteZone = async (id: string) => {
  return axios.delete(`${API_BASE}/configurator/zone-mapping/zone/${id}`, {
    headers: { "x-tenant-id": TENANT_ID },
  });
};

export const createLocation = async (data: { zoneId: string; locationName: string; description: string }) => {
  return axios.post(`${API_BASE}/configurator/zone-mapping/location`, data, {
    headers: { "x-tenant-id": TENANT_ID },
  });
};
