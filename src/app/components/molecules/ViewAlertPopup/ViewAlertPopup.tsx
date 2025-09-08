import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import {
  LocationOn,
  AccessTime,
  Person,
  Schedule,
  Close,
} from "@mui/icons-material";

interface ViewAlertPopupProps {
  open: boolean;
  handleClose: () => void;
  location: string;
  time: string;
  assignedTo: string;
  duration: string;
  imageUrl: string;
}

const ViewAlertPopup: React.FC<ViewAlertPopupProps> = ({
  open,
  handleClose,
  location,
  time,
  assignedTo,
  duration,
  imageUrl,
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false); // Reset error when image changes
  }, [imageUrl]);

  const handleImageError = () => setImageError(true);

  const showPlaceholder = !imageUrl || imageUrl.trim() === "" || imageError;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: { width: { xs: "95%", sm: "80%" } },
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          py: 1.5,
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "primary.main",
          color: "white",
          fontWeight: 600,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Alert Details
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        {/* Details Grid */}
        <Grid container spacing={1.5} sx={{ mb: 2, pt: 2 }}>
          {[
            {
              label: "Location",
              value: location,
              icon: <LocationOn sx={{ fontSize: 18, color: "#1976d2" }} />,
              bg: "#e3f2fd",
            },
            {
              label: "Time",
              value: time,
              icon: <AccessTime sx={{ fontSize: 18, color: "#f57c00" }} />,
              bg: "#fff3e0",
            },
            {
              label: "Assigned To",
              value: assignedTo,
              icon: <Person sx={{ fontSize: 18, color: "#4caf50" }} />,
              bg: "#e8f5e9",
            },
            {
              label: "Duration",
              value: duration,
              icon: <Schedule sx={{ fontSize: 18, color: "#e91e63" }} />,
              bg: "#fce4ec",
            },
          ].map((item, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Box
                sx={{
                  p: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  bgcolor: "#fafafa",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    p: 0.8,
                    borderRadius: "50%",
                    bgcolor: item.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="caption" color="textSecondary">
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 500, wordBreak: "break-word" }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 1.5 }} />

        <Box
          sx={{
            textAlign: "center",
            p: 1.5,
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            bgcolor: "#fafafa",
            height: 300,
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
              <Typography variant="body2" color="textSecondary">
                No Image Available
              </Typography>
            </Box>
          ) : (
            <img
              src={imageUrl}
              alt="Alert"
              onError={handleImageError}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: 8,
                objectFit: "cover",
              }}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAlertPopup;
