"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
interface ViewAlertPopupProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  location: string;
  time: string;
  cameraId: string;
  imageUrl: string;
  alarmTriggered: boolean;

  onDownload?: (imageUrl: string) => void;
}

const ViewAlertPopup: React.FC<ViewAlertPopupProps> = ({
  open,
  handleClose,
  title,
  location,
  time,
  cameraId,
  imageUrl,
  alarmTriggered,
  onDownload,
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  const handleImageError = () => setImageError(true);

  const showPlaceholder = !imageUrl || imageUrl.trim() === "" || imageError;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: { width: { xs: "95%", sm: "70%" }, maxWidth: 1200 },
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          py: 1,
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#3072b0",
          color: "white",
          fontWeight: 600,
        }}
      >
        <Typography
          variant="subtitle1"
          component="span"
          sx={{ fontWeight: 600 }}
        >
          Voilation Details
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        {/* Violation Info */}
        <Box
          sx={{
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <strong>Title:</strong>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <strong>Location:</strong> {location}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <strong>Camera Id:</strong> {cameraId}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <strong>Time:</strong> {time}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            <strong>Alarm Triggered:</strong> {alarmTriggered ? "Yes" : "No"}
          </Typography>
          <IconButton
            onClick={() => {
              if (onDownload) {
                onDownload(imageUrl);
              } else {
                console.log("Download clicked", imageUrl);
              }
            }}
            //  color="primary"
            sx={{
              color: "#3072b0", // this changes the icon color
            }}
          >
            <DownloadForOfflineIcon fontSize="large" />
          </IconButton>
        </Box>

        {/* Image Preview */}
        <Box
          sx={{
            textAlign: "center",
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            bgcolor: "#fafafa",
            height: 650,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {showPlaceholder ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "#f5f5f5",
                border: "2px dashed #ccc",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="h4" sx={{ color: "#bbb" }}>
                📷
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No Image Available
              </Typography>
            </Box>
          ) : (
            <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
              <Image
                src={imageUrl}
                alt="Alert"
                fill
                style={{ objectFit: "cover", borderRadius: 8 }}
                unoptimized
                onError={handleImageError}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAlertPopup;
