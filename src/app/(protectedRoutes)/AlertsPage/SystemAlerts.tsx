// "use client";
// import React from "react";
// import { Box, Typography, Grid } from "@mui/material";
// import { Warning, Circle } from "@mui/icons-material";
// import AlertStatsCard from "../../components/molecules/AlertStatsCard/AlertStatsCard";
// import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
// // 🔹 Types
// interface FilterParams {
//   status?: string;
//   employeeName?: string;
//   startDate?: string;
//   endDate?: string;
// }

// // 🔹 Common column + filter configs (avoid repetition)
// const reportColumns = [
//   { id: "violationId", label: "Violation ID", minWidth: 120 },
//   { id: "timestamp", label: "Timestamp", minWidth: 80 },
//   { id: "zone", label: "Zone", minWidth: 120 },
//   { id: "employeeId", label: "Employee ID", minWidth: 120 },
//   { id: "violationType", label: "Violation Type", minWidth: 150 },
// ];
// type FilterType = "text" | "select" | "date";

// interface ReportFilter {
//   id: string;
//   label: string;
//   type: FilterType;
//   options?: string[];
// }

// const reportFilters: ReportFilter[] = [
//   { id: "name", label: "Search Name", type: "text" },
//   {
//     id: "employeeId",
//     label: "Employee",
//     type: "select",
//     options: ["David Kim", "Missing", "Resolved"],
//   },
//   { id: "createdAt", label: "Start Date", type: "date" },
//   { id: "resolvedAt", label: "End Date", type: "date" },
// ];

// // 🔹 Dummy data
// const sampleData = [
//   {
//     violationId: "PPE-7892",
//     timestamp: "15:42",
//     zone: "Production Floor A",
//     employeeId: "John Mitchell",
//     violationType: "Missing Hard Hat",
//   },
//   {
//     violationId: "PPE-7891",
//     timestamp: "15:28",
//     zone: "Welding Station",
//     employeeId: "Lisa Anderson",
//     violationType: "Improper Safety Glasses",
//   },
//   {
//     violationId: "PPE-7890",
//     timestamp: "15:15",
//     zone: "Chemical Storage",
//     employeeId: "Sarah Chen",
//     violationType: "Missing Safety Gloves",
//   },
// ];

// const SystemAlerts: React.FC = () => {
//   // 🔹 Alert stats
//   const alertStats = [
//     {
//       value: "0",
//       label: "Total Alerts",
//     },
//     {
//       value: "2",
//       label: "Safety and Compliances",
//     },
//     {
//       value: "3",
//       label: "Security Monitoring",
//     },
//     {
//       value: "2",
//       label: "Workforce Monitoring",
//     },
//     {
//       value: "3",
//       label: "Operational Insight",
//     },
//     {
//       value: "3",
//       label: "Facial Recognition",
//     },
//   ];

//   // 🔹 Handlers
//   const handleSubmitFilter = async (filters: FilterParams) => {
//     console.log("Selected Filters:", filters);
//   };

//   const handleReset = () => {
//     console.log("Reset clicked");
//   };

//   const handleExport = (format: "csv" | "pdf") => {
//     console.log("Export requested:", format);
//   };

//   return (
//     <Box>
//       {/* Page Header */}
//       <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//           <Warning sx={{ fontSize: 28, color: "#f44336" }} />
//           <Typography
//             variant="h4"
//             sx={{ fontWeight: "bold", color: "#1c2025" }}
//           >
//             System Alerts & Notifications
//           </Typography>
//         </Box>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Circle sx={{ fontSize: 8, color: "#4caf50" }} />
//           <Typography sx={{ fontSize: "12px", color: "#666" }}>
//             Real-time monitoring
//           </Typography>
//           <Typography sx={{ fontSize: "12px", color: "#999", ml: 2 }}>
//             Last updated: 3:53:18 PM
//           </Typography>
//         </Box>
//       </Box>

//       {/* Alert Statistics */}
//       <Grid container spacing={2} sx={{ mb: 1 }}>
//         {alertStats.map((stat) => (
//           <Grid
//             key={stat.label}
//             size={{ xs: 12, sm: 6, md: 2 }}
//             sx={{ display: "flex" }}
//           >
//             <AlertStatsCard {...stat} />
//           </Grid>
//         ))}
//       </Grid>

//       {/* Alert Details Section */}
//       <Box sx={{ mb: "-91px" }}>
//         <Grid container spacing={0}>
//           {/* Left table */}
//           <Grid size={{ xs: 12, md: 12 }} sx={{ mb: "-12px" }}>
//             <ReportTable
//               title="Safety and Compliances Alerts"
//               columns={reportColumns}
//               data={sampleData}
//               filters={reportFilters}
//               onSubmit={handleSubmitFilter}
//               onReset={handleReset}
//               onExport={handleExport}
//               downloadFileName="safety-alerts"
//               loading={false}
//               isDownload={false}
//             />
//           </Grid>

