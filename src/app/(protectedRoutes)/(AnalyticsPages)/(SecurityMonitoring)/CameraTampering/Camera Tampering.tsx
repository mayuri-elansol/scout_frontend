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
import CameraAltIcon from "@mui/icons-material/CameraAlt";
const CameraTampering: React.FC = () => {
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());
 const CameraTamperingKpiData = [
  {
    title: "Total Cameras Monitored",
    value: "42",
    subtitle: "All active surveillance cameras",
    color: "#1976d2",
    bgColor: "#e3f2fd",
    icon: Shield,
  },
  {
    title: "Active Tampering Alerts",
    value: "5",
    subtitle: "Cameras currently in alert state",
    color: "#f44336",
    bgColor: "#ffebee",
    icon: Warning,
  },
  {
    title: "Most Common Tampering",
    value: "Lens Covered",
    subtitle: "62% of incidents",
    color: "#ff9800",
    bgColor: "#fff3e0",
    icon: Schedule,
  },
  {
    title: "Offline Cameras",
    value: "3",
    subtitle: "Not transmitting data",
    color: "#9c27b0",
    bgColor: "#f3e5f5",
    icon: CheckCircle,
  },
  {
    title: "Tampering Incidents Today",
    value: "12",
    subtitle: "New events logged",
    color: "#4caf50",
    bgColor: "#e8f5e9",
    icon: Shield,
  },
  {
    title: "Avg. Detection Time",
    value: "1m 45s",
    subtitle: "Mean Time to Detect",
    color: "#2196f3",
    bgColor: "#e3f2fd",
    icon: Schedule,
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
          <CameraAltIcon sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Camera Tampering or Offline Detection
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards */}

      <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
        {KpiCardLoading
          ? // Show skeletons while loading
            skeletonKeys.map((key, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                key={index + 1}
              >
                <KpiCardSkeleton />
              </Grid>
            ))
          : // Show actual KPI cards
            CameraTamperingKpiData.map((kpi) => (
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
          { id: "tamperingType", label: "Tampering Type", minWidth: 150 },

          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "camera", label: "Camera", minWidth: 120 },

          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
          { id: "createdAt", label: "TimeStamp", minWidth: 140 },
        ]}
        data={[
          {
            id: "CTOD-101",
            tamperingType: "Lens Obstruction",
            snapshot: "snapshot_tamper1.jpg",
            zone: "Entrance Gate A",
            camera: "CAM-31",
            createdAt: "2025-09-24 09:15",
            updatedAt: "2025-09-24 09:17",
            alarmTriggered: true,
          },
          {
            id: "CTOD-102",
            tamperingType: "Offline",
            snapshot: "snapshot_tamper2.jpg",
            zone: "Warehouse Zone 1",
            camera: "CAM-32",
            createdAt: "2025-09-24 09:45",
            updatedAt: "2025-09-24 09:50",
            alarmTriggered: true,
          },
          {
            id: "CTOD-103",
            tamperingType: "Blur",
            snapshot: "snapshot_tamper3.jpg",
            zone: "Parking Lot",
            camera: "CAM-33",
            createdAt: "2025-09-24 10:30",
            updatedAt: "2025-09-24 10:35",
            alarmTriggered: false,
          },
          {
            id: "CTOD-104",
            tamperingType: "Online",
            snapshot: "snapshot_tamper4.jpg",
            zone: "Main Hall",
            camera: "CAM-34",
            createdAt: "2025-09-24 11:00",
            updatedAt: "2025-09-24 11:05",
            alarmTriggered: false,
          },
        ]}
        filters={[
          {
            id: "tamperingType",
            label: "Tampering Type",
            type: "select",
            options: ["Blur", "Online", "Offline", "Lens Obstruction"],
          },
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Entrance Gate A",
              "Warehouse Zone 1",
              "Parking Lot",
              "Main Hall",
            ],
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
        downloadFileName="camera-tampering-detection-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        loading={false}
        isDownload={true}
      />
    </Box>
  );
};

export default CameraTampering;
