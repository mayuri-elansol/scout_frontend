

"use client";

import React from "react";
import {
  CardContent,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { DefaultizedPieValueType } from "@mui/x-charts/models";

// Types for Pie chart items
export interface PieDataItem {
  label: string;
  value: number;
  color: string;
}

// Props for dynamic pie chart
export interface DynamicPieChartProps {
  zoneName?: string;
  data: PieDataItem[];
  size?: number;
  height?: number;
}

const DynamicPieChart: React.FC<DynamicPieChartProps> = ({
  data,
  zoneName,
  size,
  height,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumWidth = useMediaQuery(
    "(min-width: 1400px) and (max-width: 1600px)"
  );

  // Determine outer radius dynamically based on height prop
  let outerRadius = 100; // Default

  if (isMobile) {
    outerRadius = 60;
  } else if (isMediumWidth) {
    outerRadius = 80;
  }

  // If height prop is provided, calculate radius from it
  if (height !== undefined) {
    if (height <= 300) {
      outerRadius = height * 0.25;
    } else if (height <= 500) {
      outerRadius = height * 0.3;
    } else {
      outerRadius = height * 0.35;
    }
  }

  // Chart size should be based on outerRadius to prevent clipping
  const chartSize = size || outerRadius * 2.8;

  const TOTAL = data.reduce((sum, item) => sum + item.value, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = (params.value / TOTAL) * 100;
    return `${percent.toFixed(0)}`;
  };

  return (
    <CardContent
      sx={{
        width: "100%",
        p: isMediumWidth ? "0px !important" : "12px !important",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {zoneName && (
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            mt: 2,
            fontWeight: 600,
            textAlign: "center",
            width: "100%",
          }}
        >
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
        margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
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