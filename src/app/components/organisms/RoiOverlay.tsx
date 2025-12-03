// "use client";
// import React, { useEffect, useRef } from "react";
// import { useRealtimeSocket } from "@/hooks/useRealtimeSocket";

// interface RoiOverlayProps {
//   currentTimestamp: number;
// }

// interface Bbox {
//   x1: number;
//   y1: number;
//   x2: number;
//   y2: number;
// }

// interface RoiMessage {
//   timestamp: number;
//   bbox: Bbox;
// }

// export default function RoiOverlay({ currentTimestamp }: RoiOverlayProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const roiBuffer = useRef<Map<number, RoiMessage>>(new Map());

//   useRealtimeSocket("safety.ppe", (msg: RoiMessage) => {
//     roiBuffer.current.set(msg.timestamp, msg);
//   });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     const roi = roiBuffer.current.get(currentTimestamp);
//     if (!roi) return;

//     const { x1, y1, x2, y2 } = roi.bbox;

//     ctx.strokeStyle = "lime";
//     ctx.lineWidth = 2;
//     ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
//   }, [currentTimestamp]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={640}
//       height={360}
//       style={{ position: "absolute", top: 0, left: 0 }}
//     />
//   );
// }

"use client";
import React, { useEffect, useRef } from "react";
import { useRealtimeSocket } from "@/hooks/useRealtimeSocket";

interface RoiOverlayProps {
  currentTimestamp: number;
}

interface Bbox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface RoiMessage {
  timestamp: number;
  bbox: Bbox;
  object?: string;
  confidence?: number;
}

export default function RoiOverlay({ currentTimestamp }: RoiOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const roiBuffer = useRef<Map<number, RoiMessage>>(new Map());

  useRealtimeSocket("safety.ppe", (msg: RoiMessage) => {
    roiBuffer.current.set(msg.timestamp, msg);
    console.log("roi buffer.set messg.timestamp", msg);
    // if (roiBuffer.current.size > 200) {
    //   const keys = [...roiBuffer.current.keys()].sort((a, b) => a - b);
    //   roiBuffer.current.delete(keys[0]);
    // }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const roi = roiBuffer.current.get(currentTimestamp);
    if (!roi) return;

    const { x1, y1, x2, y2 } = roi.bbox;

    ctx.strokeStyle = "lime";
    ctx.lineWidth = 2;
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

    if (roi.object) {
      ctx.font = "14px Arial";
      ctx.fillStyle = "yellow";
      ctx.fillText(
        `${roi.object} ${(roi.confidence ?? 0 * 100).toFixed(1)}%`,
        x1 + 5,
        y1 + 15
      );
    }
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

// "use client";
// import React, { useEffect, useRef } from "react";
// import { useRealtimeSocket } from "@/hooks/useRealtimeSocket";

// interface RoiOverlayProps {
//   currentTimestamp: number;
// }

// interface Bbox {
//   x1: number;
//   y1: number;
//   x2: number;
//   y2: number;
// }

// interface RoiMessage {
//   timestamp: number;
//   bbox: Bbox;
//   object?: string;
//   confidence?: number;
// }

// export default function RoiOverlay({ currentTimestamp }: RoiOverlayProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const roiBuffer = useRef<Map<number, RoiMessage>>(new Map());

//   useRealtimeSocket("safety.ppe", (msg: RoiMessage) => {
//     roiBuffer.current.set(msg.timestamp, msg);
//   });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     const roi = roiBuffer.current.get(currentTimestamp);
//     if (!roi) return;

//     const { x1, y1, x2, y2 } = roi.bbox;

//     ctx.strokeStyle = "lime";
//     ctx.lineWidth = 2;
//     ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

//     if (roi.object) {
//       ctx.font = "14px Arial";
//       ctx.fillStyle = "yellow";
//       ctx.fillText(
//         `${roi.object} ${(roi.confidence ?? 0).toFixed(2)}%`,
//         x1 + 5,
//         y1 + 15
//       );
//     }
//   }, [currentTimestamp]);

//   return (
//     <canvas
//       ref={canvasRef}
//       width={640}
//       height={360}
//       style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
//     />
//   );
// }
