"use client";

import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import { People, Security, VideocamOff } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";
import DashboardTabs, {
  TabConfig,
} from "@/app/components/organisms/DashboardTabs/DashboardTabs";

import DynamicViolationScatterChart, {
  ViolationData,
} from "@/app/components/organisms/ScatterChart/ScatterChart";
import DynamicPieChart from "@/app/components/organisms/PieChart/PieChart";

const SurveillanceMonitoring: React.FC = () => {
  const kpiData = [
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
      label: "Intrusion Detection",
      content: <DynamicViolationScatterChart data={violationData} />,
    },

    {
      label: "Unauthorized Access ",
      content: <DynamicViolationScatterChart data={violationData} />,
    },
    {
      label: "Camera Tempering Detection",
      content: (
       <Box
  sx={{
    display: "flex",
    flexDirection: "row",
    gap: 3, 
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap", // Changed from "wrap" to "nowrap"
    overflowX: "auto", // Added for horizontal scroll if needed
  }}
>
  <DynamicPieChart
    zoneName="Online"
    data={[
      { label: "Zone A", value: 12, color: "#4caf50" },
      { label: "Zone B", value: 5, color: "#f44336" },
      { label: "Zone C", value: 2, color: "#ffa726" },
    ]}
  />
  <DynamicPieChart
    zoneName="Offline"
    data={[
      { label: "Zone A", value: 20, color: "#4caf50" },
      { label: "Zone B", value: 3, color: "#f44336" },
      { label: "Zone C", value: 1, color: "#ffa726" },
    ]}
  />
  <DynamicPieChart
    zoneName="Tampered"
    data={[
      { label: "Zone A", value: 20, color: "#4caf50" },
      { label: "Zone B", value: 3, color: "#f44336" },
      { label: "Zone C", value: 1, color: "#ffa726" },
    ]}
  />
</Box>
      ),
    },

    {
      label: "Movement During shutdown",
      content: <DynamicViolationScatterChart data={violationData} />,
    },
  ];

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: 2,
        px: 3,
        // mb:2,
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
        {kpiData.map((kpi, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
            key={uuidv4() + index}
          >
            <DashboardKpiCard {...kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Tabs Section */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <DashboardTabs tabs={tabs} />
      </Box>
    </Paper>
  );
};

export default SurveillanceMonitoring;
