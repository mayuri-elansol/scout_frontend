import { surveillanceDashboardConfig } from "./SurveillanceMonitoringDashboardConfig";

export interface SurveillanceKpiData {
  title: keyof typeof surveillanceDashboardConfig;
  violationsCount: number;
  lastDetection: string;
  lastDetectionTime: string;
  colour: "red" | "green" | "blue" | "gray";
}
