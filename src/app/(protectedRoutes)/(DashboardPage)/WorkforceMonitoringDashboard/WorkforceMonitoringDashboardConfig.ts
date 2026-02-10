// workforceKpiConfig.ts

import { People, Security, Smartphone, Visibility } from "@mui/icons-material";

export const WorkforceMonitoringConfig = {
  "Employee in Critical Area": {
    icon: People,
    route: "/EmployeePresenceCriticalArea",
    tooltipMessage:
      "Shows the number of employees detected in critical areas where restricted access is enforced.",
  },
  "Employee Idel Time": {
    icon: Visibility,
    route: "/EmployeeIdleTime",
    tooltipMessage:
      "Shows employee presence in areas that require special clearance.",
  },
  "Mobile Phone Usage in Critical Area": {
    icon: Smartphone,
    route: "/MobilePhoneUsage",
    tooltipMessage:
      "Displays incidents of unauthorized mobile phone usage inside critical areas.",
  },
  "Sleeping / Absence of Security Personnel": {
    icon: Security,
    route: "/SleepingSecurityPersonnel",
    tooltipMessage:
      "Shows detected cases of security personnel sleeping or absent from their post.",
  },
};
