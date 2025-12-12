"use client";
import React, { useRef, useCallback } from "react";
import { useRealtimeSocket } from "@/hooks/useRealtimeSocket";

export default function PPERealtimeViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // const drawDetection = useCallback((data: any) => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas?.getContext("2d");
  //   if (!canvas || !ctx) return;

  //   const bbox = data?.data?.bbox;
  //   if (!bbox) return;

  //   const { x1, y1, x2, y2 } = bbox;
  //   const { object, confidence } = data.data;

  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.strokeStyle = "lime";
  //   ctx.lineWidth = 2;
  //   ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
  //   ctx.font = "14px Arial";
  //   ctx.fillStyle = "yellow";
  //   ctx.fillText(
  //     `${object} ${(confidence * 100).toFixed(1)}%`,
  //     x1 + 5,
  //     y1 + 15
  //   );
  // }, []);
  const drawDetection = useCallback((data: any) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const detections = data?.detections;
    if (!detections || detections.length === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach((det: any) => {
      const { object, confidence, bbox } = det;
      if (!bbox) return;

      const { x1, y1, x2, y2 } = bbox;

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
    });
  }, []);
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

  useRealtimeSocket("http://192.168.0.5:3001", {
    topic: "safety.ppe",
    onData: (msg) => {
      drawDetection(msg); // ROI overlay
      console.log("✅ PPE detection:", msg);
    },
    onLiveFrame: (frame) => {
      drawLiveFrame(frame);
      console.log("🎥 LIVE FRAME RECEIVED:", frame);
    },
  });

  return (
    // <div style={{ position: "relative", width: "640px", height: "360px" }}>
    //   <video
    //     ref={videoRef}
    //     src="/sample-video.mp4"
    //     width="640"
    //     height="360"
    //     autoPlay
    //     loop
    //     muted
    //   />
    //   <canvas
    //     ref={canvasRef}
    //     width="640"
    //     height="360"
    //     style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
    //   />
    // </div>
    <div style={{ position: "relative", width: 640, height: 360 }}>
      <canvas
        ref={canvasRef}
        width={640}
        height={360}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          background: "#000",
        }}
      />
    </div>
  );
}
