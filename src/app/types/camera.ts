// Camera as stored & listed in organization
export interface OrgCamera {
  // cameraName: string;
  id: string;
  ipAddress: string;
  username: string;
  password: string;
  port: string;
  make: string;
  // location?: string;
  zone?: string;
  // location: string;
  cameraname: string; // ← renamed from cameraName (matches AIConfigurationStep)
  location?: string;
  rtspStream: string;
  status: "connected" | "failed" | "pending";
  aiConfig?: {
    useCases: string[];
    roiData: Record<string, { configured: boolean }>;
    // fineTuning: Record<string, { tuned: boolean }>;
    configure: Record<string, { tuned: boolean }>;
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
  status: "connected" | "failed" | "pending";
}

// Backend response shape
export interface CameraApiResponse {
  cameraLocation: string;
  cameraZone: string;
  id: string;
  cameraIp: string;
  cameraName: string;
  userName: string;
  password: string;
  RTSPport: string | number;
  Cameralocation?: string;
  connectionType: "DIRECT_TO_CAMERA" | "NVR";
  rtspStream?: string;
}
