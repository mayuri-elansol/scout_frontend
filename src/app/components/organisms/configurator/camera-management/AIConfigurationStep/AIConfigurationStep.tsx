"use client";

import React, { useState, useEffect, useCallback } from "react";
import RoiSelectionModal from "../ROISelectionModel/RoiSelectionModal";
// import { roiService } from '@/services/scout/roiService';

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
  Chip,
  TextField,
  Divider,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Settings as SettingsIcon,
  Tune as TuneIcon,
  RadioButtonUnchecked as ROIIcon,
  // CloudUpload as SaveIcon,
} from "@mui/icons-material";
import { roiService } from "@/app/services/roiService";

// ROI Shape type for the enhanced modal
interface Point {
  x: number;
  y: number;
}

interface ROIShape {
  id?: string;
  type: "rectangle" | "polygon" | "freehand";
  points: Point[];
  completed: boolean;
  color: string;
  name: string;
  mode: "include" | "exclude";
}

interface ROIData {
  configured: boolean;
  shapes?: ROIShape[];
  coordinates?: { x: number; y: number; width: number; height: number }[];
}

interface FineTuningData {
  tuned: boolean;
  model?: string;
  accuracy?: number;
}

interface AIConfig {
  useCases: string[];
  roiData: Record<string, ROIData>;
  fineTuning: Record<string, FineTuningData>;
  enabled: boolean;
  viewName?: string;
}

interface CameraData {
  id: string;
  ipAddress: string;
  username: string;
  password: string;
  port: string;
  make: string;
  position: string;
  rtspStream: string;
  status: "connected" | "failed" | "pending";
  aiConfig?: AIConfig;
}

interface AIConfigurationStepProps {
  camera: CameraData;
  onSave: (aiConfig: AIConfig) => void;
  onBack: () => void;
}

interface UseCaseData {
  id: string;
  name: string;
  description: string;
  selected: boolean;
  roiConfigured: boolean;
  roiShapes?: ROIShape[];
  fineTuned: boolean;
  enabled: boolean;
}

