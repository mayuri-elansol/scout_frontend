// import type { Meta, StoryObj } from '@storybook/react';
import type { Meta, StoryObj } from "@storybook/react-vite";
import CameraStatusItem from "./CameraStatusItem";

const meta: Meta<typeof CameraStatusItem> = {
  title: "Components/Molecules/CameraStatusItem",
  component: CameraStatusItem,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "SCOUT Camera Status Item component for individual camera monitoring with status, quality metrics, and controls. Used in camera management interfaces.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["online", "offline", "maintenance", "error"],
      description: "Camera operational status",
    },
    quality: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Video quality percentage",
    },
    uptime: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Camera uptime percentage",
    },
    recordingStatus: {
      control: "select",
      options: ["recording", "paused", "stopped"],
      description: "Recording status",
    },
    alertCount: {
      control: { type: "number", min: 0, max: 99 },
      description: "Number of active alerts",
    },
    frameRate: {
      control: { type: "number", min: 15, max: 60, step: 15 },
      description: "Video frame rate",
    },
    onPlay: {
      action: "play-clicked",
      description: "Play video handler",
    },
    onSettings: {
      action: "settings-clicked",
      description: "Settings handler",
    },
    onViewAlerts: {
      action: "alerts-clicked",
      description: "View alerts handler",
    },
    onClick: {
      action: "camera-clicked",
      description: "Camera item click handler",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OnlineCamera: Story = {
  args: {
    cameraId: "CAM-001",
    cameraName: "Production Floor - East",
    zone: "Production Floor A",
    status: "online",
    quality: 95,
    uptime: 99,
    recordingStatus: "recording",
    alertCount: 0,
    resolution: "1920x1080",
    frameRate: 30,
  },
};

export const OfflineCamera: Story = {
  args: {
    cameraId: "CAM-002",
    cameraName: "Warehouse - Storage Area",
    zone: "Warehouse B",
    status: "offline",
    quality: 0,
    uptime: 85,
    lastSeen: "2024-01-15T14:30:00",
    alertCount: 0,
    resolution: "1280x720",
    frameRate: 15,
  },
};

export const MaintenanceCamera: Story = {
  args: {
    cameraId: "CAM-003",
    cameraName: "Main Entrance - Gate 1",
    zone: "Main Entrance",
    status: "maintenance",
    quality: 0,
    uptime: 92,
    lastSeen: "2024-01-15T10:15:00",
    alertCount: 0,
    resolution: "1920x1080",
    frameRate: 30,
  },
};

export const ErrorCamera: Story = {
  args: {
    cameraId: "CAM-004",
    cameraName: "Assembly Line - Station 3",
    zone: "Assembly Line 2",
    status: "error",
    quality: 45,
    uptime: 78,
    lastSeen: "2024-01-15T16:45:00",
    alertCount: 2,
    resolution: "1920x1080",
    frameRate: 30,
  },
};

export const CameraWithAlerts: Story = {
  args: {
    cameraId: "CAM-006",
    cameraName: "Parking Area - Zone C",
    zone: "Parking Area",
    status: "online",
    quality: 88,
    uptime: 96,
    recordingStatus: "recording",
    alertCount: 5,
    resolution: "1920x1080",
    frameRate: 30,
  },
};

export const CameraGrid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "16px",
      }}
    >
      <CameraStatusItem
        cameraId="CAM-001"
        cameraName="Production Floor - East"
        zone="Production Floor A"
        status="online"
        quality={95}
        uptime={99}
        recordingStatus="recording"
        alertCount={0}
        resolution="1920x1080"
        frameRate={30}
      />
      <CameraStatusItem
        cameraId="CAM-002"
        cameraName="Warehouse Storage"
        zone="Warehouse B"
        status="offline"
        quality={0}
        uptime={85}
        lastSeen="2024-01-15T14:30:00"
        alertCount={0}
        resolution="1280x720"
        frameRate={15}
      />
      <CameraStatusItem
        cameraId="CAM-003"
        cameraName="Main Entrance"
        zone="Main Entrance"
        status="maintenance"
        quality={0}
        uptime={92}
        lastSeen="2024-01-15T10:15:00"
        alertCount={0}
        resolution="1920x1080"
        frameRate={30}
      />
      <CameraStatusItem
        cameraId="CAM-004"
        cameraName="Assembly Line"
        zone="Assembly Line 2"
        status="error"
        quality={45}
        uptime={78}
        lastSeen="2024-01-15T16:45:00"
        alertCount={2}
        resolution="1920x1080"
        frameRate={30}
      />
    </div>
  ),
};
