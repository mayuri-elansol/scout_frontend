import type { Meta, StoryObj } from "@storybook/nextjs";
import RoiSelectionModal from "./RoiSelectionModal";
import type { ROIShape, DrawingTool } from "./RoiSelectionModal";

// ---------------------------------------------
// SHARED MOCK DATA (TYPED)
// ---------------------------------------------
const mockExistingROI: ROIShape[] = [
  {
    type: "rectangle" as DrawingTool,
    points: [
      { x: 100, y: 100 },
      { x: 300, y: 250 },
    ],
    completed: true,
    color: "#00ff00",
    name: "Person",
    mode: "include",
  },
  {
    type: "polygon" as DrawingTool,
    points: [
      { x: 400, y: 150 },
      { x: 500, y: 150 },
      { x: 550, y: 300 },
      { x: 350, y: 300 },
    ],
    completed: true,
    color: "#ff0000",
    name: "Object",
    mode: "include",
  },
];

const meta: Meta<typeof RoiSelectionModal> = {
  title: "Organisms/Configurator/CameraManagement/RoiSelectionModal",
  component: RoiSelectionModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    open: true,
    cameraFeedUrl: "/img/siteimage.jpg",
    onClose: () => console.log("Modal Closed"),
    onSave: (roi) => console.log("ROI Saved", roi),
    useCaseName: "Personal Protective Equipment (PPE) Detection",
    existingROI: undefined,
  },
};

export default meta;

type Story = StoryObj<typeof RoiSelectionModal>;

// ---------------------------------------------
// STORIES
// ---------------------------------------------

export const Default: Story = {};

export const WithExistingROI: Story = {
  args: {
    useCaseName: "Object Detection in Walking Bays",
    existingROI: mockExistingROI,
  },
};

export const FireDetection: Story = {
  args: {
    useCaseName: "Fire, Smoke, Oil and Gas Leak Detection",
  },
};

export const IntrusionDetection: Story = {
  args: {
    useCaseName: "Intrusion Detection at Premises Perimeter",
    existingROI: [
      {
        type: "freehand" as DrawingTool,
        points: [
          { x: 50, y: 400 },
          { x: 100, y: 380 },
          { x: 150, y: 390 },
          { x: 200, y: 420 },
          { x: 250, y: 400 },
        ],
        completed: true,
        color: "#ff00ff",
        name: "Perimeter",
        mode: "include",
      },
    ],
  },
};

export const WithExcludeZone: Story = {
  args: {
    useCaseName: "Fall Detection (Person falling on the floor)",
    existingROI: [
      {
        type: "rectangle" as DrawingTool,
        points: [
          { x: 100, y: 100 },
          { x: 400, y: 300 },
        ],
        completed: true,
        color: "#00ff00",
        name: "Standing Person",
        mode: "include",
      },
      {
        type: "rectangle" as DrawingTool,
        points: [
          { x: 450, y: 100 },
          { x: 600, y: 200 },
        ],
        completed: true,
        color: "#ff0000",
        name: "Fallen Person",
        mode: "exclude",
      },
    ],
  },
};
