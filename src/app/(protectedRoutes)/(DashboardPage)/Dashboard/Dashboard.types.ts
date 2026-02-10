import { MainDashboardConfig } from "./DashboardConfig";

export interface DashboardKpiData {
  title: keyof typeof MainDashboardConfig;
  violationsCount?: number;
  colour: "red" | "green" | "blue" | "gray";
}

export type MainDashboardResponse = {
  safety: DashboardKpiData[];
  surveillance: DashboardKpiData[];
  workforce: DashboardKpiData[];
  operational: DashboardKpiData[];
};
