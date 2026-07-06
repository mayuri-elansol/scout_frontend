import { getSocket } from "@/sockets/socket.client";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

interface UseSocketUsecaseRoomProps<T> {
  tenantId: string;
  event: string;       // Exact string from SOCKET_EVENTS (e.g., SOCKET_EVENTS.CAMERA_TAMPERING_UPDATE)
  enabled: boolean;
  handler: (data: T) => void;
}

export function useSocketUsecaseRoom<T>({
  tenantId,
  event,
  enabled,
  handler,
}: UseSocketUsecaseRoomProps<T>) {
  useEffect(() => {
    if (!tenantId || !enabled) return;

    const socket: Socket = getSocket(tenantId);

    // ✅ Matches your new backend @SubscribeMessage('join-event') payload
    socket.emit("join-event", { tenantId, event });

    // Listen to the database mutation broadcasts
    socket.on(event, handler);

    // Clean up when unmounting or toggling off live mode
    return () => {
      // ✅ Matches your new backend @SubscribeMessage('leave-event') payload
      socket.emit("leave-event", { tenantId, event });
      socket.off(event, handler);
    };
  }, [tenantId, event, enabled, handler]);
}