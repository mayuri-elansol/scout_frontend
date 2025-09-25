"use client";

import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Typography } from "@mui/material";

import { People, Login, Logout } from "@mui/icons-material";

import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import { CameraZone } from "@/app/types";
import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
export const cameraZones: CameraZone[] = [
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
const PeopleCount: React.FC = () => {
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

  const peopleCountKpiData = [
    {
      title: "People Inside",
      value: "267", // Current count of people inside
      icon: People, // 👥 Crowd of people
    },
    {
      title: "Entry Count",
      value: "512", // Total entries today
      icon: Login, // ⬅️ Entry
    },
    {
      title: "Exit Count",
      value: "245", // Total exits today
      icon: Logout, // ➡️ Exit
    },
  ];
  const KpiCardLoading = false;

  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <FollowTheSignsIcon sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            People Count in Factory Premises based on Entry Exit Counting
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
            peopleCountKpiData.map((kpi, index) => (
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

      {/* People Count Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "id", label: "ID", minWidth: 100 },
          { id: "enteredCount", label: "Entered Count", minWidth: 140 },
          { id: "exitCount", label: "Exit Count", minWidth: 120 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "camera", label: "Camera", minWidth: 120 },
          { id: "timestamp", label: "Timestamp", minWidth: 140 },
        ]}
        data={[
          {
            id: "PC-001",
            enteredCount: 45,
            exitCount: 20,
            zone: "Main Factory Floor",
            camera: "CAM-101",
            timestamp: "2025-09-24 08:15",
          },
          {
            id: "PC-002",
            enteredCount: 30,
            exitCount: 15,
            zone: "Cafeteria",
            camera: "CAM-102",
            timestamp: "2025-09-24 08:30",
          },
          {
            id: "PC-003",
            enteredCount: 60,
            exitCount: 55,
            zone: "Assembly Line A",
            camera: "CAM-103",
            timestamp: "2025-09-24 09:00",
          },
          {
            id: "PC-004",
            enteredCount: 25,
            exitCount: 10,
            zone: "Emergency Exit Area",
            camera: "CAM-104",
            timestamp: "2025-09-24 09:20",
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
            ],
          },
          { id: "startDate", label: "Start Date", type: "date" },
          { id: "endDate", label: "End Date", type: "date" },
        ]}
        downloadFileName="people-count-report"
        isDownload={true}
        loading={false}
      />
    </Box>
  );
};

export default PeopleCount;
