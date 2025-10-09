"use client";

import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";

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
      value: "120",
      icon: FreeBreakfastIcon,
      tooltipMessage: "Total number of breakfasts served.",
    },
    {
      title: "Lunch Usage",
      value: "250",
      icon: LunchDiningIcon,
      tooltipMessage: "Total number of lunches served.",
    },
    {
      title: "Dinner Usage",
      value: "180",
      icon: DinnerDiningIcon,
      tooltipMessage: "Total number of dinners served.",
    },
    {
      title: "Total Canteen Usage",
      value: "550",
      icon: RestaurantIcon,
      tooltipMessage: "Total meals served in the canteen.",
    },
    {
      title: "Last Canteen Usage",
      value: "10.23 pm",
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
      snapshot: "https://picsum.photos/400/200?random=11",
      createdAt: "2025-10-09 08:15",
      updatedAt: "2025-10-09 08:20",
    },
    {
      id: 202,
      usage: "Lunch",
      count: 80,
      zone: "Main Canteen",
      snapshot: "https://picsum.photos/400/200?random=12",
      createdAt: "2025-10-09 12:30",
      updatedAt: "2025-10-09 12:35",
    },
    {
      id: 203,
      usage: "Dinner",
      count: 60,
      zone: "Main Canteen",
      snapshot: "https://picsum.photos/400/200?random=13",
      createdAt: "2025-10-09 19:00",
      updatedAt: "2025-10-09 19:05",
    },
    {
      id: 204,
      usage: "Breakfast",
      count: 30,
      zone: "Secondary Canteen",
      snapshot: "https://picsum.photos/400/200?random=14",
      createdAt: "2025-10-09 08:45",
      updatedAt: "2025-10-09 08:50",
    },
    {
      id: 205,
      usage: "Lunch",
      count: 70,
      zone: "Secondary Canteen",
      snapshot: "https://picsum.photos/400/200?random=15",
      createdAt: "2025-10-09 12:45",
      updatedAt: "2025-10-09 12:50",
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
      totalUsage: 190,
      subViolations: [
        { label: "Breakfast", value: 50, icon: FreeBreakfastIcon },
        { label: "Lunch", value: 80, icon: LunchDiningIcon },
        { label: "Dinner", value: 60, icon: DinnerDiningIcon },
      ],
    },
    {
      zone: "Secondary Canteen",
      totalUsage: 100,
      subViolations: [
        { label: "Breakfast", value: 30, icon: FreeBreakfastIcon },
        { label: "Lunch", value: 70, icon: LunchDiningIcon },
      ],
    },
    {
      zone: "VIP Canteen",
      totalUsage: 75,
      subViolations: [
        { label: "Breakfast", value: 25, icon: FreeBreakfastIcon },
        { label: "Lunch", value: 30, icon: LunchDiningIcon },
        { label: "Dinner", value: 20, icon: DinnerDiningIcon },
      ],
    },
    {
      zone: "Staff Canteen",
      totalUsage: 120,
      subViolations: [
        { label: "Breakfast", value: 40, icon: FreeBreakfastIcon },
        { label: "Lunch", value: 50, icon: LunchDiningIcon },
        { label: "Dinner", value: 30, icon: DinnerDiningIcon },
      ],
    },
    {
      zone: "Remote Canteen",
      totalUsage: 60,
      subViolations: [
        { label: "Breakfast", value: 20, icon: FreeBreakfastIcon },
        { label: "Lunch", value: 40, icon: LunchDiningIcon },
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
  const handleViewSingle = (row: CanteenUsage) => {
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
          <FastfoodIcon sx={{ fontSize: 28, color: "#1976d2" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            Monitoring Canteen Usage & Timings
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
          {/* Recent PPE Violations */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <RecentViolations
              label="Latest 20 canteen usage with details."
              violations={recentCanteenUsage}
              loading={false}
              tooltipMessage="recent voilation"
            />
          </Grid>
          {/* PPE Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              //showSubViolations
              violationsZone={zoneUsageData}
              loading={false}
              tooltipMessage="Shows canteen usage per zone"
            />
          </Grid>
        </Grid>
      </Paper>
      {/* PPE Violations Report */}
      <ReportTable
        title="Canteen Usage Report"
        tooltipMessage="Detailed canteen usage report with filters and export options."
        columns={[
          { id: "usage", label: "Usage Type" },
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

export default MonitoringCanteenUsageTimings;
