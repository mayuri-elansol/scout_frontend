"use client";
import React, { useEffect, useRef, useState } from "react";
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
  colors?: string[];
}

const DynamicViolationScatterChart: React.FC<
  DynamicViolationScatterChartProps
> = ({ data = [], colors = ["#ffcdd2", "#B0E0E6", "#A8E6CF", "#FFEAA7"] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 🔹 Observe size changes dynamically
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };
    updateSize();

    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 🔹 Prepare unique labels
  const timeLabels = React.useMemo(() => {
    const uniqueTimes = Array.from(new Set(data.map((d) => d.time)));
    return uniqueTimes.sort((a, b) => {
      const [aH, aM] = a.split(":").map(Number);
      const [bH, bM] = b.split(":").map(Number);
      return aH * 60 + aM - (bH * 60 + bM);
    });
  }, [data]);

  const zoneLabels = React.useMemo(
    () => Array.from(new Set(data.map((d) => d.zone))),
    [data],
  );

  // 🔹 Group by zone
  const seriesData = React.useMemo(() => {
    const grouped = new Map<string, ViolationData[]>();
    for (const item of data) {
      if (!grouped.has(item.zone)) grouped.set(item.zone, []);
      grouped.get(item.zone)!.push(item);
    }

    return Array.from(grouped.entries()).map(([zone, items], index) => ({
      id: zone,
      label: zone,
      color: colors[index % colors.length],
      data: items.map((item, idx) => ({
        x: zoneLabels.indexOf(item.zone) + 1,
        y: timeLabels.indexOf(item.time),
        count: item.count,
        id: `${zone}-${idx}`,
      })),
      markerSize: isMobile ? 6 : 8,
    }));
  }, [data, timeLabels, zoneLabels, colors, isMobile]);

  // 🔹 Handle empty state
  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "text.secondary",
        }}
      >
        No data available
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        // height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ScatterChart
          width={dimensions.width}
          height={dimensions.height}
          series={seriesData}
          margin={{
            top: 30,
            right: 40,
            bottom: 50,
            left: 60, // ensures y-axis labels & legends aren’t cut
          }}
          xAxis={[
            {
              label: "Zone",
              scaleType: "linear",
              data: zoneLabels,
              valueFormatter: (i: number) =>
                zoneLabels[Math.round(i - 0.3)] ?? "",
              tickLabelStyle: {
                fontSize: isMobile ? 10 : 12,
                fontWeight: 600,
                fill: "#444",
              },
            },
          ]}
          yAxis={[
            {
              label: "Time (24-hour)",
              scaleType: "point",
              data: timeLabels.map((_, i) => i),
              valueFormatter: (i: number) => timeLabels[i] ?? "",
              tickLabelStyle: {
                fontSize: isMobile ? 9 : 11,
                fontWeight: 600,
                fill: "#444",
              },
            },
          ]}
          grid={{ horizontal: true, vertical: false }}
          sx={{
            "& .MuiChartsLegend-root": {
              transform: "translate(0, 15px)",
            },
            "& text": { userSelect: "none" },
          }}
        />
      )}
    </Box>
  );
};

export default DynamicViolationScatterChart;
