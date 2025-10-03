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
import BlockIcon from "@mui/icons-material/Block";
import { Block, DirectionsCar, LocationOn, Shield } from "@mui/icons-material";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
const UnauthorizedParkingOrEquipmentBlockingAisles: React.FC = () => {
  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());
  const KpiData = [
    {
      title: "Total Blockages",
      value: "87",
      icon: Shield,
    },
    {
      title: "Vehicle Blockages",
      value: "12", // specific to cars/vehicles
      icon: DirectionsCar, // better for car-related blockages
    },
    {
      title: "Non-Vehicle Blockages",
      value: "94",
      icon: Block,
    },
    {
      title: "Most Affected Zone",
      value: "Zone A",
      icon: LocationOn,
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
          <BlockIcon sx={{ fontSize: 28, color: "#3072b0" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Unauthorized Parking or Equipment Blocking Aisles
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
              skeletonKeys.map((index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                  key={uuidv4() + index}
                >
                  <KpiCardSkeleton />
                </Grid>
              ))
            : // Show actual KPI cards
              KpiData.map((kpi, index) => (
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
              tooltipMessage="recent voliaotn"
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
          { id: "type", label: "Type ", minWidth: 120 },

          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "camera", label: "Camera", minWidth: 120 },
          { id: "timestamp", label: "Timestamp", minWidth: 150 },
        ]}
        data={[
          {
            id: "UP-001",
            type: "Car",
            snapshot: "snapshot_url_1.jpg",
            zone: "Parking Lot A",
            camera: "CAM-301",
            timestamp: "2025-09-24 09:15:00",
          },
          {
            id: "UP-002",
            type: "Not Car",
            snapshot: "snapshot_url_2.jpg",
            zone: "Loading Dock B",
            camera: "CAM-302",
            timestamp: "2025-09-24 09:45:00",
          },
          {
            id: "UP-003",
            type: "Car",
            snapshot: "snapshot_url_3.jpg",
            zone: "Main Gate",
            camera: "CAM-303",
            timestamp: "2025-09-24 10:05:00",
          },
          {
            id: "UP-004",
            type: "Not Car",
            snapshot: "snapshot_url_4.jpg",
            zone: "Warehouse Area",
            camera: "CAM-304",
            timestamp: "2025-09-24 10:30:00",
          },
        ]}
        filters={[
          {
            id: "type",
            label: "Type Of",
            type: "select",
            options: ["Car", "Not Car"],
          },
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Parking Lot A",
              "Loading Dock B",
              "Main Gate",
              "Warehouse Area",
            ],
          },
          { id: "timestamp", label: "Start Date", type: "date" },
          { id: "timestamp", label: "End Date", type: "date" },
        ]}
        downloadFileName="unauthorized-parking-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        loading={false}
        tooltipMessage="report table"
      />
    </Box>
  );
};

export default UnauthorizedParkingOrEquipmentBlockingAisles;
