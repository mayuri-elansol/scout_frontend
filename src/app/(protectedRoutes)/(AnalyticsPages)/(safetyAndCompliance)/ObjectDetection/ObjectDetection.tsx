"use client";

import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  DirectionsCar,
  Block,
  CheckCircle,
  LocationOn,
} from "@mui/icons-material";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";

import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";

import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import ForkliftIcon from "@mui/icons-material/Forklift";
import { getOneHourBefore } from "@/utils/getOneHrBefore";
const ObjectDetection: React.FC = () => {
  interface ForkliftDetectionEvent {
    voilation: string;
    objectName?: string;
    imageUrl: string;
    zone: string;
    cameraId: string;
    time: string;

    alarmTriggered: boolean;
    [key: string]: string | number | boolean | undefined;
  }
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] =
    useState<ForkliftDetectionEvent | null>(null);
  const ObjectDetectionKpiData = [
    {
      title: "Blocked Walkways",
      value: "8",
      tooltipMessage:
        "Shows the total number of walkways that are currently blocked.",
      icon: Block,
    },
    {
      title: "Clear Walkways",
      value: "12",
      tooltipMessage:
        "Shows the total number of walkways that are currently clear and safe for use.",
      icon: CheckCircle,
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      borderColor: "#4caf50",
      iconBg: "rgba(76, 175, 80, 0.1)",
    },
    {
      title: "Affected Zones (Last 3)",
      value: "Zone B, Zone A",
      tooltipMessage:
        "Displays the last three zones where blocked Walkways were detected.",
      icon: LocationOn,
    },
  ];

  const backendData = [
    {
      id: 201,
      detected: true,
      objectName: "Forklift",
      snapshot: "/img/v3.jpg",
      zone: "Zone B",
      camera: "CAM-101",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-08 09:20",
    },
    {
      id: 202,
      detected: true,
      objectName: "Vehicle",
      snapshot: "/img/v5.jpg",
      zone: "Zone A",
      camera: "CAM-102",
      alarmTriggered: false,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-08 09:32",
    },
    {
      id: 203,
      detected: true,
      objectName: "Forklift",
      snapshot: "/img/v3.jpg",
      zone: "Zone B",
      camera: "CAM-103",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-08 10:10",
    },
    {
      id: 204,
      detected: true,
      objectName: "Forklift",
      snapshot: "/img/v5.jpg",
      zone: "Zone A",
      camera: "CAM-104",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-08 10:30",
    },
    {
      id: 205,
      detected: true,
      objectName: "Forklift",
      snapshot: "/img/v5.jpg",
      zone: "Zone B",
      camera: "CAM-105",
      alarmTriggered: false,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-08 11:05",
    },
    {
      id: 203,
      detected: true,
      objectName: "Forklift",
      snapshot: "/img/v3.jpg",
      zone: "Zone A",
      camera: "CAM-103",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-08 10:10",
    },
    {
      id: 204,
      detected: true,
      objectName: "Vehicle",
      snapshot: "/img/v5.jpg",
      zone: "Zone B",
      camera: "CAM-104",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-08 10:30",
    },
    {
      id: 205,
      detected: true,
      objectName: "Forklift",
      snapshot: "/img/v1.jpg",
      zone: "Zone A",
      camera: "CAM-105",
      alarmTriggered: false,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-08 11:05",
    },
  ];
  const recentDetections = backendData.map((item) => {
    return {
      voilation: "Walkway Blocked ",
      objectName: item.objectName,
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.camera,
      alarmTriggered: item.alarmTriggered,
    };
  });

  const zoneViolationsData = [
    {
      zone: "Zone B",
      violations: 4,
      subViolations: [{ label: "Forklift", value: 4, icon: ForkliftIcon }],
    },
    {
      zone: "Zone A",
      violations: 4,
      subViolations: [
        { label: "Forklift", value: 3, icon: ForkliftIcon },
        { label: "Vehicle", value: 1, icon: DirectionsCar },
      ],
    },
  ];

  interface FilterParams {
    zone?: string;
    status?: string;
    priority?: string;
    minOccupancy?: string;
    maxOccupancy?: string;
    startDate?: string;
    endDate?: string;
  }

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
  const handleViewSingle = (row: ForkliftDetectionEvent) => {
    console.log("view single row", row);
    setViewPopupData(row);
    setViewPopupOpen(true);
  };
  const KpiCardLoading = false;
  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());
  return (
    <Box>
      {/* KPI Cards */}
      <Paper
        sx={{
          p: 2.2,
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
              ObjectDetectionKpiData.map((kpi, index) => (
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
          {/* Recent  Violations */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <RecentViolations
              tooltipMessage="Latest 20 Forklift / Vehicle detected in Walkways with details."
              label="Recent Violations"
              violations={recentDetections}
              loading={false}
            />
          </Grid>
          {/*  Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              violationsZone={zoneViolationsData}
              loading={false}
              tooltipMessage="Shows violations per zone"
            />
          </Grid>
        </Grid>
      </Paper>
      {/* Object detection Report */}
      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed detection events for forklifts/vehicles in walkways with filter, reset, and export options."
        columns={[
          { id: "voilation", label: "Voilation", minWidth: 150 },
          { id: "objectName", label: "Object Name", minWidth: 120 },
          { id: "time", label: " Time", minWidth: 150 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "cameraId", label: "Camera", minWidth: 120 },

          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 120 },
        ]}
        data={recentDetections} // The mapped backend data for this case
        filters={[
          {
            id: "objectName",
            label: "Object Name",
            type: "select",
            options: Array.from(
              new Set(recentDetections.map((v) => v.objectName)),
            ),
          },
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(new Set(recentDetections.map((v) => v.zone))),
          },
          {
            id: "cameraId",
            label: "Camera",
            type: "select",
            options: Array.from(
              new Set(recentDetections.map((v) => v.cameraId)),
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
        downloadFileName="forklift-vehicle-detection-report"
        loading={false}
      />

      {/* View Alert Popup */}

      <ViewAlertPopup
        open={viewPopupOpen}
        handleClose={() => setViewPopupOpen(false)}
        details={viewPopupData}
        imageKey="imageUrl"
        onDownload={(url) => console.log("Download:", url)}
      />
    </Box>
  );
};

export default ObjectDetection;
