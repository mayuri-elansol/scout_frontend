export const SOCKET_EVENTS = {
  PPE_UPDATE: "ppe_update",
  FIRE_UPDATE: "fire_update",
  CROWD_UPDATE: "crowd_update",

  FIRE_SMOKE_UPDATE: "Fire_Smoke_Update",
  SAFETY_DASHBOARD_UPDATE: "Safety_Dashboard_Update",
  INTRUSION_UPDATE: "intrusion_update",
  EMPLOYEE_IDLE_UPDATE: "employee_idle_time_update",
  SURVEILLANCE_UPDATE: "surveillance_dashboard_update",
  WORKFORCE_UPDATE: "workforce_dashboard_update",
  MAIN_DASHBOARD_UPDATE: "main_dashboard_update",
  MOVEMENT_DURING_SHUTDOWN_HR_UPDATE: "movement_during_shutdown_hr_update",
} as const;
