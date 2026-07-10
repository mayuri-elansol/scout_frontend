"use client";
import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { Groups, LocationOn, AccessTime } from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import PeopleIcon from "@mui/icons-material/People";
import { getOneHourBefore } from "../../(safetyAndCompliance)/PPEKitDetection/PPEKitDetection";
const PeoplePresence: React.FC = () => {
  interface PeoplePresenceViolation {
    incident: string;
    zone: string;
    time: string;
    imageUrl: string;
    cameraId: string;
    peopleCount: number;
    alarmTriggered: boolean;
    [key: string]: string | number | boolean;
  }

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] =
    useState<PeoplePresenceViolation | null>(null);
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());

  const PeoplePresenceKpiData = [
    {
      title: "Total People Count",
      value: "87",
      icon: Groups,
      tooltipMessage:
        "Shows the total number of people detected in monitored zones.",
    },
    {
      title: "Detected Zones",
      value: "Zone A, Zone B",
      icon: LocationOn,
      tooltipMessage: "Lists the zones where people are currently detected.",
    },
    {
      title: "Last Incidence",
      value: getOneHourBefore().time,
      icon: AccessTime,
      tooltipMessage:
        "Shows the time when the most recent people presence was detected.",
    },
  ];
  const backendPeoplePresenceData = [
    {
      id: 801,
      snapshot: "/img/movement-shutdown-hours/m1.jpg",
      zone: "Zone A",
      camera: "CAM-31",
      count: 1,
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 21:06",
    },
    {
      id: 802,
      snapshot: "/img/movement-shutdown-hours/m2.jpg",
      zone: "Zone B",
      camera: "CAM-32",
      count: 1,
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 21:16",
    },
    {
      id: 801,
      snapshot: "/img/movement-shutdown-hours/u2.jpg",
      zone: "Zone C",
      camera: "CAM-31",
      count: 1,
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 21:06",
    },
    {
      id: 802,
      snapshot: "/img/movement-shutdown-hours/u1.jpg",
      zone: "Zone D",
      camera: "CAM-32",
      count: 1,
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 21:16",
    },
    {
      id: 801,
      snapshot: "/img/movement-shutdown-hours/m2.jpg",
      zone: "Zone B",
      camera: "CAM-31",
      count: 1,
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 21:06",
    },
    {
      id: 802,
      snapshot: "/img/movement-shutdown-hours/u3.jpg",
      zone: "Zone E",
      camera: "CAM-32",
      count: 1,
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 21:16",
    },
    {
      id: 801,
      snapshot: "/img/movement-shutdown-hours/m1.jpg",
      zone: "Zone A",
      camera: "CAM-31",
      count: 1,
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 21:06",
    },
    {
      id: 802,
      snapshot: "/img/movement-shutdown-hours/u1.jpg",
      zone: "Zone D",
      camera: "CAM-32",
      count: 1,
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 21:16",
    },
  ];

  const recentPeoplePresence = backendPeoplePresenceData.map((item) => {
    const incidentMsg = `People detected: ${item.count}`;

    return {
      incident: incidentMsg,
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.camera,
      peopleCount: item.count,
      alarmTriggered: item.alarmTriggered,
    };
  });

  const zoneViolationsData = [
    {
      zone: "Production Floor",
      peopleCount: 15,
      icons: {
        peopleCount: PeopleIcon,
      },
    },
    {
      zone: "Loading Dock",
      peopleCount: 7,
      icons: {
        peopleCount: PeopleIcon,
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
  const handleViewSingle = (row: Record<string, string | number | boolean>) => {
    console.log("view single row", row);
    setViewPopupData(row as PeoplePresenceViolation);
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

          <TimeFilter
            onRangeChange={function (range: {
              start: string;
              end: string;
            }): void {
              throw new Error("Function not implemented.");
            }}
          />
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
              PeoplePresenceKpiData.map((kpi, index) => (
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
              violations={recentPeoplePresence}
              loading={false}
              tooltipMessage="Latest 20 people detection during shutdown hours with details."
            />
          </Grid>
          {/*  Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              label="Zone Incident"
              violationsZone={zoneViolationsData}
              loading={false}
              tooltipMessage="Shows people presence during shutdown hours incidents per zone"
            />
          </Grid>
        </Grid>
      </Paper>

      {/*  Violations Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "incident", label: "Incident", minWidth: 200 },
          { id: "peopleCount", label: "People Count", minWidth: 120 },
          { id: "time", label: "Time", minWidth: 150 },
          { id: "zone", label: "Zone", minWidth: 150 },
          { id: "cameraId", label: "Cameras", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
        ]}
        data={recentPeoplePresence}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(
              new Set(recentPeoplePresence.map((item) => item.zone)),
            ),
          },
          {
            id: "cameraId",
            label: "Camera",
            type: "select",
            options: Array.from(
              new Set(recentPeoplePresence.map((item) => item.cameraId)),
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
        downloadFileName="people-presence-shutdown-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        loading={false}
        onView={handleViewSingle}
        tooltipMessage="Detailed incidents report with filter, reset, and CSV/PDF download options."
        totalCount={0}
        page={0}
        rowsPerPage={0}
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

export default PeoplePresence;
