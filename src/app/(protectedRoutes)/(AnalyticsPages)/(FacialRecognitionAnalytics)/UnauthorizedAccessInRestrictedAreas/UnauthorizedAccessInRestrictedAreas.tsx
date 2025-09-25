"use client";

import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Typography } from "@mui/material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import { CameraZone } from "@/app/types";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import {
  CameraAlt,
  Place,
  Schedule,
  Shield,
  Warning,
} from "@mui/icons-material";
const UnauthorizedAccessInRestrictedAreas: React.FC = () => {
  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());

  const UnauthorizedAccessKpiData = [
    {
      title: "Total Unauthorized Access",
      value: "25", // Total records in the table
      subtitle: "Total incidents detected",
      trend: "+4",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: Warning,
    },
    {
      title: "Active Cameras with Violations",
      value: "6", // Count of unique cameras from 'camera' field in incidents table
      subtitle: "Cameras detecting unauthorized access",
      trend: "Stable",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      icon: CameraAlt,
    },
    {
      title: "Most Violated Zone",
      value: "Chemical Storage", // Zone with highest number of incidents
      subtitle: "Zone with most unauthorized entries",
      trend: "Today",
      trendColor: "#ff9800",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: Place,
    },
    {
      title: "Peak Hour of Incidents",
      value: "15:00", // Calculate: EXTRACT(HOUR from createdat) → COUNT(*) → max
      subtitle: "Hour with maximum unauthorized access",
      trend: "Today",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: Schedule,
    },

    {
      title: "Zones with Violations",
      value: "5", // Unique zones from 'zone' field
      subtitle: "Zones where incidents occurred",
      trend: "Stable",
      trendColor: "#ff9800",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: Shield,
    },
  ];

  const recentViolations = [
    {
      title: "Hard hat missing",
      zone: "Production Zone A",
      time: "14:32",
      Id: "W-4521",
      severity: "HIGH",
      status: "ACTIVE",
      imageUrl: "https://picsum.photos/400/200?random=1",
    },
    {
      title: "Safety vest not worn",
      zone: "Warehouse Zone B",
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
          <NoAccountsIcon sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Unauthorized Access in Restricted Areas
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
            UnauthorizedAccessKpiData.map((kpi, index) => (
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

      {/* PPE Violations Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "id", label: "ID", minWidth: 100 },
          { id: "zone", label: "Zone", minWidth: 150 },
          { id: "camera", label: "Camera", minWidth: 150 },
          { id: "time", label: "Time", minWidth: 150 },
        ]}
        data={[
          {
            id: "AR-001",
            zone: "Server Room",
            camera: "CAM-401",
            time: "2025-09-24 09:10:00",
          },
          {
            id: "AR-002",
            zone: "Control Room",
            camera: "CAM-402",
            time: "2025-09-24 09:25:00",
          },
          {
            id: "AR-003",
            zone: "Restricted Storage",
            camera: "CAM-403",
            time: "2025-09-24 10:00:00",
          },
          {
            id: "AR-004",
            zone: "Power Plant Access",
            camera: "CAM-404",
            time: "2025-09-24 10:45:00",
          },
        ]}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Server Room",
              "Control Room",
              "Restricted Storage",
              "Power Plant Access",
            ],
          },
          { id: "startDate", label: "Start Date", type: "date" },
          { id: "endDate", label: "End Date", type: "date" },
        ]}
        downloadFileName="access-restricted-areas-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        loading={false}
      />
    </Box>
  );
};

export default UnauthorizedAccessInRestrictedAreas;
