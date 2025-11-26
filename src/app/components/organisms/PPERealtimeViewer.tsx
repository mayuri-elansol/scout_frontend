// "use client";
// import React, { useEffect, useRef, useCallback } from "react";
// import { useRealtimeSocket } from "@/hooks/useRealtimeSocket";

// export default function PPERealtimeViewer() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const drawDetection = useCallback((data: any) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext("2d");
//     if (!canvas || !ctx) return;

//     const bbox = data?.data?.bbox;
//     if (!bbox) return;

//     const { x1, y1, x2, y2 } = bbox;
//     const { object, confidence } = data.data;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.strokeStyle = "lime";
//     ctx.lineWidth = 2;
//     ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
//     ctx.font = "14px Arial";
//     ctx.fillStyle = "yellow";
//     ctx.fillText(
//       `${object} ${(confidence * 100).toFixed(1)}%`,
//       x1 + 5,
//       y1 + 15
//     );
//   }, []);

//   // ✅ Correct usage — call hook at top level
//   useRealtimeSocket("safety.ppe", (msg) => {
//     drawDetection(msg);
//     console.log("ppe detection socket io", msg);
//   });

//   return (
//     <div style={{ position: "relative", width: "640px", height: "360px" }}>
//       <video
//         ref={videoRef}
//         //   src="/sample-video.mp4"
//         src="http://192.168.0.37:8088/admin/streaming/list"
//         width="640"
//         height="360"
//         autoPlay
//         loop
//         muted
//       />
//       {/* <iframe
//         src="http://192.168.0.37:8889/cam003"
//         width={640}
//         height={360}
//         style={{ border: 0 }}
//       /> */}

//       <canvas
//         ref={canvasRef}
//         width="640"
//         height="360"
//         style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
//       />
//     </div>
//   );
// }

// "use client";
// import React, { useState } from "react";
// import WebRTCPlayer, { WebRTCFrame } from "./WebRTCPlayer";
// import RoiOverlay from "./RoiOverlay";

// export default function PPERealtimeViewer() {
//   const [timestamp, setTimestamp] = useState<number>(0);

//   return (
//     <div style={{ position: "relative", width: 640, height: 360 }}>
//       <WebRTCPlayer
//         url="http://192.168.0.37:8889/cam003"
//         onFrame={(frame: WebRTCFrame) => setTimestamp(frame.timestamp)}
//       />
//       <RoiOverlay currentTimestamp={timestamp} />
//     </div>
//   );
// }

"use client";
import React, { useMemo, useCallback, useState } from "react";
import WebRTCPlayer from "./WebRTCPlayer";
import RoiOverlay from "./RoiOverlay";

export default function PPERealtimeViewer() {
  const [timestamp, setTimestamp] = useState(0);

  const stableUrl = useMemo(
    () => "http://192.168.0.37:8088/admin/streaming/list",
    []
  );
  const stableOnFrame = useCallback((frame: { timestamp: number }) => {
    setTimestamp(frame.timestamp);
  }, []);

  return (
    <div style={{ position: "relative", width: 640, height: 360 }}>
      <WebRTCPlayer url={stableUrl} onFrame={stableOnFrame} />
      <RoiOverlay currentTimestamp={timestamp} />
    </div>
  );
}

// "use client";
// import React, { useState, useMemo } from "react";
// import RoiOverlay from "./RoiOverlay";

// export default function PPERealtimeViewer() {
//   const [timestamp, setTimestamp] = useState(0);

//   return (
//     <div>
//       <video src="http://192.168.0.37:8889/cam003" width={640} height={360} />
//       <RoiOverlay currentTimestamp={timestamp} />
//     </div>
//   );
// }

//============================================================================

// "use client";
// import React, { useState, useCallback } from "react";
// import JanusPlayer from "./WebRTCPlayer";
// import RoiOverlay from "./RoiOverlay";

// export default function PPERealtimeViewer() {
//   const [timestamp, setTimestamp] = useState(0);

//   const handleFrame = useCallback((frame: { timestamp: number }) => {
//     setTimestamp(frame.timestamp);
//   }, []);

//   return (
//     <div style={{ position: "relative", width: 640, height: 360 }}>
//       <JanusPlayer
//         serverUrl="http://192.168.0.37:8088/janus"
//         streamId={1} // CHANGE THIS BASED ON /admin/streaming/list
//         onFrame={handleFrame}
//       />
//       <RoiOverlay currentTimestamp={timestamp} />
//     </div>
//   );
// }
