// "use client";
// import React from "react";
// import { Box, Grid, Paper } from "@mui/material";
// import {
//   VideocamOutlined,
//   WifiOff,
//   WarningAmber,
//   Domain,
//   WifiTethering,
// } from "@mui/icons-material";
// import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";
// import DashboardTabs, {
//   TabConfig,
// } from "@/app/components/organisms/DashboardTabs/DashboardTabs";
// import DynamicBarChart from "@/app/components/organisms/BarChart/BarChart";
// import { v4 as uuidv4 } from "uuid";
// import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
// import CameraStatusDonutChart from "@/app/components/organisms/DonutChart/DonutChart";

// // -------------------- KPI DATA --------------------
// const kpiData = [
//   {
//     title: "Total Cameras",
//     violationsCount: 120,
//     lastDetection: "System Overview",
//     lastDetectionTime: "—",
//     icon: VideocamOutlined,
//     tooltipMessage:
//       "Total number of surveillance cameras connected to the system.",
//   },
//   {
//     title: "Cameras Online",
//     violationsCount: 105,
//     lastDetection: "Last Updated",
//     lastDetectionTime: "10:15 AM",
//     icon: WifiTethering,
//     tooltipMessage: "Number of cameras currently active and transmitting data.",
//   },
//   {
//     title: "Cameras Offline",
//     violationsCount: 15,
//     lastDetection: "Zone C - Entry Gate",
//     lastDetectionTime: "09:45 AM",
//     icon: WifiOff,
//     tooltipMessage: "Shows cameras currently not transmitting video feed.",
//   },
//   {
//     title: "Tampering Incidents Today",
//     violationsCount: 12,
//     lastDetection: "Zone B - Warehouse",
//     lastDetectionTime: "09:58 AM",
//     icon: WarningAmber,
//     tooltipMessage:
//       "Number of tampering incidents (blurred, covered, or offline) detected today.",
//   },
//   {
//     title: "Zones Affected",
//     violationsCount: 4,
//     lastDetection: "Zones B, C, D",
//     lastDetectionTime: "—",
//     icon: Domain,
//     tooltipMessage:
//       "Total number of zones currently affected by camera issues.",
//   },
// ];

// // -------------------- SAMPLE DATA --------------------

// const tamperingTrendData = [
//   { time: "00:00", offline: 3, blur: 2, lensCovered: 1 },
//   { time: "01:00", offline: 2, blur: 1, lensCovered: 1 },
//   { time: "02:00", offline: 4, blur: 2, lensCovered: 2 },
//   { time: "03:00", offline: 5, blur: 3, lensCovered: 2 },
//   { time: "04:00", offline: 3, blur: 2, lensCovered: 1 },
//   { time: "05:00", offline: 2, blur: 1, lensCovered: 1 },
//   { time: "06:00", offline: 4, blur: 2, lensCovered: 2 },
//   { time: "07:00", offline: 5, blur: 3, lensCovered: 3 },
//   { time: "08:00", offline: 6, blur: 4, lensCovered: 3 },
//   { time: "09:00", offline: 7, blur: 4, lensCovered: 4 },
//   { time: "10:00", offline: 5, blur: 3, lensCovered: 2 },
//   { time: "11:00", offline: 3, blur: 2, lensCovered: 2 },
//   { time: "12:00", offline: 4, blur: 2, lensCovered: 1 },
//   { time: "13:00", offline: 5, blur: 3, lensCovered: 2 },
//   { time: "14:00", offline: 6, blur: 4, lensCovered: 3 },
//   { time: "15:00", offline: 4, blur: 2, lensCovered: 1 },
//   { time: "16:00", offline: 3, blur: 1, lensCovered: 1 },
//   { time: "17:00", offline: 5, blur: 3, lensCovered: 2 },
//   { time: "18:00", offline: 7, blur: 4, lensCovered: 3 },
//   { time: "19:00", offline: 6, blur: 3, lensCovered: 2 },
//   { time: "20:00", offline: 4, blur: 2, lensCovered: 1 },
//   { time: "21:00", offline: 3, blur: 1, lensCovered: 1 },
//   { time: "22:00", offline: 2, blur: 1, lensCovered: 1 },
//   { time: "23:00", offline: 3, blur: 2, lensCovered: 1 },
// ];

// const tamperingTypeData = [
//   { label: "Offline", value: 40, color: "#ffcdd2" },
//   { label: "Blur", value: 25, color: "#FFEAA7" },
//   { label: "Lens Covered", value: 15, color: "#A8E6CF" },
//   { label: "Online", value: 20, color: "#B3E5FC" },
// ];

// const cameraHealth = [
//   { zone: "Gate 1", online: 6, offline: 1, tampered: 2 },
//   { zone: "Warehouse", online: 4, offline: 2, tampered: 3 },
//   { zone: "Office", online: 7, offline: 0, tampered: 1 },
//   { zone: "Parking", online: 5, offline: 1, tampered: 2 },
// ];

