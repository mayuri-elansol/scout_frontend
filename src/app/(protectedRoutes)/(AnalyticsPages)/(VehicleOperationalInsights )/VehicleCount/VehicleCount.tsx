"use client";
import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { DirectionsCar, SwapHoriz, Place, Timeline } from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import { CameraZone } from "@/app/types";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
const VehicleCount: React.FC = () => {
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());
  const VehicleCountKpiData = [
    {
      title: "Total Vehicles",
      value: "87",
      icon: DirectionsCar,
    },
    {
      title: "Entry vs Exit",
      value: "12 In / 8 Out",
      icon: SwapHoriz,
    },
    {
      title: "Busiest Zone",
      value: "Zone A",
      icon: Place,
    },
    {
      title: "Current Vehicle Occupancy",
      value: "28",
      icon: Timeline,
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
          <NoCrashIcon sx={{ fontSize: 28, color: "#3072b0" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Vehicle Count & ANPR at Entry/Exit Gates
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
                📊
              </Box>
              Real Time Overview
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
              VehicleCountKpiData.map((kpi) => (
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
      </Paper>
      {/* PPE Violations Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "id", label: "ID", minWidth: 100 },
          { id: "numberDetected", label: "Number Detected", minWidth: 150 },
          { id: "status", label: "Status (Entry/Exit)", minWidth: 150 },
          { id: "validNumber", label: "Valid Number", minWidth: 120 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "camera", label: "Camera", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 150 },
          { id: "timestamp", label: "Timestamp", minWidth: 140 },
        ]}
        data={[
          {
            id: "VC-001",
            numberDetected: "MH12AB1234",
            status: "Entry",
            validNumber: true,
            zone: "Main Gate",
            camera: "CAM-101",
            alarmTriggered: false,
            timestamp: "2025-09-24 08:15",
          },
          {
            id: "VC-002",
            numberDetected: "MH12XY9876",
            status: "Exit",
            validNumber: false,
            zone: "Main Gate",
            camera: "CAM-102",
            alarmTriggered: true,
            timestamp: "2025-09-24 09:00",
          },
          {
            id: "VC-003",
            numberDetected: "MH14CD5678",
            status: "Entry",
            validNumber: true,
            zone: "Loading Dock",
            camera: "CAM-103",
            alarmTriggered: false,
            timestamp: "2025-09-24 09:30",
          },
          {
            id: "VC-004",
            numberDetected: "MH20EF2345",
            status: "Exit",
            validNumber: false,
            zone: "Parking Lot",
            camera: "CAM-104",
            alarmTriggered: true,
            timestamp: "2025-09-24 10:00",
          },
        ]}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: ["Main Gate", "Loading Dock", "Parking Lot"],
          },
          {
            id: "status",
            label: "Status",
            type: "select",
            options: ["Entry", "Exit"],
          },
          {
            id: "validNumber",
            label: "Valid Number",
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
        downloadFileName="vehicle-count-anpr-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        loading={false}
      />
    </Box>
  );
};

export default VehicleCount;
