"use client";

import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Typography } from "@mui/material";
import {
  People,
  TrendingUp,
  Place,
  CheckCircle,
  Warning,
  LocalFireDepartment,
  SmokeFree,
  Science,
  OilBarrel,
  LocationOn,
  AccessTime,
} from "@mui/icons-material";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import { CameraZone } from "@/app/types";
import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { timeStamp } from "console";
const FireSmokeOilLeakDetection: React.FC = () => {
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

  const FireSmokeOilKpiData = [
    {
      title: "Fire Incidence",
      value: "267",
      icon: LocalFireDepartment, // 🔥 Fire
    },
    {
      title: "Smoke Incidence",
      value: "324",
      icon: SmokeFree, // 💨 Smoke
    },
    {
      title: "Last Detection Time",
      value: "10:42 AM",
      icon: AccessTime, // ⏰ Time
    },
    {
      title: "Last Detection Zone",
      value: "Zone A",
      icon: LocationOn, // 📍 Zone / Location
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
  const KpiCardLoading = false;

  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <LocalFireDepartmentIcon sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Fire, Smoke, Oil and Gas Leak Detection
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
            FireSmokeOilKpiData.map((kpi, index) => (
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

      {/*  Fire, Smoke, Oil and Gas Leak Detection Report */}

      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "recordId", label: "Record ID", minWidth: 100 },
          { id: "cameraId", label: "Camera ID", minWidth: 100 },

          { id: "zone", label: "Zone", minWidth: 100 },
          { id: "fireDetection", label: "Fire Detection", minWidth: 100 },
          { id: "smokeDetection", label: "Smoke Detection", minWidth: 100 },
          { id: "oilDetection", label: "Oil Detection", minWidth: 100 },
          { id: "gasDetection", label: "Gas Detection", minWidth: 100 },
          { id: "timestamp", label: "Timestamp", minWidth: 100 },
        ]}
        data={[
          {
            recordId: "123",
            cameraId: "CAM-101",
            timestamp: "2025-09-24 15:42",
            zone: "Main Factory Floor",
            fireDetection: true,
            smokeDetection: false,
            oilDetection: true,
            gasDetection: false,
          },
          {
            recordId: "124",
            cameraId: "CAM-102",
            timestamp: "2025-09-24 15:28",
            zone: "Cafeteria",
            fireDetection: false,
            smokeDetection: true,
            oilDetection: false,
            gasDetection: true,
          },
          {
            recordId: "125",
            cameraId: "CAM-103",
            timestamp: "2025-09-24 15:15",
            zone: "Assembly Line A",
            fireDetection: true,
            smokeDetection: true,
            oilDetection: false,
            gasDetection: false,
          },
          {
            recordId: "126",
            cameraId: "CAM-104",
            timestamp: "2025-09-24 14:58",
            zone: "Emergency Exit Area",
            fireDetection: false,
            smokeDetection: true,
            oilDetection: true,
            gasDetection: true,
          },
          {
            recordId: "127",
            cameraId: "CAM-105",
            timestamp: "2025-09-24 14:32",
            zone: "Conference Room B",
            fireDetection: false,
            smokeDetection: false,
            oilDetection: true,
            gasDetection: false,
          },
          {
            recordId: "128",
            cameraId: "CAM-106",
            timestamp: "2025-09-24 14:15",
            zone: "Loading Dock",
            fireDetection: true,
            smokeDetection: true,
            oilDetection: false,
            gasDetection: false,
          },
          {
            recordId: "129",
            cameraId: "CAM-107",
            timestamp: "2025-09-24 13:58",
            zone: "Parking Lot",
            fireDetection: false,
            smokeDetection: false,
            oilDetection: false,
            gasDetection: true,
          },
        ]}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Main Factory Floor",
              "Cafeteria",
              "Assembly Line A",
              "Emergency Exit Area",
              "Conference Room B",
              "Loading Dock",
              "Parking Lot",
            ],
          },
          {
            id: "fireDetection",
            label: "Fire Detection",
            type: "select",
            options: ["true", "false"],
          },
          {
            id: "smokeDetection",
            label: "Smoke Detection",
            type: "select",
            options: ["true", "false"],
          },
          {
            id: "oilDetection",
            label: "Oil Detection",
            type: "select",
            options: ["true", "false"],
          },
          {
            id: "gasDetection",
            label: "Gas Detection",
            type: "select",
            options: ["true", "false"],
          },
          { id: "startDate", label: "Start Date", type: "date" },
          { id: "endDate", label: "End Date", type: "date" },
        ]}
        downloadFileName="detection-report"
        isDownload={true}
        loading={false}
      />
    </Box>
  );
};

export default FireSmokeOilLeakDetection;
