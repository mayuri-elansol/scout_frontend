import type { Meta, StoryObj } from "@storybook/nextjs";
import AIConfigurationStep from "./AIConfigurationStep";

// ✅ Import the real CameraData type

import type { OrgCamera } from "@/app/types/camera";

// interface AIConfigurationStepProps {
//   camera: OrgCamera;
//   onSave: (aiConfig: any) => void;
//   onBack: () => void;
// }


// ---- MOCK CAMERA ----
const mockCamera: OrgCamera = {
  id: "CAM-001",
  ipAddress: "192.168.1.10",
  username: "admin",
  password: "admin123",
  port: "554",
  make: "Hikvision",
  position: "Main Gate", // ✔ valid because string | undefined
  rtspStream: "rtsp://192.168.1.10/stream",
  status: "connected",
  aiConfig: {
    useCases: [],
    roiData: {},
    fineTuning: {},
    enabled: true,
    
  },
};

// ---- META ----
const meta: Meta<typeof AIConfigurationStep> = {
  title: "Organisms/Configurator/CameraManagement/AIConfigurationStep",
  component: AIConfigurationStep,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof AIConfigurationStep>;

// ---- DEFAULT STORY ----
export const Default: Story = {
  args: {
    camera: mockCamera,
    onSave: () => console.log("Saved!"),
    onBack: () => console.log("Back"),
  },
};
