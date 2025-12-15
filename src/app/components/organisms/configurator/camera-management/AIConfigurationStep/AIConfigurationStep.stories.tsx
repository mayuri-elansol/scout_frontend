import type { Meta, StoryObj } from "@storybook/nextjs";
import AIConfigurationStep from "./AIConfigurationStep";
import type { CameraData } from "../CameraOnboardingStep/CameraOnboardingStep";

const mockCamera: CameraData = {
  id: "camera-1",
  ipAddress: "192.168.1.10",
  username: "admin",
  password: "123456",
  port: "554",
  make: "Hikvision",
  position: "Front Gate",
  rtspStream: "rtsp://admin:123456@192.168.1.10:554/Streaming/Channels/101",
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
    onSave: () => console.log("Saved!"),
    onBack: () => console.log("Back"),
  },
};
