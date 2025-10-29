"use client";
import React from "react";
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
import { hourlyData } from "@/app/config/chartDataConfig";

const SafetyAndComplianceDashboard: React.FC = () => {
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
                height={{
                  desktop: 375,
                }}
                data={hourlyData}
                xAxisKey="time"
                series={[
                  {
                    dataKey: "helmet",
                    label: "Helmet",
                    color: "#ffcdd2",
                  },
                  {
                    dataKey: "vest",
                    label: "Vest",
                    color: "#FFEAA7",
                  },
                  {
                    dataKey: "glass",
                    label: "Glass",
                    color: "#A8E6CF",
                  },
                ]}
                yAxisLabel="Violation Count"
                stackId="ppe"
              />
            </Box>
          </Grid>

          {/* Right side: Two pie charts stacked */}

          {/* <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap:1.5
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DynamicPieChart
                data={[
                  { label: "Helmet", value: 29, color: "#FFB6C1" },
                  { label: "Vest", value: 28, color: "#FFEAA7" },
                  { label: "Glass", value: 28, color: "#A8E6CF" },
                ]}
              />
            </Box>
            <Box sx={{  display: "flex", alignItems: "center", pl: 7 }}>
              <DynamicPieChart
               
                data={[
                  { label: "Production Gate", value: 31, color: "#FFB6C1" },
                  { label: "Warehouse Gate", value: 43, color: "#FFD3A5" },
                  { label: "Parking Gate", value: 26, color: "#FFEAA7" },
                  { label: "Main Entrance", value: 20, color: "#C7EDCC" },
                  { label: "Side Exit", value: 71, color: "#A8E6CF" },
                ]}
              />
            </Box>
          </Grid>  */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              // gap: 5 ,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DynamicPieChart
                height={270}
                data={[
                  { label: "Helmet", value: 29, color: "#ffcdd2" },
                  { label: "Vest", value: 28, color: "#FFEAA7" },
                  { label: "Glass", value: 28, color: "#A8E6CF" },
                ]}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", pl: 8 }}>
              <DynamicPieChart
                height={270}
                data={[
                  { label: "Production Gate", value: 31, color: "#ffcdd2" },
                  { label: "Warehouse Gate", value: 43, color: "#FFD3A5" },
                  { label: "Parking Gate", value: 26, color: "#FFEAA7" },
                  { label: "Main Entrance", value: 20, color: "#C7EDCC" },
                  { label: "Side Exit", value: 71, color: "#A8E6CF" },
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
                height={{
                  desktop: 375,
                }}
                data={hourlyData}
                xAxisKey="time"
                series={[
                  {
                    dataKey: "fire",
                    label: "Fire Violations",
                    color: "#ffcdd2",
                  },
                  {
                    dataKey: "smoke",
                    label: "Smoke Violations",
                    color: "#FFCBB3",
                  },
                  {
                    dataKey: "gas",
                    label: "Gas Violations",
                    color: "#FFEAA7",
                  },
                  {
                    dataKey: "oil",
                    label: "Oil Violations",
                    color: "#A8E6CF",
                  },
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
                height={270}
                data={[
                  { label: "Fire", value: 29, color: "#ffcdd2" },
                  { label: "Smoke", value: 28, color: "#FFCBB3" },
                  { label: "Gas", value: 28, color: "#FFEAA7" },
                  { label: "Oil", value: 15, color: "#A8E6CF" },
                ]}
              />
            </Box>
            <Box sx={{ flex: 1, display: "flex", alignItems: "center", pl: 8 }}>
              <DynamicPieChart
                height={270}
                data={[
                  { label: "Production Gate", value: 31, color: "#ffcdd2" },
                  { label: "Warehouse Gate", value: 43, color: "#FFCBB3" },
                  { label: "Parking Gate", value: 26, color: "#FFEAA7" },
                  { label: "Main Entrance", value: 20, color: "#C7EDCC" },
                  { label: "Side Exit", value: 71, color: "#A8E6CF" },
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
                height={{
                  desktop: 375,
                }}
                data={hourlyData}
                xAxisKey="time"
                series={[
                  {
                    dataKey: "falls",
                    label: "Fall Incidents",
                    color: "#FFCBB3",
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
                { label: "Production Gate", value: 5, color: "#FFCBB3" },
                { label: "Warehouse Gate", value: 3, color: "#FFE0B3" },
                { label: "Parking Gate", value: 2, color: "#FFEAA7" },
                { label: "Main Entrance", value: 4, color: "#A8E6CF" },
                { label: "Side Exit", value: 1, color: "#B3E5FC" },
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
                height={{
                  desktop: 375,
                }}
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
                    color: "#ffcdd2",
                  },
                  {
                    dataKey: "clear",
                    label: "Clear Hours",
                    color: "#A8E6CF",
                  },
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
                { label: "Production Gate", value: 5, color: "#ffcdd2" },
                { label: "Warehouse Gate", value: 3, color: "#FFCBB3" },
                { label: "Parking Gate", value: 2, color: "#FFEAA7" },
                { label: "Main Entrance", value: 4, color: "#C7EDCC" },
                { label: "Side Exit", value: 1, color: "#A8E6CF" },
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
                height={{
                  desktop: 375,
                }}
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
                    color: "#ffcdd2",
                  },
                  {
                    dataKey: "clear",
                    label: "Clear Hours",
                    color: "#B0E0E6",
                  },
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
                { label: "Production Gate", value: 5, color: "#ffcdd2" },
                { label: "Warehouse Gate", value: 3, color: "#FFCBB3" },
                { label: "Parking Gate", value: 2, color: "#FFEAA7" },
                { label: "Main Entrance", value: 4, color: "#D4E6D4" },
                { label: "Side Exit", value: 1, color: "#B0E0E6" },
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
                height={{
                  desktop: 360,
                  mac: 350,
                }}
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
                // series={[
                //   { dataKey: "users", label: "Users", color: "#2196f3" },
                // ]}

                series={[
                  {
                    dataKey: "users",
                    label: "Users",
                    color: "#B0E0E6",
                  },
                ]}
                thresholdValue={60}
                thresholdLabel="Target"
                //    thresholdColor="orange"
                thresholdColor="#FFB84D"
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
              // data={[
              //   { label: "Production Gate", value: 5, color: "#f44336" },
              //   { label: "Warehouse Gate", value: 3, color: "#ff9800" },
              //   { label: "Parking Gate", value: 2, color: "#ffc107" },
              //   { label: "Main Entrance", value: 4, color: "#ef5350" },
              //   { label: "Side Exit", value: 1, color: "#ff6b6b" },
              // ]}
              data={[
                { label: "Production Gate", value: 5, color: "#ffcdd2" },
                { label: "Warehouse Gate", value: 3, color: "#FFCBB3" },
                { label: "Parking Gate", value: 2, color: "#FFEAA7" },
                { label: "Main Entrance", value: 4, color: "#C8E6C9" },
                { label: "Side Exit", value: 1, color: "#B0E0E6" },
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
        pt: 2,
        px: 3,
        // mb: 2,
        backgroundColor: "#ffffff",
        borderRadius: 2,
        flex: 1,
        // height:"100%"
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
