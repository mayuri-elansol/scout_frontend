// import { MainDashboardConfig } from "./DashboardConfig";

import { MainDashboardConfig } from "./DashboardConfig";

// export interface DashboardKpiData {
//   title: keyof typeof MainDashboardConfig;
//   violationsCount?: number;
//   colour: "red" | "green" | "blue" | "gray";
// }

// export type MainDashboardResponse = {
//   safety: DashboardKpiData[];
//   surveillance: DashboardKpiData[];
//   workforce: DashboardKpiData[];
//   operational: DashboardKpiData[];
// };

// dashboardTypes.ts

export interface KpiCard {
  title: keyof typeof MainDashboardConfig;
  colour: "red" | "green" | "gray" | "blue";
  violationsCount?: number;
  lastDetection?: string;
  lastDetectionTime?: string;
}

export interface DashboardGraphs {
  data: any;
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
}
