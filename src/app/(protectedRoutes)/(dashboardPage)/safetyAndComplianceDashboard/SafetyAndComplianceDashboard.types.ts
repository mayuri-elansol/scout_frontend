import { SafetyMonitoringConfig } from "./SafetyAndComplianceDashboardConfig";

// ─── Shared ───────────────────────────────────────────────────────────────────

export type KpiColour = "red" | "green" | "blue" | "gray";

export interface KpiData {
  title: string;
  colour: KpiColour;
  violationsCount?: number;
  lastDetection?: string;
  lastDetectionTime?: string;
}

// ─── Fire & Smoke ─────────────────────────────────────────────────────────────

export interface FireSmokeBucket {
  label: string;
  fireCount: number;
  smokeCount: number;
}

export interface FireSmokeZoneWiseCount {
  fire: Record<string, number>;
  smoke: Record<string, number>;
}

export interface FireSmokeGraphData {
  granularity: "hour" | "weekday" | "week";
  buckets: FireSmokeBucket[];
  zoneWiseCount: FireSmokeZoneWiseCount;
}

// ─── Fall / Laydown ───────────────────────────────────────────────────────────

export interface FallLaydownSeriesPoint {
  label: string;
  count: number;
}

export interface FallLaydownGraphData {
  granularity: "hour" | "weekday" | "week";
  series: FallLaydownSeriesPoint[];
  zoneWiseCount: Record<string, number>;
}

// ─── Empty Graph (PPE, Vehicle, Emergency Exit, Crowd) ────────────────────────

export type EmptyGraphData = [];

// ─── Union Graph Data ─────────────────────────────────────────────────────────

export type GraphData =
  | FireSmokeGraphData
  | FallLaydownGraphData
  | EmptyGraphData;

// ─── Per-title response shapes ────────────────────────────────────────────────

export interface FireSmokeResponse {
  title: "Fire & Smoke  Alerts";
  kpi: KpiData;
  graphs: { data: FireSmokeGraphData };
}

export interface FallLaydownResponse {
  title: "Fall / Laydown Alerts";
  kpi: KpiData;
  graphs: { data: FallLaydownGraphData };
}

export interface EmptyDataResponse {
  title:
    | "PPE Violations"
    | "Vehicle In Walkways"
    | "Emergency Exit Blockage"
    | "Crowd Gathering Alerts";
  kpi: KpiData;
  graphs: { data: EmptyGraphData };
}

// ─── Main Union Type ──────────────────────────────────────────────────────────

export type SurveillanceDashboardResponse =
  | FireSmokeResponse
  | FallLaydownResponse
  | EmptyDataResponse;

// ─── Socket Payload ───────────────────────────────────────────────────────────

export interface SafetySocketPayload {
  type: "Safety_Dashboard_Update";
  tenantId: string;
  serverTimestamp: string;
  data: SurveillanceDashboardResponse[];
}
