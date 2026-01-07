// import { PageType } from "../types/index";
// import {
//   Shield,
//   Visibility,
//   People,
//   Settings,
//   VideoCall,
//   Warning,
//   DirectionsCar,
// } from "@mui/icons-material";
// import FaceRecognitionIcon from "@mui/icons-material/CenterFocusWeak";
// import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import PeopleIcon from "@mui/icons-material/People";
// import TuneIcon from "@mui/icons-material/Tune";
// import VideocamIcon from "@mui/icons-material/Videocam";
// import { OverridableComponent } from "@mui/material/OverridableComponent";
// import { SvgIconTypeMap } from "@mui/material/SvgIcon";

// import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
// import { FEATURE } from "./featureRegistry";

// // export interface MenuItemConfig {
// //   path: string;
// //   name: string;
// //   page?: PageType;
// //   icon?: OverridableComponent<SvgIconTypeMap<object, "svg">>;
// //   badge?: string;
// //   featureFlag?: boolean;
// //   featureId?: string;
// // }
// export interface MenuItemConfig {
//   path?: string;
//   name: string;
//   page?: PageType;
//   icon?: OverridableComponent<SvgIconTypeMap<object, "svg">>;
//   badge?: string;
//   featureFlag?: boolean;
//   featureId?: string;
//   items?: MenuItemConfig[]; // ✅ REQUIRED
// }

// export interface CategoryConfig {
//   title: string;
//   icon?: OverridableComponent<SvgIconTypeMap<object, "svg">>;
//   items: MenuItemConfig[];
//   featureId?: string;
// }

// // Live Streaming menu (at the top)
// export const liveStreamingMenu: MenuItemConfig[] = [
//   {
//     name: "Live Streaming",
//     icon: VideoCall,
//     page: "live-streaming",
//     path: "/LiveStreamingPage-new",
//     featureId: FEATURE.LIVE_STREAMING,
//   },
// ];
// export const Permission = [
//   {
//     name: "Add Features",
//     page: "Add-Features",
//     path: "/AddFeatures",
//     featureId: FEATURE.ADD_FEATURES,
//   },
//   {
//     name: "View Role",
//     page: "View-Role",
//     path: "/ViewRole",
//     featureId: FEATURE.VIEW_ROLE,
//   },
//   {
//     name: "Edit Role",
//     page: "Edit-Role",
//     path: "/EditRole",
//     featureId: FEATURE.EDIT_ROLE,
//   },
//   {
//     name: "Delete Role",
//     page: "Delete-Role",
//     featureId: FEATURE.DELETE_ROLE,
//   },
//   {
//     name: "Role Overview",
//     page: "Role-Overview",
//     featureId: FEATURE.ROLE_OVERVIEW,
//   },
// ];

// // Dashboard menu
// export const dashboardMenu: CategoryConfig[] = [
//   {
//     title: "Dashboard",
//     icon: SpaceDashboardIcon,
//     items: [
//       {
//         name: "Safety And Compliance ",
//         page: "safety-compliance-dashboard",
//         path: "/SafetyAndComplianceDashboard",
//         featureId: FEATURE.SAFETY_COMPLIANCE,
//       },
//       {
//         name: "Surveillance Monitoring ",
//         page: "surveillance-monitoring-dashboard",
//         path: "/SurveillanceMonitoringDashboard",
//         featureId: FEATURE.SURVEILLANCE_MONITORING,
//       },
//       {
//         name: " Operational Insights ",
//         page: "operational-insights-dashboard",
//         path: "/OperationalInsightsDashboard",
//         featureId: FEATURE.OPERATIONAL_INSIGHTS,
//       },
//       {
//         name: "Workforce Monitoring ",
//         page: "workforce-monitoring-dashboard",
//         path: "/WorkforceMonitoringDashboard",
//         featureId: FEATURE.WORKFORCE_MONITORING,
//       },
//     ],
//   },
// ];

