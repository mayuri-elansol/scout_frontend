"use client";

import React from "react";
import { CardContent, useTheme, useMediaQuery } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/system";

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
  const [showAxis, setShowAxis] = React.useState(false);

  // Delay axis visibility slightly after render
  React.useEffect(() => {
    const timer = setTimeout(() => setShowAxis(true), 150);
    return () => clearTimeout(timer);
  }, []);

  if (!data || data.length === 0) return null;

  const xLabels = data.map((d) => String(d[xAxisKey]));
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
      }}
    >
      <Box sx={{ flex: 1, width: "100%", height: "100%" }}>
        <BarChart
          series={chartSeries}
          xAxis={[
            {
              scaleType: "band",
              data: xLabels,
              tickLabelStyle: {
                textAnchor: isMobile ? "end" : "middle",
                fontSize: isMobile ? 9 : 11,
                opacity: showAxis ? 1 : 0,
                transition: "opacity 0.3s ease",
              },
            },
          ]}
          yAxis={[
            {
              label: yAxisLabel,
              tickLabelStyle: {
                opacity: showAxis ? 1 : 0,
                //  transition: "opacity 0.3s ease",
              },
            },
          ]}
          sx={{
            "& .MuiChartsAxis-root line, & .MuiChartsAxis-root path": {
              opacity: showAxis ? 1 : 0,
              // transition: "opacity 0.3s ease",
            },
          }}
        />
      </Box>
    </CardContent>
  );
};

export default DynamicBarChart;
