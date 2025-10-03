"use client";
import React, {  useState } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Grid,
 
  Chip,
  Paper,
} from "@mui/material";
import {
  VideoCall,
 
} from "@mui/icons-material";
import { CameraFeed } from "./cameraFeed";

const LiveStreaming: React.FC = () => {
  const [aiProcessingEnabled, setAiProcessingEnabled] = useState(true);
  type ZoneId = "zone-a" | "zone-b" | "zone-c" | "zone-d";

  interface VideoState {
    playing: boolean;
    muted: boolean;
  }

  const [videoStates, setVideoStates] = useState<Record<ZoneId, VideoState>>({
    "zone-a": { playing: false, muted: true },
    "zone-b": { playing: false, muted: true },
    "zone-c": { playing: false, muted: true },
    "zone-d": { playing: false, muted: true },
  });

  const topMetrics = [
    {
      value: "87.5%",
      label: "PPE Compliance Rate",
      color: "#ff9800",
      borderColor: "#ff9800",
    },
    {
      value: "3",
      label: "Active Violations",
      color: "#f44336",
      borderColor: "#f44336",
    },
    {
      value: "234",
      label: "People Detected",
      color: "#4caf50",
      borderColor: "#4caf50",
    },
    {
      value: "12",
      label: "No Helmet Detected",
      color: "#f44336",
      borderColor: "#f44336",
    },
  ];

  const cameraZones = [
    {
      id: "zone-a" as ZoneId,
      name: "Production Zone A",
      status: <>LIVE</>,
      roiDetection: <>ROI DETECTION</>,
      worker: <>{"Worker #2"}</>, // wrap as React element
      compliance: <>87.5%</>,
      people: <>234</>,
      violations: <>3</>,
      noHelmet: <>12</>,
    },
    {
      id: "zone-b" as ZoneId,
      name: "Warehouse Zone B",
      status: <>LIVE</>,
      roiDetection: <>ROI DETECTION</>,
      worker: <>{"Worker #4"}</>,
      compliance: <>92.3%</>,
      people: <>45</>,
      violations: <>1</>,
      noHelmet: <>2</>,
    },
    {
      id: "zone-c" as ZoneId,
      name: "Assembly Zone C",
      status: <>LIVE</>,
      roiDetection: <>ROI DETECTION</>,
      worker: <></>, // empty element
      compliance: <>95.1%</>,
      people: <>67</>,
      violations: <>0</>,
      noHelmet: <>1</>,
    },
    {
      id: "zone-d" as ZoneId,
      name: "Loading Dock Zone D",
      status: <>LIVE</>,
      roiDetection: <>ROI DETECTION</>,
      worker: <></>,
      compliance: <></>,
      people: <>0</>,
      violations: <>0</>,
      noHelmet: <>0</>,
    },
  ];

  const toggleVideo = (zoneId: ZoneId) => {
    setVideoStates((prev) => ({
      ...prev,
      [zoneId]: {
        ...prev[zoneId],
        playing: !prev[zoneId].playing,
      },
    }));
  };

  const toggleMute = (zoneId: ZoneId) => {
    setVideoStates((prev) => ({
      ...prev,
      [zoneId]: {
        ...prev[zoneId],
        muted: !prev[zoneId].muted,
      },
    }));
  };

 

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <VideoCall sx={{ fontSize: 28, color: "#1976d2" }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#1c2025" }}
            >
              Live Streaming
            </Typography>
          </Box>

          {/* AI Processing Toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={aiProcessingEnabled}
                onChange={(e) => setAiProcessingEnabled(e.target.checked)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#4caf50",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#4caf50",
                  },
                }}
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontWeight: 600, color: "#333" }}>
                  AI Processing
                </Typography>
                <Chip
                  label={aiProcessingEnabled ? "Enabled" : "Disabled"}
                  size="small"
                  sx={{
                    backgroundColor: aiProcessingEnabled
                      ? "#e8f5e9"
                      : "#ffebee",
                    color: aiProcessingEnabled ? "#4caf50" : "#f44336",
                    fontWeight: 600,
                    fontSize: "12px",
                  }}
                />
              </Box>
            }
            sx={{ ml: 0 }}
          />
        </Box>
        <Typography
          variant="body1"
          sx={{ fontSize: "16px", color: "#5c6b7d", lineHeight: 1.5 }}
        >
          Real-time monitoring across various factory zones with AI-powered
          analytics
        </Typography>
      </Box>

      {/* Top Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {topMetrics.map((metric, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index + 1}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                border: `2px solid ${metric.borderColor}`,
                borderRadius: 2,
                backgroundColor: "white",
              }}
            >
              <Typography
                sx={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: metric.color,
                  mb: 1,
                }}
              >
                {metric.value}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#666" }}>
                {metric.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Camera Feeds Grid */}
   
<Grid container spacing={3}>
  {cameraZones.map((zone) => (
    <Grid size={{ xs: 12, lg: 6, xl: 6 }} key={zone.id}>
      <CameraFeed
        zone={zone}
        videoState={videoStates[zone.id]}
        toggleVideo={toggleVideo}
        toggleMute={toggleMute}
        aiProcessingEnabled={aiProcessingEnabled}
      />
    </Grid>
  ))}
</Grid>
    </Box>
  );
};

export default LiveStreaming;
