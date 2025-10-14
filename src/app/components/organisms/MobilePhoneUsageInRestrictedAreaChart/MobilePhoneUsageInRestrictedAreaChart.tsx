"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

// Sample data for Mobile Phone Usage in Critical Areas
const data = [
  { createdAt: "08:00", ZoneA: 3, ZoneB: 1, ZoneC: 0 },
  { createdAt: "09:00", ZoneA: 2, ZoneB: 2, ZoneC: 1 },
  { createdAt: "10:00", ZoneA: 4, ZoneB: 0, ZoneC: 2 },
  { createdAt: "11:00", ZoneA: 1, ZoneB: 3, ZoneC: 1 },
  { createdAt: "12:00", ZoneA: 0, ZoneB: 2, ZoneC: 0 },
];

export default function MobilePhoneUsageChart() {
  return (
    <Box sx={{ width: "100%",pt:2 }}>


      <BarChart
        height={550}
        xAxis={[{ data: data.map(d => d.createdAt) }]} // X-axis: time
        series={[
          { label: "Zone A", data: data.map(d => d.ZoneA) },
          { label: "Zone B", data: data.map(d => d.ZoneB) },
          { label: "Zone C", data: data.map(d => d.ZoneC) },
        ]}
      />
    </Box>
  );
}
