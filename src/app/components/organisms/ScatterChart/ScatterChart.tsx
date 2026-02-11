
"use client";

import React, { useMemo } from "react";
import { ScatterChart, ScatterSeries } from "@mui/x-charts/ScatterChart";
import { Stack, Typography } from "@mui/material";

interface HourData {
  label: string;
  count: number;
}

interface ZoneSeries {
  zone: string;
  data: HourData[];
}

interface ApiItem {
  title: string;
  graphs?: {
    data?: {
      granularity?: string;
      series?: ZoneSeries[];
    };
  };
}

interface Props {
  item: ApiItem; // Pass any single card object
}

export default function DynamicViolationScatterChart({ item }: Props) {
  const zoneSeries = item?.graphs?.data?.series ?? [];
  const name =  item?.graphs?.data?.granularity ?? ""
  
if (!zoneSeries.length) {
  return (
    <Stack
      width="100%"
      // height={400} 
      justifyContent="center"
      alignItems="center"
    >
      <Typography color="text.secondary">
        No data available
      </Typography>
    </Stack>
  );
}
  // Get zone names dynamically
  const zones = zoneSeries.map((s) => s.zone);

  // Create zone -> index mapping
  const zoneIndexMap = Object.fromEntries(
    zones.map((zone, index) => [zone, index])
  );
const yLabels = Array.from(
  new Set(
    zoneSeries.flatMap((z) => z.data.map((d) => d.label))
  )
);
const yIndexMap = Object.fromEntries(
  yLabels.map((label, index) => [label, index])
);
  

const series: ScatterSeries[] = useMemo(() => {
  return zoneSeries.map((zoneItem) => ({
    label: zoneItem.zone,
    markerSize: 8,

    valueFormatter: (params: any) => {
      const yLabel = yLabels[params.y];
      const count = params.z;

      return `${name}: ${yLabel} | Count: ${count}`;
    },

    data: zoneItem.data
      .filter((d) => d.count > 0)
      .map((d) => ({
        x: zoneIndexMap[zoneItem.zone],
        y: yIndexMap[d.label],
        z: d.count,
      })),
  }));
}, [zoneSeries, yLabels]); 
return (
    <Stack width="100%">
      <Typography align="center" fontWeight={600}>
        {item.title} (zone vs {name})
      </Typography>

      <ScatterChart
        height={620}
        series={series}
        xAxis={[
          {
            // min: 0,
            // max: zones.length - 1,
             min: -0.5, // 👈 add left spacing
    max: zones.length - 0.5, // 👈 add right spacing
            tickMinStep: 1,
            valueFormatter: (value:any) => zones[value] ?? "",
          },
        ]}
      yAxis={[
  {
    min: 0,
    max: yLabels.length - 1,
    tickMinStep: 1,
    label: name,
    width:80,
    valueFormatter: (value: any) => yLabels[value] ?? "",
  },
]}
        
        grid={{ horizontal: true, vertical: true }}
      />
    </Stack>
  );
}