import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import ViewAlertPopup from "./ViewAlertPopup";
import { Box, Button } from "@mui/material";

type ViewAlertPopupType = typeof ViewAlertPopup;

const meta: Meta<ViewAlertPopupType> = {
  title: "Molecules/ViewAlertPopup",
  component: ViewAlertPopup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<ViewAlertPopupType>;

// ✅ Wrapper component to handle hooks
const ViewAlertPopupExample: React.FC = () => {
  const [open, setOpen] = useState(false);

  const mockDetails = {
    Voilation: "Hard hat missing, Safety vest not worn",
    zone: "Production Floor A",
    time: "2025-09-23 15:42",
    imageUrl: "https://picsum.photos/800/600?random=1",
    cameraId: "CAM-01",
    alarmTriggered: true,
    mobCount: 25,
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open ViewAlertPopup
      </Button>

      <ViewAlertPopup
        open={open}
        handleClose={() => setOpen(false)}
        details={mockDetails}
        imageKey="imageUrl"
        onDownload={(url) => alert("Download clicked: " + url)}
      />
    </Box>
  );
};

export const Default: Story = {
  render: () => <ViewAlertPopupExample />,
};
