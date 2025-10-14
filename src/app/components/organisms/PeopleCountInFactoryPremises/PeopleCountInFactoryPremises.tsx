"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts";

// Example times (X-axis)
const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);

// Example cameras or zones
const cameras = ["Camera 1", "Camera 2", "Camera 3"];

// Random data to simulate people counts
const series = cameras.map((cam) => ({
  label: cam,
  data: times.map(() => Math.floor(Math.random() * 50) + 10),
}));

export default function PeopleCountChart() {
  return (
    <Box
      sx={{
        width: "100%",
        // overflowX: "auto"
      }}
    >
      <Box sx={{ width: times.length * 60, height: 400 }}>
        <LineChart
          height={400}
          xAxis={[{ data: times, scaleType: "band" }]}
          series={series}
          grid={{ horizontal: true }}
        />
      </Box>
    </Box>
  );
}
