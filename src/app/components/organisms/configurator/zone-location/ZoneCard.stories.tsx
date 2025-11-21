import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ZoneCard } from "./ZoneCard";
import { mockZones } from "@/app/data/mockZones";

const meta: Meta<typeof ZoneCard> = {
  title: "Organisms/Configurator/ZoneLocation/ZoneCard",
  component: ZoneCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ZoneCard>;

export const Default: Story = {
  args: {
    zone: mockZones[0],
    locationCount: mockZones[0].locationIds.length,
    cameraCount: mockZones[0].cameraIds.length,
    onAssignLocations: action("onAssignLocations"),
    onAssignCameras: action("onAssignCameras"),
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
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
    onAssignLocations: action("onAssignLocations"),
    onAssignCameras: action("onAssignCameras"),
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
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
    onAssignLocations: action("onAssignLocations"),
    onAssignCameras: action("onAssignCameras"),
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
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
    onAssignLocations: action("onAssignLocations"),
    onAssignCameras: action("onAssignCameras"),
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
  },
};
