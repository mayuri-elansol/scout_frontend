import React, { useState, useRef } from "react";
import { Box, Typography, IconButton, Tooltip, Paper } from "@mui/material";
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  FullscreenExit,
  Videocam,
} from "@mui/icons-material";

interface Camera {
  id: string;
  name: string;
}

interface UseCase {
  id: string;
  name: string;
}

interface LiveVideoPlayerProps {
  isLive: boolean;
  selectedCamera: string;
  selectedUseCase: string;
  cameras: Camera[];
  useCases: UseCase[];
  aiProcessingEnabled: boolean;
}

const LiveVideoPlayer: React.FC<LiveVideoPlayerProps> = ({
  isLive,
  selectedCamera,
  selectedUseCase,
  cameras,
  useCases,
  aiProcessingEnabled,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreenToggle = () => {
    if (document.fullscreenElement === null) {
      videoContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getCameraName = () => {
    return cameras.find((cam) => cam.id === selectedCamera)?.name ?? "";
  };

  const getUseCaseName = () => {
    return useCases.find((uc) => uc.id === selectedUseCase)?.name ?? "";
  };

  // Placeholder state - showing message before going live
  if (!isLive) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#1c2025",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          border: "2px solid #e0e0e0",
        }}
      >
        <Videocam sx={{ fontSize: 64, color: "#5c6b7d" }} />
        <Typography
          variant="h6"
          sx={{ color: "#9aa0a6", textAlign: "center", px: 2 }}
        >
          Select camera and use case, then click &quot;Go Live&quot; to start
          streaming
        </Typography>
      </Box>
    );
  }

  // Live streaming view
  return (
    <Box
      ref={videoContainerRef}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {/* Video Container with 16:9 aspect ratio - centered */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: "calc(100vh * 1.78)", // 16:9 ratio based on height
          maxHeight: "calc(100vw * 0.5625)", // 16:9 ratio based on width
          aspectRatio: "16/9",
          backgroundColor: "#000000",
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
          border: "2px solid #1976d2",
        }}
      >
        {/* Live Badge */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 2,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              px: 2,
              py: 0.5,
              backgroundColor: "#f44336",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%, 100%": { opacity: 1 },
                  "50%": { opacity: 0.3 },
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, fontSize: "14px" }}
            >
              LIVE
            </Typography>
          </Paper>
        </Box>

        {/* Camera and Use Case Info */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "flex-end",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              px: 2,
              py: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(10px)",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "#ffffff", display: "block" }}
            >
              {getCameraName()}
            </Typography>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              px: 2,
              py: 0.5,
              backgroundColor: "#1976d2",
              color: "#ffffff",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, fontSize: "12px" }}
            >
              {getUseCaseName()}
            </Typography>
          </Paper>
        </Box>

        {/* AI Processing Indicator */}
        {aiProcessingEnabled && (
          <Box
            sx={{
              position: "absolute",
              bottom: 80,
              left: 16,
              zIndex: 2,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                px: 2,
                py: 0.5,
                backgroundColor: "#4caf50",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  animation: "blink 1.5s infinite",
                  "@keyframes blink": {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0 },
                  },
                }}
              />
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, fontSize: "12px" }}
              >
                AI Processing Active
              </Typography>
            </Paper>
          </Box>
        )}

        {/* Video Feed - Shows actual image when live */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000000",
          }}
        >
          <Box
            component="img"
            src="/siteimage.jpg"
            alt="Live Feed"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Video Controls Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
            padding: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            zIndex: 2,
            transition: "opacity 0.3s",
            opacity: 1,
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          {/* Play/Pause Button */}
          <Tooltip title={isPlaying ? "Pause" : "Play"}>
            <IconButton
              onClick={handlePlayPause}
              sx={{
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
          </Tooltip>

          {/* Mute/Unmute Button */}
          <Tooltip title={isMuted ? "Unmute" : "Mute"}>
            <IconButton
              onClick={handleMuteToggle}
              sx={{
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {isMuted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
          </Tooltip>

          <Box sx={{ flex: 1 }} />

          {/* Fullscreen Button */}
          <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
            <IconButton
              onClick={handleFullscreenToggle}
              sx={{
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default LiveVideoPlayer;
