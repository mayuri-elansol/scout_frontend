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
  title: "People Inside";
  kpi: OperationalKpi;
  graphs: { data: PeopleInsideGraphData };
}

// ─── Vehicle Count ────────────────────────────────────────────────────────────
export interface VehicleCountResponse {
  title: "Vehicle Count";
  kpi: OperationalKpi;
  graphs: { data: [] };
}

// ─── Canteen Usage Monitoring ─────────────────────────────────────────────────
export interface WorkingSlotData {
  startTime: number;
  stopTime: number;
  label: string;
}
export interface CanteenGraphData {
  times: string[];
  usageData: number[];
  workingSlots: WorkingSlotData[];
}
export interface CanteenUsageResponse {
  title: "Canteen Usage Monitoring";
  kpi: OperationalKpi;
  graphs: { data: CanteenGraphData | [] };
}

// ─── Vehicle Loading/Unloading Monitoring ─────────────────────────────────────
export interface VehicleLoadingResponse {
  title: "Vehicle Loading/Unloading Monitoring";
  kpi: OperationalKpi;
  graphs: { data: [] };
}

// ─── Unauthorised Parking / Blocking Aisles ───────────────────────────────────
export interface UnauthorisedParkingResponse {
  title: "Unauthorised Parking / Blocking Aisles";
  kpi: OperationalKpi;
  graphs: { data: [] };
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