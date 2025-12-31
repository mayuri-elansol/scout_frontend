// import { useEffect, useRef } from "react";
// import { io, Socket } from "socket.io-client";

// const SOCKET_URL = "http://localhost:4001";

// export const useSocketListeners = (
//   handlers: Record<string, (data: any) => void>,
//   onLiveFrame?: (frame: any) => void // 👈 optional live-frame callback
// ) => {
//   const socketRef = useRef<Socket | null>(null);
//   const handlersRef = useRef(handlers);
//   const liveFrameRef = useRef(onLiveFrame);

//   useEffect(() => {
//     handlersRef.current = handlers;
//   }, [handlers]);

//   useEffect(() => {
//     liveFrameRef.current = onLiveFrame;
//   }, [onLiveFrame]);

//   useEffect(() => {
//     const socket = io(SOCKET_URL, {
//       transports: ["websocket"],
//       reconnection: true,
//       reconnectionDelay: 1000,
//       reconnectionAttempts: 5,
//       timeout: 10000,
//     });

//     socketRef.current = socket;

//     socket.on("connect", () => {
//       console.log("🔌 Connected:", socket.id);
//     });

//     socket.on("disconnect", (reason) => {
//       console.log("❌ Disconnected:", reason);
//     });

//     socket.on("connect_error", (error) => {
//       console.error("🔴 Connection error:", error.message);
//     });

//     // ✅ Custom events (passed in handlers)
//     const eventWrappers = Object.keys(handlers).map((event) => {
//       const wrapper = (data: any) => {
//         handlersRef.current[event]?.(data);
//       };
//       socket.on(event, wrapper);
//       return { event, wrapper };
//     });

//     // ✅ Built-in Live_Frame listener
//     const liveFrameWrapper = (frame: any) => {
//       liveFrameRef.current?.(frame);
//     };
//     socket.on("Live_Frame", liveFrameWrapper);

//     return () => {
//       eventWrappers.forEach(({ event, wrapper }) => {
//         socket.off(event, wrapper);
//       });
//       socket.off("Live_Frame", liveFrameWrapper);
//       socket.disconnect();
//     };
//   }, []);

//   return socketRef.current;
// }




import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:4001";

type SocketEventHandlers<T extends Record<string, unknown>> = {
  [K in keyof T]: (data: T[K]) => void;
};

// Single global socket instance
let globalSocket: Socket | null = null;

export const useSocketListeners = <T extends Record<string, unknown>>(
  handlers: SocketEventHandlers<T>
): Socket | null => {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  // Create socket ONCE
  useEffect(() => {
    if (!globalSocket) {
      globalSocket = io(SOCKET_URL, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
        timeout: 10000,
      });

      globalSocket.on("connect", () => {
        console.log("🟢 Connected:", globalSocket?.id);
      });

      globalSocket.on("disconnect", (reason: string) => {
        console.log("❌ Disconnected:", reason);
      });

      globalSocket.on("connect_error", (error: Error) => {
        console.error("🔴 Connection error:", error.message);
      });
    }
  }, []);

  // Attach event listeners
  useEffect(() => {
    if (!globalSocket) return;

    const socket = globalSocket;

    const subscriptions: Array<{
      event: keyof T;
      handler: (data: unknown) => void;
    }> = [];

    (Object.keys(handlers) as Array<keyof T>).forEach((event) => {
      const wrapper = (data: unknown) => {
        handlersRef.current[event](data as T[typeof event]);
      };

      socket.on(event as string, wrapper);
      subscriptions.push({ event, handler: wrapper });
    });

    return () => {
      subscriptions.forEach(({ event, handler }) => {
        socket.off(event as string, handler);
      });
    };
  }, [handlers]);

  return globalSocket;
};
