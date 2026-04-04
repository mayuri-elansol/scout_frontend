import { fallDetectionKpiConfig } from "./fallDetectionConfig";

export interface Violation {
  voilation: string;
  zone: string;
  time: string;
  imageUrl: string;
  incident: string;
  [key: string]: string | number | boolean;
}

export interface FallDetectionViolation extends Violation {
  cameraName: string;
}

// export interface FilterParams {
//   incident?: string;
//   zone?: string;
//   cameraId?: string;
//   startDate?: string;
//   endDate?: string;
// }

export type KpiColour = "red" | "green" | "blue";
export interface FallDetectionKpiItem {
  title: keyof typeof fallDetectionKpiConfig;
  value: number | string;
  colour: KpiColour;
}

export interface FallDetectionViolation {
  violation: string;
  zone: string;
  time: string;
  imageUrl: string;
  cameraName: string;
  alarmTriggered: string;
  [key: string]: string | number | boolean;
}

export interface FallDetectionZoneViolation {
  zone: string;
  incidents: number;
}

export interface FallDetectionDetailedReportResponse {
  data: FallDetectionViolation[];
  zones: string[];
  cameras: string[];
  total: number;
}
export interface FallDetectionSocketPayload {
  serverTimestamp: string;
  kpi: FallDetectionKpiItem[];
  zoneViolations: FallDetectionZoneViolation[];
  recentViolations: FallDetectionViolation[];
}

export interface FallDetectionFilterParams {
  zone?: string;
  cameraName?: string;
  startDate?: string;
  endDate?: string;

  alarmTriggered?: string;
}

export type FallDetectionSingleReportRequest = {
  tenantId: string;
  incident?: string;
  zone?: string;
  cameraId?: string;
  imageUrl?: string;
  time?: string;
};

export type FallDetectionCsvReportRequest = {
  tenantId: string;
  startDate: string;
  endDate: string;
  incident?: string;
  zone?: string;
  cameraId?: string;
};

export interface ShiftType {
  shiftId: string;
  name: string;
  startTime: string;
  endTime: string;
  breakStartTime: string;
  breakEndTime: string;
  status: string;
}
