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
