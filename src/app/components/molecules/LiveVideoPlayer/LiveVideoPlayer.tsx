"use client"
import React, { useState, useRef, useCallback } from "react";
import { Box, Typography, IconButton, Tooltip, Paper } from "@mui/material";
import { Fullscreen, FullscreenExit, Videocam } from "@mui/icons-material";
import { useRealtimeSocket } from "@/customhooks/useRealtimeSocket";

/* ---------------- TYPES ---------------- */

interface Camera {
  id: string;
  name: string;
}

interface UseCase {
  id: string;
  name: string;
}

interface BoundingBoxObject {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

type BoundingBox = BoundingBoxObject | [number, number, number, number];

interface Detection {
  object: string;
  confidence: number;
  bbox: BoundingBox;
}

interface DetectionMessage {
  camera_id: string;
  use_case: string;
  frameId?: string;
  frame_id?: string;
  detections: Detection[];
}

interface LiveFrameMessage {
  frameData?: string;
  frame?: string;
  frameId?: string;
  frame_id?: string;
}

interface LiveVideoPlayerProps {
  isLive: boolean;
  selectedCamera: string;
  selectedUseCase: string;
  cameras: Camera[];
  useCases: UseCase[];
  aiProcessingEnabled: boolean;
}

/* ---------------- COMPONENT ---------------- */

const LiveVideoPlayer: React.FC<LiveVideoPlayerProps> = ({
  isLive,
  selectedCamera,
  selectedUseCase,
  cameras,
  useCases,
  aiProcessingEnabled,
}) => {
  const useCasesArray = [
    { id: "safety.ppe", kafkaKey: "PPE" },
    { id: "safety.fire", kafkaKey: "FIRE" },
    { id: "safety.fall", kafkaKey: "FALL" },
    { id: "forklift-detection", kafkaKey: "FORKLIFT" },
  ];

  const selectedUseCaseKafkaKey = useCasesArray.find(
    (uc) => uc.id === selectedUseCase,
  )?.kafkaKey;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  /* ---------------- DRAW DETECTIONS ---------------- */

  const drawDetection = useCallback(
    (data: DetectionMessage) => {
      if (!aiProcessingEnabled) return;

      if (
        data.camera_id !== selectedCamera ||
        data.use_case !== selectedUseCaseKafkaKey
      ) {
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      if (!data.detections?.length) return;

      data.detections.forEach((det) => {
        let x1: number, y1: number, x2: number, y2: number;

        if (Array.isArray(det.bbox)) {
          [x1, y1, x2, y2] = det.bbox;
        } else {
          ({ x1, y1, x2, y2 } = det.bbox);
        }

        ctx.strokeStyle = "lime";
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

        ctx.fillStyle = "red";
        ctx.font = "14px Arial";
        ctx.fillText(
          `${det.object} ${(det.confidence * 100).toFixed(1)}%`,
          x1 + 4,
          y1 - 6,
        );
      });
    },
    [selectedCamera, selectedUseCaseKafkaKey, aiProcessingEnabled],
  );

  /* ---------------- DRAW FRAME ---------------- */

  const drawLiveFrame = useCallback((frameMsg: LiveFrameMessage) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const base64 = frameMsg.frameData || frameMsg.frame;
    if (!base64) return;

    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64}`;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  /* ---------------- SOCKET CONNECTION ---------------- */

  useRealtimeSocket<DetectionMessage, LiveFrameMessage>(
    "http://192.168.0.5:4006",
    {
      topic: selectedUseCase,
      onData: drawDetection,
      onLiveFrame: drawLiveFrame,
    },
  );

  /* ---------------- HELPERS ---------------- */

  const getCameraName = () =>
    cameras.find((cam) => cam.id === selectedCamera)?.name || "";

  const getUseCaseName = () =>
    useCases.find((uc) => uc.id === selectedUseCase)?.name || "";

  const handleFullscreenToggle = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
      return;
    }

    videoContainerRef.current?.requestFullscreen();
    setIsFullscreen(true);
  };
  /* ---------------- PRE-LIVE VIEW ---------------- */

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
          Select camera and use case, then click &quot;Go Live&quot;
        </Typography>
      </Box>
    );
  }

  /* ---------------- LIVE VIEW ---------------- */

  return (
    <Box
      ref={videoContainerRef}
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        style={{ width: "100%", height: "100%" }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          backgroundColor: "#f44336",
          px: 2,
          py: 0.5,
          borderRadius: 1,
        }}
      >
        <Typography sx={{ color: "#fff", fontWeight: 700 }}>LIVE</Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Paper sx={{ px: 2, py: 1, bgcolor: "rgba(0,0,0,0.7)" }}>
          <Typography variant="caption" sx={{ color: "#fff" }}>
            {getCameraName()}
          </Typography>
        </Paper>

        <Paper sx={{ px: 2, py: 0.5, bgcolor: "#1976d2", color: "#fff" }}>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {getUseCaseName()}
          </Typography>
        </Paper>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
          <IconButton onClick={handleFullscreenToggle} sx={{ color: "#fff" }}>
            {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default LiveVideoPlayer;
