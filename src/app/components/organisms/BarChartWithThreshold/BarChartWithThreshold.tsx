"use client";

import React, { useRef, useState, useEffect } from "react";
import { CardContent, useTheme, useMediaQuery, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export interface SeriesConfig {
  dataKey: string;
  label: string;
  color: string;
}

export interface DynamicBarChartWithThresholdProps {
  data: Record<string, any>[];
  xAxisKey: string;
  series: SeriesConfig[];
  thresholdValue: number;
  thresholdLabel?: string;
  thresholdColor?: string;
  yAxisLabel?: string;
  stackId?: string;
  height?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

const DynamicBarChartWithThreshold: React.FC<
  DynamicBarChartWithThresholdProps
> = ({
  data,
  xAxisKey,
  series,
  thresholdValue,
  thresholdLabel = "Threshold",
  thresholdColor = "red",
  yAxisLabel = "User Count",
  stackId = "stack",
  height = { mobile: 300, tablet: 400, desktop: 480 },
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartDims, setChartDims] = useState({ height: 0, top: 0, bottom: 0 });

  const xLabels = data.map((d) => d[xAxisKey]);
  const allValues = series.flatMap((s) => data.map((d) => d[s.dataKey]));
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(0, ...allValues);

  const chartSeries = series.map((s) => ({
    data: data.map((d) => d[s.dataKey]),
    label: s.label,
    color: s.color,
    stack: stackId,
  }));

  let chartHeight = height.desktop;
  if (isMobile) chartHeight = height.mobile;
  else if (isTablet) chartHeight = height.tablet;

  useEffect(() => {
    if (chartContainerRef.current) {
      const rect = chartContainerRef.current.getBoundingClientRect();
      setChartDims({
        height: rect.height,
        top: rect.top,
        bottom: rect.bottom,
      });
    }
  }, [chartHeight, data]);

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
      sx={{ width: "100%", position: "relative", pb: 4 }}
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
        margin={{
          bottom: isMobile ? 80 : 50,
          top: 20,
          left: 40,
          right: 20,
        }}
      />

      {/* Threshold Line (EXACTLY at y=thresholdValue) */}
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