// // Alert menu
// export const alertMenu: MenuItemConfig[] = [
//   {
//     name: "Alerts",
//     icon: Warning,
//     badge: "12",
//     page: "alerts",
//     path: "/AlertsPage",
//     featureId: FEATURE.ALERTS,
//   },
// ];

// // Settings as a category (not clickable itself)
// // export const settingsMenu: CategoryConfig[] = [
// //   {
// //     title: "Settings",
// //     icon: Settings,
// //     items: [
// //       {
// //         name: "Role Management",
// //         icon: ManageAccountsIcon,
// //         page: "role-management",
// //         path: "/RoleOverview",
// //         featureId: FEATURE.ROLE_MANAGEMENT,
// //       },
// //       {
// //         name: "User Management",
// //         icon: PeopleIcon,
// //         page: "user-management",
// //         path: "/UserOverview",
// //         featureId: FEATURE.USER_MANAGEMENT,
// //       },
// //       {
// //         name: "Configurator",
// //         icon: TuneIcon,
// //         page: "configurator",
// //         path: "/Configurator",
// //         featureId: FEATURE.CONFIGURATOR,
// //       },
// //     ],
// //   },
// // ];
// export const settingsMenu: CategoryConfig[] = [
//   {
//     title: "Settings",
//     icon: Settings,
//     items: [
//       {
//         name: "Role Management",
//         icon: ManageAccountsIcon,
//         page: "role-management",
//         path: "/RoleOverview",
//         featureId: FEATURE.ROLE_MANAGEMENT,
//       },
//       {
//         name: "User Management",
//         icon: PeopleIcon,
//         page: "user-management",
//         path: "/UserOverview",
//         featureId: FEATURE.USER_MANAGEMENT,
//       },

//       // 👇 Configurator as a nested menu
//       {
//         name: "Configurator",
//         icon: TuneIcon,
//         items: [
//           {
//             name: "Camera Management",
//             page: "camera-management",
//             path: "/CameraManagement",
//             featureId: FEATURE.CAMERA_MANAGEMENT,
//           },
//           {
//             name: "Use-Case Manager",
//             page: "use-case-manager",
//             path: "/UseCaseManager",
//             featureId: FEATURE.USE_CASE_MANAGER,
//           },
//           {
//             name: "Zone-Location Mapping",
//             page: "zone-location-mapping",
//             path: "ZoneLocationMapping",
//             featureId: FEATURE.ZONE_LOCATION_MAPPING,
//           },
//         ],
//       },
//     ],
//   },
// ];

// // Analytics categories
// export const analyticsMenu: CategoryConfig[] = [
//   {
//     title: "Camera Tamparing",
//     icon: VideocamIcon,
//     items: [
//       {
//         name: "Camera Tamparing Dashboard",
//         page: "camera-tamparing-dasboard",
//         path: "/CameraTamperingDashboard",
//         featureId: FEATURE.CAMERA_TAMPERING,
//       },
//     ],
//   },
//   {
//     title: "Safety and Compliance",
//     icon: Shield,
//     items: [
//       {
//         name: "PPE Detection (Helmet,Vest,Gloves,Mask)",
//         page: "ppe-detection",
//         path: "/PPEKitDetectionPage",
//         featureId: FEATURE.PPE_DETECTION,
//       },
//       {
//         name: "Fire, Smoke, Oil and Visible Gas Leak Detection",
//         page: "fire-smoke-oil-leak-detection",
//         path: "/FireSmokeOilLeakDetection",
//         featureId: FEATURE.FIRE_SMOKE,
//       },
//       {
//         name: "Fall / Laydown Detection",
//         page: "fall-detection",
//         path: "/FallDetection",
//         featureId: FEATURE.FALL_DETECTION,
//       },
//       {
//         name: "Forklift / Vehicle In Walkways",
//         page: "object-detection",
//         path: "/ObjectDetection",
//         featureId: FEATURE.OBJECT_DETECTION,
//       },
//       {
//         name: "Emergency Exit Blockage Detection",
//         page: "emergency-exit-blockage-detection",
//         path: "/EmergencyExitBlockage",
//         featureId: FEATURE.EMERGENCY_EXIT_BLOCKAGE,
//       },
//       {
//         name: "Crowd Detection In Hazardous Zones",
//         page: "crowd-gathering-in-hazardous-zones-detection",
//         path: "/CrowdGathering",
//         featureId: FEATURE.CROWD_DETECTION,
//       },
//     ],
//   },
//   {
//     title: "Surveillance Monitoring",
//     icon: Visibility,
//     items: [
//       {
//         name: "Intrusion Detection At Perimeter",
//         page: "intrusion-detection",
//         path: "/IntrusionDetectionPage",
//         featureId: FEATURE.INTRUSION_DETECTION,
//       },
//       {
//         name: "Unauthorized Access In Restricted Areas",
//         page: "unauthorized-access",
//         path: "/UnauthorizedAccessInRestrictedAreas",
//         featureId: FEATURE.UNAUTHORIZED_ACCESS,
//       },
    
