"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

// Example times (X-axis)
const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);

// Random data for demonstration
const series = [
  {
    label: "Working",
    data: times.map(() => Math.floor(Math.random() * 5)),
    color: "#4caf50", // green
  },
  {
    label: "Idle",
    data: times.map(() => Math.floor(Math.random() * 3)),
    color: "#ff9800", // orange
  },
  {
    label: "Not Present",
    data: times.map(() => Math.floor(Math.random() * 2)),
    color: "#f44336", // red
  },
];

export default function EmployeeIdleTimeMonitoringChart() {
  return (
    <Box sx={{ width: "100%",pt:2 
    // overflowX: "auto" 
    }}>
   
      {/* <Box sx={{ width: times.length * 50, height: 400 }}> */}
        <BarChart
          height={550}
          xAxis={[{ data: times }]} // X-axis: times
          series={series}           // Y-axis: counts
          
        />
      {/* </Box> */}
    </Box>
  );
}
