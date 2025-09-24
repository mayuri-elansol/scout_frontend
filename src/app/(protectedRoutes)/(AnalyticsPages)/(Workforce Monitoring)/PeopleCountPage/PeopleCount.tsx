"use client";

import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Typography } from "@mui/material";

import { People, TrendingUp, CheckCircle, Place, Schedule, Videocam } from "@mui/icons-material";

import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import { CameraZone } from "@/app/types";
import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
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
    title: "Current People Inside",
    value: "267",
    subtitle: "People currently inside",
    trend: "+12 vs previous",
    trendColor: "#4caf50",
    color: "#4caf50",
    bgColor: "#e8f5e9",
    icon: People,
  },
  {
    title: "Total Entries Today",
    value: "512",
    subtitle: "People entered",
    trend: "+25",
    trendColor: "#2196f3",
    color: "#2196f3",
    bgColor: "#e3f2fd",
    icon: TrendingUp,
  },
  {
    title: "Total Exits Today",
    value: "245",
    subtitle: "People exited",
    trend: "-8",
    trendColor: "#ff9800",
    color: "#ff9800",
    bgColor: "#fff8e1",
    icon: CheckCircle,
  },
  {
    title: "Most Crowded Zone",
    value: "Production Floor",
    subtitle: "Zone with highest people inside",
    trend: "Active",
    trendColor: "#f44336",
    color: "#f44336",
    bgColor: "#ffebee",
    icon: Place,
  },
  {
    title: "Peak Hour",
    value: "2 PM - 3 PM",
    subtitle: "Max people inside",
    trend: "High activity",
    trendColor: "#9c27b0",
    color: "#9c27b0",
    bgColor: "#f3e5f5",
    icon: Schedule,
  },
  {
    title: "Camera with Most Activity",
    value: "Camera 07",
    subtitle: "Most movements detected",
    trend: "25 entries/exits",
    trendColor: "#ff5722",
    color: "#ff5722",
    bgColor: "#fbe9e7",
    icon: Videocam,
  },
];
  const KpiCardLoading = false;

  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <People sx={{ fontSize: 28, color: "#4caf50" }} />
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
          { id: "recordId", label: "Record ID", minWidth: 100 },
          { id: "timestamp", label: "Timestamp", minWidth: 80 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "currentCount", label: "Current Count", minWidth: 100 },
          { id: "capacity", label: "Capacity", minWidth: 80 },
          { id: "occupancy", label: "Occupancy %", minWidth: 100 },
        ]}
        data={[
          {
            recordId: "PC-7892",
            timestamp: "15:42",
            zone: "Main Factory Floor",
            currentCount: "245",
            capacity: "300",
            occupancy: "82%",
            status: "ACTIVE",
            priority: "Medium",
            resolution: "Normal operations",
          },
          {
            recordId: "PC-7891",
            timestamp: "15:28",
            zone: "Cafeteria",
            currentCount: "180",
            capacity: "150",
            occupancy: "120%",
            status: "OVERCROWDED",
            priority: "Critical",
            resolution: "Crowd dispersal initiated",
          },
          {
            recordId: "PC-7890",
            timestamp: "15:15",
            zone: "Assembly Line A",
            currentCount: "45",
            capacity: "50",
            occupancy: "90%",
            status: "ACTIVE",
            priority: "Low",
            resolution: "Within safe limits",
          },
          {
            recordId: "PC-7889",
            timestamp: "14:58",
            zone: "Emergency Exit Area",
            currentCount: "25",
            capacity: "20",
            occupancy: "125%",
            status: "BLOCKED",
            priority: "Critical",
            resolution: "Exit clearance required",
          },
          {
            recordId: "PC-7888",
            timestamp: "14:32",
            zone: "Conference Room B",
            currentCount: "12",
            capacity: "15",
            occupancy: "80%",
            status: "ACTIVE",
            priority: "Low",
            resolution: "Meeting in progress",
          },
          {
            recordId: "PC-7887",
            timestamp: "14:15",
            zone: "Loading Dock",
            currentCount: "8",
            capacity: "10",
            occupancy: "80%",
            status: "ACTIVE",
            priority: "Low",
            resolution: "Normal loading operations",
          },
          {
            recordId: "PC-7886",
            timestamp: "13:58",
            zone: "Parking Lot",
            currentCount: "156",
            capacity: "200",
            occupancy: "78%",
            status: "ACTIVE",
            priority: "Low",
            resolution: "Adequate parking space",
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
            id: "status",
            label: "Status",
            type: "select",
            options: ["ACTIVE", "OVERCROWDED", "BLOCKED"],
          },
          {
            id: "priority",
            label: "Priority",
            type: "select",
            options: ["Critical", "Medium", "Low"],
          },
          { id: "minOccupancy", label: "Min Occupancy %", type: "text" },
          { id: "maxOccupancy", label: "Max Occupancy %", type: "text" },
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
