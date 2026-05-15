"use client";
import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { PhoneIphone, LocationOn, AccessTime } from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import { getOneHourBefore } from "@/utils/getOneHrBefore";

const MobilePhoneUsage: React.FC = () => {
  interface ViolationData {
    voilation: string;
    zone: string;
    time: string;
    imageUrl: string;
    cameraId: string;
    alarmTriggered: boolean;
    [key: string]: string | number | boolean;
  }
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<ViolationData | null>(
    null,
  );
  const skeletonKeys = Array.from({ length: 4 }, () => uuidv4());
  const MobilePhoneUsageKpiData = [
    {
      title: "Total Violations",
      value: "3",
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
      value: getOneHourBefore().time,
      icon: AccessTime,
      tooltipMessage:
        "The time when the most recent mobile phone usage violation was detected.",
    },
    {
      title: "Zone Detection",
      value: "Zone A",
      icon: LocationOn,
      tooltipMessage:
        "The zone where the latest mobile phone usage violation was detected.",
    },
  ];
  const backendMobilePhoneData = [
    {
      id: 201,
      voilation: true,
      snapshot: "/img/mobile-usage-restricted-zones/m1.avif",
      zone: "Zone A",
      cameraid: "CAM-11",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 16:43",
    },
    {
      id: 202,
      voilation: true,
      snapshot: "/img/mobile-usage-restricted-zones/m2.jpg",
      zone: "Zone B",
      cameraid: "CAM-12",
      alarmTriggered: false,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 16:51",
    },
    {
      id: 203,
      voilation: true,
      snapshot: "/img/mobile-usage-restricted-zones/m3.png",
      zone: "Zone C",
      cameraid: "CAM-13",
      alarmTriggered: false,
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-09-23 17:06",
    },
  ];

  // Map backend data to recentViolations format
  const recentMobilePhoneViolations = backendMobilePhoneData.map((item) => {
    return {
      voilation: item.voilation
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

  const zoneViolationsData = [
    {
      zone: "Zone A",
      violations: 1,
    },
    {
      zone: "Zone B",
      violations: 1,
    },
    {
      zone: "Zone C",
      violations: 1,
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
  const handleViewSingle = (row: ViolationData) => {
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
              MobilePhoneUsageKpiData.map((kpi, index) => (
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
              violations={recentMobilePhoneViolations}
              tooltipMessage="Latest 20 detected mobile phone usage violations with details."
              loading={false}
            />
          </Grid>
          {/*  Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              violationsZone={zoneViolationsData}
              loading={false}
              tooltipMessage="Shows mobile phone usage violations per zone"
            />
          </Grid>
        </Grid>
      </Paper>
      {/*  Violations Report */}
      <ReportTable
        title="Detailed Report"
        columns={[
          { id: "voilation", label: "Violation", minWidth: 150 },
          { id: "time", label: "Time", minWidth: 140 },
          { id: "zone", label: "Zone", minWidth: 120 },
          { id: "cameraId", label: "Cameras", minWidth: 120 },

          { id: "alarmTriggered", label: "Alarm Triggered", minWidth: 140 },
        ]}
        data={recentMobilePhoneViolations}
        filters={[
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(
              new Set(recentMobilePhoneViolations.map((v) => v.zone)),
            ),
          },
          {
            id: "cameraId",
            label: "Cameras",
            type: "select",
            options: Array.from(
              new Set(recentMobilePhoneViolations.map((v) => v.cameraId)),
            ),
          },
          {
            id: "alarmTriggered",
            label: "Alarm Triggered",
            type: "select",
            options: ["True", "False"],
          },
          {
            id: "time",
            label: "Start Date",
            type: "date",
          },
          {
            id: "time",
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
        tooltipMessage="Detailed mobile phone usage  report with filter, reset, and CSV/PDF download options."
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

export default MobilePhoneUsage;
