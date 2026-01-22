"use client";
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface CameraStatusDonutChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
}

const CameraStatusDonutChart: React.FC<CameraStatusDonutChartProps> = ({
  data,
}) => {
  const theme = useTheme();
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box
      sx={{
        //  backgroundColor: theme.palette.background.paper,
        //   backgroundColor: "red",
        // borderRadius: 3,

        p: 3,
        //  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      }}
    >
      {/* Title */}
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, mb: 2, display: "flex", alignItems: "center" }}
      >
        Incident Types
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          //  bgcolor: "blue",
        }}
      >
        {/* Donut chart */}
        <Box sx={{ position: "relative", width: 220, height: 220 }}>
          <PieChart
            series={[
              {
                data: data.map((item) => ({
                  id: item.label,
                  value: item.value,
                  color: item.color,
                })),
                innerRadius: 75,
                outerRadius: 100,
              },
            ]}
            width={220}
            height={220}
            //   slotProps={{ legend: { hidden: true } }}
          />

          {/* Center Text (Total Cameras) */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1.2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontWeight: 500 }}
            >
              Total
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: theme.palette.text.primary }}
            >
              {total}
            </Typography>
          </Box>
        </Box>

        {/* Legend */}
        <Box>
          {data.map((item) => (
            <Box
              key={item.label}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  mr: 1.5,
                }}
              />
              <Typography variant="body2" sx={{ minWidth: 90 }}>
                {item.label}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {item.value} ({((item.value / total) * 100).toFixed(0)}%)
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CameraStatusDonutChart;
