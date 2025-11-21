import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AssignLocationsDrawer } from "./AssignLocationsDrawer";
import { mockZones } from "@/app/data/mockZones";

const meta: Meta<typeof AssignLocationsDrawer> = {
  title: "Organisms/Configurator/ZoneLocation/AssignLocationsDrawer",
  component: AssignLocationsDrawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AssignLocationsDrawer>;

export const Open: Story = {
  args: {
    open: true,
    zone: mockZones[0],
    onClose: action("onClose"),
    onSave: action("onSave"),
  },
};

export const AnotherZone: Story = {
  args: {
    open: true,
    zone: {
      ...mockZones[0],
      name: "Warehouse Zone",
    },
    onClose: action("onClose"),
    onSave: action("onSave"),
  },
};

export const Closed: Story = {
  args: {
    open: false,
    zone: mockZones[0],
    onClose: action("onClose"),
    onSave: action("onSave"),
  },
};
