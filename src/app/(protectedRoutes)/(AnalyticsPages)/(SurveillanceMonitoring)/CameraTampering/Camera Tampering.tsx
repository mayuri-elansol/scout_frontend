"use client";
import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Warning, Room } from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
const CameraTampering: React.FC = () => {
  interface CameraTamperingViolation {
    voilation: string;
    zone: string;
    time: string;
    imageUrl: string;
    cameraId: string;
    alarmTriggered: boolean;
    [key: string]: string | number | boolean;
  }

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] =
    useState<CameraTamperingViolation | null>(null);

  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());
  const CameraTamperingKpiData = [
    {
      title: "Total Offline Cameras",
      value: "42",
      tooltipMessage:
        "Shows the total number of offline cameras currently monitored in the system.",
      icon: VideocamOffIcon,
    },
    {
      title: "Total Tampred Cameras",
      value: "5",
      tooltipMessage: "The total number of tampered detected cameras .",
      icon: Warning,
    },
    {
      title: "Offline Camera Zone",
      value: "Zone A",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "rgba(33, 150, 243, 0.1)",
      icon: Room,
      tooltipMessage:
        "The  zone where the most recent offline cameras occurred.",
    },
    {
      title: "Tampred Camera Zone",
      value: "Zone B",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "rgba(33, 150, 243, 0.1)",
      icon: Room,
      tooltipMessage:
        "The  zone where the most recent tampred cameras occurred.",
    },
  ];

  const backendData = [
    {
      id: 201,
      tamperingType: "Lens Covered",
      zone: "Production Floor A",
      snapshot: "https://picsum.photos/400/200?random=11",
      cameraid: "CAM-T01",
      alarmTriggered: true,
      createdAt: "2025-10-08 14:12",
    },
    {
      id: 202,
      tamperingType: "Blur Vision",
      zone: "Welding Station",
      snapshot: "https://picsum.photos/400/200?random=12",
      cameraid: "CAM-T02",
      alarmTriggered: true,
      createdAt: "2025-10-08 13:58",
    },
    {
      id: 203,
      tamperingType: "Disconnected",
      zone: "Chemical Storage",
      snapshot: "https://picsum.photos/400/200?random=13",
      cameraid: "CAM-T03",
      alarmTriggered: true,
      createdAt: "2025-10-08 13:45",
    },
    {
      id: 204,
      tamperingType: "Offline",
      zone: "Assembly Line B",
      snapshot: "https://picsum.photos/400/200?random=14",
      cameraid: "CAM-T04",
      alarmTriggered: false,
      createdAt: "2025-10-08 13:30",
    },
    {
      id: 205,
      tamperingType: "Lens Obstructed",
      zone: "Maintenance Area",
      snapshot: "https://picsum.photos/400/200?random=15",
      cameraid: "CAM-T05",
      alarmTriggered: true,
      createdAt: "2025-10-08 13:15",
    },
  ];

  const recentTamperingEvents = backendData.map((item) => {
    return {
      voilation: item.tamperingType ?? "No tampering",
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.cameraid,
      alarmTriggered: item.alarmTriggered,
    };
  });

  console.log("RECENT TAMPERING DATA", recentTamperingEvents);

  const zoneTamperingData = [
    {
      zone: "Production Floor A",
      violations: 7,
      subViolations: [
        { label: "Lens Covered", value: 3, icon: VisibilityOffIcon },
        { label: "Blur Vision", value: 2, icon: VisibilityOffIcon },
        { label: "Disconnected", value: 2, icon: Warning },
      ],
    },
    {
      zone: "Welding Station",
      violations: 5,
      subViolations: [
        { label: "Blur Vision", value: 3, icon: VisibilityOffIcon },
        { label: "Lens Covered", value: 2, icon: VisibilityOffIcon },
      ],
    },
    {
      zone: "Chemical Storage",
      violations: 4,
      subViolations: [
        { label: "Disconnected", value: 2, icon: Warning },
        { label: "Offline", value: 2, icon: Warning },
      ],
    },
    {
      zone: "Assembly Line B",
      violations: 6,
      subViolations: [
        { label: "Offline", value: 4, icon: Warning },
        { label: "Lens Obstructed", value: 2, icon: VisibilityOffIcon },
      ],
    },
    {
      zone: "Maintenance Area",
      violations: 8,
      subViolations: [
        { label: "Lens Covered", value: 3, icon: VisibilityOffIcon },
        { label: "Lens Obstructed", value: 3, icon: VisibilityOffIcon },
        { label: "Offline", value: 2, icon: Warning },
      ],
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
  const handleDownloadSingle = () => {
    console.log("download single row");
  };
  const handleViewSingle = (row: Record<string, string | number | boolean>) => {
    const violation = row as CameraTamperingViolation;
    setViewPopupData(violation);
    setViewPopupOpen(true);
  };
  const KpiCardLoading = false;
  return (
    <Box>
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

          <TimeFilter onRangeChange={() => console.log("on range changed")} />
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
              CameraTamperingKpiData.map((kpi, index) => (
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
              tooltipMessage="Latest 20 detected camera temparing event with details."
              label="Recent Violations"
              violations={recentTamperingEvents}
              loading={false}
            />
          </Grid>
          {/*  Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              violationsZone={zoneTamperingData}
              loading={false}
              tooltipMessage="Shows offline,tampered cameras per zone"
            />
          </Grid>
        </Grid>
      </Paper>
      {/*  Violations Report */}
      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed camera tampering/offline detection report with filter, reset, and CSV/PDF download options."
        columns={[
          { id: "voilation", label: "Violation" },
          { id: "time", label: "Time" },
          { id: "zone", label: "Zone" },
          { id: "cameraId", label: "Cameras" },
          { id: "alarmTriggered", label: "Alarm Triggered" },
        ]}
        data={recentTamperingEvents}
        filters={[
          {
            id: "voilation",
            label: "Violation",
            type: "select",
            options: Array.from(
              new Set(recentTamperingEvents.map((v) => v.voilation))
            ),
          },
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(
              new Set(recentTamperingEvents.map((v) => v.zone))
            ),
          },
          {
            id: "cameraId",
            label: "Cameras",
            type: "select",
            options: Array.from(
              new Set(recentTamperingEvents.map((v) => v.cameraId))
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
        downloadFileName="camera-tampering-report"
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

export default CameraTampering;
