"use client";
import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import {
  VideocamOutlined,
  WifiOff,
  WarningAmber,
  Domain,
  WifiTethering,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

import DashboardKpiCard, {
  DashboardKpiCardProps,
} from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";
import DashboardTabs, {
  TabConfig,
} from "@/app/components/organisms/DashboardTabs/DashboardTabs";
import DynamicBarChart from "@/app/components/organisms/BarChart/BarChart";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import CameraStatusDonutChart from "@/app/components/organisms/DonutChart/DonutChart";

/* -------------------- KPI DATA -------------------- */
const kpiData: Array<Omit<DashboardKpiCardProps, "route" | "tooltipMessage">> =
  [
    {
      title: "Total Cameras",
      violationsCount: 120,
      lastDetection: "System Overview",
      lastDetectionTime: "—",
      icon: VideocamOutlined,
      colour: "green",
    },
    {
      title: "Cameras Online",
      violationsCount: 105,
      lastDetection: "Last Updated",
      lastDetectionTime: "10:15 AM",
      icon: WifiTethering,
      colour: "green",
    },
    {
      title: "Cameras Offline",
      violationsCount: 15,
      lastDetection: "Zone C - Entry Gate",
      lastDetectionTime: "09:45 AM",
      icon: WifiOff,
      colour: "red",
    },
    {
      title: "Tampering Incidents Today",
      violationsCount: 12,
      lastDetection: "Zone B - Warehouse",
      lastDetectionTime: "09:58 AM",
      icon: WarningAmber,
      colour: "blue",
    },
    {
      title: "Zones Affected",
      violationsCount: 4,
      lastDetection: "Zones B, C, D",
      lastDetectionTime: "—",
      icon: Domain,
      colour: "blue",
    },
  ];

/* -------------------- DATA -------------------- */

// Tampering trend
const tamperingTrendData = [
  { time: "00:00", offline: 3, blur: 2, lensCovered: 1 },
  { time: "06:00", offline: 4, blur: 2, lensCovered: 2 },
  { time: "12:00", offline: 5, blur: 3, lensCovered: 2 },
  { time: "18:00", offline: 7, blur: 4, lensCovered: 3 },
];

// Donut
const tamperingTypeData = [
  { label: "Offline", value: 40, color: "#ffcdd2" },
  { label: "Blur", value: 25, color: "#FFEAA7" },
  { label: "Lens Covered", value: 15, color: "#A8E6CF" },
  { label: "Online", value: 20, color: "#B3E5FC" },
];

// Camera uptime / downtime (TOP 10)
const cameraUptimeDowntimeData = [
  { camera: "CAM-001", uptime: 92, downtime: 8 },
  { camera: "CAM-002", uptime: 95, downtime: 5 },
  { camera: "CAM-003", uptime: 90, downtime: 10 },
  { camera: "CAM-004", uptime: 97, downtime: 3 },
  { camera: "CAM-005", uptime: 94, downtime: 6 },
  { camera: "CAM-006", uptime: 91, downtime: 9 },
  { camera: "CAM-007", uptime: 89, downtime: 11 },
  { camera: "CAM-008", uptime: 96, downtime: 4 },
  { camera: "CAM-009", uptime: 93, downtime: 7 },
  { camera: "CAM-010", uptime: 98, downtime: 2 },
];

// Zone-wise camera counts
const cameraHealthByZone = [
  { zone: "Parking", online: 5, offline: 3, tampered: 2 },
  { zone: "Warehouse", online: 4, offline: 2, tampered: 3 },
  { zone: "Office", online: 7, offline: 0, tampered: 1 },
  { zone: "Gate 1", online: 6, offline: 1, tampered: 2 },
];

/* -------------------- MAIN COMPONENT -------------------- */
export default function CameraTamperingDashboard() {
  const tabs: TabConfig[] = [
    /* ---------- TAB 1 ---------- */

    {
      label: "Tampering Trend",
      content: (
        <Grid
          container
          sx={{
            height: "100%",
            minHeight: 0,
            alignItems: "stretch",
          }}
        >
          {/* Left chart */}
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{
              display: "flex",
              minHeight: 0,
            }}
          >
            <DynamicBarChart
              data={tamperingTrendData}
              xAxisKey="time"
              series={[
                { dataKey: "offline", label: "Offline", color: "#ffcdd2" },
                { dataKey: "blur", label: "Blur", color: "#FFEAA7" },
                {
                  dataKey: "lensCovered",
                  label: "Lens Covered",
                  color: "#A8E6CF",
                },
              ]}
              yAxisLabel="Incident Count"
            />
          </Grid>

          {/* Right donut */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 0,
            }}
          >
            <CameraStatusDonutChart data={tamperingTypeData} />
          </Grid>
        </Grid>
      ),
    },
    /* ---------- TAB 2 ---------- */
    {
      label: "Camera Downtime (Top 10)",
      content: (
        <Grid container sx={{ height: "100%", minHeight: 0 }}>
          <Grid
            size={{ xs: 12 }}
            sx={{ display: "flex", height: "100%", minHeight: 0 }}
          >
            <DynamicBarChart
              data={cameraUptimeDowntimeData}
              xAxisKey="camera"
              series={[
                {
                  dataKey: "uptime",
                  label: "Uptime %",
                  color: "#A8E6CF",
                },
                {
                  dataKey: "downtime",
                  label: "Downtime %",
                  color: "#ffcdd2",
                },
              ]}
              yAxisLabel="Percentage (%)"
            />
          </Grid>
        </Grid>
      ),
    },

    /* ---------- TAB 3 ---------- */
    {
      label: "Zone-wise Camera Status",
      content: (
        <Grid container sx={{ height: "100%", minHeight: 0 }}>
          <Grid
            size={{ xs: 12 }}
            sx={{ display: "flex", height: "100%", minHeight: 0 }}
          >
            <DynamicBarChart
              data={cameraHealthByZone}
              xAxisKey="zone"
              series={[
                {
                  dataKey: "online",
                  label: "Online",
                  color: "#A8E6CF",
                },
                {
                  dataKey: "offline",
                  label: "Offline",
                  color: "#ffcdd2",
                },
                {
                  dataKey: "tampered",
                  label: "Tampered",
                  color: "#FFEAA7",
                },
              ]}
              yAxisLabel="Camera Count"
            />
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        pt: 2,
        px: 3,
        minHeight: 0, // ✅ allow shrinking
        overflow: "hidden", // ✅ prevent runaway growth
      }}
    >
      {/* Top Right Time Filter */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <TimeFilter onRangeChange={() => console.log("on range chnaged")} />
      </Box>

      {/* KPI Cards Grid */}
      <Grid container spacing={1.5} sx={{ mb: 2 }} alignItems="stretch">
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          //  minHeight: 0,

          minHeight: { xs: "500px", sm: "600px", md: 0 },
        }}
      >
        {/* <DashboardTabs tabs={tabs} /> */}
      </Box>
    </Paper>
  );
}
