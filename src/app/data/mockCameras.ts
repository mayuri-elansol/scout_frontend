// Mock Cameras Data
export interface Camera {
  id: number;
  name: string;
  position: string;
  location?: string;
  ipAddress: string;
  port: string;
  make: string;
  status: "connected" | "offline" | "pending" | "failed";
  rtspStream?: string;
  createdAt: string;
}

export const mockCameras: Camera[] = [
  {
    id: 1,
    name: "Camera 1",
    position: "Main Entrance",
    location: "Building A - Ground Floor",
    ipAddress: "192.168.1.101",
    port: "554",
    make: "Hikvision",
    status: "connected",
    rtspStream: "rtsp://192.168.1.101:554/stream1",
    createdAt: "2024-01-05T08:00:00Z",
  },
  {
    id: 2,
    name: "Camera 2",
    position: "Production Floor - Zone A",
    location: "Building A - First Floor",
    ipAddress: "192.168.1.102",
    port: "554",
    make: "Dahua",
    status: "connected",
    createdAt: "2024-01-05T08:15:00Z",
  },
  {
    id: 3,
    name: "Camera 3",
    position: "Production Floor - Zone B",
    location: "Building A - First Floor",
    ipAddress: "192.168.1.103",
    port: "554",
    make: "Hikvision",
    status: "connected",
    createdAt: "2024-01-05T08:30:00Z",
  },
  {
    id: 4,
    name: "Camera 4",
    position: "Warehouse Entry",
    location: "Building B - Ground Floor",
    ipAddress: "192.168.1.104",
    port: "554",
    make: "Axis",
    status: "connected",
    createdAt: "2024-01-05T08:45:00Z",
  },
  {
    id: 5,
    name: "Camera 5",
    position: "Parking Lot",
    location: "Outdoor - North",
    ipAddress: "192.168.1.105",
    port: "554",
    make: "Hikvision",
    status: "connected",
    createdAt: "2024-01-05T09:00:00Z",
  },
  {
    id: 6,
    name: "Camera 6",
    position: "Loading Dock",
    location: "Building B - Loading Area",
    ipAddress: "192.168.1.106",
    port: "554",
    make: "Dahua",
    status: "offline",
    createdAt: "2024-01-05T09:15:00Z",
  },
  {
    id: 7,
    name: "Camera 7",
    position: "Emergency Exit",
    location: "Building A - Floor 2",
    ipAddress: "192.168.1.107",
    port: "554",
    make: "Hikvision",
    status: "connected",
    createdAt: "2024-01-05T09:30:00Z",
  },
  {
    id: 8,
    name: "Camera 8",
    position: "Reception Area",
    location: "Building A - Ground Floor",
    ipAddress: "192.168.1.108",
    port: "554",
    make: "Axis",
    status: "connected",
    createdAt: "2024-01-05T09:45:00Z",
  },
];
