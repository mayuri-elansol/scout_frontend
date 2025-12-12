// D:\BackOffice\scout_frontend\src\app\(protectedRoutes)\(Settings)\Configurator\ZoneLocationMapping\ZoneLocationMapping.tsx
"use client";

import React, { useMemo, useState } from "react";
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
} from "@/app/components/organisms/configurator/zone-location";
import { Zone as ZoneType, mockZones as initialZonesFromFile } from "@/app/data/mockZones";

type LocationItem = {
  id: number;
  name: string;
  description?: string;
};

const normalizeInitialZones = (zonesFromFile: ZoneType[]): ZoneType[] => {
  return zonesFromFile.map((z) => {
    // If already has a typed locations array
    if (Array.isArray(z.locations)) {
      return z;
    }

    // Handle legacy data with locationIds
    if (Array.isArray(z.locationIds)) {
      const locs: LocationItem[] = z.locationIds.map((id) => ({
        id,
        name: `Location ${id}`,
      }));

      return {
        ...z,
        locations: locs,
      };
    }

    return {
      ...z,
      locations: [],
    };
  });
};


const ZoneLocationMapping: React.FC = () => {
  // Normalize first: ensure each zone has .locations array
  // const normalized = useMemo(() => normalizeInitialZones(initialZonesFromFile), [initialZonesFromFile]);
  const normalized = useMemo(() => normalizeInitialZones(initialZonesFromFile), []);


  const [zones, setZones] = useState<typeof normalized>(normalized);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState<typeof zones[number] | null>(null);
  const [zoneToDelete, setZoneToDelete] = useState<typeof zones[number] | null>(null);

  // Drawer states
  const [addEditDrawerOpen, setAddEditDrawerOpen] = useState(false);
  const [locationsDrawerOpen, setLocationsDrawerOpen] = useState(false);

  // Filter zones
  const filteredZones = zones.filter(
    (zone) =>
      zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (zone.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add new zone
  const handleAddZone = () => {
    setSelectedZone(null);
    setAddEditDrawerOpen(true);
  };

  // Edit zone
  const handleEditZone = (zone: typeof zones[number]) => {
    setSelectedZone(zone);
    setAddEditDrawerOpen(true);
  };

  // Delete zone
  const handleDeleteZone = (zone: typeof zones[number]) => {
    setZoneToDelete(zone);
  };

  const confirmDelete = () => {
    if (zoneToDelete) {
      setZones((prev) => prev.filter((z) => z.id !== zoneToDelete.id));
      setZoneToDelete(null);
    }
  };

  type NewZonePayload = Omit<ZoneType, "id" | "createdAt" | "updatedAt">;

  // Save zone (add or edit)
  // const handleSaveZone = (zoneData: Omit<typeof zones[number], "id" | "createdAt" | "updatedAt"> | typeof zones[number]) => {
  const handleSaveZone = (zoneData: ZoneType | NewZonePayload) => {

    // If incoming has id -> update; else create new.
    if ("id" in zoneData) {
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
      const maxId = zones.length > 0 ? Math.max(...zones.map((z) => z.id)) : 100;
      const newZone: ZoneType = {
        ...(zoneData as NewZonePayload),
        id: maxId + 1,
        locations: (zoneData as NewZonePayload).locations ?? [],
        cameraIds: (zoneData as NewZonePayload).cameraIds ?? [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as typeof zones[number];
      setZones((prev) => [newZone, ...prev]);
    }
  };

  // Assign locations (open drawer)
  const handleAssignLocations = (zone: typeof zones[number]) => {
    setSelectedZone(zone);
    setLocationsDrawerOpen(true);
  };

  // Save locations: adds created locations to zone.locations array
  const handleSaveLocations = (zoneId: number, locations: LocationItem[]) => {
    setZones((prev) =>
      prev.map((z) =>
        z.id === zoneId
          ? {
              ...z,
              locations: [...(z.locations ?? []), ...locations],
              updatedAt: new Date().toISOString(),
            }
          : z
      )
    );
  };

  // Calculate stats
  const totalZones = zones.length;
  const configuredZones = zones.filter((z) => (z.locations?.length ?? 0) > 0 || (z.cameraIds?.length ?? 0) > 0).length;
  const totalLocations = zones.reduce((sum, z) => sum + (z.locations?.length ?? 0), 0);
  // const totalCameras = zones.reduce((sum, z) => sum + (z.cameraIds?.length ?? 0), 0);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 3 }}>
        <MuiLink component={Link} href="/" underline="hover" color="inherit" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <HomeIcon fontSize="small" /> Home
        </MuiLink>
        <MuiLink underline="hover" color="inherit" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <SettingsIcon fontSize="small" /> Settings
        </MuiLink>
        <MuiLink underline="hover" color="inherit" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <TuneIcon fontSize="small" /> Configurator
        </MuiLink>
        <Typography color="text.primary" sx={{ display: "flex", alignItems: "center", gap: 0.5, fontWeight: 600 }}>
          <MapIcon fontSize="small" /> Zone-Location Mapping
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Zone-Location Mapping
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage zones and create locations inside zones for organized monitoring.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2,1fr)", md: "repeat(4,1fr)" }, gap: 2, mb: 3 }}>
        <Box sx={{ p: 2.5, borderRadius: 2, backgroundColor: "rgba(25,118,210,0.08)", border: "2px solid", borderColor: "primary.main", display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography variant="h3" fontWeight={700} color="primary.main">{totalZones}</Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>Total Zones</Typography>
        </Box>

        <Box sx={{ p: 2.5, borderRadius: 2, backgroundColor: "rgba(46,125,50,0.08)", border: "2px solid", borderColor: "success.main", display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography variant="h3" fontWeight={700} color="success.main">{configuredZones}</Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>Configured</Typography>
        </Box>

        <Box sx={{ p: 2.5, borderRadius: 2, backgroundColor: "rgba(2,136,209,0.08)", border: "2px solid", borderColor: "info.main", display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography variant="h3" fontWeight={700} color="info.main">{totalLocations}</Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>Location Assignments</Typography>
        </Box>

        <Box sx={{ p: 2.5, borderRadius: 2, backgroundColor: "rgba(237,108,2,0.08)", border: "2px solid", borderColor: "warning.main", display: "flex", flexDirection: "column", gap: 0.5 }}>
          {/* intentionally left for future camera stats */}
        </Box>
      </Box>

      {/* Search and Add */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexDirection: { xs: "column", sm: "row" } }}>
        <TextField
          fullWidth
          placeholder="Search zones by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
          sx={{ flex: 1, "& .MuiOutlinedInput-root": { backgroundColor: "white" } }}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddZone} sx={{ textTransform: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
          Add Zone
        </Button>
      </Box>

      {/* Zone Table */}
      {filteredZones.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          {searchQuery ? "No zones match your search criteria." : "No zones created yet. Click 'Add Zone' to get started."}
        </Alert>
      ) : (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing <strong>{filteredZones.length}</strong> of <strong>{zones.length}</strong> zones
          </Typography>

          <ZoneTable zones={filteredZones} onAssignLocations={handleAssignLocations} onEdit={handleEditZone} onDelete={handleDeleteZone} />
        </Box>
      )}

      {/* Add/Edit Zone Drawer */}
      <AddEditZoneDrawer open={addEditDrawerOpen} onClose={() => setAddEditDrawerOpen(false)} zone={selectedZone} onSave={handleSaveZone} />

      {/* Assign Locations Drawer */}
      <AssignLocationsDrawer open={locationsDrawerOpen} onClose={() => setLocationsDrawerOpen(false)} zone={selectedZone} onSave={handleSaveLocations} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={Boolean(zoneToDelete)} onClose={() => setZoneToDelete(null)}>
        <DialogTitle>Delete Zone?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete <strong>{zoneToDelete?.name}</strong>? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setZoneToDelete(null)} sx={{ textTransform: "none" }}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained" sx={{ textTransform: "none" }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ZoneLocationMapping;
