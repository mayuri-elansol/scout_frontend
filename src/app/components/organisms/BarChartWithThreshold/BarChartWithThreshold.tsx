"use client";

import React, { useRef } from "react";
import { CardContent, useTheme, useMediaQuery, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

// Generic Series configuration for any data type T
export interface SeriesConfig<T> {
  dataKey: keyof T;
  label: string;
  color: string;
}

// Generic props for DynamicBarChartWithThreshold
export interface DynamicBarChartWithThresholdProps<
  T extends Record<string, number | string>
> {
  data: T[];
  xAxisKey: keyof T;
  series: SeriesConfig<T>[];
  thresholdValue: number;
  thresholdLabel?: string;
  thresholdColor?: string;
  yAxisLabel?: string;
  stackId?: string;
  height?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    mac?:number
  };
}

const DynamicBarChartWithThreshold = <
  T extends Record<string, number | string>
>({
  data,
  xAxisKey,
  series,
  thresholdValue,
  thresholdLabel = "Threshold",
  thresholdColor = "red",
  yAxisLabel = "User Count",
  stackId = "stack",
  height = { mobile: 300, tablet: 400, desktop: 400,mac :350 },

}: DynamicBarChartWithThresholdProps<T>) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
const isMediumWidth = useMediaQuery("(min-width: 1400px) and (max-width: 1600px)");

  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Prepare X labels
  const xLabels = data.map((d) => d[xAxisKey] as string);

  // Flatten all series values to calculate max/min
  const allValues = series.flatMap((s) =>
    data.map((d) => d[s.dataKey] as number)
  );
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(0, ...allValues);

  // Map series to BarChart format
  const chartSeries = series.map((s) => ({
    data: data.map((d) => d[s.dataKey] as number),
    label: s.label,
    color: s.color,
    stack: stackId,
  }));

  // Responsive height
  let chartHeight = height.desktop!;
  if (isMobile) chartHeight = height.mobile!;
  else if (isTablet) chartHeight = height.tablet!;
  else if(isMediumWidth)  chartHeight = height.mac!;

// if (isMacWidth) chartHeight = height.mac!;
// else if (isTablet) chartHeight = height.tablet!;
// else if (isMobile) chartHeight = height.mobile!;
// else chartHeight = height.desktop!;

  // Calculate threshold line position
  const yMin = minValue;
  const yMax = maxValue;
  const usableHeight = chartHeight ? chartHeight - 60 : 0;
  const thresholdY =
    usableHeight > 0
      ? usableHeight * (1 - (thresholdValue - yMin) / (yMax - yMin)) + 56
      : 0;

  return (
    <CardContent
      ref={chartContainerRef}
      sx={{ width: "100%"}}
    >
      <BarChart
        height={chartHeight}
        series={chartSeries}
        xAxis={[
          {
            scaleType: "band",
            data: xLabels,
            tickLabelStyle: {
              angle: isMobile ? -45 : 0,
              textAnchor: isMobile ? "end" : "middle",
              fontSize: isMobile ? 9 : 11,
            },
          },
        ]}
        yAxis={[{ label: yAxisLabel, min: yMin }]}
        margin={{}}
      />

      {/* Threshold Line */}
      <Box
        sx={{
          position: "absolute",
          top: `${thresholdY}px`,
          left: 0,
          right: 0,
          borderTop: `2px dashed ${thresholdColor}`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: 5,
            top: -12,
            backgroundColor: "white",
            px: 1,
            fontSize: 12,
            color: thresholdColor,
          }}
        >
          {thresholdLabel} ({thresholdValue})
        </Box>
      </Box>
    </CardContent>
  );
};

export default DynamicBarChartWithThreshold;
