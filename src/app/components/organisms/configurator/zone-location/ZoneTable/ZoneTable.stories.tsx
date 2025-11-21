import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ZoneTable from "./ZoneTable";
import { mockZones } from "@/app/data/mockZones";

const meta: Meta<typeof ZoneTable> = {
  title: "Organisms/Configurator/ZoneLocation/ZoneTable",
  component: ZoneTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ZoneTable>;

export const Default: Story = {
  args: {
    zones: mockZones,
    onAssignLocations: action("onAssignLocations"),
    // onAssignCameras: action("onAssignCameras"),
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
  },
};

export const Empty: Story = {
  args: {
    zones: [],
    onAssignLocations: action("onAssignLocations"),
    // onAssignCameras: action("onAssignCameras"),
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
  },
};

export const SingleZone: Story = {
  args: {
    zones: [mockZones[0]],
    onAssignLocations: action("onAssignLocations"),
    // onAssignCameras: action("onAssignCameras"),
    onEdit: action("onEdit"),
    onDelete: action("onDelete"),
  },
};
