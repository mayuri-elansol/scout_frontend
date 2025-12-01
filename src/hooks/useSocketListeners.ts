import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:4001";

export const useSocketListeners = (
  handlers: Record<string, (data: any) => void>
) => {
  const socketRef = useRef<Socket | null>(null);
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    // Create ONLY ONE socket instance
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

    const eventHandlers = Object.keys(handlers).map((event) => {
      const wrapper = (data: any) => handlersRef.current[event]?.(data);
      socket.on(event, wrapper);
      return { event, wrapper };
    });

    return () => {
      eventHandlers.forEach(({ event, wrapper }) => {
        socket.off(event, wrapper);
      });
      socket.disconnect();
    };
  }, []);

  return socketRef.current;
};
