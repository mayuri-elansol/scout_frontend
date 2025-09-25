"use client";

import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Typography } from "@mui/material";
import {
  Shield,
  ErrorOutline,
  VisibilityOff,
  Visibility,
  LocationOn,
  AccessTime,
  Error,
  Checkroom,
  EmojiPeople,
} from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import { CameraZone } from "@/app/types";
import EngineeringIcon from "@mui/icons-material/Engineering";
const PPEDetection: React.FC = () => {
  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());

  const ppeKpiData = [
    {
      title: "Total Violations",
      value: "87",
      icon: Shield,
    },

    {
      title: "Current Unsafe Zone",
      value: "2",
      icon: LocationOn,
    },
    {
      title: "Last Detection Time",
      value: "10:35 AM",
      icon: AccessTime,
    },
    {
      title: "Missing Helmet",
      value: "12",
      icon: EngineeringIcon,
    },
    {
      title: "Missing Vest",
      value: "12",
      icon: Checkroom,
    },
    {
      title: "Missing Glasses",
      value: "9",
      icon: Visibility,
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

  interface FilterParams {
    status?: string;
    employeeName?: string;
    startDate?: string;
    endDate?: string;
  }
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
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <EngineeringIcon sx={{ fontSize: 30, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Personal Protective Equipment (PPE) Detection
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
            ppeKpiData.map((kpi, index) => (
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
          { id: "helmet", label: "Helmet", minWidth: 120 },
          { id: "vest", label: "Vest", minWidth: 80 },
          { id: "glasses", label: "Glasses", minWidth: 120 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "createdAt", label: "Created At", minWidth: 120 },
        ]}
        data={[
          {
            helmet: "YES",
            vest: "YES",
            glasses: "NO",
            zone: "Production Floor A",
            createdAt: "2025-09-23 15:42",
          },
          {
            helmet: "YES",
            vest: "YES",
            glasses: "NO",
            zone: "Welding Station",
            createdAt: "2025-09-23 15:28",
          },
          {
            helmet: "YES",
            vest: "YES",
            glasses: "NO",
            zone: "Chemical Storage",
            createdAt: "2025-09-23 15:15",
          },
          {
            helmet: "YES",
            vest: "YES",
            glasses: "NO",
            zone: "Assembly Line B",
            createdAt: "2025-09-23 14:58",
          },
          {
            helmet: "NO",
            vest: "NO",
            glasses: "YES",
            zone: "Maintenance Area",
            createdAt: "2025-09-23 14:32",
          },
        ]}
        filters={[
          {
            id: "helmet",
            label: "Helmet",
            type: "select",
            options: ["YES", "NO"],
          },
          { id: "vest", label: "Vest", type: "select", options: ["YES", "NO"] },
          {
            id: "glasses",
            label: "Glasses",
            type: "select",
            options: ["YES", "NO"],
          },
          { id: "zone", label: "Zone", type: "text" },
          { id: "startdate", label: "Start Date", type: "date" }, // will now be datetime
          { id: "enddate", label: "End Date", type: "date" }, // will now be datetime
        ]}
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        onDownload={handleDownloadSingle}
        onView={handleViewSingle}
        downloadFileName="ppe-violations-report"
        loading={false}
        isDownload={true}
      />
    </Box>
  );
};

export default PPEDetection;
