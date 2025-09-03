// Placeholder for future API implementation
// Currently using mock data for demo purposes

export interface AnalyticsData {
  id: string;
  type: string;
  value: number;
  timestamp: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'ACTIVE' | 'ESCALATED' | 'ACKNOWLEDGED' | 'RESOLVED';
  category: string;
  location: string;
  timestamp: string;
  assignedTo: string;
  duration: string;
}

export interface Report {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  data: any;
}

// Mock API functions for development
export const mockApi = {
  getAnalyticsData: async (type: string): Promise<AnalyticsData[]> => {
    // Return mock data
    return [];
  },
  
  getAlerts: async (filters?: any): Promise<Alert[]> => {
    // Return mock data
    return [];
  },
  
  getReports: async (): Promise<Report[]> => {
    // Return mock data
    return [];
  },
};
