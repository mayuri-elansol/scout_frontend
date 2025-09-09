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
  subtitle: string;
  trend: string;
  trendColor: string;
  color: string;
  bgColor: string;
  icon: SvgIconComponent;
}

// Page Navigation Types
export type PageType =
  | "dashboard"
  | "ppe-detection"
  | "intrusion-detection"
  | "employee-presence"
  | "people-count"
  | "object-detection"
  | "fire-smoke-oil-leak-detection"
  | "vehicle-speed"
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
  | "welcome";

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
  id?: string;
  zone?: string; // Legacy support
  name?: string;
  status?: "online" | "offline" | "warning";
  cameras?: number;
  active?: number;
  total?: number;
  priority?: string;
  shift?: string;
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
