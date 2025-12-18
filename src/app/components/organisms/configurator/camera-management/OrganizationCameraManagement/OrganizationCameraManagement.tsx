'use client';

import React, { useState, useCallback } from 'react';

import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Settings as SettingsIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Videocam as VideocamIcon,
} from '@mui/icons-material';

import { getCameras, deleteCamera } from "@/app/services/configurator/cameraService";

import CameraOnboardingStep from '../CameraOnboardingStep/CameraOnboardingStep';
import AIConfigurationStep from '../AIConfigurationStep/AIConfigurationStep';
import { OrgCamera, OnboardingCamera, CameraApiResponse } from "@/app/types/camera";

interface OrganizationCameraManagementProps {
  initialCameras?: OrgCamera[];
  forceAddCamera?: boolean;
  forceConfigureCamera?: string;
}


const OrganizationCameraManagement: React.FC<OrganizationCameraManagementProps> = ({
  initialCameras = [],
  forceAddCamera = false,
  forceConfigureCamera,
}) => {

  const [cameras, setCameras] = useState<OrgCamera[]>(initialCameras);
  
  const [selectedCameraForConfig, setSelectedCameraForConfig] = useState<string | null>(
    forceConfigureCamera || null
  );
  const [addingCamera, setAddingCamera] = useState(forceAddCamera);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const fetchCameras = useCallback(async () => {
    const res = await getCameras();

    setCameras(
      (res.data as CameraApiResponse[]).map((cam) => ({
        id: cam.id,
        ipAddress: cam.cameraIp,
        username: cam.userName,
        password: cam.password,
        port: String(cam.RTSPport),
        make: cam.connectionType,
        position: cam.cameraName,
        rtspStream: cam.rtspStream ?? "",
        status: "connected",
      }))
    );
  }, []);



  React.useEffect(() => {
    fetchCameras();
  }, [fetchCameras]);


  const handleCameraAdd = (camera: OnboardingCamera) => {
    setCameras((prev) => [
      ...prev,
      {
        id: camera.id,
        ipAddress: camera.ipAddress,
        username: camera.username,
        password: camera.password,
        port: camera.port,
        make: "DIRECT_TO_CAMERA",
        position: camera.cameraname,
        rtspStream: "",
        status: camera.status,
      },
    ]);

    setSnackbar({
      open: true,
      message: "Camera added successfully!",
      severity: "success",
    });
  };




  const handleCameraRemove = async (cameraId: string) => {
    try {
      await deleteCamera(cameraId);


      setCameras((prev) => prev.filter((c) => c.id !== cameraId));

      setSnackbar({
        open: true,
        message: "Camera removed successfully!",
        severity: "warning",
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to delete camera!",
        severity: "error",
      });
    }
  };



  const handleCameraConfigureClick = (cameraId: string) => {
    setSelectedCameraForConfig(cameraId);
  };

  interface AICameraConfig {
    useCases: string[];
    roiData: Record<string, { configured: boolean }>;
    fineTuning: Record<string, { tuned: boolean }>;
    enabled: boolean;
    viewName?: string;
    aiConfig?: AICameraConfig;
  }


  const handleAIConfigSave = (cameraId: string, aiConfig: AICameraConfig) => {
    setCameras((prev) =>
      prev.map((camera) =>
        camera.id === cameraId ? { ...camera, aiConfig } : camera
      )
    );

    setSelectedCameraForConfig(null);

    setSnackbar({
      open: true,
      message: 'AI configuration saved successfully!',
      severity: 'success',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircleIcon color="success" fontSize="small" />;
      case 'failed':
        return <ErrorIcon color="error" fontSize="small" />;
      default:
        return <VideocamIcon color="action" fontSize="small" />;
    }
  };

  // -----------------------
  // CONDITIONAL SCREENS
  // -----------------------

  // 1) AI CONFIGURATION SCREEN
  if (selectedCameraForConfig) {
    const camera = cameras.find((c) => c.id === selectedCameraForConfig);
    return (
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <AIConfigurationStep
          camera={camera!}
          onSave={(aiConfig) => handleAIConfigSave(selectedCameraForConfig, aiConfig)}
          onBack={() => setSelectedCameraForConfig(null)}
        />
      </Box>
    );
  }

  // 2) CAMERA ONBOARDING SCREEN

  const onboardingCameras: OnboardingCamera[] = cameras.map((cam) => ({
    id: cam.id,
    cameraname: cam.position,
    ipAddress: cam.ipAddress,
    username: cam.username,
    password: cam.password,
    port: cam.port,
    zoneId: "",
    locationId: "",
    status: cam.status,
  }));


  if (addingCamera) {
    return (
      <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <CameraOnboardingStep
          cameras={onboardingCameras}

          onCameraAdd={handleCameraAdd}

          onCameraRemove={handleCameraRemove}
          onNext={() => setAddingCamera(false)}
          onBack={() => setAddingCamera(false)}
        />
      </Box>
    );
  }

  // -----------------------
  // MAIN LIST SCREEN
  // -----------------------

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
      <Paper variant="outlined" sx={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600}>
              All Cameras
            </Typography>
            <Button
              variant="contained"
              // startIcon={<AddIcon />}
              onClick={() => setAddingCamera(true)}
            >
              Add / Delete Camera
            </Button>
          </Box>
        </Box>


        {!cameras || cameras.length === 0 ? (
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              p: 4,
            }}
          >
            <VideocamIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />

            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Cameras Configured
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Add cameras to start monitoring and analytics.
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setAddingCamera(true)}
            >
              Add Your First Camera
            </Button>
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            <TableContainer>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Camera Name</TableCell>
                    <TableCell>IP Address</TableCell>
                    <TableCell>Port</TableCell>
                    <TableCell>Connection Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cameras.map((camera) => (
                    <TableRow key={camera.id} hover>
                      <TableCell>{camera.position}</TableCell>
                      <TableCell>{camera.ipAddress}</TableCell>
                      <TableCell>{camera.port}</TableCell>
                      <TableCell>{camera.make}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getStatusIcon(camera.status)}
                          <Typography
                            variant="body2"
                            color={camera.status === 'connected' ? 'success.main' : 'error.main'}
                          >
                            {camera.status}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Configure Camera & AI Settings">
                          <IconButton color="primary" onClick={() => handleCameraConfigureClick(camera.id)}>
                            <SettingsIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrganizationCameraManagement;
