"use client";

import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Paper, Typography } from "@mui/material";

import { People, Login, Logout } from "@mui/icons-material";

import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";

import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";

const PeopleCount: React.FC = () => {
  interface PeopleCountViolation {
    Voilation: string;
    enteredCount: number;
    exitCount: number;
    time: string;
    zone: string;
    cameraId: string;
    alarmTriggered: boolean;
    imageUrl: string;

    [key: string]: string | number | boolean;
  }
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] =
    useState<PeopleCountViolation | null>(null);
  const backendData = [
    {
      id: 201,
      enteredCount: 15,
      exitCount: 10,
      zone: "Production Floor A",
      snapshot: "https://picsum.photos/400/200?random=11",
      cameraid: "CAM-11",
      alarmTriggered: true, // You can set this true if threshold exceeded
      createdAt: "2025-09-30 09:42",
      updatedAt: "2025-09-30 09:45",
    },
    {
      id: 202,
      enteredCount: 8,
      exitCount: 5,
      zone: "Welding Station",
      snapshot: "https://picsum.photos/400/200?random=12",
      cameraid: "CAM-12",
      alarmTriggered: false,
      createdAt: "2025-09-30 09:28",
      updatedAt: "2025-09-30 09:30",
    },
    {
      id: 203,
      enteredCount: 12,
      exitCount: 11,
      zone: "Chemical Storage",
      snapshot: "https://picsum.photos/400/200?random=13",
      cameraid: "CAM-13",
      alarmTriggered: false,
      createdAt: "2025-09-30 09:15",
      updatedAt: "2025-09-30 09:20",
    },
    {
      id: 204,
      enteredCount: 20,
      exitCount: 18,
      zone: "Assembly Line B",
      snapshot: "https://picsum.photos/400/200?random=14",
      cameraid: "CAM-14",
      alarmTriggered: true,
      createdAt: "2025-09-30 08:58",
      updatedAt: "2025-09-30 09:05",
    },
    {
      id: 205,
      enteredCount: 5,
      exitCount: 2,
      zone: "Maintenance Area",
      snapshot: "https://picsum.photos/400/200?random=15",
      cameraid: "CAM-15",
      alarmTriggered: true,
      createdAt: "2025-09-30 08:32",
      updatedAt: "2025-09-30 08:40",
    },
  ];

  const zonePeopleCountData = [
    {
      zone: "Production Floor A",
      enteredCount: 150,
      exitCount: 120,
      icons: {
        enteredCount: PeopleIcon,
        exitCount: ExitToAppIcon,
      },
    },
    {
      zone: "Welding Station",
      enteredCount: 80,
      exitCount: 65,
      icons: {
        enteredCount: PeopleIcon,
        exitCount: ExitToAppIcon,
      },
    },
    {
      zone: "Chemical Storage",
      enteredCount: 60,
      exitCount: 50,
      icons: {
        enteredCount: PeopleIcon,
        exitCount: ExitToAppIcon,
      },
    },
    {
      zone: "Assembly Line B",
      enteredCount: 200,
      exitCount: 180,
      icons: {
        enteredCount: PeopleIcon,
        exitCount: ExitToAppIcon,
      },
    },
    {
      zone: "Maintenance Area",
      enteredCount: 40,
      exitCount: 30,
      icons: {
        enteredCount: PeopleIcon,
        exitCount: ExitToAppIcon,
      },
    },
  ];

  const recentViolations = backendData.map((item) => {
    return {
      Voilation: `People Count (Entry/Exit)`,
      enteredCount: item.enteredCount,
      exitCount: item.exitCount,
      time: item.createdAt,
      zone: item.zone,
      cameraId: item.cameraid,
      alarmTriggered: item.alarmTriggered,
      imageUrl: item.snapshot,
    };
  });

  const peopleCountKpiData = [
    {
      title: "People Inside",
      value: "267", // Current count of people inside
      icon: People, // 👥 Crowd of people

      tooltipMessage: "Current number of people present inside the area.",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "rgba(33, 150, 243, 0.1)",
    },
    {
      title: "Entry Count",
      value: "512", // Total entries today
      icon: Login, // ⬅️ Entry

      tooltipMessage: "Total number of people who entered today.",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "rgba(33, 150, 243, 0.1)",
    },
    {
      title: "Exit Count",
      value: "245", // Total exits today
      icon: Logout, // ➡️ Exit
      tooltipMessage: "Total number of people who exited today.",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "rgba(33, 150, 243, 0.1)",
    },
  ];
  const KpiCardLoading = false;
  const handleViewSingle = (row: PeopleCountViolation) => {
    console.log("view single row", row);
    setViewPopupData(row);
    setViewPopupOpen(true);
  };
  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <FollowTheSignsIcon sx={{ fontSize: 28, color: "#3072b0" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            People Count in Factory Premises based on Entry Exit Counting
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
              peopleCountKpiData.map((kpi, index) => (
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
              tooltipMessage="Latest 20 People Count in Factory Premises based on Entry Exit person Count with details."
            />
          </Grid>
          {/* PPE Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              violationsZone={zonePeopleCountData}
              loading={false}
              tooltipMessage="Shows person entry and exit count per zone"
            />
          </Grid>
        </Grid>
      </Paper>
      {/* People Count Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "Voilation", label: "Violation", minWidth: 200 },
          { id: "enteredCount", label: "Entered Count", minWidth: 140 },
          { id: "exitCount", label: "Exit Count", minWidth: 120 },
          { id: "time", label: "Time", minWidth: 120 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "cameraId", label: "Cameras", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
        ]}
        data={recentViolations}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(new Set(recentViolations.map((v) => v.zone))),
          },
          {
            id: "cameraId",
            label: "Cameras",
            type: "select",
            options: Array.from(
              new Set(recentViolations.map((v) => v.cameraId))
            ),
          },
          {
            id: "alarmTriggered",
            label: "Alarm Triggered",
            type: "select",
            options: ["True", "False"],
          },
          {
            id: "time",
            label: "Start Date",
            type: "date",
          },
          {
            id: "time",
            label: "End Date",
            type: "date",
          },
        ]}
        downloadFileName="people-count-report"
        loading={false}
        onView={handleViewSingle}
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
      />
      {/* View Alert Popup */}

      {viewPopupData && (
        <ViewAlertPopup
          open={viewPopupOpen}
          handleClose={() => setViewPopupOpen(false)}
          details={viewPopupData}
          imageKey="imageUrl" // important: matches PeopleCountViolation.imageUrl
          onDownload={(imageUrl) => console.log("Download image:", imageUrl)}
        />
      )}
    </Box>
  );
};

export default PeopleCount;
