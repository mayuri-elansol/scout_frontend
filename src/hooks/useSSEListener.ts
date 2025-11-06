import { useEffect } from "react";

export const useSSEListener = (onEvent?: (data: any) => void): void => {
  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:4001/api/v1/events/stream"
    );

    eventSource.onmessage = (event: MessageEvent) => {
      console.log("📡 SSE Event Received:", event.data);
      if (onEvent) onEvent(event.data);
    };

    eventSource.onerror = (err) => {
      console.error("❌ SSE Error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [onEvent]);
};
