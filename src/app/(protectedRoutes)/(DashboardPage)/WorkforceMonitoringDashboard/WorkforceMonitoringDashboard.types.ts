import { WorkforceMonitoringConfig } from "./WorkforceMonitoringDashboardConfig";

export interface WorkforceMonitoringKpiData {
  title: keyof typeof WorkforceMonitoringConfig;
  violationsCount: number;
  lastDetection: string;
  lastDetectionTime: string;
  colour: "red" | "green" | "blue" | "gray";
}
