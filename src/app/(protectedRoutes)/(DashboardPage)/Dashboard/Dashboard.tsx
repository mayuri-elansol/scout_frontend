"use client";

import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  LocalFireDepartment,
  HealthAndSafety,
  DirectionsCar,
  WarningAmber,
  DoorFront,
  Groups,
  Shield,
  Visibility,
  People,
  Security,
  VideocamOff,
  LocalShipping,
  Block,
  Smartphone,
  Warning,
  Room,
} from "@mui/icons-material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { v4 as uuidv4 } from "uuid";

import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";

const Dashboard: React.FC = () => {
  // Camera Tampering KPIs - Top Section
  const CameraTamperingKpiData = [
    {
      title: "Total Offline Cameras",
      violationsCount: 42,
      lastDetection: "Various Zones",
      lastDetectionTime: "Ongoing",
      tooltipMessage:
        "Shows the total number of offline cameras currently monitored in the system.",
      icon: VideocamOff,
      route: "/CameraTampering",
    },
    {
      title: "Total Tampered Cameras",
      violationsCount: 5,
      lastDetection: "Multiple Zones",
      lastDetectionTime: "Recent",
      tooltipMessage: "The total number of tampered detected cameras.",
      icon: Warning,
      route: "/CameraTampering",
    },
    {
      title: "Offline Camera Zone",
      violationsCount: 0,
      lastDetection: "Zone A",
      lastDetectionTime: "Latest",
      icon: Room,
      tooltipMessage:
        "The zone where the most recent offline cameras occurred.",
      route: "/CameraTampering",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "#bbdefb",
    },
    {
      title: "Tampered Camera Zone",
      violationsCount: 0,
      lastDetection: "Zone B",
      lastDetectionTime: "Latest",
      icon: Room,
      tooltipMessage:
        "The zone where the most recent tampered cameras occurred.",
      route: "/CameraTampering",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "#bbdefb",
    },
  ];

  // Safety and Compliance KPIs
  const safetyAndComplianceKpiData = [
    {
      title: "PPE Violations",
      violationsCount: 5,
      lastDetection: "Zone A",
      lastDetectionTime: "09:58 AM",
      icon: HealthAndSafety,
      route: "/PPEKitDetectionPage",
      tooltipMessage: "Shows total PPE rule violations detected today.",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "#bbdefb",
    },
    {
      title: "Fire / Smoke / Gas / Oil Alerts",
      violationsCount: 1,
      lastDetection: "Zone B",
      lastDetectionTime: "09:58 AM",
      icon: LocalFireDepartment,
      route: "/FireSmokeOilLeakDetection",
      tooltipMessage:
        "Displays fire, smoke, gas, or oil leakage alerts detected on site.",
    },
    {
      title: "Vehicle In Walkways",
      violationsCount: 12,
      lastDetection: "Parking Zone",
      lastDetectionTime: "10:58 AM",
      icon: DirectionsCar,
      route: "/ObjectDetection",
      tooltipMessage: "Shows overspeed and unsafe driving incidents detected.",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "#bbdefb",
    },
    {
      title: "Fall / Laydown Alerts",
      violationsCount: 1,
      lastDetection: "Production Floor",
      lastDetectionTime: "10:40 AM",
      icon: WarningAmber,
      route: "/FallDetection",
      tooltipMessage: "Indicates workers detected lying down or falling.",
    },
    {
      title: "Emergency Exit Blockage",
      violationsCount: 2,
      lastDetection: "Exit 3",
      lastDetectionTime: "9:28 AM",
      icon: DoorFront,
      route: "/EmergencyExitBlockage",
      tooltipMessage: "Detects obstruction or blockage near emergency exits.",
    },
    {
      title: "Crowd Gathering Alerts",
      violationsCount: 0,
      lastDetection: "Cafeteria",
      lastDetectionTime: "11:05 AM",
      icon: Groups,
      route: "/CrowdGathering",
      tooltipMessage:
        "Identifies abnormal or unsafe crowd gathering in monitored areas.",
    },
  ];

  // Surveillance Monitoring KPIs
  const surveillanceMonitoringKpiData = [
    {
      title: "Intrusion Detection",
      violationsCount: 3,
      lastDetection: "Zone B - Gate 2",
      lastDetectionTime: "02:15 AM",
      icon: Security,
      route: "/IntrusionDetectionPage",
      tooltipMessage:
        "Shows detected intrusion incidents in monitored zones during restricted hours.",
    },
    {
      title: "Unauthorized Access In Restricted Areas",
      violationsCount: 4,
      lastDetection: "Zone C",
      lastDetectionTime: "3:10 AM",
      icon: People,
      route: "/UnauthorizedAccessInRestrictedAreas",
      tooltipMessage: "Displays unauthorized access in restricted areas.",
    },
    {
      title: "Camera Tampering Detection",
      violationsCount: 2,
      lastDetection: "Zone C",
      lastDetectionTime: "2:42 PM",
      icon: VideocamOff,
      route: "/CameraTampering",
      tooltipMessage:
        "Alerts when cameras are tampered with or obstructed.",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "#bbdefb",
    },
    {
      title: "Movement During Shutdown",
      violationsCount: 2,
      lastDetection: "Warehouse Zone 4",
      lastDetectionTime: "01:45 AM",
      icon: People,
      route: "/PeoplePresence",
      tooltipMessage:
        "Displays people detected inside premises during shutdown hours.",
    },
  ];

  // Operational Insights KPIs
  const operationalInsightsKpiData = [
    {
      title: "People Count",
      violationsCount: 53,
      lastDetection: "Zone B - Gate 2",
      lastDetectionTime: "02:15 AM",
      icon: People,
      route: "/PeopleCountPage",
      tooltipMessage:
        "Shows detected intrusion incidents in monitored zones during restricted hours.",
    },
    {
      title: "Vehicle Count",
      violationsCount: 2,
      lastDetection: "Main Gate A",
      lastDetectionTime: "10:20 PM",
      icon: DirectionsCar,
      route: "/VehicleCount",
      tooltipMessage: "Displays vehicle count and ANPR at entry exit gate.",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "#bbdefb",
    },
    {
      title: "Canteen Usage Monitoring",
      violationsCount: 13,
      lastDetection: "Main Canteen",
      lastDetectionTime: "3:24 AM",
      icon: RestaurantIcon,
      route: "/MonitoringCanteenUsage&Timings",
      tooltipMessage: "Displays canteen usage and monitoring.",
    },
    {
      title: "Vehicle Loading/Unloading Monitoring",
      violationsCount: 8,
      lastDetection: "Loading Bay A",
      lastDetectionTime: "10:10 PM",
      icon: LocalShipping,
      route: "/VehicleUnloadingLoading",
      tooltipMessage: "Displays vehicle loading and unloading operations.",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "#bbdefb",
    },
    {
      title: "Unauthorised Parking / Blocking Aisles",
      violationsCount: 5,
      lastDetection: "Loading Bay A",
      lastDetectionTime: "10:27 PM",
      icon: Block,
      route: "/UnauthorizedParkingOrEquipmentBlockingAisles",
      tooltipMessage: "Shows unauthorized parking or equipment blocking.",
    },
  ];

  // Workforce Monitoring KPIs
  const workforceMonitoringKpiData = [
    {
      title: "Employee in Critical Area",
      violationsCount: 7,
      lastDetection: "Critical Zone A",
      lastDetectionTime: "03:25 PM",
      icon: People,
      route: "/EmployeePresenceCriticalArea",
      tooltipMessage:
        "Shows the number of employees detected in critical areas where restricted access is enforced.",
    },
    {
      title: "Employee Idle Time",
      violationsCount: 2,
      lastDetection: "Production Floor A",
      lastDetectionTime: "4:20 PM",
      icon: Visibility,
      route: "/EmployeeIdleTime",
      tooltipMessage:
        "Shows employee presence in areas that require special clearance.",
    },
    {
      title: "Mobile Phone Usage in Critical Area",
      violationsCount: 3,
      lastDetection: "Critical Zone C",
      lastDetectionTime: "01:50 PM",
      icon: Smartphone,
      route: "/MobilePhoneUsage",
      tooltipMessage:
        "Displays incidents of unauthorized mobile phone usage inside critical areas.",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "#bbdefb",
    },
    {
      title: "Sleeping / Absence of Security Personnel",
      violationsCount: 2,
      lastDetection: "Gate 2 - Shift B",
      lastDetectionTime: "02:30 AM",
      icon: Security,
      route: "/SleepingSecurityPersonnel",
      tooltipMessage:
        "Shows detected cases of security personnel sleeping or absent from their post.",
    },
  ];

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        px: 2,
        backgroundColor: "#ffffff",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Top Right Time Filter */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          flexWrap: "wrap",
          py: 1,
          flexShrink: 0,
        }}
      >
        <TimeFilter />
      </Box>

      {/* Camera Tampering Section - Top */}
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          mb: 1,
          flexShrink: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: 16,
            mb: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <VideocamOff sx={{ color: "#1976d2", fontSize: 20 }} />
          Camera Tampering
        </Typography>
        <Grid container spacing={0.5} sx={{ mb: 0 }} alignItems="stretch">
          {CameraTamperingKpiData.map((kpi, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 6, lg: 3, xl: 3 }}
              key={uuidv4() + index}
            >
              <DashboardKpiCard {...kpi} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Four Main Sections in 2x2 Grid - Scrollable */}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          mb: 1,
        }}
      >
        <Grid container spacing={1.5} sx={{ height: "100%" }}>
          {/* Top Left - Safety and Compliance */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ height: "50%" }}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 1.5,
                backgroundColor: "#ffffff",
                borderRadius: 2,
                height: "100%",
                overflow: "hidden",
                border: "2px solid #e0e0e0",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: 16,
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexShrink: 0,
                }}
              >
                <Shield sx={{ color: "#1976d2", fontSize: 20 }} />
                Safety And Compliance
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#bdbdbd",
                    borderRadius: "3px",
                  },
                }}
              >
                <Grid container spacing={1.5} alignItems="stretch">
                  {safetyAndComplianceKpiData.map((kpi, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={uuidv4() + index}>
                      <DashboardKpiCard {...kpi} variant="square" />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Top Right - Surveillance Monitoring */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ height: "50%" }}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 1.5,
                backgroundColor: "#ffffff",
                borderRadius: 2,
                height: "100%",
                overflow: "hidden",
                border: "2px solid #e0e0e0",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: 16,
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexShrink: 0,
                }}
              >
                <Visibility sx={{ color: "#1976d2", fontSize: 20 }} />
                Surveillance Monitoring
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#bdbdbd",
                    borderRadius: "3px",
                  },
                }}
              >
                <Grid container spacing={1.5} alignItems="stretch">
                  {surveillanceMonitoringKpiData.map((kpi, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={uuidv4() + index}>
                      <DashboardKpiCard {...kpi} variant="square" />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Bottom Left - Operational Insights */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ height: "50%" }}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 1.5,
                backgroundColor: "#ffffff",
                borderRadius: 2,
                height: "100%",
                overflow: "hidden",
                border: "2px solid #e0e0e0",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: 16,
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexShrink: 0,
                }}
              >
                <DirectionsCar sx={{ color: "#1976d2", fontSize: 20 }} />
                Operational Insights
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#bdbdbd",
                    borderRadius: "3px",
                  },
                }}
              >
                <Grid container spacing={1.5} alignItems="stretch">
                  {operationalInsightsKpiData.map((kpi, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={uuidv4() + index}>
                      <DashboardKpiCard {...kpi} variant="square" />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Bottom Right - Workforce Monitoring */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ height: "50%" }}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 1.5,
                backgroundColor: "#ffffff",
                borderRadius: 2,
                height: "100%",
                overflow: "hidden",
                border: "2px solid #e0e0e0",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: 16,
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexShrink: 0,
                }}
              >
                <People sx={{ color: "#1976d2", fontSize: 20 }} />
                Workforce Monitoring
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#bdbdbd",
                    borderRadius: "3px",
                  },
                }}
              >
                <Grid container spacing={1.5} alignItems="stretch">
                  {workforceMonitoringKpiData.map((kpi, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={uuidv4() + index}>
                      <DashboardKpiCard {...kpi} variant="square" />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Dashboard;
