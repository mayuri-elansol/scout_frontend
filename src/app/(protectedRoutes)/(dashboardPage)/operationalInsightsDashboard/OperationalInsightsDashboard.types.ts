export interface ShiftType {
  shiftId: string;
  name: string;
  startTime: string;
  endTime: string;
  breakStartTime: string;
  breakEndTime: string;
  status: string;
}

interface OperationalKpi {
  title: string;
  colour: "red" | "green" | "blue" | "gray";
  violationsCount?: number;
  lastDetection?: string;
  lastDetectionTime?: string;
}

// ─── People Inside ────────────────────────────────────────────────────────────
export interface PeopleInsideSeriesPoint {
  date: string;
  time: string;
  entryCount: number;
  exitCount: number;
}
export interface PeopleInsideSeries {
  zone: string;
  color: string;
  data: PeopleInsideSeriesPoint[];
}
export interface PeopleInsideGraphData {
  granularity: "hour" | "weekday" | "week";
  series: PeopleInsideSeries[];
}
export interface PeopleInsideResponse {
  title: "People Count in Factory Premises";
  kpi: OperationalKpi;
  graphs: { data: PeopleInsideGraphData };
}

// ─── Vehicle Count ────────────────────────────────────────────────────────────
// Same envelope as People Inside: entry/exit counts over time.
export interface VehicleCountResponse {
  title: "Vehicle Count & ANPR at Gates";
  kpi: OperationalKpi;
  graphs: { data: PeopleInsideGraphData | [] };
}

// ─── Canteen Usage Monitoring ─────────────────────────────────────────────────
export interface WorkingSlotData {
  startTime: number;
  stopTime: number;
  label: string;
}

export interface CanteenGraphPoint {
  date: string;
  time: string;
  breakfastCount: number;
  lunchCount: number;
  dinnerCount: number;
}
 
export interface CanteenGraphSeriesEntry {
  data: CanteenGraphPoint[];
}
 
export interface CanteenGraphData {
  granularity: "hour" | "weekday" | "week";
  series: CanteenGraphSeriesEntry[];
}export interface CanteenUsageResponse {
  title: "Canteen Usage Monitoring";
  kpi: OperationalKpi;
  graphs: { data: CanteenGraphData | [] };
}

// ─── Vehicle Loading/Unloading Monitoring ─────────────────────────────────────
// Same envelope as People Inside: entry/exit counts over time.
export interface VehicleLoadingResponse {
  title: "Vehicle Unloading / Loading Monitoring";
  kpi: OperationalKpi;
  graphs: { data: PeopleInsideGraphData | [] };
}

// ─── Unauthorised Parking / Blocking Aisles ───────────────────────────────────
// One line per zone: violation counts over time.
export interface ZoneCountPoint {
  date: string;
  time: string;
  count: number;
}
export interface ZoneCountSeries {
  zone: string;
  color: string;
  data: ZoneCountPoint[];
}
export interface ParkingGraphData {
  granularity: "hour" | "weekday" | "week";
  series: ZoneCountSeries[];
}
export interface UnauthorisedParkingResponse {
  title: "Unauthorized Parking / Blocking Aisles";
  kpi: OperationalKpi;
  graphs: { data: ParkingGraphData | [] };
}

// ─── Union ────────────────────────────────────────────────────────────────────
export type OperationalInsightsDashboardResponse =
  | PeopleInsideResponse
  | VehicleCountResponse
  | CanteenUsageResponse
  | VehicleLoadingResponse
  | UnauthorisedParkingResponse;

// ─── Socket ───────────────────────────────────────────────────────────────────
export interface OperationalInsightsSocketPayload {
  type: "OPERATIONAL_INSIGHTS_UPDATE";
  tenantId: string;
  serverTimestamp: string;
  data: OperationalInsightsDashboardResponse[];
}