"use client";

import React from "react";
import { CameraZone, KpiData } from "@/app/types";
import { Box, Grid, Paper } from "@mui/material";
import {
  Shield,
  Warning,
  Visibility,
  People,
  DirectionsCar,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import ActivityFeed from "@/app/components/organisms/ActivityFeed/ActivityFeed";

import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";

import { useTranslation } from "react-i18next";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardTabs, { TabConfig } from "@/app/components/organisms/DashboardTabs/DashboardTabs";
import PeopleCountChart from "@/app/components/organisms/PeopleCountInFactoryPremises/PeopleCountInFactoryPremises";
import UnauthorizedParkingChart from "@/app/components/organisms/UnauthorizedParkingChart/UnauthorizedParkingChart";
import VehicleCountANPRChart from "@/app/components/organisms/VehicleCountANPRChart/VehicleCountANPRChart";
import CanteenUsageChart from "@/app/components/organisms/CanteenUsageChart/CanteenUsageChart";

const OperationalInsightsDashboard: React.FC = () => {
  const { t } = useTranslation();

  const kpiData: KpiData[] = [
    {
      title: t("PPE Compliance"),
      value: "10",
      icon: Shield,
    },
    {
      title: t("Fire & Smoke Voilations"),
      value: "0",
      icon: Warning,
    },
    {
      title: "Security Breach",
      value: "1",
      icon: Visibility,
    },
    {
      title: "Employees Present",
      value: "234",
      icon: People,
    },
    {
      title: "Total People Inside",
      value: "267",
      icon: People,
    },
    {
      title: "Speed Voilations",
      value: "15",
      icon: DirectionsCar,
    },
    {
      title: "Vehicles Count",
      value: "45",
      icon: DirectionsCar,
    },

    {
      title: "Crowd Alert",
      value: "1",
      icon: People,
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
            size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
            key={uuidv4() + index}
          >
            <KpiCard {...kpi} route="/PPEDetectionPage" />
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

export default OperationalInsightsDashboard;
