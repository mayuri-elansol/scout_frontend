"use client";
import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { DASHBOARD_COLORS } from "@/app/config/dashboardTheme";

export interface DetectionTrendSeries {
  label: string;
  color: string;
  data: number[];
}

export interface DetectionTrendChartProps {
  title?: string;
  subtitle?: string;
  categories: string[];
  series: DetectionTrendSeries[];
}

/** Mirrors the mockup's "Detections Trend" card — multi-line hourly chart. */
const DetectionTrendChart: React.FC<DetectionTrendChartProps> = ({
  title = "Detections Trend",
  subtitle = "AI detections per hour, by use case category",
  categories,
  series,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minWidth: 0,
        height: "100%",
        overflow: "hidden",
        border: `1px solid ${DASHBOARD_COLORS.border}`,
        borderRadius: "12px",
        boxShadow: "0 1px 2px rgba(0,0,0,.08), 0 1px 3px 1px rgba(0,0,0,.06)",
      }}
    >
      <Box sx={{ flexShrink: 0, padding: "16px 20px 2px 20px" }}>
        <Typography sx={{ fontSize: "14.5px", fontWeight: 700, color: DASHBOARD_COLORS.textPrimary }}>
          {title}
        </Typography>
        <Typography
          sx={{ fontSize: "11.5px", color: DASHBOARD_COLORS.textSecondary, fontWeight: 500, mt: "2px" }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Box sx={{ padding: "4px 12px 8px 4px", flex: 1, minHeight: 0, display: "flex", alignItems: "stretch" }}>
        {/* Custom vertical axis title — kept as visible content (not the
            chart's built-in label, which reserves far more width than it
            needs and pushed the plot area off-center). */}
        <Box sx={{ flexShrink: 0, width: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography
            sx={{
              fontSize: "10.5px",
              fontWeight: 600,
              color: "#9CA3AF",
              whiteSpace: "nowrap",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            Detections
          </Typography>
        </Box>
        <Box sx={{ flex: 1, minWidth: 0, minHeight: 165 }}>
          <LineChart
            series={series.map((s) => ({
              label: s.label,
              data: s.data,
              color: s.color,
              showMark: false,
              curve: "monotoneX",
            }))}
            xAxis={[
              {
                scaleType: "point",
                data: categories,
                label: "Hour of Day",
                tickLabelStyle: { fontSize: 10, fill: DASHBOARD_COLORS.textSecondary },
                labelStyle: { fontSize: 10.5, fontWeight: 600, fill: "#9CA3AF" },
              },
            ]}
            yAxis={[
              {
                min: 0,
                tickLabelStyle: { fontSize: 10.5, fill: DASHBOARD_COLORS.textSecondary },
              },
            ]}
            margin={{ left: 2, right: 20, top: 16, bottom: 40 }}
            hideLegend
            grid={{ horizontal: true }}
            sx={{
              "& .MuiLineElement-root": { strokeWidth: 2 },
              "& .MuiChartsAxis-line": { stroke: DASHBOARD_COLORS.border },
              "& .MuiChartsAxis-tick": { stroke: DASHBOARD_COLORS.border },
              "& .MuiChartsGrid-line": { stroke: "#EEF1F5" },
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default DetectionTrendChart;
