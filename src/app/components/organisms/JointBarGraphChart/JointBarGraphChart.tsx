
"use client";

import * as React from "react";
import { Box } from "@mui/material";
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
  height = 400,
}) => {
  if (!times || !seriesData || times.length === 0 || seriesData.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height,
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
          pb: 1,
        }}
      >
        <BarChart
          height={height}
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
