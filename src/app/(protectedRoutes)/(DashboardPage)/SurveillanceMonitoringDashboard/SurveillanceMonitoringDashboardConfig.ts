// ppeKpiConfig.ts

import { People, Security, VideocamOff } from "@mui/icons-material";

export const surveillanceDashboardConfig = {
  "Intrusion Detection": {
    icon: Security,
    route: "/IntrusionDetectionPage",
    tooltipMessage:
      "Shows detected intrusion incidents in monitored zones during restricted hours.",
  },
  "Unauthorized Access In Restrcited Areas": {
    icon: People,
    route: "/UnauthorizedAccessInRestrictedAreas",
    tooltipMessage: "Displays unauthorized acess in restricted ares.",
  },
  "Camera Tempering Detection": {
    icon: VideocamOff,
    route: "/CameraTampering",
    tooltipMessage:
      "Displays people detected inside premises during shutdown hours.",
  },
  "Movement During Shutdown": {
    icon: People,
    route: "/PeoplePresence",
    tooltipMessage:
      "Displays people detected inside premises during shutdown hours.",
  },
};
