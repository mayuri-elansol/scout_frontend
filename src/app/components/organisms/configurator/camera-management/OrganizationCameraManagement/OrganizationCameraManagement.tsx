'use client';

import React, { useState } from 'react';
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

import CameraOnboardingStep from '../CameraOnboardingStep/CameraOnboardingStep';
import AIConfigurationStep from '../AIConfigurationStep/AIConfigurationStep';

export interface CameraData {
  id: string;
  ipAddress: string;
  username: string;
  password: string;
  port: string;
  make: string;
  position: string;   // <-- FIXED (optional)
  rtspStream: string;
  status: 'connected' | 'failed' | 'pending';
  aiConfig?: {
    useCases: string[];
    roiData: Record<string, { configured: boolean }>;
    fineTuning: Record<string, { tuned: boolean }>;
    enabled: boolean;
    viewName?: string;
  };
}


interface OrganizationCameraManagementProps {
  initialCameras?: CameraData[];
  forceAddCamera?: boolean;
  forceConfigureCamera?: string;
}

const OrganizationCameraManagement: React.FC<OrganizationCameraManagementProps> = ({
  initialCameras = [],
  forceAddCamera = false,
  forceConfigureCamera,
}) => {
  // ⭐ FIXED: Missing states — now included and bound to props
  const [cameras, setCameras] = useState<CameraData[]>(initialCameras);
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

  // -----------------------
  // CAMERA EVENT HANDLERS
  // -----------------------

  const handleCameraAdd = (
    cameraData: Omit<CameraData, 'id' | 'rtspStream' | 'status' | 'position'>
  ) => {
    const newCamera: CameraData = {
      ...cameraData,
      id: `camera-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      rtspStream: `rtsp://${cameraData.username}:${cameraData.password}@${cameraData.ipAddress}:${cameraData.port}/Streaming/Channels/101`,
      status: Math.random() > 0.7 ? 'failed' : 'connected',
      position: cameraData.ipAddress, // If no UI field, fallback
    };

    setCameras((prev) => [...prev, newCamera]);

    setSnackbar({
      open: true,
      message: `Camera added successfully!`,
      severity: 'success',
    });
  };

  const handleCameraBatchAdd = (
  camerasData: Omit<CameraData, 'id' | 'rtspStream' | 'status' | 'position'>[]
) => {
  const newCameras: CameraData[] = camerasData.map((cameraData, index) => ({
    ...cameraData,
    id: `camera-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
    rtspStream: `rtsp://${cameraData.username}:${cameraData.password}@${cameraData.ipAddress}:${cameraData.port}/Streaming/Channels/101`,
    position: cameraData.ipAddress,
    status: Math.random() > 0.7 ? 'failed' : 'connected', // Ensured correct union type
  }));

  setCameras((prev) => [...prev, ...newCameras]);

  setSnackbar({
    open: true,
    message: `${newCameras.length} cameras added successfully!`,
    severity: 'success',
  });
};



  const handleCameraRemove = (cameraId: string) => {
    const camera = cameras.find((c) => c.id === cameraId);
    setCameras((prev) => prev.filter((c) => c.id !== cameraId));

    setSnackbar({
      open: true,
      message: `Camera "${camera?.position}" removed successfully!`,
      severity: 'warning',
    });
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
  if (addingCamera) {
    return (
      <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <CameraOnboardingStep
          cameras={cameras}
          onCameraAdd={handleCameraAdd}
          onCameraBatchAdd={handleCameraBatchAdd}
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
              Camera Status
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setAddingCamera(true)}
            >
              Add Camera
            </Button>
          </Box>
        </Box>

        {cameras.length === 0 ? (
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
                    <TableCell>Make</TableCell>
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
