"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Grid,
  Chip,
} from "@mui/material";
import { CameraFeed } from "./cameraFeed";
import { v4 as uuidv4 } from "uuid";
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

  const cameraZones = [
    {
      id: "zone-a" as ZoneId,
      name: "Production Zone A",
      status: "LIVE",
      roiDetection: "ROI DETECTION",
      worker: <>{"Worker #2"}</>, // wrap as React element
      compliance: "87.5%",
      people: "24",
      violations: "3",
      noHelmet: "12",
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
      <Box sx={{ mb: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            //  mb: 1,
          }}
        >
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
      </Box>

      {/* Top Metrics */}
      {/* <Grid container spacing={3} sx={{ mb: 0.6 }}>
        {topMetrics.map((metric, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={uuidv4() + index}>
            <Paper
              sx={{
                p: 0.5,
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
                  mb: 0.5,
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
      </Grid> */}

      {/* Camera Feeds Grid */}

      <Grid container spacing={2}>
        {cameraZones.map((zone, index) => (
          <Grid size={{ xs: 12, lg: 6, xl: 6 }} key={uuidv4() + index}>
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
