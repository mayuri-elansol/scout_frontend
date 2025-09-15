"use client";

import React from "react";
import { KpiData } from "@/app/types";
import { Box, Grid } from "@mui/material";
import {
  Shield,
  Warning,
  Visibility,
  People,
  DirectionsCar,
  Schedule,
} from "@mui/icons-material";

import { ActivityFeed, CameraStatus } from "@/app/components/organisms";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";

import { useTranslation } from "react-i18next";

const Dashboard: React.FC = () => {
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
      title: "Avg Work Hours",
      value: "7.2",
      icon: Schedule,
    },
    {
      title: "Crowd Alert",
      value: "1",
      icon: People,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        p: 2,
      }}
    >
      {/* KPI Cards Grid */}
      <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
        {kpiData.map((kpi, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={index + 1}>
            <KpiCard {...kpi} route="/PPEDetectionPage" />
          </Grid>
        ))}
      </Grid>

      {/* Activity Feed and Camera Status */}
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <Box sx={{ flex: "1 1 60%", minWidth: "400px", mb: 2 }}>
          <ActivityFeed />
        </Box>
        <Box sx={{ flex: "1 1 35%", minWidth: "300px", mb: 2 }}>
          <CameraStatus />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
