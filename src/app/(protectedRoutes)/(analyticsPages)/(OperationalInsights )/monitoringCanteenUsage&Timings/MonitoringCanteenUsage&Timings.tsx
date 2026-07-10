"use client";

import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import { getOneHourBefore } from "../../(safetyAndCompliance)/PPEKitDetection/PPEKitDetection";

const MonitoringCanteenUsageTimings: React.FC = () => {
  interface CanteenUsage {
    usage: string;
    count: number;
    zone: string;
    imageUrl: string;
    time: string;
    [key: string]: string | number | boolean;
  }
  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<CanteenUsage | null>(null);
  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());
  const canteenKpiCards = [
    {
      title: "Breakfast Usage",
      value: "5",
      icon: FreeBreakfastIcon,
      tooltipMessage: "Total number of breakfasts served.",
    },
    {
      title: "Lunch Usage",
      value: "16",
      icon: LunchDiningIcon,
      tooltipMessage: "Total number of lunches served.",
    },
    {
      title: "Dinner Usage",
      value: "0",
      icon: DinnerDiningIcon,
      tooltipMessage: "Total number of dinners served.",
    },
    {
      title: "Total Canteen Usage",
      value: "21",
      icon: RestaurantIcon,
      tooltipMessage: "Total meals served in the canteen.",
    },
    {
      title: "Last Canteen Usage",
      value: getOneHourBefore().time,
      icon: AccessTimeIcon,
      tooltipMessage: "Most recent canteen usage record.",
    },
  ];
  const backendData = [
    {
      id: 201,
      usage: "Breakfast",
      count: 50,
      zone: "Main Canteen",
      snapshot: "/img/canteen-usage-monitoring/c1.avif",
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-09 08:20",
    },
    {
      id: 202,
      usage: "Lunch",
      count: 80,
      zone: "Main Canteen",
      snapshot: "/img/canteen-usage-monitoring/c2.jpg",
      createdAt: getOneHourBefore().fullDate,
      updatedAt: "2025-10-09 12:35",
    },
  ];
  const recentCanteenUsage = backendData.map((item) => {
    return {
      usage: item.usage,
      count: item.count,
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
    };
  });

  const zoneUsageData = [
    {
      zone: "Main Canteen",
      totalUsage: 21,
      subViolations: [
        { label: "Breakfast", value: 5, icon: FreeBreakfastIcon },
        { label: "Lunch", value: 16, icon: LunchDiningIcon },
        { label: "Dinner", value: 0, icon: DinnerDiningIcon },
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
  const handleViewSingle = (row: Record<string, string | number | boolean>) => {
    console.log("view single row", row);
    setViewPopupData(row as CanteenUsage);
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

          <TimeFilter onRangeChange={function (range: { start: string; end: string; }): void {
            throw new Error("Function not implemented.");
          } } />
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
              canteenKpiCards.map((kpi, index) => (
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
              label="Recent Canteen Usage"
              violations={recentCanteenUsage}
              loading={false}
              tooltipMessage="recent voilation"
            />
          </Grid>
          {/*  Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              label="Canteen Usage"
              violationsZone={zoneUsageData}
              loading={false}
              tooltipMessage="Shows canteen usage per zone"
            />
          </Grid>
        </Grid>
      </Paper>
      {/* Violations Report */}
      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed canteen usage report with filters and export options."
        columns={[
          { id: "usage", label: "Canteen Usage" },
          { id: "count", label: "Count" },
          { id: "time", label: "Time" },
          { id: "zone", label: "Zone" },
        ]}
        data={recentCanteenUsage}
        filters={[
          {
            id: "usage",
            label: "Usage Type",
            type: "select",
            options: Array.from(
              new Set(recentCanteenUsage.map((v) => v.usage))
            ),
          },
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(new Set(recentCanteenUsage.map((v) => v.zone))),
          },

          { id: "time", label: "Start Date", type: "date" },
          { id: "time", label: "End Date", type: "date" },
        ]}
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        onDownload={handleDownloadSingle}
        onView={handleViewSingle}
        downloadFileName="canteen-usage-report"
        loading={false} totalCount={0} page={0} rowsPerPage={0}      />
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

export default MonitoringCanteenUsageTimings;