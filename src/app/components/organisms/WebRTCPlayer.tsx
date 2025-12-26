"use client";
import React, { useEffect, useRef } from "react";

export interface WebRTCFrame {
  timestamp: number;
}

interface WebRTCPlayerProps {
  readonly url: string; // should be WHIP/WHEP URL
  readonly onFrame: (frame: WebRTCFrame) => void;
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
  );
}
