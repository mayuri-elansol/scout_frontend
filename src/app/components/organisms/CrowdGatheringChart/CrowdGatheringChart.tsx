"use client";

import * as React from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts";
import { Card, CardContent, Typography, Box, Chip, ToggleButtonGroup, ToggleButton } from "@mui/material";

// Define the data type with index signature
interface CrowdData {
  time: string;
  count: number;
  threshold: number;
  [key: string]: string | number; // Add index signature
}

// Generate hour-wise data for 24 hours
const generateHourData = (): CrowdData[] => {
  const data: CrowdData[] = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0');
    data.push({
      time: `${hour}:00`,
      count: Math.floor(Math.random() * 12) + 4,
      threshold: 10,
    });
  }
  return data;
};

// Generate day-wise data for 30 days
const generateDayData = (): CrowdData[] => {
  const data: CrowdData[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = `${date.getDate()}/${date.getMonth() + 1}`;
    
    data.push({
      time: dateStr,
      count: Math.floor(Math.random() * 20) + 10,
      threshold: 20,
    });
  }
  return data;
};

export default function CrowdGatheringChart() {
  const [viewMode, setViewMode] = React.useState<'24hr' | 'days'>('24hr');
  // Initialize with data immediately
  const [dataset, setDataset] = React.useState<CrowdData[]>(generateHourData());

  // Generate data when viewMode changes
  React.useEffect(() => {
    const newData = viewMode === '24hr' ? generateHourData() : generateDayData();
    setDataset(newData);
  }, [viewMode]);
  return (
    <Card elevation={0} sx={{ width: "100%", height: "100%", border: '1px solid #e0e0e0' }}>
      <CardContent>

        {dataset.length > 0 ? (
          <Box sx={{ width: "100%", height: 400 }}>
            <LineChart
              dataset={dataset}
              width={1100}
              height={380}
              series={[
                {
                  dataKey: "count",
                  label: "count",
                  color: "#e57373",
                  showMark: false,
                  curve: "catmullRom",
                },
                {
                  dataKey: "threshold",
                  label: "threshold",
                  color: "#4dd0e1",
                  showMark: false,
                  curve: "linear",
                },
              ]}
              xAxis={[
                {
                  dataKey: "time",
                  scaleType: "point",
                  tickLabelStyle: { 
                    fontSize: 12 
                  },
                },
              ]}
              yAxis={[{ 
                min: 0,
              }]}
              sx={{
                [`& .${lineElementClasses.root}`]: {
                  strokeWidth: 2,
                },
                [`& .${lineElementClasses.root}:nth-of-type(2)`]: {
                  strokeDasharray: "5,5",
                  strokeWidth: 2,
                },
                '& .MuiMarkElement-root': {
                  scale: '0.8',
                  fill: '#e57373',
                  strokeWidth: 2,
                }
              }}
              margin={{ top: 20, bottom: 60, left: 60, right: 30 }}
              grid={{ vertical: true, horizontal: true }}
            />
          </Box>
        ) : (
          <Typography>Loading data...</Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 20, height: 2, bgcolor: '#e57373' }} />
            <Typography variant="caption" color="text.secondary">count</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 20, height: 2, bgcolor: '#4dd0e1', borderTop: '2px dashed #4dd0e1' }} />
            <Typography variant="caption" color="text.secondary">threshold</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}