// woprationKpiConfig.ts

import {
  People,
  DirectionsCar,
  LocalShipping,
  Block,
} from "@mui/icons-material";

import RestaurantIcon from "@mui/icons-material/Restaurant";
export const WorkforceMonitoringConfig = {
  "People Count": {
    icon: People,
    route: "/peopleCountPage",
    tooltipMessage:
      "Shows detected intrusion incidents in monitored zones during restricted hours.",
  },
  "Vehicle Count": {
    icon: DirectionsCar,
    route: "/vehicleCount",
    tooltipMessage: "Displays vehical count and anpr at entry exit gate.",
  },
  "Canteen Usage Monitoring": {
    icon: RestaurantIcon,
    route: "/monitoringCanteenUsage&Timings",
    tooltipMessage: "Displays canteen usage and monitoring.",
  },
  "Vehicle Loading/Unloading Monitoring": {
    icon: LocalShipping,
    route: "/vehicleUnloadingLoading",
    tooltipMessage: "Displays vehical loading and unloading oprations",
  },
  "Unauthorised Parking / Blocking Aisles": {
    icon: Block,
    route: "/unauthorizedParkingOrEquipmentBlockingAisles",
    tooltipMessage: "Shows unauthorized parking or equipment blocking.",
  },
};
