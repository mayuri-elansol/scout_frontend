// workforceKpiConfig.ts

import { People, Security, Smartphone, Visibility } from "@mui/icons-material";

export const WorkforceMonitoringConfig = {
  "Employee Presence in Critical Areas": {
    icon: People,
    route: "/employeePresenceCriticalArea",
    tooltipMessage:
      "Shows the number of employees detected in critical areas .",
  },
    "Employee Presence in Restricted Areas": {
    icon: People,
    route: "/employeePresenceRestrictedArea",
    tooltipMessage:
      "Shows the number of employees detected in restricted areas.",
  },
  "Employee Idle Time Monitoring": {
    icon: Visibility,
    route: "/employeeIdleTime",
    tooltipMessage:
      "Shows employee presence in areas that require special clearance.",
  },
  "Mobile Phone Usage in Restricted Zones": {
    icon: Smartphone,
    route: "/mobilePhoneUsage",
    tooltipMessage:
      "Displays incidents of unauthorized mobile phone usage inside critical areas.",
  },
  "Sleeping / Absence of Security Guards": {
    icon: Security,
    route: "/sleepingSecurityPersonnel",
    tooltipMessage:
      "Shows detected cases of security personnel sleeping or absent from their post.",
  },
};
