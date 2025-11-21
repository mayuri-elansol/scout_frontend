import type { Meta, StoryObj } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
import { actions } from "@storybook/addon-actions";

import { AddEditZoneDrawer } from "./AddEditZoneDrawer/AddEditZoneDrawer";
import { mockZones } from "@/app/data/mockZones";

const meta: Meta<typeof AddEditZoneDrawer> = {
  title: "Organisms/Configurator/ZoneLocation/AddEditZoneDrawer",
  component: AddEditZoneDrawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AddEditZoneDrawer>;

export const AddMode: Story = {
  args: {
    open: true,
    zone: null,
    onClose: actions("onClose"),
    onSave: actions("onSave"),
  },
};

export const EditMode: Story = {
  args: {
    open: true,
    zone: mockZones[0],
    onClose: actions("onClose"),
    onSave: actions("onSave"),
  },
};

export const Closed: Story = {
  args: {
    open: false,
    zone: null,
    onClose: actions("onClose"),
    onSave: actions("onSave"),
  },
};
