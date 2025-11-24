import type { Meta, StoryObj } from "@storybook/react";
import { CameraSelectionDrawer } from "./CameraSelectionDrawer";
import { UseCase, Camera } from "@/app/types/useCaseManager";

/* -------------------------------------------------
   SHARED MOCK DATA
--------------------------------------------------- */
const mockUseCases: UseCase[] = [
  {
    id: "uc-1",
    name: "Personal Protective Equipment (PPE) Detection",
    description: "Detect if workers are wearing required PPE like helmets, vests, and safety gear",
    category: "Safety & Compliance",
    enabled: true,
    assignedCameraIds: ["cam-1", "cam-2"],
  },
  {
    id: "uc-2",
    name: "Object Detection in Walking Bays",
    description: "Monitor walking areas for unauthorized objects and potential hazards",
    category: "Safety & Compliance",
    enabled: true,
    assignedCameraIds: [],
  },
];

const mockCameras: Camera[] = [
  {
    id: "cam-1",
    name: "Main Entrance Camera",
    ipAddress: "192.168.1.10",
    port: "554",
    make: "Hikvision",
    position: "Main Gate",
    location: "Building A - Entrance",
    rtspStream: "rtsp://192.168.1.10/stream",
    status: "connected",
  },
  {
    id: "cam-2",
    name: "Warehouse Loading Dock",
    ipAddress: "192.168.1.11",
    port: "554",
    make: "Dahua",
    position: "Loading Area",
    location: "Warehouse - Loading Dock",
    rtspStream: "rtsp://192.168.1.11/stream",
    status: "connected",
  },
  {
    id: "cam-3",
    name: "Production Floor 1",
    ipAddress: "192.168.1.12",
    port: "554",
    make: "Axis",
    position: "Floor 1 - East",
    location: "Production Area",
    rtspStream: "rtsp://192.168.1.12/stream",
    status: "offline",
  },
  {
    id: "cam-4",
    name: "Parking Lot Camera",
    ipAddress: "192.168.1.13",
    port: "554",
    make: "Hikvision",
    position: "Parking Area",
    location: "Outdoor - Parking",
    rtspStream: "rtsp://192.168.1.13/stream",
    status: "pending",
  },
  {
    id: "cam-5",
    name: "Storage Room Camera",
    ipAddress: "192.168.1.14",
    port: "554",
    make: "Dahua",
    position: "Storage Area",
    location: "Building B - Storage",
    rtspStream: "rtsp://192.168.1.14/stream",
    status: "failed",
  },
];

/* -------------------------------------------------
   META (DEFAULT ARGS)
--------------------------------------------------- */
const meta: Meta<typeof CameraSelectionDrawer> = {
  title: "Organisms/Configurator/UseCaseManager/CameraSelectionDrawer",
  component: CameraSelectionDrawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    open: true,
    onClose: () => console.log("Drawer Closed"),
    onSave: async (useCaseId: string, selectedCameraIds: string[]) => {
      console.log("Saved →", useCaseId, selectedCameraIds);
      return Promise.resolve();
    },
    cameras: mockCameras,
    useCase: mockUseCases[0],
    isLoading: false,
  },
};

export default meta;
type Story = StoryObj<typeof CameraSelectionDrawer>;

/* -------------------------------------------------
   STORIES
--------------------------------------------------- */

export const Default: Story = {};

export const WithoutAssignedCameras: Story = {
  args: {
    useCase: mockUseCases[1],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const NoCamerasAvailable: Story = {
  args: {
    cameras: [],
  },
};

export const ManyCameras: Story = {
  args: {
    cameras: [
      ...mockCameras,
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `cam-extra-${i}`,
        name: `Extra Camera ${i + 1}`,
        ipAddress: `192.168.1.${20 + i}`,
        port: "554",
        make: i % 2 === 0 ? "Hikvision" : "Dahua",
        position: `Area ${i + 6}`,
        location: `Building ${String.fromCharCode(67 + Math.floor(i / 3))}`,
        rtspStream: `rtsp://192.168.1.${20 + i}/stream`,
        status: ["connected", "offline", "pending"][i % 3] as Camera["status"],
      })),
    ],
  },
};
