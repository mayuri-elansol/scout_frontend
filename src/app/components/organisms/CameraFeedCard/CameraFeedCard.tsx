"use client";

import React, { useState } from "react";
import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import { VideoCall, Circle, Fullscreen } from "@mui/icons-material";
import RoiOverlay from "../../molecules/RoiOverlay/RoiOverlay";
import VideoControlPanel from "../../molecules/VideoControlPanel/VideoControlPanel";
import ZoneMetricsPanel, {
  ZoneMetric,
} from "../../molecules/ZoneMetricsPanel/ZoneMetricsPanel";

export interface CameraFeedCardProps {
  /** Zone information */
  zone: {
    id: string;
    name: string;
    status: "LIVE" | "OFFLINE" | "MAINTENANCE";
    worker?: string;
  };
  /** Zone metrics data */
  metrics: ZoneMetric[];
  /** Whether AI processing is enabled */
  aiProcessingEnabled?: boolean;
  /** ROI detection label */
  roiLabel?: string;
  /** Video state handlers */
  onPlayPause?: () => void;
  onMuteToggle?: () => void;
  onFullscreen?: () => void;
  /** Initial video states */
  initialPlaying?: boolean;
  initialMuted?: boolean;
  /** Custom styling */
  sx?: object;
}

const CameraFeedCard: React.FC<CameraFeedCardProps> = ({
  zone,
  metrics,
  aiProcessingEnabled = true,
  roiLabel = "ROI DETECTION",
  onPlayPause,
  onMuteToggle,
  onFullscreen,
  initialPlaying = false,
  initialMuted = true,
  sx = {},
}) => {
  const [isPlaying, setIsPlaying] = useState(initialPlaying);
  const [isMuted, setIsMuted] = useState(initialMuted);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    onPlayPause?.();
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    onMuteToggle?.();
  };

  const handleFullscreen = () => {
    onFullscreen?.();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "LIVE":
        return "#4caf50";
      case "OFFLINE":
        return "#f44336";
      case "MAINTENANCE":
        return "#ff9800";
      default:
        return "#666";
    }
  };

  return (
    <Card sx={{ height: "100%", ...sx }}>
      <Box sx={{ position: "relative", p: 2, pb: 1 }}>
        {/* Zone Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <VideoCall sx={{ color: "#666", fontSize: 20 }} />
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, color: "#333" }}
            >
              {zone.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Circle sx={{ fontSize: 8, color: getStatusColor(zone.status) }} />
            <Typography
              variant="caption"
              sx={{ color: getStatusColor(zone.status), fontWeight: 600 }}
            >
              {zone.status}
            </Typography>
          </Box>
        </Box>

        {/* Video Player */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 280,
            backgroundColor: "#2c2c2c",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* ROI Detection Overlay */}
          <RoiOverlay
            visible={aiProcessingEnabled}
            detectionLabel={roiLabel}
            workerLabel={zone.worker}
          />

          {/* Camera Icon/Placeholder */}
          <VideoCall sx={{ fontSize: 60, color: "#666" }} />
          <Typography
            sx={{
              position: "absolute",
              bottom: 40,
              color: "#999",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            AI-Enhanced Live Feed
            <br />
            {zone.name}
          </Typography>

          {/* Video Controls */}
          <VideoControlPanel
            isPlaying={isPlaying}
            isMuted={isMuted}
            onPlayPause={handlePlayPause}
            onMuteToggle={handleMuteToggle}
            position="bottom-left"
          />

          {/* Fullscreen button */}
          <IconButton
            size="small"
            onClick={handleFullscreen}
            sx={{
              position: "absolute",
              bottom: 12,
              right: 12,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
          >
            <Fullscreen sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Zone Metrics */}
      <CardContent sx={{ pt: 1 }}>
        <ZoneMetricsPanel metrics={metrics} />
      </CardContent>
    </Card>
  );
};

export default CameraFeedCard;
