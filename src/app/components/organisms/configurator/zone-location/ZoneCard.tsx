"use client";

import React from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  Videocam as CameraIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { Zone } from "@/app/data/mockZones";

interface ZoneCardProps {
  zone: Zone;
  locationCount: number;
  cameraCount: number;
  onAssignLocations: (zone: Zone) => void;
  onAssignCameras: (zone: Zone) => void;
  onEdit: (zone: Zone) => void;
  onDelete: (zone: Zone) => void;
}

export const ZoneCard: React.FC<ZoneCardProps> = ({
  zone,
  locationCount,
  cameraCount,
  onAssignLocations,
  onAssignCameras,
  onEdit,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    onEdit(zone);
  };

  const handleDelete = () => {
    handleMenuClose();
    onDelete(zone);
  };

  const hasLocations = locationCount > 0;
  const hasCameras = cameraCount > 0;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        mb: 2,
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: 2,
          borderColor: "primary.light",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        {/* Zone Details */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
              {zone.name}
            </Typography>
            <Chip
              label={zone.type}
              size="small"
              color="primary"
              sx={{
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            />
          </Box>

          {zone.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                fontSize: "0.875rem",
                lineHeight: 1.6,
              }}
            >
              {zone.description}
            </Typography>
          )}

          {/* Stats Row */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            {/* Locations */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 1,
                backgroundColor: "white",
                border: "1px solid",
                borderColor: hasLocations ? "primary.main" : "divider",
                minWidth: 140,
                height: 42,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: hasLocations ? "primary.dark" : "text.secondary",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.25rem",
                  }}
                >
                  {locationCount}
                </Box>
                <Box component="span" sx={{ fontSize: "0.875rem" }}>
                  {locationCount === 1 ? "Location" : "Locations"}
                </Box>
              </Typography>
              <Box sx={{ ml: "auto" }}>
                {hasLocations ? (
                  <CheckCircleIcon sx={{ fontSize: 20, color: "primary.main" }} />
                ) : (
                  <WarningIcon sx={{ fontSize: 20, color: "warning.main" }} />
                )}
              </Box>
            </Box>

            {/* Cameras */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: 1,
                backgroundColor: "white",
                border: "1px solid",
                borderColor: hasCameras ? "success.main" : "divider",
                minWidth: 140,
                height: 42,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: hasCameras ? "success.dark" : "text.secondary",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: 700,
                    fontSize: "1.25rem",
                  }}
                >
                  {cameraCount}
                </Box>
                <Box component="span" sx={{ fontSize: "0.875rem" }}>
                  {cameraCount === 1 ? "Camera" : "Cameras"}
                </Box>
              </Typography>
              <Box sx={{ ml: "auto" }}>
                {hasCameras ? (
                  <CheckCircleIcon sx={{ fontSize: 20, color: "success.main" }} />
                ) : (
                  <WarningIcon sx={{ fontSize: 20, color: "warning.main" }} />
                )}
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<LocationIcon />}
              onClick={() => onAssignLocations(zone)}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              {hasLocations ? "Manage Locations" : "Assign Locations"}
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<CameraIcon />}
              onClick={() => onAssignCameras(zone)}
              sx={{ textTransform: "none", fontWeight: 600 }}
            >
              {hasCameras ? "Manage Cameras" : "Assign Cameras"}
            </Button>
          </Box>
        </Box>

        {/* Menu */}
        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon sx={{ mr: 1, fontSize: 20 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
            <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
            Delete
          </MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};
