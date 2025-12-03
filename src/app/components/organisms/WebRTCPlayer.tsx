"use client";
import React, { useEffect, useRef } from "react";

export interface WebRTCFrame {
  timestamp: number;
}

interface WebRTCPlayerProps {
  url: string; // should be WHIP/WHEP URL
  onFrame: (frame: WebRTCFrame) => void;
}

export default function WebRTCPlayer({ url, onFrame }: WebRTCPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.ontrack = (event) => {
      if (videoRef.current) videoRef.current.srcObject = event.streams[0];

      const track = event.streams[0].getVideoTracks()[0];
      const Processor = (window as any).MediaStreamTrackProcessor;
      const processor = new Processor({ track });
      const reader = processor.readable.getReader();

      (async () => {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const frame: VideoFrame = value;
          onFrame({ timestamp: frame.timestamp });
          frame.close();
        }
      })();
    };

    const start = async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // MUST USE WHIP/WHEP compatible headers
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/sdp",
          Accept: "application/sdp",
        },
        // headers: {
        //   "Content-Type": "application/sdp",
        //   Accept: "application/sdp",
        //   "Sec-WebRTC-Transport": "whep",
        // },
        body: offer.sdp,
      });

      const answer = await res.text();

      if (!answer.startsWith("v=")) {
        console.error("INVALID SDP ANSWER:", answer);
        return;
      }

      await pc.setRemoteDescription({
        type: "answer",
        sdp: answer,
      });
    };

    start();
    return () => pc.close();
  }, [url, onFrame]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      width={640}
      height={360}
      src="/sample-video.mp4"
    />
    // <iframe
    //   //ref={videoRef}
    //   src="/sample-video.mp4"
    //   //  src="http://192.168.0.37:8889/cam003"
    //   width={640}
    //   height={360}
    //   style={{ border: 0 }}
    // />
  );
}

// "use client";
// import React, { useEffect, useRef } from "react";

// interface WebRTCFrame {
//   timestamp: number;
// }

// interface JanusPlayerProps {
//   serverUrl: string;
//   streamId: number;
//   onFrame: (frame: WebRTCFrame) => void;
// }

// export default function JanusPlayer({
//   serverUrl,
//   streamId,
//   onFrame,
// }: JanusPlayerProps) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const janusRef = useRef<any>(null);
//   const pluginHandleRef = useRef<any>(null);

//   /** Load Janus script dynamically if not present */
//   useEffect(() => {
//     if (!(window as any).Janus) {
//       console.warn("Janus script missing — loading...");
//       const script = document.createElement("script");
//       script.src = "https://cdn.jsdelivr.net/npm/janus-gateway@1/dist/janus.js";
//       script.async = true;
//       script.onload = () => console.log("✅ Janus loaded");
//       document.body.appendChild(script);
//     }
//   }, []);

//   /** Initialize Janus when available */
//   useEffect(() => {
//     const check = setInterval(() => {
//       if ((window as any).Janus) {
//         clearInterval(check);
//         startJanus();
//       }
//     }, 300);

//     return () => clearInterval(check);
//   }, []);

//   const startJanus = () => {
//     (window as any).Janus.init({
//       debug: "all",
//       callback: () => {
//         janusRef.current = new (window as any).Janus({
//           server: serverUrl,
//           success: attachStreamingPlugin,
//           error: (err: any) => console.error("Janus init failed:", err),
//         });
//       },
//     });
//   };

//   const attachStreamingPlugin = () => {
//     janusRef.current.attach({
//       plugin: "janus.plugin.streaming",
//       success: (pluginHandle: any) => {
//         pluginHandleRef.current = pluginHandle;
//         console.log("📡 Streaming plugin attached — watching stream", streamId);
//         pluginHandle.send({ message: { request: "watch", id: streamId } });
//       },

//       onremotestream: (stream: MediaStream) => {
//         console.log("📺 Received video stream");
//         if (videoRef.current) videoRef.current.srcObject = stream;

//         // Extract timestamp using MediaStreamTrackProcessor if supported
//         const track = stream.getVideoTracks()[0];
//         const Processor = (window as any).MediaStreamTrackProcessor;

//         if (Processor) {
//           const processor = new Processor({ track });
//           const reader = processor.readable.getReader();
//           (async () => {
//             while (true) {
//               const { value, done } = await reader.read();
//               if (done) break;
//               const frame: VideoFrame = value;
//               onFrame({ timestamp: frame.timestamp });
//               frame.close();
//             }
//           })();
//         }
//       },

//       error: (err: any) => console.error("Streaming plugin error:", err),
//     });
//   };

//   return (
//     <video ref={videoRef} autoPlay muted playsInline width={640} height={360} />
//   );
// }
