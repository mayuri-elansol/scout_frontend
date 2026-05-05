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
  title: string;
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
  surveillance: KpiCard[];
  workforce: KpiCard[];
  safety: KpiCard[];
  operational: KpiCard[];
  cameraTampering: KpiCard[];
}


export interface DashboardMonitoringSocketPayload {
  type: "MAIN_DASHBOARD_UPDATE";
  tenantId: string;
  serverTimestamp: string;
 data: {
    dashboard: MainDashboardResponse;
    cameraTampering: CameraTamperingKpiCard[];
  };

}
