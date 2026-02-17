import type { Meta, StoryObj } from "@storybook/react-vite"; 
import SettingTable, { User } from "./UserSettingTable";

// Sample user data
const sampleUsers: User[] = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "1234567890",
    roleName: "Organisation Admin",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phone: "9876543210",
    roleName: "Team Lead",
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
