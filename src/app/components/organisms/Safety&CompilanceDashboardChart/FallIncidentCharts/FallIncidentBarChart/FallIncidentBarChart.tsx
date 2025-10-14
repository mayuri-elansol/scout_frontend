
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
const FallIncidentBarChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const displayData = generateHourData();
  const xLabels = displayData.map((d) => d.time);
  const fallData = displayData.map((d) => d.fire);


  const chartHeight = isMobile ? 300 : isTablet ? 400 : 480;

  return (
    <CardContent sx={{ width: "100%", p: 2 }}>
      <BarChart
        height={chartHeight}
        series={[
          {
            data: fallData,
            label: "Fall Incident",
            color: "#ef5350",
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

export default FallIncidentBarChart;