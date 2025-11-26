import {
  UseCase,
  // License,
  Camera,
  UseCaseCameraMapping,
  OrganizationLicense,
} from '../types/useCaseManager';

// Base API URL - Update this based on your backend configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Use Case Manager API Service
 * Handles all API calls related to use cases, licenses, and camera assignments
 */
class UseCaseManagerService {
  
  /**
   * Get organization's license and associated use cases
   */
  async getOrganizationLicense(organizationId: string): Promise<OrganizationLicense> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/organizations/${organizationId}/license`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authorization header if needed
            // 'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch organization license: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching organization license:', error);
      throw error;
    }
  }

  
  /**
   * Get all use cases for a specific license
   */
  async getUseCasesByLicense(licenseId: string): Promise<UseCase[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/licenses/${licenseId}/use-cases`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch use cases: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching use cases:', error);
      throw error;
    }
  }

  /**
   * Get all cameras for an organization
   */
  async getCameras(organizationId: string): Promise<Camera[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/organizations/${organizationId}/cameras`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch cameras: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cameras:', error);
      throw error;
    }
  }

  /**
   * Get camera assignments for a specific use case
   */
  async getUseCaseCameraMapping(
    organizationId: string,
    useCaseId: string
  ): Promise<UseCaseCameraMapping> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/organizations/${organizationId}/use-cases/${useCaseId}/cameras`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch camera mapping: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching camera mapping:', error);
      throw error;
    }
  }

  /**
   * Update camera assignments for a use case
   */
  async updateUseCaseCameras(
    organizationId: string,
    useCaseId: string,
    cameraIds: string[]
  ): Promise<UseCaseCameraMapping> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/organizations/${organizationId}/use-cases/${useCaseId}/cameras`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cameraIds,
            updatedAt: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update camera mapping: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating camera mapping:', error);
      throw error;
    }
  }

  /**
   * Get all use cases with their camera assignments
   */
  async getAllUseCasesWithCameras(
    organizationId: string
  ): Promise<(UseCase & { cameras: Camera[] })[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/organizations/${organizationId}/use-cases/with-cameras`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch use cases with cameras: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching use cases with cameras:', error);
      throw error;
    }
  }

  // ========================================
  // MOCK DATA METHODS (for development/testing)
  // Remove these when real API is available
  // ========================================

  /**
   * Mock: Get organization license with use cases
   */

  
  // async getMockOrganizationLicense(organizationId: string): Promise<OrganizationLicense> {
  //   // Simulate API delay
  //   await new Promise(resolve => setTimeout(resolve, 800));

  //   return {
  //     organizationId,
  //     licenseId: 'license-001',
  //     license: {
  //       id: 'license-001',
  //       name: 'Enterprise Safety & Compliance',
  //       description: 'Complete safety monitoring and compliance suite',
  //       useCaseIds: ['uc-001', 'uc-002', 'uc-003', 'uc-004', 'uc-005'],
  //       organizationId,
  //       startDate: '2024-01-01',
  //       endDate: '2025-12-31',
  //       isActive: true,
  //     },
  //     useCases: [
  //       {
  //         id: 'uc-001',
  //         name: 'Personal Protective Equipment (PPE) Detection',
  //         description: 'Detect missing or improper use of safety equipment like helmets, vests, gloves, and goggles',
  //         category: 'Safety & Compliance',
  //         icon: 'safety',
  //         enabled: true,
  //         assignedCameraIds: [],
  //       },
  //       {
  //         id: 'uc-002',
  //         name: 'Object Detection in Walking Bays',
  //         description: 'Monitor pedestrian walkways for unauthorized objects, vehicles, or obstructions',
  //         category: 'Safety & Compliance',
  //         icon: 'visibility',
  //         enabled: true,
  //         assignedCameraIds: [],
  //       },
  //       {
  //         id: 'uc-003',
  //         name: 'Fire, Smoke, Oil and Gas Leak Detection',
  //         description: 'Real-time detection of fire, smoke, and hazardous leaks',
  //         category: 'Safety & Compliance',
  //         icon: 'warning',
  //         enabled: true,
  //         assignedCameraIds: [],
  //       },
  //       {
  //         id: 'uc-004',
  //         name: 'Fall Detection (Person falling on the floor)',
  //         description: 'Detect when a person has fallen and alert emergency responders',
  //         category: 'Safety & Compliance',
  //         icon: 'emergency',
  //         enabled: true,
  //         assignedCameraIds: [],
  //       },
  //       {
  //         id: 'uc-005',
  //         name: 'Intrusion Detection at Premises Perimeter',
  //         description: 'Monitor perimeter for unauthorized access or intrusions',
  //         category: 'Surveillance',
  //         icon: 'security',
  //         enabled: true,
  //         assignedCameraIds: [],
  //       },
  //       {
  //         id: 'uc-006',
  //         name: 'Unauthorized Access in Restricted Areas',
  //         description: 'Detect and alert when someone enters restricted zones',
  //         category: 'Surveillance',
  //         icon: 'block',
  //         enabled: true,
  //         assignedCameraIds: [],
  //       },
  //       {
  //         id: 'uc-007',
  //         name: 'People Presence during Shutdown Hours',
  //         description: 'Monitor for unauthorized personnel during non-operational hours',
  //         category: 'Surveillance',
  //         icon: 'schedule',
  //         enabled: true,
  //         assignedCameraIds: [],
  //       },
  //       {
  //         id: 'uc-008',
  //         name: 'People Count in Factory Premises',
  //         description: 'Real-time counting of people in different zones',
  //         category: 'Operational Insights',
  //         icon: 'people',
  //         enabled: true,
  //         assignedCameraIds: [],
  //       },
  //     ],
  //   };
  // }

  

  /**
   * Mock: Get cameras for an organization
   */
  async getMockCameras(organizationId: string): Promise<Camera[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
      {
        id: 'cam-001',
        name: 'Camera 1',
        position: 'Main Entrance',
        location: 'Building A - Ground Floor',
        ipAddress: '192.168.1.101',
        port: '554',
        make: 'Hikvision',
        status: 'connected',
        rtspStream: 'rtsp://192.168.1.101:554/stream1',
      },
      {
        id: 'cam-002',
        name: 'Camera 2',
        position: 'Production Floor - Zone A',
        location: 'Building A - First Floor',
        ipAddress: '192.168.1.102',
        port: '554',
        make: 'Dahua',
        status: 'connected',
      },
      {
        id: 'cam-003',
        name: 'Camera 3',
        position: 'Warehouse Entry',
        location: 'Building B - Ground Floor',
        ipAddress: '192.168.1.103',
        port: '554',
        make: 'Hikvision',
        status: 'connected',
      },
      {
        id: 'cam-004',
        name: 'Camera 4',
        position: 'Loading Dock',
        location: 'Building B - Loading Area',
        ipAddress: '192.168.1.104',
        port: '554',
        make: 'Axis',
        status: 'offline',
      },
      {
        id: 'cam-005',
        name: 'Camera 5',
        position: 'Parking Lot',
        location: 'Outdoor - North',
        ipAddress: '192.168.1.105',
        port: '554',
        make: 'Hikvision',
        status: 'connected',
      },
    ];
  }
}

// Export singleton instance
export const useCaseManagerService = new UseCaseManagerService();
