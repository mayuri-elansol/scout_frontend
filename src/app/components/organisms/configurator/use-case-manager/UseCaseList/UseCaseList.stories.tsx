import type { Meta, StoryObj } from "@storybook/react";
import { UseCaseList } from "./UseCaseList";
import { UseCase } from "@/app/types/useCaseManager";

/* -------------------------------------------------
   SHARED MOCK USE CASES
--------------------------------------------------- */
const mockUseCases: UseCase[] = [
  {
    id: "uc-1",
    name: "Personal Protective Equipment (PPE) Detection",
    description:
      "Detect if workers are wearing required PPE like helmets, vests, and safety gear in designated areas",
    category: "Safety & Compliance",
    enabled: true,
    assignedCameraIds: ["cam-1", "cam-2", "cam-3"],
  },
  {
    id: "uc-2",
    name: "Object Detection in Walking Bays",
    description:
      "Monitor walking areas for unauthorized objects and potential hazards",
    category: "Safety & Compliance",
    enabled: true,
    assignedCameraIds: ["cam-4", "cam-5"],
  },
  {
    id: "uc-3",
    name: "Fire, Smoke, Oil and Gas Leak Detection",
    description:
      "Early detection of fire, smoke, or hazardous material leaks",
    category: "Safety & Compliance",
    enabled: true,
    assignedCameraIds: [],
  },
  {
    id: "uc-4",
    name: "Vehicle Speed Monitoring inside premises",
    description: "Track and alert on fast-moving vehicles inside premises",
    category: "Safety & Compliance",
    enabled: true,
    assignedCameraIds: ["cam-6"],
  },
  {
    id: "uc-5",
    name: "Fall Detection",
    description: "Detect if a person falls on the floor",
    category: "Safety & Compliance",
    enabled: true,
    assignedCameraIds: [],
  },
  {
    id: "uc-6",
    name: "Intrusion Detection at Perimeter",
    description: "Detect unauthorized access attempts at facility boundary",
    category: "Surveillance",
    enabled: true,
    assignedCameraIds: ["cam-7", "cam-8"],
  },
  {
    id: "uc-7",
    name: "Unauthorized Access in Restricted Areas",
    description: "Detect unauthorized personnel entering restricted zones",
    category: "Surveillance",
    enabled: true,
    assignedCameraIds: [],
  },
  {
    id: "uc-8",
    name: "Camera Tampering / Offline Detection",
    description: "Identify tampering or offline cameras",
    category: "Surveillance",
    enabled: true,
    assignedCameraIds: ["cam-9"],
  },
  {
    id: "uc-9",
    name: "People Count",
    description: "Track number of people in factory areas",
    category: "Operational Insights",
    enabled: true,
    assignedCameraIds: ["cam-10", "cam-11"],
  },
  {
    id: "uc-10",
    name: "Idle Time Monitoring",
    description: "Identify inactive employees",
    category: "Workforce Monitoring",
    enabled: true,
    assignedCameraIds: [],
  },
];

/* -------------------------------------------------
   META — DEFAULT ARGS FOR EVERY STORY
--------------------------------------------------- */
const meta: Meta<typeof UseCaseList> = {
  title: "Organisms/Configurator/UseCaseManager/UseCaseList",
  component: UseCaseList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    useCases: mockUseCases,
    isLoading: false,
    onConfigureCameras: (useCase) =>
      console.log("Configure Cameras Clicked →", useCase),
  },
};

export default meta;
type Story = StoryObj<typeof UseCaseList>;

/* -------------------------------------------------
   STORIES
--------------------------------------------------- */

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithFewUseCases: Story = {
  args: {
    useCases: mockUseCases.slice(0, 3),
  },
};

export const AllConfigured: Story = {
  args: {
    useCases: mockUseCases.map((uc) => ({
      ...uc,
      assignedCameraIds: ["cam-1", "cam-2"],
    })),
  },
};

export const NoneConfigured: Story = {
  args: {
    useCases: mockUseCases.map((uc) => ({
      ...uc,
      assignedCameraIds: [],
    })),
  },
};

export const NoUseCases: Story = {
  args: {
    useCases: [],
  },
};

export const SafetyUseCases: Story = {
  args: {
    useCases: mockUseCases.filter(
      (uc) => uc.category === "Safety & Compliance"
    ),
  },
};

export const SurveillanceUseCases: Story = {
  args: {
    useCases: mockUseCases.filter((uc) => uc.category === "Surveillance"),
  },
};
