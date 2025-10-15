


"use client";
import React from "react";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export interface ViolationData {
  time: string;
  zone: string;
  count: number;
}

export interface DynamicViolationScatterChartProps {
  data: ViolationData[];
  height?: number;
  colors?: string[];
  showLegend?: boolean;
}

const DynamicViolationScatterChart: React.FC<DynamicViolationScatterChartProps> = ({
  data = [],
  height = 550,
  colors = ["#ef5350", "#42a5f5", "#66bb6a", "#ffa726"],
  showLegend = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // Mac-specific screen width approx 1440px
  const isMac = useMediaQuery("(min-width: 1440px) and (max-width: 1600px)");

  // Sort times in 24-hour order
  const timeLabels = React.useMemo(() => {
    const uniqueTimes = Array.from(new Set(data.map((d) => d.time)));
    return uniqueTimes.sort((a, b) => {
      const [aH, aM] = a.split(":").map(Number);
      const [bH, bM] = b.split(":").map(Number);
      return aH * 60 + aM - (bH * 60 + bM);
    });
  }, [data]);

  const zoneLabels = React.useMemo(() => Array.from(new Set(data.map((d) => d.zone))), [data]);

  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        No data
      </Box>
    );
  }

  // Group data by zone for series
  const seriesData = React.useMemo(() => {
    const grouped = new Map<string, ViolationData[]>();
    data.forEach((item) => {
      if (!grouped.has(item.zone)) grouped.set(item.zone, []);
      grouped.get(item.zone)!.push(item);
    });

    return Array.from(grouped.entries()).map(([zone, items], index) => ({
      id: zone,
      label: zone,
      color: colors[index % colors.length],
      data: items.map((item, idx) => ({
        x: zoneLabels.indexOf(item.zone) + 0.2,
        y: timeLabels.indexOf(item.time),
        count: item.count,
        zoneName: item.zone,
        timeName: item.time,
        id: `${zone}-${idx}`,
      })),
      markerSize: 4,
      valueFormatter: (point: any) =>
        `Time: ${point.timeName}\nViolations: ${point.count}`,
    }));
  }, [data, timeLabels, zoneLabels, colors]);

  // Set width & height conditionally
  const chartWidth = isMac ? 982 : Math.max(600, zoneLabels.length * 200);
  const chartHeight = isMac ? 360 : height;

  return (
    <Box
      sx={{
        overflowX: "auto",
        display: "flex",
        justifyContent: "center",
        // p: { xs: 2, md: 4 },
        pt:2
      }}
    >
      <ScatterChart
        width={chartWidth}
        height={chartHeight}
        margin={{ left: 10, right: 10, bottom: 40 }}
        series={seriesData}
        xAxis={[
          {
            label: "Zone",
            scaleType: "linear",
            data: zoneLabels,
            valueFormatter: (i: number) =>
              zoneLabels[Math.round(i - 0.3)] || "",
            tickLabelStyle: {
              fontSize: 12,
              fontWeight: 600,
              fill: "#444",
              angle: isMobile ? 0 : -30,
              textAnchor: isMobile ? "middle" : "end",
            },
          },
        ]}
        yAxis={[
          {
            label: "Time (24-hour)",
            scaleType: "point",
            data: timeLabels.map((_, i) => i),
            valueFormatter: (i: number) => timeLabels[i] || "",
            tickLabelStyle: { fontSize: 11, fontWeight: 600, fill: "#444" },
            labelStyle: { fontSize: 14, fontWeight: 700, fill: "#222" },
          },
        ]}
        grid={{ horizontal: true, vertical: false }}
      />
    </Box>
  );
};

export default DynamicViolationScatterChart;
