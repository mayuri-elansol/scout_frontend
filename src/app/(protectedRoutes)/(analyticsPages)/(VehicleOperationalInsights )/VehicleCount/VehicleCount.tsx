"use client";
import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  DirectionsCar,
  CheckCircle,
  ReportProblem,
  Login,
  Logout,
} from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";

import { getOneHourBefore } from "../../(safetyAndCompliance)/PPEKitDetectionPage/PPEKitDetection";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
const VehicleCount: React.FC = () => {
  interface VehicleCountEvent {
    incident: string;
    vehicleNumber: string;
    status: string;
    validNumber: boolean;
    time: string;
    zone: string;
    cameraId: string;
    alarmTriggered: boolean;
    imageUrl: string;
    [key: string]: string | number | boolean | undefined;
  }

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<VehicleCountEvent | null>(
    null
  );
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());
  const VehicleCountKpiData = [
    {
      title: "Total Vehicle Entries",
      value: "120",
      icon: Login,
      tooltipMessage:
        "Total number of vehicles that entered through all gates during the selected time period.",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "rgba(33, 150, 243, 0.1)",
    },
    {
      title: "Total Vehicle Exits",
      value: "92",
      icon: Logout,
      tooltipMessage:
        "Total number of vehicles that exited through all gates during the selected time period.",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "rgba(33, 150, 243, 0.1)",
    },
    {
      title: "Vehicles Inside",
      value: "28",
      icon: DirectionsCar,
      tooltipMessage:
        "Total number of vehicles currently inside the premises (calculated as entries minus exits).",
      trendColor: "#2196f3",
      color: "#2196f3",
      bgColor: "#e3f2fd",
      borderColor: "#2196f3",
      iconBg: "rgba(33, 150, 243, 0.1)",
    },
    {
      title: "Total Valid Numbers",
      value: "145",
      icon: CheckCircle,
      tooltipMessage:
        "Number of detected vehicles with valid license plate numbers.",
      trendColor: "#4caf50",
      color: "#4caf50",
      bgColor: "#e8f5e9",
      borderColor: "#4caf50",
      iconBg: "rgba(76, 175, 80, 0.1)",
    },
    {
      title: "Total Invalid Numbers",
      value: "7",
      icon: ReportProblem,
      tooltipMessage:
        "Number of detected vehicles with invalid or unreadable license plate numbers.",
    },
  ];
  const vehicleCountBackendData = [
    {
      id: 201,
      numberDetected: "MH12AB1234",
      status: "Entry",
      validNumber: true,
      snapshot: "https://picsum.photos/400/200?random=11",
      zone: "Main Gate A",
      camera: "CAM-ENTRY-01",
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 09:43",
      alarmTriggered: false,
    },
    {
      id: 202,
      numberDetected: "MH14XY7890",
      status: "Exit",
      validNumber: false,
      snapshot: "https://picsum.photos/400/200?random=12",
      zone: "Exit Gate B",
      camera: "CAM-EXIT-02",
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 10:00",
      alarmTriggered: true,
    },
    {
      id: 203,
      numberDetected: "GJ05TR5678",
      status: "Entry",
      validNumber: true,
      snapshot: "https://picsum.photos/400/200?random=13",
      zone: "Warehouse Entry",
      camera: "CAM-ENTRY-03",
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 10:14",
      alarmTriggered: false,
    },
    {
      id: 204,
      numberDetected: "DL09GH4567",
      status: "Exit",
      validNumber: false,
      snapshot: "https://picsum.photos/400/200?random=14",
      zone: "Service Exit",
      camera: "CAM-EXIT-04",
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 10:32",
      alarmTriggered: true,
    },
    {
      id: 205,
      numberDetected: "MH15PQ2345",
      status: "Entry",
      validNumber: true,
      snapshot: "https://picsum.photos/400/200?random=15",
      zone: "Visitor Gate",
      camera: "CAM-ENTRY-05",
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 11:02",
      alarmTriggered: false,
    },
  ];

  const vehicleViolations = vehicleCountBackendData.map((item) => {
    let violation = "No violation";

    if (!item.validNumber) {
      violation = "Invalid number plate detected";
    }

    return {
      incident: violation,
      vehicleNumber: item.numberDetected,
      status: item.status,
      validNumber: item.validNumber,
      time: item.createdAt,
      zone: item.zone,
      cameraId: item.camera,
      alarmTriggered: item.alarmTriggered,
      imageUrl: item.snapshot,
    };
  });

  console.log(vehicleViolations);

  const vehicleZoneViolationsData = [
    {
      zone: "Main Gate A",
      violations: 5,
      subViolations: [
        { label: "Invalid Number Plate", value: 3, icon: ErrorOutlineIcon },
      ],
    },
    {
      zone: "Exit Gate B",
      violations: 7,
      subViolations: [
        { label: "Invalid Number Plate", value: 4, icon: ErrorOutlineIcon },
      ],
    },
    {
      zone: "Warehouse Entry",
      violations: 4,
      subViolations: [
        { label: "Invalid Number Plate", value: 2, icon: ErrorOutlineIcon },
      ],
    },
    {
      zone: "Service Exit",
      violations: 6,
      subViolations: [
        { label: "Invalid Number Plate", value: 3, icon: ErrorOutlineIcon },
      ],
    },
    {
      zone: "Visitor Gate",
      violations: 3,
      subViolations: [
        { label: "Invalid Number Plate", value: 2, icon: ErrorOutlineIcon },
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
  const handleViewSingle = (row: VehicleCountEvent) => {
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
              VehicleCountKpiData.map((kpi, index) => (
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
              tooltipMessage="Latest 20 Vehicle Count & ANPR at Entry/Exit Gates with details."
              label="Recent Incident"
              violations={vehicleViolations}
              loading={false}
            />
          </Grid>
          {/* Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              label="Zone Incident"
              violationsZone={vehicleZoneViolationsData}
              loading={false}
              tooltipMessage="Shows violations per zone"
            />
          </Grid>
        </Grid>
      </Paper>
      {/*  Violations Report */}
      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed vehicle count report with filters, reset, and export options."
        columns={[
          { id: "incident", label: "Incident", minWidth: 200 },
          { id: "vehicleNumber", label: "Vehicle Number", minWidth: 150 },
          { id: "status", label: "Status (Entry/Exit)", minWidth: 150 },
          { id: "validNumber", label: "Valid Number", minWidth: 120 },
          { id: "time", label: "Time", minWidth: 140 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "cameraId", label: "Camera", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 150 },
        ]}
        data={vehicleViolations}
        filters={[
          {
            id: "vehicleNumber",
            label: "Vehicle Number",
            type: "select",
            options: Array.from(
              new Set(vehicleViolations.map((v) => v.vehicleNumber))
            ),
          },
          {
            id: "status",
            label: "status",
            type: "select",
            options: Array.from(
              new Set(vehicleViolations.map((v) => v.status))
            ),
          },
          {
            id: "validNumber",
            label: "Valid Number",
            type: "select",
            options: Array.from(
              new Set(vehicleViolations.map((v) => v.validNumber))
            ),
          },
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(new Set(vehicleViolations.map((v) => v.zone))),
          },
          {
            id: "cameraId",
            label: "camera",
            type: "select",
            options: Array.from(
              new Set(vehicleViolations.map((v) => v.cameraId))
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
        downloadFileName="vehicle-count-anpr-report"
        onSubmit={handleSubmitFilter}
        onDownload={handleDownloadSingle}
        onView={handleViewSingle}
        onReset={handleReset}
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

export default VehicleCount;
