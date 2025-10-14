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

import DynamicBarChart from "@/app/components/organisms/BarChart/BarChart";
import DynamicPieChart from "@/app/components/organisms/PieChart/PieChart";
import DynamicBarChartWithThreshold from "@/app/components/organisms/BarChartWithThreshold/BarChartWithThreshold";

const cameraZones: CameraZone[] = [
  { zone: "Production Floor", active: 8, total: 10, offline: 3, tempred: 4 },
  { zone: "Warehouse", active: 3, total: 6, offline: 3, tempred: 4 },
  { zone: "Parking Area", active: 4, total: 5, offline: 1, tempred: 2 },
  { zone: "Main Entrance", active: 2, total: 3, offline: 1, tempred: 2 },
];

// Generate hour-wise data for charts

const PASTEL_COLORS = {
  helmet: "#ffa8a8", // pastel red
  vest: "#ffd8a8", // pastel orange
  glass: "#a8d8ff", // pastel blue
  fire: "#ffb3b3",
  smoke: "#ffe0b3",
  gas: "#b3d9ff",
  oil: "#b3ffb3",
  falls: "#ffddb3",
  laydowns: "#ffe6cc",
  blocked: "#ffb3b3",
  clear: "#b3ffb3",
  zoneA: "#ffd8a8",
  zoneB: "#ffb3b3",
  zoneC: "#a8d8ff",
};

