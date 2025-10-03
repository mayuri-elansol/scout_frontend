"use client";
import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import { CameraZone } from "@/app/types";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {
  CheckCircle,
  LocalShipping,
  PlayArrow,
  Room,
  Timeline,
} from "@mui/icons-material";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
const VehicleUnloadingLoading: React.FC = () => {
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());
  const VehicleUnloadingLoadingKpiData = [
    {
      title: "Total Operations",
      value: "87", // total count of loading/unloading events
      icon: LocalShipping, // represents vehicles/transport
    },
    {
      title: "Ongoing Operations",
      value: "12", // number of operations in progress
      icon: PlayArrow, // represents active/ongoing
    },
    {
      title: "Completed Operations",
      value: "94", // percentage completed
      icon: CheckCircle, // completed/checked
    },
    {
      title: "Active Zones",
      value: "2", // number of zones currently active
      icon: Room, // represents location/zone
    },
    {
      title: "Busiest Zone",
      value: "Zone A", // which zone has most activity
      icon: Timeline, // represents activity metric
    },
  ];

  const recentViolations = [
    {
      Voilation: "Hard hat missing",
      zone: "Production Zone A",
      time: "14:32",

      imageUrl: "https://picsum.photos/400/200?random=1",
    },
    {
      Voilation: "Safety vest not worn",
      zone: "Warehouse Zone B",
      time: "14:18",

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
  interface FilterParams {
    status?: string;
    employeeName?: string;
    startDate?: string;
    endDate?: string;
  }
  const handleSubmitFilter = async (filters: FilterParams) => {
    console.log("Selected Filters:", filters);
    // Example: { status: "Active", employeeName: "John", startDate: "2025-09-01", endDate: "2025-09-05" }
  };

  const handleReset = () => {
    console.log("reset button clickedd");
  };

  const handleExport = (format: "csv" | "pdf") => {
    console.log("Export requested clikcedd:", format);
  };
  const KpiCardLoading = false;
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <LocalShippingIcon sx={{ fontSize: 28, color: "#3072b0" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Tracking Vehicle Unloading/Loading Time
          </Typography>
        </Box>
      </Box>
      <Paper
        sx={{
          p: 3,
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
        {/* KPI Cards */}

        <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
          {KpiCardLoading
            ? // Show skeletons while loading
              skeletonKeys.map((key) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={key}>
                  <KpiCardSkeleton />
                </Grid>
              ))
            : // Show actual KPI cards
              VehicleUnloadingLoadingKpiData.map((kpi) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                  key={kpi.title}
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
              tooltipMessage="recent volaitions"
            />
          </Grid>
          {/* PPE Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <CameraStatus cameraZones={cameraZones} loading={false} />
          </Grid>
        </Grid>
      </Paper>
      {/* PPE Violations Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "id", label: "ID", minWidth: 100 },

          {
            id: "loadingState",
            label: "Loading State (Start/Stop)",
            minWidth: 180,
          },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "camera", label: "Camera", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 150 },
          { id: "timestamp", label: "Timestamp", minWidth: 150 },
        ]}
        data={[
          {
            id: "TL-001",
            trackId: "TRACK-101",
            loadingState: "Start",
            zone: "Loading Dock A",
            camera: "CAM-201",
            alarmTriggered: false,
            timestamp: "2025-09-24 10:15:00",
          },
          {
            id: "TL-002",
            trackId: "TRACK-102",
            loadingState: "Stop",
            zone: "Loading Dock B",
            camera: "CAM-202",
            alarmTriggered: true,
            timestamp: "2025-09-24 10:45:00",
          },
          {
            id: "TL-003",
            trackId: "TRACK-103",
            loadingState: "Start",
            zone: "Loading Dock A",
            camera: "CAM-203",
            alarmTriggered: false,
            timestamp: "2025-09-24 11:00:00",
          },
          {
            id: "TL-004",
            trackId: "TRACK-104",
            loadingState: "Stop",
            zone: "Loading Dock C",
            camera: "CAM-204",
            alarmTriggered: false,
            timestamp: "2025-09-24 11:30:00",
          },
        ]}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: ["Loading Dock A", "Loading Dock B", "Loading Dock C"],
          },
          {
            id: "loadingState",
            label: "Loading State",
            type: "select",
            options: ["Start", "Stop"],
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
        downloadFileName="vehicle-loading-time-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        loading={false}
        tooltipMessage="report table"
      />
    </Box>
  );
};

export default VehicleUnloadingLoading;
