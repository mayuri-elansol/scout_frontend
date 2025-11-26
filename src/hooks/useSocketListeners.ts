// import { useEffect, useRef } from "react";
// import { io, Socket } from "socket.io-client";

// const SOCKET_URL = "http://localhost:4001";
// const socket = io(SOCKET_URL, {
//   path: "/socket.io",
//   transports: ["websocket"],
// });
// export const useSocketListeners = (
//   handlers: Record<string, (data: any) => void>
// ) => {
//   const socketRef = useRef<Socket | null>(null);
//   const handlersRef = useRef(handlers);

//   // ✅ Keep handlers ref updated without triggering reconnection
//   useEffect(() => {
//     handlersRef.current = handlers;
//   }, [handlers]);

//   useEffect(() => {
//     // ✅ Create socket connection once
//     const socket = io(SOCKET_URL, {
//       transports: ["websocket"],
//       reconnection: true,
//       reconnectionDelay: 1000,
//       reconnectionAttempts: 5,
//       timeout: 10000,
//     });

//     socketRef.current = socket;

//     socket.on("connect", () => {
//       console.log("🔌 Connected to WebSocket:", socket.id);
//     });

//     socket.on("disconnect", (reason) => {
//       console.log("❌ Disconnected from WebSocket:", reason);
//     });

//     socket.on("connect_error", (error) => {
//       console.error("🔴 Connection error:", error.message);
//     });

//     // ✅ Use a wrapper to always call latest handlers
//     const eventHandlers = Object.keys(handlers).map((event) => {
//       const wrapper = (data: any) => {
//         handlersRef.current[event]?.(data);
//       };
//       socket.on(event, wrapper);
//       return { event, wrapper };
//     });

//     return () => {
//       if (socket.connected) {
//         socket.disconnect();
//       }

//       // ✅ Clean up event listeners
//       eventHandlers.forEach(({ event, wrapper }) => {
//         socket.off(event, wrapper);
//       });
//       // socket.disconnect();
//       console.log("🧹 Socket cleaned up");
//     };
//   }, []); // ✅ Empty dependency array - connect only once

//   return socketRef.current;
// };
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:4001";

// Keep only ONE socket instance alive
let globalSocket: Socket | null = null;

export const useSocketListeners = (
  handlers: Record<string, (data: any) => void>
) => {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  // Create socket once
  useEffect(() => {
    if (!globalSocket) {
      globalSocket = io(SOCKET_URL, {
        transports: ["websocket"],
        reconnection: true,
      });

      globalSocket.on("connect", () => {
        console.log("🟢 Connected:", globalSocket?.id);
      });
      globalSocket.on("connect_error", (e) => {
        console.log("🔴 Connect error:", e);
      });
    }
  }, []);

  // Attach listeners whenever handlers change
  useEffect(() => {
    if (!globalSocket) return;
    const socket = globalSocket;

    const listeners = Object.keys(handlers).map((event) => {
      const wrapper = (data: any) => handlersRef.current[event]?.(data);
      socket.on(event, wrapper);
      return { event, wrapper };
    });

    return () => {
      listeners.forEach(({ event, wrapper }) => {
        socket.off(event, wrapper);
      });
    };
  }, [handlers]); // <-- IMPORTANT FIX

  return globalSocket;
};
