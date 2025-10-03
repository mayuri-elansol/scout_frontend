"use client";
import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Block, CheckCircle, LocationOn } from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import ViolationsIcon from "@mui/icons-material/Warning";
import AlarmIcon from "@mui/icons-material/NotificationImportant";
const EmergencyExitBlockage: React.FC = () => {
  interface ReportData extends Record<string, string | number | boolean> {
    Voilation: string;
    zone: string;
    time: string;
    cameraId: string;
    imageUrl: string;
    alarmTriggered: boolean;
  }

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<ReportData | null>(null);
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());

  const ExitKpiData = [
    {
      title: "Blocked Emergency Exit",
      value: "87", // Count of currently blocked exits
      tooltipMessage:
        "Shows the total number of emergency exits that are currently blocked.",
      icon: Block,
    },
    {
      title: "Clear Emergency Exit Routes",
      value: "12", // Count of safe/clear exits
      tooltipMessage:
        "Shows the total number of emergency exits that are currently clear and safe for use.",
      icon: CheckCircle, // ✅ Safe / clear
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      borderColor: "#4caf50",
      iconBg: "rgba(76, 175, 80, 0.1)",
    },
    {
      title: "Affected Zones (Last 3)",
      value: "Zone A, Zone B, Zone C", // Last 3 affected zones
      tooltipMessage:
        "Displays the last three zones where blocked emergency exits were detected.",
      icon: LocationOn, // 📍 Zone/location indicator
    },
  ];

  const backendExitBlockageData = [
    {
      id: 501,
      blockage: true,
      alarmTriggered: true,
      snapshot: "https://picsum.photos/400/200?random=14",
      zone: "Emergency Exit A",
      camera: "CAM-14",
      createdAt: "2025-09-23 19:05",
      updatedAt: "2025-09-23 19:06",
    },

    {
      id: 503,
      blockage: true,
      alarmTriggered: true,
      snapshot: "https://picsum.photos/400/200?random=16",
      zone: "Assembly Line Exit",
      camera: "CAM-16",
      createdAt: "2025-09-23 19:20",
      updatedAt: "2025-09-23 19:21",
    },
    {
      id: 504,
      blockage: true,
      alarmTriggered: true,
      snapshot: "https://picsum.photos/400/200?random=14",
      zone: "Emergency Exit A",
      camera: "CAM-14",
      createdAt: "2025-09-23 19:05",
      updatedAt: "2025-09-23 19:06",
    },

    {
      id: 505,
      blockage: true,
      alarmTriggered: true,
      snapshot: "https://picsum.photos/400/200?random=16",
      zone: "Assembly Line Exit",
      camera: "CAM-16",
      createdAt: "2025-09-23 19:20",
      updatedAt: "2025-09-23 19:21",
    },
  ];

  // Map backend data to recentViolations format
  const recentExitBlockageViolations: ReportData[] =
    backendExitBlockageData.map((item) => {
      const titleParts = [];

      if (item.blockage === true) titleParts.push("Emergency exit blocked");

      return {
        Voilation: titleParts.join(", ") || "No violation",
        zone: item.zone,
        time: item.createdAt,
        imageUrl: item.snapshot,
        cameraId: item.camera,
        alarmTriggered: item.alarmTriggered,
      };
    });

  console.log(
    "emergency exit bolockage voilation",
    recentExitBlockageViolations
  );

  const zoneViolationsData = [
    {
      zone: "Emergency Exit A",
      violations: 2,
      alarms: 2,
      icons: {
        violations: ViolationsIcon,
        alarms: AlarmIcon,
      },
    },
    {
      zone: "Assembly Line Exit",
      violations: 2,
      alarms: 1,
      icons: {
        violations: ViolationsIcon,
        alarms: AlarmIcon,
      },
    },
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
  const handleViewSingle = (row: ReportData) => {
    console.log("view single row", row);
    setViewPopupData(row);
    setViewPopupOpen(true);
  };
  const KpiCardLoading = false;
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <DirectionsRunIcon sx={{ fontSize: 28, color: "#3072b0" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Emergency Exit Blockage Detection
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
              skeletonKeys.map((key) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={key}>
                  <KpiCardSkeleton />
                </Grid>
              ))
            : // Show actual KPI cards
              ExitKpiData.map((kpi) => (
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
              violations={recentExitBlockageViolations}
              loading={false}
              tooltipMessage="Latest 20 detected emergency exit blockage with details."
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
      {/* </Box> */}
      {/* PPE Violations Report */}
      <ReportTable<ReportData>
        title="Detailed Report"
        columns={[
          { id: "Voilation", label: "Violation", minWidth: 200 },
          { id: "time", label: "Time", minWidth: 120 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "cameraId", label: "Cameras", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 120 },
        ]}
        data={recentExitBlockageViolations}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Main Entrance",
              "Loading Dock",
              "Assembly Area",
              "Parking Lot",
            ],
          },
          {
            id: "cameraId",
            label: "Cameras",
            type: "select",
            options: Array.from(
              new Set(recentExitBlockageViolations.map((item) => item.cameraId))
            ),
          },
          {
            id: "alarmTriggered",
            label: "Alarm Triggered",
            type: "select",
            options: ["True", "False"],
          },
          { id: "startDate", label: "Start Date", type: "date" },
          { id: "endDate", label: "End Date", type: "date" },
        ]}
        downloadFileName="emergency-exit-blockage-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        loading={false}
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

export default EmergencyExitBlockage;
