"use client";

import * as React from "react";
import { Box, Chip, Stack } from "@mui/material";
import { LineChart } from "@mui/x-charts";

const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const usageData = times.map(() => Math.floor(Math.random() * 50));
const workingTime = [
  { startTime: 12.0, stopTime: 13, label: "Lunch Time" },
  { startTime: 15.0, stopTime: 16, label: "Tea Break" },
];

export default function CanteenUsageChart() {
  return (
    <Box sx={{ width: "100%", pt: 2 }}>
      {/* Title */}

      {/* Legend */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Chip label="🟢 Usage Count" variant="outlined" color="success" />
        {workingTime.map((slot, idx) => (
          <Chip
            key={idx + 1}
            label={`🟡 ${slot.label} (${slot.startTime}:00 - ${slot.stopTime}:00)`}
            variant="outlined"
            sx={{
              bgcolor: "rgba(255, 235, 59, 0.2)",
              borderColor: "#fbc02d",
              color: "#795548",
            }}
          />
        ))}
      </Stack>

      {/* Chart with horizontal scroll */}
      <Box sx={{ overflowX: "auto", overflowY: "hidden", pb: 1 }}>
        <Box
          sx={{ width: times.length * 60, height: 400, position: "relative" }}
        >
          {/* LineChart */}
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

          {/* Shaded working time slots only (without labels inside chart) */}
          {workingTime.map((slot, idx) => (
            <Box
              key={idx + 1}
              sx={{
                position: "absolute",
                top: 0,
                left: `${(slot.startTime / 24) * 100}%`,
                width: `${((slot.stopTime - slot.startTime) / 24) * 100}%`,
                height: "100%",
                bgcolor: "rgba(255, 235, 59, 0.2)",
                borderLeft: "2px dashed #fbc02d",
                borderRight: "2px dashed #fbc02d",
                pointerEvents: "none", // so chart interactions work
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