// const cameraUptimeDowntimeData = [
//   { camera: "CAM-001", downtime: 92, uptime: 8 },
//   { camera: "CAM-002", downtime: 95, uptime: 5 },
//   { camera: "CAM-003", downtime: 90, uptime: 10 },
//   { camera: "CAM-004", downtime: 97, uptime: 3 },
//   { camera: "CAM-005", downtime: 94, uptime: 6 },
//   { camera: "CAM-006", downtime: 91, uptime: 9 },
//   { camera: "CAM-007", downtime: 89, uptime: 11 },
//   { camera: "CAM-008", downtime: 96, uptime: 4 },
//   { camera: "CAM-009", downtime: 93, uptime: 7 },
//   { camera: "CAM-010", downtime: 98, uptime: 2 },
// ];

// // -------------------- MAIN DASHBOARD --------------------
// export default function CameraTamperingDashboard() {
//   const tabs: TabConfig[] = [
//     {
//       label: "Tampering Trend",
//       content: (
//         // <Grid
//         //   container
//         //   sx={{
//         //     alignItems: "stretch",
//         //     height: "100%",
//         //   }}
//         // >
//         //   {/* Left side: Bar chart */}
//         //   <Box
//         //     sx={{
//         //       flex: 1,
//         //       width: "100%",
//         //       height: "100%",
//         //       display: "flex",
//         //       "& .MuiCardContent-root": {
//         //         height: "100%",
//         //       },
//         //     }}
//         //   >
// <DynamicBarChart
//   data={tamperingTrendData}
//   xAxisKey="time"
//   series={[
//     { dataKey: "offline", label: "Offline", color: "#ffcdd2" },
//     { dataKey: "blur", label: "Blur", color: "#FFEAA7" },
//     {
//       dataKey: "lensCovered",
//       label: "Lens Covered",
//       color: "#A8E6CF",
//     },
//   ]}
//   yAxisLabel="Incident Count"
// />
//         //   </Box>

//         //   {/* 2) shows the donut chart for the camera status distrubtion */}
//         //   <Grid
//         //     size={{ xs: 12, md: 4 }}
//         //     sx={{
//         //       display: "flex",
//         //       alignItems: "center",
//         //       justifyContent: "center",
//         //       height: "100%",
//         //     }}
//         //   >
//         //     <Box
//         //       sx={{
//         //         width: "100%",
//         //         height: "100%",
//         //         display: "flex",
//         //         alignItems: "center",
//         //         justifyContent: "center",
//         //       }}
//         //     >
//         //       <CameraStatusDonutChart data={tamperingTypeData} />
//         //     </Box>
//         //   </Grid>
//         // </Grid>

//         <Grid
//           container
//           sx={{
//             alignItems: "stretch",
//             height: "100%",
//           }}
//         >
//           {/* Left side */}
//           <Grid
//             size={{ xs: 12, md: 8 }}
//             sx={{
//               display: "flex",
//               height: { xs: "50vh", md: "100%" },
//               width: "100%",
//               "& .MuiCardContent-root": {
//                 height: "100%",
//               },
//             }}
//           >
//             <DynamicBarChart
//               data={tamperingTrendData}
//               xAxisKey="time"
//               series={[
//                 { dataKey: "offline", label: "Offline", color: "#ffcdd2" },
//                 { dataKey: "blur", label: "Blur", color: "#FFEAA7" },
//                 {
//                   dataKey: "lensCovered",
//                   label: "Lens Covered",
//                   color: "#A8E6CF",
//                 },
//               ]}
//               yAxisLabel="Incident Count"
//             />
//           </Grid>

//           {/* Right side*/}
//           <Grid
//             size={{ xs: 12, md: 4 }}
//             sx={{
//               display: "flex",

//               flexDirection: { xs: "row", md: "column" },
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: { xs: "wrap", md: "nowrap" },
//               gap: 2,
//               p: { xs: 1, md: 0 },
//               height: { xs: "40vh", md: "100%" },
//               width: "100%",
//             }}
//           >
//             {/* First Pie Chart */}
//             <Box
//               sx={{
//                 flex: 1,
//                 minWidth: { xs: "50%", md: "100%" },
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: { xs: 140, md: "50%" },
//               }}
//             >
//               <CameraStatusDonutChart data={tamperingTypeData} />
//             </Box>
//           </Grid>
//         </Grid>
//       ),
//     },

