import { movemnetDuringShutDownHrKpiConfig } from "./movementDuringShutdownHoursConfig";

export type KpiColour = "red" | "green" | "blue";
/* ---------- KPI ---------- */
export interface MovemnetDuringShutDownHrKpiItem {
  title: keyof typeof movemnetDuringShutDownHrKpiConfig;
  value: number | string;
  colour: KpiColour;
}

/* ---------- ZONE VIOLATIONS ---------- */
export interface MovemnetDuringShutDownHrZoneViolation {
  zone: string;
  peopleCount: number;
}

/* ---------- Recent VIOLATION ---------- */
export interface MovemnetDuringShutDownHrViolation {
  violation: string;
  zone: string;
  time: string;
  imageUrl: string;
  cameraId: string;
  alarmTriggered: boolean;
  peopleCount: number;
  [key: string]: string | number | boolean;
}
/* ---------- DETAILED REPORT ---------- */
export interface MovemnetDuringShutDownHrDetailedReportResponse {
  data: MovemnetDuringShutDownHrViolation[];
  zones: string[];
  cameras: string[];
}

/* ---------- API REQUESTS ---------- */
export interface MovemnetDuringShutDownHrBaseRequest {
  tenantId: string;
  startDate?: string;
  endDate?: string;
}

export interface MovemnetDuringShutDownHrDetailedReportRequest extends MovemnetDuringShutDownHrBaseRequest {
  zone?: string;
  cameraId?: string;
  alarmTriggered?: boolean;
}

export type MovemnetDuringShutDownHrSingleReportRequest = {
  tenantId: string;
  violation?: string;
  zone?: string;
  alarmTriggered?: boolean;
  cameraId?: string;
  imageUrl?: string;
  time?: string;
  peopleCount: number;
};

export type MovemnetDuringShutDownHrCsvReportRequest = {
  tenantId: string;
  startDate: string;
  endDate: string;
  violation?: string;
  zone?: string;
  cameraId?: string;
  alarmTriggered?: boolean;
};

export interface IntrusionSocketPayload {
  serverTimestamp: string;
  kpi: MovemnetDuringShutDownHrKpiItem[];
  zoneViolations: MovemnetDuringShutDownHrZoneViolation[];
  recentViolations: MovemnetDuringShutDownHrViolation[];
}