//           {/* Right table */}
//           <Grid size={{ xs: 12, md: 12 }}>
//             <ReportTable
//               title="Security Monitoring Alerts"
//               columns={reportColumns}
//               data={sampleData}
//               filters={reportFilters}
//               onSubmit={handleSubmitFilter}
//               onReset={handleReset}
//               onExport={handleExport}
//               downloadFileName="security-alerts"
//               loading={false}
//               isDownload={false}
//             />
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default SystemAlerts;

"use client";
import React, { useState } from "react";
import { Box, Typography, Grid, Tabs, Tab, Paper, Divider } from "@mui/material";
import { Warning, Circle, DirectionsCar } from "@mui/icons-material";
import AlertStatsCard from "../../components/molecules/AlertStatsCard/AlertStatsCard";
import ReportTable from "@/app/components/organisms/ReportTable/ReportTable";
import SafetyIcon from "@mui/icons-material/Shield";
import Visibility from "@mui/icons-material/Visibility";
import WorkforceIcon from "@mui/icons-material/People";
import FaceRecognitionIcon from "@mui/icons-material/CenterFocusWeak";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";

// 🔹 Types
interface FilterParams {
  status?: string;
  employeeName?: string;
  startDate?: string;
  endDate?: string;
}

type FilterType = "text" | "select" | "date";

interface ReportFilter {
  id: string;
  label: string;
  type: FilterType;
  options?: string[];
}

const reportColumns = [
  { id: "useCaseType", label: "Use Case Type", minWidth: 120 },
  { id: "detectionTime", label: "Timestamp", minWidth: 80 },
  { id: "zone", label: "Zone", minWidth: 120 },
  { id: "camera", label: "Camera", minWidth: 120 },
  // { id: "violationType", label: "Violation Type", minWidth: 150 },
];

const reportFilters: ReportFilter[] = [
  {
    id: "useCaseType",
    label: "Use Case Type",
    type: "select",
    options: [
      "PPE Detection",
      "Object Detection",
      "Fire/Smoke/Oil/Gas",
      "Vehicle Speed Monitoring",
      "Fall Detection",
      "STP/ETP Overflow Detection",
      "Emergency Exit Blockage",
      "Crowd Gathering",
    ],
  },

  {
    id: "zone",
    label: "Zone",
    type: "select",
    options: [
      "Zone A",
      "Walking Bay 3",
      "Zone B",
      "Zone C",
      "Entry Gate 2",
      "STP Area",
      "Exit Zone 1",
      "Hazard Zone 4",
    ],
  },
  {
    id: "camera",
    label: "Camera",
    type: "select",
    options: [
      "Camera-01",
      "Camera-02",
      "Camera-03",
      "Camera-04",
      "Camera-05",
      "Camera-07",
      "Camera-08",
      "Camera-09",
    ],
  },
  { id: "startDate", label: "Start Date", type: "date" },
  { id: "endDate", label: "End Date", type: "date" },
];

// 🔹 Dummy data
const sampleData = [
  {
    id: "SC-001",
    useCaseType: "PPE Detection",
    detectionTime: "2025-09-24 08:15",
    severity: "High",
    status: "Pending",
    zone: "Zone A",
    camera: "Camera-01",
    snapshot: "https://example.com/snapshot1.jpg",
  },
  {
    id: "SC-002",
    useCaseType: "Object Detection",
    detectionTime: "2025-09-24 09:20",
    severity: "Medium",
    status: "Resolved",
    zone: "Walking Bay 3",
    camera: "Camera-04",
    snapshot: "https://example.com/snapshot2.jpg",
  },
  {
    id: "SC-003",
    useCaseType: "Fire/Smoke/Oil/Gas",
    detectionTime: "2025-09-24 10:05",
    severity: "High",
    status: "Pending",
    zone: "Zone C",
    camera: "Camera-02",
    snapshot: "https://example.com/snapshot3.jpg",
  },
  {
    id: "SC-004",
    useCaseType: "Vehicle Speed Monitoring",
    detectionTime: "2025-09-24 10:45",
    severity: "Low",
    status: "Resolved",
    zone: "Entry Gate 2",
    camera: "Camera-07",
    snapshot: "https://example.com/snapshot4.jpg",
  },
  {
    id: "SC-005",
    useCaseType: "Fall Detection",
    detectionTime: "2025-09-24 11:30",
    severity: "High",
    status: "Pending",
    zone: "Zone B",
    camera: "Camera-05",
    snapshot: "https://example.com/snapshot5.jpg",
  },
  {
    id: "SC-006",
    useCaseType: "STP/ETP Overflow Detection",
    detectionTime: "2025-09-24 12:15",
    severity: "Medium",
    status: "In Progress",
    zone: "STP Area",
    camera: "Camera-08",
    snapshot: "https://example.com/snapshot6.jpg",
  },
  {
    id: "SC-007",
    useCaseType: "Emergency Exit Blockage",
    detectionTime: "2025-09-24 12:50",
    severity: "High",
    status: "Pending",
    zone: "Exit Zone 1",
    camera: "Camera-03",
    snapshot: "https://example.com/snapshot7.jpg",
  },
  {
    id: "SC-008",
    useCaseType: "Crowd Gathering",
    detectionTime: "2025-09-24 13:20",
    severity: "High",
    status: "In Progress",
    zone: "Hazard Zone 4",
    camera: "Camera-09",
    snapshot: "https://example.com/snapshot8.jpg",
  }
];

