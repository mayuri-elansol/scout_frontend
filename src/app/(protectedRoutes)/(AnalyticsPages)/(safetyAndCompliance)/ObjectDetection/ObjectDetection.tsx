"use client";

import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  People,
  TrendingUp,
  Place,
  CheckCircle,
  Warning,
} from "@mui/icons-material";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import { CameraZone } from "@/app/types";
import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import WidgetsIcon from "@mui/icons-material/Widgets";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
const ObjectDetection: React.FC = () => {
  const recentViolations = [
    {
      Voilation: "Hard hat missing",
      zone: "Production Zone A",
      time: "14:32",
      Id: "W-4521",
      severity: "HIGH",
      status: "ACTIVE",
      imageUrl: "https://picsum.photos/400/200?random=1",
    },
    {
      Voilation: "Safety vest not worn",
      zone: "Warehouse Zone B",
      time: "14:18",
      Id: "W-3847",
      severity: "MEDIUM",
      status: "ACKNOWLEDGED",
      imageUrl: "https://picsum.photos/400/200?random=2",
    },
    {
      Voilation: "Hard hat missing",
      zone: "Production Zone A",
      time: "14:32",
      Id: "W-4521",
      severity: "HIGH",
      status: "ACTIVE",
      imageUrl: "https://picsum.photos/400/200?random=1",
    },
    {
      Voilation: "Safety vest not worn",
      zone: "Warehouse Zone B",
      time: "14:18",
      Id: "W-3847",
      severity: "MEDIUM",
      status: "ACKNOWLEDGED",
      imageUrl: "https://picsum.photos/400/200?random=2",
    },
  ];

  const ObjectDetectionKpiData = [
    {
      title: "Total Object Detections",
      value: "1,452",

      icon: TrendingUp,
    },
    {
      title: "Unique Objects",
      value: "12",

      icon: People,
    },
    {
      title: "Active Alarms",
      value: "5",

      icon: Warning,
    },
    {
      title: "Most Detected Object",
      value: "Helmet",

      icon: CheckCircle,
    },
    {
      title: "Most Triggered Zone",
      value: "warehouse",

      icon: Place,
    },
    {
      title: "Most Alerting Camera",
      value: "Cam-04",

      icon: Warning,
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
  interface FilterParams {
    zone?: string;
    status?: string;
    priority?: string;
    minOccupancy?: string;
    maxOccupancy?: string;
    startDate?: string;
    endDate?: string;
  }

  const handleSubmitFilter = async (filters: FilterParams) => {
    console.log("Selected Filters:", filters);
  };

  const handleReset = () => {
    console.log("reset button clickedd");
  };

  const handleExport = (format: "csv" | "pdf") => {
    console.log("Export requested clikcedd:", format);
  };
  const handleDownloadSingle = () => {
    console.log("download single row");
  };
  const handleViewSingle = () => {
    console.log("view single row");
  };
  const KpiCardLoading = false;
  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());
  return (
    <Box>
      {/* Page Header */}
      {/* <Box sx={{ mb: 3 }}> */}
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <WidgetsIcon sx={{ fontSize: 28, color: "#3072b0" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Object Detection in Walking Bays
          </Typography>
        </Box> */}
      {/* </Box> */}

      {/* KPI Cards */}
      <Paper
        sx={{
          p: 2.2,
          mb: 4,
          backgroundColor: "#ffffff",
          borderRadius: 2,
        }}
      >
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
              <Box component="span" sx={{ mr: 2 }}>
                📊 Overview
              </Box>
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
                  key={uuidv4() + index}
                >
                  <KpiCardSkeleton />
                </Grid>
              ))
            : // Show actual KPI cards
              ObjectDetectionKpiData.map((kpi, index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                  key={uuidv4() + index}
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
              tooltipMessage="recent violations"
            />
          </Grid>

          {/* PPE Compliance by Zone */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <CameraStatus cameraZones={cameraZones} loading={false} />
          </Grid>
        </Grid>
      </Paper>
      {/* Object detection Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "id", label: "ID", minWidth: 100 },
          {
            id: "detectionDetected",
            label: "Object Detected",
            minWidth: 150,
          },
          { id: "objectName", label: "Object Name", minWidth: 140 },

          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "camera", label: "Camera", minWidth: 120 },

          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
          { id: "timestamp", label: "Timestamp", minWidth: 140 },
        ]}
        data={[
          {
            id: "DD-101",
            detectionDetected: true,
            objectName: "Bag",
            snapshot: "snapshot1.jpg",
            zone: "Main Entrance",
            camera: "CAM-01",
            timestamp: "2025-09-24 15:42",
            alarmTriggered: true,
          },
          {
            id: "DD-102",
            detectionDetected: false,
            objectName: "Box",
            snapshot: "snapshot2.jpg",
            zone: "Loading Dock",
            camera: "CAM-02",
            timestamp: "2025-09-24 15:28",
            alarmTriggered: false,
          },
          {
            id: "DD-103",
            detectionDetected: true,
            objectName: "Bottle",
            snapshot: "snapshot3.jpg",
            zone: "Assembly Area",
            camera: "CAM-03",
            timestamp: "2025-09-24 15:15",
            alarmTriggered: true,
          },
          {
            id: "DD-104",
            detectionDetected: true,
            objectName: "Box",
            snapshot: "snapshot4.jpg",
            zone: "Parking Lot",
            camera: "CAM-04",
            timestamp: "2025-09-24 14:58",
            alarmTriggered: true,
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
            id: "detectionDetected",
            label: "Detection Detected",
            type: "select",
            options: ["true", "false"],
          },
          {
            id: "objectName",
            label: "Object Name",
            type: "select",
            options: ["Bag", "Box", "Bottle"],
          },
          {
            id: "alarmTriggered",
            label: "Alarm Triggered",
            type: "select",
            options: ["true", "false"],
          },
          { id: "timestamp", label: "Start Date", type: "date" },
          { id: "timestamp", label: "End Date", type: "date" },
        ]}
        tooltipMessage="report table"
        downloadFileName="object-detection-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        onDownload={handleDownloadSingle}
        onView={handleViewSingle}
        loading={false}
      />
    </Box>
  );
};

export default ObjectDetection;
