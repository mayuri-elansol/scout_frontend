"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

// Example time intervals (X-axis)
const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);

// Generate random data for demo
const entryData = times.map(() => Math.floor(Math.random() * 30) + 10); // 10–40 vehicles entering
const exitData = times.map(() => Math.floor(Math.random() * 25) + 5);   // 5–30 vehicles exiting
const invalidNumbers = times.map(() => Math.floor(Math.random() * 3));  // 0–2 invalid plates

export default function VehicleCountANPRChart() {
  return (
    <Box sx={{ width: "100%" }}>
     
      {/* Horizontal scroll only */}
      <Box
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          pb: 1,
        }}
      >
        {/* Wider chart to enable horizontal scrolling */}
        {/* <Box sx={{ width: times.length * 60, height: 400 }}> */}
          <BarChart
            height={400}
            xAxis={[{ data: times, scaleType: "band" }]} // Time-based X-axis
            series={[
              {
                label: "Entry",
                data: entryData,
                color: "#4caf50", // green
              },
              {
                label: "Exit",
                data: exitData,
                color: "#2196f3", // blue
              },
              {
                label: "Invalid Plate (Alarm Triggered)",
                data: invalidNumbers,
                color: "#f44336", // red
              },
            ]}
          />
        {/* </Box> */}
      </Box>
    </Box>
  );
}
