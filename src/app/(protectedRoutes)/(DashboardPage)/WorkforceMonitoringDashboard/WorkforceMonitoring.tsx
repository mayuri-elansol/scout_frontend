"use client";

import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import {
  Visibility,
  Smartphone,
  Security,
  People,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";
import DashboardTabs, {
  TabConfig,
} from "@/app/components/organisms/DashboardTabs/DashboardTabs";

import DynamicBarChart from "@/app/components/organisms/BarChart/BarChart";
import DynamicViolationScatterChart, {
  ViolationData,
} from "@/app/components/organisms/ScatterChart/ScatterChart";

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
  const violationData: ViolationData[] = [
    { time: "08:00", zone: "Zone A", count: 5 },
    { time: "09:00", zone: "Zone A", count: 8 },
    { time: "10:00", zone: "Zone A", count: 3 },
    { time: "11:00", zone: "Zone A", count: 12 },

    { time: "08:00", zone: "Zone B", count: 7 },
    { time: "09:00", zone: "Zone B", count: 4 },
    { time: "10:00", zone: "Zone B", count: 9 },
    { time: "11:00", zone: "Zone B", count: 6 },

    { time: "12:00", zone: "Zone C", count: 2 },
    { time: "01:00", zone: "Zone C", count: 11 },
    { time: "03:00", zone: "Zone C", count: 5 },
    { time: "04:00", zone: "Zone C", count: 8 },
    { time: "05:00", zone: "Zone D", count: 2 },
    { time: "06:00", zone: "Zone E", count: 11 },
    { time: "07:00", zone: "Zone F", count: 5 },
    { time: "08:00", zone: "Zone G", count: 8 },
  ];
  const tabs: TabConfig[] = [
    {
      label: "Employee Presence (Critical Areas)",
      content: <DynamicViolationScatterChart data={violationData}  />,
    },
    {
      label: "Employee Monitoring",
      content: (
        <DynamicBarChart
          data={[
            { gate: "Production Gate", Idle: 5, Working: 19, NotPresent: 20 },
            { gate: "Warehouse Gate", Idle: 3, Working: 21, NotPresent: 18 },
            { gate: "Parking Gate", Idle: 2, Working: 22, NotPresent: 25 },
            { gate: "Main Entrance", Idle: 4, Working: 20, NotPresent: 65 },
            { gate: "Side Exit", Idle: 1, Working: 23, NotPresent: 23 },
          ]}
          xAxisKey="gate"
          series={[
            {
              dataKey: "Idle",
              label: "Idle Count",
              color: "#FFD1DC",
            },
            {
              dataKey: "Working",
              label: "Working Count",
              color: "#AEEEEE", 
            },
            {
              dataKey: "NotPresent",
              label: "Not Present Count",
              color: "#FFF5BA",
            },
          ]}
          yAxisLabel="Count"
          stackId="exitStatus"
        />
      ),
    },

    {
      label: "Mobile Phone Usage",
      content: <DynamicViolationScatterChart data={violationData} />,
    },
    {
      label: "Security Personnel Status",
      content: (
        <DynamicBarChart
          data={[
            { gate: "Production Gate", Absent: 5, Present: 19 },
            { gate: "Warehouse Gate", Absent: 3, Present: 21 },
            { gate: "Parking Gate", Absent: 2, Present: 22 },
            { gate: "Main Entrance", Absent: 4, Present: 20 },
            { gate: "Side Exit", Absent: 1, Present: 23 },
          ]}
          xAxisKey="gate"
          series={[
            {
              dataKey: "Absent",
              label: "Absent Count",
              color: "#FFC0CB",
            },
            {
              dataKey: "Present",
              label: "Present Count",
              color: "#B0E0E6",
            },
          ]}
          yAxisLabel="Count"
          stackId="exitStatus"
        />
      ),
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
