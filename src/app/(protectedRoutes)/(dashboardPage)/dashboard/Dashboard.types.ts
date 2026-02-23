import {
  CameraTamperingDashboardConfig,
  MainDashboardConfig,
} from "./DashboardConfig";

export interface KpiCard {
  title: keyof typeof MainDashboardConfig;
  colour: "red" | "green" | "gray" | "blue";
  violationsCount?: number;
  lastDetection?: string;
  lastDetectionTime?: string;
}
export interface CameraTamperingKpiCard {
  title: keyof typeof CameraTamperingDashboardConfig;
  colour: "red" | "green" | "gray" | "blue";
  violationsCount?: number;
}

export interface DashboardGraphs {
  data: string;
}

export interface DashboardItem {
  title: string;
  kpi: KpiCard;
  graphs: DashboardGraphs;
}

export interface MainDashboardResponse {
  surveillance: DashboardItem[];
  workforce: DashboardItem[];
  safety: DashboardItem[];
  operational: DashboardItem[];
  cameraTampering: CameraTamperingKpiCard[];
}
export interface MainDashboardResponse {
  title: keyof typeof MainDashboardConfig;
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
export interface DashboardMonitoringSocketPayload {
  type: "MAIN_DASHBOARD_UPDATE";
  tenantId: string;
  serverTimestamp: string;
  data: MainDashboardResponse;
}
