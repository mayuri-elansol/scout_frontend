import { SvgIconComponent } from "@mui/icons-material";

/* ---------- KPI ---------- */

export interface CanteenUsageKpiItem {
  title: string;
  value: string | number;
}

export interface CanteenUsageKpiItemUi {
  title: string;
  value: string | number;
  icon: SvgIconComponent;
  tooltipMessage?: string;
}

/* ---------- ZONE VIOLATIONS (Zone-wise usage) ---------- */

export interface CanteenUsageSubViolation {
  label: string;
  value: number;
  icon?: SvgIconComponent;
}

export interface CanteenUsageZoneViolation {
  zone: string;
  usage: number;
  subUsage: CanteenUsageSubViolation[];
}

/* ---------- RECENT / TABLE ROW DATA ---------- */

export interface CanteenUsageViolation {
  usage: string;
  count: number;
  zone: string;
  time: string;
  camera: string;
  imageUrl: string;

  [key: string]: string | number | boolean ;
}

/* ---------- OVERVIEW API RESPONSE (kpi + zoneViolations + recentViolations) ---------- */

export interface CanteenUsageResponse {
  kpi: CanteenUsageKpiItem[];
  zoneViolations: CanteenUsageZoneViolation[];
  recentViolations: CanteenUsageViolation[];
}

/* ---------- SOCKET PAYLOAD (same shape as overview response) ---------- */

export type CanteenUsageSocketPayload = CanteenUsageResponse;

/* ---------- DETAILED REPORT TABLE ---------- */

export interface CanteenUsageDetailedReportResponse {
  data: CanteenUsageViolation[];
  total: number;
  zones?: string[];
  cameras?: string[];
}

export interface CanteenUsageFilterParams {
  usage?: string;
  zone?: string;
  camera?: string;
  startDate?: string;
  endDate?: string;
}

/* ---------- REPORT DOWNLOAD REQUESTS ---------- */

export interface CanteenUsageReportRequest {
  tenantId: string;
  usage?: string;
  zone?: string;
   count?:number;
  camera?: string;
  startDate?: string;
  endDate?: string;
}

export interface CanteenUsageSingleReportRequest {
  tenantId: string;
  usage: string;
  zone?: string;
  count?:number;
  time?: string;
  camera?: string;
  imageUrl?: string;
}

/* ---------- SHIFT TYPE (re-exported for TimeFilter, same as fireSmoke) ---------- */

export interface ShiftType {
  shiftId: string;
  name: string;
  startTime: string;
  endTime: string;
  breakStartTime: string;
  breakEndTime: string;
  status: string;
}