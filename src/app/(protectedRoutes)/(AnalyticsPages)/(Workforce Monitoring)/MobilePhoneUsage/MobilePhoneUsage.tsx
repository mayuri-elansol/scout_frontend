"use client";
import React from "react";
import CameraStatus from "@/app/components/organisms/CameraStatus/CameraStatus";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Typography } from "@mui/material";
import { PhoneIphone, LocationOn, AccessTime } from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import { CameraZone } from "@/app/types";
import PhonelinkEraseIcon from "@mui/icons-material/PhonelinkErase";
const MobilePhoneUsage: React.FC = () => {
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());
  // const MobilePhoneUsageKpiData = [
  //     {
  //   title: "Total Violations Today",
  //   value: "18",

  //   icon: PhoneIphone,
  // },
  // {
  //   title: "Active Alarms",
  //   value: "5",

  //   icon: NotificationsActive,
  // },
  //    {
  //   title: "Most Affected Zone",
  //   value: "Assembly Line",

  //   icon: LocationOn,
  // },
  // {
  //   title: "Average Response Time",
  //   value: "2m 45s",

  //   icon: AccessTime,
  // },  {
  //   title: "Violations by Camera",
  //   value: "Camera 07",

  //   icon: Videocam,
  // },
  //   {
  //   title: "Peak Violation Hour",
  //   value: "2 PM - 3 PM",

  //   icon: Schedule,
  // },
  // ];

  const MobilePhoneUsageKpiData = [
    {
      title: "Total Violations",
      value: "18", // Total mobile phone usage violations
      icon: PhoneIphone, // 📱 Mobile phone
    },
    {
      title: "Latest Incidence",
      value: "10:30 AM", // Time of last violation detected
      icon: AccessTime, // ⏰ Time
    },
    {
      title: "Zone Detection",
      value: "Assembly Line", // Zone where latest violation detected
      icon: LocationOn, // 📍 Location/zone
    },
  ];
  const recentViolations = [
    {
      title: "Hard hat missing",
      zone: "Production Zone A",
      time: "14:32",
      Id: "W-4521",
      severity: "HIGH",
      status: "ACTIVE",
      imageUrl: "https://picsum.photos/400/200?random=1",
    },
    {
      title: "Safety vest not worn",
      zone: "Warehouse Zone B",
      time: "14:18",
      Id: "W-3847",
      severity: "MEDIUM",
      status: "ACKNOWLEDGED",
      imageUrl: "https://picsum.photos/400/200?random=2",
    },
  ];
  const cameraZones: CameraZone[] = [
    {
      zone: "Production Floor",
      active: 8,
      total: 10,
      offline: 3,
      tempred: 4,
    },
    { zone: "Warehouse", active: 3, total: 6, offline: 3, tempred: 4 },
    { zone: "Parking Area", active: 4, total: 5, offline: 1, tempred: 2 },
    { zone: "Main Entrance", active: 2, total: 3, offline: 1, tempred: 2 },
    { zone: "Assembly Line", active: 2, total: 4, offline: 1, tempred: 2 },
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
            violations={recentViolations}
            loading={false}
          />
        </Grid>
        {/* PPE Compliance by Zone */}

        <Grid size={{ xs: 12, lg: 4 }}>
          <CameraStatus cameraZones={cameraZones} loading={false} />
        </Grid>
      </Grid>

      {/* PPE Violations Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "id", label: "ID", minWidth: 100 },
          { id: "violation", label: "Violation", minWidth: 120 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "camera", label: "Camera", minWidth: 120 },
          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
          { id: "timestamp", label: "Timestamp", minWidth: 140 },
        ]}
        data={[
          {
            id: "MPU-001",
            violation: true,
            zone: "Assembly Line A",
            camera: "CAM-31",
            alarmTriggered: true,
            timestamp: "2025-09-24 09:12",
          },
          {
            id: "MPU-002",
            violation: false,
            zone: "Loading Dock",
            camera: "CAM-32",
            alarmTriggered: false,
            timestamp: "2025-09-24 09:20",
          },
          {
            id: "MPU-003",
            violation: true,
            zone: "Parking Lot",
            camera: "CAM-33",
            alarmTriggered: true,
            timestamp: "2025-09-24 09:35",
          },
          {
            id: "MPU-004",
            violation: false,
            zone: "Main Factory Floor",
            camera: "CAM-34",
            alarmTriggered: false,
            timestamp: "2025-09-24 09:50",
          },
        ]}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: [
              "Assembly Line A",
              "Loading Dock",
              "Parking Lot",
              "Main Factory Floor",
            ],
          },
          {
            id: "violation",
            label: "Violation",
            type: "select",
            options: ["true", "false"],
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
        downloadFileName="mobile-phone-usage-report"
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        loading={false}
        isDownload={true}
      />
    </Box>
  );
};

export default MobilePhoneUsage;
