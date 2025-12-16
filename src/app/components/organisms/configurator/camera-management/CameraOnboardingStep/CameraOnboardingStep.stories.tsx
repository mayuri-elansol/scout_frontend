import type { Meta, StoryObj } from "@storybook/nextjs";
import CameraOnboardingStep from "./CameraOnboardingStep";

/** Local definition because OrganizationCameraManagement does NOT export it */
interface AIConfig {
  useCases: string[];
  roiData: Record<string, { configured: boolean }>;
  fineTuning: Record<string, { tuned: boolean }>;
  enabled: boolean;
  viewName?: string;
}

/** Matches EXACT interface of CameraData in component */
interface CameraData {
  id: string;
  ipAddress: string;
  cameraname: string;
  username: string;
  password: string;
  port: string;
  make: string;
  rtspStream: string;
  zoneId: string;       // 🔴 REQUIRED
  locationId: string; 
  status: "connected" | "failed" | "pending";
  aiConfig?: AIConfig;
}


const mockCameras: CameraData[] = [
  {
    id: "cam-1",
    ipAddress: "192.168.1.10",
    cameraname: "Front Gate",
    username: "admin",
    password: "admin123",
    port: "554",
    make: "Hikvision",
    rtspStream: "rtsp://192.168.1.10/stream",
    zoneId: "zone-1",
    locationId: "loc-1",
    status: "connected",
  },
  {
    id: "cam-2",
    ipAddress: "192.168.1.11",
    cameraname: "Front Gate 2",
    username: "admin",
    password: "admin123",
    port: "554",
    make: "Dahua",
    rtspStream: "rtsp://192.168.1.11/stream",
    zoneId: "zone-2",
    locationId: "loc-2",
    status: "connected",
  },
  {
    id: "cam-3",
    ipAddress: "192.168.1.12",
    cameraname: "Front Gate 3",
    username: "admin",
    password: "admin123",
    port: "554",
    make: "Axis",
    rtspStream: "rtsp://192.168.1.12/stream",
    zoneId: "zone-3",
    locationId: "loc-3",
    status: "failed",
  },
];

const meta: Meta<typeof CameraOnboardingStep> = {
  title: "Organisms/Configurator/CameraManagement/CameraOnboardingStep",
  component: CameraOnboardingStep,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: "100vh",
          overflow: "hidden",
          background: "#f9f9f9",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CameraOnboardingStep>;

export const Default: Story = {
  args: {
    cameras: [],
    onCameraAdd: (camera) => console.log("Camera added:", camera),
    onCameraBatchAdd: (cameras) => console.log("Batch added:", cameras),
    onCameraRemove: (id) => console.log("Camera removed:", id),
    onNext: () => console.log("Next clicked"),
    onBack: () => console.log("Back clicked"),
    isOptional: false,
  },
};

export const WithCameras: Story = {
  args: {
    cameras: mockCameras,
    onCameraAdd: (camera) => console.log("Camera added:", camera),
    onCameraBatchAdd: (cameras) => console.log("Batch added:", cameras),
    onCameraRemove: (id) => console.log("Camera removed:", id),
    onNext: () => console.log("Next clicked"),
    onBack: () => console.log("Back clicked"),
  },
};

export const Optional: Story = {
  args: {
    cameras: [],
    onCameraAdd: (camera) => console.log("Camera added:", camera),
    onCameraBatchAdd: (cameras) => console.log("Batch added:", cameras),
    onCameraRemove: (id) => console.log("Camera removed:", id),
    onNext: () => console.log("Next clicked"),
    onBack: () => console.log("Back clicked"),
    isOptional: true,
  },
};

export const WithMixedStatus: Story = {
  args: {
    cameras: [
      ...mockCameras,
      {
        id: "cam-4",
        ipAddress: "192.168.1.13",
        cameraname: "Front Gate 4",
        username: "admin",
        password: "admin123",
        port: "554",
        make: "Hikvision",
        zoneId: "zone-1",
        locationId: "loc-1",
        rtspStream: "rtsp://192.168.1.13/stream",
        status: "pending",
      },
    ],
    onCameraAdd: (camera) => console.log("Camera added:", camera),
    onCameraBatchAdd: (cameras) => console.log("Batch added:", cameras),
    onCameraRemove: (id) => console.log("Camera removed:", id),
    onNext: () => console.log("Next clicked"),
    onBack: () => console.log("Back clicked"),
  },
};
