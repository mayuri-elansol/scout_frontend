import React from "react";
import { Box, Typography } from "@mui/material";
import { Videocam, VideocamOff, PhotoCamera } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface LiveFeedPreviewProps {
  status?: "live" | "offline" | "loading";
  width?: string | number;
  height?: string | number;
  text?: string;
  onClick?: () => void;
  showStatus?: boolean;
}

const StyledContainer = styled(Box)<{
  status?: string;
  clickable?: boolean;
}>(({ status, clickable }) => {
  const getBackgroundColor = () => {
    switch (status) {
      case "live":
        return "#f8f9fa";
      case "offline":
        return "#f5f5f5";
      case "loading":
        return "#e3f2fd";
      default:
        return "#f8f9fa";
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case "live":
        return "#e0e0e0";
      case "offline":
        return "#d1d5db";
      case "loading":
        return "#90caf9";
      default:
        return "#e0e0e0";
    }
  };

  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: getBackgroundColor(),
    border: `1px solid ${getBorderColor()}`,
    borderRadius: "6px",
    cursor: clickable ? "pointer" : "default",
    transition: "all 0.2s ease",
    position: "relative",
    overflow: "hidden",
    "&:hover": clickable
      ? {
          backgroundColor: status === "live" ? "#f0f0f0" : getBackgroundColor(),
          borderColor: status === "live" ? "#d0d0d0" : getBorderColor(),
        }
      : {},
  };
});

const LiveFeedPreview: React.FC<LiveFeedPreviewProps> = ({
  status = "live",
  width = "100%",
  height = "120px",
  text = "Live Feed Preview",
  onClick,
  showStatus = true,
}) => {
  const getIcon = () => {
    switch (status) {
      case "live":
        return <Videocam sx={{ fontSize: 24, color: "#6b7280", mb: 0.5 }} />;
      case "offline":
        return <VideocamOff sx={{ fontSize: 24, color: "#9e9e9e", mb: 0.5 }} />;
      case "loading":
        return <PhotoCamera sx={{ fontSize: 24, color: "#2196f3", mb: 0.5 }} />;
      default:
        return <Videocam sx={{ fontSize: 24, color: "#6b7280", mb: 0.5 }} />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "live":
        return text;
      case "offline":
        return "Feed Unavailable";
      case "loading":
        return "Loading Feed...";
      default:
        return text;
    }
  };

  const getTextColor = () => {
    switch (status) {
      case "live":
        return "#6b7280";
      case "offline":
        return "#9e9e9e";
      case "loading":
        return "#2196f3";
      default:
        return "#6b7280";
    }
  };

  return (
    <StyledContainer
      status={status}
      clickable={!!onClick}
      onClick={onClick}
      sx={{
        width: width,
        height: height,
        minHeight: "80px",
      }}
    >
      {getIcon()}

      <Typography
        variant="caption"
        sx={{
          fontSize: "12px",
          color: getTextColor(),
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {getStatusText()}
      </Typography>

      {/* Live indicator dot */}
      {status === "live" && showStatus && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "#f44336",
            animation: "pulse 1.5s infinite",
            "@keyframes pulse": {
              "0%": { opacity: 1 },
              "50%": { opacity: 0.5 },
              "100%": { opacity: 1 },
            },
          }}
        />
      )}

      {/* Loading animation */}
      {status === "loading" && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.1), transparent)",
            animation: "shimmer 1.5s infinite",
            "@keyframes shimmer": {
              "0%": { transform: "translateX(-100%)" },
              "100%": { transform: "translateX(100%)" },
            },
          }}
        />
      )}
    </StyledContainer>
  );
};

export default LiveFeedPreview;
