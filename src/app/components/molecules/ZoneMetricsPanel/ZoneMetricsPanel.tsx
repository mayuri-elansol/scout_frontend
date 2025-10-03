import React from "react";
import { Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
export interface ZoneMetric {
  value: string | number;
  label: string;
  color: string;
}

export interface ZoneMetricsPanelProps {
  /** Array of metrics to display */
  metrics: ZoneMetric[];
  /** Layout direction */
  direction?: "row" | "column";
  /** Custom spacing between metrics */
  spacing?: number;
  /** Custom styling */
  sx?: object;
}

const ZoneMetricsPanel: React.FC<ZoneMetricsPanelProps> = ({
  metrics,
  direction = "row",
  spacing = 2,
  sx = {},
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: direction,
        justifyContent: direction === "row" ? "space-between" : "flex-start",
        gap: spacing,
        ...sx,
      }}
    >
      {metrics.map((metric, index) => (
        <Box key={uuidv4() + index} sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
              color: metric.color,
            }}
          >
            {metric.value}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#666",
              lineHeight: 1.2,
            }}
          >
            {metric.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ZoneMetricsPanel;
