import React from "react";
import { Grid } from "@mui/material";
import LiveMetricCard from "../../molecules/LiveMetricCard/LiveMetricCard";

export interface LiveMetric {
  value: string;
  label: string;
  color: string;
  borderColor?: string;
}

export interface LiveMetricsGridProps {
  /** Array of metrics to display */
  metrics: LiveMetric[];
  /** Grid spacing */
  spacing?: number;
  /** Custom styling */
  sx?: object;
}

const LiveMetricsGrid: React.FC<LiveMetricsGridProps> = ({
  metrics,
  spacing = 3,
  sx = {},
}) => {
  return (
    <Grid container spacing={spacing} sx={sx}>
      {metrics.map((metric, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index + 1}>
          <LiveMetricCard
            value={metric.value}
            label={metric.label}
            color={metric.color}
            borderColor={metric.borderColor}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default LiveMetricsGrid;
