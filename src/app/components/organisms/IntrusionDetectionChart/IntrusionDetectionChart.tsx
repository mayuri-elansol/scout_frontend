"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

// Example data: time vs zones
const data = [
  { time: "08:00", zoneA: 2, zoneB: 1, zoneC: 3 },
  { time: "09:00", zoneA: 4, zoneB: 3, zoneC: 2 },
  { time: "10:00", zoneA: 5, zoneB: 2, zoneC: 4 },
  { time: "11:00", zoneA: 3, zoneB: 5, zoneC: 3 },
  { time: "12:00", zoneA: 6, zoneB: 4, zoneC: 5 },
    { time: "08:00", zoneA: 2, zoneB: 1, zoneC: 3 },
  { time: "09:00", zoneA: 4, zoneB: 3, zoneC: 2 },
  { time: "10:00", zoneA: 5, zoneB: 2, zoneC: 4 },
  { time: "11:00", zoneA: 3, zoneB: 5, zoneC: 3 },
  { time: "12:00", zoneA: 6, zoneB: 4, zoneC: 5 },
    { time: "08:00", zoneA: 2, zoneB: 1, zoneC: 3 },
  { time: "09:00", zoneA: 4, zoneB: 3, zoneC: 2 },
  { time: "10:00", zoneA: 5, zoneB: 2, zoneC: 4 },
  { time: "11:00", zoneA: 3, zoneB: 5, zoneC: 3 },
  { time: "12:00", zoneA: 6, zoneB: 4, zoneC: 5 },
];

export default function IntrusionDetectionChart() {
  return (
    <Box sx={{ width: "100%", p:4 }}>
      
      <BarChart
        height={420}
        xAxis={[
          {
            scaleType: "band", 
            data: data.map((d) => d.time),
          },
        ]}
        yAxis={[
          {
            min: 0,
            max: Math.max(...data.flatMap((d) => [d.zoneA, d.zoneB, d.zoneC])) + 2,
          },
        ]}
        series={[
          { label: "Zone A", data: data.map((d) => d.zoneA) },
          { label: "Zone B", data: data.map((d) => d.zoneB) },
          { label: "Zone C", data: data.map((d) => d.zoneC) },
        ]}
      />
    </Box>
  );
}
