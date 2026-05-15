"use client";

import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import { Block, CheckCircle, LocationOn } from "@mui/icons-material";

import CarIcon from "@mui/icons-material/DirectionsCar";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import { getOneHourBefore } from "@/utils/getOneHrBefore";

const UnauthorizedParkingOrEquipmentBlockingAisles: React.FC = () => {
  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());
  interface UnauthorizedParkingEvent {
    eventMessage: string;
    zone: string;
    time: string;
    imageUrl: string;
    cameraId: string;
    alarmTriggered: boolean;
    updatedAt: string;
    [key: string]: string | number | boolean;
  }

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] =
    useState<UnauthorizedParkingEvent | null>(null);
  const UnauthorizedParkingKpiData = [
    {
      title: "Blocked Parking",
      value: "4",
      tooltipMessage:
        "Shows the total number of parking that are currently blocked.",
      icon: Block,
    },
    {
      title: "Clear Parking",
      value: "1",
      tooltipMessage:
        "Shows the total number of parking that are currently clear and safe for use.",
      icon: CheckCircle,
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      borderColor: "#4caf50",
      iconBg: "rgba(76, 175, 80, 0.1)",
    },
    {
      title: "Affected Zones (Last 3)",
      value: "Zone A, Zone B, Zone C",
      tooltipMessage:
        "Displays the last three zones where blocked parking were detected.",
      icon: LocationOn,
    },
  ];

  const backendData = [
    {
      id: 201,
      typeOf: "Car",
      snapshot: "/img/unauthorised-parking-blocking-aisles/p2.jpg",
      zone: "Zone A",
      camera: "CAM-11",
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-09 08:45",
    },
    {
      id: 202,
      typeOf: "Car",
      snapshot: "/img/unauthorised-parking-blocking-aisles/p1.jpg",
      zone: "Zone B",
      camera: "CAM-12",
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-09 09:18",
    },
    {
      id: 203,
      typeOf: "Car",
      snapshot: "/img/unauthorised-parking-blocking-aisles/p3.jpg",
      zone: "Zone C",
      camera: "CAM-13",
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-09 10:08",
    },
  ];

  const recentViolations = backendData.map((item) => {
    const eventMessage =
      item.typeOf === "Car"
        ? "Unauthorized Car Parking"
        : "Equipment Blocking Aisle";

    return {
      eventMessage,
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.camera,
      alarmTriggered: true,
      updatedAt: item.updatedAt,
    };
  });

  console.log(recentViolations);

  const zoneViolationsData = [
    {
      zone: "Zone A",
      violations: 2,
      subViolations: [{ label: "Car", value: 2, icon: CarIcon }],
    },
    {
      zone: "Zone B",
      violations: 1,
      subViolations: [{ label: "Car", value: 1, icon: CarIcon }],
    },
    {
      zone: "Zone C",
      violations: 1,
      subViolations: [{ label: "Car", value: 1, icon: CarIcon }],
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
  const handleViewSingle = (row: UnauthorizedParkingEvent) => {
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
              UnauthorizedParkingKpiData.map((kpi, index) => (
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
              violations={recentViolations}
              loading={false}
              tooltipMessage="Latest 20 unauthorized parking or equipment blocking with details."
            />
          </Grid>
          {/*  Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              violationsZone={zoneViolationsData}
              loading={false}
              tooltipMessage="Shows unauthorized parking or equipment blocking per zone"
            />
          </Grid>
        </Grid>
      </Paper>
      {/*  Violations Report */}
      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed report of unauthorized parking and equipment blocking aisles"
        columns={[
          { id: "eventMessage", label: "Voilation", minWidth: 200 },
          { id: "time", label: "Time", minWidth: 150 },
          { id: "zone", label: "Zone", minWidth: 120 },

          { id: "cameraId", label: "Camera", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered" },
        ]}
        data={recentViolations}
        filters={[
          {
            id: "eventMessage",
            label: "Voilation",
            type: "select",
            options: Array.from(
              new Set(recentViolations.map((v) => v.eventMessage)),
            ),
          },

          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(new Set(recentViolations.map((v) => v.zone))),
          },
          {
            id: "cameraId",
            label: "Camera",
            type: "select",
            options: Array.from(
              new Set(recentViolations.map((v) => v.cameraId)),
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
        downloadFileName="unauthorized-parking-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onDownload={handleDownloadSingle}
        onView={handleViewSingle}
        onExport={handleExport}
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

export default UnauthorizedParkingOrEquipmentBlockingAisles;
