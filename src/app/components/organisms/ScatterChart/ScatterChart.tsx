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
interface ScatterPoint {
  x: number; // zone index
  y: number; // label index
  z?: number; // count/value
}
interface Props {
  readonly item: ApiItem; // Pass any single card object
}
// Function to generate pastel colors
const generatePastelColor = (index: number, total: number) => {
  const hue = (index * 360) / total;
  return `hsl(${hue}, 70%, 80%)`;
};

export default function DynamicViolationScatterChart({ item }: Props) {
  const zoneSeries = useMemo(
    () => item?.graphs?.data?.series ?? [],
    [item?.graphs?.data?.series], // only recompute if the reference actually changes
  );

  const name = useMemo(
    () => item?.graphs?.data?.granularity ?? "",
    [item?.graphs?.data?.granularity],
  );
  // Get zone names dynamically
  const zones = zoneSeries.map((s) => s.zone);
  const zoneIndexMap = Object.fromEntries(
    zones.map((zone, index) => [zone, index]),
  );
  const yLabels = Array.from(
    new Set(zoneSeries.flatMap((z) => z.data.map((d) => d.label))),
  );
  const yIndexMap = Object.fromEntries(
    yLabels.map((label, index) => [label, index]),
  );

  const formatScatterValue = (
    params: ScatterPoint | null,
    yLabels: string[],
    zoneName: string,
  ) => {
    if (!params) return ""; // handle null safely
    const yLabel = yLabels[params.y] ?? "Unknown";
    const count = params.z ?? 0; // default to 0 if undefined
    return `${zoneName}: ${yLabel} | Count: ${count}`;
  };
  const series: ScatterSeries[] = useMemo(() => {
    return zoneSeries.map((zoneItem, index) => ({
      label: zoneItem.zone,
      markerSize: 8,
      color: generatePastelColor(index, zoneSeries.length),
      valueFormatter: (params) => formatScatterValue(params, yLabels, name),
      data: zoneItem.data
        .filter((d) => d.count > 0)
        .map((d) => ({
          x: zoneIndexMap[zoneItem.zone],
          y: yIndexMap[d.label],
          z: d.count,
        })),
    }));
  }, [zoneSeries, yLabels, name, zoneIndexMap, yIndexMap]);
  // Early return for no data
  if (!zoneSeries.length) {
    return (
      <Stack width="100%" justifyContent="center" alignItems="center">
        <Typography color="text.secondary">No data available</Typography>
      </Stack>
    );
  }

  return (
    <Stack width="100%">
      <Typography align="center" fontWeight={600}>
        {item.title} (zone vs {name})
      </Typography>
      <ScatterChart
        height={495}
        series={series}
        xAxis={[
          {
            label: "Zone",
            min: -0.5,
            max: zones.length - 0.5,
            tickMinStep: 1,
            valueFormatter: (value: number) => zones[value] ?? "",
          },
        ]}
        yAxis={[
          {
            min: 0,
            max: yLabels.length - 1,
            tickMinStep: 1,
            label: name,
            width: 80,
            valueFormatter: (value: number) => yLabels[value] ?? "",
          },
        ]}
        grid={{ horizontal: true, vertical: true }}
      />
    </Stack>
  );
}
