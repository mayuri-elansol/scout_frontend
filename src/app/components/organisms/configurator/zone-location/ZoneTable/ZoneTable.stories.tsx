import type { Meta, StoryObj } from "@storybook/react";
import ZoneTable from "./ZoneTable";
import { mockZones } from "@/app/data/mockZones";

const meta: Meta<typeof ZoneTable> = {
  title: "Organisms/Configurator/ZoneLocation/ZoneTable",
  component: ZoneTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],

  // Default handlers for all stories
  args: {
    onAssignLocations: (zone) => console.log("onAssignLocations", zone),
    onEdit: (zone) => console.log("onEdit", zone),
    onDelete: (zone) => console.log("onDelete", zone),
  },
};

export default meta;
type Story = StoryObj<typeof ZoneTable>;

export const Default: Story = {
  args: {
    zones: mockZones,
  },
};

export const Empty: Story = {
  args: {
    zones: [],
  },
};

export const SingleZone: Story = {
  args: {
    zones: [mockZones[0]],
  },
};
