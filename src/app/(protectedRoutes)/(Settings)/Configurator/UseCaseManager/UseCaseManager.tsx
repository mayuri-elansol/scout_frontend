"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Alert,
  Skeleton,
} from "@mui/material";
import {
  Category as CategoryIcon,
} from "@mui/icons-material";
import { UseCase, Camera } from "@/app/types/useCaseManager";
import { getUsecases, getCameras, assignCameras, getAssignments }
  from "@/app/services/configurator/usecaseService";

import {
  UseCaseList,
  CameraSelectionDrawer,
} from "@/app/components/organisms/configurator/use-case-manager";

const UseCaseManager: React.FC = () => {
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoadingUseCases, setIsLoadingUseCases] = useState(true);
  const [isLoadingCameras, setIsLoadingCameras] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Assume organization ID is available from context or session
  // const organizationId = "org-001";

  // Load use cases on mount
  useEffect(() => {
    loadUseCases();
  }, []);

  const loadUseCases = async () => {
    setIsLoadingUseCases(true);
    try {
      const res = await getUsecases();         // <-- real backend call
      const usecases = res.data.map((uc: Record<string, unknown>) => ({
        id: uc.id,
        name: uc.usecaseName,
        description: uc.description,
        category: "AI",
        enabled: true,
        assignedCameraIds: [],
      }));
      console.log("UseCases API Response", res.data);
      for (const uc of usecases) {
        const assignments = await getAssignments(uc.id);
        uc.assignedCameraIds = assignments.data.map((m: Record<string, unknown>) => String(m.cameraId));
      }

      setUseCases(usecases);
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
      const res = await getCameras();
      setCameras(
        res.data.map((cam: Record<string, unknown>) => ({
          id: cam.id,
          name: cam.cameraName,
          position: cam.cameraZone,
          location: cam.cameraZone,
          ipAddress: cam.cameraIp,
          port: cam.RTSPport,
          make: cam.connectionType,
          status: "connected",
        }))
      );
    } catch (err) {
      console.error("Error loading cameras:", err);
    } finally {
      setIsLoadingCameras(false);
    }
  };


  const handleSaveCameraAssignments = async (useCaseId: string, selectedCameraIds: string[]) => {
    try {
      await assignCameras(useCaseId, selectedCameraIds);   // call backend

      setUseCases((prev) =>
        prev.map((uc) =>
          uc.id === useCaseId ? { ...uc, assignedCameraIds: selectedCameraIds } : uc
        )
      );
      console.log("Saved camera assignments:", {
        useCaseId,
        selectedCameraIds,
      });
    } catch (err) {
      console.error("Error saving Camera Assignment", err);
    }
  };

  const handleConfigureCameras = async (useCase: UseCase) => {
  setSelectedUseCase(useCase);
  setDrawerOpen(true);

  if (cameras.length === 0) await loadCameras();
};


  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedUseCase(null);
  };

  const renderContent = () => {
    if (isLoadingUseCases) {
      return (
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
      );
    }

    if (useCases.length === 0) {
      return (
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
            Your organizations license does not have any use cases configured yet.
            Please contact your administrator or check your license details.
          </Typography>

          <Alert severity="info" sx={{ maxWidth: 600, mx: "auto" }}>
            Use cases are configured during organization onboarding and depend on your
            selected license tier. Contact support for more information.
          </Alert>
        </Paper>
      );
    }

    return (
      /* Use Case List */
      <UseCaseList
        useCases={useCases}
        onConfigureCameras={handleConfigureCameras}
        isLoading={isLoadingUseCases}
      />
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>

      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Use-Case Manager
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure and assign cameras to AI use cases based on your organization&apos;s

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

      {/* Content */}
      {renderContent()}

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
};

export default UseCaseManager;