"use client";
import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Paper, Typography } from "@mui/material";

import { Speed, TrendingUp, LocationOn, AccessTime } from "@mui/icons-material";

import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import { CameraZone } from "@/app/types";
import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import SpeedIcon from "@mui/icons-material/Speed";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
const VehicalSpeedMonitoring: React.FC = () => {
  const recentViolations = [
    {
      title: "Hard hat missing",
      zone: "Production Zone A",
      time: "14:32",

      imageUrl: "https://picsum.photos/400/200?random=1",
    },
    {
      title: "Safety vest not worn",
      zone: "Warehouse Zone B",
      time: "14:18",

      imageUrl: "https://picsum.photos/400/200?random=2",
    },
  ];
  const VehicalSpeedMonitoringKpiData = [
    {
      title: "Speed Violation Count",
      value: "267",
      icon: Speed, // 🚦 Speedometer
    },
    {
      title: "Highest Speed Recorded",
      value: "110 km/h",
      icon: TrendingUp, // 📈 Indicates peak/high value
    },
    {
      title: "Highest Speed Violation Zone",
      value: "Zone 3",
      icon: LocationOn, // 📍 Zone / Location
    },
    {
      title: "Last Detection Time",
      value: "11:15 AM",
      icon: AccessTime, // ⏰ Time
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

  const KpiCardLoading = false;

  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <SpeedIcon sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Vehicle Speed Monitoring inside premises
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Paper sx={{
        p: 3, mb: 4, backgroundColor: "#ffffff", borderRadius: 2
      }} >

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* <ShowChartIcon sx={{ color: "#1976d2", fontSize: 24 }} /> */}
            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: 18 }}>
              <Box component="span" sx={{ mr: 2 }}>📊</Box>

              Real Time Overview
            </Typography>
          </Box>

          <TimeFilter />
        </Box>
        <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
          {KpiCardLoading
            ? // Show skeletons while loading
            skeletonKeys.map((index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                key={index + 1}
              >
                <KpiCardSkeleton />
              </Grid>
            ))
            : // Show actual KPI cards
            VehicalSpeedMonitoringKpiData.map((kpi, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                key={index + 1}
              >
                <KpiCard {...kpi} />
              </Grid>
            ))}
        </Grid>
        {/* Content Grid */}
        <Grid container spacing={3}>
          {/* Recent PPE Violations */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <RecentViolations
              label="Recent Violations"
              violations={recentViolations}
              loading={false}
            />
          </Grid>
          {/* PPE Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <CameraStatus cameraZones={cameraZones} loading={false} />
          </Grid>
        </Grid>
      </Paper>
      {/* People Count Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "id", label: "ID", minWidth: 100 },
          { id: "speed", label: "Speed", minWidth: 100 },
          { id: "vehicleType", label: "Vehicle Type", minWidth: 120 },
          { id: "vehicleNumber", label: "Vehicle Number", minWidth: 140 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "camera", label: "Camera", minWidth: 120 },

          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 120 },
          { id: "createdAt", label: "Timestamp", minWidth: 140 },
        ]}
        data={[
          {
            id: "VD-101",
            speed: "65 km/h",
            vehicleType: "Truck",
            vehicleNumber: "MH12AB1234",
            zone: "Main Entrance",
            camera: "CAM-01",
            snapshot: "snapshot1.jpg",
            alarmTriggered: true,
            createdAt: "2025-09-24 15:42",
            updatedAt: "2025-09-24 15:50",
          },
          {
            id: "VD-102",
            speed: "45 km/h",
            vehicleType: "Car",
            vehicleNumber: "MH14CD5678",
            zone: "Loading Dock",
            camera: "CAM-02",
            snapshot: "snapshot2.jpg",
            alarmTriggered: false,
            createdAt: "2025-09-24 15:28",
            updatedAt: "2025-09-24 15:35",
          },
          {
            id: "VD-103",
            speed: "72 km/h",
            vehicleType: "Bus",
            vehicleNumber: "MH20EF9012",
            zone: "Assembly Area",
            camera: "CAM-03",
            snapshot: "snapshot3.jpg",
            alarmTriggered: true,
            createdAt: "2025-09-24 15:15",
            updatedAt: "2025-09-24 15:25",
          },
          {
            id: "VD-104",
            speed: "30 km/h",
            vehicleType: "Bike",
            vehicleNumber: "MH22GH3456",
            zone: "Parking Lot",
            camera: "CAM-04",
            snapshot: "snapshot4.jpg",
            alarmTriggered: false,
            createdAt: "2025-09-24 14:58",
            updatedAt: "2025-09-24 15:00",
          },
        ]}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Main Entrance",
              "Loading Dock",
              "Assembly Area",
              "Parking Lot",
            ],
          },
          {
            id: "vehicleType",
            label: "Vehicle Type",
            type: "select",
            options: ["Truck", "Car", "Bus", "Bike"],
          },
          {
            id: "alarmTriggered",
            label: "Alarm Triggered",
            type: "select",
            options: ["true", "false"],
          },
          { id: "startDate", label: "Start Date", type: "date" },
          { id: "endDate", label: "End Date", type: "date" },
        ]}
        downloadFileName="vehicle-detection-report"
        loading={false}
      />
    </Box>
  );
};

export default VehicalSpeedMonitoring;
