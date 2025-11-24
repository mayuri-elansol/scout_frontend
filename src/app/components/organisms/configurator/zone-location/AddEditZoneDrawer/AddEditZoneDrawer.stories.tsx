import type { Meta, StoryObj } from "@storybook/react";
import { AddEditZoneDrawer } from "./AddEditZoneDrawer";
import { mockZones } from "@/app/data/mockZones";

const meta: Meta<typeof AddEditZoneDrawer> = {
  title: "Organisms/Configurator/ZoneLocation/AddEditZoneDrawer",
  component: AddEditZoneDrawer,
  parameters: {
    layout: "fullscreen",
  },

  // default handlers for all stories
  args: {
    onClose: () => console.log("onClose"),
    onSave: (data) => console.log("onSave", data),
  },

  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AddEditZoneDrawer>;

export const AddMode: Story = {
  args: {
    open: true,
    zone: null,
  },
};

export const EditMode: Story = {
  args: {
    open: true,
    zone: mockZones[0],
  },
};

export const Closed: Story = {
  args: {
    open: false,
    zone: null,
  },
};
