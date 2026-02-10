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
    route: "/PeopleCountPage",
    tooltipMessage:
      "Shows detected intrusion incidents in monitored zones during restricted hours.",
  },
  "Vehicle Count": {
    icon: DirectionsCar,
    route: "/VehicleCount",
    tooltipMessage: "Displays vehical count and anpr at entry exit gate.",
  },
  "Canteen Usage Monitoring": {
    icon: RestaurantIcon,
    route: "/MonitoringCanteenUsage&Timings",
    tooltipMessage: "Displays canteen usage and monitoring.",
  },
  "Vehicle Loading/Unloading Monitoring": {
    icon: LocalShipping,
    route: "/VehicleUnloadingLoading",
    tooltipMessage: "Displays vehical loading and unloading oprations",
  },
  "Unauthorised Parking / Blocking Aisles": {
    icon: Block,
    route: "/UnauthorizedParkingOrEquipmentBlockingAisles",
    tooltipMessage: "Shows unauthorized parking or equipment blocking.",
  },
};
