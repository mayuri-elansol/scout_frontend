
import { WorkforceMonitoringConfig } from "./WorkforceMonitoringDashboardConfig";
export interface WorkforceMonitoringDashboardResponse {
  title: keyof typeof WorkforceMonitoringConfig;
  enabled?: boolean;
  kpi: {
    title: string;
    colour: "red" | "green" | "blue" | "gray";
    violationsCount?: number;
    lastDetection?: string;
    lastDetectionTime?: string;
  };
  graphs?: {
    data?: {
      gate: string;
      idleCount: number;
      workingCount: number;
      notPresentCount: number;
    }[];
  };
}

