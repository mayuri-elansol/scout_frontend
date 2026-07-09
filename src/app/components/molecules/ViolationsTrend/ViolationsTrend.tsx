import React from "react";
import { Box, Typography, Paper, Chip } from "@mui/material";

export interface TrendDataPoint {
  date: string; // e.g., "Jun 25"
  value: number;
}

export interface ViolationsTrendProps {
  data: TrendDataPoint[];
  trendPercentage: number; // e.g., 18
  trendLabel?: string; // e.g., "↑" or "↓"
  maxValue?: number; // optional, for scaling
}

const ViolationsTrend: React.FC<ViolationsTrendProps> = ({
  data,
  trendPercentage,
  trendLabel = "↑",
  maxValue,
}) => {
  // Determine color
  const isPositive = trendPercentage >= 0;
  const sign = isPositive ? "+" : "";
  const color = isPositive ? "#4caf50" : "#f44336";

  // Compute max value for scaling (if not provided)
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1);

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} color="text.secondary">
          Violations Trend (7 Days)
        </Typography>
        <Chip
          label={`${trendLabel} ${sign}${trendPercentage}%`}
          size="small"
          sx={{
            bgcolor: color,
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        />
      </Box>

      {/* Bar chart area */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          height: 160,
          gap: 1,
          mt: 1,
        }}
      >
        {data.map((point, idx) => {
          const barHeight = (point.value / max) * 100;
          return (
            <Box
              key={idx}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: `${barHeight}%`,
                  bgcolor: "#1976d2",
                  borderRadius: "4px 4px 0 0",
                  minHeight: 4,
                  transition: "height 0.3s",
                }}
              />
              <Typography variant="caption" sx={{ mt: 0.5, fontSize: 10, color: "text.secondary" }}>
                {point.date}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* X-axis labels (already shown above) – we can add extra labels if needed */}
    </Paper>
  );
};

export default ViolationsTrend;