

// src/config/menuConfig.ts
import { PageType } from "../types/index";
import {
  Shield,
  Visibility,
  People,
  Settings,
  VideoCall,
  Warning,
  DirectionsCar,

} from "@mui/icons-material";
import FaceRecognitionIcon from "@mui/icons-material/CenterFocusWeak";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"; // For Role Management
import PeopleIcon from "@mui/icons-material/People"; // For User Management

import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
export interface MenuItemConfig {
  path: string;
  name: string;
  page?: PageType;
  icon?: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  badge?: string;
  featureFlag?: boolean;
}

export interface CategoryConfig {
  title: string;
  icon?: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  items: MenuItemConfig[];
}

// Dashboard menu
export const dashboardMenu: MenuItemConfig[] = [
  { name: "Dashboard", icon: SpaceDashboardIcon, page: "dashboard", path: "/DashboardPage" },
];

// Alert menu
export const alertMenu: MenuItemConfig[] = [
  {
    name: "Alerts",
    icon: Warning,
    badge: "12",
    page: "alerts",
    path: "/AlertsPage",
  },
  {
    name: "Live Streaming",
    icon: VideoCall,
    page: "live-streaming",
    path: "/LiveStreamingPage",
  },
];

// Settings as a category (not clickable itself)
export const settingsMenu: CategoryConfig[] = [
  {
    title: "Settings",
    icon: Settings,
    items: [
      {
        name: "Role Management",
        icon: ManageAccountsIcon,
        page: "role-management",
        path: "/RoleManagement",
      },
      {
        name: "User Management",
        icon: PeopleIcon,
        page: "user-management",
        path: "/UserOverview",
      },
    ],
  },
];

// Analytics categories
export const analyticsMenu: CategoryConfig[] = [
  {
    title: "Safety and Compliance",
    icon: Shield,
    items: [
      {
        name: "Personal Protective Equipment (PPE) Detection",
        page: "ppe-detection",
        path: "/PPEDetectionPage",
      },
      {
        name: "Object Detection in Walking Bays",
        page: "object-detection",
        path: "/ObjectDetection",
      },
      {
        name: "Fire, Smoke, Oil and Gas Leak Detection",
        page: "fire-smoke-oil-leak-detection",
        path: "/FireSmokeOilLeakDetection",
      },
      {
        name: "Vehicle Speed Monitoring inside premises",
        page: "vehicle-speed",
        path: "/VehicalSpeedMonitoring",
      },
      {
        name: "Fall Detection /Laydown/Sleeping Detection in Work Area",
        page: "fall-detection",
        path: "/FallDetection",
      },
      {
        name: "STP/ETP Overflow Detection",
        page: "STPOverflowDetection-detection",
        path: "/STPOverflowDetection",
      },
      {
        name: "Emergency Exit Blockage Detection",
        page: "emergency-exit-blockage-detection",
        path: "/EmergencyExitBlockage",
      },
      {
        name: "Crowd Gathering in Hazardous Zones",
        page: "crowd-gathering-in-hazardous-zones-detection",
        path: "/CrowdGathering",
      },
    ],
  },
  {
    title: "Surveillance Monitoring",
    icon: Visibility,
    items: [
      {
        name: "Intrusion Detection at Premises Perimeter",
        page: "intrusion-detection",
        path: "/IntrusionDetectionPage",
      },
      {
        name: "Camera Tampering or Offline Detection",
        page: "camera-tampering",
        path: "/CameraTampering",
      },
      {
        name: "People Presence during Shutdown Hours",
        page: "people-presence",
        path: "/PeoplePresence",
      },
    ],
  },
  {
    title: "Workforce Monitoring",
    icon: People,
    items: [
      {
        name: "Employee Idle Time Monitoring",
        page: "employee-idle-time",
        path: "/EmployeeIdleTime",
      },
      {
        name: "Employee presence detection in critical areas",
        page: "employee-presence-critical-area",
        path: "/EmployeePresenceCriticalArea",
      },
      {
        name: "Employee presence detection in Restricted areas",
        page: "employee-presence-restricted-area",
        path: "/EmployeePresenceRestrictedArea",
      },
      {
        name: "Mobile Phone Usage in Restricted Areas",
        page: "mobile-phone-usage",
        path: "/MobilePhoneUsage",
      },
      {
        name: "People Count in Factory Premises based on Entry Exit person Counting",
        page: "people-count",
        path: "/PeopleCountPage",
      },
      {
        name: "Sleeping or Absence of Security Personnel",
        page: "sleeping-absence-security-personnel",
        path: "/SleepingSecurityPersonnel",
      },
    ],
  },
  {
    title: "Vehicle Operational Insight",
    icon: DirectionsCar,
    items: [
      {
        name: "Vehicle Count & ANPR at Entry/Exit Gates",
        page: "vehicle-count",
        path: "/VehicleCount",
      },
      {
        name: "Tracking Vehicle Unloading/Loading Time",
        page: "tracking-vehicle",
        path: "/VehicleUnloadingLoading",
      },
      {
        name: "Unauthorized Parking or Equipment Blocking Aisles",
        page: "unauthorized-parking",
        path: "/UnauthorizedParkingOrEquipmentBlockingAisles",
      },
    ],
  },
  {
    title: "Facial Recognition Analytics",
    icon: FaceRecognitionIcon,
    items: [
      {
        name: "Unauthorized Access in Restricted Areas",
        page: "unauthorized-access",
        path: "/UnauthorizedAccessInRestrictedAreas",
      },
      {
        name: "Face Recognition for Entry/Exit Logging",
        page: "face-recognition",
        path: "/FaceRecognition",
      },
      {
        name: "Monitoring Canteen Usage & Timings",
        page: "monitoring-canteen-usage",
        path: "/MonitoringCanteenUsage&Timings",
      },
      {
        name: "Employee Idle Time Monitoring with Face Recognition",
        page: "employee-idle-with-face-recognition",
        path: "/EmployeeIdleTimeMonitoringWithFaceRecognition",
      },
    ],
  },
];
