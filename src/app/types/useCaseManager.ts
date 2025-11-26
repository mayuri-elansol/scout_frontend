// Use Case Manager Types

export interface UseCase {
  id: string;
  name: string;
  description: string;
  category?: string;
  icon?: string;
  enabled: boolean;
  assignedCameraIds: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface License {
  id: string;
  name: string;
  description: string;
  useCaseIds: string[];
  organizationId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Camera {
  id: string;
  name: string;
  position: string;
  location?: string;
  ipAddress: string;
  port: string;
  make: string;
  status: 'connected' | 'failed' | 'pending' | 'offline';
  rtspStream?: string;
  createdAt?: string;
}

export interface UseCaseCameraMapping {
  useCaseId: string;
  cameraIds: string[];
  organizationId: string;
  updatedAt: string;
  updatedBy?: string;
}

export interface OrganizationLicense {
  organizationId: string;
  licenseId: string;
  license: License;
  useCases: UseCase[];
}
