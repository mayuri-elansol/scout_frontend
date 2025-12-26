"use client";

import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { AccessTime, Shield, Security, LocationOn } from "@mui/icons-material";

import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";

import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";

const IntrusionDetection: React.FC = () => {
  interface IntrusionViolation {
    incident: string;
    zone: string;
    time: string;
    imageUrl: string;
    cameraId: string;
    alarmTriggered: boolean;
    id: number;
    [key: string]: string | number | boolean;
  }

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<IntrusionViolation | null>(
    null
  );
  const intrusionKpiData = [
    {
      title: "Intrusion Detected",
      value: "7",
      icon: Security,
      tooltipMessage: "Shows the total number of intrusions detected so far.",
    },
    {
      title: "Security Level (Safe/Unsafe)",
      value: "Safe",
      tooltipMessage:
        "Displays whether the security status is safe or unsafe at the moment.",

      icon: Shield,
    },
    {
      title: "Recent Intrusion Time",
      value: "11:20 AM",
      icon: AccessTime,

      tooltipMessage:
        "Shows the time when the most recent intrusion was detected.",
    },
    {
      title: "Zone Breaches",
      value: "2 (Zone A, Zone C)",
      icon: LocationOn,
      tooltipMessage:
        "Displays the number of zones breached and lists those zones.",
    },
  ];
  const backendIntrusionData = [
    {
      id: 201,
      snapshot: "https://picsum.photos/400/200?random=11",
      zone: "Perimeter Zone A",
      camera: "CAM-11",
      alarmTriggered: true,
      createdAt: "2025-09-23 18:05",
      updatedAt: "2025-09-23 18:06",
    },
    {
      id: 202,
      snapshot: "https://picsum.photos/400/200?random=12",
      zone: "Perimeter Zone B",
      camera: "CAM-12",
      alarmTriggered: true,
      createdAt: "2025-09-23 18:15",
      updatedAt: "2025-09-23 18:16",
    },
    {
      id: 203,
      snapshot: "https://picsum.photos/400/200?random=11",
      zone: "Perimeter Zone A",
      camera: "CAM-11",
      alarmTriggered: true,
      createdAt: "2025-09-23 18:05",
      updatedAt: "2025-09-23 18:06",
    },
    {
      id: 204,
      snapshot: "https://picsum.photos/400/200?random=12",
      zone: "Perimeter Zone B",
      camera: "CAM-12",
      alarmTriggered: true,
      createdAt: "2025-09-23 18:15",
      updatedAt: "2025-09-23 18:16",
    },
  ];

  const recentIntrusionViolations = backendIntrusionData.map((item) => {
    let incidentMsg = "";

    if (item.alarmTriggered) {
      incidentMsg = "Intrusion detected";
    } else {
      incidentMsg = "No violation";
    }

    return {
      incident: incidentMsg,
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.camera,
      alarmTriggered: item.alarmTriggered,
      id: item.id,
    };
  });

  const zoneViolationsData = [
    {
      zone: "Perimeter Zone A",
      incident: 2,
    },
    {
      zone: "Perimeter Zone B",
      incident: 2,
    },
  ];
  const KpiCardLoading = false;

  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());

  const handleViewSingle = (row: Record<string, string | number | boolean>) => {
    const violation = row as IntrusionViolation;
    setViewPopupData(violation);
    setViewPopupOpen(true);
  };
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

          <TimeFilter onRangeChange={() => console.log("on range chnaged")} />
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
              intrusionKpiData.map((kpi, index) => (
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
          {/* Active Intrusion Alerts */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <RecentViolations
              label="Recent Incident"
              violations={recentIntrusionViolations}
              loading={false}
              tooltipMessage="Latest 20 intrusion detected with details."
            />
          </Grid>
          {/* Security Zones Status */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              label="Zone Incident"
              violationsZone={zoneViolationsData}
              loading={false}
              tooltipMessage="Shows intrusion detected per zone"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Security Intrusion Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "incident", label: "Incident", minWidth: 200 },
          { id: "time", label: "Time", minWidth: 150 },
          { id: "zone", label: "Zone", minWidth: 150 },
          { id: "cameraId", label: "Cameras", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
        ]}
        data={recentIntrusionViolations}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(
              new Set(recentIntrusionViolations.map((item) => item.zone))
            ),
          },
          {
            id: "cameraId",
            label: "Cameras",
            type: "select",
            options: Array.from(
              new Set(recentIntrusionViolations.map((v) => v.cameraId))
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
        downloadFileName="intrusion-detection-report"
        loading={false}
        onView={handleViewSingle}
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
      />
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

export default IntrusionDetection;
