import type { Meta, StoryObj } from "@storybook/react";
import { UseCaseListItem } from "./UseCaseListItem";
import { UseCase } from "@/app/types/useCaseManager";

/* ----------------------------------------------
   SHARED MOCK USE CASES
------------------------------------------------ */
const mockUseCases: UseCase[] = [
  {
    id: "uc-1",
    name: "Personal Protective Equipment (PPE) Detection",
    description:
      "Detect if workers are wearing required PPE like helmets, vests, and safety gear.",
    category: "Safety & Compliance",
    enabled: true,
    assignedCameraIds: ["cam-1", "cam-2", "cam-3"],
  },
  {
    id: "uc-2",
    name: "Object Detection in Walking Bays",
    description:
      "Monitor walking areas for unauthorized objects and potential hazards.",
    category: "Safety & Compliance",
    enabled: true,
    assignedCameraIds: [],
  },
  {
    id: "uc-3",
    name: "Intrusion Detection at Perimeter",
    description:
      "Detect unauthorized access attempts in real-time at perimeter boundaries.",
    category: "Surveillance",
    enabled: true,
    assignedCameraIds: ["cam-4"],
  },
];

/* ----------------------------------------------
   META — Default props for all stories
------------------------------------------------ */
const meta: Meta<typeof UseCaseListItem> = {
  title: "Organisms/Configurator/UseCaseManager/UseCaseListItem",
  component: UseCaseListItem,
  parameters: {
    layout: "padded",
  },

  // Default args applied to all stories:
  args: {
    onConfigureCameras: (useCase) =>
      console.log("Configure Clicked →", useCase),
  },

  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UseCaseListItem>;

/* ----------------------------------------------
   STORIES
------------------------------------------------ */

export const WithCameras: Story = {
  args: {
    useCase: mockUseCases[0],
    assignedCameraCount: mockUseCases[0].assignedCameraIds.length,
  },
};

export const WithoutCameras: Story = {
  args: {
    useCase: mockUseCases[1],
    assignedCameraCount: 0,
  },
};

export const WithOneCamera: Story = {
  args: {
    useCase: mockUseCases[2],
    assignedCameraCount: 1,
  },
};

export const WithManyCameras: Story = {
  args: {
    useCase: {
      ...mockUseCases[0],
      assignedCameraIds: Array.from({ length: 15 }, (_, i) => `cam-${i + 1}`),
    },
    assignedCameraCount: 15,
  },
};

export const LongDescription: Story = {
  args: {
    useCase: {
      id: "uc-long-desc",
      name:
        "Advanced Multi-Zone Fire, Smoke, Hazardous Chemical Detection System",
      description:
        "Comprehensive detection system for fire, smoke, hazardous gas, and chemical leaks across multiple zones. Real-time alerts with emergency response integration.",
      category: "Safety & Compliance",
      enabled: true,
      assignedCameraIds: ["cam-1", "cam-2"],
    },
    assignedCameraCount: 2,
  },
};
