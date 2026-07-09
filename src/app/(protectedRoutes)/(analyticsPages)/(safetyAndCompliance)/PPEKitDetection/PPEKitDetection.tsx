"use client";

import React, { useState } from "react";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import KpiCard from "@/app/components/molecules/KpiCard/KpiCard";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  Shield,
  Visibility,
  LocationOn,
  AccessTime,
  Checkroom,
} from "@mui/icons-material";
import RecentViolations from "@/app/components/molecules/RecentViolations/RecentViolations";
import KpiCardSkeleton from "@/app/components/molecules/KpiCardSkeleton/KpiCardSkeleton";
import { v4 as uuidv4 } from "uuid";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";

import { FilterParams } from "./PPEKitDetection.types";
import ViewAlertPopup from "@/app/components/molecules/ViewAlertPopup/ViewAlertPopup";
import ZoneViolations from "@/app/components/organisms/ZoneViolations/ZoneViolations";

import EngineeringIcon from "@mui/icons-material/Engineering";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export const getOneHourBefore = (): {
  fullDate: string;
  time: string;
} => {
  const date = new Date();

  // subtract exactly 1 hour
  date.setTime(date.getTime() - 60 * 60 * 1000);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return {
    fullDate: `${day}-${month}-${year} ${hours}:${minutes}`,
    time: `${hours}:${minutes}`,
  };
};
const PPEDetection: React.FC = () => {
  interface PPEViolation {
    voilation: string;
    zone: string;
    time: string;
    imageUrl: string;
    cameraId: string;
    alarmTriggered: boolean;
    [key: string]: string | number | boolean;
  }

  const [viewPopupOpen, setViewPopupOpen] = useState(false);
  const [viewPopupData, setViewPopupData] = useState<PPEViolation | null>(null);

  const skeletonKeys = Array.from({ length: 6 }, () => uuidv4());

  const ppeKpiData = [
    {
      title: "Total Violations",
      value: "87",
      icon: Shield,
      tooltipMessage:
        "Total number of PPE violations detected across all monitored zones.",
    },
    {
      title: "Current Unsafe Zone",
      value: "2",
      icon: LocationOn,
      tooltipMessage:
        "Number of zones where unsafe PPE compliance was detected.",
    },
    {
      title: "Last Detection Time",
      value: getOneHourBefore().time,
      icon: AccessTime,
      tooltipMessage: "The time when the last PPE violation was detected.",
    },
    {
      title: "Missing Helmet",
      value: "12",
      icon: EngineeringIcon,
      tooltipMessage:
        "Number of detected instances where workers were missing helmets.",
    },
    {
      title: "Missing Vest",
      value: "12",
      icon: Checkroom,
      tooltipMessage:
        "Number of detected instances where workers were missing safety vests.",
    },
    {
      title: "Missing Glasses",
      value: "9",
      icon: Visibility,
      tooltipMessage:
        "Number of detected instances where workers were missing safety glasses.",
    },
  ];

  const backendData = [
    {
      id: 101,
      helmet: false,
      vest: true,
      glasses: false,
      zone: "Production Floor A",
      snapshot: "/img/p1.jpg",
      cameraid: "CAM-01",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
    },
    {
      id: 102,
      helmet: true,
      vest: false,
      glasses: false,
      zone: "Welding Station",
      snapshot: "/img/p2.png",
      cameraid: "CAM-02",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
    },
    {
      id: 103,
      helmet: false,
      vest: true,
      glasses: false,
      zone: "Chemical Storage",
      snapshot: "/img/p3.avif",
      cameraid: "CAM-03",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
    },
    {
      id: 104,
      helmet: false,
      vest: true,
      glasses: false,
      zone: "Assembly Line B",
      snapshot: "/img/p2.png",
      cameraid: "CAM-04",
      alarmTriggered: false,
      createdAt: getOneHourBefore().fullDate,
    },
    {
      id: 105,
      helmet: false,
      vest: true,
      glasses: true,
      zone: "Maintenance Area",
      snapshot: "/img/p1.jpg",
      cameraid: "CAM-05",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
    },
    {
      id: 106,
      helmet: true,
      vest: false,
      glasses: false,
      zone: "Welding Station",
      snapshot: "/img/p2.png",
      cameraid: "CAM-02",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
    },

    {
      id: 108,
      helmet: false,
      vest: true,
      glasses: false,
      zone: "Production Floor A",
      snapshot: "/img/p1.jpg",
      cameraid: "CAM-01",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
    },
    {
      id: 109,
      helmet: true,
      vest: false,
      glasses: false,
      zone: "Welding Station",
      snapshot: "/img/p3.avif",
      cameraid: "CAM-02",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
    },
    {
      id: 107,
      helmet: true,
      vest: true,
      glasses: false,
      zone: "Chemical Storage",
      snapshot: "/img/p2.png",
      cameraid: "CAM-03",
      alarmTriggered: true,
      createdAt: getOneHourBefore().fullDate,
    },
  ];
  const recentViolations = backendData.map((item) => {
    const titleParts = [];

    if (item.helmet === false) titleParts.push("Hard hat missing");
    if (item.vest === false) titleParts.push("Safety vest not worn");
    if (item.glasses === false) titleParts.push("Safety glasses missing");

    return {
      voilation: titleParts.join(", ") ?? "No violation",
      zone: item.zone,
      time: item.createdAt,
      imageUrl: item.snapshot,
      cameraId: item.cameraid,
      alarmTriggered: item.alarmTriggered,
    };
  });

  console.log("RELCENTVOLATION DATAA", recentViolations);

  const zoneViolationsData = [
    {
      zone: "Production Floor A",
      violations: 8,
      subViolations: [
        { label: "Helmet", value: 3, icon: EngineeringIcon },
        { label: "Vest", value: 2, icon: CheckroomIcon },
        { label: "Glasses", value: 3, icon: VisibilityOffIcon },
      ],
    },
    {
      zone: "Welding Station",
      violations: 6,
      subViolations: [
        { label: "Helmet", value: 4, icon: EngineeringIcon },
        { label: "Glasses", value: 2, icon: VisibilityOffIcon },
      ],
    },
    {
      zone: "Chemical Storage",
      violations: 5,
      subViolations: [
        { label: "Vest", value: 2, icon: CheckroomIcon },
        { label: "Glasses", value: 3, icon: VisibilityOffIcon },
      ],
    },
    {
      zone: "Assembly Line B",
      violations: 7,
      subViolations: [
        { label: "Helmet", value: 2, icon: EngineeringIcon },
        { label: "Vest", value: 3, icon: CheckroomIcon },
        { label: "Glasses", value: 2, icon: VisibilityOffIcon },
      ],
    },
    {
      zone: "Warehouse",
      violations: 4,
      subViolations: [
        { label: "Helmet", value: 1, icon: EngineeringIcon },
        { label: "Vest", value: 2, icon: CheckroomIcon },
        { label: "Glasses", value: 1, icon: VisibilityOffIcon },
      ],
    },
    {
      zone: "Maintenance Area",
      violations: 9,
      subViolations: [
        { label: "Helmet", value: 4, icon: EngineeringIcon },
        { label: "Vest", value: 3, icon: CheckroomIcon },
        { label: "Glasses", value: 2, icon: VisibilityOffIcon },
      ],
    },
  ];

  const handleSubmitFilter = async (filters: FilterParams) => {
    console.log("Selected Filters:", filters);
  };

  const handleReset = () => {
    console.log("reset button clickedd");
  };

  const handleExport = (format: "csv" | "pdf") => {
    console.log("Export requested:", format);

    const fileName = format === "pdf" ? "ppe-report.pdf" : "ppe-report.csv";

    const fileUrl = `/reports/${fileName}`;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };
  const handleDownloadSingle = () => {
    console.log("download single row");
    const fileName = "ppe-single-report.pdf";

    const fileUrl = `/reports/${fileName}`;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };
const handleViewSingle = (row: Record<string, string | number | boolean>) => {
  const violation = row as PPEViolation; // or just use row directly if we know it has the needed properties
  setViewPopupData(violation);
  setViewPopupOpen(true);
};
  const KpiCardLoading = false;

  return (
    <Box>
      {/* KPI Cards */}
      <Paper sx={{ p: 3, mb: 0, backgroundColor: "#ffffff", borderRadius: 2 }}>
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

          <TimeFilter onRangeChange={function (range: { start: string; end: string; }): void {
            throw new Error("Function not implemented.");
          } } />
        </Box>
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
              ppeKpiData.map((kpi, index) => (
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
              tooltipMessage="Latest 20 detected PPE violations with details."
              label="Recent Violations"
              violations={recentViolations}
              loading={false}
            />
          </Grid>
          {/* PPE Compliance by Zone */}

          <Grid size={{ xs: 12, lg: 4 }}>
            <ZoneViolations
              //showSubViolations
              violationsZone={zoneViolationsData}
              loading={false}
              tooltipMessage="Shows PPE violations per zone"
            />
          </Grid>
        </Grid>
      </Paper>
      {/* PPE Violations Report */}
      <ReportTable
        title="Detailed Report"
        tooltipMessage="Detailed violations report with filter, reset, and CSV/PDF download options."
        columns={[
          { id: "voilation", label: "Violation" },
          { id: "time", label: "Time" },
          { id: "zone", label: "Zone" },
          { id: "cameraId", label: "Cameras" },
          { id: "alarmTriggered", label: "Alarm Triggered" },
        ]}
        data={recentViolations}
        filters={[
          {
            id: "voilation",
            label: "Violation",
            type: "select",

            options: [
              "Hard hat missing",
              "Safety vest not worn",
              "Safety glasses missing",
            ],
          },
          {
            id: "zone",
            label: "Zone",
            type: "select",
            options: Array.from(new Set(recentViolations.map((v) => v.zone))),
          },
          {
            id: "cameraId",
            label: "Cameras",
            type: "select",
            options: Array.from(
              new Set(recentViolations.map((v) => v.cameraId))
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
        onSubmit={handleSubmitFilter}
        onReset={handleReset}
        onExport={handleExport}
        onDownload={handleDownloadSingle}
        onView={handleViewSingle}
        downloadFileName="ppe-violations-report"
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

export default PPEDetection;
