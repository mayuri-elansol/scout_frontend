import { useEffect } from "react";
import { getSocket } from "@/sockets/socket.client";

type SocketEventHandler<T> = (payload: T) => void;

interface UseSocketEventParams<T> {
  tenantId: string;
  enabled?: boolean;
  event: string;
  handler: SocketEventHandler<T>;
}

export const useSocketEvent = <T>({
  tenantId,
  enabled = true,
  event,
  handler,
}: UseSocketEventParams<T>) => {
  useEffect(() => {
 if (!enabled || !tenantId) return;
    const socket = getSocket(tenantId);

    socket.on(event, handler);

    return () => {
      socket.off(event, handler);
    };
  }, [tenantId, enabled, event, handler]);
};
