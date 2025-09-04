<<<<<<< HEAD
import { SvgIconComponent } from '@mui/icons-material';
=======
import { SvgIconComponent } from "@mui/icons-material";
>>>>>>> df7c71f2996b14c41b0cc7b9237b7cf134838c9a

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
<<<<<<< HEAD
export type PageType = 
  | 'dashboard' 
  | 'ppe-detection' 
  | 'intrusion-detection' 
  | 'employee-presence' 
  | 'people-count'
  | 'object-detection'
  | 'fire-detection'
  | 'vehicle-speed'
  | 'fire-incidents'
  | 'security-breach'
  | 'vehicle-tracking'
  | 'work-hours'
  | 'zone-occupancy'
  | 'crowd-management'
  | 'live-streaming'
  | 'alerts'
  | 'reports'
  | 'settings';

=======
export type PageType =
  | "dashboard"
  | "ppe-detection"
  | "intrusion-detection"
  | "employee-presence"
  | "people-count"
  | "object-detection"
  | "fire-detection"
  | "vehicle-speed"
  | "fire-incidents"
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
>>>>>>> df7c71f2996b14c41b0cc7b9237b7cf134838c9a

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
<<<<<<< HEAD
  severity: 'high' | 'medium' | 'low';
=======
  severity: "high" | "medium" | "low";
>>>>>>> df7c71f2996b14c41b0cc7b9237b7cf134838c9a
  zone?: string;
}

export interface ActivityData {
  title: string;
  desc: string;
  location: string;
  time: string;
  id: string;
<<<<<<< HEAD
  priority: 'HIGH' | 'MEDIUM' | 'NORMAL';
=======
  priority: "HIGH" | "MEDIUM" | "NORMAL";
>>>>>>> df7c71f2996b14c41b0cc7b9237b7cf134838c9a
  color: string;
}

// Camera Status Types
export interface CameraZone {
  id?: string;
  zone?: string; // Legacy support
  name?: string;
<<<<<<< HEAD
  status?: 'online' | 'offline' | 'warning';
=======
  status?: "online" | "offline" | "warning";
>>>>>>> df7c71f2996b14c41b0cc7b9237b7cf134838c9a
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
<<<<<<< HEAD
  severity: 'high' | 'medium' | 'low' | 'HIGH' | 'MEDIUM' | 'CRITICAL';
  status?: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED' | 'active' | 'resolved' | 'investigating';
=======
  severity: "high" | "medium" | "low" | "HIGH" | "MEDIUM" | "CRITICAL";
  status?:
    | "ACTIVE"
    | "ACKNOWLEDGED"
    | "RESOLVED"
    | "active"
    | "resolved"
    | "investigating";
>>>>>>> df7c71f2996b14c41b0cc7b9237b7cf134838c9a
  camera?: string;
  resolution?: string;
}

export interface IntrusionAlert {
  id: string;
  location: string;
  description: string;
  timestamp: string;
<<<<<<< HEAD
  status: 'active' | 'resolved' | 'investigating';
=======
  status: "active" | "resolved" | "investigating";
>>>>>>> df7c71f2996b14c41b0cc7b9237b7cf134838c9a
}

export interface EmployeePresenceData {
  id: string;
  name: string;
  zone: string;
  entryTime: string;
<<<<<<< HEAD
  status: 'present' | 'absent' | 'break';
=======
  status: "present" | "absent" | "break";
>>>>>>> df7c71f2996b14c41b0cc7b9237b7cf134838c9a
}

export interface PeopleCountData {
  zone: string;
  current: number;
  capacity: number;
  percentage: number;
<<<<<<< HEAD
  status: 'normal' | 'warning' | 'critical';
=======
  status: "normal" | "warning" | "critical";
>>>>>>> df7c71f2996b14c41b0cc7b9237b7cf134838c9a
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
