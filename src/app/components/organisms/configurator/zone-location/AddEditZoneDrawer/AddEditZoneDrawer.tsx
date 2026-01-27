"use client";

import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";


type ZoneUI = {
  id: string;
  name: string;
  description?: string;
};


interface AddEditZoneDrawerProps {
  open: boolean;
  onClose: () => void;
  zone: ZoneUI | null;
  onSave: (zone: { name: string; description?: string; id?: string }) => void;
}


export const AddEditZoneDrawer: React.FC<AddEditZoneDrawerProps> = ({
  open,
  onClose,
  zone,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    name: "",
  });

  useEffect(() => {
    if (open) {
      if (zone) {
        // Edit mode
        setFormData({
          name: zone.name,
          description: zone.description ?? "",
        });
      } else {
        // Add mode
        setFormData({
          name: "",
          description: "",
        });
      }
      setErrors({ name: "" });
    }
  }, [open, zone]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {
      name: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Zone name is required";
    }

    setErrors(newErrors);
    return !newErrors.name;
  };

  const handleSave = () => {
    if (!validate()) return;

    if (zone) {
      // Edit existing zone
      onSave({
        ...zone,
        name: formData.name.trim(),
        description: formData.description.trim(),
      });
    } else {
      // Create new zone
      onSave({
        name: formData.name.trim(),
        description: formData.description.trim(),
      });

    }

    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        zIndex: 1400,
      }}
      ModalProps={{
        keepMounted: false,
        sx: {
          zIndex: 1400,
        },
      }}
    slotProps={{
      paper: {
        sx: {
          width: { xs: "100%", sm: 480, md: 560 },
          display: "flex",
          flexDirection: "column",
          zIndex: 1400,
        },
      },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {zone ? "Edit Zone" : "Add New Zone"}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: "auto", p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Zone Name */}
          <TextField
            label="Zone Name"
            fullWidth
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={!!errors.name}
            sx={{mb:2}}
           
            placeholder="e.g., Main Entrance, Production Floor"
          />

          {/* Description */}
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={2}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            // placeholder="Enter zone description (optional)"
            sx={{ mb: 2 }}
          />
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 3,
          borderTop: "1px solid",
          borderColor: "divider",
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={onClose}
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSave}
          sx={{ textTransform: "none" }}
        >
          {zone ? "Save Changes" : "Create Zone"}
        </Button>
      </Box>
    </Drawer>
  );
};
