
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
}

export interface ScatterPoint {
  x: number;
  y: number;
  count: number;
  zoneName: string;
  timeName: string;
  id: string;
}

const DynamicViolationScatterChart: React.FC<DynamicViolationScatterChartProps> = ({
  data = [],
  height = 500,
  colors = ["#ef5350", "#42a5f5", "#66bb6a", "#ffa726"],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
 const isMediumWidth = useMediaQuery(
    "(min-width: 1400px) and (max-width: 1600px)"
  );

  // Container ref to get dynamic width
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);

  // Update container width on mount and resize
  React.useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Sort times in 24-hour order
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
    [data]
  );

  // Group data by zone for series
  const seriesData = React.useMemo(() => {
    const grouped = new Map<string, ViolationData[]>();
  for (const item of data) {
  if (!grouped.has(item.zone)) {
    grouped.set(item.zone, []);
  }
}


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
      markerSize: isMobile ? 3 : 4,
    }));
  }, [data, timeLabels, zoneLabels, colors, isMobile]);

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

  // Responsive chart dimensions
  let chartHeight = height;
  if (isMobile) {
    chartHeight = 350;
  } else if (isTablet) {
    chartHeight = 400;
  } else if (isMediumWidth) {
    chartHeight = 337;
  }

  // Use container width with padding adjustment
  const chartWidth = containerWidth > 0 ? containerWidth - 32 : 600;

  // Responsive margins
  // const chartMargins = isMobile
  //   ? { left: 50, right: 20, bottom: 60, top: 20 }
  //   : isTablet
  //   ? { left: 60, right: 30, bottom: 50, top: 20 }
  //   : { left: 70, right: 40, bottom: 50, top: 20 };

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        pt: 2,
        overflow: "hidden", 
      }}
    >
      <ScatterChart
        width={chartWidth}
        height={chartHeight}
        // margin={chartMargins}
        series={seriesData}
        xAxis={[
          {
            label: "Zone",
            scaleType: "linear",
            data: zoneLabels,
            valueFormatter: (i: number) =>
              zoneLabels[Math.round(i - 0.3)] || "",
            tickLabelStyle: {
              fontSize: isMobile ? 10 : 12,
              fontWeight: 600,
              fill: "#444",
              angle: isMobile ? -45 : -30,
              textAnchor: "end",
            },
          },
        ]}
        yAxis={[
          {
            label: "Time (24-hour)",
            scaleType: "point",
            data: timeLabels.map((_, i) => i),
            valueFormatter: (i: number) => timeLabels[i] || "",
            tickLabelStyle: {
              fontSize: isMobile ? 9 : 11,
              fontWeight: 600,
              fill: "#444",
            },
            labelStyle: {
              fontSize: isMobile ? 12 : 14,
              fontWeight: 700,
              fill: "#222",
            },
          },
        ]}
        grid={{ horizontal: true, vertical: false }}
      />
    </Box>
  );
};

export default DynamicViolationScatterChart;