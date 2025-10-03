"use client";

import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  Shield,
  Visibility,
  LocationOn,
  AccessTime,
  Checkroom,
} from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import Appbar from "@/app/components/organisms/AppBar/AppBar";

import { FilterParams } from "./PPEDetection.types";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViolationsIcon from "@mui/icons-material/Warning";
import AlarmIcon from "@mui/icons-material/NotificationImportant";

const PPEDetection: React.FC = () => {
  interface PPEViolation {
    Voilation: string;
    zone: string;
    time: string;
    imageUrl: string;
    cameraId: string;
    alarmTriggered: boolean;
  }

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<PPEViolation | null>(null);

  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());

  const ppeKpiData = [
    {
      title: "Total Violations",
      value: "87",
      icon: Shield,
      tooltipMessage:
        "Total number of PPE violations detected across all monitored zones.",
    },
    {
      title: "Current Unsafe Zone",
      value: "2",
      icon: LocationOn,
      tooltipMessage:
        "Number of zones where unsafe PPE compliance was detected.",
    },
    {
      title: "Last Detection Time",
      value: "10:35 AM",
      icon: AccessTime,
      tooltipMessage: "The time when the last PPE violation was detected.",
    },
    {
      title: "Missing Helmet",
      value: "12",
      icon: EngineeringIcon,
      tooltipMessage:
        "Number of detected instances where workers were missing helmets.",
    },
    {
      title: "Missing Vest",
      value: "12",
      icon: Checkroom,
      tooltipMessage:
        "Number of detected instances where workers were missing safety vests.",
    },
    {
      title: "Missing Glasses",
      value: "9",
      icon: Visibility,
      tooltipMessage:
        "Number of detected instances where workers were missing safety glasses.",
    },
  ];

  const backendData = [
    {
      id: 101,
      helmet: true,
      vest: true,
      glasses: false,
      zone: "Production Floor A",
      snapshot: "https://picsum.photos/400/200?random=1",
      cameraid: "CAM-01",
      alarmTriggered: true,
      createdAt: "2025-09-23 15:42",
    },
    {
      id: 102,
      helmet: true,
      vest: true,
      glasses: false,
      zone: "Welding Station",
      snapshot: "https://picsum.photos/400/200?random=2",
      cameraid: "CAM-02",
      alarmTriggered: true,
      createdAt: "2025-09-23 15:28",
    },
    {
      id: 103,
      helmet: true,
      vest: true,
      glasses: false,
      zone: "Chemical Storage",
      snapshot: "https://picsum.photos/400/200?random=3",
      cameraid: "CAM-03",
      alarmTriggered: true,
      createdAt: "2025-09-23 15:15",
    },
    {
      id: 104,
      helmet: true,
      vest: true,
      glasses: false,
      zone: "Assembly Line B",
      snapshot: "https://picsum.photos/400/200?random=4",
      cameraid: "CAM-04",
      alarmTriggered: false,
      createdAt: "2025-09-23 14:58",
    },
    {
      id: 105,
      helmet: false,
      vest: false,
      glasses: true,
      zone: "Maintenance Area",
      snapshot: "https://picsum.photos/400/200?random=5",
      cameraid: "CAM-05",
      alarmTriggered: true,
      createdAt: "2025-09-23 14:32",
    },
  ];

  // Map backend data to recentViolations format
  const recentViolations = backendData.map((item) => {
    const titleParts = [];

    if (item.helmet === false) titleParts.push("Hard hat missing");
    if (item.vest === false) titleParts.push("Safety vest not worn");
    if (item.glasses === false) titleParts.push("Safety glasses missing");

    return {
      Voilation: titleParts.join(", ") || "No violation",
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.cameraid,
      alarmTriggered: item.alarmTriggered,
    };
  });

  console.log("RELCENTVOLATION DATAA", recentViolations);

  const zoneViolationsData = [
    {
      zone: "Production Floor",
      violations: 5,
      alarms: 2,
      icons: {
        violations: ViolationsIcon,
        alarms: AlarmIcon,
      },
    },
    {
      zone: "Warehouse",
      violations: 3,
      alarms: 1,
      icons: {
        violations: ViolationsIcon,
        alarms: AlarmIcon,
      },
    },
    {
      zone: "Parking Area",
      violations: 4,
      alarms: 0,
      icons: {
        violations: ViolationsIcon,
        alarms: AlarmIcon,
      },
    },
    {
      zone: "Main Entrance",
      violations: 2,
      alarms: 1,
      icons: {
        violations: ViolationsIcon,
        alarms: AlarmIcon,
      },
    },
    {
      zone: "Assembly Line",
      violations: 6,
      alarms: 3,
      icons: {
        violations: ViolationsIcon,
        alarms: AlarmIcon,
      },
    },
  ];

  const handleSubmitFilter = async (filters: FilterParams) => {
    console.log("Selected Filters:", filters);
  };

  const handleReset = () => {
    console.log("reset button clickedd");
  };

  const handleExport = (format: "csv" | "pdf") => {
    console.log("Export requested clikcedd:", format);
  };
  const handleDownloadSingle = () => {
    console.log("download single row");
  };
  const handleViewSingle = (row: PPEViolation) => {
    console.log("view single row", row);
    setViewPopupData(row);
    setViewPopupOpen(true);
  };
  const KpiCardLoading = false;
  return (
    <Box>
      {/* Page Header */}
      {/* <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
      
          <Appbar
            title={
              <Box sx={{ display: "flex", alignItems: "left", gap: 1 }}>
                <EngineeringIcon sx={{ fontSize: 30, color: "#1976d2" }} />
                <span>Personal Protective Equipment (PPE) Detection</span>
              </Box>
            }
          />
        </Box>
      </Box> */}

      {/* KPI Cards */}
      <Paper sx={{ p: 3, mb: 0, backgroundColor: "#ffffff", borderRadius: 2 }}>
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
                key={index + 1}
              >
                <KpiCardSkeleton />
              </Grid>
            ))
            : // Show actual KPI cards
            ppeKpiData.map((kpi, index) => (
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
              tooltipMessage="Latest 20 detected PPE violations with details."
              label="Recent Violations"
              violations={recentViolations}
              loading={false}
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
      {/* PPE Violations Report */}
      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
        columns={[
          { id: "Voilation", label: "Violation", minWidth: 200 },
          { id: "time", label: "Time", minWidth: 120 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "cameraId", label: "Cameras", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 120 },
        ]}
        data={recentViolations}
        filters={[
          {
            id: "Voilation",
            label: "Violation",
            type: "select",

            options: [
              "Hard hat missing",
              "Safety vest not worn",
              "Safety glasses missing",
            ],
          },

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
          { id: "time", label: "Start Date", type: "date" },
          { id: "time", label: "End Date", type: "date" },
        ]}
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        onDownload={handleDownloadSingle}
        onView={handleViewSingle}
        downloadFileName="ppe-violations-report"
        loading={false}
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

export default PPEDetection;
