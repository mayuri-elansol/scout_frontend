
export type KpiColour = "red" | "green" | "blue" | "gray";

export interface KpiData {
  title: string;
  colour: KpiColour;
  violationsCount?: number;
  lastDetection?: string;
  lastDetectionTime?: string;
  totalFireCount?: number;
  totalSmokeCount?: number;
}

// ─── Pie Data ─────────────────────────────────────────────────────────────────

export interface PieData {
  label: string;
  value: number;
  color: string;
}

type Granularity = "hour" | "weekday" | "week";

// ─── Fire & Smoke ─────────────────────────────────────────────────────────────

export interface FireSmokeBucket {
  date: string;
  time?: string;
  day?: string;
  fireCount: number;
  smokeCount: number;
}

export interface FireSmokeGraphData {
  granularity: Granularity;
  series: FireSmokeBucket[];
  hazardTypePieData: PieData[];
  zoneWisePieData: PieData[];
}

// ─── PPE ──────────────────────────────────────────────────────────────────────

export interface PPEKitBucket {
  date: string;
  time?: string;
  day?: string;
  vest: number;
  helmet: number;
  glasses: number;
}

export interface PPEGraphData {
  granularity: Granularity;
  series: PPEKitBucket[];
  violationTypePieData: PieData[];
  zoneWisePieData: PieData[];
}

// ─── Fall / Laydown ───────────────────────────────────────────────────────────

export interface FallSeriesItem {
  date?: string;
  time?: string;
  day?: string;
  count: number;
}

export interface FallLaydownGraphData {
  granularity: Granularity;
  series: FallSeriesItem[];
  zoneWisePieData: PieData[];
}

// ─── Crowd Gathering ──────────────────────────────────────────────────────────

export interface CrowdSeriesItem {
  date?: string;
  time?: string;
  day?: string;
  count: number;
  mobCount: number;
}

export interface CrowdGraphData {
  granularity: Granularity;
  series: CrowdSeriesItem[];
  zoneWisePieData: PieData[];
}
// ─── Vehicle In Walkways ──────────────────────────────────────────

export interface VehicleWalkwayPoint {
  time?: string;
  date?: string;
  value: number;
}

export interface VehicleWalkwaySeries {
  label: string;
  data: VehicleWalkwayPoint[];
}

export interface VehicleWalkwayGraphData {
  granularity: Granularity;
  series: VehicleWalkwaySeries[];
  zoneWisePieData: PieData[];
}
export interface VehicleWalkwayResponse {
  title: "Vehicle In Walkways";
  kpi: KpiData;
  graphs: { data: VehicleWalkwayGraphData };
}
// ─── Empty Graph ──────────────────────────────────────────────────────────────

export type EmptyGraphData = [];

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

export interface CrowdGatheringResponse {
  title: "Crowd Gathering Alerts";
  kpi: KpiData;
  graphs: { data: CrowdGraphData };
}

export interface EmptyDataResponse {
  title: "Emergency Exit Blockage";
  kpi: KpiData;
  graphs: { data: EmptyGraphData };
}

// ─── Main Union Type ──────────────────────────────────────────────────────────

export type SurveillanceDashboardResponse =
  | PPEKitDetectionResponse
  | FireSmokeResponse
  | FallLaydownResponse
  | CrowdGatheringResponse
  | VehicleWalkwayResponse
  | EmptyDataResponse;
// ─── Socket Payload ───────────────────────────────────────────────────────────

export interface SafetySocketPayload {
  type: "Safety_Dashboard_Update";
  tenantId: string;
  serverTimestamp: string;
  data: SurveillanceDashboardResponse[];
}