//       {
//         name: "Movement During Shutdown Hours",
//         page: "people-presence",
//         path: "/PeoplePresence",
//         featureId: FEATURE.PEOPLE_PRESENCE,
//       },
//     ],
//   },
//   {
//     title: "Workforce Monitoring",
//     icon: People,
//     items: [
//       {
//         name: "Employee Presence In Critical Areas",
//         page: "employee-presence-critical-area",
//         path: "/EmployeePresenceCriticalArea",
//         featureId: FEATURE.EMPLOYEE_PRESENCE_CRITICAL_AREA,
//       },
//       {
//         name: "Employee Presence In Restricted Areas",
//         page: "employee-presence-restricted-area",
//         path: "/EmployeePresenceRestrictedArea",
//         featureId: FEATURE.EMPLOYEE_PRESENCE_RESTRICTED_AREA,
//       },
//       {
//         name: "Employee Idle Time Monitoring",
//         page: "employee-idle-time",
//         path: "/EmployeeIdleTime",
//         featureId: FEATURE.EMPLOYEE_IDLE_TIME,
//       },
//       {
//         name: "Mobile Phone Usage In Restricted Zones",
//         page: "mobile-phone-usage",
//         path: "/MobilePhoneUsage",
//         featureId: FEATURE.MOBILE_PHONE_USAGE,
//       },
//       {
//         name: "Sleeping / Absence Of Security Guards",
//         page: "sleeping-absence-security-personnel",
//         path: "/SleepingSecurityPersonnel",
//         featureId: FEATURE.SLEEPING_SECURITY_PERSONNEL,
//       },
//     ],
//   },
//   {
//     title: "Operational Insight",
//     icon: DirectionsCar,
//     items: [
//       {
//         name: "People Count In Factory Premises ",
//         page: "people-count",
//         path: "/PeopleCountPage",
//         featureId: FEATURE.PEOPLE_COUNT,
//       },
//       {
//         name: "Vehicle Count & ANPR At Gates",
//         page: "vehicle-count",
//         path: "/VehicleCount",
//         featureId: FEATURE.VEHICLE_COUNT,
//       },
//       {
//         name: "Canteen Usage Monitoring",
//         page: "monitoring-canteen-usage",
//         path: "/MonitoringCanteenUsage&Timings",
//         featureId: FEATURE.CANTEEN_USAGE,
//       },
//       {
//         name: "Vehicle Unloading / Loading Monitoring",
//         page: "tracking-vehicle",
//         path: "/VehicleUnloadingLoading",
//         featureId: FEATURE.VEHICLE_UNLOADING_LOADING,
//       },
//       {
//         name: "Unauthorized Parking / Blocking Aisles",
//         page: "unauthorized-parking",
//         path: "/UnauthorizedParkingOrEquipmentBlockingAisles",
//         featureId: FEATURE.UNAUTHORIZED_PARKING,
//       },
//     ],
//   },
//   {
//     title: "Facial Recognition Analytics",
//     icon: FaceRecognitionIcon,
//     items: [
//       {
//         name: "Face Recognition for Entry/Exit Logging",
//         page: "face-recognition",
//         path: "/FaceRecognition",
//         featureId: FEATURE.FACE_RECOGNITION,
//       },
//       {
//         name: "Employee Idle Time Monitoring with Face Recognition",
//         page: "employee-idle-with-face-recognition",
//         path: "/EmployeeIdleTimeMonitoringWithFaceRecognition",
//         featureId: FEATURE.FACE_IDLE_MONITORING,
//       },
//     ],
//   },
// ];
// //  ADD THIS AT THE BOTTOM
// export const menuConfig = {
//   liveStreamingMenu,
//   dashboardMenu,
//   alertMenu,
//   analyticsMenu,
//   settingsMenu,
// };
import { PageType } from "../types";
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
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import { FEATURE } from "./featureRegistry";

