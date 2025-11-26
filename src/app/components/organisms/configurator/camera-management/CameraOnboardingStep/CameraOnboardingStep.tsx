'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ButtonGroup,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Videocam as VideocamIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

interface CameraData {
  id: string;
  ipAddress: string;
  username: string;
  password: string;
  port: string;
  make: string;
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

interface CameraOnboardingStepProps {
  cameras: CameraData[];
  onCameraAdd: (camera: Omit<CameraData, 'id' | 'rtspStream' | 'status'>) => void;
  onCameraBatchAdd?: (cameras: Omit<CameraData, 'id' | 'rtspStream' | 'status'>[]) => void;
  onCameraRemove: (cameraId: string) => void;
  onNext: () => void;
  onBack: () => void;
  isOptional?: boolean;
}

interface CameraFormData {
  ipAddress: string;
  username: string;
  password: string;
  port: string;
  make: string;
}

interface FormErrors {
  ipAddress?: string;
  username?: string;
  password?: string;
  port?: string;
  make?: string;
}

const CameraOnboardingStep: React.FC<CameraOnboardingStepProps> = ({
  cameras,
  onCameraAdd,
  onCameraBatchAdd,
  onCameraRemove,
  onNext,
  onBack,
  isOptional = false,
}) => {
  const [formData, setFormData] = useState<CameraFormData>({
    ipAddress: '',
    username: '',
    password: '',
    port: '554',
    make: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isAdding, setIsAdding] = useState(false);
  const [leftColumnHeight, setLeftColumnHeight] = useState<number>(0);

  const leftColumnRef = useRef<HTMLDivElement>(null);
  // Toggle mode: 'camera' | 'nvr'
  const [mode, setMode] = useState<'camera' | 'nvr'>('camera');

  // NVR Form state
  const [nvrData, setNvrData] = useState({
    name: '',
    ip: '',
    port: '8000',
    username: '',
    password: '',
  });

  // NVR discovered cameras (mock)
  const [nvrCameras, setNvrCameras] = useState<{ id: string; name: string; }[]>([]);
  const [selectedNvrCams, setSelectedNvrCams] = useState<string[]>([]);


  useEffect(() => {
    const updateHeight = () => {
      if (leftColumnRef.current) {
        const height = leftColumnRef.current.offsetHeight;
        setLeftColumnHeight(height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    // Use timeout to ensure content is rendered
    setTimeout(updateHeight, 100);

    return () => window.removeEventListener('resize', updateHeight);
  }, [cameras, formData]);

  // IP validation helper functions
  const isValidIPv4 = (ip: string): boolean => {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
  };

  const isValidIPv6 = (ip: string): boolean => {
    // Full IPv6 regex pattern
    const ipv6Regex = /^(?:(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(?:(?::[0-9a-fA-F]{1,4}){1,6})|:(?:(?::[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(?::[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(?:ffff(?::0{1,4}){0,1}:){0,1}(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])|(?:[0-9a-fA-F]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    return ipv6Regex.test(ip);
  };

  const isDuplicateIP = (ip: string): boolean => {
    return cameras.some(camera => camera.ipAddress === ip.trim());
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // IP Address validation
    if (!formData.ipAddress.trim()) {
      newErrors.ipAddress = 'IP Address is required';
    } else {
      const trimmedIP = formData.ipAddress.trim();

      // Check if it's a valid IPv4 or IPv6 address
      if (!isValidIPv4(trimmedIP) && !isValidIPv6(trimmedIP)) {
        newErrors.ipAddress = 'Please enter a valid IPv4 or IPv6 address';
      }
      // Check for duplicate IP
      else if (isDuplicateIP(trimmedIP)) {
        newErrors.ipAddress = 'This IP address is already added';
      }
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (!formData.port.trim()) {
      newErrors.port = 'Port is required';
    } else if (isNaN(Number(formData.port)) || Number(formData.port) < 1 || Number(formData.port) > 65535) {
      newErrors.port = 'Port must be a number between 1 and 65535';
    }

    if (!formData.make.trim()) {
      newErrors.make = 'Camera make is required';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CameraFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddCamera = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsAdding(true);

    // Simulate camera connection test
    await new Promise(resolve => setTimeout(resolve, 1000));

    onCameraAdd({
      ipAddress: formData.ipAddress.trim(),
      username: formData.username.trim(),
      password: formData.password.trim(),
      port: formData.port.trim(),
      make: formData.make.trim(),

    });

    // Reset form
    setFormData({
      ipAddress: '',
      username: '',
      password: '',
      port: '554',
      make: '',

    });

    setIsAdding(false);
  };





  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircleIcon color="success" />;
      case 'failed':
        return <ErrorIcon color="error" />;
      default:
        return <VideocamIcon color="action" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'success';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 1, minHeight: 400, pb: 12 }}>
      <Typography variant="h6" gutterBottom>
        {isOptional ? 'Camera Setup (Optional)' : 'Camera Onboarding'}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {isOptional
          ? 'Add cameras now or skip this step. You can always add and configure cameras later from the organization management page.'
          : 'Add cameras to your organization for monitoring and analytics'
        }
      </Typography>

      <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
        {/* Left Column - CSV Upload & Manual Add */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box
            ref={leftColumnRef}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >



            {/* Add Camera Manually Form */}
            {/* NEW TOGGLE + CAMERA/NVR FORM SECTION */}
            <Card variant="outlined">
              <CardContent>

                {/* Toggle Buttons */}
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <Button
                    variant={mode === "camera" ? "contained" : "outlined"}
                    onClick={() => setMode("camera")}
                    fullWidth
                  >
                    Add Camera Manually
                  </Button>

                  <Button
                    variant={mode === "nvr" ? "contained" : "outlined"}
                    onClick={() => setMode("nvr")}
                    fullWidth
                  >
                    Add NVR
                  </Button>
                </Box>

                {/* CAMERA FORM (Existing) */}
                {mode === "camera" && (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      Add Camera Manually
                    </Typography>

                    <form onSubmit={handleAddCamera}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                          <TextField
                            label="IP Address"
                            value={formData.ipAddress}
                            onChange={handleInputChange('ipAddress')}
                            error={!!errors.ipAddress}
                            helperText={errors.ipAddress}
                            required
                            fullWidth
                            size="small"
                          />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                          <TextField
                            label="Username"
                            value={formData.username}
                            onChange={handleInputChange('username')}
                            error={!!errors.username}
                            helperText={errors.username}
                            required
                            fullWidth
                            size="small"
                          />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                          <TextField
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange('password')}
                            error={!!errors.password}
                            helperText={errors.password}
                            required
                            fullWidth
                            size="small"
                          />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                          <TextField
                            label="Port"
                            value={formData.port}
                            onChange={handleInputChange('port')}
                            error={!!errors.port}
                            helperText={errors.port}
                            required
                            fullWidth
                            size="small"
                          />
                        </Grid>

                        <Grid size={{ xs: 6 }}>
                          <TextField
                            label="Make"
                            value={formData.make}
                            onChange={handleInputChange('make')}
                            error={!!errors.make}
                            helperText={errors.make}
                            required
                            fullWidth
                            size="small"
                          />
                        </Grid>


                        <Grid size={{ xs: 12 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isAdding}
                          >
                            {isAdding ? 'Adding Camera...' : 'Add Camera'}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </>
                )}

                {/* NVR FORM */}
                {mode === "nvr" && (
                  <>
                    <Typography variant="h6" gutterBottom>
                      Add NVR
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="NVR Name"
                          fullWidth
                          size="small"
                          value={nvrData.name}
                          onChange={(e) => setNvrData({ ...nvrData, name: e.target.value })}
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="NVR IP Address"
                          required
                          fullWidth
                          size="small"
                          value={nvrData.ip}
                          onChange={(e) => setNvrData({ ...nvrData, ip: e.target.value })}
                        />
                      </Grid>

                      <Grid size={{ xs: 6 }}>
                        <TextField
                          label="Port"
                          required
                          fullWidth
                          size="small"
                          value={nvrData.port}
                          onChange={(e) => setNvrData({ ...nvrData, port: e.target.value })}
                        />
                      </Grid>

                      <Grid size={{ xs: 6 }}>
                        <TextField
                          label="Username"
                          required
                          fullWidth
                          size="small"
                          value={nvrData.username}
                          onChange={(e) => setNvrData({ ...nvrData, username: e.target.value })}
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }}>
                        <TextField
                          label="Password"
                          required
                          type="password"
                          fullWidth
                          size="small"
                          value={nvrData.password}
                          onChange={(e) => setNvrData({ ...nvrData, password: e.target.value })}
                        />
                      </Grid>
                    </Grid>

                    {/* Discover Cameras */}
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => {
                        // MOCK RESPONSE
                        setNvrCameras([
                          { id: "1", name: "Channel 1 - Front Gate" },
                          { id: "2", name: "Channel 2 - Entrance" },
                          { id: "3", name: "Channel 3 - Parking Area" },
                        ]);
                      }}
                    >
                      Discover Cameras
                    </Button>

                    {/* Show discovered cameras */}
                    {nvrCameras.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          Found Cameras:
                        </Typography>

                        {nvrCameras.map((cam) => (
                          <Box key={cam.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <input
                              type="checkbox"
                              checked={selectedNvrCams.includes(cam.id)}
                              onChange={() => {
                                if (selectedNvrCams.includes(cam.id)) {
                                  setSelectedNvrCams(selectedNvrCams.filter((id) => id !== cam.id));
                                } else {
                                  setSelectedNvrCams([...selectedNvrCams, cam.id]);
                                }
                              }}
                            />
                            <Typography>{cam.name}</Typography>
                          </Box>
                        ))}

                        {/* Add Selected Cameras */}
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          sx={{ mt: 2 }}
                          onClick={() => {
                            const selected = nvrCameras.filter((cam) =>
                              selectedNvrCams.includes(cam.id)
                            );

                            selected.forEach((cam) => {
                              onCameraAdd({
                                ipAddress: nvrData.ip,
                                username: nvrData.username,
                                password: nvrData.password,
                                port: nvrData.port,
                                make: "NVR",
                              });
                            });

                            // Reset states
                            setSelectedNvrCams([]);
                            setNvrCameras([]);
                          }}
                        >
                          Add Selected Cameras
                        </Button>
                      </Box>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

          </Box>
        </Grid>

        {/* Right Column - Onboarded Cameras List */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            variant="outlined"
            sx={{
              height: leftColumnHeight > 0 ? `${leftColumnHeight}px` : 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              p: 2,
              '&:last-child': { pb: 2 }
            }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                <VideocamIcon color="primary" />
                Onboarded Cameras ({cameras.length})
              </Typography>

              {cameras.length === 0 ? (
                <Alert severity="info" variant="outlined" sx={{ mt: 1 }}>
                  {isOptional
                    ? 'No cameras added yet. You can skip this step and add cameras later, or add cameras now using the form or CSV upload.'
                    : 'No cameras added yet. Add cameras to proceed to AI configuration.'
                  }
                </Alert>
              ) : (
                <Box sx={{
                  flexGrow: 1,
                  overflow: 'auto',
                  mt: 1,
                  pr: 1,
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
                  <List dense disablePadding>
                    {cameras.map((camera, index) => (
                      <React.Fragment key={camera.id}>
                        <ListItem>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                            {getStatusIcon(camera.status)}
                          </Box>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  
                                <Chip
                                  label={camera.status}
                                  color={getStatusColor(camera.status) as any}
                                  size="small"
                                />
                              </Box>
                            }
                            secondary={
                              <Typography variant="caption" color="text.secondary">
                                {camera.ipAddress}:{camera.port} ({camera.make})
                              </Typography>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              onClick={() => onCameraRemove(camera.id)}
                              size="small"
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        {index < cameras.length - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* <Box sx={{ display: 'flex', position:'fixed', justifyContent: 'space-between', mt: 4 }}> */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          backgroundColor: "white",
          borderTop: "1px solid #e0e0e0",
          py: 2,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          zIndex: 1000
        }}
      >
        <Button onClick={onBack} color="inherit">
          Back
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isOptional && (
            <Button
              onClick={onNext}
              variant="outlined"
            >
              Skip Camera Setup
            </Button>
          )}
          <Button
            onClick={onNext}
            variant="contained"
            disabled={!isOptional && cameras.length === 0}
          >
            {isOptional ? 'Continue with Cameras' : 'Next: AI Configuration'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CameraOnboardingStep;
