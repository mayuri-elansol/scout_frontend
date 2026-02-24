// workforceKpiConfig.ts

export const MainDashboardConfig = {
  //camera tampering

  //workfocemonitoring
  "Employee in Critical Area": {
    route: "/employeePresenceCriticalArea",
  },
  "Employee Idle Time": {
    route: "/employeeIdleTime",
  },
  "Mobile Phone Usage in Critical Area": {
    route: "/mobilePhoneUsage",
  },
  "Sleeping / Absence of Security Personnel": {
    route: "/sleepingSecurityPersonnel",
  },

  //survilance monitoring
  "Intrusion Detection": {
    route: "/intrusionDetectionPage",
  },
  "Unauthorized Access In Restrcited Areas": {
    route: "/unauthorizedAccessInRestrictedAreas",
  },
  "Camera Tempering Detection": {
    route: "/cameraTampering",
  },
  "Movement During Shutdown": {
    route: "/movementDuringShutdownHours",
  },

  //safty monitoring

  "PPE Violations": {
    route: "/ppeKitDetectionPage",
  },
  "Fire / Smoke / Gas / Oil Alerts": {
    route: "/fireSmokeOilLeakDetection",
  },
  "Vehicle In Walkways": {
    route: "/vehicalSpeedMonitoring",
  },
  "Fall / Laydown Alerts": {
    route: "/fallDetection",
  },

  "Emergency Exit Blockage": {
    route: "/emergencyExitBlockage",
  },
  "Crowd Gathering Alerts": {
    route: "/crowdGathering",
  },

  //opretation monitoring

  "People Count": {
    route: "/peopleCountPage",
  },
  "Vehicle Count": {
    route: "/vehicleCount",
  },
  "Canteen Usage Monitoring": {
    route: "/monitoringCanteenUsage&Timings",
  },
  "Vehicle Loading/Unloading Monitoring": {
    route: "/vehicleUnloadingLoading",
  },
  "Unauthorised Parking / Blocking Aisles": {
    route: "/unauthorizedParkingOrEquipmentBlockingAisles",
  },
};

export const CameraTamperingDashboardConfig = {
  //camera tampering

  "Total Cameras": {
    route: "/dashboard",
  },
  "Total Online Cameras": {
    route: "/dashboard",
  },
  "Total Offline Cameras": {
    route: "/dashboard",
  },
  "Tampering Incidents Detected": {
    route: "/dashboard",
  },
  "Zones Affected": {
    route: "/dashboard",
  },
};
