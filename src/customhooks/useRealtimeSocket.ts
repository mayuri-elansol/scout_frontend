// src/hooks/useRealtimeSocket.ts
import { io, Socket } from "socket.io-client";
import { useEffect, useRef } from "react";

interface RealtimeSocketOptions<TData, TFrame = unknown> {
  topic: string;
  onData: (data: TData) => void;
  onLiveFrame?: (frame: TFrame) => void;
}

export function useRealtimeSocket<TData, TFrame = unknown>(
  url: string,
  options: RealtimeSocketOptions<TData, TFrame>,
) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(url, {
      transports: ["websocket"],
    });

    const socket = socketRef.current;

    console.log(`🟢 Connected to WebSocket → ${url}`);

    socket.on(options.topic, options.onData);

    if (options.onLiveFrame) {
      socket.on("Live_Frame", options.onLiveFrame);
      console.log(`🎥 Subscribed to Live_Frame`);
    }

    console.log(`📡 Subscribed to topic "${options.topic}"`);

    return () => {
      if (socketRef.current) {
        socket.off(options.topic, options.onData);

        if (options.onLiveFrame) {
          socket.off("Live_Frame", options.onLiveFrame);
        }

        socket.close();
        console.log(`🔴 Socket closed for ${url}`);
      }
    };
  }, [url, options.topic, options.onData, options.onLiveFrame]);
}