/* =========================
   TYPES
========================= */

interface BaseMenuItem {
  name: string;
  icon?: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  page?: PageType;
  featureId?: string;      // permission-based
  featureFlag?: boolean;   // frontend on/off
}

export interface LinkMenuItem extends BaseMenuItem {
  type: "link";
  path: string;
  badge?: string;
}

export interface GroupMenuItem extends BaseMenuItem {
  type: "group";
  items: MenuItemConfig[];
}

export type MenuItemConfig = LinkMenuItem | GroupMenuItem;

export interface CategoryConfig {
  title: string;
  icon?: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  items: MenuItemConfig[];
  featureId?: string;
}

/* =========================
   LIVE STREAMING
========================= */

export const liveStreamingMenu: MenuItemConfig[] = [
  {
    type: "link",
    name: "Live Streaming",
    icon: VideoCall,
    page: "live-streaming",
    path: "/LiveStreamingPage",
    featureId: FEATURE.LIVE_STREAMING,
    featureFlag: true,
  },
];

/* =========================
   DASHBOARD
========================= */

export const dashboardMenu: CategoryConfig[] = [
  {
    title: "Dashboard",
    icon: SpaceDashboardIcon,
    items: [
      {
        type: "link",
        name: "Safety And Compliance",
        page: "safety-compliance-dashboard",
        path: "/SafetyAndComplianceDashboard",
        featureId: FEATURE.SAFETY_COMPLIANCE,
      },
      {
        type: "link",
        name: "Surveillance Monitoring",
        page: "surveillance-monitoring-dashboard",
        path: "/SurveillanceMonitoringDashboard",
        featureId: FEATURE.SURVEILLANCE_MONITORING,
      },
      {
        type: "link",
        name: "Operational Insights",
        page: "operational-insights-dashboard",
        path: "/OperationalInsightsDashboard",
        featureId: FEATURE.OPERATIONAL_INSIGHTS,
      },
      {
        type: "link",
        name: "Workforce Monitoring",
        page: "workforce-monitoring-dashboard",
        path: "/WorkforceMonitoringDashboard",
        featureId: FEATURE.WORKFORCE_MONITORING,
      },
    ],
  },
];

/* =========================
   ALERTS
========================= */

export const alertMenu: MenuItemConfig[] = [
  {
    type: "link",
    name: "Alerts",
    icon: Warning,
    badge: "12",
    page: "alerts",
    path: "/AlertsPage",
    featureId: FEATURE.ALERTS,
  },
];

/* =========================
   SETTINGS
========================= */

