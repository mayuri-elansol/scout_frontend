// sseSingleton.ts
let eventSource: EventSource | null = null;

export const getEventSource = (url: string): EventSource => {
  if (!eventSource) {
    eventSource = new EventSource(url);
    console.log("📡 SSE connection created");
  }
  return eventSource;
};
