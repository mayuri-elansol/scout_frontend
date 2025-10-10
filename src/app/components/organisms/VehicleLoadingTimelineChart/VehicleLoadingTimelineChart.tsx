"use client";

import * as React from "react";
import { LineChart } from "@mui/x-charts";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function VehicleLoadingTimelineChart() {
  const dataset = [
    { time: "09:00", started: 3, stopped: 1 },
    { time: "09:30", started: 5, stopped: 3 },
    { time: "10:00", started: 7, stopped: 6 },
    { time: "10:30", started: 4, stopped: 8 },
    { time: "11:00", started: 6, stopped: 7 },
    { time: "11:30", started: 8, stopped: 5 },
    { time: "12:00", started: 10, stopped: 7 },
    { time: "12:30", started: 9, stopped: 10 },
  ];

  return (
    <Card
      sx={{
        p: 2,
        borderRadius: "16px",
        boxShadow: 3,
        overflowX: "auto", // horizontal scroller
      }}
    >
      <CardContent sx={{ minWidth: 700 }}>
        <Typography variant="h6" gutterBottom>
          🚚 Vehicle Loading / Unloading Timeline
        </Typography>

        <Box sx={{ height: 400, minWidth: 800 }}>
          <LineChart
            dataset={dataset}
            xAxis={[{ dataKey: "time", label: "Time" }]}
            series={[
              { dataKey: "started", label: "Loading Started" },
              { dataKey: "stopped", label: "Loading Stopped" },
            ]}
            height={380}
            margin={{ top: 30, bottom: 40 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
