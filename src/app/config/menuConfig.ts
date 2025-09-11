// src/config/menuConfig.ts
import { PageType } from "../types/index";
import {
  Home,
  BarChart,
  Shield,
  Visibility,
  People,
  Settings,
  VideoCall,
  Warning,
} from "@mui/icons-material";

export interface MenuItemConfig {
  path: string;
  name: string;
  page?: PageType;
  icon?: any;
  badge?: string;
  featureFlag?: boolean;
}

export interface AnalyticsCategoryConfig {
  title: string;
  icon?: any;
  items: MenuItemConfig[];
}

// Dashboard menu
export const dashboardMenu: MenuItemConfig[] = [
  { name: "Dashboard", icon: Home, page: "dashboard", path: "/DashboardPage" },
];

// Alert & Other menu
export const alertMenu: MenuItemConfig[] = [
  {
    name: "Alerts",
    icon: Warning,
    badge: "12",
    page: "alerts",
    path: "/AlertsPage",
  },
  // { name: 'Reports', icon: Description, page: 'reports', path: '/reports' },
  { name: "Settings", icon: Settings, page: "settings", path: "/settings" },
  {
    name: "Live Streaming",
    icon: VideoCall,
    page: "live-streaming",
    path: "/LiveStreamingPage",
  },
];

// Analytics categories
export const analyticsMenu: AnalyticsCategoryConfig[] = [
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
    title: "Security Monitoring",
    icon: Visibility,
    items: [
      {
        name: "Intrusion Detection at Premises Perimeter",
        page: "intrusion-detection",
        path: "/IntrusionDetectionPage",
      },
    ],
  },
  {
    title: "Workforce Monitoring",
    icon: People,
    items: [
      {
        name: "Employee presence detection in critical areas",
        page: "employee-presence",
        path: "/EmployeePresencePage",
      },
    ],
  },
  {
    title: "Operational Insight",
    icon: BarChart,
    items: [
      {
        name: "People count in factory Premises",
        page: "people-count",
        path: "/PeopleCountPage",
      },
    ],
  },
];
