"use client";

import React, { useState } from "react";
import {CardContent} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

// Generate hour-wise data for 24 hours
const generateHourData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i.toString().padStart(2, "0")}:00`,
      helmet: Math.floor(Math.random() * 30) + 5,
      vest: Math.floor(Math.random() * 25) + 3,
      glass: Math.floor(Math.random() * 20) + 2,
    });
  }
  return data;
};

// Generate day-wise data for 30 days
const generateDayData = () => {
  const data = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = `${date.getDate()}/${date.getMonth() + 1}`;

    data.push({
      time: dateStr,
      helmet: Math.floor(Math.random() * 50) + 10,
      vest: Math.floor(Math.random() * 40) + 5,
      glass: Math.floor(Math.random() * 30) + 5,
    });
  }
  return data;
};

const PPEComplianceChart = () => {
  const [viewMode, setViewMode] = useState("24hr");

  // Get data based on view mode
  const displayData =
    viewMode === "24hr" ? generateHourData() : generateDayData();


  // Prepare data for MUI X Charts
  const xLabels = displayData.map((d) => d.time);
  const helmetData = displayData.map((d) => d.helmet);
  const vestData = displayData.map((d) => d.vest);
  const glassData = displayData.map((d) => d.glass);

  return (
    // <Card elevation={3} sx={{ width: "100%", height: "85%" }}>
      <CardContent>
        <BarChart
        width={750} height={480} 
          series={[
            {
              data: helmetData,
              label: "Helmet Violations",
              color: "#f44336",
              stack: "PPE",
            },
            {
              data: vestData,
              label: "Vest Violations",
              color: "#ff9800",
              stack: "PPE",
            },
            {
              data: glassData,
              label: "Glass Violations",
              color: "#2196f3",
              stack: "PPE",
            },
          ]}
          xAxis={[
            {
              scaleType: "band",
              data: xLabels,
              tickLabelStyle: {
                angle: viewMode === "24hr" ? 0 : -45,
                textAnchor: viewMode === "24hr" ? "middle" : "end",
                fontSize: 11,
              },
            },
          ]}
          yAxis={[{ label: "Violations" }]}
          margin={{
            bottom: viewMode === "24hr" ? 80 : 100,
            // right: 20,
            // top: 20,
          }}
        />
      </CardContent>
    // </Card>
  );
};

export default PPEComplianceChart;
