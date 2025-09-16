import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import ViewAlertPopup from "./ViewAlertPopup";

interface ViewAlertPopupProps {
  open: boolean;
  location: string;
  time: string;
  assignedTo: string;
  duration: string;
  imageUrl: string;
  handleClose: () => void;
}

const meta: Meta<typeof ViewAlertPopup> = {
  title: "Components/ViewAlertPopup",
  component: ViewAlertPopup,
};

export default meta;
type Story = StoryObj<typeof ViewAlertPopup>;

// ---------- Wrapper Component to use hooks ----------
const Template = (args: Partial<ViewAlertPopupProps>) => {
  const [open, setOpen] = useState(args.open ?? false);

  const handleClose = () => setOpen(false);

  return (
    <ViewAlertPopup
      open={open}
      handleClose={handleClose}
      location={args.location ?? ""}
      time={args.time ?? ""}
      assignedTo={args.assignedTo ?? ""}
      duration={args.duration ?? ""}
      imageUrl={args.imageUrl ?? ""}
    />
  );
};

// ---------- Stories ----------
export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    open: true,
    location: "Nagpur, India",
    time: "08:30 AM, 08-Sep-2025",
    assignedTo: "Prachi Jamgaonkar",
    duration: "2h 15m",
    imageUrl: "https://via.placeholder.com/300",
  },
};

export const NoImage: Story = {
  render: (args) => <Template {...args} />,
  args: {
    open: true,
    location: "Mumbai, India",
    time: "12:00 PM, 08-Sep-2025",
    assignedTo: "John Doe",
    duration: "1h 45m",
    imageUrl: "",
  },
};

export const ImageError: Story = {
  render: (args) => <Template {...args} />,
  args: {
    open: true,
    location: "Delhi, India",
    time: "10:00 AM, 08-Sep-2025",
    assignedTo: "Alice Smith",
    duration: "3h",
    imageUrl: "https://invalid-url.com/image.png",
  },
};
