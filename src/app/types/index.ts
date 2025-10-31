import { SvgIconComponent } from "@mui/icons-material";

// Sidebar Menu Types
export interface MenuItem {
  name: string;
  icon: SvgIconComponent;
  page: PageType;
}

export interface AnalyticsMenuItem {
  name: string;
  page: PageType;
}

export interface AnalyticsMenuCategory {
  title: string;
  icon: SvgIconComponent;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  items: AnalyticsMenuItem[];
}

export interface AlertMenuItem {
  name: string;
  icon: SvgIconComponent;
  badge?: string;
  page?: PageType;
}

// Breadcrumb Types
export interface BreadcrumbItem {
  label: string;
  icon: SvgIconComponent | null;
  clickable: boolean;
  onClick?: () => void;
}

export interface Breadcrumb {
  label: string;
  href: string;
}

// KPI Card Types
export interface KpiData {
  title: string;
  value: string;

  icon: SvgIconComponent;
}

// Page Navigation Types
export type PageType =
  | "safety-compliance-dashboard"
  | "surveillance-monitoring-dashboard"
  | "operational-insights-dashboard"
  | "workforce-monitoring-dasboard"
  | "ppe-detection"
  | "intrusion-detection"
  | "employee-presence-critical-area"
  | "employee-presence-restricted-area"
  | "people-count"
  | "object-detection"
  | "fire-smoke-oil-leak-detection"
  | "vehicle-speed"
  | "fall-detection"
  | "fire-detection"
  | "security-breach"
  | "vehicle-tracking"
  | "work-hours"
  | "zone-occupancy"
  | "crowd-management"
  | "live-streaming"
  | "alerts"
  | "reports"
  | "settings"
  | "STPOverflowDetection-detection"
  | "emergency-exit-blockage-detection"
  | "crowd-gathering-in-hazardous-zones-detection"
  | "camera-tampering"
  | "people-presence"
  | "employee-idle-with-face-recognition"
  | "mobile-phone-usage"
  | "sleeping-absence-security-personnel"
  | "vehicle-count"
  | "tracking-vehicle"
  | "unauthorized-parking"
  | "employee-idle-time"
  | "face-recognition"
  | "unauthorized-access"
  | "monitoring-canteen-usage"
  | "role-management"
  | "user-management"
  | "configurator"
  | "camera-tamparing-dasboard";
// Component Props Types
export interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export interface BreadcrumbProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

// Activity Feed Types
export interface ActivityItem {
  id: string;
  message: string;
  time: string;
  severity: "high" | "medium" | "low";
  zone?: string;
}

export interface ActivityData {
  title: string;
  desc: string;
  location: string;
  time: string;
  id: string;
  priority: "HIGH" | "MEDIUM" | "NORMAL";
  color: string;
}

// Camera Status Types
export interface CameraZone {
  zone: string;
  active: number;
  offline: number;
  tempred: number;
  total: number;
}

export interface ZoneViolationsdata {
  zone: string;
  violations: number;
  alarms: number;
}

// Analytics Data Types
export interface PPEViolation {
  id: string;
  employee?: string;
  workerId?: string; // Alternative naming
  zone: string;
  violation?: string;
  violationType?: string; // Alternative naming
  timestamp: string;
  severity: "high" | "medium" | "low" | "HIGH" | "MEDIUM" | "CRITICAL";
  status?:
    | "ACTIVE"
    | "ACKNOWLEDGED"
    | "RESOLVED"
    | "active"
    | "resolved"
    | "investigating";
  camera?: string;
  resolution?: string;
}

export interface IntrusionAlert {
  id: string;
  location: string;
  description: string;
  timestamp: string;
  status: "active" | "resolved" | "investigating";
}

export interface EmployeePresenceData {
  id: string;
  name: string;
  zone: string;
  entryTime: string;
  status: "present" | "absent" | "break";
}

export interface PeopleCountData {
  zone: string;
  current: number;
  capacity: number;
  percentage: number;
  status: "normal" | "warning" | "critical";
}

// Zone Data Types
export interface ZoneData {
  id: string;
  name: string;
  isLive: boolean;
  complianceRate: number;
  peopleDetected: number;
  activeViolations: number;
  noHelmetDetected: number;
  roiDetection?: {
    workerId: string;
    detected: boolean;
  };
}
