import { useEffect } from "react";

export const useSSEListener = <T = unknown>(onEvent?: (data: T) => void): void => {
  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:4001/api/v1/events/stream"
    );

    eventSource.onmessage = (event: MessageEvent) => {
      console.log("📡 SSE Event Received:", event.data);

      try {
        const parsed: T = JSON.parse(event.data);
        onEvent?.(parsed);
      } catch {
        // If data is not JSON, fallback to raw string
        onEvent?.((event.data as unknown) as T);
      }
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
