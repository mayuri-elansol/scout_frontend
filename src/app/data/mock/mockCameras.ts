export interface Camera {
  id: number;
  name: string;
  location: string;
  ipAddress: string;
  status: "connected" | "offline" | "pending";
  make?: string;
}

export const mockCameras: Camera[] = [
  {
    id: 1,
    name: "Camera 1",
    location: "Building A - Production Floor",
    ipAddress: process.env.NEXT_PUBLIC_MOCK_CAMERA_IP ?? "127.0.0.1",
    status: "connected",
    make: "Hikvision",
  },
  {
    id: 2,
    name: "Camera 2",
    location: "Building A - Production Line 1",
    ipAddress: process.env.NEXT_PUBLIC_MOCK_CAMERA_IP ?? "127.0.0.1",
    status: "connected",
    make: "Dahua",
  },
  {
    id: 3,
    name: "Camera 3",
    location: "Building A - Production Line 2",
    ipAddress: process.env.NEXT_PUBLIC_MOCK_CAMERA_IP ?? "127.0.0.1",
    status: "connected",
    make: "Hikvision",
  },
  {
    id: 4,
    name: "Camera 4",
    location: "Building B - Loading Dock",
    ipAddress: process.env.NEXT_PUBLIC_MOCK_CAMERA_IP ?? "127.0.0.1",
    status: "offline",
    make: "Axis",
  },
  {
    id: 5,
    name: "Camera 5",
    location: "Building A - Main Entrance",
    ipAddress: process.env.NEXT_PUBLIC_MOCK_CAMERA_IP ?? "127.0.0.1",
    status: "connected",
    make: "Hikvision",
  },
  {
    id: 6,
    name: "Camera 6",
    location: "Building A - Lobby",
    ipAddress: process.env.NEXT_PUBLIC_MOCK_CAMERA_IP ?? "127.0.0.1",
    status: "connected",
    make: "Dahua",
  },
  {
    id: 7,
    name: "Camera 7",
    location: "Building B - Warehouse Entry",
    ipAddress: process.env.NEXT_PUBLIC_MOCK_CAMERA_IP ?? "127.0.0.1",
    status: "connected",
    make: "Hikvision",
  },
  {
    id: 8,
    name: "Camera 8",
    location: "Building B - Warehouse Exit",
    ipAddress: process.env.NEXT_PUBLIC_MOCK_CAMERA_IP ?? "127.0.0.1",
    status: "connected",
    make: "Axis",
  },
  {
    id: 9,
    name: "Camera 9",
    location: "Outdoor - North Parking Entrance",
    ipAddress: process.env.NEXT_PUBLIC_MOCK_CAMERA_IP ?? "127.0.0.1",
    status: "connected",
    make: "Hikvision",
  },
  {
    id: 10,
    name: "Camera 10",
    location: "Outdoor - North Parking Exit",
    ipAddress: process.env.NEXT_PUBLIC_MOCK_CAMERA_IP ?? "127.0.0.1",
    status: "pending",
    make: "Dahua",
  },
];
