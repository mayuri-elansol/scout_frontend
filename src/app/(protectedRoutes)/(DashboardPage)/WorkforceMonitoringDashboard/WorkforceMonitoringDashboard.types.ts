// import { WorkforceMonitoringConfig } from "./WorkforceMonitoringDashboardConfig";

// export interface WorkforceMonitoringKpiData {
//   title: keyof typeof WorkforceMonitoringConfig;
//   violationsCount: number;
//   lastDetection: string;
//   lastDetectionTime: string;
//   colour: "red" | "green" | "blue" | "gray";
// }

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
[];

export interface WorkforceMonitoringSocketPayload {
  type: "WORKFORCE_UPDATE";
  tenantId: string;
  serverTimestamp: string;
  data: WorkforceMonitoringDashboardResponse[];
}
