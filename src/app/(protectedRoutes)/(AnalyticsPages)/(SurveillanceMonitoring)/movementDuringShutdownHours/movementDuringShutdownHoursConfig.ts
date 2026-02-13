import { Groups, LocationOn, AccessTime } from "@mui/icons-material";

export const movemnetDuringShutDownHrKpiConfig = {
  "Total People Count": {
    icon: Groups,
    tooltipMessage:
      "Shows the total number of people detected in monitored zones.",
  },
  "Detected Zones": {
    icon: LocationOn,
    tooltipMessage: "Lists the zones where people are currently detected.",
  },
  "Last Incidence": {
    icon: AccessTime,
    tooltipMessage:
      "Shows the time when the most recent people presence was detected.",
  },
};
