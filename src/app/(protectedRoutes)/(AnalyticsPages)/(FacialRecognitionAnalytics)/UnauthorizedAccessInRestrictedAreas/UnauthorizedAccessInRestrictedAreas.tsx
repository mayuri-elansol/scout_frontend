"use client";

import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import { Groups, LocationOn, AccessTime } from "@mui/icons-material";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
const UnauthorizedAccessInRestrictedAreas: React.FC = () => {
  interface UnauthorizedAccess {
    voilation: string;
    zone: string;
    time: string;
    imageUrl: string;
    cameraId: string;
    alarmTriggered: boolean;
    [key: string]: string | number | boolean;
  }
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<UnauthorizedAccess | null>(
    null
  );
  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());

  const UnauthorizedAccessKpiData = [
    {
      title: "Unauthorized Access In Restricted Areas",
      value: "12", // Number of employees detected in critical areas
      icon: Groups, // 👥 Represents group of people
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      borderColor: "#f44336",
      iconBg: "rgba(244, 67, 54, 0.1)",
      tooltipMessage:
        "Shows the number of unauthorized access in restricted areas.",
    },
    {
      title: "Zone Violations (Last 3)",
      value: "Warehouse Entry, Restricted Lab, Zone C", // Number of violations and zones
      icon: LocationOn, // 📍 Zone/location indicator
      tooltipMessage:
        "Displays the count and name of restricted zones where unauthorized aeople entered .",
    },
    {
      title: "Last Incidence",
      value: "10:45 AM", // Time of last detected violation
      icon: AccessTime, // ⏰ Time
      tooltipMessage:
        "Most recent time unauthorized people were detected in restricted zones.",
    },
  ];

  const backendData = [
    {
      id: 201,
      snapshot: "https://picsum.photos/400/200?random=11",
      zone: "Chemical Storage",
      camera: "CAM-11",
      createdat: "2025-09-23 15:42",
      updatedat: "2025-09-23 15:45",
      alarmTriggered: true,
    },
    {
      id: 202,
      snapshot: "https://picsum.photos/400/200?random=12",
      zone: "Zone A",
      camera: "CAM-12",
      createdat: "2025-09-23 15:28",
      updatedat: "2025-09-23 15:30",
      alarmTriggered: true,
    },
    {
      id: 203,
      snapshot: "https://picsum.photos/400/200?random=13",
      zone: "Restricted Lab",
      camera: "CAM-13",
      createdat: "2025-09-23 15:15",
      updatedat: "2025-09-23 15:18",
      alarmTriggered: true,
    },
    {
      id: 204,
      snapshot: "https://picsum.photos/400/200?random=14",
      zone: "Warehouse Entry",
      camera: "CAM-14",
      createdat: "2025-09-23 14:58",
      updatedat: "2025-09-23 15:00",
      alarmTriggered: true,
    },
    {
      id: 205,
      snapshot: "https://picsum.photos/400/200?random=15",
      zone: "Zone C",
      camera: "CAM-15",
      createdat: "2025-09-23 14:32",
      updatedat: "2025-09-23 14:36",
      alarmTriggered: true,
    },
  ];
  const recentViolations = backendData.map((item) => ({
    voilation: "Unauthorized Access Detected",
    zone: item.zone,
    time: item.createdat,
    imageUrl: item.snapshot,
    cameraId: item.camera,
    alarmTriggered: item.alarmTriggered,
  }));

  const zoneViolationsData = [
    {
      zone: "Chemical Storage",
      violations: 7,
    },
    {
      zone: "Zone A",
      violations: 5,
    },
    {
      zone: "Restricted Lab",
      violations: 6,
    },
    {
      zone: "Warehouse Entry",
      violations: 4,
    },
    {
      zone: "Zone C",
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
  const handleViewSingle = (row: UnauthorizedAccess) => {
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
              UnauthorizedAccessKpiData.map((kpi, index) => (
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
              tooltipMessage="Latest 20 detected unauthorized access with details."
              label="Recent Violations"
              violations={recentViolations}
              loading={false}
            />
          </Grid>
          {/* PPE Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              //showSubViolations
              violationsZone={zoneViolationsData}
              loading={false}
              tooltipMessage="Shows unauthorized access per zone"
            />
          </Grid>
        </Grid>
      </Paper>
      {/* PPE Violations Report */}
      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
        columns={[
          { id: "voilation", label: "Voilation" },
          { id: "time", label: "Time" },
          { id: "zone", label: "Zone" },
          { id: "cameraId", label: "Cameras" },
          { id: "alarmTriggered", label: "Alarm Triggered" },
        ]}
        data={recentViolations}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Chemical Storage",
              "Zone A",
              "Restricted Lab",
              "Warehouse Entry",
              "Zone C",
            ],
          },
          {
            id: "cameraId",
            label: "Cameras",
            type: "select",
            options: ["CAM-11", "CAM-12", "CAM-13", "CAM-14", "CAM-15"],
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
        downloadFileName="unauthorized-access-report"
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

export default UnauthorizedAccessInRestrictedAreas;
