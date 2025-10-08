"use client";

import React from "react";
import { CameraZone } from "@/app/types";
import { Box, Grid } from "@mui/material";
import {
  Shield,
  LocalFireDepartment,
  HealthAndSafety,
  DirectionsCar,
  WarningAmber,
  DoorFront,
  Groups,
  Visibility,
} from "@mui/icons-material";

import { v4 as uuidv4 } from "uuid";
import ActivityFeed from "@/app/components/organisms/ActivityFeed/ActivityFeed";

import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";

import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";

const SafetyAndComplianceDashboard: React.FC = () => {
  const kpiData = [
    {
      title: "PPE Violations",
      violationsCount: 5,
      lastDetection: "Zone A",
      lastDetectionTime: "09:58 AM",
      icon: HealthAndSafety,
      route: "/PPEDetectionPage",
      tooltipMessage: "Shows total PPE rule violations detected today.",
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
      title: "Speed Violations",
      violationsCount: 12,
      lastDetection: "Parking Zone",
      lastDetectionTime: "10:58 AM",
      icon: DirectionsCar,
      route: "/VehicalSpeedMonitoring",
      tooltipMessage: "Shows overspeed and unsafe driving incidents detected.",
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
      violationsCount: 3,
      lastDetection: "Cafeteria",
      lastDetectionTime: "11:05 AM",
      icon: Groups,
      route: "/CrowdGathering",
      tooltipMessage:
        "Identifies abnormal or unsafe crowd gathering in monitored areas.",
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        pt: -5,
        height: "calc(100vh - 115px)", 
      }}
    >
      {/* <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     height: "calc(100vh - 115px)",
    //     backgroundColor: "#f5f7fa",

    //     overflow: "hidden",
    //   }}
    // > */}
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

export default SafetyAndComplianceDashboard;
