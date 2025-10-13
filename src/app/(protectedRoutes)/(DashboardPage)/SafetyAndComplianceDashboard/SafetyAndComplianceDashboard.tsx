
"use client";

import React from "react";
import { CameraZone } from "@/app/types";
import { Box, Grid, Paper } from "@mui/material";
import {
  LocalFireDepartment,
  HealthAndSafety,
  DirectionsCar,
  WarningAmber,
  DoorFront,
  Groups,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";
import DashboardTabs, {
  TabConfig,
} from "@/app/components/organisms/DashboardTabs/DashboardTabs";
import PPEComplianceChart from "@/app/components/organisms/Safety&CompilanceDashboardChart/PPECharts/PPEComplianceBarChart/PPEComplianceChart";
import ZoneHazardLineChart from "@/app/components/organisms/HazardDetectionChart/HazardDetectionChart";
import FallIncidentChart from "@/app/components/organisms/FallIncidentChart/FallIncidentChart";
import ExitStatusChart from "@/app/components/organisms/ExitStatusChart/ExitStatusChart";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import CrowdGatheringChart from "@/app/components/organisms/CrowdGatheringChart/CrowdGatheringChart";
import PPEPieChartForEachVolationCount from "@/app/components/organisms/Safety&CompilanceDashboardChart/PPECharts/PPEPieChartForEachVolationCount/PPEPieChartForEachVolationCount";
import PPEViolationCountPieChartForZone from "@/app/components/organisms/Safety&CompilanceDashboardChart/PPECharts/PPEViolationCountPieChartForZone/PPEViolationCountPieChartForZone";

const cameraZones: CameraZone[] = [
  { zone: "Production Floor", active: 8, total: 10, offline: 3, tempred: 4 },
  { zone: "Warehouse", active: 3, total: 6, offline: 3, tempred: 4 },
  { zone: "Parking Area", active: 4, total: 5, offline: 1, tempred: 2 },
  { zone: "Main Entrance", active: 2, total: 3, offline: 1, tempred: 2 },
];

const SafetyAndComplianceDashboard: React.FC = () => {
  const tabs: TabConfig[] = [
{
  label: "PPE Compliance",
  content: (
    <Grid
      container
      spacing={2.5}
      sx={{
        mt: 1,
        alignItems: "stretch", // ensures both sides equal height
      }}
    >
      {/* Left side: Bar chart */}
      <Grid
        size={{ xs: 12, md: 8 }}
        sx={{
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: "100%", // ensure equal height
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PPEComplianceChart />
        </Box>
      </Grid>

      {/* Right side: Two pie charts stacked */}
      <Grid
        size={{ xs: 12, md: 4 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <PPEPieChartForEachVolationCount />
        </Box>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <PPEViolationCountPieChartForZone />
        </Box>
      </Grid>
    </Grid>
  ),
},

    { label: "Hazardous Zone Activity", content: <ZoneHazardLineChart /> },
    { label: "Fall Incidents", content: <FallIncidentChart /> },
    { label: "Emergency Exit Status", content: <ExitStatusChart /> },
    { label: "Crowd Gathering", content: <CrowdGatheringChart /> },
    {
      label: "Camera Status",
      content: <CameraStatus cameraZones={cameraZones} />,
    },
  ];

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

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "60vh",
        pt: 2.5,
        px: 3,
        mb: 4,
        backgroundColor: "#ffffff",
        borderRadius: 2,
      }}
    >
      {/* Top Right Time Filter */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          flexWrap: "wrap",
          mb: 3,
        }}
      >
        <TimeFilter />
      </Box>

      {/* KPI Cards Grid */}
      <Grid container spacing={1.5} sx={{ mb: 1 }} alignItems="stretch">
        {kpiData.map((kpi, index) => (
          <Grid size={{xs:12,sm:6,md:4,lg:3}}  key={uuidv4() + index}>
            <DashboardKpiCard {...kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Tabs Section */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <DashboardTabs tabs={tabs} />
      </Box>
    </Paper>
  );
};

export default SafetyAndComplianceDashboard;
