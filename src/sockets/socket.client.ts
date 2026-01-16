import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:4010";

const socketMap = new Map<string, Socket>();

export const getSocket = (tenantId: string): Socket => {
  if (socketMap.has(tenantId)) {
    return socketMap.get(tenantId)!;
  }

  const socket = io(SOCKET_URL, {
    query: { tenantId },
    transports: ["websocket"],
    reconnectionAttempts: 5,
    timeout: 10000,
  });

  socketMap.set(tenantId, socket);

  return socket;
};
