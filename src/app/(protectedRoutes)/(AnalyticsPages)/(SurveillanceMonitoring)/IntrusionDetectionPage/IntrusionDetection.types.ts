import { SvgIconComponent } from "@mui/icons-material";
import { intrusionKpiConfig } from "./IntrusionDetectionConfig";

/* ---------- FILTERS ---------- */
export interface IntrusionFilterParams {
  zone?: string;
  cameraId?: string;
  alarmTriggered?: string;
  startDate?: string;
  endDate?: string;
}

/* ---------- KPI ---------- */
export interface IntrusionKpiItem {
  title: keyof typeof intrusionKpiConfig;
  value: number | string;
  colour: string;
}

export interface IntrusionKpiUi extends IntrusionKpiItem {
  icon: SvgIconComponent;
  tooltipMessage?: string;
}

/* ---------- ZONE VIOLATIONS ---------- */
export interface IntrusionZoneViolation {
  zone: string;
  incident: number;
}

/* ---------- VIOLATION ---------- */
export interface IntrusionViolation {
  violation: string;
  zone: string;
  time: string;
  imageUrl: string;
  cameraId: string;
  alarmTriggered: boolean;
  [key: string]: string | number | boolean;
}

/* ---------- DETAILED REPORT ---------- */
export interface IntrusionDetailedReportResponse {
  data: IntrusionViolation[];
  zones: string[];
  cameras: string[];
}

/* ---------- API REQUESTS ---------- */
export interface IntrusionBaseRequest {
  tenantId: string;
  startDate?: string;
  endDate?: string;
}

export interface IntrusionDetailedReportRequest extends IntrusionBaseRequest {
  zone?: string;
  cameraId?: string;
  alarmTriggered?: boolean;
}

export type IntrusionSingleReportRequest = {
  tenantId: string;
  violation?: string;
  zone?: string;
  alarmTriggered?: boolean;
  cameraId?: string;
  imageUrl?: string;
  time?: string;
};

export type IntrusionCsvReportRequest = {
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
  kpi: IntrusionKpiItem[];
  zoneViolations: IntrusionZoneViolation[];
  recentViolations: IntrusionViolation[];
}
