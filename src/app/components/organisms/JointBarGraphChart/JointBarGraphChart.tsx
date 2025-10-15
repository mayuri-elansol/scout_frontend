// "use client";

// import * as React from "react";
// import { Box, Typography } from "@mui/material";
// import { BarChart } from "@mui/x-charts";

// // Example time intervals (X-axis)
// const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);

// // Generate random data for demo
// const entryData = times.map(() => Math.floor(Math.random() * 30) + 10); // 10–40 vehicles entering
// const exitData = times.map(() => Math.floor(Math.random() * 25) + 5);   // 5–30 vehicles exiting
// const invalidNumbers = times.map(() => Math.floor(Math.random() * 3));  // 0–2 invalid plates

// export default function VehicleCountANPRChart() {
//   return (
//     <Box sx={{ width: "100%" }}>
     
//       {/* Horizontal scroll only */}
//       <Box
//         sx={{
//           overflowX: "auto",
//           overflowY: "hidden",
//           pb: 1,
//         }}
//       >
//         {/* Wider chart to enable horizontal scrolling */}
//         {/* <Box sx={{ width: times.length * 60, height: 400 }}> */}
//           <BarChart
//             height={400}
//             xAxis={[{ data: times, scaleType: "band" }]} // Time-based X-axis
//             series={[
//               {
//                 label: "Entry",
//                 data: entryData,
//                 color: "#4caf50", // green
//               },
//               {
//                 label: "Exit",
//                 data: exitData,
//                 color: "#2196f3", // blue
//               },
//               {
//                 label: "Invalid Plate (Alarm Triggered)",
//                 data: invalidNumbers,
//                 color: "#f44336", // red
//               },
//             ]}
//           />
//         {/* </Box> */}
//       </Box>
//     </Box>
//   );
// }
"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";

// Types for chart props
export interface VehicleChartData {
  label: string;      
  data: number[];     
  color?: string;     
}

export interface VehicleCountBarChartProps {
  times: string[];              
  seriesData: VehicleChartData[]; 
  height?: number;              
}

const VehicleCountBarChart: React.FC<VehicleCountBarChartProps> = ({
  times,
  seriesData,
  height = 400,
}) => {
  if (!times || !seriesData || times.length === 0 || seriesData.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No data available
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          overflowX: "auto", 
          overflowY: "hidden",
          pb: 1,
        }}
      >
        <BarChart
          height={height}
          xAxis={[{ data: times, scaleType: "band" }]}
          series={seriesData.map((s) => ({
            label: s.label,
            data: s.data,
            color: s.color,
          }))}
        />
      </Box>
    </Box>
  );
};

export default VehicleCountBarChart;
