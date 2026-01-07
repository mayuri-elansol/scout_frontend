import React, { ReactNode } from "react";
import { Card, Box, Typography, Chip, IconButton } from "@mui/material";
import { VideoCall, Fullscreen, Circle } from "@mui/icons-material";

type ZoneId = "zone-a" | "zone-b" | "zone-c" | "zone-d";

interface ZoneData {
  id: ZoneId;
  name: string;
  status: ReactNode;
  roiDetection: ReactNode;
  worker: React.JSX.Element;
  compliance: ReactNode;
  people: ReactNode;
  violations: ReactNode;
  noHelmet: ReactNode;
}

interface CameraFeedProps {
  zone: ZoneData;

  aiProcessingEnabled: boolean;
}

export const CameraFeed: React.FC<CameraFeedProps> = ({
  zone,
  aiProcessingEnabled,
}) => {
  return (
    <Card sx={{ height: "100%", p: 0, m: 0 }}>
      <Box sx={{ px: "10px", py: "5px" }}>
        {/* Zone Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 0.3,
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
            <Circle sx={{ fontSize: 8, color: "#4caf50" }} />
            <Typography
              variant="caption"
              sx={{ color: "#4caf50", fontWeight: 600 }}
            >
              {zone.status}
            </Typography>
          </Box>
        </Box>

        {/* Video Player & ROI Overlay */}
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
          {aiProcessingEnabled && (
            <>
              <Chip
                label={zone.roiDetection}
                size="small"
                sx={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  backgroundColor: "#1976d2",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: 600,
                  zIndex: 2,
                }}
              />
              {zone.worker && (
                <Chip
                  label={zone.worker}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    backgroundColor: "#1976d2",
                    color: "white",
                    fontSize: "11px",
                    fontWeight: 600,
                    zIndex: 2,
                  }}
                />
              )}
              <Box
                sx={{
                  position: "absolute",
                  top: 60,
                  left: 40,
                  width: 120,
                  height: 150,
                  border: "2px solid #1976d2",
                  borderRadius: 1,
                  zIndex: 1,
                }}
              />
            </>
          )}

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
          {/* <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: 12,
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton
              size="small"
              onClick={() => toggleVideo(zone.id)}
              sx={{
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
              }}
            >
              <PlayArrow sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => toggleMute(zone.id)}
              sx={{
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
              }}
            >
              {videoState.muted ? (
                <VolumeOff sx={{ fontSize: 18 }} />
              ) : (
                <VolumeUp sx={{ fontSize: 18 }} />
              )}
            </IconButton>
          </Box> */}

          <IconButton
            size="small"
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

        {/* Zone Metrics */}
        {/* <CardContent sx={{ p: "5px" }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 0 }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{ fontSize: "18px", fontWeight: 600, color: "#4caf50" }}
              >
                {zone.compliance}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#666" }}>
                Compliance Rate
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{ fontSize: "18px", fontWeight: 600, color: "#f44336" }}
              >
                {zone.violations}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#666" }}>
                Active Violations
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{ fontSize: "18px", fontWeight: 600, color: "#2196f3" }}
              >
                {zone.people}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#666" }}>
                People Detected
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{ fontSize: "18px", fontWeight: 600, color: "#f44336" }}
              >
                {zone.noHelmet}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#666" }}>
                No Helmet Detected
              </Typography>
            </Box>
          </Box>
        </CardContent> */}
      </Box>
    </Card>
  );
};
