"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";

// Times for X-axis
const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);

// Random counts for sleeping and absent personnel
const series = [
  {
    label: "Sleeping",
    data: times.map(() => Math.floor(Math.random() * 5)),
  },
  {
    label: "Absent",
    data: times.map(() => Math.floor(Math.random() * 5)),
  },
];

export default function SecurityPersonnelBarChart() {
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
  

      <Box sx={{ width: times.length * 50, height: 300 }}>
        <BarChart
          height={300}
          xAxis={[{ data: times }]} 
          series={series}           
        />
      </Box>
    </Box>
  );
}
