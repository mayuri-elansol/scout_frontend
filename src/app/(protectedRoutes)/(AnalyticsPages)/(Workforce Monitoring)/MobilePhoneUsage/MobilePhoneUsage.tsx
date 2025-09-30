"use client";
import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Typography } from "@mui/material";
import { PhoneIphone, LocationOn, AccessTime } from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import { ZoneViolationsdata } from "@/app/types";
import PhonelinkEraseIcon from "@mui/icons-material/PhonelinkErase";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
const MobilePhoneUsage: React.FC = () => {
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<any>(null);
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());
  const MobilePhoneUsageKpiData = [
    {
      title: "Total Violations",
      value: "18", // Total mobile phone usage violations
      icon: PhoneIphone,
      trendColor: "#f44336",
      color: "#f44336",
      bgColor: "#ffebee",
      borderColor: "#f44336",
      iconBg: "rgba(244, 67, 54, 0.1)",

      tooltipMessage:
        "Total number of mobile phone usage violations detected in restricted areas.",
    },
    {
      title: "Latest Incidence",
      value: "10:30 AM", // Time of last violation detected
      icon: AccessTime,
      tooltipMessage:
        "The time when the most recent mobile phone usage violation was detected.",
    },
    {
      title: "Zone Detection",
      value: "Assembly Line", // Zone where latest violation detected
      icon: LocationOn,
      tooltipMessage:
        "The zone where the latest mobile phone usage violation was detected.",
    },
  ];
  const backendMobilePhoneData = [
    {
      id: 201,
      voilation: true,
      snapshot: "https://picsum.photos/400/200?random=11",
      zone: "Assembly Line",
      cameraid: "CAM-11",
      alarmTriggered: true,
      createdAt: "2025-09-23 16:42",
      updatedAt: "2025-09-23 16:43",
    },
    {
      id: 202,
      voilation: true,
      snapshot: "https://picsum.photos/400/200?random=12",
      zone: "Production Floor A",
      cameraid: "CAM-12",
      alarmTriggered: false,
      createdAt: "2025-09-23 16:50",
      updatedAt: "2025-09-23 16:51",
    },
    {
      id: 203,
      voilation: true,
      snapshot: "https://picsum.photos/400/200?random=13",
      zone: "Warehouse",
      cameraid: "CAM-13",
      alarmTriggered: false,
      createdAt: "2025-09-23 17:05",
      updatedAt: "2025-09-23 17:06",
    },
    {
      id: 204,
      voilation: true,
      snapshot: "https://picsum.photos/400/200?random=14",
      zone: "Main Entrance",
      cameraid: "CAM-14",
      alarmTriggered: true,
      createdAt: "2025-09-23 17:20",
      updatedAt: "2025-09-23 17:21",
    },
    {
      id: 205,
      voilation: true,
      snapshot: "https://picsum.photos/400/200?random=15",
      zone: "Parking Area",
      cameraid: "CAM-15",
      alarmTriggered: false,
      createdAt: "2025-09-23 17:35",
      updatedAt: "2025-09-23 17:36",
    },
  ];

  // Map backend data to recentViolations format
  const recentMobilePhoneViolations = backendMobilePhoneData.map((item) => {
    return {
      Voilation: item.voilation
        ? "Mobile phone usage detected"
        : "No violation",
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.cameraid,
      alarmTriggered: item.alarmTriggered,
    };
  });

  console.log("Recent Mobile Phone Violations", recentMobilePhoneViolations);

  // Zone violations structure
  const zoneViolationsData: ZoneViolationsdata[] = [
    { zone: "Assembly Line", violations: 1, alarms: 1 },
    { zone: "Production Floor A", violations: 1, alarms: 0 },
    { zone: "Warehouse", violations: 1, alarms: 0 },
    { zone: "Main Entrance", violations: 1, alarms: 1 },
    { zone: "Parking Area", violations: 1, alarms: 0 },
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
          <PhonelinkEraseIcon sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Mobile Phone Usage in Restricted Areas
          </Typography>
        </Box>
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
            MobilePhoneUsageKpiData.map((kpi) => (
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
            violations={recentMobilePhoneViolations}
            tooltipMessage="Latest 20 detected mobile phone usage violations with details."
            loading={false}
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

      {/* PPE Violations Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "Voilation", label: "Violation", minWidth: 150 },
          { id: "time", label: "Time", minWidth: 140 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "cameraId", label: "Camera ID", minWidth: 120 },

          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
        ]}
        data={recentMobilePhoneViolations}
        filters={[
          {
            id: "Voilation",
            label: "Violation",
            type: "select",
            options: ["Mobile phone usage detected", "No violation"],
          },
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(
              new Set(recentMobilePhoneViolations.map((v) => v.zone))
            ),
          },
          {
            id: "cameraId",
            label: "Camera ID",
            type: "select",
            options: Array.from(
              new Set(recentMobilePhoneViolations.map((v) => v.cameraId))
            ),
          },
          {
            id: "alarmTriggered",
            label: "Alarm Triggered",
            type: "select",
            options: ["True", "False"],
          },
          {
            id: "startDate",
            label: "Start Date",
            type: "date",
          },
          {
            id: "endDate",
            label: "End Date",
            type: "date",
          },
        ]}
        downloadFileName="mobile-phone-usage-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        loading={false}
        onView={handleViewSingle}
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
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

export default MobilePhoneUsage;
