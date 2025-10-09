"use client";

import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  Box,
  Card,
  CardContent,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import dayjs from "dayjs";

const oneHour = 60 * 60 * 1000;
const oneDay = 24 * oneHour;

const professionalColors = {
  fire: "#e74c3c", // red
  smoke: "#7f8c8d", // gray
  gas: "#f1c40f", // yellow
  oil: "#9b59b6", // purple
};

function randBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateTimeData(hours: number, base = 0) {
  const data = [];
  const now = new Date();
  for (let i = hours; i >= 0; i--) {
    data.push({
      time: new Date(now.getTime() - i * oneHour),
      fire: base + randBetween(5, 20),
      smoke: base + randBetween(3, 15),
      gas: base + randBetween(1, 10),
      oil: base + randBetween(1, 8),
    });
  }
  return data;
}

export default function ZoneHazardLineChart() {
  const [running, setRunning] = React.useState(false);
  const [viewRange, setViewRange] = React.useState("24h");
  const [data, setData] = React.useState(generateTimeData(24));

  // Live update simulation
  React.useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setData((prev) => {
        const nextPoint = {
          time: new Date(prev[prev.length - 1].time.getTime() + oneHour),
          fire: randBetween(5, 20),
          smoke: randBetween(3, 15),
          gas: randBetween(1, 10),
          oil: randBetween(1, 8),
        };
        return [...prev.slice(1), nextPoint];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const handleRangeChange = (event: any, newRange: string | null) => {
    if (newRange) {
      setViewRange(newRange);
      setData(
        newRange === "24h"
          ? generateTimeData(24)
          : generateTimeData(24 * 7, 10)
      );
    }
  };

  const totals = data.reduce(
    (acc, curr) => ({
      fire: acc.fire + curr.fire,
      smoke: acc.smoke + curr.smoke,
      gas: acc.gas + curr.gas,
      oil: acc.oil + curr.oil,
    }),
    { fire: 0, smoke: 0, gas: 0, oil: 0 }
  );

  const xLabels = data.map((d) => d.time);
  const fireData = data.map((d) => d.fire);
  const smokeData = data.map((d) => d.smoke);
  const gasData = data.map((d) => d.gas);
  const oilData = data.map((d) => d.oil);

  return (
    <Card elevation={4} sx={{ width: "100%", height: "100%" }}>
      <CardContent>
      

      

        {/* Totals */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          <Chip label={`Fire: ${totals.fire}`} sx={{ backgroundColor: professionalColors.fire, color: "white" }} />
          <Chip label={`Smoke: ${totals.smoke}`} sx={{ backgroundColor: professionalColors.smoke, color: "white" }} />
          <Chip label={`Gas: ${totals.gas}`} sx={{ backgroundColor: professionalColors.gas, color: "black" }} />
          <Chip label={`Oil: ${totals.oil}`} sx={{ backgroundColor: professionalColors.oil, color: "white" }} />
        </Box>

        {/* Line Chart */}
        <Box sx={{ width: "100%", height: 400 }}>
          <LineChart
            height={350}
            skipAnimation
            series={[
              { data: fireData, label: "Fire", color: professionalColors.fire, showMark: false },
              { data: smokeData, label: "Smoke", color: professionalColors.smoke, showMark: false },
              { data: gasData, label: "Gas", color: professionalColors.gas, showMark: false },
              { data: oilData, label: "Oil", color: professionalColors.oil, showMark: false },
            ]}
            xAxis={[
              {
                scaleType: "time",
                data: xLabels,
                valueFormatter: (value) =>
                  dayjs(value).format(viewRange === "24h" ? "HH:mm" : "MMM DD"),
                label: viewRange === "24h" ? "Hour" : "Date",
              },
            ]}
            yAxis={[{ label: "Detections" }]}
            margin={{ right: 30, bottom: 70, left: 60, top: 20 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
