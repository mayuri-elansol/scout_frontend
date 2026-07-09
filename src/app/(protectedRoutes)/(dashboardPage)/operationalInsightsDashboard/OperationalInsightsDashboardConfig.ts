// woprationKpiConfig.ts

import {
  People,
  DirectionsCar,
  LocalShipping,
  Block,
} from "@mui/icons-material";

import RestaurantIcon from "@mui/icons-material/Restaurant";
export const OperationalInsightsConfig = {
  "People Count in Factory Premises": {
    icon: People,
    route: "/peopleCountPage",
    tooltipMessage:
      "Shows detected intrusion incidents in monitored zones during restricted hours.",
  },
  "Vehicle Count & ANPR at Gates": {
    icon: DirectionsCar,
    route: "/vehicleCount",
    tooltipMessage: "Displays vehical count and anpr at entry exit gate.",
  },
  "Canteen Usage Monitoring": {
    icon: RestaurantIcon,
    route: "/monitoringCanteenUsage&Timings",
    tooltipMessage: "Displays canteen usage and monitoring.",
  },
  "Vehicle Unloading / Loading Monitoring": {
    icon: LocalShipping,
    route: "/vehicleUnloadingLoading",
    tooltipMessage: "Displays vehical loading and unloading oprations",
  },
  "Unauthorized Parking / Blocking Aisles": {
    icon: Block,
    route: "/unauthorizedParkingOrEquipmentBlockingAisles",
    tooltipMessage: "Shows unauthorized parking or equipment blocking.",
  },
};
