import type { Meta, StoryObj } from "@storybook/react-vite";
import UnauthorizedAccess from "./UnauthorizedAccess";

const meta: Meta<typeof UnauthorizedAccess> = {
  title: "Pages/UnauthorizedAccess",
  component: UnauthorizedAccess,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof UnauthorizedAccess>;

export const Default: Story = {};
