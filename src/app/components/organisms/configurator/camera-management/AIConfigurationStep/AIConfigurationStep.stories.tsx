import type { Meta, StoryObj } from "@storybook/react";
import AIConfigurationStep from "./AIConfigurationStep";

const mockCamera = {
  id: "CAM-001",
  ipAddress: "192.168.1.10",
  username: "admin",
  password: "admin123",
  port: "554",
  make: "Hikvision",
  position: "Main Gate",
  rtspStream: "rtsp://192.168.1.10/stream",
  status: "connected",
  aiConfig: undefined,
};

const meta: Meta<typeof AIConfigurationStep> = {
  title: "Organisms/Configurator/CameraManagement/AIConfigurationStep",
  component: AIConfigurationStep,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AIConfigurationStep>;

export const Default: Story = {
  args: {
    camera: mockCamera,
    onSave: (config) => console.log("Saved AI Config:", config),
    onBack: () => console.log("Back clicked"),
  },
};
