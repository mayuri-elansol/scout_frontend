

export interface WorkforceMonitoringSocketPayload {
  type: "WORKFORCE_UPDATE";
  tenantId: string;
  serverTimestamp: string;
  data: WorkforceMonitoringDashboardResponse[];
}



// ─── Shared KPI ───────────────────────────────────────────────────────────────
interface WorkforceKpi {
  title: string;
  colour: "red" | "green" | "blue" | "gray";
  violationsCount?: number;
  lastDetection?: string;
  lastDetectionTime?: string;
}

// ─── Critical Area card ───────────────────────────────────────────────────────
export interface CriticalAreaSeriesPoint {
  count: number;
  date:string;
  time?:string;
  day?:string;
}
export interface CriticalAreaSeries {
  zone: string;
  color: string;
  data: CriticalAreaSeriesPoint[];
}
export interface CriticalAreaGraphData {
  granularity: "hour" | "weekday" | "week";
  
  series: CriticalAreaSeries[];
}
export interface EmployeeInCriticalAreaResponse {
  title: "Employee in Critical Area" | "Employee in Restricted Area";
  kpi: WorkforceKpi;
  graphs: { data: CriticalAreaGraphData };
}

// ─── Flat bar-chart cards ─────────────────────────────────────────────────────
export interface WorkforceGatePoint {
  gate: string;
  idleCount: number;
  workingCount: number;
  notPresentCount: number;
}
export interface FlatGraphResponse {
  title:
    | "Employee Idle Time"
    | "Mobile Phone Usage in Critical Area"
    | "Sleeping / Absence of Security Personnel";
  kpi: WorkforceKpi;
  graphs?: { data?: WorkforceGatePoint[] };
}

// ─── Union — discriminated on `title` ────────────────────────────────────────
export type WorkforceMonitoringDashboardResponse =
  | EmployeeInCriticalAreaResponse
  | FlatGraphResponse;