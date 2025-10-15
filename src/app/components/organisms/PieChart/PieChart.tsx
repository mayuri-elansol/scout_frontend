
"use client";

import React from "react";
import { CardContent, useTheme, useMediaQuery, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { DefaultizedPieValueType } from "@mui/x-charts/models";

// Types for Pie chart items
export interface PieDataItem {
  label: string; // e.g., "Online", "Offline", "Tampered"
  value: number; // count
  color: string; // color of the slice
}

// Props for dynamic pie chart
export interface DynamicPieChartProps {
  zoneName?: string;           // optional zone label
  data: PieDataItem[];         // data for the pie chart
  size?: number;               // optional chart size override
}

const DynamicPieChart: React.FC<DynamicPieChartProps> = ({
  data,
  zoneName,
  size,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const chartSize = size || (isMobile ? 180 : 200);
  const outerRadius = isMobile ? 60 : 85;

  const TOTAL = data.reduce((sum, item) => sum + item.value, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = (params.value / TOTAL) * 100;
    return `${percent.toFixed(0)}`;
  };

  return (
    <CardContent
      sx={{
        width: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {zoneName && (
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
          {zoneName}
        </Typography>
      )}

      <PieChart
        series={[
          {
            outerRadius,
            data,
            arcLabel: getArcLabel,
          },
        ]}
        colors={data.map((item) => item.color)}
        width={chartSize}
        height={chartSize}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: isMobile ? 12 : 14,
            fontWeight: 600,
          },
          "& path": {
            stroke: "#fff",
            strokeWidth: 2,
          },
        }}
      />
    </CardContent>
  );
};

export default DynamicPieChart;
