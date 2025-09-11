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
  Place,
} from "@mui/icons-material";

import { ActivityFeed, CameraStatus } from "@/app/components/organisms";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";

import { useTranslation } from "react-i18next";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  const kpiData: KpiData[] = [
    {
      title: t("PPE Compliance"),
      value: "87.5%",
      subtitle: "3 violations in last hour",
      trend: "-2.3%",
      trendColor: "#f44336",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: Shield,
    },
    {
      title: t("Fire Incidents"),
      value: "0",
      subtitle: "All systems operational",
      trend: "Clear",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: Warning,
    },
    {
      title: "Security Breach",
      value: "1",
      subtitle: "Gate 3 unauthorized access",
      trend: "Active",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: Visibility,
    },
    {
      title: "Employees Present",
      value: "234",
      subtitle: "98.3% attendance rate",
      trend: "+5.2%",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: People,
    },
    {
      title: "Total People",
      value: "267",
      subtitle: "Including 33 visitors",
      trend: "+12",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      icon: People,
    },
    {
      title: "Avg Speed (km/h)",
      value: "15",
      subtitle: "2 speed violations",
      trend: "2 alerts",
      trendColor: "#ff9800",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: DirectionsCar,
    },
    {
      title: "Vehicles Tracked",
      value: "45",
      subtitle: "License plates recognized",
      trend: "99.1%",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: DirectionsCar,
    },
    {
      title: "Avg Work Hours",
      value: "7.2",
      subtitle: "89% efficiency rate",
      trend: "+1.8%",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      icon: Schedule,
    },
    {
      title: "Zone Occupancy",
      value: "85%",
      subtitle: "Within safe limits",
      trend: "Normal",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: Place,
    },
    {
      title: "Crowd Alert",
      value: "1",
      subtitle: "Cafeteria overcrowding",
      trend: "1 alert",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
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
        {kpiData.map((kpi) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={kpi.title}>
            <KpiCard {...kpi} />
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
