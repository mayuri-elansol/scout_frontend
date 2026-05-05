import { surveillanceDashboardConfig } from "./SurveillanceMonitoringDashboardConfig";

export interface graphResponsePoint {
 date: string;
  time?: string;  
  day?: string; 
    count: number;
}

export interface TrendSeries {
  zone: string;
  color:string;
  data: graphResponsePoint[];
}

export interface TrendResponse {
  granularity: "hour" | "weekday" | "week";
  series: TrendSeries[];
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
    data: TrendResponse;
  };
}

export interface SurveillanceSocketPayload {
  type: "SURVEILLANCE_UPDATE";
  tenantId: string;
  serverTimestamp: string;
  data: SurveillanceDashboardResponse[];
}
