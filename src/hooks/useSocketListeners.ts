import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:4001";

export const useSocketListeners = (
  handlers: Record<string, (data: any) => void>,
  onLiveFrame?: (frame: any) => void // 👈 optional live-frame callback
) => {
  const socketRef = useRef<Socket | null>(null);
  const handlersRef = useRef(handlers);
  const liveFrameRef = useRef(onLiveFrame);

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    liveFrameRef.current = onLiveFrame;
  }, [onLiveFrame]);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🔌 Connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("🔴 Connection error:", error.message);
    });

    // ✅ Custom events (passed in handlers)
    const eventWrappers = Object.keys(handlers).map((event) => {
      const wrapper = (data: any) => {
        handlersRef.current[event]?.(data);
      };
      socket.on(event, wrapper);
      return { event, wrapper };
    });

    // ✅ Built-in Live_Frame listener
    const liveFrameWrapper = (frame: any) => {
      liveFrameRef.current?.(frame);
    };
    socket.on("Live_Frame", liveFrameWrapper);

    return () => {
      eventWrappers.forEach(({ event, wrapper }) => {
        socket.off(event, wrapper);
      });
      socket.off("Live_Frame", liveFrameWrapper);
      socket.disconnect();
    };
  }, []);

  return socketRef.current;
};
