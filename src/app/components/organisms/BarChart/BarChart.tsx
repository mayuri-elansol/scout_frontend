

"use client";

import React from "react";
import { CardContent, useTheme, useMediaQuery, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/system";

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
}

const DynamicBarChart = <T extends Record<string, string | number>>({
  data,
  xAxisKey,
  series,
  yAxisLabel = "Count",
  stackId = "stack",
}: DynamicBarChartProps<T>) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!data || data.length === 0) {
    return  (<CardContent
      sx={{
        width: "100%",
        height: 620, // same as chart height
        display: "flex",          // ✅ flex container
        justifyContent: "center", // ✅ horizontal centering
        alignItems: "center",     // ✅ vertical centering
        p: 0,
      }}
    >
      <Typography color="text.secondary" align="center">
        No data available
      </Typography>
    </CardContent>
  );
  }

  const xLabels = data.map((d) => String(d[xAxisKey]));

  const chartSeries = series.map((s) => ({
    data: data.map((d) => Number(d[s.dataKey]) || 0),
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
        "&:last-child": { paddingBottom: 0 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 360, // ✅ HARD HEIGHT
        }}
      >
        <BarChart
          height={620} // ✅ REQUIRED
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
        />
      </Box>
    </CardContent>
  );
};

export default DynamicBarChart;
