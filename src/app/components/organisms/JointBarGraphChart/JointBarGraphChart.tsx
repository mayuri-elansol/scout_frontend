"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts";

export interface VehicleChartData {
  label: string;
  data: number[];
  color?: string;
}

export interface VehicleCountBarChartProps {
  times: string[];
  seriesData: VehicleChartData[];
}

const VehicleCountBarChart: React.FC<VehicleCountBarChartProps> = ({
  times,
  seriesData,
}) => {
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

  if (!times?.length || !seriesData?.length) {
    return (
      <Box
        ref={containerRef}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // 🚫 Prevent scrollbars
      }}
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <BarChart
          width={dimensions.width}
          height={dimensions.height}
          series={seriesData.map((s) => ({
            label: s.label,
            data: s.data,
            color: s.color,
          }))}
          xAxis={[
            {
              scaleType: "band",
              data: times,
              tickLabelStyle: {
                fontSize: isMobile ? 10 : 12,
                fontWeight: 600,
                fill: "#444",
              },
            },
          ]}
          grid={{ horizontal: true, vertical: false }}
          margin={{
            top: 40,
            right: 40,
            bottom: 50,
            left: 60, // space for axis labels and legend
          }}
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

export default VehicleCountBarChart;
