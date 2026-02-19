import type { Meta, StoryObj } from "@storybook/nextjs";
import OrganizationCameraManagement from "./OrganizationCameraManagement";

const meta: Meta<typeof OrganizationCameraManagement> = {
  title: "Organisms/Configurator/CameraManagement/OrganizationCameraManagement",
  component: OrganizationCameraManagement,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof OrganizationCameraManagement>;

export const Empty: Story = {
  args: {
    initialCameras: [],
    forceAddCamera: true,
    forceConfigureCamera: undefined,
  },
};

export const WithCameras: Story = {
  args: {
    initialCameras: [
      {
        id: "cam1",
        ipAddress: "192.168.1.10",
        username: "admin",
        // NOSONAR -- mock password for Storybook
        password: "admin123",
        port: "554",
        make: "Hikvision",
        rtspStream: "rtsp://example",
        status: "connected",
        cameraname: "hikvision1",
        location: ""
      },
    ],
  },
};

export const ForceAddCameraMode: Story = {
  args: {
    initialCameras: [],
    forceAddCamera: true,
  },
};

export const ForceAIConfigScreen: Story = {
  args: {
    initialCameras: [
      {
        id: "cam2",
        ipAddress: "192.168.1.20",
        username: "user",
        // NOSONAR -- mock password for Storybook
        password: "pass123",
        port: "554",
        make: "Dahua",
        rtspStream: "",
        status: "pending",
        cameraname: "hikvision2",
        location: ""
      },
    ],
    forceConfigureCamera: "cam2",
  },
};
