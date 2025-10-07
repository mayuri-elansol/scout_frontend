"use client";

import React from "react";
import { CameraZone, KpiData } from "@/app/types";
import { Box, Grid } from "@mui/material";
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

const WorkforceMonitoring: React.FC = () => {
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
    { zone: "Assembly Line", active: 2, total: 4, offline: 1, tempred: 2 },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        pt: 2,
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
              {
                time: "11:02 AM",
                event: "Employee Check-in",
                zone: "Main Entrance - Camera 1",
                severity: "low",
                icon: People,
              },
              {
                time: "10:58 AM",
                event: "Fire Safety Equipment Check",
                zone: "Assembly Line - Camera 5",
                severity: "low",
                icon: Shield,
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

export default WorkforceMonitoring;
