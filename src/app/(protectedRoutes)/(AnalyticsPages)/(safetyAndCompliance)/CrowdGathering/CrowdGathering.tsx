"use client";
import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Typography } from "@mui/material";
import {
  Groups,
  ReportProblem,
  LocationOn,
  AccessTime,
} from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import { CameraZone } from "@/app/types";
import GroupsIcon from "@mui/icons-material/Groups";
const CrowdGathering: React.FC = () => {
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());

  const CrowdKpiData = [
    {
      title: "Crowded Zone",
      value: "Zone B", // Zone currently most crowded
      icon: Groups,
    },
    {
      title: "Total Incidents Detected",
      value: "56", // Total crowd-related incidents
      icon: ReportProblem,
    },
    {
      title: "Peak Crowd Density ",
      value: "50 (Zone B)", // Zone with highest density
      icon: LocationOn,
    },
    {
      title: "Last Incidence",
      value: "09:45 AM", // Timestamp of last detected crowd incident
      icon: AccessTime,
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
          <GroupsIcon sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Crowd Gathering in Hazardous Zones
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
            CrowdKpiData.map((kpi) => (
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
        title="Crowd Gathering in Hazardous Zones Report"
        columns={[
          { id: "id", label: "ID", minWidth: 100 },
          { id: "gatheredMore", label: "Gathered More", minWidth: 140 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
          { id: "mobCount", label: "People Count", minWidth: 120 },

          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "camera", label: "Camera", minWidth: 120 },
          { id: "createdAt", label: "TimeStamp", minWidth: 140 },
        ]}
        data={[
          {
            id: "CGD-101",
            gatheredMore: true,
            alarmTriggered: true,
            mobCount: 25,
            snapshot: "snapshot1.jpg",
            zone: "Main Entrance",
            camera: "CAM-01",
            createdAt: "2025-09-24 15:42",
          },
          {
            id: "CGD-102",
            gatheredMore: false,
            alarmTriggered: false,
            mobCount: 5,
            snapshot: "snapshot2.jpg",
            zone: "Loading Dock",
            camera: "CAM-02",
            createdAt: "2025-09-24 15:28",
          },
          {
            id: "CGD-103",
            gatheredMore: true,
            alarmTriggered: true,
            mobCount: 50,
            snapshot: "snapshot3.jpg",
            zone: "Assembly Area",
            camera: "CAM-03",
            createdAt: "2025-09-24 15:15",
          },
          {
            id: "CGD-104",
            gatheredMore: false,
            alarmTriggered: false,
            mobCount: 8,
            snapshot: "snapshot4.jpg",
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
            id: "gatheredMore",
            label: "Gathered More",
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
        downloadFileName="crowd-gathering-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        loading={false}
      />
    </Box>
  );
};

export default CrowdGathering;
