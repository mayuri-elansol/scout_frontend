"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts";

// Sample time-zone based data
const data = [
  { time: "08:00", zoneA: 5, zoneB: 3, zoneC: 2 },
  { time: "09:00", zoneA: 8, zoneB: 6, zoneC: 4 },
  { time: "10:00", zoneA: 10, zoneB: 9, zoneC: 5 },
  { time: "11:00", zoneA: 12, zoneB: 11, zoneC: 7 },
  { time: "12:00", zoneA: 15, zoneB: 14, zoneC: 9 },
  { time: "13:00", zoneA: 13, zoneB: 12, zoneC: 8 },
  { time: "14:00", zoneA: 9, zoneB: 10, zoneC: 6 },
];

export default function PeopleCountLineChart() {
  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <LineChart
        height={500}
        xAxis={[
          {
            scaleType: "point",
            data: data.map((d) => d.time),
          },
        ]}
        yAxis={[
          {
            min: 0,
            max:
              Math.max(...data.flatMap((d) => [d.zoneA, d.zoneB, d.zoneC])) + 5,
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
