"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
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

interface ZoneTableProps {
  zones: Zone[];
  onAssignLocations: (zone: Zone) => void;
  onAssignCameras: (zone: Zone) => void;
  onEdit: (zone: Zone) => void;
  onDelete: (zone: Zone) => void;
}

export const ZoneTable: React.FC<ZoneTableProps> = ({
  zones,
  onAssignLocations,
  onAssignCameras,
  onEdit,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedZone, setSelectedZone] = React.useState<Zone | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, zone: Zone) => {
    setAnchorEl(event.currentTarget);
    setSelectedZone(zone);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedZone(null);
  };

  const handleEdit = () => {
    if (selectedZone) {
      handleMenuClose();
      onEdit(selectedZone);
    }
  };

  const handleDelete = () => {
    if (selectedZone) {
      handleMenuClose();
      onDelete(selectedZone);
    }
  };

  return (
    <>
      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.50" }}>
              <TableCell sx={{ fontWeight: 700 }}>Zone Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>Locations</TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>Cameras</TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {zones.map((zone) => {
              const hasLocations = zone.locationIds.length > 0;
              const hasCameras = zone.cameraIds.length > 0;

              return (
                <TableRow
                  key={zone.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "grey.50",
                    },
                  }}
                >
                  {/* Zone Name */}
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {zone.name}
                    </Typography>
                  </TableCell>

                  {/* Description */}
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: "0.875rem",
                        maxWidth: 400,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {zone.description || "-"}
                    </Typography>
                  </TableCell>

                  {/* Locations */}
                  <TableCell sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: "white",
                        border: "1px solid",
                        borderColor: hasLocations ? "primary.main" : "divider",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          color: hasLocations ? "primary.dark" : "text.secondary",
                        }}
                      >
                        {zone.locationIds.length}
                      </Typography>
                      {hasLocations ? (
                        <CheckCircleIcon sx={{ fontSize: 16, color: "primary.main" }} />
                      ) : (
                        <WarningIcon sx={{ fontSize: 16, color: "warning.main" }} />
                      )}
                    </Box>
                  </TableCell>

                  {/* Cameras */}
                  <TableCell sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: "white",
                        border: "1px solid",
                        borderColor: hasCameras ? "success.main" : "divider",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          color: hasCameras ? "success.dark" : "text.secondary",
                        }}
                      >
                        {zone.cameraIds.length}
                      </Typography>
                      {hasCameras ? (
                        <CheckCircleIcon sx={{ fontSize: 16, color: "success.main" }} />
                      ) : (
                        <WarningIcon sx={{ fontSize: 16, color: "warning.main" }} />
                      )}
                    </Box>
                  </TableCell>

                  {/* Actions */}
                  <TableCell sx={{ textAlign: "center" }}>
                    <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<LocationIcon />}
                        onClick={() => onAssignLocations(zone)}
                        sx={{
                          textTransform: "none",
                          fontSize: "0.75rem",
                          minWidth: "auto",
                          px: 1,
                        }}
                      >
                        Locations
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<CameraIcon />}
                        onClick={() => onAssignCameras(zone)}
                        sx={{
                          textTransform: "none",
                          fontSize: "0.75rem",
                          minWidth: "auto",
                          px: 1,
                        }}
                      >
                        Cameras
                      </Button>
                      <IconButton size="small" onClick={(e) => handleMenuOpen(e, zone)}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1, fontSize: 20 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};
