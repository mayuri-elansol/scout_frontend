"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Close as CloseIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";

type ZoneUI = {
  id: string;
  name: string;
};


export interface LocationItem {
  id: string;
  name: string;
  description?: string;
}

interface AddLocationDrawerProps {
  open: boolean;
  onClose: () => void;
  zone: ZoneUI | null;
  existingLocations: LocationItem[];
  onSave: (zoneId: string, locations: LocationItem[]) => void;
}


export const AssignLocationsDrawer: React.FC<AddLocationDrawerProps> = ({
  open,
  onClose,
  zone,
  existingLocations: initialExistingLocations,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [existingLocations, setExistingLocations] = useState<LocationItem[]>([]);
  const [localLocations, setLocalLocations] = useState<LocationItem[]>([]);

  // Reset local form when drawer opens/closes
  useEffect(() => {
    if (open) {
      setName("");
      setDescription("");
      setExistingLocations(initialExistingLocations ?? []);
      setLocalLocations([]);
    }
  }, [open, initialExistingLocations]);

  // Add a location to local list (does NOT yet persist to parent)
  const handleAddLocalLocation = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newLoc: LocationItem = {
      id: crypto.randomUUID(),     // safe unique ID
      name: trimmedName,
      description: description.trim() ?? undefined,
    };


    setLocalLocations((prev) => [...prev, newLoc]);
    setName("");
    setDescription("");
  };

  const handleRemoveLocalLocation = (id: string) => {
    setLocalLocations((prev) => prev.filter((l) => l.id !== id));
  };


  const handleSave = () => {
    if (!zone) return;
    if (localLocations.length === 0) {
      // nothing to save
      onClose();
      return;
    }
    onSave(zone.id, localLocations);
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
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 420, md: 520 },
            display: "flex",
            zIndex: 1400,
            flexDirection: "column",
          },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Add Location
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {zone ? `Zone: ${zone.name}` : "Select a zone first"}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Body */}
      <Box sx={{ p: 3, flex: 1, overflow: "auto" }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Create a new location for this zone
        </Typography>

        <TextField
          label="Location Name"
          fullWidth
          size="small"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Short Description (optional)"
          fullWidth
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />


        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Button startIcon={<AddIcon />} variant="contained" onClick={handleAddLocalLocation} disabled={!name.trim()}>
            Add Location
          </Button>
          <Button variant="outlined" onClick={() => { setName(""); setDescription(""); }}>
            Clear
          </Button>
        </Box>

        {/* NEW locations (editable) */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Locations to be created ({localLocations.length})
        </Typography>

        <List sx={{ p: 0, mb: 3 }}>
          {localLocations.map((loc) => (
            <ListItem
              key={loc.id}
              sx={{
                borderRadius: 1,
                mb: 1,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "white",
              }}
              secondaryAction={
                <IconButton
                  edge="end"
                  size="small"
                  onClick={() => handleRemoveLocalLocation(loc.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              }
            >
              <ListItemText
                primary={<Typography sx={{ fontWeight: 600 }}>{loc.name}</Typography>}
                secondary={loc.description}
              />
            </ListItem>
          ))}
        </List>

        {/* EXISTING locations (read-only) */}
        <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
          Existing Locations ({existingLocations.length})
        </Typography>

        <List sx={{ p: 0 }}>
          {existingLocations.map((loc) => (
            <ListItem
              key={loc.id}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                mb: 1,
                backgroundColor: "#f5f5f5",
              }}
            >
              <ListItemText
                primary={<Typography fontWeight={600}>{loc.name}</Typography>}
                secondary={loc.description}
              />
            </ListItem>
          ))}
        </List>


      </Box>

      {/* Footer */}
      <Box sx={{ p: 3, borderTop: "1px solid", borderColor: "divider", display: "flex", gap: 2 }}>
        <Button fullWidth variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button fullWidth variant="contained" onClick={handleSave} disabled={localLocations.length === 0}>
          Save Locations
        </Button>
      </Box>
    </Drawer>
  );
};

export default AssignLocationsDrawer;
