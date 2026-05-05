//safetyKpiConfig.ts

import {
  LocalFireDepartment,
  HealthAndSafety,
  DirectionsCar,
  WarningAmber,
  DoorFront,
  Groups,
} from "@mui/icons-material";

export const SafetyMonitoringConfig = {
  "PPE Violations": {
    icon: HealthAndSafety,
    route: "/ppeKitDetectionPage",
    tooltipMessage: "Shows total PPE rule violations detected today.",
  },
  "Fire & Smoke Alerts": {
    icon: LocalFireDepartment,
    route: "/fireSmokeDetection",
    tooltipMessage:
      "Displays fire, smoke, gas, or oil leakage alerts detected on site.",
  },
  "Vehicle In Walkways": {
    icon: DirectionsCar,
    route: "/vehicalSpeedMonitoring",
    tooltipMessage: "Shows vehical or forklift driving incidents in walkways.",
  },
  "Fall / Laydown Alerts": {
    icon: WarningAmber,
    route: "/fallDetection",
    tooltipMessage: "Indicates workers detected lying down or falling.",
  },

  "Emergency Exit Blockage": {
    icon: DoorFront,
    route: "/emergencyExitBlockage",
    tooltipMessage: "Detects obstruction or blockage near emergency exits.",
  },
  "Crowd Gathering Alerts": {
    icon: Groups,
    route: "/crowdGathering",
    tooltipMessage:
      "Identifies abnormal or unsafe crowd gathering in monitored areas.",
  },
};
