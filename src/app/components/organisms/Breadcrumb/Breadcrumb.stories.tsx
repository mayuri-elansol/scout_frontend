import type { Meta, StoryObj } from "@storybook/react-vite";
import Breadcrumb from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Organisms/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: "dashboard",
    onPageChange: () => {},
  },
};
