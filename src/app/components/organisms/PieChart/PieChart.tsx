"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  CardContent,
  useTheme,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { DefaultizedPieValueType } from "@mui/x-charts/models";

export interface PieDataItem {
  label: string;
  value: number;
  color: string;
}

export interface DynamicPieChartProps {
  carttitle: string;
  data: PieDataItem[];
 // count: number;
}

const DynamicPieChart: React.FC<DynamicPieChartProps> = ({
  data,
  carttitle,
 // count,
}) => {
 const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setContainerSize((prev) => {
        const newWidth = Math.floor(width);
        const newHeight = Math.floor(height);
        if (
          Math.abs(newWidth - prev.width) > 5 ||
          Math.abs(newHeight - prev.height) > 5
        ) {
          return { width: newWidth, height: newHeight };
        }
        return prev;
      });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const TOTAL = data.reduce((sum, item) => sum + item.value, 0);
  const getArcLabel = (params: DefaultizedPieValueType) =>
    `${((params.value / TOTAL) * 100).toFixed(0)}%`;

  // Calculate optimal chart size based on container
  // const chartSize = Math.min(containerSize.width, containerSize.height);
  // const outerRadius = count ? Math.max(chartSize / count, 80) : 80;
//   const chartSize = Math.min(containerSize.width, containerSize.height);
// const outerRadius = Math.max(chartSize / 2.5, 80);


const chartSize = Math.min(containerSize.width, containerSize.height);
// Preferred radius: between 80 and 120 based on container size.
const preferredRadius = Math.min(Math.max(chartSize / 2.5, 80), 120);
// Hard cap: the chart (plus ~28px for the title below it) must fit inside the
// container in both directions, otherwise it overflows and causes scrollbars.
const TITLE_ALLOWANCE = 28;
const maxRadiusForContainer =
  containerSize.width > 0 && containerSize.height > 0
    ? Math.min(
        (containerSize.width - 16) / 2,
        (containerSize.height - TITLE_ALLOWANCE) / 2
      )
    : 120;
// Never below 40 so the chart stays visible even in tiny slots.
const outerRadius = Math.max(
  Math.min(preferredRadius, maxRadiusForContainer),
  40
);
// Title and arc-label fonts scale down with the pie so proportions stay balanced.
const titleFontSize = outerRadius >= 100 ? 12 : outerRadius >= 70 ? 11 : 10;
const arcLabelFontSize = outerRadius >= 100 ? 13 : outerRadius >= 70 ? 11 : 9;

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
    <CardContent
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        minWidth: 0,
        overflow: "hidden",
        p: "0px !important",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        justifyContent: "center",
        "&:last-child": { paddingBottom: 0 },
      }}
    >
      {/* Chart Wrapper - centered with exact size */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 1,
          minWidth: 0,
          maxWidth: "100%",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* {chartSize > 0 && ( */}
          <>
            <PieChart
              series={[
                {
                  data,
                  outerRadius,
                  arcLabel: getArcLabel,
                  paddingAngle: 0,
                },
              ]}
              colors={data.map((item) => item.color)}
              width={outerRadius * 2}
              height={outerRadius * 2}
              sx={{
                "& .MuiChartsLegend-root": {
                  display: "none !important",
                },
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontSize: isMobile ? 10 : arcLabelFontSize,
                  fontWeight: 600,
                },
                "& path": {
                  stroke: "#fff",
                  strokeWidth: 2,
                },
              }}
              margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            />
            <Typography
              sx={{
                fontWeight: 500,
                textAlign: "center",
                fontSize: isMobile ? "10px" : `${titleFontSize}px`,
                lineHeight: 1.2,
                maxWidth: outerRadius * 2 + 40,
              }}
            >
              {carttitle}
            </Typography>
          </>
        {/* )
        } */}
      </Box>
    </CardContent>
  );
};

export default DynamicPieChart;
