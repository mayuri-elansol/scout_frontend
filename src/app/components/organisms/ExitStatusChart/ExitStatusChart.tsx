"use client";
import React from "react";
import { BarChart } from "@mui/x-charts";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface ExitData {
  [key: string]: string | number | undefined;
  hour?: string;
  day?: string;
  clear: number;
  blocked: number;
}

// Generate hour-wise data for 24 hours
const generateHourData = (): ExitData[] => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, "0")}:00`,
    clear: Math.floor(Math.random() * 30) + 20,
    blocked: Math.floor(Math.random() * 20) + 5,
  }));
};

// Generate day-wise data for 30 days
const generateDayData = (): ExitData[] => {
  return Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    clear: Math.floor(Math.random() * 100) + 50,
    blocked: Math.floor(Math.random() * 50) + 10,
  }));
};

export default function ExitStatusChart() {
  const [viewMode] = React.useState<"24hr" | "days">("24hr");
  const [data, setData] = React.useState<ExitData[]>([]);

  React.useEffect(() => {
    const newData =
      viewMode === "24hr" ? generateHourData() : generateDayData();
    setData(newData);
  }, [viewMode]);

  const totalClear = data.reduce((sum, item) => sum + item.clear, 0);
  const totalBlocked = data.reduce((sum, item) => sum + item.blocked, 0);
  const total = totalClear + totalBlocked;
  const clearPercent = Math.round((totalClear / total) * 100);
  const blockedPercent = Math.round((totalBlocked / total) * 100);

  return (
    <Card elevation={3} sx={{ width: "100%", height: "100%" }}>
      <CardContent>
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            Exit Status
          </Typography>
          
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, newMode) => newMode && setViewMode(newMode)}
            size="small"
          >
            <ToggleButton value="24hr">24 Hours</ToggleButton>
            <ToggleButton value="days">30 Days</ToggleButton>
          </ToggleButtonGroup>
        </Box> */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Clear
            </Typography>
            <Typography variant="h6" color="#4caf50">
              {clearPercent}%
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Blocked
            </Typography>
            <Typography variant="h6" color="#f44336">
              {blockedPercent}%
            </Typography>
          </Box>
        </Box>

        {data.length > 0 && (
          <BarChart
            height={300}
            dataset={data}
            xAxis={[
              {
                scaleType: "band",
                dataKey: viewMode === "24hr" ? "hour" : "day",
                tickLabelStyle: {
                  angle: -45,
                  textAnchor: "end",
                  fontSize: 10,
                },
              },
            ]}
            series={[
              {
                dataKey: "clear",
                label: "Clear",
                color: "#4caf50",
                stack: "total",
              },
              {
                dataKey: "blocked",
                label: "Blocked",
                color: "#f44336",
                stack: "total",
              },
            ]}
          />
        )}
      </CardContent>
    </Card>
  );
}
