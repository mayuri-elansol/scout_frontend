import type { Meta, StoryObj } from "@storybook/react";
import RecentViolations from "./RecentViolations";

const meta: Meta<typeof RecentViolations> = {
  title: "Dashboard/RecentViolations",
  component: RecentViolations,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RecentViolations>;

// Mock data for testing
const mockViolations = [
  {
    Id: "V-001", // 👈 Added
    title: "No Helmet Detected",
    location: "Zone A",
    time: "10:45 AM",
    workerId: "W123",
    severity: "HIGH",
    status: "ACTIVE",
  },
  {
    Id: "V-002", // 👈 Added
    title: "No Safety Vest",
    location: "Zone B",
    time: "11:00 AM",
    workerId: "W124",
    severity: "MEDIUM",
    status: "RESOLVED",
  },
  {
    Id: "V-003", // 👈 Added
    title: "Gloves Missing",
    location: "Zone C",
    time: "11:30 AM",
    workerId: "W125",
    severity: "LOW",
    status: "ACTIVE",
    imageUrl: "https://via.placeholder.com/300x150",
  },
];

// ✅ Default story
export const Default: Story = {
  args: {
    violations: mockViolations,
    onViewAll: () => alert("View all clicked!"),
  },
};

// ✅ Empty state
export const Empty: Story = {
  args: {
    violations: [],
    onViewAll: () => alert("View all clicked!"),
  },
};

// ✅ With Images
export const WithImages: Story = {
  args: {
    violations: mockViolations.map((v, i) => ({
      ...v,
      Id: `IMG-${i}`, 
      imageUrl: "https://via.placeholder.com/400x200",
    })),
    onViewAll: () => alert("View all clicked!"),
  },
};
