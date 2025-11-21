"use client";

import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  TextField,
  InputAdornment,
  Alert,
  Chip,
} from "@mui/material";
import {
  Close as CloseIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Circle as CircleIcon,
  Videocam as VideocamIcon,
  FiberManualRecord as StatusIcon,
} from "@mui/icons-material";
import { Zone } from "@/app/data/mockZones";
import { Camera } from "@/app/data/mockCameras";

interface AssignCamerasDrawerProps {
  open: boolean;
  onClose: () => void;
  zone: Zone | null;
  cameras: Camera[];
  onSave: (zoneId: number, cameraIds: number[]) => void;
}

export const AssignCamerasDrawer: React.FC<AssignCamerasDrawerProps> = ({
  open,
  onClose,
  zone,
  cameras,
  onSave,
}) => {
  const [selectedCameraIds, setSelectedCameraIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (open && zone) {
      setSelectedCameraIds(zone.cameraIds || []);
      setSearchQuery("");
    }
  }, [open, zone]);

  const handleToggleCamera = (cameraId: number) => {
    setSelectedCameraIds((prev) =>
      prev.includes(cameraId)
        ? prev.filter((id) => id !== cameraId)
        : [...prev, cameraId]
    );
  };

  const handleSelectAll = () => {
    const filteredIds = filteredCameras.map((cam) => cam.id);
    setSelectedCameraIds(filteredIds);
  };

  const handleDeselectAll = () => {
    setSelectedCameraIds([]);
  };

  const handleSave = () => {
    if (zone) {
      onSave(zone.id, selectedCameraIds);
      onClose();
    }
  };

  const filteredCameras = cameras.filter(
    (camera) =>
      camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camera.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camera.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Status indicator component
  const StatusIndicator = ({ status }: { status: Camera["status"] }) => {
    const getStatusColor = () => {
      switch (status) {
        case "connected":
          return "success.main";
        case "offline":
          return "error.main";
        case "pending":
          return "warning.main";
        case "failed":
          return "error.dark";
        default:
          return "grey.500";
      }
    };

    const getStatusLabel = () => {
      return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return (
      <Chip
        icon={<StatusIcon sx={{ fontSize: 12 }} />}
        label={getStatusLabel()}
        size="small"
        sx={{
          backgroundColor: getStatusColor(),
          color: "white",
          fontWeight: 500,
          fontSize: "0.7rem",
          height: 20,
          "& .MuiChip-icon": {
            color: "white",
          },
        }}
      />
    );
  };

  const hasChanges =
    JSON.stringify([...(zone?.cameraIds || [])].sort()) !==
    JSON.stringify([...selectedCameraIds].sort());

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
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 480, md: 560 },
          display: "flex",
          flexDirection: "column",
          zIndex: 1400,
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
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flex: 1, pr: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Assign Cameras
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {zone?.name}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: "auto", p: 3 }}>
        {cameras.length === 0 ? (
          <Alert severity="info">
            <Typography variant="body2" gutterBottom>
              <strong>No cameras available</strong>
            </Typography>
            <Typography variant="body2">
              Please add cameras in Camera Management first before assigning them to zones.
            </Typography>
          </Alert>
        ) : (
          <>
            {/* Search Bar */}
            <TextField
              fullWidth
              size="small"
              placeholder="Search cameras by name, position, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            {/* Selection Summary */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                pb: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {selectedCameraIds.length} of {cameras.length} selected
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  onClick={handleSelectAll}
                  disabled={selectedCameraIds.length === filteredCameras.length}
                  sx={{ textTransform: "none" }}
                >
                  Select All
                </Button>
                <Button
                  size="small"
                  onClick={handleDeselectAll}
                  disabled={selectedCameraIds.length === 0}
                  sx={{ textTransform: "none" }}
                >
                  Deselect All
                </Button>
              </Box>
            </Box>

            {/* Camera List */}
            {filteredCameras.length === 0 ? (
              <Alert severity="warning">No cameras match your search.</Alert>
            ) : (
              <List sx={{ p: 0 }}>
                {filteredCameras.map((camera) => {
                  const isSelected = selectedCameraIds.includes(camera.id);
                  return (
                    <ListItem
                      key={camera.id}
                      disablePadding
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        border: "2px solid",
                        borderColor: isSelected ? "primary.main" : "divider",
                        backgroundColor: "white",
                        transition: "all 0.2s",
                        "&:hover": {
                          backgroundColor: "grey.50",
                          borderColor: isSelected ? "primary.main" : "grey.400",
                        },
                      }}
                    >
                      <ListItemButton
                        onClick={() => handleToggleCamera(camera.id)}
                        sx={{ py: 1.5 }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Checkbox
                            edge="start"
                            checked={isSelected}
                            tabIndex={-1}
                            disableRipple
                            icon={<CircleIcon sx={{ color: "grey.400" }} />}
                            checkedIcon={<CheckCircleIcon sx={{ color: "primary.main" }} />}
                          />
                        </ListItemIcon>
                        <VideocamIcon
                          sx={{
                            mr: 2,
                            color: "text.secondary",
                          }}
                        />
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{
                                fontWeight: 500,
                                color: "text.primary",
                              }}
                            >
                              {camera.name}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ mt: 0.5 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: "0.875rem" }}
                              >
                                📍 {camera.location || camera.position}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  mt: 0.5,
                                }}
                              >
                                <StatusIndicator status={camera.status} />
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{ fontSize: "0.75rem" }}
                                >
                                  {camera.make} • {camera.ipAddress}
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </>
        )}
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
          disabled={!hasChanges || cameras.length === 0}
          sx={{ textTransform: "none" }}
        >
          Save Changes
        </Button>
      </Box>
    </Drawer>
  );
};
