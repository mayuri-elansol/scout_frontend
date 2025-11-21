import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AssignLocationsDrawer } from "./AssignLocationsDrawer";
import { mockZones } from "@/app/data/mockZones";
import { mockLocations } from "@/app/data/mockLocations";

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
    locations: mockLocations,
    onClose: action("onClose"),
    onSave: action("onSave"),
  },
};

export const WithPreselectedLocations: Story = {
  args: {
    open: true,
    zone: {
      ...mockZones[0],
      locationIds: [1, 2, 3],
    },
    locations: mockLocations,
    onClose: action("onClose"),
    onSave: action("onSave"),
  },
};

export const NoLocationsAvailable: Story = {
  args: {
    open: true,
    zone: mockZones[0],
    locations: [],
    onClose: action("onClose"),
    onSave: action("onSave"),
  },
};

export const Closed: Story = {
  args: {
    open: false,
    zone: mockZones[0],
    locations: mockLocations,
    onClose: action("onClose"),
    onSave: action("onSave"),
  },
};
