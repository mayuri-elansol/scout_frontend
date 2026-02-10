// EmployeeIdelTimeKpiConfig.ts
import { AccessTime, Room } from "@mui/icons-material";
import WorkIcon from "@mui/icons-material/Work";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";

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
    icon: WorkIcon,
    tooltipMessage: "Total number of working events detected by the system.",
  },
  "Total Not Working Events": {
    icon: PauseCircleFilledIcon,
    tooltipMessage:
      "Total number of non-working events detected by the system.",
  },
};
