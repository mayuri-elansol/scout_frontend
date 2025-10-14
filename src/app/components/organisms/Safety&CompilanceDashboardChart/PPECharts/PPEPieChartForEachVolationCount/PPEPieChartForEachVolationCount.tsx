
"use client";

import React from "react";
import { CardContent, useTheme, useMediaQuery } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { DefaultizedPieValueType } from "@mui/x-charts/models";

const PPEPieChartForEachViolationCount = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const data = [
    { label: "Helmet", value: 29, color: "#ef5350" },
    { label: "Vest", value: 28, color: "#ff9800" },
    { label: "Glass", value: 28, color: "#42a5f5" },
  ];

  const TOTAL = data.reduce((sum, item) => sum + item.value, 0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = (params.value / TOTAL) * 100;
    return `${percent.toFixed(0)}`;
  };

  const chartSize = isMobile ? 180 : 200;
  const outerRadius = isMobile ? 60 : 90;

  return (
    <CardContent sx={{ 
      width: "100%", 
      p: 2, 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
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

export default PPEPieChartForEachViolationCount;