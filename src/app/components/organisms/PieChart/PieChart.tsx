
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
}

const DynamicPieChart: React.FC<DynamicPieChartProps> = ({
  data,
  zoneName,
  size,
  // height
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumWidth = useMediaQuery(
    "(min-width: 1400px) and (max-width: 1600px)"
  );

  const chartSize = size || (isMobile ? 180 : 200);

  // Adjust outer radius based on height
  let outerRadius = isMobile ? 60 : 100;
  if (isMediumWidth) {
    outerRadius = 80;
  }


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
        <Typography variant="subtitle1" 
         sx={{ 
          mb: 2,
          mt:6, 
          fontWeight: 600,
            marginRight:"95px"
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
        // margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
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

