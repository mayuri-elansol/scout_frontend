"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts";

// Random data
const restrictedData = [
  { time: "08:00", ZoneA: 4, ZoneB: 2 },
  { time: "09:00", ZoneA: 7, ZoneB: 5 },
  { time: "10:00", ZoneA: 6, ZoneB: 3 },
  { time: "11:00", ZoneA: 9, ZoneB: 8 },
  { time: "12:00", ZoneA: 10, ZoneB: 6 },
  { time: "13:00", ZoneA: 8, ZoneB: 7 },
  { time: "14:00", ZoneA: 5, ZoneB: 4 },
];

export default function EmployeePresenceCriticalChart() {
  const xLabels = restrictedData.map((d) => d.time);
  const zoneA = restrictedData.map((d) => d.ZoneA);
  const zoneB = restrictedData.map((d) => d.ZoneB);

  return (
    <Box sx={{ width: "100%" }}>
      <LineChart
        height={550}
        xAxis={[{ data: xLabels, scaleType: "point" }]} // Add scaleType
        yAxis={[{ min: 0 }]}
        series={[
          { label: "Zone A", data: zoneA },
          { label: "Zone B", data: zoneB },
        ]}
      />
    </Box>
  );
}
