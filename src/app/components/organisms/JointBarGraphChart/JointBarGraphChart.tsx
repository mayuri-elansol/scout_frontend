"use client";

import * as React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { BarChart } from "@mui/x-charts";

// Types for chart props
export interface VehicleChartData {
  label: string;
  data: number[];
  color?: string;
}

export interface VehicleCountBarChartProps {
  times: string[];
  seriesData: VehicleChartData[];
  height?: number;
}

const VehicleCountBarChart: React.FC<VehicleCountBarChartProps> = ({
  times,
  seriesData,
  height = 300,
}) => {
  const isMediumWidth = useMediaQuery(
    "(min-width: 1400px) and (max-width: 1500px)"
  );

  // Responsive height based on screen width
  const actualHeight = isMediumWidth ? 280 : height;

  if (!times?.length || !seriesData?.length) {
    return (
      <Box
        sx={{
          width: "100%",
          height: actualHeight,
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
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          // pb: 1,
        }}
      >
        <BarChart
          height={actualHeight}
          xAxis={[{ data: times, scaleType: "band" }]}
          series={seriesData.map((s) => ({
            label: s.label,
            data: s.data,
            color: s.color,
          }))}
        />
      </Box>
    </Box>
  );
};

export default VehicleCountBarChart;
