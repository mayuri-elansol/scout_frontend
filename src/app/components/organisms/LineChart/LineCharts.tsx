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
}

const LineCharts: React.FC<Props> = ({
  times,
  usageData,
  workingTime = [],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!times?.length || !usageData?.length) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
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
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Legend */}
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={1.5}
        sx={{
          flexShrink: 0,
          pt: 1,
        }}
      >
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

      {/* Chart area fills remaining height */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          width: "100%",
          minHeight: 0, // ✅ allows flex child to shrink correctly
        }}
      >
        <LineChart
          sx={{
            width: "100%",
            height: "100%",
          }}
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
              top: "30px",
              left: `${(slot.startTime / 24) * 100}%`,
              width: `${((slot.stopTime - slot.startTime) / 24) * 100}%`,
              height: "calc(100% - 40px)",
              bgcolor: "rgba(255, 235, 59, 0.2)",
              borderLeft: "2px dashed #fbc02d",
              borderRight: "2px dashed #fbc02d",
              pointerEvents: "none",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LineCharts;
