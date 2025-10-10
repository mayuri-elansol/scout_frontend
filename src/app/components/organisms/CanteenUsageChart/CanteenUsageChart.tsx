"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";

// Example times (X-axis)
const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);

// Random count data for demonstration (canteen usage)
const usageData = times.map(() => Math.floor(Math.random() * 50));

// Example working time slots
const workingTime = [
  { startTime: 12.0, stopTime: 13.5 }, // Lunch
  { startTime: 15.0, stopTime: 16.5 }, // Tea break
];

// Convert time (e.g., 13.5 → "13:30") helper
// const formatTime = (time) => {
//   const hour = Math.floor(time);
//   const minutes = (time % 1) * 60;
//   return `${hour}:${minutes === 0 ? "00" : "30"}`;
// };

export default function CanteenUsageChart() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Monitoring Canteen Usage & Timings
      </Typography>

      {/* Horizontal scroll only */}
      <Box
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          pb: 1,
        }}
      >
        <Box sx={{ width: times.length * 60, height: 400, position: "relative" }}>
          {/* Time-wise usage trend */}
          <LineChart
            height={400}
            xAxis={[{ data: times, scaleType: "band" }]}
            series={[
              {
                label: "Canteen Usage Count",
                data: usageData,
                color: "#4caf50",
              },
            ]}
            grid={{ horizontal: true }}
          />

          {/* Highlight working time slots using translucent overlays */}
          {workingTime.map((slot, idx) => (
            <Box
              key={idx}
              sx={{
                position: "absolute",
                top: 0,
                left: `${(slot.startTime / 24) * 100}%`,
                width: `${((slot.stopTime - slot.startTime) / 24) * 100}%`,
                height: "100%",
                bgcolor: "rgba(255, 235, 59, 0.2)", // yellow translucent
                borderLeft: "2px dashed #fbc02d",
                borderRight: "2px dashed #fbc02d",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