export const settingsMenu: CategoryConfig[] = [
  {
    title: "Settings",
    icon: Settings,
    items: [
      {
        type: "link",
        name: "Role Management",
        icon: ManageAccountsIcon,
        path: "/RoleOverview",
        featureId: FEATURE.ROLE_MANAGEMENT,
      },
      {
        type: "link",
        name: "User Management",
        icon: PeopleIcon,
        path: "/UserOverview",
        featureId: FEATURE.USER_MANAGEMENT,
      },
      {
        type: "group",
        name: "Configurator",
        icon: TuneIcon,
        featureFlag: true,
        items: [
          {
            type: "link",
            name: "Camera Management",
            path: "/CameraManagement",
            featureId: FEATURE.CAMERA_MANAGEMENT,
          },
          {
            type: "link",
            name: "Use-Case Manager",
            path: "/UseCaseManager",
            featureId: FEATURE.USE_CASE_MANAGER,
          },
          {
            type: "link",
            name: "Zone-Location Mapping",
            path: "/ZoneLocationMapping",
            featureId: FEATURE.ZONE_LOCATION_MAPPING,
          },
        ],
      },
    ],
  },
];

/* =========================
   ANALYTICS
========================= */

export const analyticsMenu: CategoryConfig[] = [
  {
    title: "Camera Tampering",
    icon: VideocamIcon,
    items: [
      {
        type: "link",
        name: "Camera Tampering Dashboard",
        path: "/CameraTamperingDashboard",
        featureId: FEATURE.CAMERA_TAMPERING,
      },
    ],
  },
  {
    title: "Safety and Compliance",
    icon: Shield,
    items: [
      {
        type: "link",
        name: "PPE Detection",
        path: "/PPEKitDetectionPage",
        featureId: FEATURE.PPE_DETECTION,
      },
      {
        type: "link",
        name: "Fire / Smoke Detection",
        path: "/FireSmokeOilLeakDetection",
        featureId: FEATURE.FIRE_SMOKE,
      },
      {
        type: "link",
        name: "Fall Detection",
        path: "/FallDetection",
        featureId: FEATURE.FALL_DETECTION,
      },
    ],
  },
  {
    title: "Surveillance Monitoring",
    icon: Visibility,
    items: [
      {
        type: "link",
        name: "Intrusion Detection",
        path: "/IntrusionDetectionPage",
        featureId: FEATURE.INTRUSION_DETECTION,
      },
      {
        type: "link",
        name: "Unauthorized Access",
        path: "/UnauthorizedAccessInRestrictedAreas",
        featureId: FEATURE.UNAUTHORIZED_ACCESS,
      },
      {
        type: "link",
        name: "Movement During Shutdown Hours",
        path: "/PeoplePresence",
        featureId: FEATURE.PEOPLE_PRESENCE,
      },
    ],
  },
  {
    title: "Workforce Monitoring",
    icon: People,
    items: [
      {
        type: "link",
        name: "Employee Presence (Critical Area)",
        path: "/EmployeePresenceCriticalArea",
        featureId: FEATURE.EMPLOYEE_PRESENCE_CRITICAL_AREA,
      },
      {
        type: "link",
        name: "Employee Idle Time",
        path: "/EmployeeIdleTime",
        featureId: FEATURE.EMPLOYEE_IDLE_TIME,
      },
    ],
  },
  {
    title: "Operational Insight",
    icon: DirectionsCar,
    items: [
      {
        type: "link",
        name: "People Count",
        path: "/PeopleCountPage",
        featureId: FEATURE.PEOPLE_COUNT,
      },
      {
        type: "link",
        name: "Vehicle Count",
        path: "/VehicleCount",
        featureId: FEATURE.VEHICLE_COUNT,
      },
    ],
  },
  {
    title: "Facial Recognition Analytics",
    icon: FaceRecognitionIcon,
    items: [
      {
        type: "link",
        name: "Face Recognition",
        path: "/FaceRecognition",
        featureId: FEATURE.FACE_RECOGNITION,
      },
      {
        type: "link",
        name: "Employee Idle (Face Recognition)",
        path: "/EmployeeIdleTimeMonitoringWithFaceRecognition",
        featureId: FEATURE.FACE_IDLE_MONITORING,
      },
    ],
  },
];

/* =========================
   EXPORT
========================= */

export const menuConfig = {
  liveStreamingMenu,
  dashboardMenu,
  alertMenu,
  analyticsMenu,
  settingsMenu,
};
