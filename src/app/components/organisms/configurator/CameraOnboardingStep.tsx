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
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Videocam as VideocamIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';

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
  position: string;
}

interface FormErrors {
  ipAddress?: string;
  username?: string;
  password?: string;
  port?: string;
  make?: string;
  position?: string;
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
    position: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isAdding, setIsAdding] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const [csvCameras, setCsvCameras] = useState<CameraFormData[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [leftColumnHeight, setLeftColumnHeight] = useState<number>(0);
  
  const leftColumnRef = useRef<HTMLDivElement>(null);

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
  }, [csvCameras, uploadStatus, formData]);

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

    if (!formData.position.trim()) {
      newErrors.position = 'Camera position is required';
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
      position: formData.position.trim(),
    });

    // Reset form
    setFormData({
      ipAddress: '',
      username: '',
      password: '',
      port: '554',
      make: '',
      position: '',
    });
    
    setIsAdding(false);
  };

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setUploadStatus({
        type: 'error',
        message: 'Please upload a valid CSV file'
      });
      return;
    }

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        setUploadStatus({
          type: 'error',
          message: 'CSV file must contain header row and at least one data row'
        });
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const requiredHeaders = ['ip address', 'username', 'password', 'port', 'make', 'position'];
      
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
      if (missingHeaders.length > 0) {
        setUploadStatus({
          type: 'error',
          message: `Missing required columns: ${missingHeaders.join(', ')}`
        });
        return;
      }

      const validCameras: CameraFormData[] = [];
      const seenIPs = new Set<string>();
      let errorCount = 0;

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        
        if (values.length !== headers.length) {
          errorCount++;
          continue;
        }

        const cameraData = {
          ipAddress: values[headers.indexOf('ip address')] || '',
          username: values[headers.indexOf('username')] || '',
          password: values[headers.indexOf('password')] || '',
          port: values[headers.indexOf('port')] || '554',
          make: values[headers.indexOf('make')] || '',
          position: values[headers.indexOf('position')] || '',
        };

        // Basic validation
        if (!cameraData.ipAddress || !cameraData.username || !cameraData.password || !cameraData.position) {
          errorCount++;
          continue;
        }

        // IP validation - check for both IPv4 and IPv6
        if (!isValidIPv4(cameraData.ipAddress) && !isValidIPv6(cameraData.ipAddress)) {
          errorCount++;
          continue;
        }

        // Check for duplicate IP in existing cameras
        if (isDuplicateIP(cameraData.ipAddress)) {
          errorCount++;
          continue;
        }

        // Check for duplicate IP within CSV
        if (seenIPs.has(cameraData.ipAddress)) {
          errorCount++;
          continue;
        }

        seenIPs.add(cameraData.ipAddress);
        validCameras.push(cameraData);
      }

      setCsvCameras(validCameras);
      
      setUploadStatus({
        type: validCameras.length > 0 ? 'success' : 'warning',
        message: `Found ${validCameras.length} valid cameras${errorCount > 0 ? `. ${errorCount} rows had errors and were skipped.` : ''} Click "Import Cameras" to add them.`
      });

      // Clear the file input
      event.target.value = '';

    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: 'Error reading CSV file. Please check the file format.'
      });
    }
  };

  const handleImportCameras = async () => {
    if (csvCameras.length === 0) return;
    
    setIsImporting(true);
    
    try {
      console.log('Starting import of', csvCameras.length, 'cameras');
      console.log('CSV cameras to import:', csvCameras);
      
      // Try batch add first if available
      if (onCameraBatchAdd) {
        console.log('Using batch add function');
        onCameraBatchAdd(csvCameras);
      } else {
        console.log('Using individual add function');
        // Fallback to individual adds
        for (let i = 0; i < csvCameras.length; i++) {
          const camera = csvCameras[i];
          console.log(`Adding camera ${i + 1}/${csvCameras.length}:`, camera.position, camera.ipAddress);
          onCameraAdd(camera);
          // Small delay between each camera to ensure proper state updates
          await new Promise(resolve => setTimeout(resolve, 150));
        }
      }
      
      console.log('Finished importing all cameras');
      
      setUploadStatus({
        type: 'success',
        message: `Successfully imported ${csvCameras.length} cameras!`
      });
      
      // Clear CSV cameras after import
      setCsvCameras([]);
      
    } catch (error) {
      console.error('Import error:', error);
      setUploadStatus({
        type: 'error',
        message: 'Failed to import cameras. Please try again.'
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleClearCSV = () => {
    setCsvCameras([]);
    setUploadStatus(null);
  };

  const downloadSampleCSV = () => {
    const sampleData = [
      'IP Address,Username,Password,Port,Make,Position',
      '192.168.1.100,admin,admin123,554,Hikvision,Front Gate',
      '192.168.1.101,admin,password123,554,Hikvision,Reception Area',
      '192.168.1.102,user,secure456,8080,Dahua,Parking Lot',
      '192.168.1.103,admin,cam789,554,Axis,Conference Room',
      '192.168.1.104,operator,view123,554,Hikvision,Loading Dock'
    ].join('\n');

    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_cameras.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
    <Box sx={{ p: 1, minHeight: 400 }}>
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
        <Grid size={{xs: 12, lg: 6}}>
          <Box 
            ref={leftColumnRef}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            {/* Upload CSV Section */}
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <UploadIcon color="primary" />
                  Upload CSV
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Upload a CSV file with multiple camera configurations
                </Typography>
                
                <input
                  accept=".csv"
                  style={{ display: 'none' }}
                  id="csv-upload-input"
                  type="file"
                  onChange={handleCSVUpload}
                />
                <label htmlFor="csv-upload-input">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Browse & Upload CSV
                  </Button>
                </label>
                
                {uploadStatus && (
                  <Alert 
                    severity={uploadStatus.type} 
                    sx={{ mb: 2 }}
                    onClose={() => setUploadStatus(null)}
                  >
                    {uploadStatus.message}
                  </Alert>
                )}
                
                {/* CSV Preview */}
                {csvCameras.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      Preview ({csvCameras.length} cameras):
                    </Typography>
                    <Box sx={{ maxHeight: 200, overflow: 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}>
                      {csvCameras.map((camera, index) => (
                        <Typography key={index} variant="caption" sx={{ display: 'block', fontFamily: 'monospace' }}>
                          {camera.position} - {camera.ipAddress} ({camera.make})
                        </Typography>
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleImportCameras}
                        disabled={isImporting}
                        sx={{ flexGrow: 1 }}
                      >
                        {isImporting ? 'Importing...' : 'Import Cameras'}
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleClearCSV}
                        disabled={isImporting}
                      >
                        Clear
                      </Button>
                    </Box>
                  </Box>
                )}
                
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  CSV Format: IP Address, Username, Password, Port, Make, Position
                </Typography>
                
                <Button
                  variant="text"
                  size="small"
                  onClick={downloadSampleCSV}
                  sx={{ textTransform: 'none' }}
                >
                  📥 Download Sample CSV
                </Button>
              </CardContent>
            </Card>

            {/* Add Camera Manually Form */}
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AddIcon color="primary" />
                  Add Camera Manually
                </Typography>
                
                <form onSubmit={handleAddCamera}>
                  <Grid container spacing={2}>
                    <Grid size={{xs: 12}}>
                      <TextField
                        label="IP Address"
                        value={formData.ipAddress}
                        onChange={handleInputChange('ipAddress')}
                        error={!!errors.ipAddress}
                        helperText={errors.ipAddress}
                        required
                        fullWidth
                        size="small"
                        placeholder="192.168.0.91"
                      />
                    </Grid>

                    <Grid size={{xs: 6}}>
                      <TextField
                        label="Username"
                        value={formData.username}
                        onChange={handleInputChange('username')}
                        error={!!errors.username}
                        helperText={errors.username}
                        required
                        fullWidth
                        size="small"
                        placeholder="admin@backoffice.com"
                      />
                    </Grid>

                    <Grid size={{xs: 6}}>
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
                        placeholder="••••••••"
                      />
                    </Grid>

                    <Grid size={{xs: 6}}>
                      <TextField
                        label="Port"
                        value={formData.port}
                        onChange={handleInputChange('port')}
                        error={!!errors.port}
                        helperText={errors.port}
                        required
                        fullWidth
                        size="small"
                        placeholder="554"
                      />
                    </Grid>

                    <Grid size={{xs: 6}}>
                      <TextField
                        label="Make"
                        value={formData.make}
                        onChange={handleInputChange('make')}
                        error={!!errors.make}
                        helperText={errors.make}
                        required
                        fullWidth
                        size="small"
                        placeholder="e.g., Hikvision"
                      />
                    </Grid>

                    <Grid size={{xs: 12}}>
                      <TextField
                        label="Zone"
                        value={formData.position}
                        onChange={handleInputChange('position')}
                        error={!!errors.position}
                        helperText={errors.position}
                        required
                        fullWidth
                        size="small"
                        placeholder="e.g., Front Gate"
                      />
                    </Grid>

                    <Grid size={{xs: 12}}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isAdding}
                        startIcon={<AddIcon />}
                      >
                        {isAdding ? 'Adding Camera...' : 'Add Camera'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Right Column - Onboarded Cameras List */}
        <Grid size={{xs: 12, lg: 6}}>
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
                                <Typography variant="body2" fontWeight={500}>
                                  {camera.position}
                                </Typography>
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
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
