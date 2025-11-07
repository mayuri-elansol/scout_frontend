// import { useEffect } from "react";

// export const useSSEListener = (onEvent?: (data: any) => void): void => {
//   useEffect(() => {
//     console.log("Creating SSE connection...");
//     const eventSource = new EventSource(
//       "http://localhost:4001/api/v1/events/stream"
//     );

//     eventSource.onmessage = (event: MessageEvent) => {
//       console.log("📡 SSE Event Received:", event.data);
//       if (onEvent) onEvent(event.data);
//     };

//     eventSource.onerror = (err) => {
//       console.error("❌ SSE Error:", err);
//       eventSource.close();
//       console.log("Closed SSE connection due to error");
//     };

//     return () => {
//       eventSource.close();
//       console.log("Closed SSE connection on unmount");
//     };
//   }, [onEvent]);
// };
// useSSEListener.ts
import { useEffect } from "react";
import { getEventSource } from "../utils/sseSingleton";

export const useSSEListener = (onEvent?: (data: any) => void): void => {
  useEffect(() => {
    const eventSource = getEventSource(
      "http://localhost:4001/api/v1/events/stream"
    );

    const handleMessage = (event: MessageEvent) => {
      console.log("📡 SSE Event Received:", event.data);
      if (onEvent) onEvent(event.data);
    };

    eventSource.addEventListener("message", handleMessage);

    eventSource.onerror = (err) => {
      console.error("❌ SSE Error:", err);
    };

    // cleanup only removes listener, doesn't close singleton
    return () => {
      eventSource.removeEventListener("message", handleMessage);
    };
  }, [onEvent]);
};
