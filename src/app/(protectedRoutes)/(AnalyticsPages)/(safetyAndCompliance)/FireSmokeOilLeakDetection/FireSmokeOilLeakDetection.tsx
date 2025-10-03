"use client";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  LocalFireDepartment,
  SmokeFree,
  LocationOn,
  AccessTime,
} from "@mui/icons-material";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";

import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { useState } from "react";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import ViolationsIcon from "@mui/icons-material/Warning";
import AlarmIcon from "@mui/icons-material/NotificationImportant";
const FireSmokeOilLeakDetection: React.FC = () => {
  interface RecentViolationData {
    Voilation: string;
    zone: string;
    time: string;
    imageUrl: string;
    cameraId: string;
    alarmTriggered: boolean;
  }

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] =
    useState<RecentViolationData | null>(null);
  const backendFireData = [
    {
      id: 201,
      detection: true,
      objectname: "fire",
      snapshot: "https://picsum.photos/400/200?random=6",
      zone: "Production Floor A",
      camera: "CAM-06",
      timestamp: "2025-09-23 16:00",
      alarmTriggered: true,
      createdAt: "2025-09-23 16:00",
      updatedAt: "2025-09-23 16:01",
    },
    {
      id: 202,
      detection: true,
      objectname: "smoke",
      snapshot: "https://picsum.photos/400/200?random=7",
      zone: "Welding Station",
      camera: "CAM-07",
      timestamp: "2025-09-23 16:10",
      alarmTriggered: true,
      createdAt: "2025-09-23 16:10",
      updatedAt: "2025-09-23 16:12",
    },
    {
      id: 203,
      detection: true,
      objectname: "gas",
      snapshot: "https://picsum.photos/400/200?random=8",
      zone: "Chemical Storage",
      camera: "CAM-08",
      timestamp: "2025-09-23 16:20",
      alarmTriggered: false,
      createdAt: "2025-09-23 16:20",
      updatedAt: "2025-09-23 16:21",
    },
    {
      id: 202,
      detection: true,
      objectname: "smoke",
      snapshot: "https://picsum.photos/400/200?random=7",
      zone: "Welding Station",
      camera: "CAM-07",
      timestamp: "2025-09-23 16:10",
      alarmTriggered: true,
      createdAt: "2025-09-23 16:10",
      updatedAt: "2025-09-23 16:12",
    },
  ];

  const recentFireViolations = backendFireData.map((item) => ({
    Voilation: `${
      item.objectname.charAt(0).toUpperCase() + item.objectname.slice(1)
    } detected`,
    zone: item.zone,
    time: item.createdAt,
    imageUrl: item.snapshot,
    cameraId: item.camera,
    alarmTriggered: item.alarmTriggered,
  }));
  console.log("RECENT VOILATION FIRE,SMOKE", recentFireViolations);
  const FireSmokeOilKpiData = [
    {
      title: "Fire Incidence",
      value: "267",
      icon: LocalFireDepartment, // 🔥 Fire
      tooltipMessage:
        "Total number of fire detections recorded across all monitored zones.",
    },
    {
      title: "Smoke Incidence",
      value: "324",
      icon: SmokeFree, // 💨 Smoke
      tooltipMessage:
        "Total number of smoke detections recorded across all monitored zones.",
    },
    {
      title: "Last Detection Time",
      value: "10:42 AM",
      icon: AccessTime, // ⏰ Time
      tooltipMessage:
        "The time when the last fire or smoke detection was recorded.",
    },
    {
      title: "Last Detection Zone",
      value: "Zone A",
      icon: LocationOn, // 📍 Zone / Location
      tooltipMessage:
        "The zone where the most recent fire or smoke detection occurred.",
    },
  ];

  const zoneViolationsData = [
    {
      zone: "Production Floor A",
      violations: 1,
      alarms: 1,
      icons: {
        violations: ViolationsIcon,
        alarms: AlarmIcon,
      },
    },
    {
      zone: "Welding Station",
      violations: 21,
      alarms: 2,
      icons: {
        violations: ViolationsIcon,
        alarms: AlarmIcon,
      },
    },
    {
      zone: "Chemical Storage",
      violations: 1,
      alarms: 0,
      icons: {
        violations: ViolationsIcon,
        alarms: AlarmIcon,
      },
    },
  ];

  const KpiCardLoading = false;

  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());
  const handleViewSingle = (row: RecentViolationData) => {
    console.log("view single row", row);
    setViewPopupData(row);
    setViewPopupOpen(true);
  };
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <LocalFireDepartmentIcon sx={{ fontSize: 28, color: "#3072b0" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Fire, Smoke, Oil and Gas Leak Detection
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards */}
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
              FireSmokeOilKpiData.map((kpi, index) => (
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
              violations={recentFireViolations}
              loading={false}
              tooltipMessage="Latest 20 detected fire & smoke violations with details."
            />
          </Grid>
          {/* PPE Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              violationsZone={zoneViolationsData}
              loading={false}
              tooltipMessage="Shows violations and alarms per zone"
            />
          </Grid>
        </Grid>
      </Paper>
      {/*  Fire, Smoke, Oil and Gas Leak Detection Report */}

      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
        columns={[
          { id: "Voilation", label: "Incident", minWidth: 200 },
          { id: "time", label: "Time", minWidth: 120 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "cameraId", label: "Cameras", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 120 },
        ]}
        data={recentFireViolations}
        filters={[
          {
            id: "Voilation",
            label: "Incident",
            type: "select",
            options: ["Fire detected", "Smoke detected", "Gas detected"],
          },
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Production Floor A",
              "Welding Station",
              "Chemical Storage",
              "Emergency Exit Area",
              "Conference Room B",
              "Loading Dock",
              "Parking Lot",
            ],
          },
          {
            id: "cameraId",
            label: "Cameras",
            type: "select",
            options: ["CAM-06", "CAM-07", "CAM-08"],
          },
          {
            id: "alarmTriggered",
            label: "Alarm Triggered",
            type: "select",
            options: ["true", "false"],
          },
          { id: "time", label: "Start Date", type: "date" },
          { id: "time", label: "End Date", type: "date" },
        ]}
        downloadFileName="detection-report"
        loading={false}
        onView={handleViewSingle}
      />
      {/* View Alert Popup */}
      {viewPopupData && (
        <ViewAlertPopup
          open={viewPopupOpen}
          handleClose={() => setViewPopupOpen(false)}
          title={viewPopupData.Voilation}
          location={viewPopupData.zone}
          time={viewPopupData.time}
          cameraId={viewPopupData.cameraId}
          imageUrl={viewPopupData.imageUrl}
          alarmTriggered={viewPopupData.alarmTriggered}
          onDownload={(imageUrl) => console.log("Download image:", imageUrl)}
        />
      )}
    </Box>
  );
};

export default FireSmokeOilLeakDetection;
