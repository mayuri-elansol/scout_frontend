import React, { useState, useRef, useCallback } from "react";
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
import { useRealtimeSocket } from "@/customhooks/useRealtimeSocket";

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
  const useCasesArray = [
    {
      id: "safety.ppe",
      kafkaKey: "PPE",
      name: "PPE Detection (Helmet, Vest, Gloves, Mask)",
    },
    {
      id: "safety.fire",
      kafkaKey: "FIRE",
      name: "Fire, Smoke, Oil & Gas Leak Detection",
    },
    {
      id: "safety.fall",
      kafkaKey: "FALL",
      name: "Fall / Laydown Detection",
    },
    {
      id: "forklift-detection",
      kafkaKey: "FORKLIFT",
      name: "Forklift / Vehicle in Walkways Detection",
    },
  ];

  const selectedUseCaseKafkaKey = useCasesArray.find(
    (uc) => uc.id === selectedUseCase
  )?.kafkaKey;

  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getCameraName = () => {
    return cameras.find((cam) => cam.id === selectedCamera)?.name || "";
  };

  const getUseCaseName = () => {
    return useCases.find((uc) => uc.id === selectedUseCase)?.name || "";
  };

  const drawDetection = useCallback(
    (data: any) => {
      if (!aiProcessingEnabled) return;

      // ✅ FILTER BY CAMERA
      if (
        data.camera_id !== selectedCamera ||
        data.use_case !== selectedUseCaseKafkaKey
      ) {
        return; // ❌ Ignore other cameras
      }

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const detections = data?.detections;
      if (!detections || detections.length === 0) return;

      // ❌ DO NOT clear frame here if frame is drawn separately
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      detections.forEach((det: any) => {
        const { object, confidence, bbox } = det;
        if (!bbox) return;

        const { x1, y1, x2, y2 } = bbox;

        ctx.strokeStyle = "lime";
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

        ctx.font = "14px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(
          `${object} ${(confidence * 100).toFixed(1)}%`,
          x1 + 5,
          y1 - 6
        );
      });

      console.log("🎯 ROI drawn for camera:", data.camera_id, data.use_case);
    },
    [selectedCamera, aiProcessingEnabled, selectedUseCaseKafkaKey]
  );

  const drawLiveFrame = useCallback((frameMsg: any) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const base64 = frameMsg.frameData;
    if (!base64) return;

    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64}`;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  useRealtimeSocket("https://192.168.0.5:4006", {
    topic: selectedUseCase,
    onData: (msg) => {
      drawDetection(msg); // ROI overlay
      console.log(" PPE detection:", msg);
    },
    onLiveFrame: (frame) => {
      drawLiveFrame(frame);
      console.log("🎥 LIVE FRAME RECEIVED :", frame);
    },
  });

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
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            style={{
              width: "100%",
              height: "100%",
              background: "#000",
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
