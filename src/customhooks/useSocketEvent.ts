import { getSocket } from "@/sockets/socket.client";
import { useEffect, useRef } from "react";

interface UseSocketEventParams<T> {
  tenantId: string;
  enabled?: boolean;
  event: string;
  handler: (payload: T) => void;
}

export const useSocketEvent = <T>({
  tenantId,
  enabled = true,
  event,
  handler,
}: UseSocketEventParams<T>) => {
  // FIX: store latest handler in a ref so the socket listener never goes stale
  // and never needs to re-subscribe just because the handler function changed.
  const handlerRef = useRef(handler);

  // Keep ref in sync with the latest handler on every render (no re-subscribe needed)
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!enabled || !tenantId) return;

    const socket = getSocket(tenantId);

    // Stable wrapper — socket always calls the latest handler via ref
    const stableHandler = (payload: T) => handlerRef.current(payload);

    socket.on(event, stableHandler);

    return () => {
      socket.off(event, stableHandler);
    };

    // handler is intentionally excluded — ref keeps it fresh without re-subscribing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenantId, enabled, event]);
};