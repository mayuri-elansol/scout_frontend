"use client";

import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Typography } from "@mui/material";
import {
  People,
  Warning,
  Shield,
 
} from "@mui/icons-material";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import { CameraZone } from "@/app/types";
import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import LockPersonIcon from "@mui/icons-material/LockPerson";
const EmployeePresence: React.FC = () => {
  const employeeKpiData = [
    {
      title: "Employees in Critical Areas",
      value: "0",
      icon: People,
    },
    {
      title: "Critical Zone Violations",
      value: "127",
      icon: Warning,
    },
    {
      title: "Zones Monitored",
      value: "3",
      icon: Shield,
    },
  ];

  const activePersonnel = [
    {
      title: "John Mitchell - Level 3 Operator",
      zone: "Reactor Control Room",
      time: "Day Shift",
      Id: "EMP-4521",
      severity: "N/A",
      status: "ACTIVE",
      bgColor: "#e8f5e9",
      imageUrl: "https://picsum.photos/1200/600?random=11",
    },
    {
      title: "Sarah Chen - Senior Technician",
      zone: "Chemical Processing Unit",
      time: "Day Shift",
      Id: "EMP-3847",
      severity: "N/A",
      status: "ON_BREAK",
      bgColor: "#fff8e1",
      imageUrl: "https://picsum.photos/1200/600?random=12",
    },
    {
      title: "Michael Torres - Safety Coordinator",
      zone: "Emergency Response Station",
      time: "Day Shift",
      Id: "EMP-5623",
      severity: "N/A",
      status: "ACTIVE",
      bgColor: "#e8f5e9",
      imageUrl: "https://picsum.photos/1200/600?random=13",
    },
    {
      title: "Lisa Anderson - Lab Supervisor",
      zone: "Quality Control Lab",
      time: "Day Shift",
      Id: "EMP-7891",
      severity: "N/A",
      status: "MISSING",
      bgColor: "#ffebee",
      imageUrl: "https://picsum.photos/1200/600?random=14",
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
          <LockPersonIcon sx={{ fontSize: 28, color: "#2196f3" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Employee presence detection in critical areas
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
          employeeKpiData.map((kpi, index) => (
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
        {/* Active Critical Zone Personnel */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <RecentViolations
            label="Recent Violations"
            violations={activePersonnel}
            loading={false}
          />
        </Grid>
        {/* Critical Zones Status */}
        {/* item xs={12} lg={4} */}

        <Grid size={{ xs: 12, lg: 4 }}>
          <CameraStatus cameraZones={cameraZones} loading={false} />
        </Grid>
      </Grid>

      {/* Employee Presence Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "id", label: "ID", minWidth: 100 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "camera", label: "Camera", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
          { id: "timestamp", label: "Timestamp", minWidth: 140 },
        ]}
        data={[
          {
            id: "EPD-001",
            zone: "Main Factory Floor",
            camera: "CAM-21",
            alarmTriggered: true,
            timestamp: "2025-09-24 10:15",
          },
          {
            id: "EPD-002",
            zone: "Loading Dock",
            camera: "CAM-22",
            alarmTriggered: false,
            timestamp: "2025-09-24 10:25",
          },
          {
            id: "EPD-003",
            zone: "Assembly Line A",
            camera: "CAM-23",
            alarmTriggered: true,
            timestamp: "2025-09-24 10:35",
          },
          {
            id: "EPD-004",
            zone: "Parking Lot",
            camera: "CAM-24",
            alarmTriggered: false,
            timestamp: "2025-09-24 10:45",
          },
        ]}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Main Factory Floor",
              "Loading Dock",
              "Assembly Line A",
              "Parking Lot",
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
        downloadFileName="employee-presence-report"
        isDownload={true}
        loading={false}
      />
    </Box>
  );
};

export default EmployeePresence;
