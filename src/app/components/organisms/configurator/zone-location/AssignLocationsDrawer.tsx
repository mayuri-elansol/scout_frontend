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
} from "@mui/material";
import {
  Close as CloseIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Circle as CircleIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { Zone } from "@/app/data/mockZones";
import { Location } from "@/app/data/mockLocations";

interface AssignLocationsDrawerProps {
  open: boolean;
  onClose: () => void;
  zone: Zone | null;
  locations: Location[];
  onSave: (zoneId: number, locationIds: number[]) => void;
}

export const AssignLocationsDrawer: React.FC<AssignLocationsDrawerProps> = ({
  open,
  onClose,
  zone,
  locations,
  onSave,
}) => {
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (open && zone) {
      setSelectedLocationIds(zone.locationIds || []);
      setSearchQuery("");
    }
  }, [open, zone]);

  const handleToggleLocation = (locationId: number) => {
    setSelectedLocationIds((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleSelectAll = () => {
    const filteredIds = filteredLocations.map((loc) => loc.id);
    setSelectedLocationIds(filteredIds);
  };

  const handleDeselectAll = () => {
    setSelectedLocationIds([]);
  };

  const handleSave = () => {
    if (zone) {
      onSave(zone.id, selectedLocationIds);
      onClose();
    }
  };

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.building?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.floor?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasChanges =
    JSON.stringify([...(zone?.locationIds || [])].sort()) !==
    JSON.stringify([...selectedLocationIds].sort());

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
            Assign Locations
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
        {locations.length === 0 ? (
          <Alert severity="info">
            <Typography variant="body2" gutterBottom>
              <strong>No locations available</strong>
            </Typography>
            <Typography variant="body2">
              Please add locations first before assigning them to zones.
            </Typography>
          </Alert>
        ) : (
          <>
            {/* Search Bar */}
            <TextField
              fullWidth
              size="small"
              placeholder="Search locations by name, building, or floor..."
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
                {selectedLocationIds.length} of {locations.length} selected
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  onClick={handleSelectAll}
                  disabled={selectedLocationIds.length === filteredLocations.length}
                  sx={{ textTransform: "none" }}
                >
                  Select All
                </Button>
                <Button
                  size="small"
                  onClick={handleDeselectAll}
                  disabled={selectedLocationIds.length === 0}
                  sx={{ textTransform: "none" }}
                >
                  Deselect All
                </Button>
              </Box>
            </Box>

            {/* Location List */}
            {filteredLocations.length === 0 ? (
              <Alert severity="warning">No locations match your search.</Alert>
            ) : (
              <List sx={{ p: 0 }}>
                {filteredLocations.map((location) => {
                  const isSelected = selectedLocationIds.includes(location.id);
                  return (
                    <ListItem
                      key={location.id}
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
                        onClick={() => handleToggleLocation(location.id)}
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
                        <LocationIcon
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
                              {location.name}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ mt: 0.5 }}>
                              {location.building && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ fontSize: "0.875rem" }}
                                >
                                  🏢 {location.building}
                                  {location.floor && ` • ${location.floor}`}
                                </Typography>
                              )}
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
          disabled={!hasChanges || locations.length === 0}
          sx={{ textTransform: "none" }}
        >
          Save Changes
        </Button>
      </Box>
    </Drawer>
  );
};
