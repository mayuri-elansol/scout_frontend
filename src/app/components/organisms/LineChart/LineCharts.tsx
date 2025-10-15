"use client";

import * as React from "react";
import { Box, Chip, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LineChart } from "@mui/x-charts";

export interface WorkingSlot {
  startTime: number;
  stopTime: number;
  label: string;
}

export interface Props {
  times: string[];
  usageData: number[];
  workingTime?: WorkingSlot[];
  height?: number; // default height for desktop
}

const LineCharts: React.FC<Props> = ({
  times,
  usageData,
  workingTime = [],
  height = 350,

}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const chartHeight = isMobile ? 250 : height; 

  if (!times || !usageData || times.length === 0 || usageData.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: chartHeight,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No data available
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", pt: 2 }}>
      {/* Legend */}
      <Stack direction="row" spacing={2}>
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
          sx={{
            minWidth: times.length * 60, // ensure horizontal scroll if many points
            height: chartHeight,
            position: "relative",
          }}
        >
          <LineChart
            height={chartHeight}
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

          {/* Shaded working time slots */}
          {workingTime.map((slot, idx) => (
            <Box
              key={idx + 1}
              sx={{
                position: "absolute",
                top: 30,
                left: `${(slot.startTime / 24) * 100}%`,
                width: `${((slot.stopTime - slot.startTime) / 24) * 100}%`,
                height: "85%",
                bgcolor: "rgba(255, 235, 59, 0.2)",
                borderLeft: "2px dashed #fbc02d",
                borderRight: "2px dashed #fbc02d",
                pointerEvents: "none",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LineCharts;
