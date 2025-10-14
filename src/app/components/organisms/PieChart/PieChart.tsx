"use client";

import React from "react";
import { CardContent, useTheme, useMediaQuery } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { DefaultizedPieValueType } from "@mui/x-charts/models";

// Types for the component props
export interface PieDataItem {
  label: string;
  value: number;
  color: string;
}

export interface DynamicPieChartProps {
  data: PieDataItem[];
}

const DynamicPieChart: React.FC<DynamicPieChartProps> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const TOTAL = data.reduce((sum, item) => sum + item.value, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = (params.value / TOTAL) * 100;
    return `${percent.toFixed(0)}`;
  };

  const chartSize = isMobile ? 180 : 200;
  const outerRadius = isMobile ? 60 : 100;


  return (
    <CardContent
      sx={{
        width: "100%",
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PieChart
        series={[
          {
            outerRadius: outerRadius,
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