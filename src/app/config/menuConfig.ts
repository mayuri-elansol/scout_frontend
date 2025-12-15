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
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PeopleIcon from "@mui/icons-material/People";
import TuneIcon from "@mui/icons-material/Tune";
import VideocamIcon from "@mui/icons-material/Videocam";
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

// Live Streaming menu (at the top)
export const liveStreamingMenu: MenuItemConfig[] = [
  {
    name: "Live Streaming",
    icon: VideoCall,
    page: "live-streaming",
    path: "/LiveStreamingPage",
  },
];

// Dashboard menu
export const dashboardMenu: CategoryConfig[] = [
  {
    title: "Dashboard",
    icon: SpaceDashboardIcon,
    items: [
      {
        name: "Safety And Compliance ",
        page: "safety-compliance-dashboard",
        path: "/SafetyAndComplianceDashboard",
      },
      {
        name: "Surveillance Monitoring ",
        page: "surveillance-monitoring-dashboard",
        path: "/SurveillanceMonitoringDashboard",
      },
      {
        name: " Operational Insights ",
        page: "operational-insights-dashboard",
        path: "/OperationalInsightsDashboard",
      },
      {
        name: "Workforce Monitoring ",
        page: "workforce-monitoring-dasboard",
        path: "/WorkforceMonitoringDashboard",
      },
      {
        name: "Camera Tamparing ",
        page: "camera-tamparing-dasboard",
        path: "/CameraTamperingDashboard",
      },
    ],
  },
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
  // Configurator as a nested category
  {
    title: "Configurator",
    icon: TuneIcon,
    items: [
      {
        name: "Camera Management",
        page: "camera-management",
        path: "/Configurator/CameraManagement",
      },
      {
        name: "Use-Case Manager",
        page: "use-case-manager",
        path: "/Configurator/UseCaseManager",
      },
      {
        name: "Zone-Location Mapping",
        page: "zone-location-mapping",
        path: "/Configurator/ZoneLocationMapping",
      },
    ],
  },
];

// Analytics categories
export const analyticsMenu: CategoryConfig[] = [
  // {
  //   title: "Camera Tamparing",
  //   icon: VideocamIcon,
  //   items: [
  // {
  //   name: "Camera Tamparing Dashboard",
  //   page: "camera-tamparing-dasboard",
  //   path: "/CameraTamperingDashboard",
  // },
  //   ],
  // },
  {
    title: "Safety and Compliance",
    icon: Shield,
    items: [
      {
        name: "PPE Detection (Helmet,Vest,Gloves,Mask)",
        page: "ppe-detection",
        path: "/PPEKitDetectionPage",
      },
      {
        name: "Fire, Smoke, Oil and Visible Gas Leak Detection",
        page: "fire-smoke-oil-leak-detection",
        path: "/FireSmokeOilLeakDetection",
      },
      {
        name: "Fall / Laydown Detection",
        page: "fall-detection",
        path: "/FallDetection",
      },
      {
        name: "Forklift / Vehicle In Walkways",
        page: "object-detection",
        path: "/ObjectDetection",
      },
      {
        name: "Emergency Exit Blockage Detection",
        page: "emergency-exit-blockage-detection",
        path: "/EmergencyExitBlockage",
      },
      {
        name: "Crowd Detection In Hazardous Zones",
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
        name: "Intrusion Detection At Perimeter",
        page: "intrusion-detection",
        path: "/IntrusionDetectionPage",
      },
      {
        name: "Unauthorized Access In Restricted Areas",
        page: "unauthorized-access",
        path: "/UnauthorizedAccessInRestrictedAreas",
      },
      {
        name: "Camera Tampering Detection",
        page: "camera-tampering",
        path: "/CameraTampering",
      },
      {
        name: "Movement During Shutdown Hours",
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
        name: "Employee Presence In Critical Areas",
        page: "employee-presence-critical-area",
        path: "/EmployeePresenceCriticalArea",
      },
      {
        name: "Employee Presence In Restricted Areas",
        page: "employee-presence-restricted-area",
        path: "/EmployeePresenceRestrictedArea",
      },
      {
        name: "Employee Idle Time Monitoring",
        page: "employee-idle-time",
        path: "/EmployeeIdleTime",
      },
      {
        name: "Mobile Phone Usage In Restricted Zones",
        page: "mobile-phone-usage",
        path: "/MobilePhoneUsage",
      },
      {
        name: "Sleeping / Absence Of Security Guards",
        page: "sleeping-absence-security-personnel",
        path: "/SleepingSecurityPersonnel",
      },
    ],
  },
  {
    title: "Operational Insight",
    icon: DirectionsCar,
    items: [
      {
        name: "People Count In Factory Premises ",
        page: "people-count",
        path: "/PeopleCountPage",
      },
      {
        name: "Vehicle Count & ANPR At Gates",
        page: "vehicle-count",
        path: "/VehicleCount",
      },
      {
        name: "Canteen Usage Monitoring",
        page: "monitoring-canteen-usage",
        path: "/MonitoringCanteenUsage&Timings",
      },
      {
        name: "Vehicle Unloading / Loading Monitoring",
        page: "tracking-vehicle",
        path: "/VehicleUnloadingLoading",
      },
      {
        name: "Unauthorized Parking / Blocking Aisles",
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
        name: "Face Recognition for Entry/Exit Logging",
        page: "face-recognition",
        path: "/FaceRecognition",
      },
      {
        name: "Employee Idle Time Monitoring with Face Recognition",
        page: "employee-idle-with-face-recognition",
        path: "/EmployeeIdleTimeMonitoringWithFaceRecognition",
      },
    ],
  },
];
