
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { LocationOn, AccessTime, Person } from "@mui/icons-material";

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
  // Track image load error
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(true);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Details</DialogTitle>
      <DialogContent dividers>
        {/* Info section - Horizontally aligned */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocationOn sx={{ fontSize: 16 }} />
            <Typography variant="body2">{location}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <AccessTime sx={{ fontSize: 16 }} />
            <Typography variant="body2">{time}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Person sx={{ fontSize: 16 }} />
            <Typography variant="body2">{assignedTo}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Duration: {duration}
            </Typography>
          </Box>
        </Box>

        {/* Image section - Below the details */}
        <Box sx={{ textAlign: "center" }}>
          {!imageUrl || imageError ? (
            // Default "No Image Found" box
            <Box
              sx={{
                width: "100%",
                height: 200,
                backgroundColor: "#f5f5f5",
                border: "2px dashed #ccc",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography variant="h6" sx={{ color: "#888", fontWeight: 500 }}>
                📷
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#888",
                  textAlign: "center",
                }}
              >
                No Image Found
              </Typography>
            </Box>
          ) : (
            <img
              src={imageUrl}
              alt="Alert Details"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewAlertPopup;
