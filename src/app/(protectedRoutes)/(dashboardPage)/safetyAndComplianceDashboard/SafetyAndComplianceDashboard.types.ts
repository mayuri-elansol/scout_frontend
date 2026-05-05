
// ─── Shared ───────────────────────────────────────────────────────────────────

export type KpiColour = "red" | "green" | "blue" | "gray";

export interface KpiData {
  title: string;
  colour: KpiColour;
  violationsCount?: number;
  lastDetection?: string;
  lastDetectionTime?: string;

  // ✅ ADD THESE
  totalFireCount?: number;
  totalSmokeCount?: number;
}

// ─── Fire & Smoke ─────────────────────────────────────────────────────────────

export interface FireSmokeBucket {
  date: string;
  time?: string;      // hour granularity only
  day?: string;  
    fireCount: number;
  smokeCount: number;
}

export interface FireSmokeZoneWiseCount {
  fire: Record<string, number>;
  smoke: Record<string, number>;
}

export interface PieData {
  label: string;
  value: number;
  color: string;
}

export interface FireSmokeGraphData {
  granularity: "hour" | "weekday" | "week";  
  series: FireSmokeBucket[];             
  hazardTypePieData: PieData[];
  zoneWisePieData: PieData[];
}
export interface PPEKitBucket {
  date:string;
  time?:string;
  day?:string;
  vest: number;
  helmet: number;
  glasses:number;
}

export interface PPEGraphData {
  granularity: "hour" | "weekday" | "week";
  series: PPEKitBucket[];
  violationTypePieData: PieData[];
  zoneWisePieData: PieData[];
}


// ─── Fall / Laydown ───────────────────────────────────────────────────────────

export interface FallLaydownSeriesPoint {
  label: string;
  count: number;
}

export interface FallLaydownGraphData {
  granularity: "hour" | "weekday" | "week";
  series: FallLaydownSeriesPoint[];
  zoneWisePieData: PieData[];
}


// ─── Empty Graph (PPE, Vehicle, Emergency Exit, Crowd) ────────────────────────

export type EmptyGraphData = [];

// ─── Union Graph Data ─────────────────────────────────────────────────────────

export type GraphData =
  | FireSmokeGraphData
  | FallLaydownGraphData
  | EmptyGraphData;

// ─── Per-title response shapes ────────────────────────────────────────────────

export interface PPEKitDetectionResponse {
  title: "PPE Violations";
  kpi: KpiData;
  graphs: { data: PPEGraphData };
}

export interface FireSmokeResponse {
  title: "Fire & Smoke Alerts";
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
  | PPEKitDetectionResponse
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
