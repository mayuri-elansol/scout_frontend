import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "./Phonesidebar";
import { useState } from "react";

const meta: Meta<typeof Sidebar> = {
  title: "Components/PhoneSidebar",
  component: Sidebar,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Sidebar>;

const SidebarWrapper = (args: any) => {
  const [page, setPage] = useState("dashboard");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar currentPage={page} onPageChange={setPage} {...args} />
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

// export const AnalyticsExpanded: Story = {
//   render: (args) => <SidebarWrapper {...args} />,
//   args: {
//     currentPage: "analytics",
//   },
// };

export const SubTaskSelected: Story = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    currentPage: "ppe-detection",
  },
};
