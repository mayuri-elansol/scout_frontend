import axios, { AxiosInstance } from 'axios';
import { ROIShape } from '@/app/types/roi';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001/api/v1';

  type BackendRoi = {
  id: string;
  type: ROIShape["type"];
  label: string;
  mode: ROIShape["mode"];
  points: ROIShape["points"];
};


class RoiService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: { 'Content-Type': 'application/json' },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const tenantId =
        typeof window !== 'undefined'
          ? localStorage.getItem('tenantId') ?? '47a996e22a6ff828'
          : '47a996e22a6ff828';

      config.headers['x-tenant-id'] = tenantId;
      return config;
    });
  }

  /* -------- SAVE ROI -------- */
  async saveRoi(
    cameraId: string,
    usecaseId: string,
    rois: ROIShape[]
  ) {
    return this.axiosInstance.post('/configurator/camera-roi', {
      cameraId,
      usecaseId,
      rois: rois.map(r => ({
        type: r.type,
        label: r.name,        // 🔁 UI → DB mapping
        mode: r.mode,
        points: r.points,
      })),
    });
  }

  /* -------- GET ROI -------- */
  async getRoi(
    cameraId: string,
    usecaseId: string
  ): Promise<ROIShape[]> {
    const res = await this.axiosInstance.get(
      `/configurator/camera-roi/${cameraId}/${usecaseId}`
    );

    return (res.data.rois as BackendRoi[]).map((r, index) => ({
      id: r.id || `roi-${index}`,
      type: r.type,
      name: r.label,          
      mode: r.mode,
      points: r.points,
      completed: true,
      color: '#00ff00',
    }));

  }
}

/* 🔥 THIS EXPORT IS REQUIRED */
export const roiService = new RoiService();
