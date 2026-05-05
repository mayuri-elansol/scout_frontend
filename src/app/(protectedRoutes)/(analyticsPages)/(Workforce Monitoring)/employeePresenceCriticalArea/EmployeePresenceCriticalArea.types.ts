// import { EmployeePresenceCriticalAreaKpiConfig } from "./EmployeePresenceCriticalAreaConfig";

// export interface Violation {
//   voilation: string;
//   zone: string;
//   time: string;
//   imageUrl: string;
//   incident: string;
//   [key: string]: string | number | boolean; // extra dynamic fields
// }

// export interface EmployeePresenceCriticalAreaViolation extends Violation {
//   cameraId: string;
// }

// export interface FilterParams {
//   violation?: string;
//   zone?: string;
//   camera?: string;
//   startDate?: string;
//   endDate?: string;
// }
// export type KpiColour = "red" | "green" | "blue";
// export interface EmployeePresenceCriticalAreaKpiItem {
//   title: keyof typeof EmployeePresenceCriticalAreaKpiConfig;
//   value: number | string;
//   colour: KpiColour;
// }

// export interface EmployeePresenceCriticalAreaViolation {
//   violation: string;
//   zone: string;
//   time: string;
//   imageUrl: string;
//   camera: string;
//   [key: string]: string | number | boolean;
// }

// export interface EmployeePresenceCriticalAreaZoneViolation {
//   zone: string;
//   violations: number;
//   subViolations: {
//     label: string;
//     value: number;
//   }[];
// }

// export interface EmployeePresenceCriticalAreaDetailedReportResponse {
//   data: EmployeePresenceCriticalAreaViolation[];
//   zones: string[];
//   cameras: string[];
//   total: number;
// }
// export interface EmployeeIdleTimeSocketPayload {
//   serverTimestamp: string;
//   kpi: EmployeePresenceCriticalAreaKpiItem[];
//   zoneViolations: EmployeePresenceCriticalAreaZoneViolation[];
//   recentViolations: EmployeePresenceCriticalAreaViolation[];
// }

// export interface EmployeePresenceCriticalAreaTimeFilterParams {
//   violation?: string;
//   zone?: string;
//   camera?: string;
//   startDate?: string;
//   endDate?: string;
// }

// export type EmployeePresenceCriticalAreaSingleReportRequest = {
//   tenantId: string;
//   violation?: string;
//   zone?: string;

//   camera?: string;
//   imageUrl?: string;
//   time?: string;
// };

// export type EmployeePresenceCriticalAreaReportRequest = {
//   tenantId: string;
//   startDate: string;
//   endDate: string;
//   violation?: string;
//   zone?: string;
//   camera?: string;
// };

// export interface ShiftType {
//   shiftId: string;
//   name: string;
//   startTime: string;
//   endTime: string;
//   breakStartTime: string;
//   breakEndTime: string;
//   status: string;
// }
// type EmployeePresenceCriticalAreaResponse = {
//   kpi: EmployeePresenceCriticalAreaKpiItem[];
//   zoneViolations: EmployeePresenceCriticalAreaZoneViolation[];
//   recentViolations: EmployeePresenceCriticalAreaViolation[];
// };
import { EmployeePresenceCriticalAreaKpiConfig } from "./EmployeePresenceCriticalAreaConfig";

/* ---------- KPI ---------- */
export type KpiTitle = keyof typeof EmployeePresenceCriticalAreaKpiConfig;
export type KpiColour = "red" | "green" | "blue";

export interface EmployeePresenceCriticalAreaKpiItem {
  title: KpiTitle;
  value: number | string;
  colour: KpiColour;
}

/* ---------- VIOLATIONS ---------- */
export interface EmployeePresenceCriticalAreaViolation {
  violation: string;
  zone: string;
  time: string;
  imageUrl: string;
  camera: string;
  alarmTriggered: boolean;
  [key: string]: string | number | boolean;
}

/* ---------- ZONE VIOLATIONS ---------- */
export interface EmployeePresenceCriticalAreaZoneViolation {
  zone: string;
  violations: number;
}

/* ---------- DETAILED REPORT ---------- */
export interface EmployeePresenceCriticalAreaDetailedReportResponse {
  data: EmployeePresenceCriticalAreaViolation[];
  zones: string[];
  cameras: string[];
  total: number;
}

/* ---------- FILTER PARAMS ---------- */
export interface EmployeePresenceCriticalAreaFilterParams {
  violation?: string;
  zone?: string;
  camera?: string;
  alarmTriggered?: string;
  startDate?: string;
  endDate?: string;
}

/* ---------- SOCKET PAYLOAD ---------- */
export interface EmployeePresenceCriticalAreaSocketPayload {
  serverTimestamp: string;
  kpi: EmployeePresenceCriticalAreaKpiItem[];
  zoneViolations: EmployeePresenceCriticalAreaZoneViolation[];
  recentViolations: EmployeePresenceCriticalAreaViolation[];
}

/* ---------- API REQUEST TYPES ---------- */
export type EmployeePresenceCriticalAreaSingleReportRequest = {
  tenantId: string;
  violation?: string;
  zone?: string;
  camera?: string;
  imageUrl?: string;
  time?: string;
  alarmTriggered?: boolean;
};

export type EmployeePresenceCriticalAreaReportRequest = {
  tenantId: string;
  startDate?: string;
  endDate?: string;
  violation?: string;
  zone?: string;
  camera?: string;
};

/* ---------- OVERVIEW RESPONSE ---------- */
export type EmployeePresenceCriticalAreaResponse = {
  kpi: EmployeePresenceCriticalAreaKpiItem[];
  zoneViolations: EmployeePresenceCriticalAreaZoneViolation[];
  recentViolations: EmployeePresenceCriticalAreaViolation[];
};

/* ---------- SHIFTS ---------- */
export interface ShiftType {
  shiftId: string;
  name: string;
  startTime: string;
  endTime: string;
  breakStartTime: string;
  breakEndTime: string;
  status: string;
}