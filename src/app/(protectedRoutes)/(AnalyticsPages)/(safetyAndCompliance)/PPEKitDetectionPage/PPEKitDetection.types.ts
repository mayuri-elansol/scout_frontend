import { SvgIconComponent } from "@mui/icons-material";
import { ppeKpiConfig } from "./PPEKitDetectionConfig";

// export interface FilterParams {
//   status?: string;
//   employeeName?: string;
//   startDate?: string;
//   endDate?: string;
// }
export interface FilterParams {
  violation?: string;
  zone?: string;
  cameraId?: string;
  alarmTriggered?: string;
  startDate?: string;
  endDate?: string;
}
export interface TableData {
  id: number;
  helmet: boolean;
  vest: boolean;
  glasses: boolean;
  zone: string;
  snapshot: string;
  cameraid: string;
  alarmTriggered: boolean;
  createdAt: string;
}

// ✅ Request Type
export interface PpeKitDetectionRequest {
  tenantId: string;
}

// ✅ Response Type (match with your NestJS DTO)
export interface PpeKitDetectionResponse {
  totalViolations: number;
  currentUnsafeZone: string | null;
  lastDetectionTime: string | null;
  missingHelmet: number;
  missingVest: number;
  missingGlasses: number;
}

export interface PPEKpi {
  title: string;
  value: number | string;
  icon: SvgIconComponent; // required, matches KpiCardProps
  tooltipMessage?: string;
}

export interface KpiItem {
  title: keyof typeof ppeKpiConfig | string;
  value: number | string;
  colour: string;
}
export interface SubViolationInterface {
  label: string;
  value: number;
}

export interface ZoneViolationInteface {
  zone: string;
  violations: number;
  subViolations: SubViolationInterface[];
}
