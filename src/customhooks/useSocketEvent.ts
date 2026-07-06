// import { getSocket } from "@/sockets/socket.client";
// import { useEffect, useRef } from "react";

// interface UseSocketEventParams<T> {
//   tenantId: string;
//   enabled?: boolean;
//   event: string;
//   handler: (payload: T) => void;
// }

// export const useSocketEvent = <T>({
//   tenantId,
//   enabled = true,
//   event,
//   handler,
// }: UseSocketEventParams<T>) => {
//   // FIX: store latest handler in a ref so the socket listener never goes stale
//   // and never needs to re-subscribe just because the handler function changed.
//   const handlerRef = useRef(handler);

//   // Keep ref in sync with the latest handler on every render (no re-subscribe needed)
//   useEffect(() => {
//     handlerRef.current = handler;
//   });

//   useEffect(() => {
//     if (!enabled || !tenantId) return;

//     const socket = getSocket(tenantId);

//     // Stable wrapper — socket always calls the latest handler via ref
//     const stableHandler = (payload: T) => handlerRef.current(payload);

//     socket.on(event, stableHandler);

//     return () => {
//       socket.off(event, stableHandler);
//     };

//     // handler is intentionally excluded — ref keeps it fresh without re-subscribing
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [tenantId, enabled, event]);
// };









// import { getSocket } from "@/sockets/socket.client";
// import { useEffect, useRef } from "react";
// import { Socket } from "socket.io-client";

// interface UseSocketEventProps<T> {
//   tenantId: string;
//   enabled: boolean;
//   event: string;
//   handler: (data: T) => void;
// }

// export function useSocketEvent<T>({
//   tenantId,
//   enabled,
//   event,
//   handler,
// }: UseSocketEventProps<T>) {
  
//   // Use a ref to always have the latest handler without resetting the effect
//   const handlerRef = useRef(handler);
//   useEffect(() => {
//     handlerRef.current = handler;
//   }, [handler]);

//   useEffect(() => {
//     if (!tenantId || !enabled) return;

//     const socket: Socket = getSocket(tenantId);
//     const targetRoom = { tenantId, event };

//     // Create a stable wrapper function that references the latest handler ref
//     const stableHandler = (data: T) => {
//       handlerRef.current(data);
//     };

//     console.log(`📡 Requesting join for: ${event}`);
//     socket.emit("join-event", targetRoom);
//     socket.on(event, stableHandler);

//     return () => {
//       console.log(`🛑 Requesting leave for: ${event}`);
//       socket.emit("leave-event", targetRoom);
//       socket.off(event, stableHandler);
//     };
//   // ONLY re-run if tenantId, enabled status, or the event key changes
//   }, [tenantId, enabled, event]); 
// }



import { getSocket } from "@/sockets/socket.client";
import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

interface UseSocketEventProps<T> {
  tenantId: string;
  enabled: boolean;
  event: string;
  handler: (data: T) => void;
}

export function useSocketEvent<T>({
  tenantId,
  enabled,
  event,
  handler,
}: UseSocketEventProps<T>) {
  
  const handlerRef = useRef(handler);
  // Holds a reference to the active leave timer
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    // Prevent execution on incomplete or loading state values
    if (!tenantId || !enabled) return;

    const socket: Socket = getSocket(tenantId);
    const targetRoom = { tenantId, event };

    const stableHandler = (data: T) => {
      handlerRef.current(data);
    };

    // 🔥 FIX: If a leave event was scheduled for this specific page, CANCEL IT.
    // This means React re-rendered or double-mounted, and we never actually left.
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    } else {
      // Only emit a join request if we aren't already securely inside the room
      socket.emit("join-event", targetRoom);
    }

    socket.on(event, stableHandler);

    return () => {
      socket.off(event, stableHandler);

      // ⏳ FIX: Delay sending the leave notification to the backend by 150ms.
      // If the component remounts immediately, the new render will clear this timeout.
      leaveTimeoutRef.current = setTimeout(() => {
        socket.emit("leave-event", targetRoom);
        leaveTimeoutRef.current = null;
      }, 150);
    };
  }, [tenantId, enabled, event]); 
}