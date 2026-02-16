// workforceKpiConfig.ts

export const MainDashboardConfig = {
  //workfocemonitoring
  "Employee in Critical Area": {
    route: "/EmployeePresenceCriticalArea",
  },
  "Employee Idel Time": {
    route: "/EmployeeIdleTime",
  },
  "Mobile Phone Usage in Critical Area": {
    route: "/MobilePhoneUsage",
  },
  "Sleeping / Absence of Security Personnel": {
    route: "/SleepingSecurityPersonnel",
  },

  //survilance monitoring
  "Intrusion Detection": {
    route: "/IntrusionDetectionPage",
  },
  "Unauthorized Access In Restrcited Areas": {
    route: "/UnauthorizedAccessInRestrictedAreas",
  },
  "Camera Tempering Detection": {
    route: "/CameraTampering",
  },
  "Movement During Shutdown": {
    route: "/PeoplePresence",
  },

  //safty monitoring

  "PPE Violations": {
    route: "/PPEKitDetectionPage",
  },
  "Fire / Smoke / Gas / Oil Alerts": {
    route: "/FireSmokeOilLeakDetection",
  },
  "Vehicle In Walkways": {
    route: "/VehicalSpeedMonitoring",
  },
  "Fall / Laydown Alerts": {
    route: "/FallDetection",
  },

  "Emergency Exit Blockage": {
    route: "/EmergencyExitBlockage",
  },
  "Crowd Gathering Alerts": {
    route: "/CrowdGathering",
  },

  //opretation monitoring

  "People Count": {
    route: "/PeopleCountPage",
  },
  "Vehicle Count": {
    route: "/VehicleCount",
  },
  "Canteen Usage Monitoring": {
    route: "/MonitoringCanteenUsage&Timings",
  },
  "Vehicle Loading/Unloading Monitoring": {
    route: "/VehicleUnloadingLoading",
  },
  "Unauthorised Parking / Blocking Aisles": {
    route: "/UnauthorizedParkingOrEquipmentBlockingAisles",
  },
};
