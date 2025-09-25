"use client";
import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Typography } from "@mui/material";
import { Groups, LocationOn, AccessTime } from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import { CameraZone } from "@/app/types";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
const PeoplePresence: React.FC = () => {
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());

  const PeoplePresenceKpiData = [
    {
      title: "Total People Count",
      value: "87", // Current number of people detected
      icon: Groups,
    },
    {
      title: "Detected Zones",
      value: "Zone A, Zone B", // Zones where people are detected
      icon: LocationOn,
    },
    {
      title: "Last Incidence",
      value: "10:25 AM", // Last detection timestamp
      icon: AccessTime,
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
          <PeopleAltIcon sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            People Presence during Shutdown Hours
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
            PeoplePresenceKpiData.map((kpi) => (
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
          { id: "peopleCount", label: "People Count", minWidth: 120 },

          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "camera", label: "Camera", minWidth: 120 },

          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
          { id: "createdAt", label: "TimeStamp", minWidth: 140 },
        ]}
        data={[
          {
            id: "PPDS-001",
            peopleCount: 5,
            snapshot: "snapshot_shutdown1.jpg",
            zone: "Factory Floor A",
            camera: "CAM-41",
            createdAt: "2025-09-24 22:15",
            updatedAt: "2025-09-24 22:18",
            alarmTriggered: true,
          },
          {
            id: "PPDS-002",
            peopleCount: 2,
            snapshot: "snapshot_shutdown2.jpg",
            zone: "Loading Dock",
            camera: "CAM-42",
            createdAt: "2025-09-24 23:05",
            updatedAt: "2025-09-24 23:07",
            alarmTriggered: false,
          },
          {
            id: "PPDS-003",
            peopleCount: 0,
            snapshot: "snapshot_shutdown3.jpg",
            zone: "Parking Lot",
            camera: "CAM-43",
            createdAt: "2025-09-24 22:45",
            updatedAt: "2025-09-24 22:47",
            alarmTriggered: false,
          },
          {
            id: "PPDS-004",
            peopleCount: 3,
            snapshot: "snapshot_shutdown4.jpg",
            zone: "Assembly Line B",
            camera: "CAM-44",
            createdAt: "2025-09-24 22:55",
            updatedAt: "2025-09-24 23:00",
            alarmTriggered: true,
          },
        ]}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Factory Floor A",
              "Loading Dock",
              "Parking Lot",
              "Assembly Line B",
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
        downloadFileName="people-presence-shutdown-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        loading={false}
      />
    </Box>
  );
};

export default PeoplePresence;
