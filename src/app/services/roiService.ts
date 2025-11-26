// src/app/services/roiService.ts
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

interface Point {
  x: number;
  y: number;
}

interface ROIShape {
  id?: string;
  name: string;
  type: 'rectangle' | 'polygon' | 'freehand';
  mode: 'include' | 'exclude';
  color: string;
  points: Point[];
  completed: boolean;
}

interface SaveRoiRequest {
  cameraId: string;
  useCaseName: string;
  rois: ROIShape[];
}

interface RoiResponse {
  success: boolean;
  message: string;
  data: {
    cameraId: string;
    cameraName?: string;
    roi: Record<string, ROIShape[]>;
  };
}

interface GetRoiResponse {
  cameraId: string;
  cameraName: string;
  roi: Record<string, ROIShape[]>;
}

class RoiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to add tenant and user headers
    this.axiosInstance.interceptors.request.use((config) => {
      const tenantSchema = this.getTenantSchema();
      const userId = this.getUserId();

      if (tenantSchema) {
        config.headers['x-tenant-schema'] = tenantSchema;
      }
      if (userId) {
        config.headers['x-user-id'] = userId;
      }

      return config;
    });
  }

  private getTenantSchema(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tenantSchema') || 'public';
    }
    return 'public';
  }

  private getUserId(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId') || 'user_123';
    }
    return 'user_123';
  }

  async saveRoi(cameraId: string, useCaseName: string, rois: ROIShape[]): Promise<RoiResponse> {
    try {
      console.log('📤 Saving ROI:', { cameraId, useCaseName, roisCount: rois.length });

      const roisWithIds = rois.map(roi => ({
        ...roi,
        id: roi.id || `roi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      }));

      const response = await this.axiosInstance.post<RoiResponse>(
        '/scout/camera-settings/roi',
        {
          cameraId,
          useCaseName,
          rois: roisWithIds,
        }
      );

      console.log('✅ ROI saved successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error saving ROI:', error);
      throw error;
    }
  }

  async getRoi(cameraId: string): Promise<GetRoiResponse> {
    try {
      console.log('📥 Fetching ROI for camera:', cameraId);

      const response = await this.axiosInstance.get<GetRoiResponse>(
        `/scout/camera-settings/roi/${cameraId}`
      );

      console.log('✅ ROI fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching ROI:', error);
      throw error;
    }
  }

  async getRoiByUseCase(cameraId: string, useCaseName: string): Promise<ROIShape[]> {
    try {
      console.log('📥 Fetching ROI for camera and use case:', { cameraId, useCaseName });

      const encodedUseCaseName = encodeURIComponent(useCaseName);
      const response = await this.axiosInstance.get<ROIShape[]>(
        `/scout/camera-settings/roi/${cameraId}/usecase/${encodedUseCaseName}`
      );

      console.log('✅ ROI fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching ROI by use case:', error);
      return [];
    }
  }

  async deleteRoiByUseCase(cameraId: string, useCaseName: string): Promise<RoiResponse> {
    try {
      console.log('🗑️ Deleting ROI for camera and use case:', { cameraId, useCaseName });

      const encodedUseCaseName = encodeURIComponent(useCaseName);
      const response = await this.axiosInstance.delete<RoiResponse>(
        `/scout/camera-settings/roi/${cameraId}/usecase/${encodedUseCaseName}`
      );

      console.log('✅ ROI deleted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error deleting ROI:', error);
      throw error;
    }
  }

  async getAllCamerasWithRoi(): Promise<GetRoiResponse[]> {
    try {
      console.log('📥 Fetching all cameras with ROI');

      const response = await this.axiosInstance.get<GetRoiResponse[]>(
        '/scout/camera-settings/roi'
      );

      console.log('✅ All cameras ROI fetched successfully:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching all cameras ROI:', error);
      throw error;
    }
  }
}

export const roiService = new RoiService();
export type { ROIShape, Point, SaveRoiRequest, RoiResponse, GetRoiResponse };
