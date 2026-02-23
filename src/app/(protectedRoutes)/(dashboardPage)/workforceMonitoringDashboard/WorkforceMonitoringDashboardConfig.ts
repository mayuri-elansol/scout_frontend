// workforceKpiConfig.ts

import { People, Security, Smartphone, Visibility } from "@mui/icons-material";

export const WorkforceMonitoringConfig = {
  "Employee in Critical Area": {
    icon: People,
    route: "/employeePresenceCriticalArea",
    tooltipMessage:
      "Shows the number of employees detected in critical areas where restricted access is enforced.",
  },
  "Employee Idle Time": {
    icon: Visibility,
    route: "/employeeIdleTime",
    tooltipMessage:
      "Shows employee presence in areas that require special clearance.",
  },
  "Mobile Phone Usage in Critical Area": {
    icon: Smartphone,
    route: "/mobilePhoneUsage",
    tooltipMessage:
      "Displays incidents of unauthorized mobile phone usage inside critical areas.",
  },
  "Sleeping / Absence of Security Personnel": {
    icon: Security,
    route: "/sleepingSecurityPersonnel",
    tooltipMessage:
      "Shows detected cases of security personnel sleeping or absent from their post.",
  },
};
