"use client";

import * as React from "react";
import { BarChart } from "@mui/x-charts";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function UnauthorizedParkingChart() {
  const dataset = [
    { time: "09:00", car: 3, notCar: 1 },
    { time: "09:30", car: 5, notCar: 2 },
    { time: "10:00", car: 2, notCar: 3 },
    { time: "10:30", car: 6, notCar: 1 },
    { time: "11:00", car: 4, notCar: 2 },
    { time: "11:30", car: 7, notCar: 3 },
    { time: "12:00", car: 5, notCar: 4 },
    { time: "12:30", car: 8, notCar: 2 },
  ];

  return (

      <CardContent sx={{ minWidth: 700 }}>
    

        {/* <Box sx={{ height: 400, minWidth: 800 }}> */}
          <BarChart
            dataset={dataset}
            xAxis={[{ dataKey: "time", label: "Time" }]}
            series={[
              { dataKey: "car", label: "Car Detected" },
              { dataKey: "notCar", label: "Other Object Detected" },
            ]}
            height={400}
            margin={{ top: 30, bottom: 40 }}
            grid={{ horizontal: true }}
          />
        {/* </Box> */}
      </CardContent>
  );
}
