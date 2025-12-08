// // src/hooks/useRealtimeSocket.ts
// import { io, Socket } from "socket.io-client";
// import { useEffect, useRef } from "react";

// export function useRealtimeSocket(topic: string, onData: (data: any) => void) {
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     if (!socketRef.current) {
//       // socketRef.current = io("http://localhost:3001");
//       socketRef.current = io("http://192.168.0.5:3001");
//       console.log("subscribed from", onData);
//       console.log("🟢 Connected to WebSocket");
//     }

//     const socket = socketRef.current;
//     socket.on(topic, onData);

//     return () => {
//       socket.off(topic, onData); // ✅ just remove listener
//       console.log("🔴 Unsubscribed from", topic);
//     };
//   }, [topic, onData]);
// }

// src/hooks/useRealtimeSocket.ts
import { io, Socket } from "socket.io-client";
import { useEffect, useRef } from "react";

export function useRealtimeSocket(
  url: string, // backend server IP
  topic: string, // event name
  onData: (data: any) => void
) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Create a new socket only for this URL
    socketRef.current = io(url, {
      transports: ["websocket"],
    });

    console.log(`🟢 Connected to WebSocket → ${url}`);

    const socket = socketRef.current;

    // Subscribe to topic
    socket.on(topic, onData);

    console.log(`📡 Subscribed to topic "${topic}" on ${url}`);

    return () => {
      if (socketRef.current) {
        socketRef.current.off(topic, onData);
        socketRef.current.close(); // 🔥 close only this socket
        console.log(`🔴 Socket closed for ${url}`);
      }
    };
  }, [url, topic, onData]);
}
