"use client";
import React, { useMemo } from "react";
import { CardContent, useTheme, useMediaQuery, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export interface SeriesConfig<T> {
  dataKey: keyof T;
  label: string;
  color: string;
}

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
}: DynamicBarChartWithThresholdProps<T>) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Prepare data
  const xLabels = useMemo(() => data.map((d) => String(d[xAxisKey])), [data]);
  const allValues = useMemo(
    () => series.flatMap((s) => data.map((d) => Number(d[s.dataKey]))),
    [data, series]
  );
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(0, ...allValues);

  const chartSeries = series.map((s) => ({
    data: data.map((d) => Number(d[s.dataKey])),
    label: s.label,
    color: s.color,
    stack: stackId,
  }));

  return (
    <CardContent
      sx={{
        width: "100%",
        height: "100%",
        p: 0,
        display: "flex",
        flexDirection: "column",
        "&:last-child": {
          paddingBottom: "0px !important",
        },
        position: "relative",
      }}
    >
      <Box
        sx={{ flex: 1, width: "100%", height: "100%", position: "relative" }}
      >
        <BarChart
          width={undefined}
          height={undefined}
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
          yAxis={[{ label: yAxisLabel, min: minValue }]}
          margin={{ top: 40, right: 30, bottom: 40, left: 50 }}
        />

        {/* ✅ Responsive threshold line overlay */}
        <Box
          sx={{
            position: "absolute",
            top: `${
              (1 - (thresholdValue - minValue) / (maxValue - minValue)) * 100
            }%`,
            left: 0,
            right: 0,
            borderTop: `2px dashed ${thresholdColor}`,
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              right: 10,
              top: "-12px",
              background: "white",
              fontSize: 12,
              color: thresholdColor,
              px: "4px",
            }}
          >
            {thresholdLabel} ({thresholdValue})
          </Box>
        </Box>
      </Box>
    </CardContent>
  );
};

export default DynamicBarChartWithThreshold;
