"use client";
import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  Groups,
  ReportProblem,
  LocationOn,
  AccessTime,
} from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import GroupsIcon from "@mui/icons-material/Groups";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";

const CrowdGathering: React.FC = () => {
  interface ViolationRow {
    voilation: string;
    zone: string;
    time: string;
    imageUrl: string;
    cameraId: string;
    alarmTriggered: boolean;
    mobCount: number;
    [key: string]: string | number | boolean;
  }
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<ViolationRow | null>(null);
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());
  const backendCrowdData = [
    {
      id: 701,
      gatheredMore: true,
      alarmTriggered: true,
      mobCount: 25,
      snapshot: "https://picsum.photos/400/200?random=21",
      zone: "Hazard Zone A",
      camera: "CAM-21",
      createdAt: "2025-09-23 20:05",
      updatedAt: "2025-09-23 20:06",
    },
    {
      id: 702,
      gatheredMore: true,
      alarmTriggered: false,
      mobCount: 12,
      snapshot: "https://picsum.photos/400/200?random=22",
      zone: "Hazard Zone B",
      camera: "CAM-22",
      createdAt: "2025-09-23 20:15",
      updatedAt: "2025-09-23 20:16",
    },
    {
      id: 703,
      gatheredMore: true,
      alarmTriggered: true,
      mobCount: 25,
      snapshot: "https://picsum.photos/400/200?random=21",
      zone: "Hazard Zone A",
      camera: "CAM-21",
      createdAt: "2025-09-23 20:05",
      updatedAt: "2025-09-23 20:06",
    },
    {
      id: 704,
      gatheredMore: true,
      alarmTriggered: false,
      mobCount: 12,
      snapshot: "https://picsum.photos/400/200?random=22",
      zone: "Hazard Zone B",
      camera: "CAM-22",
      createdAt: "2025-09-23 20:15",
      updatedAt: "2025-09-23 20:16",
    },
  ];

  const CrowdKpiData = [
    {
      title: "Crowded Zone",
      value: "Zone B", // Zone currently most crowded
      icon: Groups,
      tooltipMessage:
        "Displays the zone that currently has the highest crowd gathering.",
    },
    {
      title: "Total Incidents Detected",
      value: "56", // Total crowd-related incidents
      icon: ReportProblem,
      tooltipMessage:
        "Shows the total number of crowd gathering incidents detected so far.",
    },
    {
      title: "Peak Crowd Density ",
      value: "50 (Zone B)", // Zone with highest density
      icon: LocationOn,
      tooltipMessage:
        "Shows the highest recorded crowd density along with the zone where it occurred.",
    },
    {
      title: "Last Incidence",
      value: "09:45 AM", // Timestamp of last detected crowd incident
      icon: AccessTime,
      tooltipMessage:
        "Displays the timestamp of the most recent crowd gathering incident detected.",
    },
  ];

  const recentCrowdViolations = backendCrowdData.map((item) => {
    let violationMsg = "";

    // Rule: If gatheredMore is true → violation
    if (item.gatheredMore) {
      violationMsg = `Crowd gathering detected `;
    } else {
      violationMsg = "No violation";
    }

    return {
      voilation: violationMsg,
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.camera,
      alarmTriggered: item.alarmTriggered,
      mobCount: item.mobCount,
    };
  });

  const zoneViolationsData = [
    {
      zone: "Hazard Zone A",
      violations: 2,
    },
    {
      zone: "Hazard Zone B",
      violations: 2,
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
  const handleViewSingle = (row: ViolationRow) => {
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
          <GroupsIcon sx={{ fontSize: 28, color: "#3072b0" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Crowd Gathering in Hazardous Zones
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
              CrowdKpiData.map((kpi, index) => (
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
              label="Recent Violations"
              violations={recentCrowdViolations}
              loading={false}
              tooltipMessage="Latest 20 detected crowd gathering violations with details."
            />
          </Grid>
          {/* PPE Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              violationsZone={zoneViolationsData}
              loading={false}
              tooltipMessage="Shows crowd gathered event per zone"
            />
          </Grid>
        </Grid>
      </Paper>
      {/* </Box> */}
      {/*  Violations Report */}
      <ReportTable
        title="Crowd Gathering in Hazardous Zones Report"
        columns={[
          { id: "voilation", label: "Violation", minWidth: 200 },

          { id: "time", label: "Time", minWidth: 150 },
          { id: "zone", label: "Zone", minWidth: 150 },
          { id: "cameraId", label: "Cameras", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
          { id: "mobCount", label: "People Count", minWidth: 120 },
        ]}
        data={recentCrowdViolations}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(
              new Set(recentCrowdViolations.map((item) => item.zone))
            ),
          },
          {
            id: "cameraId",
            label: "Cameras",
            type: "select",
            options: Array.from(
              new Set(recentCrowdViolations.map((item) => item.cameraId))
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
        downloadFileName="crowd-gathering-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        loading={false}
        onView={handleViewSingle}
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
      />
      {/* View Alert Popup */}
      {viewPopupData && (
        // <ViewAlertPopup
        //   open={viewPopupOpen}
        //   handleClose={() => setViewPopupOpen(false)}
        //   title={viewPopupData.Voilation}
        //   location={viewPopupData.zone}
        //   time={viewPopupData.time}
        //   cameraId={viewPopupData.cameraId}
        //   imageUrl={viewPopupData.imageUrl}
        //   alarmTriggered={viewPopupData.alarmTriggered}
        //   onDownload={(imageUrl) => console.log("Download image:", imageUrl)}
        // />
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

export default CrowdGathering;
