
"use client";

import React from "react";
import { CardContent, useTheme, useMediaQuery } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

// Series configuration type
export interface SeriesConfig<T> {
  dataKey: keyof T; 
  label: string;
  color: string;
}

export interface DynamicBarChartProps<T> {
  data: T[];
  xAxisKey: keyof T;
  series: SeriesConfig<T>[];
  yAxisLabel?: string;
  stackId?: string;
  height?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

const DynamicBarChart = <T extends Record<string, string | number>>({
  data,
  xAxisKey,
  series,
  yAxisLabel = "Count",
  stackId = "stack",
  height = { mobile: 300, tablet: 400, desktop: 400 },
}: DynamicBarChartProps<T>) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Extract x-axis labels
  const xLabels = data.map((d) => String(d[xAxisKey]));

  // Prepare series data for the chart
  const chartSeries = series.map((s) => ({
    data: data.map((d) => Number(d[s.dataKey])),
    label: s.label,
    color: s.color,
    stack: stackId,
  }));

  // Determine chart height based on screen size
  let chartHeight = height.desktop!;
  if (isMobile) {
    chartHeight = height.mobile!;
  } else if (isTablet) {
    chartHeight = height.tablet!;
  }

  return (
    <CardContent sx={{ width: "100%", p: 0 }}>
      <BarChart
        height={chartHeight}
        series={chartSeries}
        xAxis={[
          {
            scaleType: "band",
            data: xLabels,
            tickLabelStyle: {
              textAnchor: isMobile ? "end" : "middle",
              fontSize: isMobile ? 9 : 11,
            },
          },
        ]}
        yAxis={[{ label: yAxisLabel }]}
        margin={{}}
      />
    </CardContent>
  );
};

export default DynamicBarChart;
