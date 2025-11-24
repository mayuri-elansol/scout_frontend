import type { Meta, StoryObj } from "@storybook/react";
import { AssignLocationsDrawer } from "./AssignLocationsDrawer";
import { mockZones } from "@/app/data/mockZones";

const meta: Meta<typeof AssignLocationsDrawer> = {
  title: "Organisms/Configurator/ZoneLocation/AssignLocationsDrawer",
  component: AssignLocationsDrawer,
  parameters: {
    layout: "fullscreen",
  },

  // Provide safe default handlers
  args: {
    onClose: () => console.log("onClose"),
    onSave: (zoneId, data) =>
      console.log("onSave", { zoneId, locations: data }),
  },

  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AssignLocationsDrawer>;

export const Open: Story = {
  args: {
    open: true,
    zone: mockZones[0],
  },
};

export const AnotherZone: Story = {
  args: {
    open: true,
    zone: {
      ...mockZones[0],
      name: "Warehouse Zone",
    },
  },
};

export const Closed: Story = {
  args: {
    open: false,
    zone: mockZones[0],
  },
};
