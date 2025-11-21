"use client";

import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Breadcrumbs,
  Link as MuiLink,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  Tune as TuneIcon,
  Map as MapIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import Link from "next/link";
import {
  ZoneTable,
  AddEditZoneDrawer,
  AssignLocationsDrawer,
  AssignCamerasDrawer,
} from "@/app/components/organisms/configurator/zone-location";
import { Zone, mockZones as initialZones } from "@/app/data/mockZones";
import { mockLocations } from "@/app/data/mockLocations";
import { mockCameras } from "@/app/data/mockCameras";

const ZoneLocationMapping: React.FC = () => {
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [zoneToDelete, setZoneToDelete] = useState<Zone | null>(null);

  // Drawer states
  const [addEditDrawerOpen, setAddEditDrawerOpen] = useState(false);
  const [locationsDrawerOpen, setLocationsDrawerOpen] = useState(false);
  const [camerasDrawerOpen, setCamerasDrawerOpen] = useState(false);

  // Filter zones
  const filteredZones = zones.filter(
    (zone) =>
      zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new zone
  const handleAddZone = () => {
    setSelectedZone(null);
    setAddEditDrawerOpen(true);
  };

  // Edit zone
  const handleEditZone = (zone: Zone) => {
    setSelectedZone(zone);
    setAddEditDrawerOpen(true);
  };

  // Delete zone
  const handleDeleteZone = (zone: Zone) => {
    setZoneToDelete(zone);
  };

  const confirmDelete = () => {
    if (zoneToDelete) {
      setZones((prev) => prev.filter((z) => z.id !== zoneToDelete.id));
      setZoneToDelete(null);
    }
  };

  // Save zone (add or edit)
  const handleSaveZone = (zoneData: Omit<Zone, "id" | "createdAt" | "updatedAt"> | Zone) => {
    if ("id" in zoneData) {
      // Edit existing zone
      setZones((prev) =>
        prev.map((z) =>
          z.id === zoneData.id
            ? {
                ...zoneData,
                updatedAt: new Date().toISOString(),
              }
            : z
        )
      );
    } else {
      // Add new zone
      const newZone: Zone = {
        ...zoneData,
        id: Math.max(...zones.map((z) => z.id), 100) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setZones((prev) => [newZone, ...prev]);
    }
  };

  // Assign locations
  const handleAssignLocations = (zone: Zone) => {
    setSelectedZone(zone);
    setLocationsDrawerOpen(true);
  };

  const handleSaveLocations = (zoneId: number, locationIds: number[]) => {
    setZones((prev) =>
      prev.map((z) =>
        z.id === zoneId
          ? {
              ...z,
              locationIds,
              updatedAt: new Date().toISOString(),
            }
          : z
      )
    );
  };

  // Assign cameras
  const handleAssignCameras = (zone: Zone) => {
    setSelectedZone(zone);
    setCamerasDrawerOpen(true);
  };

  const handleSaveCameras = (zoneId: number, cameraIds: number[]) => {
    setZones((prev) =>
      prev.map((z) =>
        z.id === zoneId
          ? {
              ...z,
              cameraIds,
              updatedAt: new Date().toISOString(),
            }
          : z
      )
    );
  };

  // Calculate stats
  const totalZones = zones.length;
  const configuredZones = zones.filter(
    (z) => z.locationIds.length > 0 || z.cameraIds.length > 0
  ).length;
  const totalLocations = zones.reduce((sum, z) => sum + z.locationIds.length, 0);
  const totalCameras = zones.reduce((sum, z) => sum + z.cameraIds.length, 0);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
        <MuiLink
          component={Link}
          href="/"
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <HomeIcon fontSize="small" />
          Home
        </MuiLink>
        <MuiLink
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <SettingsIcon fontSize="small" />
          Settings
        </MuiLink>
        <MuiLink
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <TuneIcon fontSize="small" />
          Configurator
        </MuiLink>
        <Typography
          color="text.primary"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            fontWeight: 600,
          }}
        >
          <MapIcon fontSize="small" />
          Zone-Location Mapping
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Zone-Location Mapping
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage zones and assign locations and cameras to each zone for organized monitoring.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            backgroundColor: "rgba(25, 118, 210, 0.08)",
            border: "2px solid",
            borderColor: "primary.main",
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.12)",
              transform: "translateY(-2px)",
              boxShadow: 2,
            },
          }}
        >
          <Typography variant="h3" fontWeight={700} color="primary.main">
            {totalZones}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Total Zones
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            backgroundColor: "rgba(46, 125, 50, 0.08)",
            border: "2px solid",
            borderColor: "success.main",
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(46, 125, 50, 0.12)",
              transform: "translateY(-2px)",
              boxShadow: 2,
            },
          }}
        >
          <Typography variant="h3" fontWeight={700} color="success.main">
            {configuredZones}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Configured
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            backgroundColor: "rgba(2, 136, 209, 0.08)",
            border: "2px solid",
            borderColor: "info.main",
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(2, 136, 209, 0.12)",
              transform: "translateY(-2px)",
              boxShadow: 2,
            },
          }}
        >
          <Typography variant="h3" fontWeight={700} color="info.main">
            {totalLocations}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Location Assignments
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            backgroundColor: "rgba(237, 108, 2, 0.08)",
            border: "2px solid",
            borderColor: "warning.main",
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(237, 108, 2, 0.12)",
              transform: "translateY(-2px)",
              boxShadow: 2,
            },
          }}
        >
          <Typography variant="h3" fontWeight={700} color="warning.main">
            {totalCameras}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Camera Assignments
          </Typography>
        </Box>
      </Box>

      {/* Search and Add */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          fullWidth
          placeholder="Search zones by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddZone}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          Add Zone
        </Button>
      </Box>

      {/* Zone Table */}
      {filteredZones.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          {searchQuery
            ? "No zones match your search criteria."
            : "No zones created yet. Click 'Add Zone' to get started."}
        </Alert>
      ) : (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing <strong>{filteredZones.length}</strong> of{" "}
            <strong>{zones.length}</strong> zones
          </Typography>

          <ZoneTable
            zones={filteredZones}
            onAssignLocations={handleAssignLocations}
            onAssignCameras={handleAssignCameras}
            onEdit={handleEditZone}
            onDelete={handleDeleteZone}
          />
        </Box>
      )}

      {/* Add/Edit Zone Drawer */}
      <AddEditZoneDrawer
        open={addEditDrawerOpen}
        onClose={() => setAddEditDrawerOpen(false)}
        zone={selectedZone}
        onSave={handleSaveZone}
      />

      {/* Assign Locations Drawer */}
      <AssignLocationsDrawer
        open={locationsDrawerOpen}
        onClose={() => setLocationsDrawerOpen(false)}
        zone={selectedZone}
        locations={mockLocations}
        onSave={handleSaveLocations}
      />

      {/* Assign Cameras Drawer */}
      <AssignCamerasDrawer
        open={camerasDrawerOpen}
        onClose={() => setCamerasDrawerOpen(false)}
        zone={selectedZone}
        cameras={mockCameras}
        onSave={handleSaveCameras}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(zoneToDelete)}
        onClose={() => setZoneToDelete(null)}
      >
        <DialogTitle>Delete Zone?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{zoneToDelete?.name}</strong>? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setZoneToDelete(null)} sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ZoneLocationMapping;
