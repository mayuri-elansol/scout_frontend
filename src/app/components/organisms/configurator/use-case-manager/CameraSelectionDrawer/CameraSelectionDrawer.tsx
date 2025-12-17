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
  Chip,
  IconButton,
  Alert,
  CircularProgress,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Close as CloseIcon,
  Videocam as VideocamIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Circle as CircleIcon,
  FiberManualRecord as StatusIcon,
} from "@mui/icons-material";
import { UseCase, Camera } from "@/app/types/useCaseManager";

// interface CameraSelectionDrawerProps {
//   open: boolean;
//   onClose: () => void;
//   useCase: UseCase | null;
//   cameras: Camera[];
//   onSave: (useCaseId: string, selectedCameraIds: string[]) => Promise<void>;
//   isLoading?: boolean;
// }

export interface CameraSelectionDrawerProps {
  open: boolean;
  onClose: () => void;
  useCase: UseCase | null;
  cameras: Camera[];
  selectedCameraIds: string[];
  setSelectedCameraIds: React.Dispatch<React.SetStateAction<string[]>>;
  onSave: (useCaseId: string, selectedCameraIds: string[]) => void;
  isLoading: boolean;
}

export const CameraSelectionDrawer: React.FC<CameraSelectionDrawerProps> = ({
  open,
  onClose,
  useCase,
  cameras,
  onSave,
  isLoading = false,
}) => {
  const [selectedCameraIds, setSelectedCameraIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState(false);

  // Initialize selected cameras when drawer opens
  useEffect(() => {
    if (open && useCase) {
      setSelectedCameraIds(useCase.assignedCameraIds || []);
      setSearchQuery("");
    }
  }, [open, useCase]);

  const handleToggleCamera = (cameraId: string) => {
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

  const handleSave = async () => {
    if (!useCase) return;

    setSaving(true);
    try {
      await onSave(useCase.id, selectedCameraIds);
      onClose();
    } catch (error) {
      console.error("Error saving camera assignments:", error);
    } finally {
      setSaving(false);
    }
  };

  // Filter cameras based on search query
  const filteredCameras = cameras.filter(
    (camera) =>
      camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camera.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camera.position.toLowerCase().includes(searchQuery.toLowerCase())
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
    JSON.stringify([...(useCase?.assignedCameraIds || [])].sort((a, b) => a.localeCompare(b))) !==
    JSON.stringify([...selectedCameraIds].sort((a, b) => a.localeCompare(b)));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        zIndex: 1400, // Higher than AppBar (1100) and other navigation elements
      }}
      ModalProps={{
        keepMounted: false,
        sx: {
          zIndex: 1400, // Ensure modal backdrop is also above other elements
        },
      }}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 480, md: 560 },
          display: "flex",
          flexDirection: "column",
          zIndex: 1400, // Ensure the drawer paper is also above
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
            {useCase?.name}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, overflow: "auto", p: 3 }}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 200,
            }}
          >
            <CircularProgress />
          </Box>
        ) : cameras.length === 0 ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              <strong>No cameras available</strong>
            </Typography>
            <Typography variant="body2">
              Please add cameras in Camera Management first before assigning them to use
              cases.
            </Typography>
          </Alert>
        ) : (
          <>
            {/* Search Bar */}
            <TextField
              fullWidth
              size="small"
              placeholder="Search cameras by name, location, or position..."
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
                    <React.Fragment key={camera.id}>
                      <ListItem
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
                            secondaryTypographyProps={{ component: "div" }} 
                          />
                        </ListItemButton>
                      </ListItem>
                    </React.Fragment>
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
          disabled={saving}
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSave}
          disabled={!hasChanges || saving || cameras.length === 0}
          sx={{ textTransform: "none" }}
        >
          {saving ? <CircularProgress size={24} /> : "Save Changes"}
        </Button>
      </Box>
    </Drawer>
  );
};
