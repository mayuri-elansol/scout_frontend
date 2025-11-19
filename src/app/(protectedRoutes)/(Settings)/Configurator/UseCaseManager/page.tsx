"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link as MuiLink,
  Skeleton,
} from "@mui/material";
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Tune as TuneIcon,
  Category as CategoryIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { UseCase, Camera } from "@/app/types/useCaseManager";
import { useCaseManagerService } from "@/app/services/useCaseManagerService";
import {
  UseCaseList,
  CameraSelectionDrawer,
} from "@/app/components/organisms/configurator/use-case-manager";

export default function UseCaseManagerPage() {
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoadingUseCases, setIsLoadingUseCases] = useState(true);
  const [isLoadingCameras, setIsLoadingCameras] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Assume organization ID is available from context or session
  // In a real app, this would come from authentication/context
  const organizationId = "org-001";

  // Load use cases on mount
  useEffect(() => {
    loadUseCases();
  }, []);

  const loadUseCases = async () => {
    setIsLoadingUseCases(true);
    setError(null);
    try {
      // Use mock data for development
      // Replace with real API when available
      const orgLicense = await useCaseManagerService.getMockOrganizationLicense(
        organizationId
      );
      setUseCases(orgLicense.useCases);
    } catch (err) {
      console.error("Error loading use cases:", err);
      setError("Failed to load use cases. Please try again later.");
    } finally {
      setIsLoadingUseCases(false);
    }
  };

  const loadCameras = async () => {
    setIsLoadingCameras(true);
    try {
      // Use mock data for development
      // Replace with real API when available
      const cameraData = await useCaseManagerService.getMockCameras(organizationId);
      setCameras(cameraData);
    } catch (err) {
      console.error("Error loading cameras:", err);
    } finally {
      setIsLoadingCameras(false);
    }
  };

  const handleConfigureCameras = async (useCase: UseCase) => {
    setSelectedUseCase(useCase);
    setDrawerOpen(true);
    if (cameras.length === 0) {
      await loadCameras();
    }
  };

  const handleSaveCameraAssignments = async (
    useCaseId: string,
    selectedCameraIds: string[]
  ) => {
    try {
      // Update the use case in local state
      setUseCases((prev) =>
        prev.map((uc) =>
          uc.id === useCaseId ? { ...uc, assignedCameraIds: selectedCameraIds } : uc
        )
      );

      // In a real app, call the API to persist changes
      // await useCaseManagerService.updateUseCaseCameras(
      //   organizationId,
      //   useCaseId,
      //   selectedCameraIds
      // );

      console.log("Saved camera assignments:", {
        useCaseId,
        selectedCameraIds,
      });
    } catch (err) {
      console.error("Error saving camera assignments:", err);
      throw err;
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedUseCase(null);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
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
          <CategoryIcon fontSize="small" />
          Use-Case Manager
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Use-Case Manager
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure and assign cameras to AI use cases based on your organization's
          license. Select cameras from Camera Management to enable specific detection
          and monitoring capabilities.
        </Typography>
      </Box>

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {isLoadingUseCases ? (
        <Box>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={100}
                sx={{ flex: 1, borderRadius: 2 }}
              />
            ))}
          </Box>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 3 }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={280}
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Box>
        </Box>
      ) : useCases.length === 0 ? (
        /* Empty State */
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            backgroundColor: "background.default",
            borderRadius: 2,
            border: "2px dashed",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: "warning.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <CategoryIcon sx={{ fontSize: 40, color: "warning.main" }} />
          </Box>

          <Typography variant="h5" gutterBottom fontWeight={600}>
            No Use Cases Available
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mt: 2, mb: 3 }}>
            Your organization's license doesn't have any use cases configured yet.
            Please contact your administrator or check your license details.
          </Typography>

          <Alert severity="info" sx={{ maxWidth: 600, mx: "auto" }}>
            Use cases are configured during organization onboarding and depend on your
            selected license tier. Contact support for more information.
          </Alert>
        </Paper>
      ) : (
        /* Use Case List */
        <UseCaseList
          useCases={useCases}
          onConfigureCameras={handleConfigureCameras}
          isLoading={isLoadingUseCases}
        />
      )}

      {/* Camera Selection Drawer */}
      <CameraSelectionDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        useCase={selectedUseCase}
        cameras={cameras}
        onSave={handleSaveCameraAssignments}
        isLoading={isLoadingCameras}
      />
    </Container>
  );
}
