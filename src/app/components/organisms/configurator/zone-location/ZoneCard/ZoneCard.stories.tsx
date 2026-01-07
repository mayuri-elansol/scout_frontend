import type { Meta, StoryObj } from "@storybook/nextjs";
import { ZoneCard } from "./ZoneCard";
import { mockZones } from "@/app/data/mockZones";

const meta: Meta<typeof ZoneCard> = {
  title: "Organisms/Configurator/ZoneLocation/ZoneCard",
  component: ZoneCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],

  // 👍 Provide default safe handlers for all stories
  args: {
    onAssignLocations: (zone) => console.log("onAssignLocations", zone),
    onEdit: (zone) => console.log("onEdit", zone),
    onDelete: (zone) => console.log("onDelete", zone),
  },
};

export default meta;
type Story = StoryObj<typeof ZoneCard>;

export const Default: Story = {
  args: {
    zone: mockZones[0],
    locationCount: mockZones[0].locationIds.length,
    cameraCount: mockZones[0].cameraIds.length,
  },
};

export const WithoutLocations: Story = {
  args: {
    zone: {
      ...mockZones[0],
      locationIds: [],
    },
    locationCount: 0,
    cameraCount: mockZones[0].cameraIds.length,
  },
};

export const WithoutCameras: Story = {
  args: {
    zone: {
      ...mockZones[0],
      cameraIds: [],
    },
    locationCount: mockZones[0].locationIds.length,
    cameraCount: 0,
  },
};

export const Unconfigured: Story = {
  args: {
    zone: {
      ...mockZones[0],
      locationIds: [],
      cameraIds: [],
    },
    locationCount: 0,
    cameraCount: 0,
  },
};
