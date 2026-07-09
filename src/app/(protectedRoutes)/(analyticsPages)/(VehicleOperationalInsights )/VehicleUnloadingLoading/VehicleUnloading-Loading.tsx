"use client";
import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { LocalShipping, Timeline } from "@mui/icons-material";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getOneHourBefore } from "../../(safetyAndCompliance)/PPEKitDetection/PPEKitDetection";

const VehicleUnloadingLoading: React.FC = () => {
  interface VehicleLoadingEvent {
    incident: string;
    trackId: string;
    zone: string;
    time: string;
    imageUrl: string;
    cameraId: string;
    alarmTriggered: boolean;

    [key: string]: string | number | boolean;
  }
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] =
    useState<VehicleLoadingEvent | null>(null);
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());
  const VehicleUnloadingLoadingKpiData = [
    {
      title: "Total Loading/Unloading Event",
      value: "87",
      icon: LocalShipping,
      tooltipMessage: "Total loading/unloading events recorded.",
    },
    {
      title: "Average Loading/Unloading Time",
      value: "1.56 hrs",
      icon: AccessTimeIcon,
      tooltipMessage:
        "Shows the Average Time for Vehical Loading/Unloading event",
    },

    {
      title: "Busiest Zone",
      value: "Zone A",
      icon: Timeline,
      tooltipMessage: "Zone with the highest operation activity.",
    },
  ];
  const backendData = [
    {
      id: 301,
      trackId: "TRK-001",
      loadingState: "Start",
      snapshot: "https://picsum.photos/400/200?random=21",
      zone: "Loading Bay A",
      camera: "CAM-21",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-09 08:20",
    },
    {
      id: 302,
      trackId: "TRK-002",
      loadingState: "Stop",
      snapshot: "https://picsum.photos/400/200?random=22",
      zone: "Loading Bay B",
      camera: "CAM-22",
      alarmTriggered: false,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-09 09:35",
    },
    {
      id: 303,
      trackId: "TRK-003",
      loadingState: "Start",
      snapshot: "https://picsum.photos/400/200?random=23",
      zone: "Unloading Bay A",
      camera: "CAM-23",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-09 10:05",
    },
    {
      id: 304,
      trackId: "TRK-004",
      loadingState: "Stop",
      snapshot: "https://picsum.photos/400/200?random=24",
      zone: "Unloading Bay B",
      camera: "CAM-24",
      alarmTriggered: false,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-09 11:05",
    },
    {
      id: 305,
      trackId: "TRK-005",
      loadingState: "Start",
      snapshot: "https://picsum.photos/400/200?random=25",
      zone: "Loading Bay C",
      camera: "CAM-25",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-09 12:20",
    },
  ];

  const recentLoadingEvents = backendData.map((item) => {
    const incident =
      item.loadingState === "Start" ? "Loading started" : "Loading stopped";

    return {
      incident,
      trackId: item.trackId,
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.camera,
      alarmTriggered: item.alarmTriggered,
    };
  });

  const zoneLoadingData = [
    {
      zone: "Loading Bay A",
      incident: 12,
      subViolations: [
        { label: "Start", value: 7, icon: PlayCircleIcon },
        { label: "Stop", value: 5, icon: StopCircleIcon },
      ],
    },
    {
      zone: "Loading Bay B",
      incident: 9,
      subViolations: [
        { label: "Start", value: 4, icon: PlayCircleIcon },
        { label: "Stop", value: 5, icon: StopCircleIcon },
      ],
    },
    {
      zone: "Unloading Bay A",
      incident: 15,
      subViolations: [
        { label: "Start", value: 9, icon: PlayCircleIcon },
        { label: "Stop", value: 6, icon: StopCircleIcon },
      ],
    },
    {
      zone: "Unloading Bay B",
      incident: 8,
      subViolations: [
        { label: "Start", value: 4, icon: PlayCircleIcon },
        { label: "Stop", value: 4, icon: StopCircleIcon },
      ],
    },
    {
      zone: "Loading Bay C",
      incident: 10,
      subViolations: [
        { label: "Start", value: 6, icon: PlayCircleIcon },
        { label: "Stop", value: 4, icon: StopCircleIcon },
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
    console.log("view single row", row);
    setViewPopupData(row as VehicleLoadingEvent);
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
            <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: 18 }}>
              <Box component="span" sx={{ mr: 2 }}>
                📊 Overview
              </Box>
            </Typography>
          </Box>

          <TimeFilter onRangeChange={function (range: { start: string; end: string; }): void {
            throw new Error("Function not implemented.");
          } } />
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
              VehicleUnloadingLoadingKpiData.map((kpi, index) => (
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
              label="Recent Incident"
              violations={recentLoadingEvents}
              loading={false}
              tooltipMessage="Latest 20 Vehicle unloading and loading events with details."
            />
          </Grid>
          {/*  Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              label="Zone Incident"
              violationsZone={zoneLoadingData}
              loading={false}
              tooltipMessage="Shows vehicle unloading and loading events per zone"
            />
          </Grid>
        </Grid>
      </Paper>
      {/*  Violations Report */}
      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed vehicle loading/unloading events report with filter, reset, and export options."
        columns={[
          { id: "incident", label: "incident" },
          { id: "time", label: "Time" },
          { id: "zone", label: "Zone" },
          { id: "cameraId", label: "Camera" },
          { id: "alarmTriggered", label: "Alarm Triggered" },
        ]}
        data={recentLoadingEvents}
        filters={[
          {
            id: "incident",
            label: "Incident",
            type: "select",
            options: Array.from(
              new Set(recentLoadingEvents.map((v) => v.incident))
            ),
          },
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(
              new Set(recentLoadingEvents.map((v) => v.zone))
            ),
          },
          {
            id: "cameraId",
            label: "Camera",
            type: "select",
            options: Array.from(
              new Set(recentLoadingEvents.map((v) => v.cameraId))
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
        downloadFileName="vehicle-loading-unloading-report"
        loading={false} totalCount={0} page={0} rowsPerPage={0}      />
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

export default VehicleUnloadingLoading;
