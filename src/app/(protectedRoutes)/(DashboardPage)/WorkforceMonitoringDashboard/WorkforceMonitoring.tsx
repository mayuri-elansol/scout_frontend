"use client";

import React from "react";
import { CameraZone } from "@/app/types";
import { Box, Grid, Paper } from "@mui/material";
import {
  DirectionsCar,
  Shield,
  Visibility,
  People,
  Smartphone,
  AccessTime,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import ActivityFeed from "@/app/components/organisms/ActivityFeed/ActivityFeed";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";
import DashboardTabs, { TabConfig } from "@/app/components/organisms/DashboardTabs/DashboardTabs";
import EmployeePresenceCriticalChart from "@/app/components/organisms/EmployeePresenceInCriticalAreaChart/EmployeePresenceInCriticalAreaChart";
import EmployeePresenceInRestrictedAreaChart from "@/app/components/organisms/EmployeePresenceInRestrictedAreaChart/EmployeePresenceInRestrictedAreaChart";
import MobilePhoneUsageChart from "@/app/components/organisms/MobilePhoneUsageInRestrictedAreaChart/MobilePhoneUsageInRestrictedAreaChart";
import SleepingSecurityPersonnel from "../../(AnalyticsPages)/(Workforce Monitoring)/SleepingSecurityPersonnel/SleepingSecurityPersonnel";
import SleepingOrAbsenceOfSecurityGuard from "@/app/components/organisms/SleepingOrAbsenceOfSecurityGuard/SleepingOrAbsenceOfSecurityGuard";
import EmployeeIdleTimeMonitoringChart from "@/app/components/organisms/EmployeeIdleTimeMonitoringChart/EmployeeIdleTimeMonitoringChart";

const WorkforceMonitoring: React.FC = () => {
  const kpiData = [
    {
      title: "Employee Presence in Critical Area",
      value: "7",
      violationsCount: 7,
      lastDetection: "Critical Zone A",
      lastDetectionTime: "03:25 PM",
      icon: Shield,
      route: "/CriticalAreaPresence",
      tooltipMessage:
        "Shows the number of employees detected in critical areas where restricted access is enforced.",
    },
    {
      title: "Employee Presence in Restricted Area",
      value: "4",
      violationsCount: 4,
      lastDetection: "Restricted Zone B",
      lastDetectionTime: "02:45 PM",
      icon: Visibility,
      route: "/RestrictedAreaPresence",
      tooltipMessage:
        "Shows employee presence in areas that require special clearance.",
    },
    {
      title: "Mobile Phone Usage in Critical Area",
      value: "3",
      violationsCount: 3,
      lastDetection: "Critical Zone C",
      lastDetectionTime: "01:50 PM",
      icon: Smartphone,
      route: "/MobilePhoneUsage",
      tooltipMessage:
        "Displays incidents of unauthorized mobile phone usage inside critical areas.",
    },
    {
      title: "People Count in Factory Premises",
      value: "215",
      violationsCount: 215,
      lastDetection: "Main Entrance",
      lastDetectionTime: "04:05 PM",
      icon: People,
      route: "/PeopleCount",
      tooltipMessage:
        "Displays total number of people inside factory premises based on entry/exit data.",
    },
    {
      title: "Sleeping or Absence of Security Personnel",
      value: "2",
      violationsCount: 2,
      lastDetection: "Gate 2 - Shift B",
      lastDetectionTime: "02:30 AM",
      icon: AccessTime,
      route: "/SecurityPersonnelMonitoring",
      tooltipMessage:
        "Shows detected cases of security personnel sleeping or absent from their post.",
    },
  ];

  const cameraZones: CameraZone[] = [
    {
      zone: "Production Floor",
      active: 8,
      total: 10,
      offline: 3,
      tempred: 4,
    },
    { zone: "Warehouse", active: 3, total: 6, offline: 3, tempred: 4 },
    { zone: "Parking Area", active: 4, total: 5, offline: 1, tempred: 2 },

    { zone: "Assembly Line", active: 2, total: 4, offline: 1, tempred: 2 },
  ];
const tabs: TabConfig[] = [
  { label: "Employee Presence (Critical Areas)", content: <EmployeePresenceCriticalChart /> },
  { label: "Employee Presence (Restricted Areas)", content: <EmployeePresenceInRestrictedAreaChart /> },
  { label: "Mobile Phone Usage", content: <MobilePhoneUsageChart /> },
  { label: "Security Personnel Status", content: <SleepingOrAbsenceOfSecurityGuard /> },
  {label:"Employee Monitoring", content:<EmployeeIdleTimeMonitoringChart/>},
  { label: "Camera Status", content: <CameraStatus cameraZones={cameraZones} /> },
];


  return (

    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",

        pt: 2.5,
        pb: 3,
        px: 3,
        // p: 3,
        mb: 4,
        backgroundColor: "#ffffff",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        {/* Right: Time Filter */}
        <TimeFilter />
      </Box>

      {/* KPI Cards Grid */}
      <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
        {kpiData.map((kpi, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}
            key={uuidv4() + index}
          >
            <DashboardKpiCard {...kpi} route="/PPEDetectionPage" />
          </Grid>
        ))}
      </Grid>

      {/* Activity Feed and Camera Status */}
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        {/* Tabs Section for Charts */}
        <Box sx={{ flex: "1 1 45%", minWidth: "200px", mb: 2 }}>
          <DashboardTabs tabs={tabs} />
        </Box>
      </Box>
    </Paper>
  );
};

export default WorkforceMonitoring;
