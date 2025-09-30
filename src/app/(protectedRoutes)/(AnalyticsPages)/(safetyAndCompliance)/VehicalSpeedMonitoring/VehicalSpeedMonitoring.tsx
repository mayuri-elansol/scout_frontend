"use client";
import React, { useState } from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import { Box, Grid, Typography } from "@mui/material";

import { Speed, TrendingUp, LocationOn, AccessTime } from "@mui/icons-material";

import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import { CameraZone, ZoneViolationsdata } from "@/app/types";
import { v4 as uuidv4 } from "uuid";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import SpeedIcon from "@mui/icons-material/Speed";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
const VehicalSpeedMonitoring: React.FC = () => {
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<any>(null);
  const backendVehicleData = [
    {
      id: 301,
      speed: 65,
      vehicleType: "Truck",
      vehicleNumber: "MH12AB1234",
      zone: "Main Gate",
      camera: "CAM-09",
      snapshot: "https://picsum.photos/400/200?random=9",
      alarmTriggered: true,
      createdAt: "2025-09-23 17:05",
      updatedAt: "2025-09-23 17:06",
    },
    {
      id: 302,
      speed: 55,
      vehicleType: "Car",
      vehicleNumber: "MH14XY5678",
      zone: "Parking Lot",
      camera: "CAM-10",
      snapshot: "https://picsum.photos/400/200?random=10",
      alarmTriggered: true,
      createdAt: "2025-09-23 17:15",
      updatedAt: "2025-09-23 17:16",
    },
  ];

  const recentVehicleViolations = backendVehicleData.map((item) => {
    let violationMsg = "";

    // Example rule: If speed > 40 inside premises, it’s a violation
    if (item.speed > 40) {
      violationMsg = `Overspeeding detected (${item.speed} km/h)`;
    } else {
      violationMsg = "No violation";
    }

    return {
      Voilation: violationMsg,
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.camera,
      alarmTriggered: item.alarmTriggered,
      vehicleType: item.vehicleType || "Unknown",
      vehicleNumber: item.vehicleNumber || "N/A",
    };
  });
  console.log("vehical speed voilation", recentVehicleViolations);
  const VehicalSpeedMonitoringKpiData = [
    {
      title: "Speed Violation Count",
      value: "267",
      icon: Speed, // 🚦 Speedometer
      tooltipMessage:
        "Total number of detected vehicle speed violations inside the premises.",
    },
    {
      title: "Highest Speed Recorded",
      value: "110 km/h",
      icon: TrendingUp, // 📈 Indicates peak/high value
      tooltipMessage:
        "The maximum speed recorded among all monitored vehicles.",
    },
    {
      title: "Highest Speed Violation Zone",
      value: "Zone 3",
      icon: LocationOn, // 📍 Zone / Location
      tooltipMessage:
        "The zone where the highest vehicle speed violation was detected.",
    },
    {
      title: "Last Detection Time",
      value: "11:15 AM",
      icon: AccessTime, // ⏰ Time
      tooltipMessage:
        "The time when the most recent vehicle speed violation was detected.",
    },
  ];

  const zoneViolationsData: ZoneViolationsdata[] = [
    { zone: "Main Gate", violations: 1, alarms: 1 },
    { zone: "Parking Lot", violations: 1, alarms: 0 },
  ];

  const KpiCardLoading = false;
  const handleViewSingle = (row: any) => {
    console.log("view single row", row);
    setViewPopupData(row);
    setViewPopupOpen(true);
  };
  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());
  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <SpeedIcon sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Vehicle Speed Monitoring inside premises
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ mb: 4 }} alignItems="stretch">
        {KpiCardLoading
          ? // Show skeletons while loading
            skeletonKeys.map((index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                key={index + 1}
              >
                <KpiCardSkeleton />
              </Grid>
            ))
          : // Show actual KPI cards
            VehicalSpeedMonitoringKpiData.map((kpi, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                key={index + 1}
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
            violations={recentVehicleViolations}
            loading={false}
            tooltipMessage="Latest 20 detected vehical speed violations with details."
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

      {/* People Count Report */}
      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
        columns={[
          { id: "Voilation", label: "Violation", minWidth: 200 },
          { id: "time", label: "Time", minWidth: 150 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "cameraId", label: "Camera ID", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 150 },

          { id: "vehicleType", label: "Vehicle Type", minWidth: 120 },
          { id: "vehicleNumber", label: "Vehicle Number", minWidth: 150 },
        ]}
        data={recentVehicleViolations}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Main Gate",
              "Parking Lot",
              "School Zone",
              "Service Road",
              "Highway Exit",
            ],
          },

          {
            id: "alarmTriggered",
            label: "Alarm Triggered",
            type: "select",
            options: ["true", "false"],
          },
          {
            id: "vehicleType",
            label: "Vehicle Type",
            type: "select",
            options: ["Truck", "Car", "Bus", "Bike", "Ambulance"],
          },
          {
            id: "vehicleNumber",
            label: "Vehicle Number",
            type: "select",
            options: Array.from(
              new Set(recentVehicleViolations.map((item) => item.vehicleNumber))
            ),
          },
          { id: "startDate", label: "Start Date", type: "date" },
          { id: "endDate", label: "End Date", type: "date" },
        ]}
        downloadFileName="vehicle-detection-report"
        loading={false}
        onView={handleViewSingle}
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

export default VehicalSpeedMonitoring;
