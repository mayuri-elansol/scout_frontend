// EmployeeIdelTimeKpiConfig.ts
import {
  LocationOn,
  AccessTime,
  Construction, // ✅ replaces invalid 'Engineering'
  Checkroom,
  Visibility,
  Room,
} from "@mui/icons-material";

export const EmployeeIdelTimeKpiConfig = {
  "Total Idle Events": {
    icon: AccessTime,
    tooltipMessage: "Total number of idle time events detected by the system.",
  },
  "Last Idle Detection Time": {
    icon: AccessTime,
    tooltipMessage: "The most recent idle detection timestamp.",
  },
  "Last Idle Detection Zone": {
    icon: Room,
    tooltipMessage: "The zone where the most recent idle event was detected.",
  },
  "Total Working Events": {
    icon: Checkroom,
    tooltipMessage: "Total number of working events detected by the system.",
  },
  "Total Not Working Events": {
    icon: Visibility,
    tooltipMessage:
      "Total number of non-working events detected by the system.",
  },
};
