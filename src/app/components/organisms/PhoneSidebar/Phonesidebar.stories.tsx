import type { Meta, StoryObj } from "@storybook/react-vite";
import Sidebar from "./Phonesidebar";
import { useState } from "react";
import { PageType } from "@/app/types";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Organisms/PhoneSidebar",
  component: Sidebar,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

// Sidebar wrapper with correct types
const SidebarWrapper = (
  args: Partial<React.ComponentProps<typeof Sidebar>>
) => {
  const [page, setPage] = useState<PageType>("dashboard");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar {...args} currentPage={page} onPageChange={setPage} />
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Current Page: {page}</h2>
        <p>This is the main content section.</p>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {},
};

export const DashboardSelected: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    currentPage: "dashboard",
  },
};

export const SubTaskSelected: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    currentPage: "ppe-detection",
  },
};
