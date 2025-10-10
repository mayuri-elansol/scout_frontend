"use client";

import React from "react";
<<<<<<< HEAD:src/app/(protectedRoutes)/(DashboardPage)/VehicleOperationalInsightsDashboard/VehicleOperationalInsightsDashboard.tsx
import { CameraZone } from "@/app/types";
import { Box, Grid } from "@mui/material";
=======
import { CameraZone, KpiData } from "@/app/types";
import { Box, Grid, Paper } from "@mui/material";
>>>>>>> 16f620e2071a161c0fe00f725bddc99280dd5765:src/app/(protectedRoutes)/(DashboardPage)/OperationalInsightsDashboard/OperationalInsightsDashboard.tsx
import {
  Shield,
  Visibility,
  DirectionsCar,
  People,
  Security,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import ActivityFeed from "@/app/components/organisms/ActivityFeed/ActivityFeed";

import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";

import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
<<<<<<< HEAD:src/app/(protectedRoutes)/(DashboardPage)/VehicleOperationalInsightsDashboard/VehicleOperationalInsightsDashboard.tsx
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";

const VehicleOperationalInsightsDashboard: React.FC = () => {
  const kpiData = [
=======
import DashboardTabs, { TabConfig } from "@/app/components/organisms/DashboardTabs/DashboardTabs";
import PeopleCountChart from "@/app/components/organisms/PeopleCountInFactoryPremises/PeopleCountInFactoryPremises";
import UnauthorizedParkingChart from "@/app/components/organisms/UnauthorizedParkingChart/UnauthorizedParkingChart";
import VehicleCountANPRChart from "@/app/components/organisms/VehicleCountANPRChart/VehicleCountANPRChart";
import CanteenUsageChart from "@/app/components/organisms/CanteenUsageChart/CanteenUsageChart";

const OperationalInsightsDashboard: React.FC = () => {
  const { t } = useTranslation();

  const kpiData: KpiData[] = [
>>>>>>> 16f620e2071a161c0fe00f725bddc99280dd5765:src/app/(protectedRoutes)/(DashboardPage)/OperationalInsightsDashboard/OperationalInsightsDashboard.tsx
    {
      title: "People Count",
      violationsCount: 53,
      lastDetection: "Zone B - Gate 2",
      lastDetectionTime: "02:15 AM",
      icon: Security,
      route: "/PeopleCountPage",
      tooltipMessage:
        "Shows detected intrusion incidents in monitored zones during restricted hours.",
    },
    {
      title: "Vehicle Count & ANPR at Gates",
      violationsCount: 0,
      lastDetection: "-",
      lastDetectionTime: "-",
      icon: People,
      route: "/VehicleCount",
      tooltipMessage: "Displays vehical count and anpr at entry exit gate.",
    },
    {
      title: "Canteen Usage Monitoring",
      violationsCount: 0,
      lastDetection: "-",
      lastDetectionTime: "-",
      icon: People,
      route: "/MonitoringCanteenUsage&Timings",
      tooltipMessage: "Displays canteen usage and monitoring.",
    },

    {
      title: "Vehicle Loading/Unloading Monitoring",
      violationsCount: 0,
      lastDetection: "-",
      lastDetectionTime: "-",
      icon: People,
      route: "/VehicleUnloadingLoading",
      tooltipMessage: "Displays vehical loading and unloading oprations",
    },
    {
      title: "Unauthorised Parking / Blocking Aisles",
      violationsCount: 0,
      lastDetection: "-",
      lastDetectionTime: "-",
      icon: DirectionsCar,
      route: "/UnauthorizedParkingOrEquipmentBlockingAisles",
      tooltipMessage: "Shows unauthorized parking or equipment blocking.",
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
  { label: "People Count", content: <PeopleCountChart /> },
  { label: "Vehicle Count & ANPR", content: <VehicleCountANPRChart/> },
  { label: "Canteen Usage", content: <CanteenUsageChart/> },
  { label: "Vehicle MOnitoring", content: <VehicleCountANPRChart/> },
  { label: "Unauthorized parking", content: <UnauthorizedParkingChart /> },
  { label: "Camera Status", content: <CameraStatus cameraZones={cameraZones} /> },
];

  return (
<<<<<<< HEAD:src/app/(protectedRoutes)/(DashboardPage)/VehicleOperationalInsightsDashboard/VehicleOperationalInsightsDashboard.tsx
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 115px)",
        backgroundColor: "#f5f7fa",
        // pt: 2,
        // px: 2,
        overflow: "hidden",
=======
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
>>>>>>> 16f620e2071a161c0fe00f725bddc99280dd5765:src/app/(protectedRoutes)/(DashboardPage)/OperationalInsightsDashboard/OperationalInsightsDashboard.tsx
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
<<<<<<< HEAD:src/app/(protectedRoutes)/(DashboardPage)/VehicleOperationalInsightsDashboard/VehicleOperationalInsightsDashboard.tsx
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
=======
        {/* Tabs Section for Charts */}
>>>>>>> 16f620e2071a161c0fe00f725bddc99280dd5765:src/app/(protectedRoutes)/(DashboardPage)/OperationalInsightsDashboard/OperationalInsightsDashboard.tsx
        <Box sx={{ flex: "1 1 45%", minWidth: "200px", mb: 2 }}>
          <DashboardTabs tabs={tabs} />
        </Box>
      </Box>
    </Paper>
  );
};

export default OperationalInsightsDashboard;
