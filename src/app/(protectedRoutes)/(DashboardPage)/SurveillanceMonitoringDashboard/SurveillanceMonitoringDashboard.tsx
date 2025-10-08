"use client";

import React from "react";
import { CameraZone } from "@/app/types";
import { Box, Grid } from "@mui/material";
import {
  Shield,
  Visibility,
  People,
  DirectionsCar,
  Security,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import ActivityFeed from "@/app/components/organisms/ActivityFeed/ActivityFeed";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";

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
  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     minHeight: "100vh",
    //     backgroundColor: "#f5f7fa",
    //     pt: 2,
    //   }}
    // >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 115px)",
        backgroundColor: "#f5f7fa",

        overflow: "hidden",
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
        <Box sx={{ flex: "1 1 50%", minWidth: "200px", mb: 2 }}>
          <ActivityFeed
            loading={false}
            activities={[
              {
                time: "11:12 AM",
                event: "PPE Violation Detected",
                zone: "Production Floor - Camera 3",
                severity: "high",
                icon: Shield,
              },
              {
                time: "11:08 AM",
                event: "Vehicle Speed Limit Exceeded",
                zone: "Parking Lot - Camera 7",
                severity: "medium",
                icon: DirectionsCar,
              },
              {
                time: "11:05 AM",
                event: "Unauthorized Access Attempt",
                zone: "Gate 2 - Camera 12",
                severity: "high",
                icon: Visibility,
              },
            ]}
          />
        </Box>
        <Box sx={{ flex: "1 1 45%", minWidth: "200px", mb: 2 }}>
          <CameraStatus
            cameraZones={cameraZones}
            loading={false}
            maxheight={600}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SurveillanceMonitoring;
