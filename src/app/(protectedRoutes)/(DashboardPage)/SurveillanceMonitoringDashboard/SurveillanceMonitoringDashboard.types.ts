
import { surveillanceDashboardConfig } from "./SurveillanceMonitoringDashboardConfig";



export interface IntrusionTrendPoint {
  label: string;
  count: number;
}

export interface IntrusionTrendSeries {
  zone: string;
  data: IntrusionTrendPoint[];
}

export interface IntrusionTrendResponse {
  granularity: "hour" | "weekday" | "week";
  series: IntrusionTrendSeries[];
}

export interface SurveillanceDashboardResponse {
  title: keyof typeof surveillanceDashboardConfig;
  kpi: {
    title: string;
    violationsCount?: number;
    lastDetection?: string;
    lastDetectionTime?: string;
    colour: "red" | "green" | "blue" | "gray";
  };
  graphs: {
    data: IntrusionTrendResponse;
  };
}

export interface SurveillanceSocketPayload {
  type: "SURVEILLANCE_UPDATE";
  tenantId: string;
  serverTimestamp: string;
  data: SurveillanceDashboardResponse[];
}
