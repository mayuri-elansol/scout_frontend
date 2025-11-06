"use client";

import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import {
  People,
  DirectionsCar,
  LocalShipping,
  Block,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import DashboardTabs, {
  TabConfig,
} from "@/app/components/organisms/DashboardTabs/DashboardTabs";

import CanteenUsageChart, {
  WorkingSlot,
} from "@/app/components/organisms/LineChart/LineCharts";
import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";

import RestaurantIcon from "@mui/icons-material/Restaurant";
import JointBarGraphChart, {
  VehicleChartData,
} from "@/app/components/organisms/JointBarGraphChart/JointBarGraphChart";
import DynamicViolationScatterChart, {
  ViolationData,
} from "@/app/components/organisms/ScatterChart/ScatterChart";
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

  const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];
  const series: VehicleChartData[] = [
    { label: "Entry", data: [5, 8, 3, 12, 7, 8], color: "#A8E6CF" },
    { label: "Exit", data: [7, 4, 9, 6, 10, 12], color: "#B0E0E6" },
  ];
  const usageData = [12, 20, 18, 25, 30, 22];

  const workingSlots: WorkingSlot[] = [
    { startTime: 12, stopTime: 13, label: "Lunch Time" },
    { startTime: 15, stopTime: 16, label: "Tea Break" },
  ];
  const violationData: ViolationData[] = [
    { time: "08:00", zone: "Zone A", count: 5 },
    { time: "09:00", zone: "Zone A", count: 8 },
    { time: "10:00", zone: "Zone A", count: 3 },
    { time: "11:00", zone: "Zone A", count: 12 },

    { time: "08:00", zone: "Zone B", count: 7 },
    { time: "09:00", zone: "Zone B", count: 4 },
    { time: "10:00", zone: "Zone B", count: 9 },
    { time: "11:00", zone: "Zone B", count: 6 },

    { time: "12:00", zone: "Zone C", count: 2 },
    { time: "01:00", zone: "Zone C", count: 11 },
    { time: "03:00", zone: "Zone C", count: 5 },
    { time: "04:00", zone: "Zone C", count: 8 },
    { time: "05:00", zone: "Zone D", count: 2 },
    { time: "06:00", zone: "Zone E", count: 11 },
    { time: "07:00", zone: "Zone F", count: 5 },
    { time: "08:00", zone: "Zone G", count: 8 },
  ];
  const tabs: TabConfig[] = [
    {
      label: "People Count",
      content: (
        <Grid
          container
          sx={{
            alignItems: "stretch",
            height: "100%",
          }}
        >
          {/* Left side */}
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
          >
            <JointBarGraphChart times={times} seriesData={series} />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Vehicle Count & ANPR",
      content: (
        <Grid
          container
          sx={{
            alignItems: "stretch",
            height: "100%",
          }}
        >
          {/* Left side */}
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
          >
            <JointBarGraphChart times={times} seriesData={series} />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Canteen Usage",
      content: (
        <Grid
          container
          sx={{
            alignItems: "stretch",
            height: "100%",
          }}
        >
          {/* Left side */}
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
          >
            <CanteenUsageChart
              times={times}
              usageData={usageData}
              workingTime={workingSlots}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Vehicle Monitoring",
      content: (
        <Grid
          container
          sx={{
            alignItems: "stretch",
            height: "100%",
          }}
        >
          {/* Left side */}
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
          >
            <JointBarGraphChart times={times} seriesData={series} />
          </Grid>
        </Grid>
      ),
    },
    {
      label: "Unauthorized parking",
      content: (
        <Grid
          container
          sx={{
            alignItems: "stretch",
            height: "100%",
          }}
        >
          {/* Left side */}
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              height: { xs: "50vh", md: "100%" },
              width: "100%",
              "& .MuiCardContent-root": {
                height: "100%",
              },
            }}
          >
            <DynamicViolationScatterChart data={violationData} />
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
        pt: 2,
        px: 3,
        backgroundColor: "#ffffff",
        borderRadius: 2,
        flex: 1,
        // minHeight: 0,
        minHeight: { xs: "auto", sm: "auto", md: 0 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          flexWrap: "wrap",
          mb: 2,
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
        <DashboardTabs tabs={tabs} />
      </Box>
    </Paper>
  );
};

export default OperationalInsightsDashboard;
