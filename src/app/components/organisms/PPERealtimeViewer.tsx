"use client";
import React, { useEffect, useRef, useCallback } from "react";
import { useRealtimeSocket } from "@/hooks/useRealtimeSocket";

export default function PPERealtimeViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const drawDetection = useCallback((data: any) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const bbox = data?.data?.bbox;
    if (!bbox) return;

    const { x1, y1, x2, y2 } = bbox;
    const { object, confidence } = data.data;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
    ctx.font = "14px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText(
      `${object} ${(confidence * 100).toFixed(1)}%`,
      x1 + 5,
      y1 + 15
    );
  }, []);

  // ✅ Correct usage — call hook at top level
  useRealtimeSocket("safety.ppe", (msg) => {
    drawDetection(msg);
    console.log("ppe detection socket io", msg);
  });

  return (
    <div style={{ position: "relative", width: "640px", height: "360px" }}>
      <video
        ref={videoRef}
        src="/sample-video.mp4"
        width="640"
        height="360"
        autoPlay
        loop
        muted
      />
      <canvas
        ref={canvasRef}
        width="640"
        height="360"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      />
    </div>
  );
}
