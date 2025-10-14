"use client";

import React from "react";
import { CameraZone } from "@/app/types";
import { Box, Grid, Paper } from "@mui/material";
import {
  People,
  DirectionsCar,
  LocalShipping,
  Block,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";

import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardTabs, {
  TabConfig,
} from "@/app/components/organisms/DashboardTabs/DashboardTabs";
import PeopleCountChart from "@/app/components/organisms/PeopleCountInFactoryPremises/PeopleCountInFactoryPremises";
import UnauthorizedParkingChart from "@/app/components/organisms/UnauthorizedParkingChart/UnauthorizedParkingChart";
import VehicleCountANPRChart from "@/app/components/organisms/VehicleCountANPRChart/VehicleCountANPRChart";
import CanteenUsageChart from "@/app/components/organisms/CanteenUsageChart/CanteenUsageChart";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";

import RestaurantIcon from "@mui/icons-material/Restaurant";
const OperationalInsightsDashboard: React.FC = () => {
  const kpiData = [
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
      tooltipMessage: "Displays vehical loading and unloading oprations",
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
    { label: "Vehicle Count & ANPR", content: <VehicleCountANPRChart /> },
    { label: "Canteen Usage", content: <CanteenUsageChart /> },
    { label: "Vehicle MOnitoring", content: <VehicleCountANPRChart /> },
    { label: "Unauthorized parking", content: <UnauthorizedParkingChart /> },
   
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
          mb: 1,
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

      {/* Activity Feed and Camera Status */}
      {/* <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      
        <Box sx={{ flex: "1 1 45%", minWidth: "200px", mb: 2 }}>
          <DashboardTabs tabs={tabs} />
        </Box>
      </Box> */}
      {/* Tabs Section */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <DashboardTabs tabs={tabs} />
      </Box>
    </Paper>
  );
};

export default OperationalInsightsDashboard;
