"use client";
import React from "react";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { Box } from "@mui/material";

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
  data,
  height = 500,
  colors = ["#ef5350", "#42a5f5", "#66bb6a", "#ffa726"],
  showLegend = true,
}) => {
  // Extract unique zones and times dynamically from the data
  const zoneLabels = React.useMemo(
    () => Array.from(new Set(data.map((d) => d.zone))).sort(),
    [data]
  );

  const timeLabels = React.useMemo(
    () => Array.from(new Set(data.map((d) => d.time))).sort(),
    [data]
  );

  // Group data by zone for multiple series
  const seriesData = React.useMemo(() => {
    const grouped = new Map<string, ViolationData[]>();
    
    data.forEach((item) => {
      if (!grouped.has(item.zone)) {
        grouped.set(item.zone, []);
      }
      grouped.get(item.zone)!.push(item);
    });

    return Array.from(grouped.entries()).map(([zone, items], index) => ({
      type: "scatter" as const,
      id: zone,
      label: zone,
      data: items.map((item, idx) => ({
        x: timeLabels.indexOf(item.time),
        y: item.count,
        id: `${zone}-${idx}`,
      })),
    }));
  }, [data, timeLabels]);

  return (
    <Box sx={{ width: '100%', p:4 }}>
      <ScatterChart
        width={1200}
        height={height}
        series={seriesData}
        xAxis={[
          {
            label: "Time",
            data: timeLabels,
            scaleType: "point",
            tickLabelStyle: { 
              fontSize: 12, 
              fontWeight: 500, 
              fill: "#333",
              angle: -45,
              textAnchor: "end",
            },
          },
        ]}
        yAxis={[
          {
            label: "Violation Count",
            scaleType: "linear",
            tickLabelStyle: { 
              fontSize: 12, 
              fontWeight: 500, 
              fill: "#333" 
            },
          },
        ]}
        margin={{  bottom: 80 }}
        // slotProps={{
        //   legend: showLegend ? {
        //     position: { vertical: "middle", horizontal: "right" },
        //   } : undefined,
        // }}
      />
    </Box>
  );
};

export default DynamicViolationScatterChart;