//     {
//       label: "Camera Downtime",
//       content: (
//         <Box
//           sx={{
//             flex: 1,
//             width: "100%",
//             height: "100%",
//             display: "flex",
//             "& .MuiCardContent-root": {
//               height: "100%",
//             },
//           }}
//         >
//           <DynamicBarChart
//             data={cameraUptimeDowntimeData}
//             xAxisKey="camera"
//             series={[
//               {
//                 dataKey: "uptime",
//                 label: "Uptime %",
//                 color: "#A8E6CF",
//               },
//               {
//                 dataKey: "downtime",
//                 label: "Downtime %",
//                 color: "#ffcdd2",
//               },
//             ]}
//             yAxisLabel="Percentage (%)"
//           />
//         </Box>
//       ),
//     },
//     {
//       label: "Camera Status by Zone",
//       content: (
//         <Box
//           sx={{
//             flex: 1,
//             width: "100%",
//             height: "100%",
//             display: "flex",
//             "& .MuiCardContent-root": {
//               height: "100%",
//             },
//           }}
//         >
//           <DynamicBarChart
//             data={cameraHealth}
//             xAxisKey="zone"
//             series={[
//               { dataKey: "online", label: "Online", color: "#A8E6CF" },
//               { dataKey: "offline", label: "Offline", color: "#ffcdd2" },
//               { dataKey: "tampered", label: "Tampered", color: "#FFEAA7" },
//             ]}
//             yAxisLabel="Cameras"
//           />
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Paper
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         pt: 2,
//         px: 3,
//         backgroundColor: "#ffffff",
//         borderRadius: 2,
//         flex: 1,
//         // minHeight: 0,

//         minHeight: { xs: "auto", sm: "auto", md: 0 },
//       }}
//     >
//       {/* Top Right Time Filter */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "end",
//           flexWrap: "wrap",
//           mb: 2,
//         }}
//       >
//         <TimeFilter onRangeChange={() => console.log("on range chnaged")} />
//       </Box>

//       {/* KPI Cards Grid */}
//       <Grid container spacing={1.5} sx={{ mb: 2 }} alignItems="stretch">
//         {kpiData.map((kpi, index) => (
//           <Grid
//             size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
//             key={uuidv4() + index}
//           >
//             <DashboardKpiCard {...kpi} />
//           </Grid>
//         ))}
//       </Grid>

//       {/* Tabs Section */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           flex: 1,
//           minHeight: 0,

//           //  minHeight: { xs: "500px", sm: "600px", md: 0 },
//         }}
//       >
//         <DashboardTabs tabs={tabs} />
//       </Box>
//     </Paper>
//   );
// }

