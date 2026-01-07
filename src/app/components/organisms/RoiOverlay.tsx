"use client";
import React, { useEffect, useRef } from "react";
interface RoiOverlayProps {
  readonly currentTimestamp: number;
}

interface Detection {
  object: string;
  confidence: number;
  bbox: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}

export default function RoiOverlay({ currentTimestamp }: RoiOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // store: timestamp → detections[]
  const roiBuffer = useRef<Map<number, Detection[]>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const detections = roiBuffer.current.get(currentTimestamp);
    if (!detections) return;

    detections.forEach((det) => {
      const { x1, y1, x2, y2 } = det.bbox;

      ctx.strokeStyle = "lime";
      ctx.lineWidth = 2;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

      ctx.font = "14px Arial";
      ctx.fillStyle = "yellow";
      ctx.fillText(
        `${det.object} ${(det.confidence * 100).toFixed(1)}%`,
        x1 + 5,
        y1 + 15
      );
    });
  }, [currentTimestamp]);

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={360}
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
    />
  );
}
