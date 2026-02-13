
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
export interface WorkforceMonitoringDashboardResponseForScatterChart {
  title: keyof typeof WorkforceMonitoringConfig;
  enabled?: boolean;
  kpi: {
    title: string;
    colour: "red" | "green" | "blue" | "gray";
    violationsCount?: number;
    lastDetection?: string;
    lastDetectionTime?: string;
  };
  graphs: {
    data: WorkforceGraphResponse;
  };
}

export interface WorkforceGatePoint {
  gate: string;
  idleCount: number;
  workingCount: number;
  notPresentCount: number;
}

export interface WorkforceGraphResponse {
  data: WorkforceGatePoint[];
}


export interface WorkforceMonitoringSocketPayload {
  type: "WORKFORCE_UPDATE";
  tenantId: string;
  serverTimestamp: string;
  data: WorkforceMonitoringDashboardResponse[];
}
