// import type { Meta, StoryObj } from "@storybook/react";
// import PPEComplianceByZone from "./ZoneNotification";

// const meta: Meta<typeof PPEComplianceByZone> = {
//   title: "Molecules/PPEComplianceByZone",
//   component: PPEComplianceByZone,
//   tags: ["autodocs"],
//   parameters: {
//     layout: "centered",
//   },
// };

// export default meta; // 👈 must exist and be before stories
// type Story = StoryObj<typeof PPEComplianceByZone>;

// const sampleZones = [
//   {
//     zone: "Production Floor",
//     compliance: 92,
//     violations: 3,
//     cameras: "8/10",
//     status: "good",
//   },
//   {
//     zone: "Assembly Line",
//     compliance: 88,
//     violations: 5,
//     cameras: "6/6",
//     status: "warning",
//   },
//   {
//     zone: "Welding Area",
//     compliance: 95,
//     violations: 1,
//     cameras: "4/4",
//     status: "excellent",
//   },
// ];

// export const Default: Story = {
//   args: {
//     zones: sampleZones,
//   },
// };

// export const HighCompliance: Story = {
//   args: {
//     zones: [
//       {
//         zone: "Packaging Zone",
//         compliance: 99,
//         violations: 0,
//         cameras: "5/5",
//         status: "excellent",
//       },
//     ],
//   },
// };

// export const LowCompliance: Story = {
//   args: {
//     zones: [
//       {
//         zone: "Chemical Storage",
//         compliance: 65,
//         violations: 10,
//         cameras: "2/4",
//         status: "warning",
//       },
//     ],
//   },
// };

//============================with skeleton
// import type { Meta, StoryObj } from "@storybook/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import ZoneNotification from "./ZoneNotification";

const meta: Meta<typeof ZoneNotification> = {
  title: "Molecules/ZoneNotification",
  component: ZoneNotification,
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
      description: "Show skeleton loader instead of data",
    },
  },
};
export default meta;

type Story = StoryObj<typeof ZoneNotification>;

const sampleZones = [
  {
    zone: "Assembly Line 1",
    compliance: 92,
    violations: 2,
    cameras: "12",
    status: "excellent",
  },
  {
    zone: "Packaging Zone",
    compliance: 75,
    violations: 5,
    cameras: "8",
    status: "good",
  },
  {
    zone: "Loading Dock",
    compliance: 48,
    violations: 9,
    cameras: "5",
    status: "warning",
  },
];

export const Default: Story = {
  args: {
    zones: sampleZones,
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    zones: [], // 👈 can pass empty since skeleton is shown
    loading: true,
  },
};
