import React from "react";
import { Grid, Box } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import KpiCard from "../../molecules/KpiCard/KpiCard";

interface KpiData {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  trendColor: string;
  color: string;
  bgColor: string;
  icon: SvgIconComponent;
}

interface KpiGridProps {
  kpis: KpiData[];
  columns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  spacing?: number;
  maxWidth?: string | number;
}

const KpiGrid: React.FC<KpiGridProps> = ({
  kpis,
  columns = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
    xl: 3,
  },
  spacing = 3,
  maxWidth,
}) => {
  return (
    <Box sx={{ width: "100%", maxWidth: maxWidth }}>
      <Grid container spacing={spacing}>
        {kpis.map((kpi, index) => (
          <Grid
            size={{
              xs: columns.xs,
              sm: columns.sm,
              md: columns.md,
              lg: columns.lg,
              xl: columns.xl,
            }}
            key={index + 1}
          >
            <KpiCard
              title={kpi.title}
              value={kpi.value}
              subtitle={kpi.subtitle}
              trend={kpi.trend}
              trendColor={kpi.trendColor}
              color={kpi.color}
              bgColor={kpi.bgColor}
              icon={kpi.icon}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KpiGrid;
