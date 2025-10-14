"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

// Times for the X-axis (24-hour format)
const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);

// Simulated counts of cameras for each tampering type
const series = [
  {
    label: "Online",
    data: times.map(() => Math.floor(Math.random() * 10) + 5),
    color: "#4caf50", // green
    stack: "camera-status",
  },
  {
    label: "Offline",
    data: times.map(() => Math.floor(Math.random() * 5)),
    color: "#f44336", // red
    stack: "camera-status",
  },
  {
    label: "Tampered",
    data: times.map(() => Math.floor(Math.random() * 3)),
    color: "#ff9800", // orange
    stack: "camera-status",
  },
];

export default function CameraTamperingTimeChart() {
  return (
    <Box sx={{ width: "100%", pt:4
    
    // overflowX: "auto" 
    }}>
     

      <Box sx={{ width: times.length * 60, height: 400 }}>
        <BarChart
          height={400}
          xAxis={[{ data: times, scaleType: "band" }]} // time on X-axis
          series={series} // data series
        />
      </Box>
    </Box>
  );
}