const generateHourData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i.toString().padStart(2, "0")}:00`,
      helmet: Math.floor(Math.random() * 30) + 10,
      vest: Math.floor(Math.random() * 35) + 15,
      glass: Math.floor(Math.random() * 40) + 20,
      fire: Math.floor(Math.random() * 30) + 10,
      smoke: Math.floor(Math.random() * 35) + 15,
      gas: Math.floor(Math.random() * 40) + 20,
      oil: Math.floor(Math.random() * 25) + 10,
      falls: Math.floor(Math.random() * 15) + 5,
      laydowns: Math.floor(Math.random() * 10) + 3,
    });
  }
  return data;
};

const SafetyAndComplianceDashboard: React.FC = () => {
  const hourlyData = generateHourData();

  const tabs: TabConfig[] = [
    {
      label: "PPE Compliance",
      content: (
        <Grid
          container
          // spacing={2.5}
          sx={{
            mt: 1,
            alignItems: "stretch",
          }}
        >
          {/* Left side: Bar chart */}
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{
              display: "flex",
              // alignItems: "stretch",
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicBarChart
                data={hourlyData}
                xAxisKey="time"
                series={[
                  {
                    dataKey: "helmet",
                    label: "Helmet Violations",
                    color: "#f78c89",
                  },
                  {
                    dataKey: "vest",
                    label: "Vest Violations",
                    color: "#ffd54f",
                  },
                  {
                    dataKey: "glass",
                    label: "Glass Violations",
                    color: "#7fbfff",
                  },
                ]}
                yAxisLabel="Violation Count"
                stackId="ppe"
              />
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
              <DynamicPieChart
                data={[
                  { label: "Helmet", value: 29, color: "#f78c89" },
                  { label: "Vest", value: 28, color: "#ffd54f" },
                  { label: "Glass", value: 28, color: "#7fbfff" },
                ]}
              />
            </Box>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
              <DynamicPieChart
                // data={[
                //   { label: "ZONE A", value: 31, color: "#f78c89" },
                //   { label: "ZONE B", value: 43, color: "#ffd54f" },
                //   { label: "ZONE C", value: 26, color: "#7fbfff" },
                // ]}
                data={[
                  { label: "Production Gate", value: 31, color: "#f44336" },
                  { label: "Warehouse Gate", value: 43, color: "#ff9800" },
                  { label: "Parking Gate", value: 26, color: "#ffc107" },
                  { label: "Main Entrance", value: 20, color: "#ef5350" },
                  { label: "Side Exit", value: 71, color: "#ff6b6b" },
                ]}
              />
            </Box>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Hazardous Zone Activity",
      content: (
        <Grid
          container
          spacing={2.5}
          sx={{
            mt: 1,
            alignItems: "stretch",
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
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicBarChart
                data={hourlyData}
                xAxisKey="time"
                series={[
                  {
                    dataKey: "fire",
                    label: "Fire Violations",
                    color: "#f78c89",
                  },
                  {
                    dataKey: "smoke",
                    label: "Smoke Violations",
                    color: "#ffd54f",
                  },
                  { dataKey: "gas", label: "Gas Violations", color: "#7fbfff" },
                  { dataKey: "oil", label: "Oil Violations", color: "#a8d5a2" },
                ]}
                yAxisLabel="Violation Count"
                stackId="hazard"
              />
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
              <DynamicPieChart
                data={[
                  { label: "Fire", value: 29, color: "#f78c89" },
                  { label: "Smoke", value: 28, color: "#ffd54f" },
                  { label: "Gas", value: 28, color: "#7fbfff" },
                  { label: "Oil", value: 15, color: "#a8d5a2" },
                ]}
              />
            </Box>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
              <DynamicPieChart
                // data={[
                //   { label: "ZONE A", value: 31, color: "#ffa94d" },
                //   { label: "ZONE B", value: 43, color: "#ff6b6b" },
                //   { label: "ZONE C", value: 26, color: "#74c0fc" },
                // ]}
                data={[
                  { label: "Production Gate", value: 5, color: "#f44336" },
                  { label: "Warehouse Gate", value: 3, color: "#ff9800" },
                  { label: "Parking Gate", value: 2, color: "#ffc107" },
                  { label: "Main Entrance", value: 4, color: "#ef5350" },
                  { label: "Side Exit", value: 1, color: "#ff6b6b" },
                ]}
              />
            </Box>
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Fall Incidents",
      content: (
        <Grid container spacing={2} sx={{ mt: 1, alignItems: "stretch" }}>
          {/* Left: Bar chart */}
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicBarChart
                data={hourlyData}
                xAxisKey="time"
                series={[
                  {
                    dataKey: "falls",
                    label: "Fall Incidents",
                    color: "#ff9800",
                  },
                ]}
                yAxisLabel="Incident Count"
                stackId="fall"
              />
            </Box>
          </Grid>

          {/* Right: Pie chart vertically centered */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DynamicPieChart
              data={[
                { label: "Production Gate", value: 5, color: "#f44336" },
                { label: "Warehouse Gate", value: 3, color: "#ff9800" },
                { label: "Parking Gate", value: 2, color: "#ffc107" },
                { label: "Main Entrance", value: 4, color: "#ef5350" },
                { label: "Side Exit", value: 1, color: "#ff6b6b" },
              ]}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Vehicle In Walkways",
      content: (
        <Grid container spacing={2} sx={{ mt: 1, alignItems: "stretch" }}>
          {/* Left: Bar chart */}
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicBarChart
                data={[
                  { gate: "Production Gate", blocked: 5, clear: 19 },
                  { gate: "Warehouse Gate", blocked: 3, clear: 21 },
                  { gate: "Parking Gate", blocked: 2, clear: 22 },
                  { gate: "Main Entrance", blocked: 4, clear: 20 },
                  { gate: "Side Exit", blocked: 1, clear: 23 },
                ]}
                xAxisKey="gate"
                series={[
                  {
                    dataKey: "blocked",
                    label: "Blocked Hours",
                    color: "#f44336",
                  },
                  { dataKey: "clear", label: "Clear Hours", color: "#4caf50" },
                ]}
                yAxisLabel="Hours "
                stackId="exitStatus"
              />
            </Box>
          </Grid>

          {/* Right: Pie chart vertically centered */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DynamicPieChart
              data={[
                { label: "Production Gate", value: 5, color: "#f44336" },
                { label: "Warehouse Gate", value: 3, color: "#ff9800" },
                { label: "Parking Gate", value: 2, color: "#ffc107" },
                { label: "Main Entrance", value: 4, color: "#ef5350" },
                { label: "Side Exit", value: 1, color: "#ff6b6b" },
              ]}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Emergency Exit Status",
      content: (
        <Grid container spacing={2} sx={{ mt: 1, alignItems: "stretch" }}>
          {/* Left: Bar chart */}
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicBarChart
                data={[
                  { gate: "Production Gate", blocked: 5, clear: 19 },
                  { gate: "Warehouse Gate", blocked: 3, clear: 21 },
                  { gate: "Parking Gate", blocked: 2, clear: 22 },
                  { gate: "Main Entrance", blocked: 4, clear: 20 },
                  { gate: "Side Exit", blocked: 1, clear: 23 },
                ]}
                xAxisKey="gate"
                series={[
                  {
                    dataKey: "blocked",
                    label: "Blocked Hours",
                    color: "#f44336",
                  },
                  { dataKey: "clear", label: "Clear Hours", color: "#4caf50" },
                ]}
                yAxisLabel="Hours"
                stackId="exitStatus"
              />
            </Box>
          </Grid>

          {/* Right: Pie chart vertically centered */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DynamicPieChart
              data={[
                { label: "Production Gate", value: 5, color: "#f44336" },
                { label: "Warehouse Gate", value: 3, color: "#ff9800" },
                { label: "Parking Gate", value: 2, color: "#ffc107" },
                { label: "Main Entrance", value: 4, color: "#ef5350" },
                { label: "Side Exit", value: 1, color: "#ff6b6b" },
              ]}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Crowd Gathering",
      content: (
        <Grid container spacing={2} sx={{ mt: 1, alignItems: "stretch" }}>
          {/* Left: Bar chart */}
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicBarChartWithThreshold
                data={[
                  { month: "Jan", users: 20 },
                  { month: "Feb", users: 50 },
                  { month: "Mar", users: 80 },
                  { month: "Jan", users: 20 },
                  { month: "April", users: 50 },
                  { month: "May", users: 80 },
                  { month: "June", users: 20 },
                  { month: "July", users: 50 },
                  { month: "August", users: 80 },
                ]}
                xAxisKey="month"
                series={[
                  { dataKey: "users", label: "Users", color: "#2196f3" },
                ]}
                thresholdValue={60}
                thresholdLabel="Target"
                thresholdColor="orange"
              />
            </Box>
          </Grid>

          {/* Right: Pie chart vertically centered */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DynamicPieChart
              data={[
                { label: "Production Gate", value: 5, color: "#f44336" },
                { label: "Warehouse Gate", value: 3, color: "#ff9800" },
                { label: "Parking Gate", value: 2, color: "#ffc107" },
                { label: "Main Entrance", value: 4, color: "#ef5350" },
                { label: "Side Exit", value: 1, color: "#ff6b6b" },
              ]}
            />
          </Grid>
        </Grid>
      ),
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
      title: "Fall / Laydown Alerts",
      violationsCount: 1,
      lastDetection: "Production Floor",
      lastDetectionTime: "10:40 AM",
      icon: WarningAmber,
      route: "/FallDetection",
      tooltipMessage: "Indicates workers detected lying down or falling.",
    },
    {
      title: "Forklift / Vehicle In Walkways",
      violationsCount: 2,
      lastDetection: "Walkway Zone B",
      lastDetectionTime: "10:58 AM",
      icon: DirectionsCar,
      route: "/ObjectDetection",
      tooltipMessage: "Shows forklift/vehicle detected in walkways.",
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
        pt: 2,
        px: 3,
        mb: 2,
        backgroundColor: "#ffffff",
        borderRadius: 2,
        flex: 1,
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
        <TimeFilter />
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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <DashboardTabs tabs={tabs} />
      </Box>
    </Paper>
  );
};

export default SafetyAndComplianceDashboard;
