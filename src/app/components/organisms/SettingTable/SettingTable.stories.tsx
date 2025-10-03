// SettingTable.stories.tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SettingTable from "./SettingTable";

// Sample user data
const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    role: "Organisation Admin",
    site: "Headquarters",
    department: "IT",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "9876543210",
    role: "Team Lead",
    site: "Mumbai Office",
    department: "HR",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

// Meta configuration
const meta: Meta<typeof SettingTable> = {
  title: "Components/Organisms/SettingTable",
  component: SettingTable,
};

export default meta;

type Story = StoryObj<typeof SettingTable>;

// Default story
export const Default: Story = {
  args: {
    users: sampleUsers,
    onEdit: (index: number) => alert(`Edit user at index ${index}`),
    onDelete: (index: number) => alert(`Delete user at index ${index}`),
  },
};
