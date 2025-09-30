"use client";
import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import {
  Shield,
  NotificationsActive,
  CheckCircle,
  Schedule,
  ReportProblem,
  Whatshot,
} from "@mui/icons-material";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import ViolationsIcon from "@mui/icons-material/Warning";
import AlarmIcon from "@mui/icons-material/NotificationImportant";
const FallDetection: React.FC = () => {
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<any>(null);

  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());

  const fallKpiData = [
    {
      title: "Total Fall Incidents",
      value: "24", // Count of all fall/laydown/sleeping incidents
      icon: ReportProblem,
      tooltipMessage:
        "Total number of fall, laydown, or sleeping incidents detected across all monitored zones.",
    },
    {
      title: "Active Alarms",
      value: "6", // Count of incidents where alarmTriggered = True
      icon: NotificationsActive,
      tooltipMessage:
        "Number of incidents where alarms were triggered due to detected falls or unsafe conditions.",
    },
    {
      title: "Incident-Free Zones",
      value: "3 / 5", // Number of zones with 0 incidents / total zones
      icon: CheckCircle,
      tooltipMessage:
        "Number of zones without any fall or laydown incidents out of the total monitored zones.",
    },
    {
      title: "Last Detection Time",
      value: "10:42 AM", // Current timestamp - latest incident createdAt
      icon: Schedule,
      tooltipMessage:
        "The time when the most recent fall, laydown, or sleeping incident was detected.",
    },
    {
      title: "Most Incident-Prone Zone",
      value: "Zone B", // Zone with the highest incidents
      icon: Whatshot,
      tooltipMessage:
        "The zone with the highest number of fall, laydown, or sleeping incidents recorded.",
    },
  ];

  const backendLaydownData = [
    {
      id: 401,
      snapshot: "https://picsum.photos/400/200?random=11",
      zone: "Production Floor A",
      camera: "CAM-11",
      createdAt: "2025-09-23 18:05",
      updatedAt: "2025-09-23 18:06",
      alarmTriggered: true,
    },
    {
      id: 402,
      snapshot: "https://picsum.photos/400/200?random=12",
      zone: "Warehouse",
      camera: "CAM-12",
      createdAt: "2025-09-23 18:12",
      updatedAt: "2025-09-23 18:13",
      alarmTriggered: false,
    },
    {
      id: 403,
      snapshot: "https://picsum.photos/400/200?random=13",
      zone: "Maintenance Area",
      camera: "CAM-13",
      createdAt: "2025-09-23 18:18",
      updatedAt: "2025-09-23 18:19",
      alarmTriggered: true,
    },
    {
      id: 404,
      snapshot: "https://picsum.photos/400/200?random=11",
      zone: "Production Floor A",
      camera: "CAM-11",
      createdAt: "2025-09-23 18:05",
      updatedAt: "2025-09-23 18:06",
      alarmTriggered: true,
    },
    {
      id: 405,
      snapshot: "https://picsum.photos/400/200?random=12",
      zone: "Warehouse",
      camera: "CAM-12",
      createdAt: "2025-09-23 18:12",
      updatedAt: "2025-09-23 18:13",
      alarmTriggered: false,
    },
    {
      id: 406,
      snapshot: "https://picsum.photos/400/200?random=13",
      zone: "Maintenance Area",
      camera: "CAM-13",
      createdAt: "2025-09-23 18:18",
      updatedAt: "2025-09-23 18:19",
      alarmTriggered: true,
    },
  ];

  // Map backend data to recentViolations format
  const recentLaydownViolations = backendLaydownData.map((item) => {
    return {
      Voilation: "Fall / Laydown / Sleeping detected",
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
      violations: 2,
      alarms: 1,
      icons: {
        violations: ViolationsIcon,
        alarms: AlarmIcon,
      },
    },
    {
      zone: "Warehouse",
      violations: 2,
      alarms: 2,
      icons: {
        violations: ViolationsIcon,
        alarms: AlarmIcon,
      },
    },
    {
      zone: "Maintenance Area",
      violations: 2,
      alarms: 2,
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
  };

  const handleReset = () => {
    console.log("reset button clickedd");
  };

  const handleExport = (format: "csv" | "pdf") => {
    console.log("Export requested clikcedd:", format);
  };

  const handleViewSingle = (row: any) => {
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
          <Shield sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Fall Detection /Laydown/Sleeping Detection in Work Areas
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
                📊
              </Box>
              Real Time Overview
            </Typography>
          </Box>

          <TimeFilter />
        </Box>
        {/* KPI Cards */}

        <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
          {KpiCardLoading
            ? // Show skeletons while loading
              skeletonKeys.map((key) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={key}>
                  <KpiCardSkeleton />
                </Grid>
              ))
            : // Show actual KPI cards
              fallKpiData.map((kpi) => (
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
              violations={recentLaydownViolations}
              loading={false}
              tooltipMessage="Latest 20 detected laydown/sleeping/falldown violations with details."
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
        data={recentLaydownViolations}
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
            id: "vehicleType",
            label: "Vehicle Type",
            type: "select",
            options: ["Truck", "Car", "Bus", "Bike"],
          },
          {
            id: "alarmTriggered",
            label: "Alarm Triggered",
            type: "select",
            options: ["true", "false"],
          },
          { id: "startDate", label: "Start Date", type: "date" },
          { id: "endDate", label: "End Date", type: "date" },
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

export default FallDetection;
