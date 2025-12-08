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

import { getCameras, addCamera, deleteCamera } from "@/app/services/configurator/cameraService";

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

const [cameras, setCameras] = useState<CameraData[]>(initialCameras || []);
const [zones, setZones] = useState<{ id: string; name: string }[]>([]);
const [locations, setLocations] = useState<{ id: string; name: string; zoneId: string }[]>([]);


// Temporary mock data to test UI
React.useEffect(() => {
  setZones([
    { id: "zone1", name: "Zone 1" },
    { id: "zone2", name: "Zone 2" },
  ]);

  setLocations([
    { id: "loc1", name: "Location 1", zoneId: "zone1" },
    { id: "loc2", name: "Location 2", zoneId: "zone1" },
    { id: "loc3", name: "Location 3", zoneId: "zone2" }
  ]);
}, []);

  

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

  // const handleCameraAdd = (
  //   cameraData: Omit<CameraData, 'id' | 'rtspStream' | 'status' | 'position'>
  // ) => {
  //   const newCamera: CameraData = {
  //     ...cameraData,
  //     id: `camera-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  //     rtspStream: `rtsp://${cameraData.username}:${cameraData.password}@${cameraData.ipAddress}:${cameraData.port}/Streaming/Channels/101`,
  //     status: Math.random() > 0.7 ? 'failed' : 'connected',
  //     position: cameraData.ipAddress, // If no UI field, fallback
  //   };

  //   setCameras((prev) => [...prev, newCamera]);

  //   setSnackbar({
  //     open: true,
  //     message: `Camera added successfully!`,
  //     severity: 'success',
  //   });
  // };




//   const handleCameraAdd = async (cameraData: any) => {
//   try {
//     const res = await addCamera(cameraData);

//     setCameras((prev) => [...prev, res.data.data]);

//     setSnackbar({
//       open: true,
//       message: "Camera added successfully!",
//       severity: "success",
//     });
//   } catch (err) {
//     console.error(err);
//     setSnackbar({
//       open: true,
//       message: "Failed to add camera!",
//       severity: "error",
//     });
//   }
// };


// const fetchCameras = async () => {
//   try {
//     const res = await getCameras();
//     setCameras(res.data.data);
//   } catch (error) {
//     console.log(error);
//   }
// };


const fetchCameras = async () => {
  try {
    const res = await getCameras();
    const mapped = res.data.map((cam: any) => ({
      id: cam.id,
      ipAddress: cam.cameraIp,
      cameraname: cam.cameraName,
      username: cam.userName,
      password: cam.password,
      port: cam.RTSPport,
      make: cam.connectionType,
      position: cam.cameraName,
      rtspStream: cam.rtspStream ?? "",
      status: "connected",
    }));

    setCameras(mapped);
  } catch (error) {
    console.log(error);
  }
};


React.useEffect(() => {
  fetchCameras();
}, []);


// const handleCameraAdd = async (cameraData: any) => {
//   try {
//     const response = await addCamera(cameraData);

//     setCameras((prev) => [
//       ...prev,
//       {
//         id: crypto.randomUUID(),
//         ipAddress: cameraData.cameraIp,
//         cameraname: cameraData.cameraName,
//         username: cameraData.userName,
//         password: cameraData.password,
//         port: cameraData.RTSPport,
//         make: cameraData.connectionType,
//         position: cameraData.cameraName,
//         rtspStream: `rtsp://${cameraData.userName}:${cameraData.password}@${cameraData.cameraIp}:${cameraData.RTSPport}/Streaming/Channels/101`,
//         status: "connected",
//       },
//     ]);

//     setSnackbar({
//       open: true,
//       message: "Camera added successfully!",
//       severity: "success",
//     });
//   } catch (err) {
//     console.error(err);
//     setSnackbar({
//       open: true,
//       message: "Failed to add camera!",
//       severity: "error",
//     });
//   }
 
// };


const handleCameraAdd = async (cameraData: any) => {
  // try {
  //   // await addCamera(cameraData);
  //   await addCamera({
  //     cameraName: cameraData.cameraname,
  //     cameraIp: cameraData.ipAddress,
  //     userName: cameraData.username,
  //     password: cameraData.password,
  //     RTSPport: cameraData.port,
  //     cameraZone: cameraData.zoneId,
  //     channel: cameraData.locationId,
  //     connectionType: "DIRECT_TO_CAMERA",
  //   });

  //   await fetchCameras();  // refresh UI


  //   setSnackbar({
  //     open: true,
  //     message: "Camera added successfully!",
  //     severity: "success",
  //   });
  // } catch (err: any) {
  //   console.error("Add Camera Error:", err);

  //   if (err?.response?.data?.message?.includes("already exists")) {
  //     setSnackbar({
  //       open: true,
  //       message: "Camera name already exists. Choose another name.",
  //       severity: "error",
  //     });
  //   } else {
  //     setSnackbar({
  //       open: true,
  //       message: "Failed to add camera!",
  //       severity: "error",
  //     });
  //   }
  // }

  try {
  await addCamera({
    cameraName: cameraData.cameraname,
    cameraIp: cameraData.ipAddress,
    userName: cameraData.username,
    password: cameraData.password,
    cameraZone: cameraData.zoneId,
    channel: cameraData.locationId,
    connectionType: "DIRECT_TO_CAMERA",
    RTSPport: cameraData.port,
  });

  await fetchCameras(); // important
  setSnackbar({ open: true, message: "Camera added successfully!", severity: "success" });

}  catch (err: any) {
  if (err.response?.status === 409) {
    // setSnackbar({ open: true, message: "Camera name already exists!", severity: "error" });
    await fetchCameras();  // refresh anyway because DB insert actually succeeded
  } else {
    setSnackbar({ open: true, message: "Failed to add camera!", severity: "error" });
  }
}


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

  // setCameras((prev) => [...prev, ...newCameras]);

  setSnackbar({
    open: true,
    message: `${newCameras.length} cameras added successfully!`,
    severity: 'success',
  });
};



  // const handleCameraRemove = (cameraId: string) => {
  //   const camera = cameras.find((c) => c.id === cameraId);
  //   setCameras((prev) => prev.filter((c) => c.id !== cameraId));

  //   setSnackbar({
  //     open: true,
  //     message: `Camera "${camera?.position}" removed successfully!`,
  //     severity: 'warning',
  //   });
  // };

  const handleCameraRemove = async (cameraId: string) => {
  try {
    await deleteCamera(cameraId);

    setCameras((prev) => prev.filter((c) => c.id !== cameraId));

    setSnackbar({
      open: true,
      message: "Camera removed successfully!",
      severity: "warning",
    });
  } catch (error) {
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
  if (addingCamera) {
    return (
      <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <CameraOnboardingStep
          cameras={cameras}
          zones={zones}          
          locations={locations}
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