const SystemAlerts: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  // 🔹 Alert stats
  const alertStats = [
    { value: "0", label: "Total Alerts" },
    { value: "2", label: "Safety and Compliances" },
    { value: "3", label: "Security Monitoring" },
    { value: "2", label: "Workforce Monitoring" },
    { value: "3", label: "Operational Insight" },
    { value: "3", label: "Facial Recognition" },
  ];

  // 🔹 Table Configs (avoid repetition)

  const alertTables = [
    { key: "safety", label: "Safety and Compliances Alerts", icon: <SafetyIcon /> },
    { key: "security", label: "Surveillance Monitoring Alerts", icon: <Visibility /> },
    { key: "workforce", label: "Workforce Monitoring Alerts", icon: <WorkforceIcon /> },
    { key: "operational", label: "Vehicle Operational Insight Alerts", icon: <DirectionsCar /> },
    { key: "facial", label: "Facial Recognition Alerts", icon: <FaceRecognitionIcon /> },
  ];

  // 🔹 Handlers
  const handleSubmitFilter = async (filters: FilterParams) => {
    console.log("Selected Filters:", filters);
  };

  const handleReset = () => {
    console.log("Reset clicked");
  };

  const handleExport = (format: "csv" | "pdf") => {
    console.log("Export requested:", format);
  };

  return (
    <Paper sx={{ pl: 3, pr: 3, pb: 3, pt: 2, mt: 1.2, mb: 4, borderRadius: 2, backgroundColor: "#ffffff" }}>
      {/* Page Header */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Warning sx={{ fontSize: 28, color: "#f44336" }} />
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1c2025" }}
          >
            System Alerts & Notifications
          </Typography>
        </Box>
        <TimeFilter />
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Circle sx={{ fontSize: 8, color: "#4caf50" }} />
          <Typography sx={{ fontSize: "12px", color: "#666" }}>
            Real-time monitoring
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#999", ml: 2 }}>
            Last updated: 3:53:18 PM
          </Typography>
        </Box> */}
      </Box>

      {/* Alert Statistics */}
      <Grid container spacing={2} sx={{ mb: 6 }}>
        {alertStats.map((stat) => (
          <Grid
            key={stat.label}
            size={{ xs: 12, sm: 6, md: 2 }}

            sx={{ display: "flex" }}
          >
            <AlertStatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Tab Section */}
      <Box>
        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: -4,
            pl: 1.2,
            // pr: 2,
            minHeight: 36,
            "& .MuiTabs-indicator": {
              bottom: 0,
              height: 2,
            },
            pr: 0,
          }}
        >
          {alertTables.map((t, i) => (
            <Tab
              key={t.key}
              label={t.label}
              icon={t.icon}
              iconPosition="start"
              sx={{
                display: "flex",
                fontWeight: tabIndex === i ? "bold" : "normal",
                textTransform: "none",
                fontSize: 16,
                minHeight: 36,
                py: 2,
                "&.MuiTab-root": {
                  alignItems: "center",
                },
                boxShadow: tabIndex === i ? "none" : "0 3px 8px rgba(0,0,0,0.15)",

              }}
            />


          ))}
        </Tabs>

        {/* Render only selected table */}
        {alertTables.map(
          (t, i) =>
            tabIndex === i && (
              <ReportTable
                key={t.key}
                title={t.label}
                columns={reportColumns}
                data={sampleData}
                filters={reportFilters}
                onSubmit={handleSubmitFilter}
                onReset={handleReset}
                onExport={handleExport}
                downloadFileName={`${t.key}-alerts`}
                loading={false}


              />
            )
        )}
      </Box>
    </Paper>
  );
};

export default SystemAlerts;
