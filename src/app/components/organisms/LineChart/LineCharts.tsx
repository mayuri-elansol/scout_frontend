"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  // ✅ Wait until container has valid size before rendering chart
  useEffect(() => {
    const checkSize = () => {
      const width = containerRef.current?.offsetWidth ?? 0;
      const height = containerRef.current?.offsetHeight ?? 0;
      setReady(width > 50 && height > 50);
    };

    checkSize();

    const resizeObserver = new ResizeObserver(checkSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

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

      {/* Chart */}
      <Box
        ref={containerRef}
        sx={{
          flex: 1,
          position: "relative",
          width: "100%",
          minHeight: 0,
        }}
      >
        {ready && (
          <LineChart
            sx={{ width: "100%", height: "100%" }}
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
        )}

        {/* Shaded working time slots */}
        {ready &&
          workingTime.map((slot, idx) => (
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
