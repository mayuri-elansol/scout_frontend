"use client";

import React, { useMemo } from "react";
import { ScatterChart, ScatterSeries } from "@mui/x-charts/ScatterChart";
import { Stack, Typography } from "@mui/material";

export interface WorkforceGatePoint {
  gate: string;
  idleCount: number;
  workingCount: number;
  notPresentCount: number;
}

interface Props {
  readonly data: WorkforceGatePoint[];
}



export default function DynamicViolationScatterChartForWorkforce({
  data,
}: Props) {
  const gates = data.map((d) => d.gate);
  const statusLabels = ["Idle", "Working", "Not Present"];

  const gateIndexMap = Object.fromEntries(
    gates.map((gate, index) => [gate, index])
  );

  const statusIndexMap = Object.fromEntries(
    statusLabels.map((label, index) => [label, index])
  );

  const series: ScatterSeries[] = useMemo(() => {
    return statusLabels.map((status) => ({
      label: status,
      markerSize: 10,
      valueFormatter: (params: any) => {
        const gate = gates[params.x];
        const label = statusLabels[params.y];
        const count = params.z;
        return `Gate: ${gate} | ${label}: ${count}`;
      },
      data: data
        .map((item) => {
          let count = 0;
          if (status === "Idle") count = item.idleCount;
          if (status === "Working") count = item.workingCount;
          if (status === "Not Present") count = item.notPresentCount;

          return count > 0
            ? { x: gateIndexMap[item.gate], y: statusIndexMap[status], z: count }
            : null;
        })
        .filter(Boolean) as any[],
    }));
  }, [data, gates, gateIndexMap, statusLabels, statusIndexMap]);

  // Conditional render **after** hooks
  if (!data.length) {
    return (
      <Stack width="100%" height={650} justifyContent="center" alignItems="center">
        <Typography color="text.secondary">No data available</Typography>
      </Stack>
    );
  }

  return (
    <Stack width="100%">
      <Typography align="center" fontWeight={600}>
        Employee in Critical Area (Gate vs Status)
      </Typography>
      <ScatterChart
        height={650}
        series={series}
        xAxis={[
          {
            min: -0.5,
            max: gates.length - 0.5,
            tickMinStep: 1,
            valueFormatter: (value: any) => gates[value] ?? "",
          },
        ]}
        yAxis={[
          {
            min: 0,
            max: statusLabels.length - 1,
            tickMinStep: 1,
            label: "Status",
            width: 100,
            valueFormatter: (value: any) => statusLabels[value] ?? "",
          },
        ]}
        grid={{ horizontal: true, vertical: true }}
      />
    </Stack>
  );
}