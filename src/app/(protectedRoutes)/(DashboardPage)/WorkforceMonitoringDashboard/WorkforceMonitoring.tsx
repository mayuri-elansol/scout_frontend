"use client";

import React from "react";
import { CameraZone } from "@/app/types";
import { Box, Grid, Paper } from "@mui/material";
import { Visibility, Smartphone, Security, People } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";
import DashboardTabs, {
  TabConfig,
} from "@/app/components/organisms/DashboardTabs/DashboardTabs";
import EmployeePresenceCriticalChart from "@/app/components/organisms/EmployeePresenceInCriticalAreaChart/EmployeePresenceInCriticalAreaChart";
import EmployeePresenceInRestrictedAreaChart from "@/app/components/organisms/EmployeePresenceInRestrictedAreaChart/EmployeePresenceInRestrictedAreaChart";
import MobilePhoneUsageChart from "@/app/components/organisms/MobilePhoneUsageInRestrictedAreaChart/MobilePhoneUsageInRestrictedAreaChart";
import SleepingOrAbsenceOfSecurityGuard from "@/app/components/organisms/SleepingOrAbsenceOfSecurityGuard/SleepingOrAbsenceOfSecurityGuard";
import EmployeeIdleTimeMonitoringChart from "@/app/components/organisms/EmployeeIdleTimeMonitoringChart/EmployeeIdleTimeMonitoringChart";

const WorkforceMonitoring: React.FC = () => {
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
      title: "Sleeping / Absence of Security Personnel",
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
    {
      label: "Employee Presence (Critical Areas)",
      content: <EmployeePresenceCriticalChart />,
    },
    // {
    //   label: "Employee Presence (Restricted Areas)",
    //   content: <EmployeePresenceInRestrictedAreaChart />,
    // },
    { label: "Mobile Phone Usage", content: <MobilePhoneUsageChart /> },
    {
      label: "Security Personnel Status",
      content: <SleepingOrAbsenceOfSecurityGuard />,
    },
    {
      label: "Employee Monitoring",
      content: <EmployeeIdleTimeMonitoringChart />,
    },
    
  ];

  return (
    <Paper
      sx={{
         display: "flex",
        flexDirection: "column",
        pt: 2,
        px: 3,
        mb: 2,
        backgroundColor: "#ffffff",
        borderRadius: 2,
        flex: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        {/* Right: Time Filter */}
        <TimeFilter />
      </Box>

      {/* KPI Cards Grid */}
      <Grid container spacing={1.5} sx={{ mb: 1 }} alignItems="stretch">
        {WorkForcekpiData.map((kpi, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
            key={uuidv4() + index}
          >
            <DashboardKpiCard {...kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Activity Feed and Camera Status */}
      {/* <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
       
        <Box sx={{ flex: "1 1 45%", minWidth: "200px", mb: 2 }}>
          <DashboardTabs tabs={tabs} />
        </Box>
      </Box> */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <DashboardTabs tabs={tabs} />
      </Box>
    </Paper>
  );
};

export default WorkforceMonitoring;
