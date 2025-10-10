"use client";

import React from "react";
import { CameraZone } from "@/app/types";
import { Box, Grid, Paper } from "@mui/material";
import {

  People,
  Security,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";
import DashboardTabs, { TabConfig } from "@/app/components/organisms/DashboardTabs/DashboardTabs";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import IntrusionDetectionChart from "@/app/components/organisms/IntrusionDetectionChart/IntrusionDetectionChart";
import PeopleCountLineChart from "@/app/components/organisms/PeopleCountLineChart/PeopleCountLineChart";
import CameraTamperingChart from "@/app/components/organisms/CameraTampering/CameraTamperingChart";

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
      title: "People Presence During Shutdown",
      violationsCount: 2,
      lastDetection: "Warehouse Zone 4",
      lastDetectionTime: "01:45 AM",
      icon: People,
      route: "/PeoplePresenceShutdownPage",
      tooltipMessage:
        "Displays people detected inside premises during shutdown hours.",
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
    { zone: "Main Entrance", active: 2, total: 3, offline: 1, tempred: 2 },
  ];
const tabs: TabConfig[] = [
  { label: "Surveillance Heatmap", content: <IntrusionDetectionChart /> },
  { label: "People Count Trend", content: <PeopleCountLineChart /> },
    { label: "Camera Tempering", content: <CameraTamperingChart /> },

  { label: "Camera Operational Status", content: <CameraStatus cameraZones={cameraZones} /> },
];


  return (
 
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
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
            <DashboardKpiCard {...kpi} />
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

export default SurveillanceMonitoring;
