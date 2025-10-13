"use client";

import React from "react";
import { CardContent, useTheme, useMediaQuery } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const generateHourData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i.toString().padStart(2, "0")}:00`,
      fire: Math.floor(Math.random() * 30) + 10,
      smoke: Math.floor(Math.random() * 35) + 15,
      gas: Math.floor(Math.random() * 40) + 20,
      oil: Math.floor(Math.random() * 25) + 10,
    });
  }
  return data;
};
const HazardDetectionBarChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const displayData = generateHourData();
  const xLabels = displayData.map((d) => d.time);
  const fireData = displayData.map((d) => d.fire);
  const smokeData = displayData.map((d) => d.smoke);
  const gasData = displayData.map((d) => d.gas);
  const oilData = displayData.map((d) => d.oil);

  const chartHeight = isMobile ? 300 : isTablet ? 400 : 480;

  return (
    <CardContent sx={{ width: "100%", p: 2 }}>
      <BarChart
        height={chartHeight}
        series={[
          {
            data: fireData,
            label: "Fire Violations",
            color: "#ef5350",
            stack: "hazard",
          },
          {
            data: smokeData,
            label: "Smoke Violations",
            color: "#ff9800",
            stack: "hazard",
          },
          {
            data: gasData,
            label: "Gas Violations",
            color: "#42a5f5",
            stack: "hazard",
          },
          {
            data: oilData,
            label: "Oil Violations",
            color: "#66bb6a",
            stack: "hazard",
          },
        ]}
        xAxis={[
          {
            scaleType: "band",
            data: xLabels,
            tickLabelStyle: {
              angle: isMobile ? -45 : 0,
              textAnchor: isMobile ? "end" : "middle",
              fontSize: isMobile ? 9 : 11,
            },
          },
        ]}
        yAxis={[{ label: "Violations" }]}
        margin={{
         bottom: isMobile ? 80 : 50,
          left: 20,
          right: 10,
          top: 10,
        }}
      />
    </CardContent>
  );
};

export default HazardDetectionBarChart;