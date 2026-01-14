'use client';

import React, { useEffect, useState } from 'react';
import RoiSelectionModal from '../ROISelectionModel/RoiSelectionModal';
import {
  useGetUsecasesQuery,
  useAssignCamerasMutation,
  useUnassignCameraMutation,
  useLazyGetCameraAssignmentsQuery,
} from '@/app/(protectedRoutes)/(Settings)/(Configurator)/UseCaseManager/UseCaseManagerAPI';
import {
  useLazyGetRoiQuery,
  useSaveRoiMutation,
} from '@/app/(protectedRoutes)/(Settings)/(Configurator)/CameraManagement/RoiApi';

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
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Settings as SettingsIcon,
  Tune as TuneIcon,
  RadioButtonUnchecked as ROIIcon,
} from '@mui/icons-material';

import { ROIShape } from '@/app/types/roi';

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
  status: 'connected' | 'failed' | 'pending';
  aiConfig?: AIConfig
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
  labels: string[];
}

const AIConfigurationStep: React.FC<AIConfigurationStepProps> = ({
  camera,
  onSave,
  onBack,
}) => {

  // RTK Query hooks
  const { data: useCasesResponse, isLoading: loadingUseCases } = useGetUsecasesQuery();
  const [assignCameras] = useAssignCamerasMutation();
  const [unassignCamera] = useUnassignCameraMutation();
  const [getCameraAssignments] = useLazyGetCameraAssignmentsQuery();

  // ROI RTK Query hooks
  const [getRoi] = useLazyGetRoiQuery();
  const [saveRoi, { isLoading: isSavingRoi }] = useSaveRoiMutation();

  const [useCases, setUseCases] = useState<UseCaseData[]>([]);

  // ✅ Combined effect - Load use cases WITH assignments
  useEffect(() => {
    const loadUseCasesWithAssignments = async () => {
      if (loadingUseCases || !useCasesResponse || !Array.isArray(useCasesResponse)) {
        return;
      }

      // Step 1: Map use cases from API response
      const mapped = useCasesResponse.map((uc) => ({
        id: uc.id,
        name: uc.usecaseName,
        description: uc.description || '',
        selected: false,
        roiConfigured: false,
        fineTuned: false,
        enabled: false,
        roiShapes: [],
        labels: uc.labels ?? [],
      }));

      try {
        // Step 2: Get camera assignments
        const res = await getCameraAssignments(camera.id).unwrap();

        if (!Array.isArray(res)) {
          setUseCases(mapped);
          return;
        }

        // Step 3: Mark selected use cases
        const withSelection = mapped.map(uc => ({
          ...uc,
          selected: res.some((a: { usecaseId: string }) => a.usecaseId === uc.id),
        }));

        // Step 4: Load ROI for selected use cases using RTK Query
        const withROI = await Promise.all(
          withSelection.map(async (uc) => {
            if (!uc.selected) return uc;

            try {
              const shapes = await getRoi({
                cameraId: camera.id,
                usecaseId: uc.id
              }).unwrap();

              return {
                ...uc,
                roiConfigured: shapes.length > 0,
                roiShapes: shapes,
              };
            } catch {
              return uc;
            }
          })
        );

        setUseCases(withROI);
      } catch (error) {
        console.error('Failed to load assignments', error);
        // Set use cases anyway without assignments
        setUseCases(mapped);
      }
    };

    loadUseCasesWithAssignments();
  }, [loadingUseCases, useCasesResponse, camera.id, getCameraAssignments, getRoi]);

  const [selectedViewCase, setSelectedViewCase] = useState<string | null>(null);
  const [viewName, setViewName] = useState('');
  const [showCameraView, setShowCameraView] = useState(false);

  // ROI Modal state
  const [roiModalOpen, setRoiModalOpen] = useState(false);
  const [currentUseCaseForROI, setCurrentUseCaseForROI] = useState<string | null>(null);

  // Loading and notification states
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info',
  });

  const handleUseCaseSelect = async (usecaseId: string) => {
    const useCase = useCases.find(uc => uc.id === usecaseId);
    const isSelected = !useCase?.selected;

    // Optimistic update
    setUseCases(prev =>
      prev.map(uc =>
        uc.id === usecaseId ? { ...uc, selected: isSelected } : uc
      )
    );

    try {
      if (isSelected) {
        // ASSIGN
        await assignCameras({
          usecaseId: usecaseId,
          cameraIds: [camera.id]
        }).unwrap();
      } else {
        // UNASSIGN
        await unassignCamera({
          usecaseId: usecaseId,
          cameraId: camera.id
        }).unwrap();
      }

      setSnackbar({
        open: true,
        severity: "success",
        message: isSelected
          ? "Camera assigned to usecase"
          : "Camera unassigned",
      });
    } catch (error) {
      console.error(error);

      // Revert optimistic update on error
      setUseCases(prev =>
        prev.map(uc =>
          uc.id === usecaseId ? { ...uc, selected: !isSelected } : uc
        )
      );

      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to update assignment",
      });
    }
  };

  const handleAddROI = async (useCaseId: string) => {
    setCurrentUseCaseForROI(useCaseId);

    try {
      // Use RTK Query to get ROI
      const shapes = await getRoi({
        cameraId: camera.id,
        usecaseId: useCaseId
      }).unwrap();

      setUseCases(prev =>
        prev.map(uc =>
          uc.id === useCaseId
            ? { ...uc, roiShapes: shapes, roiConfigured: true }
            : uc
        )
      );
    } catch {
      // No ROI exists yet → open empty canvas
    }

    setRoiModalOpen(true);
  };

  const handleROISave = async (roiShapes: ROIShape[]) => {
    if (!currentUseCaseForROI) return;

    try {
      setLoading(true);

      await saveRoi({
        cameraId: camera.id,
        usecaseId: currentUseCaseForROI,
        rois: roiShapes.map(r => ({
          type: r.type,
          label: r.name,
          mode: r.mode,
          points: r.points,
        })),
      }).unwrap();

      // 🔥 ADD THIS
      const refreshed = await getRoi({
        cameraId: camera.id,
        usecaseId: currentUseCaseForROI,
      }).unwrap();

      setUseCases(prev =>
        prev.map(uc =>
          uc.id === currentUseCaseForROI
            ? {
              ...uc,
              roiConfigured: refreshed.length > 0,
              roiShapes: refreshed,
            }
            : uc
        )
      );


      setSnackbar({
        open: true,
        message: 'ROI saved successfully',
        severity: 'success',
      });

    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: 'Failed to save ROI',
        severity: 'error',
      });
    } finally {
      setLoading(false);
      setRoiModalOpen(false);
      setCurrentUseCaseForROI(null);
    }
  };

  const handleROIClose = () => {
    setRoiModalOpen(false);
    setCurrentUseCaseForROI(null);
  };

  const handleFineTune = (useCaseId: string) => {
    setUseCases(prev =>
      prev.map(useCase =>
        useCase.id === useCaseId ? { ...useCase, fineTuned: true } : useCase
      )
    );
  };

  const handleSubmit = () => {
    const aiConfig: AIConfig = {
      useCases: useCases.filter(uc => uc.selected).map(uc => uc.id),
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
      enabled: useCases.some(uc => uc.selected),
      viewName: viewName ?? selectedViewCase ?? '',
    };

    onSave(aiConfig);
  };

  const getCurrentUseCaseName = () => {
    const useCase = useCases.find(uc => uc.id === currentUseCaseForROI);
    return useCase?.name ?? '';
  };

  const getExistingROI = () => {
    const useCase = useCases.find(uc => uc.id === currentUseCaseForROI);
    return useCase?.roiShapes ?? [];
  };

  const getCameraFeedUrl = () => {
    if (camera.rtspStream && camera.rtspStream.trim() !== '') {
      const rtspUrl = camera.rtspStream;

      if (rtspUrl.startsWith('http')) {
        return rtspUrl;
      }

      if (camera.ipAddress) {
        const snapshotPaths: Record<string, string> = {
          'hikvision': '/ISAPI/Streaming/channels/101/picture',
          'dahua': '/cgi-bin/snapshot.cgi',
          'axis': '/axis-cgi/jpg/image.cgi',
          'default': '/snapshot.jpg'
        };

        const make = camera.make?.toLowerCase() ?? 'default';
        const path = snapshotPaths[make] ?? snapshotPaths['default'];

        if (camera.username && camera.password) {
          return `http://${camera.username}:${camera.password}@${camera.ipAddress}:${camera.port ?? '80'}${path}`;
        } else {
          return `http://${camera.ipAddress}:${camera.port ?? '80'}${path}`;
        }
      }
    }

    return '/img/siteimage.jpg';
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ p: 1, minHeight: 500, position: 'relative' }}>
      {(loading || isSavingRoi) && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Saving ROI configuration...</Typography>
          </Box>
        </Box>
      )}

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
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
                onChange={e => setViewName(e.target.value)}
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
                {showCameraView ? 'Hide' : 'Show'} Camera View
              </Button>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ bgcolor: 'grey.900', minHeight: 350 }}>
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 320,
              }}
            >
              {showCameraView ? (
                <Box sx={{ textAlign: 'center', color: 'grey.500' }}>
                  <Typography variant="h6" gutterBottom>
                    Live Camera Feed
                  </Typography>
                  <Typography variant="body2">
                    Click &apos;View&apos; on a camera row
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', color: 'grey.500' }}>
                  <Typography variant="body2">
                    Click &apos;Show Camera View&apos; to display feed
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                AI Use Cases Configuration
              </Typography>

              <Alert severity="info" sx={{ mb: 2 }}>
                Select use cases, configure ROI (saved to database), fine-tune settings, and enable/disable detection.
              </Alert>

              <Box
                sx={{
                  flex: 1,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                {loadingUseCases ? (
                  <Box sx={{ textAlign: "center", p: 4 }}>
                    <CircularProgress />
                    <Typography sx={{ mt: 2 }}>Loading use cases...</Typography>
                  </Box>
                ) : (
                  <TableContainer sx={{ height: '480px', overflow: 'auto' }}>
                    <Table stickyHeader size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, width: '80px', bgcolor: 'background.paper' }}>
                            Select
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, minWidth: '300px', bgcolor: 'background.paper' }}>
                            Use Case
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, width: '120px', bgcolor: 'background.paper' }}>
                            Add ROI
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, width: '120px', bgcolor: 'background.paper' }}>
                            Fine Tune
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, width: '80px', bgcolor: 'background.paper' }}>
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
                                    onChange={() => handleUseCaseSelect(useCase.id)}
                                    size="small"
                                  />
                                }
                                label=""
                              />
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" fontWeight={540}>
                                  {useCase.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
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
                                variant={useCase.roiConfigured ? 'contained' : 'outlined'}
                                onClick={() => handleAddROI(useCase.id)}
                                disabled={!useCase.selected}
                                startIcon={useCase.roiConfigured ? <CheckCircleIcon /> : <ROIIcon />}
                                color={useCase.roiConfigured ? 'success' : 'primary'}
                                sx={{ minWidth: '90px' }}
                              >
                                {useCase.roiConfigured ? 'Edit ROI' : 'Add ROI'}
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="small"
                                variant={useCase.fineTuned ? 'contained' : 'outlined'}
                                onClick={() => handleFineTune(useCase.id)}
                                disabled={!useCase.selected}
                                startIcon={useCase.fineTuned ? <CheckCircleIcon /> : <TuneIcon />}
                                color={useCase.fineTuned ? 'success' : 'primary'}
                                sx={{ minWidth: '90px' }}
                              >
                                {useCase.fineTuned ? 'Tuned' : 'Fine Tune'}
                              </Button>
                            </TableCell>
                            <TableCell>
                              <FormControlLabel
                                control={
                                  <Radio
                                    checked={selectedViewCase === useCase.id}
                                    onChange={() => setSelectedViewCase(useCase.id)}
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
                )}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: 2,
                  py: 1,
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Selected: {useCases.filter(uc => uc.selected).length} of {useCases.length} use cases
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ROI in DB: {useCases.filter(uc => uc.roiConfigured).length}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack} color="inherit" variant="outlined">
          Back to Camera List
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" color="inherit">
            Save Configuration
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!useCases.some(uc => uc.selected)}
          >
            Submit
          </Button>
        </Box>
      </Box>

      <RoiSelectionModal
        key={`${camera.id}-${currentUseCaseForROI}`}
        open={roiModalOpen}
        onClose={handleROIClose}
        cameraFeedUrl={getCameraFeedUrl()}
        useCaseName={getCurrentUseCaseName()}
        existingROI={getExistingROI()}
        onSave={handleROISave}
        labels={useCases.find(u => u.id === currentUseCaseForROI)?.labels ?? []}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AIConfigurationStep;