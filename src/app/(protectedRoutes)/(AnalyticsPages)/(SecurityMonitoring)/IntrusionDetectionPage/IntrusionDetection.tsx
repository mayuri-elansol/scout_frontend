"use client";

import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Typography } from "@mui/material";
import { Visibility, Warning, People, Place, Error } from "@mui/icons-material";

import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import { CameraZone } from "@/app/types";
import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
const IntrusionDetection: React.FC = () => {
  const intrusionKpiData = [
    {
      title: "Intrusion Attempts",
      value: "7",
      subtitle: "Unauthorized access attempts today",
      trend: "+2",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: Warning,
    },

    {
      title: "Active Intruders",
      value: "2",
      subtitle: "Currently inside premises",
      trend: "Active",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: People,
    },
    {
      title: "Security Threat Level",
      value: "HIGH",
      subtitle: "Current threat assessment",
      trend: "Critical",
      trendColor: "#d32f2f",
      color: "#d32f2f",
      bgColor: "#ffcdd2",
      icon: Error,
    },
    {
      title: "Recent Entries",
      value: "5",
      subtitle: "Last 24 hours",
      trend: "+1",
      trendColor: "#ff9800",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: People,
    },
    {
      title: "Perimeter Breaches",
      value: "3",
      subtitle: "Last hour detections",
      trend: "+3",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: Visibility,
    },
    {
      title: "Secure Zones Status",
      value: "2/5",
      subtitle: "Compromised zones",
      trend: "Alert",
      trendColor: "#ff9800",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: Place,
    },
  ];
  const recentViolations = [
    {
      title: "Hard hat missing",
      location: "Production Zone A",
      time: "14:32",
      Id: "W-4521",
      severity: "HIGH",
      status: "ACTIVE",
      imageUrl: "https://picsum.photos/400/200?random=1",
    },
    {
      title: "Safety vest not worn",
      location: "Warehouse Zone B",
      time: "14:18",
      Id: "W-3847",
      severity: "MEDIUM",
      status: "ACKNOWLEDGED",
      imageUrl: "https://picsum.photos/400/200?random=2",
    },
    {
      title: "Hard hat missing",
      location: "Production Zone A",
      time: "14:32",
      Id: "W-4521",
      severity: "HIGH",
      status: "ACTIVE",
      imageUrl: "https://picsum.photos/400/200?random=1",
    },
    {
      title: "Safety vest not worn",
      location: "Warehouse Zone B",
      time: "14:18",
      Id: "W-3847",
      severity: "MEDIUM",
      status: "ACKNOWLEDGED",
      imageUrl: "https://picsum.photos/400/200?random=2",
    },

    {
      title: "Hard hat missing",
      location: "Production Zone A",
      time: "14:32",
      Id: "W-4521",
      severity: "HIGH",
      status: "ACTIVE",
      imageUrl: "https://picsum.photos/400/200?random=1",
    },
    {
      title: "Safety vest not worn",
      location: "Warehouse Zone B",
      time: "14:18",
      Id: "W-3847",
      severity: "MEDIUM",
      status: "ACKNOWLEDGED",
      imageUrl: "https://picsum.photos/400/200?random=2",
    },
    {
      title: "Hard hat missing",
      location: "Production Zone A",
      time: "14:32",
      Id: "W-4521",
      severity: "HIGH",
      status: "ACTIVE",
      imageUrl: "https://picsum.photos/400/200?random=1",
    },
    {
      title: "Safety vest not worn",
      location: "Warehouse Zone B",
      time: "14:18",
      Id: "W-3847",
      severity: "MEDIUM",
      status: "ACKNOWLEDGED",
      imageUrl: "https://picsum.photos/400/200?random=2",
    },
    {
      title: "Hard hat missing",
      location: "Production Zone A",
      time: "14:32",
      Id: "W-4521",
      severity: "HIGH",
      status: "ACTIVE",
      imageUrl: "https://picsum.photos/400/200?random=1",
    },
    {
      title: "Safety vest not worn",
      location: "Warehouse Zone B",
      time: "14:18",
      Id: "W-3847",
      severity: "MEDIUM",
      status: "ACKNOWLEDGED",
      imageUrl: "https://picsum.photos/400/200?random=2",
    },
    {
      title: "Hard hat missing",
      location: "Production Zone A",
      time: "14:32",
      Id: "W-4521",
      severity: "HIGH",
      status: "ACTIVE",
      imageUrl: "https://picsum.photos/400/200?random=1",
    },
    {
      title: "Safety vest not worn",
      location: "Warehouse Zone B",
      time: "14:18",
      Id: "W-3847",
      severity: "MEDIUM",
      status: "ACKNOWLEDGED",
      imageUrl: "https://picsum.photos/400/200?random=2",
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
          <Visibility sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Intrusion Detection at Premises Perimeter
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards */}

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
            intrusionKpiData.map((kpi, index) => (
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
        {/* Active Intrusion Alerts */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <RecentViolations
            label="Recent Violations"
            violations={recentViolations}
            loading={false}
          />
        </Grid>
        {/* Security Zones Status */}
        {/* item xs={12} lg={4} */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <CameraStatus cameraZones={cameraZones} loading={false} />
        </Grid>
      </Grid>

      {/* Security Intrusion Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "id", label: "ID", minWidth: 100 },

          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "camera", label: "Camera", minWidth: 120 },

          { id: "intruderDetected", label: "Intruder Detected", minWidth: 140 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
          { id: "createdAt", label: "TimeStamp", minWidth: 140 },
        ]}
        data={[
          {
            id: "IDP-101",
            snapshot: "snapshot_intrusion1.jpg",
            zone: "Perimeter Gate A",
            camera: "CAM-21",
            createdAt: "2025-09-24 10:42",
            updatedAt: "2025-09-24 10:45",
            intruderDetected: true,
            alarmTriggered: true,
          },
          {
            id: "IDP-102",
            snapshot: "snapshot_intrusion2.jpg",
            zone: "Perimeter Gate B",
            camera: "CAM-22",
            createdAt: "2025-09-24 11:15",
            updatedAt: "2025-09-24 11:17",
            intruderDetected: false,
            alarmTriggered: false,
          },
          {
            id: "IDP-103",
            snapshot: "snapshot_intrusion3.jpg",
            zone: "Loading Area Perimeter",
            camera: "CAM-23",
            createdAt: "2025-09-24 12:05",
            updatedAt: "2025-09-24 12:08",
            intruderDetected: true,
            alarmTriggered: true,
          },
          {
            id: "IDP-104",
            snapshot: "snapshot_intrusion4.jpg",
            zone: "Warehouse Perimeter",
            camera: "CAM-24",
            createdAt: "2025-09-24 13:20",
            updatedAt: "2025-09-24 13:25",
            intruderDetected: false,
            alarmTriggered: false,
          },
        ]}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Perimeter Gate A",
              "Perimeter Gate B",
              "Loading Area Perimeter",
              "Warehouse Perimeter",
            ],
          },
          {
            id: "intruderDetected",
            label: "Intruder Detected",
            type: "select",
            options: ["true", "false"],
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
        downloadFileName="intrusion-detection-report"
        isDownload={true}
        loading={false}
      />
    </Box>
  );
};

export default IntrusionDetection;
