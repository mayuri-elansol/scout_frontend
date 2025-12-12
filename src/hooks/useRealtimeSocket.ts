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

// // src/hooks/useRealtimeSocket.ts
// import { io, Socket } from "socket.io-client";
// import { useEffect, useRef } from "react";

// export function useRealtimeSocket(
//   url: string, // backend server IP
//   topic: string, // event name
//   onData: (data: any) => void
// ) {
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     // Create a new socket only for this URL
//     socketRef.current = io(url, {
//       transports: ["websocket"],
//     });

//     console.log(`🟢 Connected to WebSocket → ${url}`);

//     const socket = socketRef.current;

//     // Subscribe to topic
//     socket.on(topic, onData);

//     console.log(`📡 Subscribed to topic "${topic}" on ${url}`);

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.off(topic, onData);
//         socketRef.current.close(); // 🔥 close only this socket
//         console.log(`🔴 Socket closed for ${url}`);
//       }
//     };
//   }, [url, topic, onData]);
// }

//=================live frame

// src/hooks/useRealtimeSocket.ts
import { io, Socket } from "socket.io-client";
import { useEffect, useRef } from "react";

interface RealtimeSocketOptions {
  topic: string;
  onData: (data: any) => void;
  onLiveFrame?: (frame: any) => void; // ✅ NEW
}

export function useRealtimeSocket(url: string, options: RealtimeSocketOptions) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(url, {
      transports: ["websocket"],
    });

    const socket = socketRef.current;

    console.log(`🟢 Connected to WebSocket → ${url}`);

    // ✅ Main topic listener (PPE, violations, etc.)
    socket.on(options.topic, options.onData);

    // ✅ Live frame listener
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
