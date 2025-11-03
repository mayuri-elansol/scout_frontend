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
  zoneName?: string;
  data: PieDataItem[];
  count: number;
}

const DynamicPieChart: React.FC<DynamicPieChartProps> = ({
  data,
  zoneName,
  count,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<number>(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ✅ Efficient resize observer (avoids flicker)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      // Only update if change is significant to prevent flicker
      setSize((prev) => {
        const newSize = Math.floor(Math.min(width, height));
        return Math.abs(newSize - prev) > 5 ? newSize : prev;
      });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const TOTAL = data.reduce((sum, item) => sum + item.value, 0);
  const getArcLabel = (params: DefaultizedPieValueType) =>
    `${((params.value / TOTAL) * 100).toFixed(0)}%`;

  return (
    <CardContent
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        p: "8px !important",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "&:last-child": { paddingBottom: 0 },
      }}
    >
      {zoneName && (
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 1,
            textAlign: "center",
          }}
        >
          {zoneName}
        </Typography>
      )}

      {/* Chart Wrapper */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {size > 0 && (
          <PieChart
            series={[
              {
                data,
                // outerRadius: size / 4,
                outerRadius: size / count,

                arcLabel: getArcLabel,
              },
            ]}
            colors={data.map((item) => item.color)}
            // width={size}
            // height={size}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontSize: isMobile ? 10 : 13,
                fontWeight: 600,
              },
              "& path": {
                stroke: "#fff",
                strokeWidth: 2,
              },
              padding: 0,
            }}
          />
        )}
      </Box>
    </CardContent>
  );
};

export default DynamicPieChart;
