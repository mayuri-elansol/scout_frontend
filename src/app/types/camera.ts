// Camera as stored & listed in organization
export interface OrgCamera {
  cameraName: any;
  id: string;
  ipAddress: string;
  username: string;
  password: string;
  port: string;
  make: string;
  location: string;
  rtspStream: string;
  status: 'connected' | 'failed' | 'pending';
  aiConfig?: {
    useCases: string[];
    roiData: Record<string, { configured: boolean }>;
    fineTuning: Record<string, { tuned: boolean }>;
    enabled: boolean;
    viewName?: string;
  };
}

// Camera used ONLY in onboarding form
export interface OnboardingCamera {
  id: string;
  ipAddress: string;
  cameraname: string;
  username: string;
  password: string;
  port: string;
  zoneId: string;
  locationId: string;
  status: 'connected' | 'failed' | 'pending';
}

// Backend response shape
export interface CameraApiResponse {
  id: string;
  cameraIp: string;
  cameraName: string;
  userName: string;
  password: string;
  RTSPport: string | number;
  Cameralocation?: string;
  connectionType: 'DIRECT_TO_CAMERA' | 'NVR';
  rtspStream?: string;
}
