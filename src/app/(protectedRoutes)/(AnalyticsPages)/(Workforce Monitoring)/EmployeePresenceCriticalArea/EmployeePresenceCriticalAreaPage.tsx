"use client";

import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Groups, LocationOn, AccessTime } from "@mui/icons-material";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import PeopleIcon from "@mui/icons-material/People";
import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
const EmployeePresence: React.FC = () => {
  interface EmployeePresenceViolation {
    Voilation: string;
    zone: string;
    time: string;
    imageUrl: string;
    cameraId: string;
    alarmTriggered: boolean;
  }

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] =
    useState<EmployeePresenceViolation | null>(null);
  const employeeKpiData = [
    {
      title: "Employees in Critical Area",
      value: "12", // Number of employees detected in critical areas
      icon: Groups, // 👥 Represents group of people
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      borderColor: "#4caf50",
      iconBg: "rgba(76, 175, 80, 0.1)",

      tooltipMessage:
        "Shows the number of employees detected in critical areas.",
    },
    {
      title: "Zone Violations",
      value: "3 (Zone A, Zone B, Zone C)", // Number of violations and zones
      icon: LocationOn, // 📍 Zone/location indicator
      tooltipMessage:
        "Displays the count and name of critical zones where employees entered .",
    },
    {
      title: "Last Incidence",
      value: "10:45 AM", // Time of last detected violation
      icon: AccessTime, // ⏰ Time
      tooltipMessage:
        "Most recent time employees were detected in critical zones.",
    },
  ];
  const backendEmployeePresenceData = [
    {
      id: 201,
      snapshot: "https://picsum.photos/400/200?random=11",
      zone: "Critical Zone A",
      camera: "CAM-11",
      createdAt: "2025-09-25 09:15",
      updatedAt: "2025-09-25 09:16",
      alarmTriggered: true,
    },
    {
      id: 202,
      snapshot: "https://picsum.photos/400/200?random=12",
      zone: "Critical Zone B",
      camera: "CAM-12",
      createdAt: "2025-09-25 09:25",
      updatedAt: "2025-09-25 09:26",
      alarmTriggered: true,
    },
    {
      id: 203,
      snapshot: "https://picsum.photos/400/200?random=13",
      zone: "Critical Zone C",
      camera: "CAM-13",
      createdAt: "2025-09-25 09:40",
      updatedAt: "2025-09-25 09:41",
      alarmTriggered: true,
    },
  ];

  const recentEmployeeViolations = backendEmployeePresenceData.map((item) => {
    return {
      Voilation: item.alarmTriggered
        ? "Employee presence detected"
        : "No violation",
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.camera,
      alarmTriggered: item.alarmTriggered,
    };
  });

  const zoneViolationsData = [
    {
      zone: "Critical Zone A",
      EmployeePresent: 10,
      icons: {
        EmployeePresent: PeopleIcon,
      },
    },
    {
      zone: "Critical Zone B",
      EmployeePresent: 5,
      icons: {
        EmployeePresent: PeopleIcon,
      },
    },
    {
      zone: "Critical Zone C",
      EmployeePresent: 3,
      icons: {
        EmployeePresent: PeopleIcon,
      },
    },
  ];
  const KpiCardLoading = false;

  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());

  const handleReset = () => {
    console.log("reset button clickedd");
  };

  const handleExport = (format: "csv" | "pdf") => {
    console.log("Export requested clikcedd:", format);
  };
  const handleDownloadSingle = () => {
    console.log("download single row");
  };
  const handleViewSingle = (row: EmployeePresenceViolation) => {
    console.log("view single row", row);
    setViewPopupData(row);
    setViewPopupOpen(true);
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <LockPersonIcon sx={{ fontSize: 28, color: "#3072b0" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Employee presence detection in critical areas
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
              violations={recentEmployeeViolations}
              loading={false}
              tooltipMessage="Latest 20  violations where employee entred in critical areas with details."
            />
          </Grid>
          {/* Critical Zones Status */}
          {/* item xs={12} lg={4} */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              violationsZone={zoneViolationsData}
              loading={false}
              tooltipMessage="Shows violations and alarms per zone"
            />
          </Grid>
        </Grid>
      </Paper>
      {/* Employee Presence Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "Voilation", label: "Violation", minWidth: 200 },
          { id: "time", label: "Time", minWidth: 140 },
          { id: "zone", label: "Zone", minWidth: 150 },

          { id: "cameraId", label: "Cameras", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
        ]}
        data={recentEmployeeViolations}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(
              new Set(recentEmployeeViolations.map((v) => v.zone))
            ),
          },
          {
            id: "cameraId",
            label: "Cameras",
            type: "select",
            options: Array.from(
              new Set(recentEmployeeViolations.map((v) => v.cameraId))
            ),
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
        downloadFileName="employee-presence-critical-report"
        loading={false}
        //   onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        onDownload={handleDownloadSingle}
        onView={handleViewSingle}
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
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

export default EmployeePresence;