"use client";
import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import {
  VideocamOutlined,
  WifiOff,
  WarningAmber,
  Domain,
  WifiTethering,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

import DashboardKpiCard from "@/app/components/molecules/DashboardKpiCard/DashboardKpiCard";
import DashboardTabs, {
  TabConfig,
} from "@/app/components/organisms/DashboardTabs/DashboardTabs";
import DynamicBarChart from "@/app/components/organisms/BarChart/BarChart";
import TimeFilter from "@/app/components/organisms/TimeFilterForAllKPI/TimeFilter";
import CameraStatusDonutChart from "@/app/components/organisms/DonutChart/DonutChart";

/* -------------------- KPI DATA -------------------- */
const kpiData = [
  {
    title: "Total Cameras",
    violationsCount: 120,
    lastDetection: "System Overview",
    lastDetectionTime: "—",
    icon: VideocamOutlined,
  },
  {
    title: "Cameras Online",
    violationsCount: 105,
    lastDetection: "Last Updated",
    lastDetectionTime: "10:15 AM",
    icon: WifiTethering,
  },
  {
    title: "Cameras Offline",
    violationsCount: 15,
    lastDetection: "Zone C - Entry Gate",
    lastDetectionTime: "09:45 AM",
    icon: WifiOff,
  },
  {
    title: "Tampering Incidents Today",
    violationsCount: 12,
    lastDetection: "Zone B - Warehouse",
    lastDetectionTime: "09:58 AM",
    icon: WarningAmber,
  },
  {
    title: "Zones Affected",
    violationsCount: 4,
    lastDetection: "Zones B, C, D",
    lastDetectionTime: "—",
    icon: Domain,
  },
];

/* -------------------- DATA -------------------- */

// Tampering trend
const tamperingTrendData = [
  { time: "00:00", offline: 3, blur: 2, lensCovered: 1 },
  { time: "06:00", offline: 4, blur: 2, lensCovered: 2 },
  { time: "12:00", offline: 5, blur: 3, lensCovered: 2 },
  { time: "18:00", offline: 7, blur: 4, lensCovered: 3 },
];

// Donut
const tamperingTypeData = [
  { label: "Offline", value: 40, color: "#ffcdd2" },
  { label: "Blur", value: 25, color: "#FFEAA7" },
  { label: "Lens Covered", value: 15, color: "#A8E6CF" },
  { label: "Online", value: 20, color: "#B3E5FC" },
];

// Camera uptime / downtime (TOP 10)
const cameraUptimeDowntimeData = [
  { camera: "CAM-001", uptime: 92, downtime: 8 },
  { camera: "CAM-002", uptime: 95, downtime: 5 },
  { camera: "CAM-003", uptime: 90, downtime: 10 },
  { camera: "CAM-004", uptime: 97, downtime: 3 },
  { camera: "CAM-005", uptime: 94, downtime: 6 },
  { camera: "CAM-006", uptime: 91, downtime: 9 },
  { camera: "CAM-007", uptime: 89, downtime: 11 },
  { camera: "CAM-008", uptime: 96, downtime: 4 },
  { camera: "CAM-009", uptime: 93, downtime: 7 },
  { camera: "CAM-010", uptime: 98, downtime: 2 },
];

// Zone-wise camera counts
const cameraHealthByZone = [
  { zone: "Parking", online: 5, offline: 3, tampered: 2 },
  { zone: "Warehouse", online: 4, offline: 2, tampered: 3 },
  { zone: "Office", online: 7, offline: 0, tampered: 1 },
  { zone: "Gate 1", online: 6, offline: 1, tampered: 2 },
];

/* -------------------- MAIN COMPONENT -------------------- */
export default function CameraTamperingDashboard() {
  const tabs: TabConfig[] = [
    /* ---------- TAB 1 ---------- */

    {
      label: "Tampering Trend",
      content: (
        <Grid
          container
          sx={{
            height: "100%",
            minHeight: 0,
            alignItems: "stretch",
          }}
        >
          {/* Left chart */}
          <Grid
            size={{ xs: 12, md: 8 }}
            sx={{
              display: "flex",
              minHeight: 0,
            }}
          >
            <DynamicBarChart
              data={tamperingTrendData}
              xAxisKey="time"
              series={[
                { dataKey: "offline", label: "Offline", color: "#ffcdd2" },
                { dataKey: "blur", label: "Blur", color: "#FFEAA7" },
                {
                  dataKey: "lensCovered",
                  label: "Lens Covered",
                  color: "#A8E6CF",
                },
              ]}
              yAxisLabel="Incident Count"
            />
          </Grid>

          {/* Right donut */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 0,
            }}
          >
            <CameraStatusDonutChart data={tamperingTypeData} />
          </Grid>
        </Grid>
      ),
    },
    /* ---------- TAB 2 ---------- */
    {
      label: "Camera Downtime (Top 10)",
      content: (
        <Grid container sx={{ height: "100%", minHeight: 0 }}>
          <Grid
            size={{ xs: 12 }}
            sx={{ display: "flex", height: "100%", minHeight: 0 }}
          >
            <DynamicBarChart
              data={cameraUptimeDowntimeData}
              xAxisKey="camera"
              series={[
                {
                  dataKey: "uptime",
                  label: "Uptime %",
                  color: "#A8E6CF",
                },
                {
                  dataKey: "downtime",
                  label: "Downtime %",
                  color: "#ffcdd2",
                },
              ]}
              yAxisLabel="Percentage (%)"
            />
          </Grid>
        </Grid>
      ),
    },

    /* ---------- TAB 3 ---------- */
    {
      label: "Zone-wise Camera Status",
      content: (
        <Grid container sx={{ height: "100%", minHeight: 0 }}>
          <Grid
            size={{ xs: 12 }}
            sx={{ display: "flex", height: "100%", minHeight: 0 }}
          >
            <DynamicBarChart
              data={cameraHealthByZone}
              xAxisKey="zone"
              series={[
                {
                  dataKey: "online",
                  label: "Online",
                  color: "#A8E6CF",
                },
                {
                  dataKey: "offline",
                  label: "Offline",
                  color: "#ffcdd2",
                },
                {
                  dataKey: "tampered",
                  label: "Tampered",
                  color: "#FFEAA7",
                },
              ]}
              yAxisLabel="Camera Count"
            />
          </Grid>
        </Grid>
      ),
    },
  ];

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: 0, // ✅ allow shrinking
        overflow: "hidden", // ✅ prevent runaway growth
      }}
    >
      {/* Top Right Time Filter */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <TimeFilter onRangeChange={() => console.log("on range chnaged")} />
      </Box>

      {/* KPI Cards Grid */}
      <Grid container spacing={1.5} sx={{ mb: 2 }} alignItems="stretch">
        {kpiData.map((kpi, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }}
            key={uuidv4() + index}
          >
            <DashboardKpiCard {...kpi} />
          </Grid>
        ))}
      </Grid>

      {/* Tabs Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          //  minHeight: 0,

          minHeight: { xs: "500px", sm: "600px", md: 0 },
        }}
      >
        <DashboardTabs tabs={tabs} />
      </Box>
    </Paper>
  );
}