const AIConfigurationStep: React.FC<AIConfigurationStepProps> = ({
  camera,
  onSave,
  onBack,
}) => {
  const [useCases, setUseCases] = useState<UseCaseData[]>([
    {
      id: "ppe-detection",
      name: "Personal Protective Equipment (PPE) Detection",
      description: "Detect personal protective equipment compliance",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "object-detection-walking-bays",
      name: "Object Detection in Walking Bays",
      description: "Detect objects blocking walking paths and bays",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "fire-smoke-gas-leak",
      name: "Fire, Smoke, Oil and Gas Leak Detection",
      description: "Detect fire, smoke, oil and gas leak incidents",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "vehicle-speed-monitoring",
      name: "Vehicle Speed Monitoring inside premises",
      description: "Monitor vehicle speed within facility premises",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "fall-detection",
      name: "Fall Detection (Person falling on the floor)",
      description: "Detect when a person falls on the floor",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "laydown-sleeping-detection",
      name: "Laydown/Sleeping Detection in Work Areas",
      description: "Detect people laying down or sleeping in work areas",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "equipment-gangway-detection",
      name: "Stacker, Forklift or Equipment in Gangway",
      description: "Detect equipment blocking gangways",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "stp-etp-overflow",
      name: "STP/ETP Overflow Detection",
      description: "Detect sewage/effluent treatment plant overflow",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "emergency-exit-blockage",
      name: "Emergency Exit Blockage Detection",
      description: "Detect blockages at emergency exit points",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "crowd-gathering-hazardous",
      name: "Crowd Gathering in Hazardous Zones",
      description: "Detect crowd gathering in dangerous areas",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "intrusion-detection-perimeter",
      name: "Intrusion Detection at Premises Perimeter",
      description: "Detect unauthorized entry at facility perimeter",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "unauthorized-access-restricted",
      name: "Unauthorized Access in Restricted Areas",
      description: "Detect unauthorized access to restricted zones",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "camera-tampering-offline",
      name: "Camera Tampering or Offline Detection",
      description: "Detect camera tampering or offline status",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "people-presence-shutdown",
      name: "People Presence during Shutdown Hours",
      description: "Detect people presence during non-operational hours",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "employee-presence-critical",
      name: "Employee Presence Detection in Critical Areas",
      description: "Monitor employee presence in critical work areas",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "face-recognition-entry-exit",
      name: "Face Recognition for Entry/Exit Logging",
      description: "Face recognition for access control and logging",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "employee-idle-time",
      name: "Employee Idle Time Monitoring",
      description: "Monitor employee idle time and productivity",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "mobile-phone-usage",
      name: "Mobile Phone Usage in Restricted Areas",
      description: "Detect mobile phone usage in restricted zones",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "security-personnel-sleeping",
      name: "Sleeping or Absence of Security Personnel",
      description: "Monitor security personnel alertness and presence",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "people-count-factory",
      name: "People Count in Factory Premises",
      description: "Count people in designated factory areas",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "vehicle-count-anpr",
      name: "Vehicle Count & ANPR at Entry/Exit Gates",
      description: "Vehicle counting and number plate recognition",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "canteen-usage-monitoring",
      name: "Monitoring Canteen Usage & Timings",
      description: "Monitor canteen occupancy and usage patterns",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "vehicle-loading-time",
      name: "Tracking Vehicle Unloading/Loading Time",
      description: "Track time taken for vehicle loading/unloading",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "unauthorized-parking",
      name: "Unauthorized Parking or Equipment Blocking Aisles",
      description: "Detect unauthorized parking and aisle blockages",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
    {
      id: "ocr-detection",
      name: "OCR Detection",
      description: "Optical character recognition for text detection",
      selected: false,
      roiConfigured: false,
      fineTuned: false,
      enabled: false,
    },
  ]);

  const [selectedViewCase, setSelectedViewCase] = useState<string | null>(null);
  const [viewName, setViewName] = useState("");
  const [showCameraView, setShowCameraView] = useState(false);

  // ROI Modal state
  const [roiModalOpen, setRoiModalOpen] = useState(false);
  const [currentUseCaseForROI, setCurrentUseCaseForROI] = useState<
    string | null
  >(null);

  // Loading and notification states
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  const loadAllROIData = useCallback(async () => {
    try {
      console.log("📥 Loading ROI data for camera:", camera.id);
      const roiData = await roiService.getRoi(camera.id);

      console.log("✅ ROI data loaded:", roiData);

      if (roiData.roi) {
        setUseCases((prev) =>
          prev.map((useCase) => {
            const roiForUseCase = roiData.roi[useCase.name];
            if (roiForUseCase && roiForUseCase.length > 0) {
              return {
                ...useCase,
                roiConfigured: true,
                roiShapes: roiForUseCase,
                selected: true,
              };
            }
            return useCase;
          })
        );
      }
    } catch (error) {
      console.error("❌ Error loading ROI data:", error);
    }
  }, [camera.id]);

  // Load existing ROI data when component mounts or camera changes
  useEffect(() => {
    loadAllROIData();
  }, [loadAllROIData]);

  const handleUseCaseSelect = (useCaseId: string) => {
    setUseCases((prev) =>
      prev.map((useCase) =>
        useCase.id === useCaseId
          ? { ...useCase, selected: !useCase.selected }
          : useCase
      )
    );
  };

  const handleAddROI = (useCaseId: string) => {
    const useCase = useCases.find((uc) => uc.id === useCaseId);
    if (!useCase) return;

    setCurrentUseCaseForROI(useCaseId);
    setRoiModalOpen(true);
  };

  const handleROISave = async (roiShapes: ROIShape[]) => {
    if (!currentUseCaseForROI) return;

    const useCase = useCases.find((uc) => uc.id === currentUseCaseForROI);
    if (!useCase) return;

    try {
      setLoading(true);
      console.log("💾 Saving ROI to backend...");

      // Save to backend
      const response = await roiService.saveRoi(
        camera.id,
        useCase.name,
        roiShapes
      );

      console.log("✅ ROI saved successfully:", response);

      // Update local state
      setUseCases((prev) =>
        prev.map((uc) =>
          uc.id === currentUseCaseForROI
            ? {
                ...uc,
                roiConfigured: true,
                roiShapes: roiShapes,
              }
            : uc
        )
      );

      // Show success message
      setSnackbar({
        open: true,
        message: `✅ ROI saved successfully for ${useCase.name}!`,
        severity: "success",
      });

      // Close modal
      setRoiModalOpen(false);
      setCurrentUseCaseForROI(null);
    } catch (error) {
      console.error("❌ Error saving ROI:", error);
      setSnackbar({
        open: true,
        message: "❌ Failed to save ROI. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleROIClose = () => {
    setRoiModalOpen(false);
    setCurrentUseCaseForROI(null);
  };

  const handleFineTune = (useCaseId: string) => {
    setUseCases((prev) =>
      prev.map((useCase) =>
        useCase.id === useCaseId ? { ...useCase, fineTuned: true } : useCase
      )
    );
  };

  // const handleToggleEnable = (useCaseId: string) => {
  //   setUseCases(prev =>
  //     prev.map(useCase =>
  //       useCase.id === useCaseId ? { ...useCase, enabled: !useCase.enabled } : useCase
  //     )
  //   );
  // };

  const handleSubmit = () => {
    const aiConfig: AIConfig = {
      useCases: useCases.filter((uc) => uc.selected).map((uc) => uc.id),
      roiData: useCases.reduce((acc, uc) => {
        if (uc.roiConfigured) {
          acc[uc.id] = {
            configured: true,
            shapes: uc.roiShapes,
          };
        }
        return acc;
      }, {} as Record<string, ROIData>),
      fineTuning: useCases.reduce((acc, uc) => {
        if (uc.fineTuned) acc[uc.id] = { tuned: true };
        return acc;
      }, {} as Record<string, FineTuningData>),
      enabled: useCases.some((uc) => uc.selected),
      viewName: viewName || selectedViewCase || "",
    };

    onSave(aiConfig);
  };

  const getCurrentUseCaseName = () => {
    const useCase = useCases.find((uc) => uc.id === currentUseCaseForROI);
    return useCase?.name || "";
  };

  const getExistingROI = () => {
    const useCase = useCases.find((uc) => uc.id === currentUseCaseForROI);
    return useCase?.roiShapes || [];
  };

  const getCameraFeedUrl = () => {
    return "img/siteimage.jpg";
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 1, minHeight: 500, position: "relative" }}>
      {/* Loading Overlay */}
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Saving ROI to database...</Typography>
          </Box>
        </Box>
      )}

      <Grid container spacing={1.5}>
        {/* Left Panel - Camera Info and Controls */}

        <Grid size={{ xs: 12, lg: 5 }}>
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <SettingsIcon color="primary" />
                Camera Configuration
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Camera ID:</strong> {camera.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Position:</strong> {camera.position}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>IP Address:</strong> {camera.ipAddress}:{camera.port}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Make:</strong> {camera.make}
                </Typography>
              </Box>

              <TextField
                label="View Name"
                value={viewName}
                onChange={(e) => setViewName(e.target.value)}
                fullWidth
                size="small"
                placeholder="Enter view name for this camera"
                sx={{ mb: 2 }}
              />

              <Button
                variant="outlined"
                onClick={() => setShowCameraView(!showCameraView)}
                fullWidth
                sx={{ mb: 2 }}
              >
                {showCameraView ? "Hide" : "Show"} Camera View
              </Button>
            </CardContent>
          </Card>

          {/* Camera View Placeholder */}
          <Card variant="outlined" sx={{ bgcolor: "grey.900", minHeight: 350 }}>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 320,
              }}
            >
              {showCameraView ? (
                <Box sx={{ textAlign: "center", color: "grey.500" }}>
                  <Typography variant="h6" gutterBottom>
                    Live Camera Feed
                  </Typography>
                  <Typography variant="body2">
                    Click &apos;View&apos; on a camera row
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ textAlign: "center", color: "grey.500" }}>
                  <Typography variant="body2">
                    Click &apos;Show Camera View&apos; to display feed
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Panel - Use Cases Configuration */}

        <Grid size={{ xs: 12, lg: 7 }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h6" gutterBottom>
                AI Use Cases Configuration
              </Typography>

              <Alert severity="info" sx={{ mb: 2 }}>
                Select use cases, configure ROI (saved to database), fine-tune
                settings, and enable/disable detection.
              </Alert>

              <Box
                sx={{
                  flex: 1,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <TableContainer sx={{ height: "480px", overflow: "auto" }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            width: "80px",
                            bgcolor: "background.paper",
                          }}
                        >
                          Select
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            minWidth: "300px",
                            bgcolor: "background.paper",
                          }}
                        >
                          Use Case
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            width: "120px",
                            bgcolor: "background.paper",
                          }}
                        >
                          Add ROI
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            width: "120px",
                            bgcolor: "background.paper",
                          }}
                        >
                          Fine Tune
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            width: "80px",
                            bgcolor: "background.paper",
                          }}
                        >
                          View
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {useCases.map((useCase) => (
                        <TableRow key={useCase.id} hover>
                          <TableCell>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={useCase.selected}
                                  onChange={() =>
                                    handleUseCaseSelect(useCase.id)
                                  }
                                  size="small"
                                />
                              }
                              label=""
                            />
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" fontWeight={500}>
                                {useCase.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {useCase.description}
                              </Typography>
                              {useCase.roiConfigured && useCase.roiShapes && (
                                <Box sx={{ mt: 0.5 }}>
                                  <Chip
                                    label={`${useCase.roiShapes.length} ROI(s) in DB`}
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                  />
                                </Box>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              variant={
                                useCase.roiConfigured ? "contained" : "outlined"
                              }
                              onClick={() => handleAddROI(useCase.id)}
                              disabled={!useCase.selected}
                              startIcon={
                                useCase.roiConfigured ? (
                                  <CheckCircleIcon />
                                ) : (
                                  <ROIIcon />
                                )
                              }
                              color={
                                useCase.roiConfigured ? "success" : "primary"
                              }
                              sx={{ minWidth: "90px" }}
                            >
                              {useCase.roiConfigured ? "Edit ROI" : "Add ROI"}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              variant={
                                useCase.fineTuned ? "contained" : "outlined"
                              }
                              onClick={() => handleFineTune(useCase.id)}
                              disabled={!useCase.selected}
                              startIcon={
                                useCase.fineTuned ? (
                                  <CheckCircleIcon />
                                ) : (
                                  <TuneIcon />
                                )
                              }
                              color={useCase.fineTuned ? "success" : "primary"}
                              sx={{ minWidth: "90px" }}
                            >
                              {useCase.fineTuned ? "Tuned" : "Fine Tune"}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <FormControlLabel
                              control={
                                <Radio
                                  checked={selectedViewCase === useCase.id}
                                  onChange={() =>
                                    setSelectedViewCase(useCase.id)
                                  }
                                  disabled={!useCase.selected}
                                  size="small"
                                  color="primary"
                                />
                              }
                              label=""
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  py: 1,
                  bgcolor: "action.hover",
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Selected: {useCases.filter((uc) => uc.selected).length} of{" "}
                  {useCases.length} use cases
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ROI in DB: {useCases.filter((uc) => uc.roiConfigured).length}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onBack} color="inherit" variant="outlined">
          Back to Camera List
        </Button>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="outlined" color="inherit">
            Save Configuration
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!useCases.some((uc) => uc.selected)}
          >
            Submit
          </Button>
        </Box>
      </Box>

      {/* ROI Selection Modal */}
      <RoiSelectionModal
        key={`${currentUseCaseForROI}-${roiModalOpen}-${Date.now()}`}
        open={roiModalOpen}
        onClose={handleROIClose}
        cameraFeedUrl={getCameraFeedUrl()}
        useCaseName={getCurrentUseCaseName()}
        existingROI={getExistingROI()}
        onSave={handleROISave}
      />

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AIConfigurationStep;
