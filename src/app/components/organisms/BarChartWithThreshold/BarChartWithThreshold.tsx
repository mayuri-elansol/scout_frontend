"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { CardContent, useTheme, useMediaQuery, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export interface SeriesConfig<T> {
  dataKey: keyof T;
  label: string;
  color: string;
}

export interface DynamicBarChartWithThresholdProps<
  T extends Record<string, number | string>
> {
  data: T[];
  xAxisKey: keyof T;
  series: SeriesConfig<T>[];
  thresholdValue: number;
  thresholdLabel?: string;
  thresholdColor?: string;
  yAxisLabel?: string;
  stackId?: string;
}

const DynamicBarChartWithThreshold = <
  T extends Record<string, number | string>
>({
  data,
  xAxisKey,
  series,
  thresholdValue,
  thresholdLabel = "Threshold",
  thresholdColor = "red",
  yAxisLabel = "User Count",
  stackId = "stack",
}: DynamicBarChartWithThresholdProps<T>) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // ✅ Prevent flicker — render chart only when container has valid size
  useEffect(() => {
    const checkSize = () => {
      const width = containerRef.current?.offsetWidth ?? 0;
      const height = containerRef.current?.offsetHeight ?? 0;
      if (width > 50 && height > 50) {
        setReady(true);
      } else {
        setReady(false);
      }
    };

    checkSize();
    const resizeObserver = new ResizeObserver(checkSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  // Defensive guards
  if (!data || data.length === 0 || !Array.isArray(series)) return null;

  // ✅ Prepare data
  const xLabels = useMemo(
    () => data.map((d) => String(d[xAxisKey])),
    [data, xAxisKey]
  );

  const allValues = useMemo(() => {
    const vals = series.flatMap((s) =>
      data.map((d) => Number(d[s.dataKey]) || 0)
    );
    return vals.length ? vals : [0];
  }, [data, series]);

  const maxValue = Math.max(...allValues, thresholdValue);
  const minValue = Math.min(0, ...allValues, thresholdValue);

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
        display: "flex",
        flexDirection: "column",
        "&:last-child": {
          paddingBottom: "0px !important",
        },
        position: "relative",
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          flex: 1,
          width: "100%",
          height: 300,
          minHeight: 250,
          position: "relative",
        }}
      >
        {ready && (
          <>
            <BarChart
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
              yAxis={[{ label: yAxisLabel, min: minValue }]}
              margin={{ top: 40, right: 30, bottom: 40, left: 50 }}
            />

            {/* ✅ Responsive threshold line overlay */}
            {maxValue > minValue && (
              <Box
                sx={{
                  position: "absolute",
                  top: `${
                    (1 - (thresholdValue - minValue) / (maxValue - minValue)) *
                    100
                  }%`,
                  left: 0,
                  right: 0,
                  borderTop: `2px dashed ${thresholdColor}`,
                  pointerEvents: "none",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: "-12px",
                    background: "white",
                    fontSize: 12,
                    color: thresholdColor,
                    px: "4px",
                  }}
                >
                  {thresholdLabel} ({thresholdValue})
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </CardContent>
  );
};

export default DynamicBarChartWithThreshold;
