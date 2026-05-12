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
  VideocamOutlined,
  WifiTethering,
  WifiOff,
  Domain,
} from "@mui/icons-material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { v4 as uuidv4 } from "uuid";

import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCardMain from "@/app/components/molecules/DashboardKpiCardMain/DashboardKpiCardMain";

const Dashboard: React.FC = () => {
  const kpiData = [
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
      title: "Fire & Smoke Alerts",
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

  const surveillanceDashboradkpiData = [
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
      title: "Unauthorized Access In Restrcited Areas",
      violationsCount: 4,
      lastDetection: "Zone C",
      lastDetectionTime: "3:10 AM",
      icon: People,
      route: "/UnauthorizedAccessInRestrictedAreas",
      tooltipMessage: "Displays unauthorized acess in restricted ares.",
    },
    {
      title: "Camera Tempering Detection",
      violationsCount: 2,
      lastDetection: "Zone C",
      lastDetectionTime: "2:42 PM",
      icon: VideocamOff,
      route: "/CameraTampering",
      tooltipMessage:
        "Displays people detected inside premises during shutdown hours.",
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
  const operationalDashboardkpiData = [
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
      lastDetectionTime: "10.20 PM",
      icon: DirectionsCar,
      route: "/VehicleCount",
      tooltipMessage: "Displays vehical count and anpr at entry exit gate.",
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
      title: "Vehicle Loading Unloading Monitoring",
      violationsCount: 8,
      lastDetection: "Loading Bay A",
      lastDetectionTime: "10:10 PM",
      icon: LocalShipping,
      route: "/VehicleUnloadingLoading",
      tooltipMessage: "Displays vehical loading and unloading oprations",
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
  const WorkForcekpiData = [
    {
      title: "Employee in Critical Area",
      value: "7",
      violationsCount: 7,
      lastDetection: "Critical Zone A",
      lastDetectionTime: "03:25 PM",
      icon: People,
      route: "/EmployeePresenceCriticalArea",
      tooltipMessage:
        "Shows the number of employees detected in critical areas where restricted access is enforced.",
    },

    {
      title: "Employee Idel Time",
      value: "0",
      violationsCount: 2,
      lastDetection: "Production Floor A",
      lastDetectionTime: "4:20 PM",
      icon: Visibility,
      route: "/EmployeeIdleTime",
      tooltipMessage:
        "Shows employee presence in areas that require special clearance.",
    },
    {
      title: "Mobile Usage in Critical Area",
      value: "3",
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
      title: "Sleeping / Absence  Security Personnel",
      value: "2",
      violationsCount: 2,
      lastDetection: "Gate 2 - Shift B",
      lastDetectionTime: "02:30 AM",
      icon: Security,
      route: "/SleepingSecurityPersonnel",
      tooltipMessage:
        "Shows detected cases of security personnel sleeping or absent from their post.",
    },
  ];
  const CamerakpiData = [
    {
      title: "Total Cameras",
      violationsCount: 120,
      lastDetection: "System Overview",
      lastDetectionTime: "—",
      icon: VideocamOutlined,
      tooltipMessage:
        "Total number of surveillance cameras connected to the system.",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "#bbdefb",
    },
    {
      title: "Cameras Online",
      violationsCount: 105,
      lastDetection: "Last Updated",
      lastDetectionTime: "10:15 AM",
      icon: WifiTethering,
      tooltipMessage:
        "Number of cameras currently active and transmitting data.",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      borderColor: "#4caf50",
      iconBg: "#c8e6c9",
    },
    {
      title: "Cameras Offline",
      violationsCount: 15,
      lastDetection: "Zone C - Entry Gate",
      lastDetectionTime: "09:45 AM",
      icon: WifiOff,
      tooltipMessage: "Shows cameras currently not transmitting video feed.",
    },
    {
      title: "Tampering Incidents Today",
      violationsCount: 12,
      lastDetection: "Zone B - Warehouse",
      lastDetectionTime: "09:58 AM",
      icon: WarningAmber,
      tooltipMessage:
        "Number of tampering incidents (blurred, covered, or offline) detected today.",
    },
    {
      title: "Zones Affected",
      violationsCount: 4,
      lastDetection: "Zones B, C, D",
      lastDetectionTime: "—",
      icon: Domain,
      tooltipMessage:
        "Total number of zones currently affected by camera issues.",
    },
  ];
  return (
    // <Paper
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     //pt: 2,
    //     px: 2,
    //     backgroundColor: "#ffffff",
    //     //borderRadius: 2,
    //     gap: 1.5,
    //     height: "auto",
    //   }}
    // >
    //   {/* Top Right Time Filter */}
    //   <Box
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "end",
    //       flexWrap: "wrap",
    //       mt: 1,
    //     }}
    //   >
    //     <TimeFilter />
    //   </Box>
    //   <Paper
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       padding: 1,
    //       backgroundColor: "#ffffff",
    //       borderRadius: 2,
    //     }}
    //   >
    //     <Typography
    //       variant="h6"
    //       sx={{
    //         fontWeight: "bold",
    //         fontSize: 18,
    //         mb: 1,
    //         display: "flex",
    //         alignItems: "center",
    //         gap: 1,
    //       }}
    //     >
    //       <Shield sx={{ color: "#1976d2", fontSize: 23 }} />
    //       Safety And Compliance
    //     </Typography>
    //     {/* KPI Cards Grid */}
    //     <Grid container spacing={1.5} sx={{ mb: 0 }} alignItems="stretch">
    //       {kpiData.map((kpi, index) => (
    //         <Grid
    //           size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
    //           key={uuidv4() + index}
    //         >
    //           <DashboardKpiCardMain {...kpi} />
    //         </Grid>
    //       ))}
    //     </Grid>
    //   </Paper>
    //   <Paper
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       padding: 1,
    //       backgroundColor: "#ffffff",
    //       borderRadius: 2,
    //     }}
    //   >
    //     <Typography
    //       variant="h6"
    //       sx={{
    //         fontWeight: "bold",
    //         fontSize: 18,
    //         mb: 1,
    //         display: "flex",
    //         alignItems: "center",
    //         gap: 1,
    //       }}
    //     >
    //       <Visibility sx={{ color: "#1976d2", fontSize: 23 }} />
    //       Surveillance Monitoring
    //     </Typography>
    //     {/* KPI Cards Grid */}
    //     <Grid container spacing={1.5} sx={{ mb: 0 }} alignItems="stretch">
    //       {surveillanceDashboradkpiData.map((kpi, index) => (
    //         <Grid
    //           size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
    //           key={uuidv4() + index}
    //         >
    //           <DashboardKpiCard {...kpi} />
    //         </Grid>
    //       ))}
    //     </Grid>
    //   </Paper>
    //   <Paper
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       padding: 1,
    //       backgroundColor: "#ffffff",
    //       borderRadius: 2,
    //     }}
    //   >
    //     <Typography
    //       variant="h6"
    //       sx={{
    //         fontWeight: "bold",
    //         fontSize: 18,
    //         mb: 1,
    //         display: "flex",
    //         alignItems: "center",
    //         gap: 1,
    //       }}
    //     >
    //       <DirectionsCar sx={{ color: "#1976d2", fontSize: 23 }} />
    //       Operational Insights
    //     </Typography>
    //     {/* KPI Cards Grid */}
    //     <Grid container spacing={1.5} sx={{ mb: 0 }} alignItems="stretch">
    //       {operationalDashboardkpiData.map((kpi, index) => (
    //         <Grid
    //           size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
    //           key={uuidv4() + index}
    //         >
    //           <DashboardKpiCard {...kpi} />
    //         </Grid>
    //       ))}
    //     </Grid>
    //   </Paper>
    //   <Paper
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       padding: 1,
    //       backgroundColor: "#ffffff",
    //       borderRadius: 2,
    //       mb: 2,
    //     }}
    //   >
    //     <Typography
    //       variant="h6"
    //       sx={{
    //         fontWeight: "bold",
    //         fontSize: 18,
    //         mb: 1,
    //         display: "flex",
    //         alignItems: "center",
    //         gap: 1,
    //       }}
    //     >
    //       <People sx={{ color: "#1976d2", fontSize: 23 }} />
    //       Workforce Monitoring
    //     </Typography>
    //     {/* KPI Cards Grid */}
    //     <Grid container spacing={1.5} sx={{ mb: 0 }} alignItems="stretch">
    //       {WorkForcekpiData.map((kpi, index) => (
    //         <Grid
    //           size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
    //           key={uuidv4() + index}
    //         >
    //           <DashboardKpiCard {...kpi} />
    //         </Grid>
    //       ))}
    //     </Grid>
    //   </Paper>
    // </Paper>
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        px: 2,
        backgroundColor: "#ffffff",
        gap: 1.5,
        height: "auto",
      }}
    >
      {/* Top Right Time Filter */}
      <Box sx={{ display: "flex", justifyContent: "end", mt: 0.5 }}>
        <TimeFilter />
      </Box>

      <Grid container spacing={1.5}>
        {CamerakpiData.map((kpi, index) => (
          <Grid key={uuidv4() + index} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <DashboardKpiCardMain {...kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Dashboard Sections Grid */}
      <Grid container spacing={2} sx={{ mb: 1.3 }}>
        {/* Row 1 - Safety & Compliance */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 1,
              backgroundColor: "#ffffff",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: 18,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Shield sx={{ color: "#1976d2", fontSize: 23 }} /> Safety And
              Compliance
            </Typography>
            <Grid container spacing={1.5}>
              {kpiData.map((kpi, index) => (
                <Grid size={{ xs: 12, md: 4, sm: 6 }} key={uuidv4() + index}>
                  <DashboardKpiCardMain {...kpi} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Row 1 - Surveillance Monitoring */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 1,
              backgroundColor: "#ffffff",
              borderRadius: 2,
              minHeight: 280,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: 18,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Visibility sx={{ color: "#1976d2", fontSize: 23 }} />{" "}
              Surveillance Monitoring
            </Typography>
            <Grid container spacing={1.5}>
              {surveillanceDashboradkpiData.map((kpi, index) => (
                <Grid size={{ xs: 12, md: 4, sm: 6 }} key={uuidv4() + index}>
                  <DashboardKpiCardMain {...kpi} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Row 2 - Operational Insights */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 1,
              backgroundColor: "#ffffff",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: 18,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <DirectionsCar sx={{ color: "#1976d2", fontSize: 23 }} />{" "}
              Operational Insights
            </Typography>
            <Grid container spacing={1.5}>
              {operationalDashboardkpiData.map((kpi, index) => (
                <Grid size={{ xs: 12, md: 4, sm: 6 }} key={uuidv4() + index}>
                  <DashboardKpiCardMain {...kpi} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Row 2 - Workforce Monitoring */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 1,
              backgroundColor: "#ffffff",
              borderRadius: 2,
              minHeight: 280,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: 18,
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <People sx={{ color: "#1976d2", fontSize: 23 }} /> Workforce
              Monitoring
            </Typography>
            <Grid container spacing={1.5}>
              {WorkForcekpiData.map((kpi, index) => (
                <Grid size={{ xs: 12, md: 4, sm: 6 }} key={uuidv4() + index}>
                  <DashboardKpiCardMain {...kpi} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dashboard;
