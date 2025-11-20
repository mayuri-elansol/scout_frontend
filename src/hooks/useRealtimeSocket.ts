// src/hooks/useRealtimeSocket.ts
import { io, Socket } from "socket.io-client";
import { useEffect, useRef } from "react";

export function useRealtimeSocket(topic: string, onData: (data: any) => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3001");
      console.log("🟢 Connected to WebSocket");
    }

    const socket = socketRef.current;
    socket.on(topic, onData);

    return () => {
      socket.off(topic, onData); // ✅ just remove listener
      console.log("🔴 Unsubscribed from", topic);
    };
  }, [topic, onData]);
}
