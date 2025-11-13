'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
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
import CameraOnboardingStep from './CameraOnboardingStep';
import AIConfigurationStep from './AIConfigurationStep';

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
  aiConfig?: {
    useCases: string[];
    roiData: Record<string, { configured: boolean }>;
    fineTuning: Record<string, { tuned: boolean }>;
    enabled: boolean;
    viewName?: string;
  };
}

const OrganizationCameraManagement: React.FC = () => {
  const [cameras, setCameras] = useState<CameraData[]>([]);
  const [selectedCameraForConfig, setSelectedCameraForConfig] = useState<string | null>(null);
  const [addingCamera, setAddingCamera] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCameraAdd = (cameraData: Omit<CameraData, 'id' | 'rtspStream' | 'status'>) => {
    const newCamera: CameraData = {
      ...cameraData,
      id: `camera-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      rtspStream: `rtsp://${cameraData.username}:${cameraData.password}@${cameraData.ipAddress}:${cameraData.port}/Streaming/Channels/101`,
      status: Math.random() > 0.7 ? 'failed' : 'connected',
    };
    
    setCameras(prev => [...prev, newCamera]);
    
    setSnackbar({
      open: true,
      message: `Camera "${newCamera.position}" added successfully!`,
      severity: 'success',
    });
  };

  const handleCameraBatchAdd = (camerasData: Omit<CameraData, 'id' | 'rtspStream' | 'status'>[]) => {
    const newCameras: CameraData[] = camerasData.map((cameraData, index) => ({
      ...cameraData,
      id: `camera-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
      rtspStream: `rtsp://${cameraData.username}:${cameraData.password}@${cameraData.ipAddress}:${cameraData.port}/Streaming/Channels/101`,
      status: Math.random() > 0.7 ? 'failed' : 'connected',
    }));
    
    setCameras(prev => [...prev, ...newCameras]);
    
    setSnackbar({
      open: true,
      message: `${newCameras.length} cameras added successfully!`,
      severity: 'success',
    });
  };

  const handleCameraRemove = (cameraId: string) => {
    const camera = cameras.find(c => c.id === cameraId);
    setCameras(prev => prev.filter(c => c.id !== cameraId));
    
    setSnackbar({
      open: true,
      message: `Camera "${camera?.position}" removed successfully!`,
      severity: 'warning',
    });
  };

  const handleCameraConfigureClick = (cameraId: string) => {
    setSelectedCameraForConfig(cameraId);
  };

  const handleAIConfigSave = (cameraId: string, aiConfig: {
    useCases: string[];
    roiData: Record<string, { configured: boolean }>;
    fineTuning: Record<string, { tuned: boolean }>;
    enabled: boolean;
    viewName?: string;
  }) => {
    setCameras(prev => prev.map(camera =>
      camera.id === cameraId
        ? { ...camera, aiConfig }
        : camera
    ));
    
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

  // If configuring a specific camera's AI settings
  if (selectedCameraForConfig) {
    const camera = cameras.find(c => c.id === selectedCameraForConfig);
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

  // If adding cameras
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

  // Main camera status view
  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
      {/* Camera Status Section - Full Width */}
      <Paper variant="outlined" sx={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
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
          <Box sx={{ p: 4, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <VideocamIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Cameras Configured
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Add cameras to start monitoring and analytics for this organization.
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
          <Box sx={{ 
            flexGrow: 1, 
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,.2)',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,.3)',
              },
            },
          }}>
            <TableContainer>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, bgcolor: 'background.paper' }}>Camera Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, bgcolor: 'background.paper' }}>IP Address</TableCell>
                    <TableCell sx={{ fontWeight: 600, bgcolor: 'background.paper' }}>Port</TableCell>
                    <TableCell sx={{ fontWeight: 600, bgcolor: 'background.paper' }}>Make</TableCell>
                    <TableCell sx={{ fontWeight: 600, bgcolor: 'background.paper' }}>Status</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, bgcolor: 'background.paper' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cameras.map((camera) => (
                    <TableRow key={camera.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {camera.position}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {camera.ipAddress}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {camera.port}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {camera.make}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getStatusIcon(camera.status)}
                          <Typography 
                            variant="body2" 
                            color={camera.status === 'connected' ? 'success.main' : 'error.main'}
                            fontWeight={500}
                          >
                            {camera.status}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Configure Camera & AI Settings">
                          <IconButton 
                            size="medium"
                            color="primary"
                            onClick={() => handleCameraConfigureClick(camera.id)}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'primary.light',
                                color: 'primary.contrastText',
                              },
                            }}
                          >
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

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
