"use client";
import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import { AccessTime, Room } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import { getOneHourBefore } from "@/utils/getOneHrBefore";

const EmployeeIdleTime: React.FC = () => {
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());
  interface EmployeeIdleEvent {
    incident: string;
    zone: string;
    time: string;
    imageUrl: string;
    cameraId: string;

    [key: string]: string | number | boolean;
  }

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<EmployeeIdleEvent | null>(
    null,
  );
  const EmployeeIdleTimeKpiData = [
    {
      title: "Total Idle Events",
      value: "1",
      icon: AccessTime,
      tooltipMessage:
        "Total number of idle time events detected by the system.",
    },
    {
      title: "Last Idle Detection Time",
      value: getOneHourBefore().time,
      icon: AccessTime,
      tooltipMessage: "The most recent idle detection timestamp.",
    },
    {
      title: "Last Idle Detection Zone",
      value: "Zone A",
      icon: Room,
      tooltipMessage: "The zone where the most recent idle event was detected.",
    },
  ];
  const backendIdleData = [
    {
      id: 301,
      isIdle: true,
      isWorking: false,
      notPresent: false,
      trackingId: "TRK-01",
      zone: "Zone A",
      snapshot: "/img/employee-idle-time-monitoring/i1.png",
      cameraid: "CAM-I01",
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-08 14:55",
    },
    {
      id: 302,
      isIdle: false,
      isWorking: true,
      notPresent: false,
      trackingId: "TRK-02",
      zone: "Zone B",
      snapshot: "/img/employee-idle-time-monitoring/i2.jpg",
      cameraid: "CAM-I02",
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-08 14:45",
    },
  ];

  const recentIdleEvents = backendIdleData.map((item) => {
    const titleParts = [];

    if (item.isIdle) titleParts.push("Employee Idle");
    if (item.isWorking) titleParts.push("Employee Working");
    if (item.notPresent) titleParts.push("Employee Not Present");

    return {
      incident: titleParts.join(", ") ?? "No event",
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.cameraid,
    };
  });

  console.log("RECENT IDLE EVENTS", recentIdleEvents);

  const zoneIdleData = [
    {
      zone: "Zone A",
      incidents: 1,
      subViolations: [
        { label: "Idle", value: 1, icon: AccessTimeIcon },
        { label: "Working", value: 0, icon: WorkOutlineIcon },
        { label: "Not Present", value: 0, icon: PersonOffIcon },
      ],
    },
    {
      zone: "Zone B",
      incidents: 1,
      subViolations: [
        { label: "Working", value: 1, icon: WorkOutlineIcon },
        { label: "Idle", value: 0, icon: AccessTimeIcon },
        { label: "Not Present", value: 0, icon: PersonOffIcon },
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
  const handleViewSingle = (row: EmployeeIdleEvent) => {
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
              EmployeeIdleTimeKpiData.map((kpi, index) => (
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
          {/* Recent Violations */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <RecentViolations
              tooltipMessage="Latest 20 detected idel, working,not present employee with details."
              label="Recent Incident"
              violations={recentIdleEvents}
              loading={false}
            />
          </Grid>
          {/* PPE Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              violationsZone={zoneIdleData}
              loading={false}
              tooltipMessage="Shows idel, working,not present employee per zone"
              label="Zone Incident"
            />
          </Grid>
        </Grid>
      </Paper>
      {/*  Violations Report */}
      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed idle time events report with filter, reset, and CSV/PDF download options."
        columns={[
          { id: "incident", label: "Incident" },
          { id: "time", label: "Time" },
          { id: "zone", label: "Zone" },
          { id: "cameraId", label: "Cameras" },
        ]}
        data={recentIdleEvents}
        filters={[
          {
            id: "incident",
            label: "Incident",
            type: "select",
            options: Array.from(
              new Set(recentIdleEvents.map((v) => v.incident)),
            ),
          },
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(new Set(recentIdleEvents.map((v) => v.zone))),
          },
          {
            id: "cameraId",
            label: "Cameras",
            type: "select",
            options: Array.from(
              new Set(recentIdleEvents.map((v) => v.cameraId)),
            ),
          },

          { id: "time", label: "Start Date", type: "date" },
          { id: "time", label: "End Date", type: "date" },
        ]}
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        onDownload={handleDownloadSingle}
        onView={handleViewSingle}
        downloadFileName="employee-idle-time-report"
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

export default EmployeeIdleTime;
