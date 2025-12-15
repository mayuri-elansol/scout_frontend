"use client";
import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import {
  NotificationsActive,
  CheckCircle,
  Schedule,
  ReportProblem,
  Whatshot,
} from "@mui/icons-material";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";

const FallDetection: React.FC = () => {
  interface RecentViolationData {
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
    useState<RecentViolationData | null>(null);

  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());

  const fallKpiData = [
    {
      title: "Total Fall Incidents",
      value: "9",
      icon: ReportProblem,
      tooltipMessage:
        "Total number of fall, laydown, or sleeping incidents detected across all monitored zones.",
    },
    {
      title: "Active Alarms",
      value: "6",
      icon: NotificationsActive,
      tooltipMessage:
        "Number of incidents where alarms were triggered due to detected falls or unsafe conditions.",
    },
    {
      title: "Incident-Free Zones",
      value: "3 / 5",
      icon: CheckCircle,
      tooltipMessage:
        "Number of zones without any fall or laydown incidents out of the total monitored zones.",
    },
    {
      title: "Last Detection Time",
      value: "10:42 AM",
      icon: Schedule,
      tooltipMessage:
        "The time when the most recent fall, laydown, or sleeping incident was detected.",
    },
    {
      title: "Most Incident-Prone Zone",
      value: "Zone B",
      icon: Whatshot,
      tooltipMessage:
        "The zone with the highest number of fall, laydown, or sleeping incidents recorded.",
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      borderColor: "#f44336",
      iconBg: "rgba(244, 67, 54, 0.1)",
    },
  ];

  const backendLaydownData = [
    {
      id: 401,
      snapshot: "/img/fall1.jpg",
      zone: "Production Floor A",
      camera: "CAM-11",
      createdAt: "2025-09-23 18:05",
      updatedAt: "2025-09-23 18:06",
      alarmTriggered: true,
    },
    {
      id: 402,
      snapshot: "/img/fall2.jpg",
      zone: "Warehouse",
      camera: "CAM-12",
      createdAt: "2025-09-23 18:12",
      updatedAt: "2025-09-23 18:13",
      alarmTriggered: false,
    },
    {
      id: 403,
      snapshot: "/img/fall3.jpg",
      zone: "Maintenance Area",
      camera: "CAM-13",
      createdAt: "2025-09-23 18:18",
      updatedAt: "2025-09-23 18:19",
      alarmTriggered: true,
    },
    {
      id: 404,
      snapshot: "/img/fall4.jpg",
      zone: "Production Floor A",
      camera: "CAM-11",
      createdAt: "2025-09-23 18:05",
      updatedAt: "2025-09-23 18:06",
      alarmTriggered: true,
    },
    {
      id: 405,
      snapshot: "/img/fall5.jpg",
      zone: "Warehouse",
      camera: "CAM-12",
      createdAt: "2025-09-23 18:12",
      updatedAt: "2025-09-23 18:13",
      alarmTriggered: false,
    },
    {
      id: 406,
      snapshot: "/img/fall4.jpg",
      zone: "Maintenance Area",
      camera: "CAM-13",
      createdAt: "2025-09-23 18:18",
      updatedAt: "2025-09-23 18:19",
      alarmTriggered: true,
    },
    {
      id: 403,
      snapshot: "/img/fall3.jpg",
      zone: "Maintenance Area",
      camera: "CAM-13",
      createdAt: "2025-09-23 18:18",
      updatedAt: "2025-09-23 18:19",
      alarmTriggered: true,
    },
    {
      id: 404,
      snapshot: "/img/fall1.jpg",
      zone: "Production Floor A",
      camera: "CAM-11",
      createdAt: "2025-09-23 18:05",
      updatedAt: "2025-09-23 18:06",
      alarmTriggered: true,
    },
    {
      id: 405,
      snapshot: "/img/fall2.jpg",
      zone: "Warehouse",
      camera: "CAM-12",
      createdAt: "2025-09-23 18:12",
      updatedAt: "2025-09-23 18:13",
      alarmTriggered: false,
    },
  ];

  // Map backend data to recentViolations format
  const recentLaydownViolations = backendLaydownData.map((item) => {
    return {
      voilation: "Fall / Laydown detected",
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.camera,
      alarmTriggered: item.alarmTriggered,
    };
  });

  console.log("laydown recent voilation", recentLaydownViolations);

  const zoneViolationsData = [
    {
      zone: "Production Floor A",
      violations: 3,
    },
    {
      zone: "Warehouse",
      violations: 3,
    },
    {
      zone: "Maintenance Area",
      violations: 3,
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
  };

  const handleReset = () => {
    console.log("reset button clickedd");
  };

  const handleExport = (format: "csv" | "pdf") => {
    console.log("Export requested clikcedd:", format);
  };

  const handleViewSingle = (row: RecentViolationData) => {
    console.log("view single row", row);
    setViewPopupData(row);
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
              fallKpiData.map((kpi, index) => (
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
              label="Recent Violations"
              violations={recentLaydownViolations}
              loading={false}
              tooltipMessage="Latest 20 detected laydown/sleeping/falldown violations with details."
            />
          </Grid>
          {/* Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              violationsZone={zoneViolationsData}
              loading={false}
              tooltipMessage="Shows laydown/sleeping/falldown violations per zone"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Report */}
      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
        columns={[
          { id: "voilation", label: "Violation", minWidth: 200 },
          { id: "time", label: "Time", minWidth: 120 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "cameraId", label: "Cameras", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 120 },
        ]}
        data={recentLaydownViolations}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(
              new Set(recentLaydownViolations.map((item) => item.zone))
            ),
          },
          {
            id: "cameraId",
            label: "Cameras",
            type: "select",
            options: Array.from(
              new Set(recentLaydownViolations.map((item) => item.cameraId))
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
        onView={handleViewSingle}
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        downloadFileName="ppe-violations-report"
        loading={false}
      />
      {/* View Alert Popup */}
      {viewPopupData && (
        <ViewAlertPopup
          open={viewPopupOpen}
          handleClose={() => setViewPopupOpen(false)}
          details={viewPopupData}
          imageKey="imageUrl"
          onDownload={(url) => console.log("Download:", url)}
        />
      )}
    </Box>
  );
};

export default FallDetection;
