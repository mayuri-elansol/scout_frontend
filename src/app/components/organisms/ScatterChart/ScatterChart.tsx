

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
  // Extract unique labels
  const zoneLabels = React.useMemo(
    () => Array.from(new Set(data.map((d) => d.zone))),
    [data]
  );

  const timeLabels = React.useMemo(
    () => Array.from(new Set(data.map((d) => d.time))),
    [data]
  );

  // Group by zone
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
  x: zoneLabels.indexOf(item.zone),  // numeric index of zone
  y: timeLabels.indexOf(item.time),  // numeric index of time
  count: item.count,
  id: `${zone}-${idx}`,
}))

    }));
  }, [data, timeLabels, zoneLabels, colors]);

  return (
    <Box sx={{ width: "100%", p: 4 }}>
    <ScatterChart
  width={1200}           // smaller width
  height={500}          // smaller height

  series={seriesData}

  xAxis={[
  {
    label: "Zone",
    scaleType: "point",               // categorical axis
    data: zoneLabels.map((_, i) => i), // numeric indices
    valueFormatter: (index: number) => zoneLabels[index], // shows actual names
    tickLabelStyle: { 
      fontSize: 13, 
      fontWeight: 600, 
      fill: "#333" 
    },
  },
]}

  yAxis={[
    {
      label:"Time",
      scaleType: "point",    
      data: timeLabels.map((_, i) => i),
      valueFormatter: (index) => timeLabels[index],
      tickLabelStyle: {
        fontSize: 13,
        fontWeight: 600,
        fill: "#333",
      },
    },
  ]}
/>

    </Box>
  );
};

export default DynamicViolationScatterChart;
