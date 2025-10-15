"use client";
import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Card, CardContent } from "@mui/material";

// Generate hour-wise data for 24 hours
const generateHourData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${i.toString().padStart(2, "0")}:00`,
      incidents: Math.floor(Math.random() * 8) + 1,
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
      incidents: Math.floor(Math.random() * 12) + 2,
    });
  }
  return data;
};

export default function FallIncidentBarChart() {
  const [viewMode] = React.useState("24hr");

  // Get data based on view mode
  const dataset = viewMode === "24hr" ? generateHourData() : generateDayData();

  return (
    <Card elevation={3} sx={{ width: "100%", height: "100%" }}>
      <CardContent>
        <LineChart
          height={400}
          dataset={dataset}
          xAxis={[
            {
              dataKey: "time",
              scaleType: "band",
              tickLabelStyle: {
                angle: viewMode === "24hr" ? 0 : -45,
                textAnchor: viewMode === "24hr" ? "middle" : "end",
                fontSize: 11,
              },
            },
          ]}
          series={[
            {
              dataKey: "incidents",
              label: "Fall Incidents",
              color: "#e74c3c",
              // showMark: true,
              curve: "linear",
            },
          ]}
          margin={{
            bottom: viewMode === "24hr" ? 60 : 100,
            left: 60,
            right: 20,
            top: 20,
          }}
        />
      </CardContent>
    </Card>
  );
}
