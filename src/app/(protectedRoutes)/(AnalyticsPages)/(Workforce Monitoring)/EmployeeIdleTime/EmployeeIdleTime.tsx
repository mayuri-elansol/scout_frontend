"use client";
import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Typography } from "@mui/material";
import { Shield, Warning, CheckCircle, Schedule } from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import { CameraZone } from "@/app/types";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
const EmployeeIdleTime: React.FC = () => {
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());
  const EmployeeIdleTimeKpiData = [
    {
      title: "PPE Compliance Rate",
      value: "87.5%",
      subtitle: "Current compliance level",
      trend: "-2.3%",
      trendColor: "#ff9800",
      color: "#ff9800",
      bgColor: "#fff8e1",
      icon: Shield,
    },
    {
      title: "PPE Violations Per Day",
      value: "12",
      subtitle: "Today's violations",
      trend: "+3",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      icon: Warning,
    },
    {
      title: "PPE Detection Accuracy",
      value: "94.2%",
      subtitle: "System accuracy rate",
      trend: "+1.1%",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      icon: CheckCircle,
    },
    {
      title: "Time Since Last Violation",
      value: "2h 34m",
      subtitle: "Last incident recorded",
      trend: "Recent",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      icon: Schedule,
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
          <PhotoCameraFrontIcon sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Employee Idle Time Monitoring
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
            EmployeeIdleTimeKpiData.map((kpi) => (
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
          { id: "isIdle", label: "Is Idle", minWidth: 100 },
          { id: "isWorking", label: "Is Working", minWidth: 120 },
          { id: "notPresent", label: "Not Present", minWidth: 120 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "camera", label: "Camera", minWidth: 120 },
          { id: "timestamp", label: "Timestamp", minWidth: 140 },
        ]}
        data={[
          {
            id: "EIT-001",
            isIdle: true,
            isWorking: false,
            notPresent: false,
            zone: "Assembly Line A",
            camera: "CAM-51",
            timestamp: "2025-09-24 09:15",
          },
          {
            id: "EIT-002",
            isIdle: false,
            isWorking: true,
            notPresent: false,
            zone: "Loading Dock",
            camera: "CAM-52",
            timestamp: "2025-09-24 09:25",
          },
          {
            id: "EIT-003",
            isIdle: false,
            isWorking: false,
            notPresent: true,
            zone: "Parking Lot",
            camera: "CAM-53",
            timestamp: "2025-09-24 09:35",
          },
          {
            id: "EIT-004",
            isIdle: true,
            isWorking: false,
            notPresent: false,
            zone: "Main Factory Floor",
            camera: "CAM-54",
            timestamp: "2025-09-24 09:45",
          },
        ]}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Assembly Line A",
              "Loading Dock",
              "Parking Lot",
              "Main Factory Floor",
            ],
          },
          {
            id: "isIdle",
            label: "Is Idle",
            type: "select",
            options: ["true", "false"],
          },
          {
            id: "isWorking",
            label: "Is Working",
            type: "select",
            options: ["true", "false"],
          },
          {
            id: "notPresent",
            label: "Not Present",
            type: "select",
            options: ["true", "false"],
          },
          { id: "startDate", label: "Start Date", type: "date" },
          { id: "endDate", label: "End Date", type: "date" },
        ]}
        downloadFileName="employee-idle-time-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        loading={false}
        isDownload={true}
      />
    </Box>
  );
};

export default EmployeeIdleTime;
