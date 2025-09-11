"use client";

import React from "react";
import { Box, Typography, Paper, IconButton, Tooltip } from "@mui/material";
import {
  Videocam,
  VideocamOff,
  Settings,
  CheckCircle,
  Error,
  PlayArrow,
  MoreVert,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import ScoutBadge from "../../atoms/Badge/Badge";
import ScoutProgressBar from "../../atoms/ProgressBar/ProgressBar";

interface CameraStatusItemProps {
  cameraId: string;
  cameraName: string;
  zone: string;
  status: "online" | "offline" | "maintenance" | "error";
  quality: number; // 0-100
  uptime: number; // 0-100
  lastSeen?: string;
  recordingStatus?: "recording" | "paused" | "stopped";
  alertCount?: number;
  resolution?: string;
  frameRate?: number;
  onPlay?: () => void;
  onSettings?: () => void;
  onViewAlerts?: () => void;
  onClick?: () => void;
}

const StyledPaper = styled(Paper)<{ camerastatus?: string }>(
  ({ camerastatus }) => {
    const getStatusBorder = () => {
      switch (camerastatus) {
        case "online":
          return "#4caf50";
        case "offline":
          return "#9e9e9e";
        case "maintenance":
          return "#ff9800";
        case "error":
          return "#f44336";
        default:
          return "#e0e0e0";
      }
    };

    return {
      borderRadius: "8px",
      border: `2px solid ${getStatusBorder()}`,
      transition: "all 0.2s ease",
      cursor: "pointer",
      "&:hover": {
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transform: "translateY(-2px)",
      },
    };
  }
);

const CameraStatusItem: React.FC<CameraStatusItemProps> = ({
  cameraId,
  cameraName,
  zone,
  status,
  quality,
  uptime,
  lastSeen,
  recordingStatus = "recording",
  alertCount = 0,
  resolution = "1920x1080",
  frameRate = 30,
  onPlay,
  onSettings,
  onViewAlerts,
  onClick,
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case "online":
        return <CheckCircle sx={{ color: "#4caf50", fontSize: 20 }} />;
      case "offline":
        return <VideocamOff sx={{ color: "#9e9e9e", fontSize: 20 }} />;
      case "maintenance":
        return <Settings sx={{ color: "#ff9800", fontSize: 20 }} />;
      case "error":
        return <Error sx={{ color: "#f44336", fontSize: 20 }} />;
      default:
        return <Videocam sx={{ color: "#2196f3", fontSize: 20 }} />;
    }
  };

  const formatLastSeen = (timestamp?: string) => {
    if (!timestamp) return "Unknown";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlay) onPlay();
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSettings) onSettings();
  };

  const handleAlertsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewAlerts) onViewAlerts();
  };

  // ✅ Helper to map status to badge
  const mapStatusToBadge = (status: CameraStatusItemProps["status"]) => {
    switch (status) {
      case "maintenance":
        return "pending";
      case "online":
        return "active";
      default:
        return "inactive";
    }
  };

  return (
    <StyledPaper camerastatus={status} onClick={onClick}>
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {getStatusIcon()}
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#1c2025",
                  lineHeight: 1.2,
                }}
              >
                {cameraName}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#6b7280",
                  fontSize: "12px",
                }}
              >
                {cameraId}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 0.5 }}>
            {status === "online" && onPlay && (
              <Tooltip title="View Live Feed">
                <IconButton size="small" onClick={handlePlayClick}>
                  <PlayArrow fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onSettings && (
              <Tooltip title="Camera Settings">
                <IconButton size="small" onClick={handleSettingsClick}>
                  <Settings fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="More Options">
              <IconButton size="small">
                <MoreVert fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Status and Zone */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <ScoutBadge
            variant="status"
            status={mapStatusToBadge(status)}
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            size="small"
          />
          {alertCount > 0 && (
            <ScoutBadge
              variant="count"
              label={alertCount.toString()}
              size="small"
              onClick={handleAlertsClick}
              sx={{ cursor: "pointer" }}
            />
          )}
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "#6b7280",
            fontSize: "12px",
            mb: 1.5,
          }}
        >
          Zone: {zone}
        </Typography>

        {/* Quality and Uptime Progress */}
        {status === "online" && (
          <Box sx={{ mb: 1.5 }}>
            <ScoutProgressBar
              value={quality}
              variant="performance"
              label="Video Quality"
              size="small"
              showPercentage={true}
            />
            <Box sx={{ mt: 1 }}>
              <ScoutProgressBar
                value={uptime}
                variant="status"
                label="Uptime"
                size="small"
                showPercentage={true}
              />
            </Box>
          </Box>
        )}

        {/* Technical Details */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "#9ca3af",
                fontSize: "11px",
                display: "block",
              }}
            >
              {resolution} • {frameRate}fps
            </Typography>
            {recordingStatus && status === "online" && (
              <Typography
                variant="caption"
                sx={{
                  color:
                    recordingStatus === "recording" ? "#f44336" : "#9ca3af",
                  fontSize: "11px",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {recordingStatus === "recording" && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#f44336",
                      animation:
                        recordingStatus === "recording"
                          ? "pulse 1.5s infinite"
                          : "none",
                      "@keyframes pulse": {
                        "0%": { opacity: 1 },
                        "50%": { opacity: 0.5 },
                        "100%": { opacity: 1 },
                      },
                    }}
                  />
                )}
                {recordingStatus}
              </Typography>
            )}
          </Box>

          <Typography
            variant="caption"
            sx={{
              color: "#9ca3af",
              fontSize: "11px",
            }}
          >
            {status === "online"
              ? "Live"
              : `Last seen: ${formatLastSeen(lastSeen)}`}
          </Typography>
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default CameraStatusItem;
