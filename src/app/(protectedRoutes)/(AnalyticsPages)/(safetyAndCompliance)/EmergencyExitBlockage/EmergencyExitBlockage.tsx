"use client";
import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Typography } from "@mui/material";
import { Block, CheckCircle, LocationOn } from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import { CameraZone } from "@/app/types";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
const EmergencyExitBlockage: React.FC = () => {
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());

  const ExitKpiData = [
    {
      title: "Blocked Emergency Exit",
      value: "87", // Count of currently blocked exits
      icon: Block, // ⛔ Blocked path
    },
    {
      title: "Clear Emergency Exit Routes",
      value: "12", // Count of safe/clear exits
      icon: CheckCircle, // ✅ Safe / clear
    },
    {
      title: "Affected Zones (Last 3)",
      value: "Zone A, Zone B, Zone C", // Last 3 affected zones
      icon: LocationOn, // 📍 Zone/location indicator
    },
  ];

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
          <DirectionsRunIcon sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Emergency Exit Blockage Detection
          </Typography>
        </Box>
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
            ExitKpiData.map((kpi) => (
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
          />
        </Grid>
        {/* PPE Compliance by Zone */}

        <Grid size={{ xs: 12, lg: 4 }}>
          <CameraStatus cameraZones={cameraZones} loading={false} />
        </Grid>
      </Grid>

      {/* PPE Violations Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "id", label: "ID", minWidth: 100 },
          { id: "blockage", label: "Blockage", minWidth: 100 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 120 },

          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "camera", label: "Camera", minWidth: 120 },
          { id: "createdAt", label: "TimeStamp", minWidth: 140 },
        ]}
        data={[
          {
            id: "EB-101",
            blockage: true,
            alarmTriggered: true,
            snapshot: "blockage_snapshot1.jpg",
            zone: "Main Entrance",
            camera: "CAM-01",
            createdAt: "2025-09-24 15:42",
          },
          {
            id: "EB-102",
            blockage: false,
            alarmTriggered: false,
            snapshot: "blockage_snapshot2.jpg",
            zone: "Loading Dock",
            camera: "CAM-02",
            createdAt: "2025-09-24 15:28",
          },
          {
            id: "EB-103",
            blockage: true,
            alarmTriggered: true,
            snapshot: "blockage_snapshot3.jpg",
            zone: "Assembly Area",
            camera: "CAM-03",
            createdAt: "2025-09-24 15:15",
          },
          {
            id: "EB-104",
            blockage: false,
            alarmTriggered: false,
            snapshot: "blockage_snapshot4.jpg",
            zone: "Parking Lot",
            camera: "CAM-04",
            createdAt: "2025-09-24 14:58",
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
            id: "blockage",
            label: "Blockage",
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
        downloadFileName="emergency-exit-blockage-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        loading={false}
        isDownload={true}
      />
    </Box>
  );
};

export default EmergencyExitBlockage;
