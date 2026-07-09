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
  "PPE Detection (Helmet, Vest, Glasses)": {
    icon: HealthAndSafety,
    route: "/ppeKitDetectionPage",
    tooltipMessage: "Shows total PPE rule violations detected today.",
  },
  "Fire and Smoke Detection": {
    icon: LocalFireDepartment,
    route: "/fireSmokeDetection",
    tooltipMessage:
      "Displays fire, smoke, gas, or oil leakage alerts detected on site.",
  },
  "Forklift / Vehicle in Walkways": {
    icon: DirectionsCar,
    route: "/forkliftVehicleInWalkways",
    tooltipMessage: "Shows vehical or forklift driving incidents in walkways.",
  },
  "Fall Detection": {
    icon: WarningAmber,
    route: "/fallDetection",
    tooltipMessage: "Indicates workers detected lying down or falling.",
  },

  "Emergency Exit Blockage Detection": {
    icon: DoorFront,
    route: "/emergencyExitBlockage",
    tooltipMessage: "Detects obstruction or blockage near emergency exits.",
  },
  "Crowd Detection in Hazardous Zones": {
    icon: Groups,
    route: "/crowdGathering",
    tooltipMessage:
      "Identifies abnormal or unsafe crowd gathering in monitored areas.",
  },
};
